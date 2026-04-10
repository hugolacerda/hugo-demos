# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A fully static HTML/CSS/JS site for Strategic Business Valuations (SBV), a Jacksonville FL business valuation firm. No build step, no framework, no package manager — files are edited directly and previewed in the browser.

To preview locally: open any `.html` file directly in a browser, or run a simple server from the repo root:

```bash
python3 -m http.server 8000
```

## File layout

```
/                   Root pages (index, about, contact, valuations, exit, advisory, insights)
/insights/          12 static blog post pages, one per article
/assessment/        Standalone assessment tool (separate index.html)
/assets/css/        One stylesheet per page + main.css (global)
/assets/js/         main.js (scroll reveal), contact.js (form handling)
/assets/blog-imgs/  Blog post featured images
/assets/            Team photos, hero images, logo, globe watermark
/wireframe-reference/ Content/layout reference doc from original wireframe
```

## CSS architecture

**`main.css`** is loaded on every page and owns:
- Design tokens (`--color-midnight-hsl`, `--color-ember-hsl`, `--color-ivory-hsl`, `--color-clay-hsl`, etc.)
- Global reset, typography, container
- All shared components: `.btn-ember`, `.btn-ghost`, `.btn-ghost-sm`, `.eyebrow`, `.site-header`, `.main-nav`, `.header-right`, `.site-footer`, `.cta-band`, `.nav-dropdown`, mobile menu
- Scroll reveal (`.reveal` / `.reveal.visible`)

**Page-specific stylesheets** (`home.css`, `valuations.css`, `exit.css`, etc.) contain only the styles for that page's unique sections. They load *after* `main.css`.

**`post.css`** is used by all 12 `/insights/*.html` blog posts (`.post-hero`, `.post-content`, `.post-sidebar`, `.post-layout`, `.sidebar-card`).

## Design tokens (key ones)

| Token | Use |
|---|---|
| `--color-midnight-hsl` | Dark navy — hero/dark section backgrounds |
| `--color-ember-hsl` | Burnt orange — primary accent, buttons, highlights |
| `--color-ivory-hsl` | Off-white — light background, text on dark |
| `--color-clay-hsl` | Warm tan — muted text on dark backgrounds |
| `--font-headline` | Playfair Display (serif) |
| `--font-body` | Libre Franklin (sans-serif) |

Semantic aliases (`--background`, `--foreground`, `--card`, `--border`, `--accent`, `--muted-foreground`) map to the raw HSL tokens.

## Fonts

Loaded via Google Fonts on every page:
```
Playfair Display: ital,wght@0,400;0,500;0,600;0,700;1,400;1,500
Libre Franklin: wght@300;400;500;600;700
```

## Path conventions

- Root pages (`index.html`, etc.) reference assets as `./assets/...`
- Blog posts in `/insights/` reference assets as `../assets/...`
- Blog posts use `../assets/css/main.css` and `../assets/css/post.css`

## CTA standards

All primary call-to-action buttons across the site must:
- Use the text **"Speak with a Certified Expert"**
- Link to `https://calendly.com/gwba/one-on-one-with-gary`
- Include `target="_blank" rel="noopener noreferrer"`
- Use class `btn-ember` (with optional `lg` or `xl` modifier)

The only exceptions are content-specific buttons like "Download the Guide" or "Send Message" (contact form).

## Blog post structure

Each `/insights/*.html` file follows a fixed template:
1. Dark hero (`post-hero`) with title and date
2. Full-width featured image (`post-thumb`) from `../assets/blog-imgs/`
3. Two-column layout: `post-content` (article body) + `post-sidebar` (sticky CTA card)
4. `cta-band` section at the bottom
5. Standard footer

The author byline in `post-meta` is currently commented out — leave it that way unless explicitly asked to restore it.

## JavaScript

**`main.js`** — loaded on every page. Drives `.reveal` scroll animations via `IntersectionObserver` (threshold 0.12). Any element with class `reveal` fades in from below on scroll.

**`contact.js`** — only loaded on `contact.html`. Handles the contact form `handleSubmit()`.

## Globe watermark

Two scoped instances in `home.css`, each clipped naturally by their parent's existing `overflow` and `position` context:

- **`.segmentation::before`** — left-side watermark centered vertically on the services/segmentation section. `position: absolute`, 520px, opacity 0.07. Works because `.segmentation` has `position: relative; overflow: visible` — the globe bleeds out left but doesn't affect layout.
- **`.final-cta::after`** — bottom-right watermark clipped inside the dark CTA section. `position: absolute`, 480px, opacity 0.06. `.final-cta` already has `position: relative; overflow: hidden` in `main.css`, so the globe is automatically clipped to that section with no extra rules needed.

Do not use `position: fixed` (follows viewport on scroll) or `body::after` (unclipped, hard to control visibility per section).

## Sticky sidebar / overflow gotcha

`.seg-left` in the segmentation section uses `position: sticky`. For this to work, its ancestor `.segmentation` must have `overflow: visible` (not `hidden`). If you ever add `overflow: hidden` to `.segmentation`, sticky will break silently.
