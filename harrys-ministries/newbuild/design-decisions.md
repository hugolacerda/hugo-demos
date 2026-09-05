# Newbuild Design Decisions — Hero, FAQ, Type, Colour, Map Animation

*Created September 5, 2026, as part of step 5 (fold research and stack reality into
real rules). This document is specific to the `newbuild/` Astro project and
supersedes `../planning/design-system.md` wherever the two conflict, that file
documents the original three-theme-toggle plan (Field Guide / Trust Ledger / Warm
Stewardship), which is no longer the active direction. Field Guide's texture
system, CTA hierarchy, and specimen-index pattern all carry forward unchanged,
only what's listed below has actually changed.*

*(Saved into the repo from the copy pasted into the build session on September 5,
2026. That copy ended mid-sentence in the final "Why Visit" paragraph; the text
below is verbatim up to that point.)*

---

## Typography

**Replacing:** Inter for both headings and body.
**With:** Fraunces (display/headings) paired with Instrument Sans (body copy, UI
chrome, forms, nav). JetBrains Mono is unchanged, it already reads as a deliberate
choice, not a generic one.

**Why:** Inter is the specific typeface named in our own earlier research as the
literal example of the safest, least distinctive default a model reaches for when
asked for "a modern professional website." That's not a vague taste complaint,
it's the named tell. Fraunces is a free, open-source (SIL OFL) variable serif
built with real "Old Style" character, explicitly suited to editorial, literary,
heritage-register brand systems, closer to a field journal or a naturalist's
specimen log than a SaaS dashboard. Instrument Sans stays legible at UI sizes and
in Spanish (full latin-ext support) without being the same default everyone else
reaches for.

**Known cost, not yet done:** new font files to source and self-host, the full
`text-*` scale re-tuned against Fraunces' and Instrument Sans' actual metrics
(they don't share Inter's proportions), every page that already exists re-checked
against the new type. This touches every built page, not just new work.

---

## Colour

**Keeping:** the jungle-ground darks (`#0E3A32`, `#0B2C26`), genuinely custom
values, not from any named palette. These carry the site's real identity and
don't need to change.

**Replacing:** the accent teal (`#0F766E`) and secondary cyan (`#155E75`), both
confirmed to be unmodified Tailwind default palette values (`teal-700` and
`cyan-800` exactly, byte for byte), not colours chosen for this project.

**Proposed accent:** `#0C6B57`, mixed from the same hue family as the ground
darks rather than an imported, unrelated swatch. Checked, not guessed: white text
on this background gives 6.45:1 contrast (AA passes at 4.5:1), and the colour used
as text/links against the paper background (`#FAFAF7`) gives 6.17:1, both clear
the bar with real room. Hover state, darken roughly 25%, `#095041` as a starting
point.

**Secondary accent:** rather than importing a second, unrelated stock hue, derive
it as a lighter, more muted step of the same new accent family instead of a
separate colour. Exact value not finalized here, colour reads differently on
screen than in a contrast calculation, this one needs an in-browser check during
the build rather than a value picked sight-unseen.

---

## Hero (Home and Visit, shared component)

Full-bleed, full-viewport-height, replacing the current photo-frame-wraps-copy
treatment. Two resolved specifics:

1. **Content stays in the visible fold.** Headline, subhead, and both CTAs sit in
   the upper portion of the hero rather than centered in the full height, so nothing
   the page needs seen requires scrolling on a laptop screen, even though the hero
   itself is full-bleed.
2. **Background is a real illustrated treatment, not a placeholder.** The
   hand-drawn ink linework already used for the building cross-section, scaled up
   large, becomes the actual hero backdrop. This is a permanent design decision,
   not a stand-in for a future photo, it doesn't need to wait on the photo audit
   and doesn't get replaced once real photography exists (though it could
   coexist with a photo later if that's ever decided deliberately).

**Added motion:** on Home specifically, the phrase "not just a check" in the
headline gets a GSAP ScrollTrigger-driven zoom/emphasis as the hero scrolls out of
view, the technique Farm Africa uses on their own headline, applied to the one
phrase on the site doing the most work.

---

## FAQ (all pages, shared component)

Replacing the accordion with the Specimen rail-and-panel structure already built
for Programs, a list of questions on one side, one open answer on the other,
rather than everything stacked and collapsing to the same interaction. Not
identical to Programs' presentation, on purpose: drop the numbered index styling
and the 3D flip transition, those belong to Programs' specimen metaphor, use a
simpler crossfade or slide for the FAQ's shorter answer content instead. The
actual questions and answers per page don't change at all, only how you reach the
answer does.

---

## Scroll-drawn map ("the trek"), Visit page only

**Technique, verified current and real:** GSAP ScrollTrigger pinning a section
while scrubbing two concurrent tweens, `DrawSVGPlugin` revealing a path's stroke
as if being drawn, `MotionPathPlugin` moving a small marker along that same path
in sync. Both plugins are part of the GSAP suite that became fully free in 2025,
no new cost, no new vendor. Source: Codrops, "Creating Scroll-Driven SVG Map
Animations with GSAP," May 2026, the demo code matches this description closely
enough to build from directly.

**Content rules, same discipline as everything else on this site:**
- Hand-drawn, same ink style as the building cross-section illustration, not a
  literal accurate map.
- Path starts from an unlabeled, generic point, never a specific real city or
  distance, since no real future team's origin is known.
- Path ends at a clearly labeled Poptún, Guatemala, the one confirmed geographic
  fact this needs.
- Optional "camera" pan/zoom following the moving marker (the tutorial's
  `gsap.quickTo()` technique) for a more cinematic feel, second priority after the
  basic draw-and-track version works.
- `prefers-reduced-motion`: the full path renders immediately, fully drawn, no
  animation forced on anyone who's asked not to have it, same standard already
  applied everywhere else on this site.

**Why Visit:** this page currently has the least going for it, its persuasive
content is almost entirely the trip-logistics facts we don't have yet. The trek
illustrates the base-camp model itself, which is
