#!/usr/bin/env python3
"""
GBA harvest: re-crawl every live sitemap URL and download every asset they reference.

Ticket 06 of the GBA site rebuild map (Obsidian KB, Maps/gba-site-rebuild).

Rules carried from the map's Notes:
  * Firefox user agent.
  * At least one second between requests (MIN_DELAY plus random jitter).
  * Stop on the first HTTP 202 or any response carrying the `sg-captcha` header.
  * Resume-safe: a second run skips what the first run already saved.

Outputs (relative to gba/newbuild/):
  harvest/<date>/pages/<slug>.html          raw bytes of every page
  harvest/<date>/pages/<slug>.meta.json     status, final URL, redirect chain, headers, sha1
  harvest/<date>/sitemap.xml, robots.txt    the live files as served
  harvest/<date>/state.json                 incremental state, the resume point
  harvest/<date>/manifest.json              machine-readable manifest
  harvest/<date>/MANIFEST.md                the human summary
  harvest/<date>/harvest.log                one line per request
  public/<original path>                    every asset at its live path

Offline mode (--offline EVIDENCE_DIR) replays the Oct 6 captures instead of
fetching, so the parsing and the manifest can be tested without touching the host.
"""
import argparse
import datetime as dt
import hashlib
import json
import os
import random
import re
import sys
import time
from urllib.parse import urljoin, urlparse, urldefrag

import requests
from bs4 import BeautifulSoup

HOST = "gatewaybusinessadvisors.com"
BASE = f"https://{HOST}"
STAGING_HOST = "gba.consultprdevsites-18.com"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0"
MIN_DELAY = 1.0
JITTER = 0.6
TIMEOUT = 30
PARSER = "lxml"

ASSET_EXT = re.compile(
    r"\.(png|jpe?g|gif|svg|webp|avif|ico|bmp|css|js|map|woff2?|ttf|otf|eot|pdf|mp4|webm|mp3|"
    r"docx?|xlsx?|pptx?|zip|txt|xml|json)$", re.I)
PAGINATION_RE = re.compile(r"^/news-and-events/(\d+)/?$")
CSS_URL_RE = re.compile(r"url\(\s*['\"]?([^'\")]+)['\"]?\s*\)")
INLINE_URL_RE = re.compile(r"url\(\s*['\"]?([^'\")]+)['\"]?\s*\)")
FONT_FACE_RE = re.compile(r"@font-face\s*\{([^}]*)\}", re.I | re.S)


class CaptchaWall(Exception):
    pass


def now_utc():
    return dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")


def sha1(b):
    return hashlib.sha1(b).hexdigest()


def page_slug(url):
    path = urlparse(url).path.strip("/") or "home"
    return re.sub(r"[^A-Za-z0-9._-]+", "_", path.replace("/", "__"))


def evidence_slug(url):
    """The slug scheme the Oct 6 crawl.py used, for finding the comparison capture."""
    path = urlparse(url).path.strip("/") or "home"
    return re.sub(r"[^A-Za-z0-9._-]+", "_", path)


def canon_page_url(u):
    """Normalise a page URL to https://HOST/path (no www, no fragment, no trailing slash except root)."""
    u, _ = urldefrag(u.strip())
    p = urlparse(u)
    host = p.netloc.lower().replace("www.", "")
    if host and host != HOST:
        return None
    path = p.path or "/"
    if len(path) > 1:
        path = path.rstrip("/")
    return f"{BASE}{path}" + (f"?{p.query}" if p.query else "")


# ----------------------------------------------------------------------------- fetchers

class LiveFetcher:
    def __init__(self, log, max_requests):
        self.s = requests.Session()
        self.s.headers["User-Agent"] = UA
        self.s.headers["Accept"] = "*/*"
        self.s.headers["Accept-Language"] = "en-US,en;q=0.5"
        self.log = log
        self.count = 0
        self.max_requests = max_requests
        self.last = 0.0

    def get(self, url):
        if self.count >= self.max_requests:
            raise RuntimeError(f"request cap {self.max_requests} reached")
        wait = MIN_DELAY + random.random() * JITTER - (time.time() - self.last)
        if wait > 0:
            time.sleep(wait)
        self.last = time.time()
        self.count += 1
        try:
            r = self.s.get(url, allow_redirects=True, timeout=TIMEOUT)
        except requests.RequestException as e:
            self.log(f"ERR  {url} {e}")
            return {"url": url, "status": None, "error": str(e), "headers": {}, "content": b"",
                    "final_url": url, "chain": []}
        rec = {
            "url": url, "status": r.status_code, "final_url": r.url,
            "chain": [{"url": h.url, "status": h.status_code, "location": h.headers.get("Location")} for h in r.history],
            "headers": dict(r.headers), "content": r.content,
            "content_type": r.headers.get("Content-Type", ""),
        }
        self.log(f"{r.status_code:<4} {url}" + (f" -> {r.url}" if r.url != url else "") + f" {len(r.content)}b")
        wall = [h for h in r.history + [r] if h.status_code == 202 or "sg-captcha" in {k.lower() for k in h.headers}]
        if wall:
            raise CaptchaWall(f"captcha challenge on {url} (status {wall[0].status_code}, "
                              f"sg-captcha={wall[0].headers.get('sg-captcha')}) after {self.count} requests")
        return rec


class OfflineFetcher:
    """Replays the Oct 6 evidence folder. Pages come from the captures; assets are not fetched."""

    def __init__(self, evidence, log):
        self.ev = evidence
        self.log = log
        self.count = 0

    def _file(self, url):
        p = urlparse(url)
        path = p.path
        if path in ("", "/"):
            return os.path.join(self.ev, "home.html")
        if path == "/css/custom.css":
            return os.path.join(self.ev, "css_custom.css")
        if path == "/sitemap.xml":
            return os.path.join(self.ev, "sitemap.xml")
        if path == "/robots.txt":
            return os.path.join(self.ev, "robots.txt")
        slug = evidence_slug(url)
        for sub in ("pages", "pages_articles"):
            f = os.path.join(self.ev, sub, slug + ".html")
            if os.path.exists(f):
                return f
        return None

    def get(self, url):
        self.count += 1
        f = self._file(url)
        if f is None:
            self.log(f"SKIP {url} (offline, no capture)")
            return {"url": url, "status": None, "error": "offline: no capture", "headers": {}, "content": b"",
                    "final_url": url, "chain": [], "offline": True}
        content = open(f, "rb").read()
        ct = "text/html" if f.endswith(".html") else ("text/css" if f.endswith(".css") else "text/plain")
        self.log(f"200  {url} (offline {os.path.relpath(f, self.ev)})")
        return {"url": url, "status": 200, "final_url": url, "chain": [], "headers": {"Content-Type": ct},
                "content": content, "content_type": ct, "offline": True}


# ----------------------------------------------------------------------------- asset extraction

def collapse_slashes(path):
    return re.sub(r"/{2,}", "/", path)


def classify_ref(raw, page_final_url):
    """Resolve one raw reference. Returns (download_url, info) or (None, info) for refs we do not download."""
    raw = raw.strip()
    info = {"raw": raw}
    if not raw or raw.startswith(("data:", "javascript:", "mailto:", "tel:", "#", "${")):
        return None, {**info, "skip": "not-a-url"}
    if raw.startswith("//"):
        raw = "https:" + raw
        info["quirk"] = "protocol-relative"
    abs_url = urljoin(page_final_url, raw)
    abs_url, _ = urldefrag(abs_url)
    p = urlparse(abs_url)
    host = p.netloc.lower().replace("www.", "")
    path = p.path
    if host == HOST or host == "":
        pass
    elif host == STAGING_HOST:
        info["staging"] = True
    else:
        return None, {**info, "external": host}
    if not re.match(r"^(https?:)?//|^/", raw):
        info["quirk"] = (info.get("quirk", "") + " relative-path").strip()
    if "//" in path:
        info["quirk"] = (info.get("quirk", "") + " double-slash").strip()
        path = collapse_slashes(path)
    if p.query:
        info["query"] = p.query
    live_url = f"{BASE}{path}"
    info["path"] = path
    if info.get("staging"):
        info["staging_url"] = f"https://{STAGING_HOST}{path}"
    return live_url, info


def extract_refs_from_html(html_bytes, page_final_url):
    soup = BeautifulSoup(html_bytes, PARSER)
    refs = []  # (raw, kind)
    for img in soup.find_all("img"):
        if img.get("src"):
            refs.append((img["src"], "img-src"))
        for attr in ("data-src", "data-lazy-src"):
            if img.get(attr):
                refs.append((img[attr], "img-" + attr))
        if img.get("srcset"):
            for part in img["srcset"].split(","):
                u = part.strip().split(" ")[0]
                if u:
                    refs.append((u, "img-srcset"))
    for src in soup.find_all("source"):
        for attr in ("src", "srcset"):
            if src.get(attr):
                for part in src[attr].split(","):
                    u = part.strip().split(" ")[0]
                    if u:
                        refs.append((u, "source-" + attr))
    for v in soup.find_all("video"):
        for attr in ("poster", "src"):
            if v.get(attr):
                refs.append((v[attr], "video-" + attr))
    for link in soup.find_all("link", href=True):
        rel = " ".join(link.get("rel", [])).lower()
        if "stylesheet" in rel:
            refs.append((link["href"], "stylesheet"))
        elif "icon" in rel or "apple-touch" in rel:
            refs.append((link["href"], "icon"))
        elif "preload" in rel and link.get("as") in ("font", "image", "style", "script"):
            refs.append((link["href"], "preload"))
    for sc in soup.find_all("script", src=True):
        refs.append((sc["src"], "script"))
    for el in soup.find_all(style=True):
        for m in INLINE_URL_RE.finditer(el["style"]):
            refs.append((m.group(1), "inline-style"))
    for st in soup.find_all("style"):
        for m in CSS_URL_RE.finditer(st.get_text()):
            refs.append((m.group(1), "style-block"))
    for a in soup.find_all("a", href=True):
        href = a["href"].strip()
        path = urlparse(urljoin(page_final_url, href)).path
        if ASSET_EXT.search(path) and not path.endswith((".xml", ".txt", ".json")):
            refs.append((href, "linked-file"))
    for meta in soup.find_all("meta"):
        prop = (meta.get("property") or meta.get("name") or "").lower()
        if prop in ("og:image", "twitter:image") and meta.get("content"):
            refs.append((meta["content"], "meta-image"))
    return refs


def extract_refs_from_css(css_text, css_url):
    refs = []
    for m in CSS_URL_RE.finditer(css_text):
        refs.append((m.group(1), "css-url"))
    return refs


def parse_font_faces(css_text, css_url):
    faces = []
    for block in FONT_FACE_RE.finditer(css_text):
        body = block.group(1)
        def prop(name):
            m = re.search(name + r"\s*:\s*([^;]+);", body, re.I)
            return m.group(1).strip().strip("'\"") if m else None
        srcs = []
        for m in re.finditer(r"url\(\s*['\"]?([^'\")]+)['\"]?\s*\)(\s*format\(\s*['\"]?([^'\")]+)['\"]?\s*\))?", body):
            srcs.append({"url": urljoin(css_url, m.group(1)), "format": m.group(3)})
        faces.append({"family": prop("font-family"), "weight": prop("font-weight") or "normal",
                      "style": prop("font-style") or "normal", "display": prop("font-display"), "src": srcs})
    return faces


# ----------------------------------------------------------------------------- Oct 6 comparison

def normalised_text(html_bytes):
    """Visible text of role=main (or body), with tokens and whitespace neutralised."""
    soup = BeautifulSoup(html_bytes, PARSER)
    for t in soup(["script", "style", "noscript", "template"]):
        t.decompose()
    for inp in soup.find_all("input"):
        if inp.get("name") in ("cprmtok", "g-recaptcha-response", "_token"):
            inp.decompose()
    main = soup.find(attrs={"role": "main"}) or soup.body or soup
    text = main.get_text(" ", strip=True)
    text = re.sub(r"\s+", " ", text)
    title = soup.title.get_text(strip=True) if soup.title else ""
    md = soup.find("meta", attrs={"name": "description"})
    meta = (md.get("content") or "").strip() if md else ""
    imgs = sorted({collapse_slashes(urlparse(i.get("src", "")).path) for i in main.find_all("img") if i.get("src")})
    return {"text": text, "title": title, "meta": meta, "imgs": imgs}


def find_oct6_capture(url, evidence):
    if not evidence:
        return None
    p = urlparse(url).path
    if p in ("", "/"):
        f = os.path.join(evidence, "home.html")
        return f if os.path.exists(f) else None
    slug = evidence_slug(url)
    for sub in ("pages", "pages_articles"):
        f = os.path.join(evidence, sub, slug + ".html")
        if os.path.exists(f):
            return f
    return None


def compare_to_oct6(new_html, url, evidence):
    f = find_oct6_capture(url, evidence)
    if not f:
        return {"oct6": None, "verdict": "no-oct6-capture"}
    a = normalised_text(open(f, "rb").read())
    b = normalised_text(new_html)
    changes = [k for k in ("text", "title", "meta", "imgs") if a[k] != b[k]]
    rec = {"oct6": os.path.relpath(f, evidence), "verdict": "same" if not changes else "changed", "changed": changes}
    if "text" in changes:
        rec["text_len_oct6"] = len(a["text"])
        rec["text_len_now"] = len(b["text"])
    return rec


# ----------------------------------------------------------------------------- main

def path_pattern(path):
    d, f = os.path.split(path)
    ext = os.path.splitext(f)[1].lower() or "(none)"
    return f"{d or '/'}/*{ext}".replace("//", "/")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--date", default=dt.date.today().isoformat(), help="harvest folder name, default today")
    ap.add_argument("--sitemap-json", required=True, help="sitemap_pages.json from the 2026-10-21 baseline")
    ap.add_argument("--evidence", help="Oct 6 evidence folder, for the comparison")
    ap.add_argument("--offline", metavar="EVIDENCE_DIR", help="replay the Oct 6 captures instead of fetching")
    ap.add_argument("--out", default=None, help="newbuild folder (default: parent of this script's folder)")
    ap.add_argument("--max-requests", type=int, default=1500)
    ap.add_argument("--min-delay", type=float, default=1.2, help="seconds between requests before jitter (map rule: never under 1.0)")
    ap.add_argument("--pages-only", action="store_true")
    ap.add_argument("--limit", type=int, default=0, help="only the first N pages (testing)")
    args = ap.parse_args()
    global MIN_DELAY
    MIN_DELAY = max(1.0, args.min_delay)

    root = args.out or os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    hdir = os.path.join(root, "harvest", args.date)
    pdir = os.path.join(hdir, "pages")
    pubdir = os.path.join(root, "public")
    os.makedirs(pdir, exist_ok=True)
    os.makedirs(pubdir, exist_ok=True)
    evidence = args.evidence or args.offline

    logf = open(os.path.join(hdir, "harvest.log"), "a")

    def log(msg):
        line = f"{now_utc()} {msg}"
        logf.write(line + "\n"); logf.flush()
        print(line, file=sys.stderr)

    fetcher = OfflineFetcher(args.offline, log) if args.offline else LiveFetcher(log, args.max_requests)

    state_path = os.path.join(hdir, "state.json")
    state = json.load(open(state_path)) if os.path.exists(state_path) else {
        "started": now_utc(), "runs": [], "pages": {}, "assets": {}, "sitemap": {}, "pagination": [], "status": "running"}
    state["runs"].append({"started": now_utc(), "mode": "offline" if args.offline else "live"})

    def save_state():
        json.dump(state, open(state_path, "w"), indent=1)

    # --- 1. URL list
    base_urls = []
    for k in json.load(open(args.sitemap_json)).keys():
        c = canon_page_url(k)
        if c and c not in base_urls:
            base_urls.append(c)
    log(f"sitemap_pages.json: {len(base_urls)} unique URLs")

    try:
        # --- 2. live sitemap and robots
        if not state["sitemap"].get("done"):
            r = fetcher.get(f"{BASE}/sitemap.xml")
            live_urls = []
            if r["status"] == 200:
                open(os.path.join(hdir, "sitemap.xml"), "wb").write(r["content"])
                live_urls = [canon_page_url(x) for x in re.findall(r"<loc>\s*([^<]+?)\s*</loc>", r["content"].decode("utf-8", "replace"))]
                live_urls = [u for u in live_urls if u]
            state["sitemap"] = {"done": True, "status": r["status"], "count": len(set(live_urls)),
                                "added_since_oct21": sorted(set(live_urls) - set(base_urls)),
                                "removed_since_oct21": sorted(set(base_urls) - set(live_urls)) if live_urls else []}
            r = fetcher.get(f"{BASE}/robots.txt")
            if r["status"] == 200:
                open(os.path.join(hdir, "robots.txt"), "wb").write(r["content"])
            state["robots_status"] = r["status"]
            save_state()
        all_urls = list(base_urls)
        for u in state["sitemap"].get("added_since_oct21", []):
            if u not in all_urls:
                all_urls.append(u)
        # home and the listing first so pagination is discovered early
        all_urls.sort(key=lambda u: (u != BASE + "/", u != BASE + "/news-and-events", u))
        for u in state["pagination"]:
            if u not in all_urls:
                all_urls.append(u)
        if args.limit:
            all_urls = all_urls[:args.limit]

        # --- 3. crawl pages
        queue = list(all_urls)
        i = 0
        while i < len(queue):
            url = queue[i]; i += 1
            slug = page_slug(url)
            prev = state["pages"].get(url)
            if prev and prev.get("status") and prev["status"] < 500 and os.path.exists(os.path.join(pdir, slug + ".html")):
                html = open(os.path.join(pdir, slug + ".html"), "rb").read()
            else:
                r = fetcher.get(url)
                rec = {k: r.get(k) for k in ("status", "final_url", "chain", "headers", "content_type", "error")}
                rec["fetched_at"] = now_utc()
                rec["slug"] = slug
                if r.get("content"):
                    rec["bytes"] = len(r["content"]); rec["sha1"] = sha1(r["content"])
                    open(os.path.join(pdir, slug + ".html"), "wb").write(r["content"])
                json.dump(rec, open(os.path.join(pdir, slug + ".meta.json"), "w"), indent=1)
                if r.get("status") == 200 and r.get("content") and "html" in (r.get("content_type") or "html"):
                    rec["oct6"] = compare_to_oct6(r["content"], url, evidence)
                state["pages"][url] = rec
                save_state()
                html = r.get("content") or b""
            # pagination discovery on listing pages
            if urlparse(url).path.startswith("/news-and-events") and html:
                soup = BeautifulSoup(html, PARSER)
                for a in soup.find_all("a", href=True):
                    c = canon_page_url(urljoin(url, a["href"]))
                    if c and PAGINATION_RE.match(urlparse(c).path) and c not in queue:
                        queue.append(c)
                        if c not in state["pagination"]:
                            state["pagination"].append(c)
                save_state()

        n_ok = sum(1 for p in state["pages"].values() if p.get("status") == 200)
        log(f"pages: {len(state['pages'])} fetched, {n_ok} with status 200, {len(state['pagination'])} pagination pages")

        # --- 4. asset references
        refs = {}  # live_url -> {referrers:set, kinds:set, raws:set, quirks:set, staging_url, query}
        external = {}
        def add_ref(raw, kind, page_url, page_final):
            dl, info = classify_ref(raw, page_final)
            if dl is None:
                if info.get("external"):
                    external.setdefault(info["external"], set()).add(info["raw"])
                return
            e = refs.setdefault(dl, {"referrers": set(), "kinds": set(), "raws": set(), "quirks": set(), "queries": set(),
                                     "staging_url": None, "path": info["path"]})
            e["referrers"].add(page_url); e["kinds"].add(kind); e["raws"].add(info["raw"])
            if info.get("quirk"):
                e["quirks"].update(info["quirk"].split())
            if info.get("query"):
                e["queries"].add(info["query"])
            if info.get("staging_url"):
                e["staging_url"] = info["staging_url"]

        for url, rec in state["pages"].items():
            if rec.get("status") != 200:
                continue
            f = os.path.join(pdir, rec["slug"] + ".html")
            if not os.path.exists(f):
                continue
            html = open(f, "rb").read()
            for raw, kind in extract_refs_from_html(html, rec.get("final_url") or url):
                add_ref(raw, kind, url, rec.get("final_url") or url)
        # always include the head files the ticket names, in case a page omits them
        for extra in ("/css/custom.css", "/css/flexslider.css", "/css/jquery.fancybox.min.css", "/fonts/stylesheet.css",
                      "/js/mobimenu.js", "/js/jquery.flexslider-2.7.2.js", "/js/jquery.validate.js",
                      "/js/jquery.fancybox.min.js", "/favicon.png", "/favicon.ico"):
            add_ref(extra, "ticket-list", "(ticket 06)", BASE + "/")
        state["external_hosts"] = {h: sorted(v) for h, v in sorted(external.items())}
        log(f"asset references: {len(refs)} unique on our hosts, {sum(len(v) for v in external.values())} external refs on {len(external)} hosts")

        if args.pages_only:
            state["status"] = "pages-only"
        else:
            # --- 5. download assets, CSS first so url() refs are discovered
            def order(u):
                p = urlparse(u).path.lower()
                return (0 if p.endswith(".css") else 1 if p.endswith((".woff", ".woff2", ".ttf", ".otf", ".eot")) else 2, u)
            pending = sorted(refs.keys(), key=order)
            done = set()
            while pending:
                url = pending.pop(0)
                if url in done:
                    continue
                done.add(url)
                e = refs[url]
                path = e["path"]
                a = state["assets"].get(url)
                if a and a.get("status") in (200, 404, 403) and (a["status"] != 200 or os.path.exists(os.path.join(pubdir, path.lstrip("/")))):
                    content = open(os.path.join(pubdir, path.lstrip("/")), "rb").read() if a["status"] == 200 else b""
                else:
                    r = fetcher.get(url)
                    a = {"path": path, "status": r.get("status"), "final_url": r.get("final_url"), "chain": r.get("chain"),
                         "content_type": r.get("content_type"), "error": r.get("error"), "fetched_at": now_utc()}
                    content = r.get("content") or b""
                    if r.get("status") == 200 and content and "text/html" not in (r.get("content_type") or ""):
                        dest = os.path.join(pubdir, path.lstrip("/"))
                        os.makedirs(os.path.dirname(dest), exist_ok=True)
                        open(dest, "wb").write(content)
                        a["bytes"] = len(content); a["sha1"] = sha1(content); a["saved"] = os.path.relpath(dest, root)
                    elif r.get("status") == 200:
                        a["status"] = "200-but-html"; a["note"] = "response was HTML, not saved"
                    if e["staging_url"] and not args.offline:
                        rs = fetcher.get(e["staging_url"])
                        a["staging"] = {"url": e["staging_url"], "status": rs.get("status"),
                                        "sha1": sha1(rs["content"]) if rs.get("content") else None,
                                        "bytes": len(rs.get("content") or b"")}
                        a["staging"]["same_as_live"] = (a.get("sha1") is not None and a["staging"]["sha1"] == a.get("sha1"))
                        if a.get("status") != 200 and rs.get("status") == 200 and "text/html" not in (rs.get("content_type") or ""):
                            dest = os.path.join(pubdir, path.lstrip("/"))
                            os.makedirs(os.path.dirname(dest), exist_ok=True)
                            open(dest, "wb").write(rs["content"])
                            a["saved"] = os.path.relpath(dest, root); a["saved_from"] = "staging"
                            a["bytes"] = len(rs["content"]); a["sha1"] = a["staging"]["sha1"]
                    state["assets"][url] = a
                    save_state()
                a["referrers"] = sorted(e["referrers"]); a["kinds"] = sorted(e["kinds"]); a["raw_forms"] = sorted(e["raws"])
                a["quirks"] = sorted(e["quirks"]); a["queries"] = sorted(e["queries"]); a["staging_url"] = e["staging_url"]
                state["assets"][url] = a
                # CSS: follow url() references
                if path.lower().endswith(".css") and content:
                    css = content.decode("utf-8", "replace")
                    for raw, kind in extract_refs_from_css(css, url):
                        dl, info = classify_ref(raw, url)
                        if dl and dl not in refs:
                            refs[dl] = {"referrers": set(), "kinds": set(), "raws": set(), "quirks": set(), "queries": set(),
                                        "staging_url": None, "path": info["path"]}
                        if dl:
                            refs[dl]["referrers"].add(url); refs[dl]["kinds"].add(kind); refs[dl]["raws"].add(info["raw"])
                            if info.get("query"):
                                refs[dl]["queries"].add(info["query"])
                            if dl not in done and dl not in pending:
                                pending.insert(0, dl)
                    if path.lower().endswith("/fonts/stylesheet.css"):
                        state["fonts"] = parse_font_faces(css, url)
            save_state()
            state["status"] = "complete"
    except CaptchaWall as e:
        state["status"] = "interrupted-captcha"; state["interrupted"] = {"at": now_utc(), "why": str(e)}
        log(f"STOP {e}")
    except KeyboardInterrupt:
        state["status"] = "interrupted-manual"; state["interrupted"] = {"at": now_utc(), "why": "KeyboardInterrupt"}
        log("STOP keyboard interrupt")
    except Exception as e:
        state["status"] = "error"; state["interrupted"] = {"at": now_utc(), "why": repr(e)}
        log(f"STOP error {e!r}")
        raise
    finally:
        state["requests_this_run"] = fetcher.count
        state["runs"][-1]["ended"] = now_utc(); state["runs"][-1]["requests"] = fetcher.count
        save_state()
        write_manifest(state, hdir, root, base_urls, evidence, args)
        log(f"manifest written, status {state['status']}, {fetcher.count} requests this run")
    return 0 if state["status"] in ("complete", "pages-only") else 2


def write_manifest(state, hdir, root, base_urls, evidence, args):
    pages = state["pages"]; assets = state["assets"]
    by_status = {}
    for p in pages.values():
        by_status[str(p.get("status"))] = by_status.get(str(p.get("status")), 0) + 1
    redirected = {u: p.get("final_url") for u, p in pages.items() if p.get("chain")}
    oct6 = {"same": [], "changed": [], "no-oct6-capture": []}
    for u, p in pages.items():
        v = (p.get("oct6") or {}).get("verdict")
        if v:
            oct6[v].append(u)
    patterns = {}
    for u, a in assets.items():
        pat = path_pattern(a["path"])
        d = patterns.setdefault(pat, {"count": 0, "bytes": 0, "ok": 0, "missing": 0})
        d["count"] += 1
        if a.get("status") == 200:
            d["ok"] += 1; d["bytes"] += a.get("bytes", 0)
        else:
            d["missing"] += 1
    missing = {u: {"status": a.get("status"), "error": a.get("error"), "referrers": a.get("referrers", [])}
               for u, a in assets.items() if a.get("status") != 200}
    staging = {u: {"live_status": a.get("status"), "staging": a.get("staging"), "referrer_count": len(a.get("referrers", []))}
               for u, a in assets.items() if a.get("staging_url")}
    quirks = {}
    for u, a in assets.items():
        for q in a.get("quirks", []):
            quirks.setdefault(q, []).append(u)
        if a.get("queries"):
            quirks.setdefault("query-string", []).append(u)
    manifest = {
        "generated": now_utc(), "status": state["status"], "mode": "offline" if args.offline else "live",
        "runs": state["runs"], "user_agent": UA, "min_delay_s": MIN_DELAY, "jitter_s": JITTER,
        "sitemap_json": os.path.abspath(args.sitemap_json), "sitemap_json_count": len(base_urls),
        "live_sitemap": state.get("sitemap"), "robots_status": state.get("robots_status"),
        "pages": {"fetched": len(pages), "by_status": by_status, "pagination_pages": state.get("pagination", []),
                  "redirected": redirected, "oct6_comparison": {k: len(v) for k, v in oct6.items()},
                  "oct6_changed_pages": {u: pages[u]["oct6"] for u in oct6["changed"]},
                  "oct6_uncaptured_pages": oct6["no-oct6-capture"]},
        "assets": {"unique": len(assets), "downloaded": sum(1 for a in assets.values() if a.get("status") == 200),
                   "missing": missing, "by_path_pattern": dict(sorted(patterns.items())), "quirks": quirks,
                   "staging_host_refs": staging, "all": assets},
        "fonts": state.get("fonts"),
        "external_hosts": state.get("external_hosts"),
        "interrupted": state.get("interrupted"),
    }
    json.dump(manifest, open(os.path.join(hdir, "manifest.json"), "w"), indent=1)

    L = []
    L.append(f"# Harvest manifest, {args.date}\n")
    L.append(f"Generated {manifest['generated']}. Mode: {manifest['mode']}. Status: **{manifest['status']}**. "
             f"Script: `scripts/harvest.py`. Every figure below comes from this run's `state.json` unless a source is named.\n")
    if state.get("interrupted"):
        L.append(f"> Interrupted at {state['interrupted']['at']}: {state['interrupted']['why']}. Rerun the same command to resume.\n")
    L.append("## Requests\n")
    for r in state["runs"]:
        L.append(f"- Run {r.get('mode')}: started {r.get('started')}, ended {r.get('ended')}, {r.get('requests', 0)} requests")
    L.append(f"- Discipline: Firefox user agent, at least {MIN_DELAY} s between requests plus up to {JITTER} s jitter, stop on HTTP 202 or an `sg-captcha` header (map Notes, rate limit).\n")
    L.append("## Pages\n")
    L.append(f"- URL list: {len(base_urls)} unique URLs from `{os.path.basename(args.sitemap_json)}` (2026-10-21 baseline).")
    sm = state.get("sitemap") or {}
    if sm.get("done"):
        L.append(f"- Live `sitemap.xml` at harvest time: status {sm.get('status')}, {sm.get('count')} URLs; "
                 f"{len(sm.get('added_since_oct21', []))} added and {len(sm.get('removed_since_oct21', []))} removed against the Oct 21 list.")
        for label in ("added_since_oct21", "removed_since_oct21"):
            lst = sm.get(label, [])
            for u in lst[:20]:
                L.append(f"  - {label.split('_')[0]}: {u}")
            if len(lst) > 20:
                L.append(f"  - ... {len(lst) - 20} more {label.split('_')[0]} (full list in manifest.json)")
    L.append(f"- Fetched {len(pages)} pages. By status: " + ", ".join(f"{k}: {v}" for k, v in sorted(by_status.items())) + ".")
    L.append(f"- Pagination pages discovered from the listing: {len(state.get('pagination', []))}.")
    if redirected:
        L.append(f"- Redirected on fetch ({len(redirected)}):")
        for u, f in sorted(redirected.items()):
            L.append(f"  - {u} -> {f}")
    oc = manifest["pages"]["oct6_comparison"]
    L.append(f"- Against the Oct 6 captures (visible text of `role=main`, title, meta description, image set): "
             f"{oc['same']} same, {oc['changed']} changed, {oc['no-oct6-capture']} with no Oct 6 capture.")
    for u in oct6["changed"][:60]:
        o = pages[u]["oct6"]
        L.append(f"  - changed ({', '.join(o.get('changed', []))}): {u}")
    if len(oct6["changed"]) > 60:
        L.append(f"  - ... {len(oct6['changed']) - 60} more changed pages (full list in manifest.json)")
    for u in oct6["no-oct6-capture"][:60]:
        L.append(f"  - no Oct 6 capture: {u}")
    L.append("\n## Assets\n")
    L.append(f"- {len(assets)} unique asset URLs on the live host (after collapsing double slashes and dropping query strings); "
             f"{manifest['assets']['downloaded']} downloaded into `public/`, {len(missing)} not served.")
    L.append("\n| Path pattern | Refs | Saved | Missing | Bytes saved |\n|---|---:|---:|---:|---:|")
    for pat, d in sorted(patterns.items()):
        L.append(f"| `{pat}` | {d['count']} | {d['ok']} | {d['missing']} | {d['bytes']:,} |")
    if missing:
        L.append("\n### Not served (with referring pages)\n")
        for u, m in sorted(missing.items()):
            refs_ = m["referrers"]
            L.append(f"- `{u}`: status {m['status']}{(' ' + m['error']) if m.get('error') else ''}; "
                     f"{len(refs_)} referring page(s)" + (": " + ", ".join(refs_[:3]) + (" ..." if len(refs_) > 3 else "") if refs_ else ""))
    if staging:
        L.append("\n### Staging-host references (`gba.consultprdevsites-18.com`), rewritten to the live host\n")
        for u, s in sorted(staging.items()):
            st = s.get("staging") or {}
            L.append(f"- `{u}`: live status {s['live_status']}, referenced by {s['referrer_count']} page(s); "
                     f"staging copy status {st.get('status')}, same bytes as live: {st.get('same_as_live')}")
    if quirks:
        L.append("\n### Path quirks met\n")
        for q, us in sorted(quirks.items()):
            L.append(f"- **{q}** ({len(us)}): " + ", ".join(f"`{x}`" for x in sorted(us)[:8]) + (" ..." if len(us) > 8 else ""))
    ext = state.get("external_hosts") or {}
    if ext:
        L.append("\n### External hosts referenced (not downloaded)\n")
        for h, us in ext.items():
            L.append(f"- **{h}** ({len(us)} distinct refs): " + ", ".join(f"`{x[:90]}`" for x in us[:4]) + (" ..." if len(us) > 4 else ""))
    L.append("\n## Fonts (`/fonts/stylesheet.css`)\n")
    if state.get("fonts"):
        L.append("| Family | Weight | Style | Sources |\n|---|---|---|---|")
        for f in state["fonts"]:
            L.append(f"| {f['family']} | {f['weight']} | {f['style']} | " +
                     "; ".join(f"{urlparse(s['url']).path} ({s['format'] or 'no format()'})" for s in f["src"]) + " |")
    else:
        L.append("- Not read in this run.")
    open(os.path.join(hdir, "MANIFEST.md"), "w").write("\n".join(L) + "\n")


if __name__ == "__main__":
    sys.exit(main())
