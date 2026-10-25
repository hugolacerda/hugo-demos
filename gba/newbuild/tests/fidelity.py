#!/usr/bin/env python3
"""Fidelity check: screenshot a reference and the build, diff the pairs (map tickets 04, 10, 16).

The number is the share of the full-page screenshot that differs, from
pixelmatch (threshold 0.1, anti-aliased pixels ignored), per page and width,
at device scale factor 1 so one CSS pixel is one image pixel. The shorter
capture is padded with white to the taller one, so a height difference counts
as mismatch and is also reported on its own.

Usage (from gba/newbuild, with .venv):
  # once: the reference set. The live host, paced and stopping on its captcha,
  # or the local replica of the live homepage (tests/build_replica.py) while the captcha is up.
  .venv/bin/python tests/fidelity.py capture --base https://gatewaybusinessadvisors.com --out tests/reference/2026-10-25
  .venv/bin/python tests/fidelity.py capture --base http://127.0.0.1:8401 --out tests/reference/2026-10-25-replica --pages home

  # every run: build with the live faces, serve it, capture and compare. Exit 1 if any row is over the threshold.
  GBA_FONTS=live npm run build
  python3 -m http.server 8400 --bind 127.0.0.1 --directory dist
  .venv/bin/python tests/fidelity.py compare --reference tests/reference/2026-10-25-replica \
      --local http://127.0.0.1:8400 --out tests/reports/2026-10-25

Pass rule (Hugo, ticket 10, 2026-10-25): at most 0.5 % per page and width, on a
GBA_FONTS=live build, so the number measures the port and not the shipped
look-alike fonts (whose drift was judged once at ticket 10: 3.7 to 8.7 % on the
homepage, page height within 4 px). The floor between two renders of the same
page is 0 to 0.2 % (the deal cards sit half a pixel apart under Embla and Owl).

Freezing: an init script disables every timer of 2 s or longer before page
scripts run. That stops the hero slider (7 s), Owl's and Embla's autoplay (5 s)
at their first slide on both sides, whatever library drives them; shorter
timers (layout refreshes) still run. Transitions and animations are switched
off, the chat widget and reCAPTCHA badge hidden, and their hosts never resolve.
"""
import argparse
import json
import re
import sys
import time
from datetime import datetime
from pathlib import Path

from PIL import Image
from pixelmatch.contrib.PIL import pixelmatch
from playwright.sync_api import sync_playwright

# Viewport heights only matter for 100vh blocks; keep them equal on both sides.
WIDTHS = {1440: 900, 1024: 768, 390: 844}
# One page per template plus three articles (ticket 04). Short, median and long articles.
PAGES = {
    "home": "/",
    "start-here": "/start-here",
    "professional-team": "/your-professional-team",
    "industry-insider": "/industry-insider",
    "affiliations": "/affiliations",
    "deals": "/businesses-we-have-sold",
    "process": "/the-business-sales-process",
    "team": "/our-team",
    "news": "/news-and-events",
    "article-short": "/size-breakdown-businesses",
    "article-median": "/how-long-does-it-take-to-sell-a-business",
    "article-long": "/the-anatomy-deal",
    "contact": "/contact-us",
    "privacy": "/privacy-policy",
}
LIVE_HOST = "gatewaybusinessadvisors.com"
# Third parties that are out of scope or differ by design: the chat widget, analytics, reCAPTCHA.
# Resolved to nothing at the browser level, so the HTTP cache stays on (Playwright's route() turns it off).
BLOCK_HOSTS = ["meclabsai.com", "*.meclabsai.com", "firestore.googleapis.com", "www.googletagmanager.com",
               "js.stripe.com", "www.google.com", "www.gstatic.com"]
FIREFOX_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0"
# The live host serves a captcha after about 1,800 requests (BRIEF.md); one page load is 25 to 50 own-host requests.
LIVE_PACE_SECONDS = 14

FREEZE_JS = r"""
(() => {
  const LONG = 2000;
  for (const name of ['setTimeout', 'setInterval']) {
    const orig = window[name];
    window[name] = function (fn, ms, ...rest) { return (ms || 0) >= LONG ? 0 : orig.call(window, fn, ms, ...rest); };
  }
})();
"""
SETTLE_JS = r"""
async () => {
  await document.fonts.ready;
  const step = window.innerHeight;
  for (let y = 0; y < document.documentElement.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); }
  window.scrollTo(0, 0);
  // An image still loading collapses its box (seen once on the homepage service boxes, Oct 25).
  await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
  await document.fonts.ready;
  await new Promise(r => setTimeout(r, 400));
  return document.documentElement.scrollHeight;
}
"""
FREEZE_CSS = """
*, *::before, *::after { transition: none !important; animation: none !important; caret-color: transparent !important; scroll-behavior: auto !important; }
#meclabs-ai-widget, .grecaptcha-badge, #proto-bar { display: none !important; }
"""


def pick(arg, table):
    if not arg:
        return list(table)
    keys = [type(next(iter(table)))(k) for k in arg.split(",")]
    unknown = [k for k in keys if k not in table]
    if unknown:
        raise SystemExit(f"unknown: {unknown}")
    return keys


def capture(base, out, pages, widths, query="", firefox_ua=False):
    """Full-page PNG per page and width into out/<page>@<width>.png, with meta.json."""
    out.mkdir(parents=True, exist_ok=True)
    live = LIVE_HOST in base
    meta = {"base": base, "query": query, "captured": datetime.now().isoformat(timespec="seconds"), "shots": {}}
    rules = ", ".join(f"MAP {h} ~NOTFOUND" for h in BLOCK_HOSTS)
    with sync_playwright() as p:
        browser = p.chromium.launch(args=[f"--host-resolver-rules={rules}"])
        meta["chromium"] = browser.version
        for width in widths:
            ctx = browser.new_context(viewport={"width": width, "height": WIDTHS[width]}, device_scale_factor=1,
                                      reduced_motion="reduce", is_mobile=width < 768, has_touch=width < 768,
                                      user_agent=FIREFOX_UA if (live and firefox_ua) else None)
            ctx.add_init_script(FREEZE_JS)
            for key in pages:
                url = base.rstrip("/") + PAGES[key] + (f"?{query}" if query else "")
                page = ctx.new_page()
                resp = page.goto(url, wait_until="load")
                status = resp.status if resp else 0
                if status in (202, 403) or "sgcaptcha" in page.url:
                    raise SystemExit(f"stopped: {url} answered {status} at {page.url}; the live host is rate-limiting")
                page.add_style_tag(content=FREEZE_CSS)
                height = page.evaluate(SETTLE_JS)
                png = out / f"{key}@{width}.png"
                page.screenshot(path=str(png), full_page=True, animations="disabled", caret="hide", scale="css")
                got = Image.open(png).height
                meta["shots"][f"{key}@{width}"] = {"url": url, "status": status, "scrollHeight": height, "png_height": got,
                                                   "capture_error": got != height}
                print(f"  {key}@{width}: {status}, {got} px")
                page.close()
                if live:
                    time.sleep(LIVE_PACE_SECONDS)
            ctx.close()
        browser.close()
    (out / "meta.json").write_text(json.dumps(meta, indent=2))


def diff(ref_png, loc_png, diff_png):
    a = Image.open(ref_png).convert("RGBA")
    b = Image.open(loc_png).convert("RGBA")
    w, h = a.width, max(a.height, b.height)
    A = Image.new("RGBA", (w, h), (255, 255, 255, 255)); A.paste(a, (0, 0))
    B = Image.new("RGBA", (w, h), (255, 255, 255, 255)); B.paste(b, (0, 0))
    out = Image.new("RGBA", (w, h))
    mismatched = pixelmatch(A, B, out, threshold=0.1, includeAA=False)
    out.save(diff_png)
    # Mismatch over the overlapping height only, so a page that is right but taller still reads as close.
    o = min(a.height, b.height)
    overlap = pixelmatch(A.crop((0, 0, w, o)), B.crop((0, 0, w, o)), None, threshold=0.1, includeAA=False)
    return {"pct": round(100 * mismatched / (w * h), 3), "pct_overlap": round(100 * overlap / (w * o), 3),
            "h_ref": a.height, "h_local": b.height, "h_delta": b.height - a.height}


def compare(reference, local, out, pages, widths, threshold, query):
    shots = out / "local"
    capture(local, shots, pages, widths, query)
    rows = []
    for width in widths:
        for key in pages:
            name = f"{key}@{width}"
            r = diff(reference / f"{name}.png", shots / f"{name}.png", out / f"{name}.diff.png")
            r.update(page=key, width=width, passed=r["pct"] <= threshold)
            rows.append(r)
    report = {"reference": str(reference), "local": local, "query": query, "threshold": threshold, "rows": rows}
    (out / "report.json").write_text(json.dumps(report, indent=2))
    lines = [f"# Fidelity report", "", f"Reference `{reference}`, local `{local}`{' ?' + query if query else ''}, "
             f"threshold {threshold} %.", "", "| page | width | mismatch % | overlap % | ref px | local px | delta | pass |",
             "|---|---|---|---|---|---|---|---|"]
    lines += [f"| {r['page']} | {r['width']} | {r['pct']} | {r['pct_overlap']} | {r['h_ref']} | {r['h_local']} | {r['h_delta']} | "
              f"{'yes' if r['passed'] else 'NO'} |" for r in rows]
    (out / "report.md").write_text("\n".join(lines) + "\n")
    print("\n".join(lines))
    return 0 if all(r["passed"] for r in rows) else 1


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    c = sub.add_parser("capture", help="capture a reference set")
    c.add_argument("--base", required=True); c.add_argument("--out", required=True, type=Path)
    c.add_argument("--firefox-ua", action="store_true", help="live host only, if /our-team answers 403")
    k = sub.add_parser("compare", help="capture the build and diff it against a reference set")
    k.add_argument("--reference", required=True, type=Path); k.add_argument("--local", default="http://127.0.0.1:8400")
    k.add_argument("--out", required=True, type=Path); k.add_argument("--threshold", type=float, default=0.5)
    for s in (c, k):
        s.add_argument("--pages"); s.add_argument("--widths"); s.add_argument("--query", default="")
    args = ap.parse_args()
    pages, widths = pick(args.pages, PAGES), pick(args.widths, WIDTHS)
    if args.cmd == "capture":
        capture(args.base, args.out, pages, widths, args.query, args.firefox_ua)
        return 0
    return compare(args.reference, args.local, args.out, pages, widths, args.threshold, args.query)


if __name__ == "__main__":
    sys.exit(main())
