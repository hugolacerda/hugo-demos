#!/usr/bin/env python3
"""SEO check of the whole site (map ticket 15): the crawl its Question asks for.

For every page the build makes (or a running site serves, with --base):
  title        present, and unique among the indexable pages (all but the
               near-duplicate copies and the 404)
  description  present, one line
  canonical    absolute, on the apex domain, and the page's own URL, except the
               44 near-duplicate copies (their twin, src/data/duplicates.json)
               and the 404 (none, noindex)
  sharing      og:title, og:description, og:url (= canonical), og:image and the
               twitter tags, with the image a file the site serves
  headings     one H1, first, no level skipped
  json-ld      the LocalBusiness block parses and names the page's own URL
and for the site:
  sitemap      well-formed, the sitemaps.org namespace, no URL twice, every
               <loc> an indexable page and every indexable page listed
  robots       robots.txt names the sitemap
  icons        /favicon.ico, /favicon.png and /apple-touch-icon.png are served

Usage (from gba/newbuild):
  .venv/bin/python -I tests/seo.py                         # dist/, after npm run build
  .venv/bin/python -I tests/seo.py --base https://<host>   # a running site (staging)
Exit 1 on any failure.
"""
import argparse
import collections
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlsplit

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://gatewaybusinessadvisors.com"
NS = "{http://www.sitemaps.org/schemas/sitemap/0.9}"


class Source:
    """Reads site paths from dist/ (Pretty URLs) or over HTTP."""

    def __init__(self, dist, base):
        self.dist, self.base = dist, base.rstrip("/") if base else None
        if self.base:
            import requests
            self.http = requests.Session()

    def get(self, path):
        if self.base:
            r = self.http.get(self.base + path, timeout=30)
            return r.content if r.status_code == 200 else None
        f = self.dist / path.lstrip("/")
        if path == "/":
            f = self.dist / "index.html"
        elif not f.is_file():
            f = self.dist / (path.strip("/") + ".html")
        return f.read_bytes() if f.is_file() else None


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--dist", type=Path, default=ROOT / "dist")
    ap.add_argument("--base")
    args = ap.parse_args()
    src = Source(args.dist, args.base)
    duplicates = {k: v["canonical"] for k, v in json.loads((ROOT / "src" / "data" / "duplicates.json").read_text()).items()}
    index = json.loads((ROOT / "src" / "content" / "index.json").read_text())
    listing = sorted(int(p.stem) for p in (args.dist / "news-and-events").glob("*.html"))
    paths = sorted(v["path"] for v in index.values()) + [f"/news-and-events/{o}" for o in listing] + ["/404"]
    fail = collections.defaultdict(list)
    titles = collections.defaultdict(list)
    indexable = set()

    for path in paths:
        raw = src.get(path) if path != "/404" else (args.dist / "404.html").read_bytes()
        if raw is None:
            fail["fetch"].append(path)
            continue
        s = BeautifulSoup(raw, "lxml")
        meta = lambda **kw: (s.find("meta", attrs=kw) or {}).get("content")  # noqa: E731
        title = s.title.get_text() if s.title else ""
        desc = meta(name="description") or ""
        canon = (s.find("link", rel="canonical") or {}).get("href")
        is_404 = path == "/404"
        if not is_404 and path not in duplicates:
            indexable.add(path)
            titles[title].append(path)
        if not title.strip():
            fail["title"].append(f"{path}: none")
        if not desc.strip() or "\n" in desc:
            fail["description"].append(f"{path}: {'none' if not desc.strip() else 'line break'}")
        want = None if is_404 else SITE + duplicates.get(path, path)
        if canon != want:
            fail["canonical"].append(f"{path}: {canon} (want {want})")
        if is_404 and meta(name="robots") != "noindex":
            fail["canonical"].append("/404: not noindex")
        for prop in ("og:title", "og:description", "og:image", "og:type", "og:site_name"):
            if not meta(property=prop):
                fail["sharing"].append(f"{path}: no {prop}")
        if not is_404 and meta(property="og:url") != canon:
            fail["sharing"].append(f"{path}: og:url {meta(property='og:url')} != canonical")
        if meta(property="og:title") != title or meta(property="og:description") != desc:
            fail["sharing"].append(f"{path}: og title/description differ from the page's")
        for name in ("twitter:card", "twitter:title", "twitter:description", "twitter:image"):
            if not meta(name=name):
                fail["sharing"].append(f"{path}: no {name}")
        image = meta(property="og:image") or ""
        if not image.startswith(SITE + "/"):
            fail["sharing"].append(f"{path}: og:image not on the apex: {image}")
        elif src.get(urlsplit(image).path) is None and not (args.dist / urlsplit(image).path.lstrip("/")).exists():
            fail["sharing"].append(f"{path}: og:image missing: {image}")
        levels = [int(h.name[1]) for h in s.find_all(re.compile(r"^h[1-6]$"))]
        if not levels or levels[0] != 1 or levels.count(1) != 1 or any(b > a + 1 for a, b in zip(levels, levels[1:])):
            fail["headings"].append(f"{path}: {levels[:8]}")
        blocks = s.find_all("script", type="application/ld+json")
        try:
            data = [json.loads(b.string) for b in blocks]
            if not is_404 and not any(d.get("url") == SITE + path for d in data):
                fail["json-ld"].append(f"{path}: url is not the page's")
        except (json.JSONDecodeError, TypeError) as e:
            fail["json-ld"].append(f"{path}: {e}")

    for title, where in titles.items():
        if len(where) > 1:
            fail["unique titles"].append(f"{title!r}: {', '.join(where)}")

    sm = src.get("/sitemap.xml")
    if sm is None:
        fail["sitemap"].append("no /sitemap.xml")
    else:
        root = ET.fromstring(sm)
        if root.tag != NS + "urlset":
            fail["sitemap"].append(f"root is {root.tag}")
        locs = [u.findtext(NS + "loc") for u in root.findall(NS + "url")]
        lastmods = [u.findtext(NS + "lastmod") for u in root.findall(NS + "url")]
        dup = [l for l, n in collections.Counter(locs).items() if n > 1]
        listed = {l[len(SITE):] or "/" for l in locs if l.startswith(SITE)}
        if dup:
            fail["sitemap"].append(f"{len(dup)} URLs twice")
        if len(listed) != len(locs):
            fail["sitemap"].append("a <loc> is not on the apex")
        for p in sorted(listed - indexable):
            fail["sitemap"].append(f"listed but not an indexable page: {p}")
        for p in sorted(indexable - listed - {f'/news-and-events/{o}' for o in listing}):
            fail["sitemap"].append(f"indexable page not listed: {p}")
        bad_dates = [d for d in lastmods if d and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", d)]
        if bad_dates:
            fail["sitemap"].append(f"{len(bad_dates)} bad lastmod values")
        print(f"sitemap: {len(locs)} URLs, {sum(1 for d in lastmods if d)} with lastmod")
    robots = src.get("/robots.txt")
    if not robots or f"Sitemap: {SITE}/sitemap.xml" not in robots.decode():
        fail["robots"].append("robots.txt does not name the sitemap")
    for icon in ("/favicon.ico", "/favicon.png", "/apple-touch-icon.png"):
        if src.get(icon) is None:
            fail["icons"].append(f"{icon} not served")

    print(f"pages: {len(paths)} checked, {len(indexable)} indexable, {len(duplicates)} canonical to a twin, 1 noindex (404)")
    for kind in ("fetch", "title", "description", "canonical", "sharing", "headings", "json-ld", "unique titles", "sitemap", "robots", "icons"):
        items = fail.get(kind, [])
        print(f"{kind:14} {'ok' if not items else f'{len(items)} problems'}")
        for line in items[:10]:
            print("    " + line)
    sys.exit(1 if any(fail.values()) else 0)


if __name__ == "__main__":
    main()
