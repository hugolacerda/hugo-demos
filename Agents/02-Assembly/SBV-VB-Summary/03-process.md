# SBV Value Builder Summary Agent — Process
**Version:** 1.3 | June 2026

| Version | Date | Notes |
|---------|------|-------|
| 1.1 | June 2026 | Added PDF output + whitespace-safe print CSS spec to Step 10 (single-document: no forced header breaks; page-break-inside:avoid on cards; repeating thead). |
| 1.2 | June 2026 | Added Step 11 "Stage next agent's inputs" — automatic handoff staging of the vb-summary HTML to Agent 03 (Report Narrative), marked optional. |
| 1.3 | June 2026 | Added a new Step 0 "Locate the Engagement and Read project-setup.md" (reads the VB Assessment PDF from `inputs/`, writes to `05-vb-summary/`, with legacy local-folder fallback). All previously numbered steps shifted down by one (old Step 0 "Read the Chief-of-Staff File" → Step 1, …, old Step 11 → Step 12) to keep the sequence contiguous after the new Step 0. |

This file defines the exact steps this agent follows on every run. Do not skip steps. Do not reorder them. If a step cannot be completed, stop and report why rather than proceeding on an assumption.

---

## Step 0 — Locate the Engagement and Read project-setup.md

If the operator specifies a project codename when invoking this agent, derive the folder slug (lowercase, spaces replaced by hyphens) and read `/Agents/Engagements/[slug]/project-setup.md` in full before doing anything else. This file is the single source of truth: the legal name (internal reference only — never used in output), the engagement tier, the earnings basis, the valuation date, the standing context, and the Stage Paths table telling you exactly which folder to read from and which to write to.

For Agent 05 (VB Summary) specifically, "inputs" and "outputs" anywhere else in this process file mean the engagement stage folders given in project-setup.md's Stage Paths table for this agent — read the Value Builder Assessment PDF from the engagement's `inputs/` folder and write the VB summary output to `05-vb-summary/` — not this agent's own local `inputs/` or `outputs/` subfolder.

If `project-setup.md` does not exist for the given codename, stop and report that Agent 00 must be run first for this engagement.

If no codename is given by the operator, fall back to this agent's own local `inputs/` and `outputs/` subfolders (legacy behavior, for ad hoc runs outside the engagement system).

Use the codename only in every output filename and document header. Never the legal name.

---

## Step 1 — Read the Chief-of-Staff File

**Path:** `/Agents/00-chief-of-staff/chief-of-staff.md`

Read this file before doing anything else. Confirm the following standing rules are loaded:
- No agent output reaches a client without human review
- The agent registry is updated after every run

Do not proceed until standing rules are confirmed.

---

## Step 2 — Confirm Inputs

Confirm the Value Builder Assessment PDF for this client is present in the inputs/ folder. Read only what is provided in this session; do not pull data from any external system.

---

## Step 3 — Read the Value Builder Assessment PDF

Read the complete report. For every one of the 8 drivers, record:
- Driver name (exact name as used in this agent's vocabulary — see File 04)
- Score out of 100
- Industry average
- Gap (score minus industry average — note whether positive or negative)
- Key commentary present in the PDF for this driver: what did the report say about the owner's answers? What did the gauge positions indicate? What specific data points (percentages, assessments, NPS figures) are present?

Build this as an internal 8-row map before moving to Step 4. Do not begin writing observations until the full map is complete.

---

## Step 4 — Read Business Context (If Provided)

If an optional context paragraph was placed in the inputs/ folder, read it now. Note:
- Industry and sub-industry
- Revenue range (if provided)
- Engagement tier: Express, Explore, Accelerate, or Certified
- Owner tenure (years in business)

These shape how the observations are framed. A 39/100 Hub and Spoke score means something different for a solo operator in year 2 than for a 15-person company in year 12. Use the context to calibrate tone, depth, and the specificity of recommended actions.

If no context is provided, note the absence and proceed using only what the PDF contains.

---

## Step 5 — Score and Rank All 8 Drivers by Impact Opportunity

Rank all 8 drivers before writing. Ranking is by impact opportunity, not by lowest score alone. A driver scoring 10/100 in an area that is structurally fixed and unlikely to change before a transaction is lower priority than a driver scoring 35/100 where a specific, actionable improvement exists.

Apply four criteria to each driver to determine rank:

**A. Gap magnitude:** How far below the industry average is this driver? Larger negative gaps indicate greater opportunity relative to peers.

**B. Leverage:** If this driver improved significantly, how much would it change the transferable value of this business? Recurring Revenue and Hub and Spoke, for example, are high-leverage because they directly affect buyer risk perception.

**C. Specificity:** Does the report contain enough specific detail about this business to write a business-specific observation — a score, a data point, a gauge answer, a stated percentage — rather than a generic restatement of the Value Builder framework?

**D. Actionability:** Is there a concrete step the owner can take before a transaction that would address this driver? Structural limitations (e.g., an inherent industry characteristic that cannot be changed) reduce actionability.

Document the ranking internally before moving to Step 6. Do not skip this step. The ranking is what justifies the selection — and it is reported in the output if Nancy asks.

---

## Step 6 — Select the 3 Highest-Impact Drivers

From the ranked list, select the top 3. These become the Priority Observations.

The 5 remaining drivers become the Remaining Drivers section — one sentence each, score and status only, no recommendations.

If two drivers are essentially tied on all four criteria, default to the one with the larger gap from the industry average.

---

## Step 7 — Write the 3 Priority Observations

Write each priority observation following the voice standards below. Read the golden example in File 02 before writing. Every observation must:

- Open with what the score reveals about this specific business — not about businesses in general.
- Include the score and the gap from industry average in natural language (not just the header number).
- Tell the owner what the number means for the transferable value of their business.
- State what a buyer or acquirer would think when they see it.
- End with one Recommended Action that is specific to this business — tied to what the report actually says about this owner's situation, not a restatement of generic Value Builder guidance.

**Voice standards (same as the Observations Agent):**
- Full sentences only. No bullet points inside observations. No dashes used as sentence substitutes.
- Percentages AND dollar figures together where the data supports them. Never use one without the other when both are available.
- Comparative language: "versus the industry average," "compared to similar businesses," "17 points below," "38 points below what peers in this category typically achieve."
- Plain-language conclusions: tell the owner what the number means for them, not just what the score is.
- Confident and declarative: "The score of 0 confirms…" not "the score may indicate…"
- Rounded, readable figures. "11 points above average" not "11.2 percentage points."
- Professional but not academic. Write for business owners, not for analysts.

**Do not use:**
- Bullet points inside observations
- Passive constructions ("it was noted that…")
- Hedge phrases ("it appears," "it seems," "may have")
- Academic or generic phrasing
- Numbered sub-points within an observation

---

## Step 8 — Write the Remaining Drivers Summary

Write one sentence per remaining driver. Each sentence must include:
- The driver name
- The score and industry average
- A one-line status: whether this is a strength, near average, or a gap, and one specific signal from the report if available

No recommended actions in this section.

---

## Step 9 — Write the Analyst Note

Write one paragraph. Cover:
- The overall pattern across the 8 drivers — what does the profile as a whole reveal about this business?
- What does the profile signal about this business's readiness for a valuation or exit conversation?
- Are the key gaps related to each other, or are they independent?
- Written in Nancy's voice: declarative, direct, professional.

The Analyst Note should read as if Nancy wrote it after reviewing the full report herself. It is not a summary of what the agent did — it is a professional assessment of what the data means.

---

## Step 10 — Run the Quality Check

Before saving any output, read File 05 (`05-quality.md`) and confirm every gate passes.

If any gate fails: fix the output and re-check before saving. Do not deliver output that fails a gate.

Record internally which gates were checked and whether each passed.

---

## Step 11 — Assemble the Branded HTML, Save, and Update Registry

**Assemble the output as a single branded HTML file**, consistent with the other SBV agent outputs. Apply SBV brand styling: Playfair Display headings, Libre Franklin body text, midnight (`#0E1F3D`) for the header banner and section headers, ivory (`#F5F0E8`) background, and ember (`#C4553A`) as the accent (used for the Recommended Action labels). Structure, in order: a header banner (client name, engagement tier, date); three Priority Observation cards (driver name + short title, the score line, the 2–3 sentence body, and a set-off Recommended Action); a Remaining Drivers section (one line per driver); an Analyst Note section; and the SBV disclaimer at the bottom ("Prepared by Strategic Business Valuations. For internal review only. Not for client distribution without Nancy Hallett CVA sign-off.").

**PDF copy.** After saving the HTML file, also save `vb-summary-[client-name]-[YYYY-MM-DD].pdf` to the `outputs/` folder. Render the HTML as a print-ready PDF, US Letter portrait, 0.75-inch margins. If the PDF renderer is not available, save a print-optimized HTML with `@media print` CSS and note in the report that the PDF step was skipped.

**Print CSS for PDF fallback.** The HTML output must include a `<style>` block with these `@media print` rules. This is a short single-document output (header banner, three Priority Observation cards, the Remaining Drivers section, the Analyst Note, and the disclaimer), so **do not force a page break before section headers** — forcing breaks on a short document is what produces half-blank pages. Let the content flow and only prevent ugly splits: do not apply `page-break-before` to any heading; set `font-size: 11pt` for body text and `13pt` for section headers; apply `page-break-inside: avoid` to each Priority Observation card, the Remaining Drivers block, and the Analyst Note so none is split mid-block; set `ul { list-style-position: inside; }` so list markers are not orphaned from their content when `page-break-inside: avoid` is applied to `li` elements; if any table is present, set its width to 100% with `border-collapse: collapse`, keep every `tr` from splitting, and set `thead { display: table-header-group }`. Show the disclaimer on the first and last page only; print footer via CSS `@page` rule: "Page X of Y — Strategic Business Valuations — Confidential" in 9pt Libre Franklin. Set the page size to US Letter (8.5in × 11in) and margins to 0.75in all sides.

**Save the output file:**
- Location: `outputs/` subfolder within the agent package folder
- Filename: `vb-summary-[client-name]-[YYYY-MM-DD].html`
- Example: `vb-summary-vesta-utility-2026-06-15.html`

**Update the agent registry:**
- Path: `/Agents/00-chief-of-staff/agent-registry.md`
- Update the Last Live Test date for the Value Builder Summary Agent row to today's date.

**Report to the user:**
- Confirm the output was saved and where
- Flag anything in the source document that was unclear, missing, or required an assumption during the run
- Note the engagement tier if it was not provided (so Nancy can add it if desired)

---

## Step 12 — Stage Next Agent's Inputs

After all outputs are saved to the `outputs/` folder, stage the downstream agent's input automatically so the next session starts with it already in place. Overwrite any existing copy at the destination.

Copy to `/Agents/02-Assembly/SBV-Report-Narrative/inputs/`:
- `vb-summary-[client-name]-[date].html` (the vb-summary HTML file produced this run)

**This input is optional for Agent 03.** The VB Summary is an optional-but-recommended input to the Report Narrative — Agent 03 continues and produces its report if this file is absent (it simply omits Section 2, the qualitative value-driver section). Staging it here ensures Agent 03 includes the qualitative section when a VB Summary run has been completed.

After copying, report which file was copied and to which destination folder, so the operator can confirm the handoff happened.
