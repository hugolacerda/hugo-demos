# Luz a las Naciones. Astro build notes

The Field Guide redesign, re-platformed onto real tooling. Content comes only
from the confirmed-only files beside this document (`01-home.md` through
`06-contact.md`); see `README.md` for the content rule. The previous plain-HTML
site in `../site/` is untouched and still the live one.

## Stack

| Piece | Version | Role |
|---|---|---|
| Astro | 7.3 | Static site generator, native i18n routing, `output: 'static'`, no adapter |
| Tailwind CSS | 4.3 via `@tailwindcss/vite` | Tokens as a `@theme` block in `src/styles/global.css` (v4 has no `tailwind.config.js`) |
| GSAP | 3.15 | ScrollTrigger (hero emphasis, the trek), DrawSVG + MotionPath (the trek) |
| Lenis | 1.3 | Smooth scroll, driven by GSAP's ticker in `src/scripts/motion.ts`, skipped under `prefers-reduced-motion` |

No React or other UI framework. Astro islands can take one on later if a
specific interactive piece needs it.

## Running it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/, both locales
npm run preview    # serve dist/ locally
```

Node 22.12 or newer. Astro 7's dev server detaches itself; `npx astro dev stop`
shuts it down.

## Layout of the source

```
astro.config.mjs        static output, i18n (en default at /, es at /es/), Tailwind plugin
netlify.toml            build command and publish dir. Local-only for now: no site, no domain, no DNS
public/fonts/           Fraunces + Instrument Sans + JetBrains Mono woff2, self-hosted (see Typography)
public/illustrations/   building-section.svg, copied from ../site; its "[NEED: WIDTH]" label
                        now reads "WIDTH NOT YET MEASURED" (no brackets anywhere)
src/styles/global.css   the Tailwind theme, base layer, and component layer
src/styles/textures.css the six Whisper / Foliage tiles, byte-identical to ../site/css/textures.css
src/i18n/ui.ts          every EN and ES string. `es` is typed against `en`; a missing key fails the build
src/i18n/utils.ts       page ids and slugs, `href(lang, page)`, `useTranslations`, `localePaths`
src/layouts/Base.astro  <html lang>, title, description, hreflang alternates, header, footer, scripts
src/components/         Header, Footer, Hero, Button (C1 / S1), Arrow, Faq (rail), Blueprint, PhotoFrame, Specimen
src/pages/[...locale]/  one file per page; each builds twice, once at / and once at /es/
src/scripts/site.ts     header compaction, mobile nav, rail-and-panel blocks (specimen, FAQ), form-sent status
src/scripts/motion.ts   GSAP + ScrollTrigger + Lenis, one ticker, one reduced-motion guard
```

## Bilingual, how it works now

Astro's i18n routing with `prefixDefaultLocale: false`: English pages are built
at `/`, `/our-story/`, and so on; Spanish pages at `/es/`, `/es/our-story/`.
Each page file under `src/pages/[...locale]/` exports `getStaticPaths` from
`localePaths()`, which returns one root path and one `es` path. The page reads
its locale from the param, pulls strings with `t('key')`, and links with
`href(lang, 'contact')`, which calls Astro's own `getRelativeLocaleUrl`.

There is no client-side language state. The EN / ES toggle in the header is
two links to the same page in the other locale, `<html lang>` is set at build
time, and every page carries `hreflang` alternates (root-relative until `site`
is configured, absolute after). Nothing is hidden before first paint and both
languages are plain HTML for search engines.

Slugs are the same in both locales for now (`/es/our-story/`, not
`/es/nuestra-historia/`). Localised slugs are a small follow-up in
`src/i18n/utils.ts` if wanted.

To add or change copy: edit `src/i18n/ui.ts` in both maps. To add a page: add
one file under `src/pages/[...locale]/`, add its id and slug to `pages` in
`utils.ts`, and add it to the nav list in `Header.astro`.

## Netlify, configured but not deployed

`netlify.toml` sets the base directory, build command, and publish directory.
The contact form carries `data-netlify="true"`, a honeypot, and a redirect to
`?sent=1` on the same page; Netlify detects it from the built HTML at deploy
time. Served anywhere else (including `npm run dev`) the form has no handler.
Nothing has been deployed, no Netlify site exists, and `site` in
`astro.config.mjs` is intentionally unset until there is a domain.

## Typography and colour (September 5, 2026, per design-decisions.md)

`design-decisions.md` in this folder supersedes `../planning/design-system.md`
where they conflict. This pass applied its typography and colour rules; the
token-mapping section below still describes the first build's port of the
original tokens and is kept as history.

**Families.** Inter is gone. Fraunces (variable, wght 300 to 900, opsz 9 to
144) is the display face for h1 to h4, the header wordmark, and the footer
wordmark. Instrument Sans (variable, wght 400 to 700) is body, UI chrome,
buttons, forms, nav, the specimen rail, and FAQ questions. JetBrains Mono is
unchanged. All self-hosted as latin and latin-ext woff2 subsets (Google
Fonts' static builds, SIL OFL), same `@font-face` pattern as before, with
`font-optical-sizing: auto` so Fraunces picks its own optical size.

**Spanish, verified not assumed.** Measured with fontTools on the actual
files: every Spanish glyph (á é í ó ú ñ ü ¿ ¡) is in the U+00C0-00FF block,
which is in the *latin* subset of both fonts, not latin-ext. Both latin
files contain all of them. Then checked in the browser on the Spanish
pages: `document.fonts.check()` returns true for the real page strings in
both families, and the rendered headings ("existía", "Construyó", "envía",
"¿Puedo donar...") come from the loaded fonts, not a fallback.

**Type scale re-tune.** The old px values were Inter's. Measured metrics
(x-height / cap height as a fraction of the em, and the set width of the
Home headline):

| | x-height | cap height | headline width |
|---|---|---|---|
| Inter | 0.546 | 0.728 | 23.84 em |
| Instrument Sans | 0.510 | 0.720 | 22.71 em |
| Fraunces | 0.482 | 0.700 | 25.14 em |

Instrument Sans has a 6.6% smaller x-height and sets 4.7% narrower, so the
sans steps (100 to 500) moved up about one pixel: 17.5px Instrument Sans has
the x-height Inter had at 16.5px and, because it is narrower, runs the same
number of characters per line. Fraunces has a 4% shorter cap height and sets
5.5% wider, and a display serif needs a little more size to carry the same
weight as a bold sans, so the display steps (600 to 900) moved up one to two
pixels. `ch`-based measures (20ch, 28ch, 58ch) were left alone: `ch` is the
font's own zero width, so they re-scale themselves.

| Token | Old (Inter) | New | Used by |
|---|---|---|---|
| text-100 | 13px | 14px | footer note, lang toggle |
| text-200 | 14px | 15px | specimen alt name |
| text-300 | 15px | 16px | buttons, nav, form labels |
| text-350 | 15.5px | 16.5px | facts, footer links |
| text-400 | 16.5px | 17.5px | body, prose, inputs |
| text-450 | 17px | 18px | lede, FAQ questions |
| text-500 | 18px | 19px | wordmark, specimen name |
| text-600 | 21px | 22px | small titles, footer wordmark |
| text-700 | 26px | 27px | specimen title on phones |
| text-800 | 28px | 30px | specimen title |
| text-850 | 32px | 34px | section title |
| text-875 | 34px | 36px | page title, lead section title |
| text-900 | 46px | 48px | hero title |

Line heights loosened slightly for Fraunces' taller ascenders and accented
capitals (hero 1.08 to 1.1, heading 1.16 to 1.18, title 1.2 to 1.22).
Tracking: Inter's tight negative tracking does not suit an old-style serif,
so hero went from -0.02em to -0.01em, heading from -0.01em to -0.005em,
tight from -0.015em to -0.01em. Headings sit at weight 600, not 700:
Fraunces 700 reads heavier than Inter 700 did. The responsive clamps (26px
to 32px and so on) were left as they were; they are lower bounds for phones
and still land under the new desktop sizes.

Non-obvious side effects of the re-tune, all checked in the browser:
the hero headline in Spanish now wraps to three lines at desktop where it
was two (the wider serif plus the longer Spanish line); nav items are a
touch wider so the header still fits six items at 961px and above; the
specimen rail names and FAQ questions wrap the same as before.

**Colour.** The accent `#0F766E` and secondary `#155E75` were Tailwind's
stock teal-700 and cyan-800. Replaced with a "canopy" family mixed from the
ground darks' hue: accent `#0C6B57` (canopy-700), hover `#095041`
(canopy-800), secondary `#2F7465` (canopy-500). The secondary was chosen on
screen from six candidates rendered side by side as link text, S1 button
text and border, and input border, then checked: 5.28:1 on paper, 5.52:1
on white, 5.01:1 on the sunken hover ground, 5.52:1 as a border (3:1
needed). `#246B5C` was rejected as indistinguishable from the accent,
`#327B6C` as too close to the 4.5:1 floor on the hover ground. The building
drawing's ink and the unused `.fg-paper` tile's linework moved to the new
accent too, and the blueprint grid's rgba tint follows it.

## Hero (September 5, 2026, per design-decisions.md)

Home and Visit share `Hero.astro`. Full-bleed and full-viewport-height
(`100svh` minus the 69px resting header, with a `100vh` fallback), a flex
column with the copy at the top rather than centred: headline, subhead, and
CTAs finish at 432px of an 800px laptop viewport on Home and at 512px of
812px on a phone, so nothing essential needs a scroll. The old
photo-frame-wraps-copy treatment is gone from both pages; `PhotoFrame.astro`
still serves the specimen panels.

**Backdrop is a stand-in.** The decision is a large-scale illustrated
treatment in the building drawing's ink style. That illustration does not
exist yet and was not attempted here: the Foliage line tile (`fg-jungle`,
cream linework on the dark ground) is scaled four times, rotated 4 degrees,
and set at 60% under the existing scrim as a placeholder that reads as
linework rather than a missing image. The real backdrop still needs a
Claude Design pass; `.hero__art` is the container it drops into.

**Emphasis on Home only.** The headline phrase "not just a check" / "no
solo un cheque" is wrapped in `.hero__emph` by matching a substring of the
existing i18n title (the phrase list lives in `index.astro`, not in
`ui.ts`, so no content string changed). A GSAP timeline scrubbed to the
hero's scroll-out (start when the hero top meets the viewport top, end when
its bottom does) scales the phrase to 1.22 from its left edge and drops the
rest of the headline to 55% opacity. `scripts/motion.ts` now owns GSAP,
registers ScrollTrigger, and drives Lenis from GSAP's ticker so scrubbing
stays in sync with smooth scroll. Under `prefers-reduced-motion` neither
Lenis nor the timeline is created and the static headline is the finished
state.

## FAQ (September 5, 2026, per design-decisions.md)

The accordion is gone on all six pages. `Faq.astro` now renders the
specimen rail-and-panel structure: questions as tabs down a sunken rail on
the left, the open answer beside them, first question open. Deliberately
not the specimen's presentation: no numbered index, no 3D flip; the answer
enters with a 260ms fade and an 8px slide in the direction of travel. The
questions, answers, and links come from exactly the same i18n keys as
before; nothing in `ui.ts` changed.

`src/scripts/site.ts` generalised the specimen code into one `initRail`
that both blocks use (`data-rail="flip"` on Programs, `data-rail="fade"`
on the FAQ): click-only selection, arrow / Home / End keys, and below 800px
each panel moves under its own tab as an accordion with no duplicate DOM.
Under `prefers-reduced-motion` the entry animation is off and the panel
simply appears. Native `<details>` is no longer used; the ARIA tab pattern
carries the semantics instead.

## Tokens: what was ported verbatim, what was interpreted

Ported directly, value for value, from `../site/css/tokens.css` and
`planning/design-system.md`:

- All 20 colours (teal spine, jungle ground, ink, paper and lines, moss, sage,
  on-dark text) and the semantic aliases that point at them.
- Both font stacks and all 17 font sizes (10.5px through 46px, half-pixels
  intact), 5 line heights, 7 letter spacings.
- The four weights (they are Tailwind's own `font-normal` / `medium` /
  `semibold` / `bold`).
- Radii (4px panel, 6px control, 3px tag), the on-dark ring shadow, the chip
  fill, the hero scrim, the blueprint grid, the photo hatch, the flip
  parameters (620ms, 78deg, 1400px perspective, the cubic-bezier), and the two
  colour / gap durations.
- The measures (1120px, 62ch, 58ch, 28ch, 20ch), gutter, tap minimum, rail
  width, and panel photo height.
- The texture system: `textures.css` is copied unchanged. Tier placement is
  the same as the current site (Whisper light on the facts strip and section
  edges, Foliage dark in the footer margins, header untextured, hero tinted
  overlay only).
- The C1 / S1 button treatments, the header behaviour, the specimen index and
  its flip, the FAQ, the footer frame, the form fields: same CSS, now reading
  theme variables.

Interpreted or approximated:

- **Spacing scale.** The token scale (`--space-1` 4px through `--space-10`
  56px) is entirely contained in Tailwind's default 4px scale, so it was not
  redefined. The indices differ: token `space-3` (10px) is Tailwind `2.5`,
  `space-10` (56px) is `14`. The mapping table is in `global.css`. Only the
  named ones (`gutter`, `tap`, `rail`, `photo`) exist as tokens.
- **Compound section paddings** (`--section-pad: 52px 24px 56px` and
  friends) have no Tailwind namespace. They became `.section`,
  `.section--lead`, `.page-intro__inner`, `.hero__inner`, each built with
  `@apply` and carrying its own narrow-screen values.
- **Breakpoints.** The old sheet was max-width based (960 / 800 / 720 / 480).
  Tailwind is min-width based, so the theme defines each breakpoint as the old
  cutoff plus one pixel and the templates use `max-lg:` and friends. Same
  pixels, inverted mental model.
- **The [NEED] marker colours** were not ported. Confirmed-only content has no
  markers left to style.
- **Semantic alias names.** `--text-body`, `--surface-card` and so on could not
  keep their prefixes: Tailwind v4 reserves `--text-*` for font sizes. They
  are `--color-body`, `--color-card`, and so on, generating `text-body`,
  `bg-card`.
- **The empty photo frame** is new. It is built only from existing tokens
  (hairline, dashed hairline inset, Whisper tile, mono caption, on-dark
  variants) but the composition itself did not exist before. See below.

## Where Tailwind pushed back

Useful signal for whether utility-first is the right long-term fit or just the
fastest start:

1. **Half-pixel type scale.** `15.5px`, `16.5px`, `11.5px` have no rem-based
   equivalent Tailwind would generate. Fine as `@theme` entries, but the whole
   default size scale had to be removed (`--text-*: initial`) so nobody
   reaches for `text-sm` and gets a foreign size.
2. **Compound tokens.** Border shorthands (`1px solid var(--color-hairline)`),
   the scrim gradient, the blueprint grid, the three-part section paddings:
   none of these are a single utility. They live in `:root` and are consumed
   by component CSS, not templates. About a third of the token file is in this
   category.
3. **Responsive clamps.** The old sheet's `clamp(32px, 6.4vw + 8px, 46px)`
   hero title exists only as an arbitrary value:
   `max-lg:text-[clamp(32px,6.4vw+8px,46px)]`. Three of these.
4. **Odd one-off values.** The design system is full of deliberate,
   non-grid numbers: 22px / 26px tab padding, 30px / 34px panel padding, 9px
   fact gaps, 18px blueprint padding, a 150px edge tile, a 560px minimum
   sheet. Each is an arbitrary value (`p-[18px]`) or a raw declaration.
   Roughly 40 arbitrary values across the component layer.
5. **State that crosses elements.** The header's compact state, the specimen
   tab's selected rail bar (`::before`), the FAQ's rotated sign, the
   accordion's border rules under 800px: these are pseudo-elements and
   parent-driven selectors, which utilities do not express. They stayed as
   plain CSS inside `@layer components`.
6. **Namespace collisions.** `--text-*` for font size, `--spacing-*` doubling
   as height / width / inset, `--container-*` for `max-w-*`. Token names had
   to be renamed to avoid generating the wrong utility.
7. **The texture tiles** are 38KB of data-URI SVG per class. They are a plain
   CSS import; there is nothing for Tailwind to do with them.

The honest picture: the theme block is a good home for the atomic tokens
(colour, type, radius, motion) and the utilities are pleasant for layout
(`grid-cols-2 gap-10 max-lg:grid-cols-1`). The Field Guide's component
patterns are specific enough that most of them are still hand-written CSS,
now with `@apply` for the token references. If that ratio holds through the
motion pass, plain CSS custom properties plus a few layout utilities would do
the same job with less machinery; if the site grows more pages built from the
same atoms, the utilities earn their keep.

## Photo slots

Every page still has at least one unresolved photo slot and the photo audit
has not happened. Rather than a grey stock box, each slot renders
`PhotoFrame.astro`: a hairline panel, dashed inset with corner marks, the
Whisper tile, and a mono caption ("Photograph to come" / "Fotografía
pendiente"). On the two hero pages the frame wraps the copy, sitting exactly
where the photograph will. This is a stand-in until real photographs from
Poptún exist, not a permanent design choice.

## Open flags carried forward, not resolved here

From the content files:

- **Programs layout.** `03-programs.md` asks whether the specimen sheet or a
  simpler list fits confirmed-only content (a name, one line, a photo slot per
  program). The page is built on the specimen index so the pattern is ported;
  the panels are visibly thin. Still an open layout call.
- **Visit's persuasion gap.** `04-visit-host-a-team.md` says the page cannot
  do its job with facility facts and two FAQ answers, and asks whether it
  should get high-fidelity treatment at all this round. Built as specified,
  looks finished, does not persuade. Still a sequencing call.
- **Give's tax line** may resolve on its own if the Jacksonville conversation
  changes the legal structure. The warmer of the two reviewed lines is in.
- **Photos**, above.

Small judgement calls made while building, easy to reverse:

- Home's "What we do" is the paragraph and one link from `01-home.md`. The
  specimen index lives on the Programs page only.
- The building section on Home has no "See the facility" link; the content
  file lists none.
- Visit's hero carries one C1 button to Contact ("Get in touch"). The file
  lists no CTA, but a page with no path to Contact is a dead end. This is the
  only navigational element added beyond the files.
- The footer's third column lists the site's pages, replacing the cut social
  column so the three-column frame keeps its shape.
- The old per-page "next step" band (three steps, response-time promise) is
  gone everywhere: the response-time promise was cut in `06-contact.md` and
  no file specifies the band.
