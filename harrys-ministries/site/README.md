# Luz a las Naciones. Production site

The deployable site for Luz a las Naciones (Field Guide direction). Only the
Home page is built so far, per the staged build order in
`../planning/design-system.md`.

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

## Files

| Path | Purpose |
|---|---|
| `index.html` | Home. One DOM for both languages. |
| `css/tokens.css` | Field Guide design tokens: colour, type, space, shape, motion. |
| `css/fonts.css` | `@font-face` for Inter and JetBrains Mono. |
| `css/textures.css` | The six naturalist texture tiles, copied verbatim from the design system. |
| `css/styles.css` | All component, layout, and responsive CSS. Reads only from tokens. |
| `js/i18n.js` | EN / ES string maps and the `data-i18n` swap engine. |
| `js/main.js` | Header compression, mobile nav, language toggle wiring, specimen index. |
| `assets/fonts/` | Four woff2 files (Inter and JetBrains Mono, latin + latin-ext). |
| `assets/illustrations/building-section.svg` | The hand-drawn cross-section of the building. |

## Bilingual behaviour

Every translatable node carries `data-i18n="key"`. Attributes are translated
with `data-i18n-attrs="attr:key, attr2:key2"`. Switching language rewrites the
text, updates `<html lang>`, the page title, and the meta description, and
stores the choice in `localStorage` under `lln_lang`. A blocking script in
`<head>` applies the stored language before first paint.

Spanish is a 1:1 translation of the English draft. The `[NEED: ...]` token is
kept in English in both languages so it stays searchable; the body of each
marker is translated.

## Content status

Every `[NEED: ...]` marker from `../planning/content-outlines/` is preserved as
visible placeholder copy. They are not bugs. They mark real information gaps
that must be filled before launch.

## Adding the other five pages

Copy `index.html`, keep the header and footer blocks and the `<head>` script,
change `aria-current="page"` on the nav, and add the page's strings to both
maps in `js/i18n.js`. Section patterns (`.section`, `.tex`, `.eyebrow`,
`.section-title`, `.lede`, `.btn`, `.steps`, `.faq`) are reusable as-is.
