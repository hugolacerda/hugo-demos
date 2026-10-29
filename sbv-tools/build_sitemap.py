#!/usr/bin/env python3
"""Rebuild sbv/sitemap.xml from the pages themselves.

Run after adding, removing or meaningfully editing a page:

    python3 sbv-tools/build_sitemap.py

Each page's address comes from its <link rel="canonical">. Its <lastmod> comes
from the date the page already declares:
  - articles: <meta property="article:modified_time"> if present, otherwise
    <meta property="article:published_time">
  - other pages: <meta name="article:modified_time">
Bump that date only for real content changes (Google ignores lastmod on sites
where it moves for template tweaks). A page with no date is listed without one.
"""
import re
from pathlib import Path

SBV = Path(__file__).resolve().parent.parent / 'sbv'
# Not meant to rank: legal pages, the conference page (decision pending), 404.
EXCLUDE = {'privacy.html', 'terms.html', 'qr/index.html', '404.html'}
# Main pages in menu order; articles follow, newest first.
ORDER = ['index.html', 'valuations.html', 'exit.html', 'advisory.html',
         'faq.html', 'insights.html', 'about.html', 'contact.html']


def meta(html, pattern):
    m = re.search(pattern, html)
    return m.group(1) if m else None


def entry(rel):
    html = (SBV / rel).read_text()
    if re.search(r'<meta name="robots" content="[^"]*noindex', html):
        return None
    loc = meta(html, r'<link rel="canonical" href="([^"]+)"')
    if not loc:
        return None
    lastmod = (meta(html, r'<meta property="article:modified_time" content="([^"]+)"')
               or meta(html, r'<meta property="article:published_time" content="([^"]+)"')
               or meta(html, r'<meta name="article:modified_time" content="([^"]+)"'))
    return loc, lastmod


def main():
    pages = [str(p.relative_to(SBV)) for p in SBV.rglob('*.html')]
    pages = [p for p in pages if p not in EXCLUDE]
    main_pages = [p for p in ORDER if p in pages]
    others = [p for p in pages if p not in ORDER]

    rows = [e for e in map(entry, main_pages) if e]
    articles = [e for e in map(entry, others) if e]
    articles.sort(key=lambda e: (e[1] or '', e[0]), reverse=True)
    rows += articles

    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for loc, lastmod in rows:
        lm = f'<lastmod>{lastmod}</lastmod>' if lastmod else ''
        lines.append(f'  <url><loc>{loc}</loc>{lm}</url>')
    lines.append('</urlset>')
    (SBV / 'sitemap.xml').write_text('\n'.join(lines) + '\n')
    print(f'sitemap.xml: {len(rows)} URLs')


if __name__ == '__main__':
    main()
