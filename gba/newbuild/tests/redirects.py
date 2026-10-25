#!/usr/bin/env python3
"""Redirect and 404 check (map ticket 14): request every URL the site must answer
for and compare the first response (redirects are not followed) with what is expected.

  pages      the 640 sitemap URLs and the 52 listing pages: 200, no redirect
  rules      every hand-written rule in dist/_redirects (splat rules through the
             live examples): 301 to its target
  articles   /news-and-events/<slug> for every article: 301 to /<slug>
  slash      the 627 legacy trailing-slash URLs (legacy_url_audit_2026-10-06.csv,
             class 3xx_slash_only_to_live) and every listing page with a slash:
             301 to the bare slug
  gone       the legacy URLs that are 404 or soft 404 live (the audit's 404,
             soft404 and 3xx_slash_only_to_soft404 classes) and a made-up URL:
             404 with the site's 404 page
  probes     mixed case and double slashes: recorded, not judged (the ticket
             asks to confirm what Netlify's normalisation does)

A 301 counts when its Location, made absolute against the base, has the
expected path. Usage (from gba/newbuild, after npm run build):
  .venv/bin/python -I tests/redirects.py --base https://<staging-host>
  .venv/bin/python -I tests/redirects.py --base http://localhost:8888   # netlify serve
Writes tests/reports/<date>-redirects/report.json; exit 1 on any mismatch.
"""
import argparse
import csv
import json
import re
import sys
from concurrent.futures import ThreadPoolExecutor
from datetime import date
from pathlib import Path
from urllib.parse import urljoin, urlsplit

import requests

ROOT = Path(__file__).resolve().parent.parent
AUDIT = ROOT.parent / "GBA-site-audits" / "2026-10-06" / "legacy_url_audit_2026-10-06.csv"
# Splat rules are checked through the URLs the live site was seen redirecting.
SPLAT_EXAMPLES = {
    "/broker-review/*": ["/broker-review/jon-buehler"],
    "/team/*": ["/team/gary-hallett", "/team/cal-heseman", "/team/nancy-hallett"],
    "/blog/page/*": ["/blog/page/4", "/blog/page/8", "/blog/page/10", "/blog/page/11"],
}
PROBES = ["/Start-Here", "/START-HERE", "/News-And-Events/12", "//start-here", "/news-and-events//12", "/start-here//"]


def cases(dist):
    out = []  # (group, url, expected status, expected path or None)
    index = json.loads((ROOT / "src" / "content" / "index.json").read_text())
    for v in index.values():
        out.append(("pages", v["path"], 200, None))
    listing = sorted(int(p.stem) for p in (dist / "news-and-events").glob("*.html"))
    for offset in listing:
        out.append(("pages", f"/news-and-events/{offset}", 200, None))
        out.append(("slash", f"/news-and-events/{offset}/", 301, f"/news-and-events/{offset}"))
    out.append(("slash", "/news-and-events/", 301, "/news-and-events"))

    rules = []
    for line in (dist / "_redirects").read_text().splitlines():
        parts = line.split()
        if len(parts) == 3 and not line.startswith("#"):
            rules.append(parts)
    for source, target, code in rules:
        if source.startswith("/news-and-events/") and target == source[len("/news-and-events"):]:
            out.append(("articles", source, int(code), target))
        elif source.endswith("*"):
            for url in SPLAT_EXAMPLES[source]:
                out.append(("rules", url, int(code), target))
        else:
            out.append(("rules", source, int(code), target))
            out.append(("rules", source + "/", int(code), target))

    with AUDIT.open() as f:
        for row in csv.DictReader(f):
            path, cls = row["legacy_path"], row["class"]
            if cls == "3xx_slash_only_to_live":
                bare = path.rstrip("/")
                if any(r[0] == bare for r in rules):
                    continue  # a rule covers it (/lshowcase-categories/home)
                if bare.startswith("/team/"):
                    continue  # the /team/* rule, checked above
                out.append(("slash", path, 301, bare))
            elif cls in ("404", "soft404", "3xx_slash_only_to_soft404"):
                if "?" in path or not path.startswith("/"):
                    continue  # query strings: the path alone decides on a static host
                bare = path.rstrip("/") or "/"
                if any(re.fullmatch(r[0].replace("*", ".*"), bare) for r in rules):
                    continue  # now redirected on purpose (the retired pages, /blog/...)
                out.append(("gone", path, 404, None))
    out.append(("gone", "/this-page-does-not-exist", 404, None))
    for p in PROBES:
        out.append(("probes", p, None, None))
    return out


def check(session, base, case):
    group, url, want_status, want_path = case
    try:
        r = session.get(base + url, allow_redirects=False, timeout=30)
    except requests.RequestException as e:
        return {"group": group, "url": url, "ok": False, "got": f"error {e.__class__.__name__}"}
    loc = r.headers.get("Location")
    got_path = urlsplit(urljoin(base + url, loc)).path if loc else None
    rec = {"group": group, "url": url, "status": r.status_code, "location": loc}
    if want_status is None:
        rec["ok"] = None
    elif want_status == 404:
        rec["ok"] = r.status_code == 404 and "Page Not Found" in r.text
    elif want_status == 200:
        rec["ok"] = r.status_code == 200
    else:
        rec["ok"] = r.status_code == want_status and got_path == want_path
        rec["expected"] = want_path
    return rec


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--base", required=True)
    ap.add_argument("--dist", type=Path, default=ROOT / "dist")
    ap.add_argument("--out", type=Path, default=ROOT / "tests" / "reports" / f"{date.today()}-redirects")
    ap.add_argument("--workers", type=int, default=8)
    args = ap.parse_args()
    base = args.base.rstrip("/")
    todo = cases(args.dist)
    session = requests.Session()
    with ThreadPoolExecutor(args.workers) as pool:
        results = list(pool.map(lambda c: check(session, base, c), todo))
    groups = {}
    for r in results:
        g = groups.setdefault(r["group"], {"checked": 0, "failed": 0})
        g["checked"] += 1
        g["failed"] += r["ok"] is False
    args.out.mkdir(parents=True, exist_ok=True)
    (args.out / "report.json").write_text(json.dumps({"base": base, "groups": groups, "results": results}, indent=1))
    for name, g in groups.items():
        print(f"{name:9} {g['checked']:5} checked, {g['failed']} failed")
    for r in results:
        if r["group"] == "probes":
            print(f"  probe {r['url']:24} {r.get('status')} {r.get('location') or ''}")
    bad = [r for r in results if r["ok"] is False]
    for r in bad[:30]:
        print(f"  FAIL {r['group']}: {r['url']} -> {r.get('status', r.get('got'))} {r.get('location') or ''} (expected {r.get('expected', '')})")
    print(f"report: {args.out / 'report.json'}")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
