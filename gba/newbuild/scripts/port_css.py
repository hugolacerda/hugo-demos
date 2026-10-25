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
/* Carousels (ticket 09): src/scripts/carousel.ts runs Embla on the markup Owl
   Carousel 2.3.4 renders live (src/lib/html.ts, owlCarousel). Owl's own CSS is
   not loaded; these are the rules of owl.carousel.min.css that shape what is seen,
   plus the item widths Owl set inline: (stage width - gaps) / items, with Owl's
   margin as the gap after every item. Items per view, by viewport width as Owl
   measured it (window.innerWidth): deals 1, 3 from 600 px, 4 from 1000, 5 from
   1300 (the live config repeats its 600 key; ticket 09 restores the evident
   intent); logos 1, 3 from 600. The dots row: the live carousels have no
   owl-theme class, so Owl's dot buttons render at 0 x 0 px, but their line box
   still adds one line of height below the track; the empty inline-block keeps it. */
.owl-carousel{position:relative;width:100%;z-index:1;-webkit-tap-highlight-color:transparent}
.owl-carousel .owl-stage-outer{position:relative;overflow:hidden}
.owl-carousel .owl-stage{position:relative;touch-action:pan-y pinch-zoom}
.owl-carousel .owl-item{position:relative;min-height:1px;min-width:0;flex:0 0 calc((100% - (var(--owl-items) - 1) * var(--owl-margin)) / var(--owl-items));margin-right:var(--owl-margin);-webkit-touch-callout:none;user-select:none}
.owl-carousel .owl-item img{display:block;width:100%}
.owl-carousel .owl-nav button.owl-prev,.owl-carousel .owl-nav button.owl-next{background:0 0;color:inherit;border:none;padding:0!important;font:inherit;cursor:pointer;user-select:none}
.owl-carousel .owl-dots::before{content:"";display:inline-block}
#completed-deals{--owl-items:1;--owl-margin:16px}
@media (min-width: 600px){#completed-deals{--owl-items:3}}
@media (min-width: 1000px){#completed-deals{--owl-items:4}}
@media (min-width: 1300px){#completed-deals{--owl-items:5}}
#client-logo{--owl-items:1;--owl-margin:10px}
@media (min-width: 600px){#client-logo{--owl-items:3}}

/* Hero slider (ticket 09): src/scripts/hero.ts moves .flex-active-slide; the fade
   is this transition. FlexSlider's fade mode set the same values inline on every
   slide (stacked with margin-right:-100%, opacity and z-index, 1.5 s). The first
   slide carries the class in the built HTML, so it shows before any script.
   pan-y leaves vertical scrolling to the browser and horizontal swipes to the script. */
.flexslider{touch-action:pan-y}
.flexslider .slides>li{display:block;width:100%;float:left;margin-right:-100%;position:relative;opacity:0;z-index:1;transition:opacity 1.5s ease}
.flexslider .slides>li.flex-active-slide{opacity:1;z-index:2}

/* Mobile menu (ticket 09): MenuMaker hid every list in #cssmenu until its button
   opened it; the script in SiteHeader.astro toggles .open as MenuMaker did. */
.mobileheader #cssmenu ul:not(.open){display:none}
"""
    header = "/* port.css: rules this port adds on top of the live stylesheets, which are\n   served unchanged. Generated by scripts/port_css.py; edit that script, not this file. */\n\n"
    open(os.path.join(CSS, "port.css"), "w").write(header + "\n\n".join(blocks) + "\n" + extra)
    print(f"port.css: {len(blocks)} retagged rules")


if __name__ == "__main__":
    main()
