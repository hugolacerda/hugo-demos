#!/usr/bin/env python3
"""
Content extraction: harvest/<date>/pages/*.html  ->  src/content/

Ticket 07 of the GBA site rebuild map. Rules from the map's Notes:
  * visible content is ported verbatim, punctuation included;
  * hidden content is not ported: header menu copies (display:none), `d-none` blocks,
    the font-size-0 `.seo-tag` headings, Lorem Ipsum placeholders, HTML comments;
  * anything invisible may change: site-absolute and staging-host links become root-relative.

Output, one file per sitemap URL:
  src/content/articles/<slug>.html   front matter + the article body markup (622)
  src/content/pages/<slug>.html      front matter + the page's main markup minus header chrome (18)
  src/content/index.json             slug -> file, kind, title, canonical path
  src/content/README.md              the format and how to load it
  harvest/<date>/extract-report.json the check results
"""
import argparse, collections, difflib, json, os, re, sys
from urllib.parse import urlparse
from bs4 import BeautifulSoup, Comment, NavigableString

HOST = "gatewaybusinessadvisors.com"
STAGING = "gba.consultprdevsites-18.com"
HEADER_CLASSES = {"mobileheader", "desktopheader", "offcanvas"}
PARSER = "lxml"
STOP = {"a", "an", "the", "of", "for", "to", "your", "is", "and", "in", "on", "at", "with", "you", "it", "be", "are", "that", "s"}


def yaml_str(v):
    return json.dumps(v, ensure_ascii=False)


def fm(d):
    lines = ["---"]
    for k, v in d.items():
        if isinstance(v, list):
            if not v:
                lines.append(f"{k}: []")
            else:
                lines.append(f"{k}:")
                for x in v:
                    lines.append(f"  - {yaml_str(x) if not isinstance(x, dict) else json.dumps(x, ensure_ascii=False)}")
        elif v is None:
            lines.append(f"{k}: null")
        elif isinstance(v, bool):
            lines.append(f"{k}: {'true' if v else 'false'}")
        elif isinstance(v, (int, float)):
            lines.append(f"{k}: {v}")
        else:
            lines.append(f"{k}: {yaml_str(v)}")
    lines.append("---")
    return "\n".join(lines) + "\n"


def relativise(url):
    """Site-absolute and staging-host URLs -> root-relative; double slashes collapsed."""
    if not url:
        return url
    u = url.strip()
    m = re.match(r"^(?:https?:)?//(?:www\.)?(" + re.escape(HOST) + "|" + re.escape(STAGING) + r")(/.*|$)", u)
    if m:
        u = m.group(2) or "/"
    if u.startswith("/"):
        u = re.sub(r"/{2,}", "/", u)
        u = re.sub(r"^/news-and-events/(?!\d+$)([a-z0-9][a-z0-9-]*)$", r"/\1", u)  # the live 301s; not the pagination pages
    return u


def is_pure_hidden(el):
    cls = el.get("class") or []
    if "theloop" in cls:
        return False  # affiliations rows: display:none from the server, revealed by Load More (ticket 11)
    if "seo-tag" in cls:
        return True
    if "d-none" in cls and not any(re.match(r"d-(sm|md|lg|xl|xxl)-(block|flex|inline|inline-block|grid|table)", c) for c in cls):
        return True
    st = (el.get("style") or "").replace(" ", "").lower()
    if "display:none" in st or "font-size:0" in st:
        return True
    return False


def clean(root):
    """Strip hidden content and comments from a parsed fragment, rewrite links. In place."""
    for c in root.find_all(string=lambda t: isinstance(t, Comment)):
        c.extract()
    for el in list(root.find_all(True)):
        if el.parent is None:
            continue
        if is_pure_hidden(el):
            el.decompose()
    for el in root.find_all(class_="theloop"):
        del el["style"]  # the template decides which rows start hidden
    # Form leftovers (ticket 11): browser-extension attributes, the per-load token, and the
    # visually hidden label, which becomes an aria-label on its control (no visually hidden text).
    for el in root.find_all(attrs={"fdprocessedid": True}):
        del el["fdprocessedid"]
    for el in root.find_all("input", attrs={"name": "cprmtok"}):
        el["value"] = ""
    for label in root.find_all("label", class_="visuallyhidden"):
        target = root.find(id=label.get("for")) if label.get("for") else None
        if target is not None:
            target["aria-label"] = label.get_text(strip=True)
        label.decompose()
    for el in root.find_all(True):
        for attr in ("href", "src", "poster", "data-src", "action"):
            if el.get(attr):
                el[attr] = relativise(el[attr])
        if el.get("srcset"):
            el["srcset"] = ", ".join(" ".join([relativise(p.strip().split(" ")[0])] + p.strip().split(" ")[1:]) for p in el["srcset"].split(","))
        if el.get("style") and "url(" in el["style"]:
            el["style"] = re.sub(r"url\((['\"]?)([^'\")]+)\1\)", lambda m: f"url({m.group(1)}{relativise(m.group(2))}{m.group(1)})", el["style"])
    return root


def banner_height(hb):
    """The fixed banner height (px) an article's own <style> sets, or None (ticket 11).

    The 58 articles with their own banner photo carry `.headbanner{height:550px !important}`
    inside the headbanner; the template applies it, so the height is front matter."""
    style = hb.find("style") if hb else None
    m = re.search(r"height:\s*(\d+)px", style.get_text()) if style else None
    return int(m.group(1)) if m else None


def inner_html(el):
    return "".join(str(c) for c in el.contents)


def visible_text(el):
    for t in el(["script", "style", "noscript", "template"]):
        t.decompose()
    return re.sub(r"\s+", " ", el.get_text(" ", strip=True)).strip()


def head_meta(soup):
    md = soup.find("meta", attrs={"name": "description"})
    can = soup.find("link", rel="canonical")
    og = {m.get("property"): m.get("content") for m in soup.find_all("meta") if (m.get("property") or "").startswith("og:")}
    return {
        "meta_title": soup.title.get_text(strip=True) if soup.title else "",
        "meta_description": (md.get("content") or "").strip() if md else "",
        "canonical": relativise(can.get("href")) if can else None,
        "og_empty": all(not v for v in og.values()) if og else None,
    }


def norm_slug(slug):
    s = re.sub(r"-\d+$", "", slug)
    return "-".join(w for w in s.split("-") if w not in STOP)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--harvest", required=True, help="harvest/<date> folder")
    ap.add_argument("--out", required=True, help="src/content folder")
    args = ap.parse_args()
    H = args.harvest
    st = json.load(open(os.path.join(H, "state.json")))
    os.makedirs(os.path.join(args.out, "articles"), exist_ok=True)
    os.makedirs(os.path.join(args.out, "pages"), exist_ok=True)

    def path_of(url):
        p = urlparse(url).path
        return p if p == "/" else p.rstrip("/")

    def load(slug):
        return BeautifulSoup(open(os.path.join(H, "pages", slug + ".html"), "rb").read(), PARSER)

    # ---- listing excerpts (from /news-and-events and its pagination pages)
    # In listing order (page offset, then card), so the first time an article is
    # shown sets its position: the rebuild lists each article once (ticket 11).
    excerpts = {}
    cards = {}  # href -> {"order", "image"} for the listing template (ticket 11); card titles equal article titles
    listing_dupes = collections.Counter()
    listing_pages = sorted(
        (int(m.group(1) or 0), rec["slug"])
        for url, rec in st["pages"].items()
        for m in [re.match(r"^/news-and-events(?:/(\d+))?$", path_of(url))] if m
    )
    for _offset, page_slug in listing_pages:
        for card in load(page_slug).find_all(class_="news-card"):
            a = card.find(class_="card-title").find("a", href=True)
            href = relativise(a["href"])
            listing_dupes[href] += 1
            ps = card.find_all("p")
            ex = inner_html(ps[-1]).strip() if ps else ""
            excerpts.setdefault(href, ex)
            if href not in cards:
                img = card.select_one(".card-image img")
                cards[href] = {
                    "order": len(cards),
                    "image": {"src": relativise(img.get("src")), "alt": img.get("alt"), "width": img.get("width"), "height": img.get("height")} if img else None,
                }

    report = {"articles": 0, "pages": 0, "skipped": [], "anomalies": [], "alt_review": [], "checks": {}}
    index = {}
    article_meta = {}
    alt_counter = collections.Counter()
    generic_alt = re.compile(r"^(image|img|photo|picture|banner( jpg)?|logo|icon|gba mobile|untitled|\d+|.*\.(jpe?g|png|gif|webp))$", re.I)

    for url, rec in sorted(st["pages"].items()):
        path = path_of(url)
        if re.match(r"^/news-and-events/\d+$", path):
            continue  # pagination pages are generated, not content
        soup = load(rec["slug"])
        main = soup.find(attrs={"role": "main"})
        if main is None:
            report["skipped"].append({"url": url, "why": "no role=main"})
            continue
        meta = head_meta(soup)
        slug = "home" if path == "/" else path.strip("/")
        # alt-text survey before cleaning (what is live)
        for img in main.find_all("img"):
            alt = (img.get("alt") or "").strip()
            key = "empty" if not alt else ("generic" if generic_alt.match(alt) else "ok")
            alt_counter[key] += 1
            if key != "ok" and len(report["alt_review"]) < 400:
                report["alt_review"].append({"page": path, "src": relativise(img.get("src") or ""), "alt": alt})

        is_article = main.find(class_="news_events") is not None and path not in ("/sitemap",)
        if is_article:
            ne = main.find(class_="news_events")
            title_el = ne.find(["h1", "h2", "h3"], class_="scrollText") or ne.find(["h1", "h2", "h3"])
            author_el = ne.find("h6")
            body = ne.find("div", class_=lambda c: c and "mt-3" in c and "px-0" in c and "container" in c)
            hb = main.find(class_="headbanner")
            banner_img = hb.find("img") if hb else None
            section_el = hb.find("h2") if hb else None
            if not (title_el and body):
                report["anomalies"].append({"url": url, "why": "article without title or body container"}); continue
            # anything visible in news_events outside the title block and body?
            extra = [x for x in ne.find_all(["p", "h1", "h2", "h3", "h4", "h5", "img", "ul", "table"]) if x not in body.find_all(True) and x not in (title_el, author_el) and not any(is_pure_hidden(a) for a in [x] + list(x.parents) if a.name)]
            if extra:
                report["anomalies"].append({"url": url, "why": f"{len(extra)} visible elements outside title/body", "sample": str(extra[0])[:120]})
            clean(body)
            title = re.sub(r"\s+", " ", title_el.get_text(" ", strip=True))
            author = re.sub(r"\s+", " ", author_el.get_text(" ", strip=True)) if author_el else ""
            front = {
                "slug": slug, "kind": "article", "path": path,
                "title": title, "author": author,
                "excerpt": excerpts.get(path, ""),
                "listing_order": cards[path]["order"] if path in cards else None,
                "listing_image": cards[path]["image"] if path in cards else None,
                "section_label": section_el.get_text(strip=True) if section_el else "",
                "banner": relativise(banner_img.get("src")) if banner_img else None,
                "banner_alt": banner_img.get("alt") if banner_img else None,
                "banner_height": banner_height(hb),
                "meta_title": meta["meta_title"], "meta_description": meta["meta_description"], "canonical": meta["canonical"],
                "related_links": [{"text": a.get_text(strip=True), "href": relativise(a["href"])} for a in (main.find(class_="weblinks") or soup.new_tag("x")).find_all("a", href=True)],
                "source": f"{os.path.basename(H)}/pages/{rec['slug']}.html",
            }
            out = os.path.join(args.out, "articles", slug + ".html")
            open(out, "w").write(fm(front) + str(body) + "\n")
            index[slug] = {"kind": "article", "path": path, "file": f"articles/{slug}.html", "title": title}
            article_meta[slug] = {"title": title, "body_text": visible_text(BeautifulSoup(str(body), PARSER)), "path": path}
            report["articles"] += 1
        else:
            keep = []
            for child in main.find_all(recursive=False):
                cls = set(child.get("class") or [])
                if cls & HEADER_CLASSES or "footer" in cls:
                    continue
                if isinstance(child, NavigableString):
                    continue
                keep.append(child)
            frag = BeautifulSoup("<div id='__wrap'></div>", PARSER).find(id="__wrap")
            for k in keep:
                frag.append(k)
            clean(frag)
            hb = frag.find(class_="headbanner")
            banner_img = hb.find("img") if hb else None
            h1_text = (hb.find(["h1", "h2"]).get_text(" ", strip=True) if hb and hb.find(["h1", "h2"]) else "")
            sections = sorted({c for ch in frag.find_all(recursive=False) for c in (ch.get("class") or []) if c not in ("sec-pad", "bg-light", "bg-dark", "bg-white", "position-relative", "mt-0", "clearfix", "container", "my-5")})
            front = {
                "slug": slug, "kind": "page", "path": path,
                "title": h1_text or meta["meta_title"],
                "banner": relativise(banner_img.get("src")) if banner_img else None,
                "banner_alt": banner_img.get("alt") if banner_img else None,
                "sections": sections,
                "meta_title": meta["meta_title"], "meta_description": meta["meta_description"], "canonical": meta["canonical"],
                "source": f"{os.path.basename(H)}/pages/{rec['slug']}.html",
            }
            out = os.path.join(args.out, "pages", slug + ".html")
            open(out, "w").write(fm(front) + inner_html(frag).strip() + "\n")
            index[slug] = {"kind": "page", "path": path, "file": f"pages/{slug}.html", "title": front["title"]}
            report["pages"] += 1

    # ---- near-duplicate article pairs, computed from the slugs and bodies
    groups = collections.defaultdict(list)
    for slug, m in article_meta.items():
        groups[norm_slug(slug)].append(slug)
    pairs = []
    for key, slugs in groups.items():
        if len(slugs) < 2:
            continue
        slugs = sorted(slugs)
        for i in range(len(slugs)):
            for j in range(i + 1, len(slugs)):
                a, b = article_meta[slugs[i]], article_meta[slugs[j]]
                ratio = difflib.SequenceMatcher(None, a["body_text"], b["body_text"], autojunk=False).quick_ratio()
                pairs.append({"a": a["path"], "b": b["path"], "title_a": a["title"], "title_b": b["title"], "body_similarity": round(ratio, 3), "same_title": a["title"].strip().lower() == b["title"].strip().lower()})
    pairs.sort(key=lambda p: -p["body_similarity"])

    report["near_duplicate_pairs"] = pairs
    report["alt_counts"] = dict(alt_counter)
    report["listing"] = {"cards": sum(listing_dupes.values()), "unique": len(listing_dupes), "shown_twice": sorted(k for k, v in listing_dupes.items() if v > 1), "articles_without_excerpt": sorted(p for s, m in article_meta.items() for p in [m["path"]] if not excerpts.get(p))}
    json.dump(index, open(os.path.join(args.out, "index.json"), "w"), indent=1, ensure_ascii=False)
    json.dump(report, open(os.path.join(H, "extract-report.json"), "w"), indent=1, ensure_ascii=False)
    print(f"articles {report['articles']}, pages {report['pages']}, skipped {len(report['skipped'])}, anomalies {len(report['anomalies'])}, pairs {len(pairs)}, alt {dict(alt_counter)}")
    for a in report["anomalies"][:10]:
        print("  anomaly:", a)


if __name__ == "__main__":
    main()
