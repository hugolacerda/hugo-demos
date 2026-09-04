# Luz a las Naciones. Production site

The deployable site for Luz a las Naciones (Field Guide direction). All six
pages from `../planning/site-structure.md` are built: Home, Our story,
Programs, Visit and host a team, Give, Contact.

## Stack

Plain HTML, CSS custom properties, and a small amount of vanilla JavaScript.
No framework, no build step, no package manager, no CDN. Fonts are self-hosted
woff2 files. Everything in this folder is served as-is.

## Running it

Any static file server pointed at this folder. For example:

```bash
cd site
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` directly from disk also
works, except that the self-hosted fonts may be blocked by the browser's
`file://` policy; use the server for a faithful view.

## Deploying it

GitHub Pages, flat files, no pipeline: push the folder and it is live. Nothing
here needs Node, a bundler, or a build output directory. The repo root already
has a `.nojekyll` file, so folder names are served verbatim.

The site uses relative links (`visit.html`, `css/styles.css`), so it works
both at a domain root and under a subpath such as
`/harrys-ministries/site/`.

**Contact form.** `contact.html` uses Netlify Forms (`data-netlify="true"`,
honeypot field, redirect to `contact.html?sent=1`). That backend exists only
when the site is hosted on Netlify. On GitHub Pages the form has no handler:
the browser will POST to a static host and get an error. Either host on
Netlify, or point the form's `action` at another form endpoint before launch.

## Files

| Path | Purpose |
|---|---|
| `index.html` | Home. |
| `our-story.html`, `programs.html`, `visit.html`, `give.html`, `contact.html` | The five interior pages. Header, footer, next-step band, and the head language script are byte-identical to Home. |
| `css/tokens.css` | Field Guide design tokens: colour, type, space, shape, motion. |
| `css/fonts.css` | `@font-face` for Inter and JetBrains Mono. |
| `css/textures.css` | The six naturalist texture tiles, copied verbatim from the design system. |
| `css/styles.css` | All component, layout, and responsive CSS. Reads only from tokens. Interior-page patterns are grouped at the bottom. |
| `js/i18n.js` | EN / ES string maps and the `data-i18n` swap engine. |
| `js/main.js` | Header compression, mobile nav, language toggle wiring, specimen index, contact confirmation. |
| `assets/fonts/` | Four woff2 files (Inter and JetBrains Mono, latin + latin-ext). |
| `assets/illustrations/building-section.svg` | The hand-drawn cross-section of the building. |

## Bilingual behaviour

Every translatable node carries `data-i18n="key"`. Attributes are translated
with `data-i18n-attrs="attr:key, attr2:key2"`. Switching language rewrites the
text, updates `<html lang>`, the page title, and the meta description, and
stores the choice in `localStorage` under `lln_lang`. A blocking script in
`<head>` applies the stored language before first paint.

Home uses the `doc.title` and `doc.description` keys. Each interior page sets
`data-page="<name>"` on `<body>` and uses `page.<name>.title` and
`page.<name>.description`.

Spanish is a 1:1 translation of the English draft. The `[NEED: ...]` token is
kept in English in both languages so it stays searchable; the body of each
marker is translated.

## Content status

Every `[NEED: ...]` marker from `../planning/content-outlines/` is preserved as
visible placeholder copy. They are not bugs. They mark real information gaps
that must be filled before launch. Sections with no real content at all
(Why Poptún, What a trip looks like, Team fit) ship as framed "Pending"
sections holding only their marker.

## Adding or editing a page

Copy any interior page, keep the header and footer blocks and the `<head>`
script, move `aria-current="page"` to the page's own nav link, set
`data-page` on `<body>`, and add the page's strings to both maps in
`js/i18n.js`. Section patterns are reusable as-is: `.page-intro`, `.section`,
`.tex`, `.eyebrow`, `.section-title`, `.lede`, `.prose`, `.pending`, `.btn`,
`.split`, `.sheet`, `.factlist`, `.steps`, `.faq`, `.form`.
