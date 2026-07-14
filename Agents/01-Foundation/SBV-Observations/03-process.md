# SBV Observations Agent — Process
**Version:** 2.3 | June 2026

This file defines the exact step-by-step process this agent follows on every run. Do not skip steps. Do not reorder them. If a step cannot be completed, stop and report why rather than proceeding on an assumption.

---

## Step 0 — Locate the Engagement and Read project-setup.md

If the operator specifies a project codename when invoking this agent, derive the folder slug (lowercase, spaces replaced by hyphens) and read `/Agents/Engagements/[slug]/project-setup.md` in full before doing anything else. This file is the single source of truth: the legal name (internal reference only — never used in output), the engagement tier, the earnings basis, the valuation date, the standing context, and the Stage Paths table telling you exactly which folder to read from and which to write to.

For Agent 02 (Observations) specifically, "inputs" and "outputs" anywhere else in this process file mean the engagement stage folders given in project-setup.md's Stage Paths table for this agent — read the recast files from `01-recast/` and write every observations output to `02-observations/` — not this agent's own local `inputs/` or `outputs/` subfolder.

If `project-setup.md` does not exist for the given codename, stop and report that Agent 00 must be run first for this engagement.

If no codename is given by the operator, fall back to this agent's own local `inputs/` and `outputs/` subfolders (legacy behavior, for ad hoc runs outside the engagement system).

Use the codename only in every output filename and document header. Never the legal name.

---

## Step 1 — Read Inputs

Open and read the following files in order:

1. `multi-year-comparison.xlsx` — primary data source. Read all years, all rows.
2. Single-year recast worksheets for the same engagement if available — reference for addbacks detail.
3. `qa-notes.html` if provided — extract all flagged items and hold them for inclusion in DATA FLAGS.

Build a complete internal data map before writing any observation: Total Revenue, COGS, Gross Profit and margin %, each expense line by name and % of revenue, Net Income, add-backs with annotations, and SDE — all by year.

---

## Step 2 — Read and Map the Recast Worksheet

Read the complete recast worksheet. For each year in the dataset, record:
- Total Revenue
- Total Cost of Goods Sold (COGS)
- Gross Profit and Gross Margin %
- Each operating expense line by name, dollar amount, and % of revenue
- Total Operating Expenses and % of revenue
- Net Income (as reported, before normalization)
- All add-back items with dollar amounts and annotations
- Seller's Discretionary Earnings (SDE) and SDE % of revenue

Read all optional context fields if provided:
- Industry and engagement tier
- Company description
- Owner tenure or other relevant context

Build this as an internal data map before writing any observation. Do not begin writing until the full map is complete.

---

## Step 3 — Run Data Quality Checks

Before writing any observation, check for the following and flag any that are present (they go in DATA FLAGS at the end):

1. Any fiscal year that covers more or fewer than 12 months (e.g., a six-month annualization)
2. Revenue or expense figures that do not sum correctly
3. SDE that does not reconcile to Net Income plus itemized add-backs within a reasonable rounding tolerance
4. Any expense line that appears in a different category in one year versus another
5. A missing year in a multi-year sequence
6. Any add-back with no annotation or explanation
7. Any figure that appears anomalous relative to the industry context provided

Flag any anomalies now. Do not proceed past a data anomaly silently — it goes in DATA FLAGS regardless of whether it affects the observations.

---

## Step 4 — Write the Six Mandatory Observations

Write all six observations in order. Do not reorder, skip, or combine them. Each observation follows the voice standards below.

### OBSERVATION 1 — Revenue Growth Rate

Report the most recent one-year growth rate (or decline) and the cumulative growth rate over the full period reported. State both figures: the dollar change and the percentage change. If the most recent year is an annualization of partial data, note this explicitly and flag it as directional only — the observation should be written but the caveat must appear both in the observation text and in DATA FLAGS.

### OBSERVATION 2 — Gross Profit Margin

Report changes in gross profit margin in the most recent year and over the full period. Identify the high and low points across all years in the dataset. Note whether the most recent year represents improvement, deterioration, or stability relative to the trend. State the margin figures as percentages and provide the dollar impact of any significant margin change where the data supports it.

### OBSERVATION 3 — Three Largest Expense Categories

Note: the Recast Agent consolidates account names in the multi-year output. You will see normalized category labels such as "Vehicle & Transportation," "Professional & Legal Fees," "Telephone & Communications," and "Bank & Service Charges" rather than individual sub-account names. Work with these consolidated labels as given. Do not attempt to reference sub-account names that do not appear in the multi-year file.

Identify the three largest operating expense categories by dollar amount in the most recent year. For each, report:
- The dollar amount in the most recent year
- The change in the most recent year (dollar and % of revenue)
- The trend over the full period (dollar and % of revenue)

Write this as flowing prose, not a list. Each of the three categories gets at least one sentence.

### OBSERVATION 4 — Expense Categories With Greater Than 10% Relative Change

Exclude the "Other Expenses" line from this analysis. This is a consolidated catch-all for expense lines under 1% of revenue in every year and does not represent a single trackable category. Apply the 10% relative change check only to named expense line items.

For each expense line in the dataset, calculate its % of total revenue in the most recent year and the prior year. If the relative change in that ratio exceeds 10% (example: a line that was 12.0% of revenue becomes 10.0% — that is a 16.7% relative decline in the ratio), flag it as a material change. List all qualifying lines in this observation. For each, state: the line name, the % of revenue in the prior year, the % of revenue in the most recent year, the relative change in that ratio, and what the shift may indicate.

If no expense lines meet the 10% relative change threshold, state that explicitly: "No expense line showed a relative change in its % of revenue ratio exceeding 10% between [prior year] and [most recent year]."

### OBSERVATION 5 — Operating Expense Trends Year Over Year

Report total operating expenses as a percentage of revenue for each year in the dataset. Describe the directional trend across the full period. Note any year that was a meaningful outlier in either direction and provide context for it if the data supports an explanation. The goal of this observation is to tell the story of whether the business is becoming more or less efficient as it scales.

### OBSERVATION 6 — Net Income Trends Year Over Year

Report reported net income before tax for each year in the dataset and describe the trend. Then bridge to SDE with this standing instruction: **always end Observation 6 with a sentence explaining that reported net income volatility is expected in owner-operated businesses because it reflects owner compensation and personal expenses before normalization, and that SDE is the more meaningful measure of earning power. Name the SDE figure for each year so the reader has both the reported net income and the SDE in one place.**

Do not omit this bridge. It is required on every run.

---

## Step 5 — Write the DATA FLAGS Section

The DATA FLAGS section is required in every output, even if blank.

Consolidate here all anomalies identified in Step 3, plus any new anomalies discovered while writing observations. Write each flag as one to three sentences. If no anomalies were found, write: `None identified.`

Do not embed data flags inside observations. They go only in the DATA FLAGS section.

---

## Step 6 — Run the Quality Check

Before finalizing output, verify:

- All six observations are present and in the correct order
- No observation contains bullet points, numbered sub-points, or dashes used as sentence substitutes
- Every observation contains at least one comparison (year over year, or dollar figure vs. % of revenue)
- No valuation language appears anywhere (no multiples, no implied enterprise value, no estimated sale price)
- Observation 6 ends with the SDE bridge sentence naming each year's SDE figure
- DATA FLAGS section is present

If any check fails, fix the output before saving.

---

## Step 7 — Save Output and Report

**Output format:**

The observations output is a single HTML file using the SBV brand standards: Playfair Display for headings, Libre Franklin for body text, midnight (`#0E1F3D`) for section headers, ivory (`#F5F0E8`) for the page background, and ember (`#C4553A`) as the accent for the DATA FLAGS section header.

The HTML structure should have:
- A header banner with the client name, date, and engagement tier
- Six clearly labeled observation sections, each with a title and body text
- A DATA FLAGS section at the bottom in a visually distinct card using ember as an accent
- The SBV disclaimer at the very bottom: "Prepared by Strategic Business Valuations. For internal review only. Not for client distribution without Nancy Hallett CVA sign-off."

Observation content by section:
- OBSERVATION 1 — Revenue Growth Rate [2–4 sentences]
- OBSERVATION 2 — Gross Profit Margin [2–4 sentences]
- OBSERVATION 3 — Three Largest Expense Categories [3–6 sentences — one per major expense category plus framing]
- OBSERVATION 4 — Expense Categories With Greater Than 10% Relative Change [variable — one line per qualifying expense category, or one sentence if none qualify]
- OBSERVATION 5 — Operating Expense Trends Year Over Year [2–4 sentences]
- OBSERVATION 6 — Net Income Trends Year Over Year [2–4 sentences, ending with the SDE bridge]
- DATA FLAGS [one flag per line, or "None identified."]

**PDF copy.** After saving the HTML file, also save `observations-[client-name]-[YYYY-MM-DD].pdf` to the `outputs/` folder. Render the HTML as a print-ready PDF, US Letter portrait, 0.75-inch margins. If the PDF renderer is not available, save a print-optimized HTML with `@media print` CSS and note in the report that the PDF step was skipped.

**Print CSS for PDF fallback.** The HTML output must include a `<style>` block with these `@media print` rules. This is a short single-document output (header banner, the observation/category sections, the DATA FLAGS card, and the disclaimer), so **do not force a page break before section headers** — forcing breaks on a short document is what produces half-blank pages. Let the content flow and only prevent ugly splits: do not apply `page-break-before` to any heading; set `font-size: 11pt` for body text and `13pt` for section headers; apply `page-break-inside: avoid` to every observation/category card and to the DATA FLAGS card so a card is never split mid-block; set `ul { list-style-position: inside; }` so list markers are not orphaned from their content when `page-break-inside: avoid` is applied to `li` elements; if any table is present, set its width to 100% with `border-collapse: collapse`, keep every `tr` from splitting, and set `thead { display: table-header-group }`. Show the disclaimer on the first and last page only; print footer via CSS `@page` rule: "Page X of Y — Strategic Business Valuations — Confidential" in 9pt Libre Franklin. Set the page size to US Letter (8.5in × 11in) and margins to 0.75in all sides.

**Save the output file:**
- Location: `outputs/` subfolder within the agent package folder
- Filename: `observations-[client-name]-[YYYY-MM-DD].html`
- Example: `observations-vesta-utility-2026-06-09.html`

**Update the agent registry:**
- Path: `/Agents/00-chief-of-staff/agent-registry.md`
- Update the Last Live Test date for the Observations Agent row to today's date.

**Report to the user:**
- Confirm output was saved and where
- List any DATA FLAGS so the user sees them immediately without having to open the file
- Note the engagement tier if it was not provided

---

## Step 8 — Stage Next Agent's Inputs

After all outputs are saved to the `outputs/` folder, stage the downstream agent's input automatically so the next session starts with its input already in place. Overwrite any existing copy at the destination.

Copy to `/Agents/02-Assembly/SBV-Report-Narrative/inputs/`:
- `observations-[client-name]-[date].html` (the observations HTML file produced this run)

After copying, report which file was copied and to which destination folder, so the operator can confirm the handoff happened.

---

## Voice Standards (Every Observation)

These apply to all six observations without exception.

- **Full sentences only.** No bullet points inside observations. No dashes used as sentence substitutes.
- **Percentages AND dollar figures together.** Never use only one when both are available. "Gross margin expanded from 38% to 42%, adding approximately $85,000 to the bottom line." Not just "Gross margin improved 4 points."
- **Comparative language.** Use "versus the prior year," "compared to," "relative to," "year over year." Data without comparison is not analysis.
- **Plain-language conclusions.** Tell the business owner what the number means. "Which means the business is keeping more of every dollar it earns." Not just "gross margin improved."
- **Confident declarative statements.** Not hedged. Not passive. "Revenue declined 12% year over year" — not "revenue may have experienced some softness."
- **Rounded, readable numbers.** "$900,000" not "$897,432.18." "Almost $1.1 million" not "$1,097,881."
- **Professional but not academic.** Write for business owners, not auditors.

**Prohibited:**
- Bullet points inside observations
- Passive constructions ("it was noted that…")
- Hedge phrases ("it appears," "it seems," "may have")
- Academic or generic phrasing
- Valuation language (multiples, enterprise value, estimated sale price)

---

## Version History

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | May 2026 | Initial release — I/O specification format |
| 2.0 | June 2026 | Replaced with step-by-step process built around Gary's six-observation framework |
| 2.1 | June 2026 | Added PDF output + whitespace-safe print CSS spec to Step 7 (single-document: no forced header breaks; page-break-inside:avoid on cards; repeating thead). |
| 2.2 | June 2026 | Added Step 8 "Stage next agent's inputs" — automatic handoff staging of the observations HTML to Agent 03 (Report Narrative). |
| 2.3 | June 2026 | Added Step 0 "Locate the Engagement and Read project-setup.md" — reads the engagement's project-setup.md natively and resolves "inputs"/"outputs" to the `01-recast/` → `02-observations/` stage folders, with legacy local inputs/outputs fallback when no codename is supplied. |
