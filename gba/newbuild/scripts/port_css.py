#!/usr/bin/env python3
"""Generate public/css/port.css: the rules this port adds on top of the live
stylesheets, which are served as-is (map ticket 08).

The map's heading rule changes some heading tags (the visible banner text
becomes the H1; heading order is made correct) without changing how they look.
custom.css and flexslider.css style those elements by tag, so for every retagged
element this script copies the live rules, including the ones inside media
queries, with the new tag in the selector. The copies sit after the live files
in Base.astro, so they win ties.

Run: python3 scripts/port_css.py   (writes public/css/port.css; no dependencies)
"""
import os, re

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
CSS = os.path.join(ROOT, "public", "css")

# (source file, live selector fragment, replacement fragments). A selector
# that contains the live fragment is copied once per replacement.
RETAGS = [
    # Home hero: the first slide's caption is the H1, the other five are H2 (flexslider.css).
    ("flexslider.css", ".flex-caption h4", [".flex-caption h1", ".flex-caption h2"]),
    # Home deals: the acquirer line in each deal card, h6 live, is an h3 under the section's h2.
    ("custom.css", ".deal-content h6", [".deal-content h3"]),
    # Inner pages: the banner text, h2 live, is the H1 (shared headbanner component).
    ("custom.css", ".headbanner .breadcrumb h2", [".headbanner .breadcrumb h1"]),
    ("custom.css", ".breadcrumb h2", [".breadcrumb h1"]),
    # Articles (ticket 11): the title, h3 live, is the H1; the author line, h6 live, is a paragraph.
    ("custom.css", ".news_events h3", [".news_events h1"]),
    ("custom.css", ".news_events h6", [".news_events p.mt-3"]),
]

# Bootstrap 5.0.2 sizes headings by tag (reboot). The live rules above override
# font-size wherever they set one; where a live rule relies on the tag's default
# size, the retagged element needs that size spelled out. Values from
# bootstrap.min.css 5.0.2 (_variables.scss, $h1-font-size to $h6-font-size).
BOOTSTRAP_SIZE = {"h1": "2.5rem", "h2": "2rem", "h3": "1.75rem", "h4": "1.5rem", "h5": "1.25rem", "h6": "1rem"}
BOOTSTRAP_FLUID = {"h1": "calc(1.375rem + 1.5vw)", "h2": "calc(1.325rem + .9vw)", "h3": "calc(1.3rem + .6vw)", "h4": "calc(1.275rem + .3vw)"}


def parse(css):
    """Yield (media, selector, body) for every rule, media being the @media prelude or None."""
    out = []
    stack = []
    pos = 0
    for m in re.finditer(r"@media[^{]*\{|\{|\}", css):
        t = m.group(0)
        if t.startswith("@media"):
            stack.append(("media", t[:-1].strip()))
        elif t == "{":
            sel = css[pos:m.start()].strip().split("}")[-1].strip()
            stack.append(("rule", sel))
        else:
            if stack:
                kind, val = stack.pop()
                if kind == "rule":
                    media = [v for k, v in stack if k == "media"]
                    out.append((media[0] if media else None, val, css[pos:m.start()].strip()))
        pos = m.end()
    return out


def main():
    files = {f: parse(open(os.path.join(CSS, f), encoding="utf-8", errors="replace").read()) for f in {r[0] for r in RETAGS}}
    blocks = []
    for src, live, repls in RETAGS:
        tag_live = live.split()[-1].split(".")[0]
        for media, sel, body in files[src]:
            parts = [p.strip() for p in sel.split(",")]
            if live not in parts:
                continue
            for repl in repls:
                new_tag = repl.split()[-1].split(".")[0]
                decl = body
                if "font-size" not in body and media is None and new_tag in BOOTSTRAP_SIZE:
                    # keep the live tag's default size on the new tag
                    old = tag_live
                    decl = f"font-size: {BOOTSTRAP_SIZE[old]};" + body
                    if old in BOOTSTRAP_FLUID:
                        decl = f"font-size: {BOOTSTRAP_FLUID[old]};" + body
                rule = f"{repl}{{{decl}}}"
                if media:
                    rule = f"{media}{{{rule}}}"
                blocks.append(f"/* from {src}: {sel} */\n{rule}")
    # Bootstrap's reboot gives h1 to h6 identical margin and line-height, so nothing else to copy.

    extra = """
/* Carousels before ticket 09 wires them: Owl Carousel's own CSS is not loaded yet
   (it would hide .owl-carousel until its script runs). Until then the items sit
   in one clipped row at the live item counts (deals 1/4/5, logos 1/3/3; the
   inline Owl config on the live homepage, ticket 03). Ticket 09 replaces this. */
.owl-carousel:not(.owl-loaded){display:flex;overflow:hidden;gap:16px}
.owl-carousel:not(.owl-loaded) > .item{flex:0 0 calc((100% - 16px * 4) / 5);width:auto}
.client-logo .owl-carousel:not(.owl-loaded){gap:10px}
.client-logo .owl-carousel:not(.owl-loaded) > .item{flex-basis:calc((100% - 10px * 2) / 3)}
@media screen and (max-width: 1299px){.owl-carousel:not(.owl-loaded) > .item{flex-basis:calc((100% - 16px * 3) / 4)}}
@media screen and (max-width: 599px){.owl-carousel:not(.owl-loaded) > .item,.client-logo .owl-carousel:not(.owl-loaded) > .item{flex-basis:100%}}

/* Mobile menu before ticket 09: the live page's mobimenu.js hides #cssmenu's list
   on load and toggles it from the button it injects. Without that script the list
   would sit open over the page, so start it closed; the script's inline display
   values override this rule. Ticket 09 revisits. */
.mobileheader #cssmenu > ul{display:none}
"""
    header = "/* port.css: rules this port adds on top of the live stylesheets, which are\n   served unchanged. Generated by scripts/port_css.py; edit that script, not this file. */\n\n"
    open(os.path.join(CSS, "port.css"), "w").write(header + "\n\n".join(blocks) + "\n" + extra)
    print(f"port.css: {len(blocks)} retagged rules")


if __name__ == "__main__":
    main()
