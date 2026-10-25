#!/usr/bin/env python3
"""Response-header check (map ticket 12): what the staging site sends against
what the build asked for, and what Chrome makes of it.

  sent      on a page, the 404, an asset and sitemap.xml: the headers in
            dist/_headers (scripts/headers.mjs) arrive unchanged, X-Robots-Tag
            noindex included until cutover
  parses    the Permissions-Policy is plain ASCII with comma separators (the live
            header carries a typographic quote and Chrome drops it)
  browser   Chromium loads one page per template and logs no CSP, Permissions-
            Policy or other console error

Usage (from gba/newbuild, after npm run build so dist/_headers matches the deploy):
  .venv/bin/python -I tests/headers.py --base https://gateway-business-advisors.netlify.app
Exit 1 on any failure.
"""
import argparse
import sys
from pathlib import Path

import requests
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
PROBES = ["/", "/start-here", "/this-page-does-not-exist", "/css/custom.css", "/sitemap.xml"]
BROWSE = ["/", "/start-here", "/affiliations", "/our-team", "/news-and-events", "/contact-us",
          "/the-anatomy-deal", "/an-overview-of-term-sheets", "/this-page-does-not-exist"]


def expected():
    want = {}
    for line in (ROOT / "dist" / "_headers").read_text().splitlines():
        if line.startswith("  ") and ":" in line:
            k, v = line.strip().split(":", 1)
            want[k.strip().lower()] = v.strip()
    return want


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--base", required=True)
    args = ap.parse_args()
    base = args.base.rstrip("/")
    want = expected()
    fails = []
    for path in PROBES:
        r = requests.get(base + path, timeout=30)
        for k, v in want.items():
            got = r.headers.get(k)
            if got != v:
                fails.append(f"{path}: {k} is {got!r}")
        pp = r.headers.get("permissions-policy", "")
        if not pp.isascii() or any(part and "=" not in part for part in pp.split(",")):
            fails.append(f"{path}: Permissions-Policy does not parse: {pp!r}")
        print(f"sent    {path:28} {r.status_code}  {len([k for k in want if r.headers.get(k) == want[k]])}/{len(want)} headers as built")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        messages = []
        page.on("console", lambda m: messages.append((page.url, m.type, m.text)) if m.type in ("error", "warning") else None)
        page.on("pageerror", lambda e: messages.append((page.url, "pageerror", str(e))))
        for path in BROWSE:
            page.goto(base + path, wait_until="load")
            page.wait_for_timeout(500)
        browser.close()
    for url, kind, text in messages:
        if path_is_404(url) and "404" in text:
            continue  # the 404 page's own status
        fails.append(f"browser {url}: {kind}: {text[:160]}")
    print(f"browser {len(BROWSE)} pages, {len(fails)} problems in total")
    for f in fails:
        print("  FAIL " + f)
    sys.exit(1 if fails else 0)


def path_is_404(url):
    return url.rstrip("/").endswith("/this-page-does-not-exist")


if __name__ == "__main__":
    main()
