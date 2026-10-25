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
    # Deal cards: the acquirer line, h6 live, is an h3 under the homepage section's h2,
    # and an h2 on /businesses-we-have-sold, which has no section heading (ticket 11).
    ("custom.css", ".deal-content h6", [".deal-content h3", ".deal-content h2"]),
    # Inner pages: the banner text, h2 live, is the H1 (shared headbanner component).
    # Articles: the banner label ("News & Events") is a paragraph, so the title is the first heading.
    ("custom.css", ".headbanner .breadcrumb h2", [".headbanner .breadcrumb h1", ".headbanner .breadcrumb p"]),
    # Articles (ticket 11): the title is already an h1 live; the author line, h6 live, is a paragraph.
    ("custom.css", ".news_events h6", [".news_events p.mt-3"]),
    # Inner pages (ticket 11): section headings that skip a level under the H1 step up to h2.
    ("custom.css", ".about-content h3", [".about-content h2"]),  # /start-here, /assessing-your-options, /affiliations
    ("custom.css", ".access-option .content h4", [".access-option .content h2"]),  # /start-here, /your-professional-team
    ("custom.css", ".access-option .content h4 a", [".access-option .content h2 a"]),
    ("custom.css", ".access-option .content .center-part h4", [".access-option .content .center-part h2"]),
    ("custom.css", ".assess-options h4", [".assess-options h2"]),  # /assessing-your-options
    ("custom.css", ".industry-advisor-page .content h4", [".industry-advisor-page .content h2"]),  # /industry-insider
    # /our-team: each name is an h2 and the phone number under it an h3 (h3 and h4 live).
    ("custom.css", ".team-info .team-details .name-wrapper h3", [".team-info .team-details .name-wrapper h2"]),
    ("custom.css", ".our-team-box .social-info h4", [".our-team-box .social-info h3"]),
]

# What every heading or paragraph gets before any rule of the site's own: the
# reboot of Bootstrap 5.3.8 (public/vendor/bootstrap-5.3.8/css/bootstrap.min.css),
# as (media or None, declarations) in source order. Same values as 5.0.2.
HEADING_BASE = "margin-top:0;margin-bottom:.5rem;font-weight:500;line-height:1.2;color:var(--bs-heading-color)"
BOOTSTRAP = {
    "h1": [(None, HEADING_BASE + ";font-size:calc(1.375rem + 1.5vw)"), ("@media (min-width:1200px)", "font-size:2.5rem")],
    "h2": [(None, HEADING_BASE + ";font-size:calc(1.325rem + .9vw)"), ("@media (min-width:1200px)", "font-size:2rem")],
    "h3": [(None, HEADING_BASE + ";font-size:calc(1.3rem + .6vw)"), ("@media (min-width:1200px)", "font-size:1.75rem")],
    "h4": [(None, HEADING_BASE + ";font-size:calc(1.275rem + .3vw)"), ("@media (min-width:1200px)", "font-size:1.5rem")],
    "h5": [(None, HEADING_BASE + ";font-size:1.25rem")],
    "h6": [(None, HEADING_BASE + ";font-size:1rem")],
    "p": [(None, "margin-top:0;margin-bottom:1rem")],
}
# A property the new tag's generic rules set and the old tag's do not is reset to
# what the old tag had: these are all inherited, so `inherit`.
RESET = {"letter-spacing": "inherit", "font-style": "inherit", "text-transform": "inherit"}


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


def props(decls):
    return {d.split(":", 1)[0].strip().lower() for d in decls.split(";") if ":" in d}


def generic(rules, tag):
    """(media, declarations) of the bare-tag rules for `tag`: Bootstrap's reboot, then custom.css in source order."""
    return list(BOOTSTRAP.get(tag, [])) + [(media, body) for media, sel, body in rules if tag in [p.strip() for p in sel.split(",")]]


def low(repl, new_tag):
    """The replacement selector at bare-tag specificity: `.a .b h2` -> `:where(.a .b) h2`, `.a p.x` -> `:where(.a) p:where(.x)`."""
    head, _, last = repl.rpartition(" ")
    rest = last[len(new_tag):]
    return (f":where({head}) " if head else "") + new_tag + (f":where({rest})" if rest else "")


def main():
    files = {f: parse(open(os.path.join(CSS, f), encoding="utf-8", errors="replace").read()) for f in {r[0] for r in RETAGS} | {"custom.css"}}
    blocks = []
    for src, live, repls in RETAGS:
        tag_live = re.split(r"[.:#\[]", live.split()[-1])[0]
        for repl in repls:
            new_tag = re.split(r"[.:#\[]", repl.split()[-1])[0]
            if new_tag == tag_live or tag_live not in BOOTSTRAP:
                continue  # the fragment styles a descendant of the heading, not the heading itself
            # The retagged element first gets what the live tag got from the generic rules
            # (Bootstrap's reboot and custom.css's bare-tag rules), at bare-tag specificity, so
            # the new tag's own generic rules (custom.css: h2 grey and 53 px, p 18 px) lose and
            # every copied live rule below still wins, as it did over the live tag's.
            sel = low(repl, new_tag)
            old = generic(files["custom.css"], tag_live)
            old_props = set().union(*(props(b) for _, b in old))
            new_props = set().union(*(props(b) for _, b in generic(files["custom.css"], new_tag)))
            resets = "".join(f"{p}:{RESET[p]};" for p in sorted(new_props - old_props) if p in RESET)
            missing = sorted(p for p in new_props - old_props if p not in RESET)
            if missing:
                raise SystemExit(f"{repl}: no reset value for {missing}")
            for media, body in old:
                rule = f"{sel}{{{body}}}"
                blocks.append(f"/* {tag_live} generic, for {repl} */\n" + (f"{media}{{{rule}}}" if media else rule))
            if resets:
                blocks.append(f"/* {new_tag} generic, undone for {repl} */\n{sel}{{{resets}}}")
    for src, live, repls in RETAGS:
        for media, sel, body in files[src]:
            parts = [p.strip() for p in sel.split(",")]
            if live not in parts:
                continue
            for repl in repls:
                rule = f"{repl}{{{body}}}"
                if media:
                    rule = f"{media}{{{rule}}}"
                blocks.append(f"/* from {src}: {sel} */\n{rule}")

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

/* News and Events pagination (ticket 11): the live listing pages carry these
   rules in an inline <style> (harvest/2026-10-24, all 54 listing pages), verbatim. */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding: 20px 0;
    list-style: none;
}
.pagination li a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
    padding: 0 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #fff;
    color: #333;
    text-decoration: none;
    font-size: 15px;
    transition: all 0.2s ease;
}
.pagination li a:hover {
    background: #174a72;
    color: #fff;
    border-color: #174a72;
}
.pagination li a.active {
    background: #174a72;
    color: #fff;
    border-color: #174a72;
    font-weight: bold;
}
.pagination li a img {
    max-width: 16px;
    height: auto;
}
@media (max-width: 480px) {
    .pagination {
        gap: 4px;
        flex-wrap: wrap;
    }
    .pagination li a {
        min-width: 34px;
        height: 34px;
        padding: 0 8px;
        font-size: 14px;
    }
}

/* Mobile menu (ticket 09): MenuMaker hid every list in #cssmenu until its button
   opened it; the script in SiteHeader.astro toggles .open as MenuMaker did. */
.mobileheader #cssmenu ul:not(.open){display:none}
"""
    header = "/* port.css: rules this port adds on top of the live stylesheets, which are\n   served unchanged. Generated by scripts/port_css.py; edit that script, not this file. */\n\n"
    open(os.path.join(CSS, "port.css"), "w").write(header + "\n\n".join(blocks) + "\n" + extra)
    print(f"port.css: {len(blocks)} retagged rules")


if __name__ == "__main__":
    main()
