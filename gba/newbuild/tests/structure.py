#!/usr/bin/env python3
"""Structure check of the whole build against the harvest (map ticket 11).

The fidelity check (tests/fidelity.py) compares pixels on 15 pages; this one
reads every built page without a browser and checks what pixels cannot cover
at scale:

  text      every sitemap URL's visible text inside <main> equals the harvested
            page's (hidden content dropped on both sides, by the extractor's own
            rules), so all 640 routes carry the content they carry live;
  listing   the 52 listing pages show each article once, in live order, and
            page 1 matches the live page 1 card for card;
  headings  every page has one H1, it is the first heading, and no level is skipped;
  links     every root-relative href and src resolves to a file in dist/
            (pages by Pretty URL), listed by target when it does not.

Known differences are reported, not failed: the links ticket 14 will redirect
(LATER_REDIRECTS).

Usage (from gba/newbuild, after npm run build):
  .venv/bin/python -I tests/structure.py [--dist dist] [--harvest harvest/2026-10-24]
Exit 1 when a text, listing or heading check fails or a link target is missing.
"""
import argparse
import collections
import json
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
from extract import HEADER_CLASSES, is_pure_hidden  # noqa: E402

# Links on live pages that ticket 14 turns into 301s (its Question lists them).
LATER_REDIRECTS = {"/businesses-weve-sold", "/industries-we-service", "/site-map", "/lshowcase-categories/home",
                   "/what-type-of-buyer-are-you", "/faqs", "/financing", "/white-papers", "/videos", "/industry-terms"}
PER_PAGE = 12


def soup_of(path):
    return BeautifulSoup(path.read_bytes(), "lxml")


def visible_text(root):
    """Text a visitor sees inside `root`: comments, scripts, header chrome and hidden elements dropped
    (the visually hidden "Service Needed?" label too: the port makes it an aria-label)."""
    for el in root.find_all(["script", "style", "noscript", "template"]):
        el.decompose()
    for el in list(root.find_all(True)):
        if el.parent is None:
            continue
        cls = set(el.get("class") or [])
        if cls & HEADER_CLASSES or "footer" in cls or "visuallyhidden" in cls or (is_pure_hidden(el) and "theloop" not in cls):
            el.decompose()
    for el in root.find_all(["input", "select", "textarea", "button"]):
        el.decompose()  # form controls: their markup is ticket 13's
    return re.sub(r"\s+", " ", root.get_text(" ", strip=True)).strip()


def built(dist, path):
    return dist / ("index.html" if path == "/" else path.strip("/") + ".html")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dist", type=Path, default=ROOT / "dist")
    ap.add_argument("--harvest", type=Path, default=ROOT / "harvest" / "2026-10-24")
    args = ap.parse_args()
    dist, harvest = args.dist, args.harvest
    failures = collections.defaultdict(list)

    # ---- text: every sitemap URL
    xml = (harvest / "sitemap.xml").read_text()
    paths = sorted({re.sub(r"^https?://(www\.)?gatewaybusinessadvisors\.com", "", u.strip()).rstrip("/") or "/"
                    for u in re.findall(r"<loc>(.*?)</loc>", xml)})
    state = json.loads((harvest / "state.json").read_text())
    slug_of = {(urlsplit(u).path.rstrip("/") or "/"): rec["slug"] for u, rec in state["pages"].items()}
    for path in paths:
        page = built(dist, path)
        if not page.exists():
            failures["text"].append(f"{path}: not built")
            continue
        live = visible_text(soup_of(harvest / "pages" / f"{slug_of[path]}.html").find(attrs={"role": "main"}))
        ours = visible_text(soup_of(page).find("main"))
        if path == "/news-and-events":
            continue  # the listing is checked below
        if live != ours:
            i = next((k for k, (a, b) in enumerate(zip(live, ours)) if a != b), min(len(live), len(ours)))
            failures["text"].append(f"{path}: differs at {i}: live …{live[max(0, i - 40):i + 60]!r} ours …{ours[max(0, i - 40):i + 60]!r}")
    print(f"text: {len(paths)} sitemap URLs, {len(failures['text'])} differ")

    # ---- listing
    live_order = []
    for offset in range(0, 1000, PER_PAGE):
        f = harvest / "pages" / ("news-and-events.html" if offset == 0 else f"news-and-events__{offset}.html")
        if not f.exists():
            break
        for a in soup_of(f).select(".news-card .card-title a"):
            href = re.sub(r"^https?://(www\.)?gatewaybusinessadvisors\.com", "", a["href"])
            if href not in live_order:
                live_order.append(href)
    ours_order, pages = [], 0
    for offset in range(0, 1000, PER_PAGE):
        f = dist / ("news-and-events.html" if offset == 0 else f"news-and-events/{offset}.html")
        if not f.exists():
            break
        pages += 1
        cards = [a["href"] for a in soup_of(f).select(".news-card .card-title a")]
        if len(cards) != PER_PAGE and (dist / f"news-and-events/{offset + PER_PAGE}.html").exists():
            failures["listing"].append(f"page {pages}: {len(cards)} cards")
        ours_order += cards
    if ours_order != live_order:
        failures["listing"].append(f"order differs from the live first-shown order ({len(ours_order)} vs {len(live_order)} cards)")
    live_p1 = visible_text(soup_of(harvest / "pages" / "news-and-events.html").find(attrs={"role": "main"}))
    ours_p1 = visible_text(soup_of(dist / "news-and-events.html").find("main"))
    if live_p1 != ours_p1:
        failures["listing"].append("page 1 text differs from the live page 1")
    print(f"listing: {pages} pages, {len(ours_order)} cards, {len(set(ours_order))} unique, {len(failures['listing'])} problems")

    # ---- headings and links: every built page
    missing = collections.defaultdict(set)
    later = collections.defaultdict(set)
    files = sorted(dist.rglob("*.html"))
    for f in files:
        s = soup_of(f)
        rel = "/" + str(f.relative_to(dist))[:-5]
        levels = [int(h.name[1]) for h in s.find_all(re.compile(r"^h[1-6]$"))]
        if levels.count(1) != 1 or not levels or levels[0] != 1:
            failures["headings"].append(f"{rel}: h1 count {levels.count(1)}, first h{levels[0] if levels else '-'}")
        for prev, cur in zip(levels, levels[1:]):
            if cur > prev + 1:
                failures["headings"].append(f"{rel}: h{prev} then h{cur}")
                break
        for el in s.find_all(["a", "img", "link", "script", "source"]):
            for attr in ("href", "src"):
                url = el.get(attr)
                if not url or not url.startswith("/") or url.startswith("//"):
                    continue
                target = unquote(urlsplit(url).path)
                if target in LATER_REDIRECTS:
                    later[target].add(rel)
                    continue
                if target == "/" or (dist / target.lstrip("/")).is_file() or built(dist, target).is_file():
                    continue
                missing[target].add(rel)
    print(f"headings: {len(files)} pages, {len(failures['headings'])} problems")
    print(f"links: {len(missing)} missing targets; {len(later)} targets left to ticket 14's redirects")
    for target, pages_from in sorted(later.items()):
        print(f"  later 301: {target} (linked from {len(pages_from)} pages)")
    for target, pages_from in sorted(missing.items()):
        failures["links"].append(f"{target} (from {len(pages_from)} pages, e.g. {sorted(pages_from)[0]})")

    for kind, items in failures.items():
        print(f"\n{kind}: {len(items)}")
        for line in items[:25]:
            print("  " + line)
    sys.exit(1 if any(failures.values()) else 0)


if __name__ == "__main__":
    main()
