# src/content: the site's content, extracted from the live site

Produced by `scripts/extract.py` from the Oct 24, 2026 harvest (`harvest/2026-10-24/pages/`, map ticket 06). One file per sitemap URL, 640 in all: 622 articles in `articles/`, 18 core pages in `pages/`. `index.json` maps slug to file, kind, path and title. Regenerate with:

```
.venv/bin/python -I scripts/extract.py --harvest harvest/2026-10-24 --out src/content
```

## File format

Each file is YAML front matter between `---` lines, then raw HTML. Scalars are JSON-style double-quoted strings, so any YAML parser reads them. The HTML is the live markup, byte for byte except for the rules below.

**Articles** (`articles/<slug>.html`): front matter `slug`, `kind: article`, `path`, `title` (the visible article title), `author`, `excerpt` (the text the News and Events listing shows for this article, verbatim), `listing_order` (its position in the listing: the first time the live listing showed it, counting from 0; ticket 11), `listing_image` (the card image the listing shows for it, with alt, width and height, or null: 58 articles), `section_label` (the banner label, "News & Events"), `banner` and `banner_alt` (the headbanner image), `banner_height` (550 on the 58 articles with their own banner photo, which fix the banner's height live, else null; ticket 11), `meta_title`, `meta_description`, `canonical`, `related_links` (empty on every article today), `source`. Body: the article's `div.container.mt-3.px-0` element, which holds the body copy. The title and author line are not in the body; the template renders them (title as H1 with class `scrollText`, author as a paragraph with class `mt-3`, per the map's heading rule).

**Pages** (`pages/<slug>.html`): front matter `slug`, `kind: page`, `path`, `title` (the visible banner text, which becomes the H1), `banner`, `banner_alt`, `sections` (the top-level section classes, for picking the layout), `meta_title`, `meta_description`, `canonical`, `source`. Body: everything inside `role="main"` in document order, minus the header chrome (`mobileheader`, `desktopheader`, `offcanvas`) and the stray `div.footer` two legal pages carry inside main. The headbanner block and the shared contact block are left in place for now; ticket 08 factors them into components.

## What was removed (hidden content is not ported, map Notes)

- HTML comments (including the "For Squarespace Code Block" comment and a commented-out team card with Lorem Ipsum text on `/our-team`).
- `.seo-tag` headings (font-size 0 in `custom.css` line 50): 5 pages.
- Elements with class `d-none` and no responsive `d-*-block` variant: the article "Related Documents / Related Links / Share" block, the hidden breadcrumb, the photo and video sliders, Industry Insider's hidden guidance steps.
- Elements with inline `display:none` or `font-size:0`, except the nine `/affiliations` rows (`.theloop`): the server sends them hidden and the page's Load More script reveals them, so they are content; the inline style is dropped and the template decides which rows start hidden (ticket 11).

Nothing visible was removed: `scripts/extract.py`'s visible-text check compares every file against its harvest page and all 640 match.

## What was changed (invisible)

- Form leftovers (ticket 11): the browser-extension `fdprocessedid` attributes are dropped, the per-load `cprmtok` token is emptied, form `action`s are root-relative like links, and the visually hidden "Service Needed?" label becomes an `aria-label` on its select (no visually hidden text, map Notes).

- Links and asset paths to `https://gatewaybusinessadvisors.com/...`, `https://www.gatewaybusinessadvisors.com/...` and the staging host `https://gba.consultprdevsites-18.com/...` are root-relative (`/...`). Double slashes are collapsed. `/news-and-events/<slug>` article links point at `/<slug>` (the live site 301s them); the numeric pagination links (`/news-and-events/12`) are left alone (fixed at ticket 11; they had become `/12`).
- The 564 article banners that pointed at the staging host now point at `/upload/images/pages/page_header_1788859043_326_page_header_1725904863_226_start-here-banner.jpg`, which `public/` holds (saved from the staging host, since the live host returns 404 for it).

## Not content

The 53 pagination pages (`/news-and-events/12` ... `/636`) are generated from the articles. The page `<head>` (Bootstrap, fonts, scripts, JSON-LD), the header, the footer and the two modals after `role="main"` are template work (ticket 08).

## Loading in Astro (for ticket 08)

Astro's built-in `glob()` loader handles `.md`, `.mdx`, `.json`, `.yaml` and `.toml`; these files are `.html` with front matter, so a small custom loader reads them: list the folder, split on the second `---`, parse the YAML with `js-yaml` (or `gray-matter`), and store the HTML as `body`. Render with `<Fragment set:html={entry.data.body} />`. The front matter's JSON-style strings are valid YAML, so no custom parsing is needed beyond the split.

## Editing content later

Edit the HTML body or a front-matter field in the file and rebuild. The map's rule: any change made in Chuck's CMS after 2026-10-24 is made here too, so the two never drift.
