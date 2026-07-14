# SBV Recast Worksheet Agent — Process

**Version:** 1.5 | June 2026

| Version | Date | Notes |
|---------|------|-------|
| 1.1 | June 2026 | QA logic corrections per Gary June 16 meeting. No annualization. IDA absence not flagged. Neutral QA framing. PDF output added. |
| 1.2 | June 2026 | Step 7 print CSS spec corrected to element-keyed page-break rules (per-worksheet page breaks via h3.yr-title, repeating thead, multi-year/summary cards kept whole, definitions block kept together). |
| 1.3 | June 2026 | Added Step 8 "Stage next agent's inputs" — automatic handoff staging to Agent 02 (Observations), Agent 07 (Earnings and Value), and Agent 03 (Report Narrative). |
| 1.4 | June 2026 | Step 7 HTML report now saved as `recast-report-[codename]-[YYYY-MM-DD].html` (matches the PDF filename exactly except for the extension); PDF filename token aligned from `[client-name]` to `[codename]` for that match and per the confidentiality rule. Added Step 9 "Clean Up Temporary Lock Files" — delete `.~lock.*.xlsx#` / `.~lock.*#` artifacts from the output folder before finishing. |
| 1.5 | June 2026 | Added Step 0 "Locate the Engagement and Read project-setup.md" — the agent now reads the engagement's project-setup.md natively and resolves "inputs"/"outputs" to the `inputs/` → `01-recast/` stage folders, with legacy local inputs/outputs fallback when no codename is supplied. |

## Overview

This agent follows a fixed sequence. It does not skip steps, and it does not proceed past a QA check without flagging issues for human review.

---

## Step 0 — Locate the Engagement and Read project-setup.md

If the operator specifies a project codename when invoking this agent, derive the folder slug (lowercase, spaces replaced by hyphens) and read `/Agents/Engagements/[slug]/project-setup.md` in full before doing anything else. This file is the single source of truth: the legal name (internal reference only — never used in output), the engagement tier, the earnings basis, the valuation date, the standing context, and the Stage Paths table telling you exactly which folder to read from and which to write to.

For Agent 01 (Recast) specifically, "inputs" and "outputs" anywhere else in this process file mean the engagement stage folders given in project-setup.md's Stage Paths table for this agent — read the raw source files from the engagement's `inputs/` folder and write every recast output to `01-recast/` — not this agent's own local `inputs/` or `outputs/` subfolder.

If `project-setup.md` does not exist for the given codename, stop and report that Agent 00 must be run first for this engagement.

If no codename is given by the operator, fall back to this agent's own local `inputs/` and `outputs/` subfolders (legacy behavior, for ad hoc runs outside the engagement system).

Use the codename only in every output filename and document header. Never the legal name.

---

## Step 1: Read and Validate Source Documents

Read all files in the `inputs/` folder.

For each financial statement found:
- Identify the reporting period (start month, end month, year)
- Count the number of months covered
- If a financial statement covers fewer than 12 months, do not halt. Label that period clearly in all outputs with the exact months and count (e.g. "Jan–Sep 2024 — 9 months"). Do not annualize or adjust the figures. Note the partial period in qa-notes.html with the exact months covered. Continue processing with figures as reported.
- Confirm the statement contains at minimum: a revenue section, a cost of goods (or cost of sales) section, and an operating expenses section
- If any of these sections are missing, flag in qa-notes.html

For each tax return found:
- Match it to the corresponding fiscal year
- Note whether figures align with the financial statement for the same year
- Flag discrepancies greater than 5% in total revenue or net income as a QA note

Record the years covered and confirm at least 2 years of data are present before proceeding.

---

## Step 2: Extract and Map Accounts

For each financial statement:

**Revenue section:**
- Sum all revenue sub-lines into a single Total Revenue figure
- Do not carry forward individual revenue line items

**Cost of goods (or cost of sales) section:**
- Sum all COGS sub-lines into a single Total Cost of Goods figure
- Do not carry forward individual COGS line items
- Calculate Gross Profit = Total Revenue minus Total COGS

**Operating expenses section:**
- Extract each top-level expense category (e.g., Advertising & Promotion, Wages & Salaries, Rent, Insurance)
- If a top-level category has sub-line items, sum them and report only the category total
- Do not carry forward sub-line items. If Advertising & Promotion has 6 sub-lines, they become one line: Advertising & Promotion
- Calculate Total Operating Expenses

**Net Income:**
- Extract as reported

### Account Normalization for Multi-Year

Before building the multi-year comparison, normalize all account names across all years using the following consolidation rules. This prevents duplicate rows caused by bookkeeper naming changes between years.

Group any accounts matching these patterns into a single normalized label. Apply to multi-year output only — single-year worksheets keep the original account names from the source document.

- Any account whose name contains "automobile," "auto and truck," "car/truck," "truck expense," "truck misc," "fuel exp," "truck / equipment," or "vehicle" → consolidate to: **Vehicle & Transportation**
- Any account whose name contains "legal & accounting," "accounting fees," "legal fees," or "professional fees" → consolidate to: **Professional & Legal Fees**
- Any account whose name contains "repair & maintenance" or "repairs and maintenance" → consolidate to: **Repairs & Maintenance**
- Any account whose name contains "bank service charges" or "bank charges" → consolidate to: **Bank & Service Charges**
- Any account whose name contains "business licenses," "licenses & permits," or "license and permits" → consolidate to: **Licenses & Permits**
- Any account whose name contains "phone," "telephone," "cable," "internet," or "cellular" → consolidate to: **Telephone & Communications**
- Any account whose name contains "meals and entertainment" or "travel & entertainment" → consolidate to: **Meals, Travel & Entertainment**

When consolidating, sum the adjusted dollar values for all matching accounts within each year. Show only the normalized label in the multi-year table. Do not show sub-lines.

If an account does not match any consolidation rule, use its original name as-is.

---

## Step 3: Apply Add-Backs

The addbacks file is a matrix. Rows are account names. Columns are years. Each cell contains either the number 1 or a dollar amount. If the value is 1, the addback for that account in that year equals 100% of the reported figure for that line. If the value is a dollar amount, the addback is exactly that amount regardless of what the income statement shows.

The addbacks document is authoritative. Follow it as given. Do not second-guess or override it. If an account name in the addbacks cannot be matched to a line in the income statement, flag it in qa-notes.html but continue.

The addbacks may sometimes be in a separate tab of the same Excel file rather than a separate document — check for an AddBacks tab before looking for a separate file.

Calculate:
- Owner Add-Backs Total = sum of all add-back amounts for the year
- Seller's Discretionary Earnings (SDE) = Net Income + Owner Add-Backs Total

### Add-Backs File Format: V2 Template Support

The addbacks file now also supports a three-section template (V2). Always load the addbacks workbook with `data_only=True` in openpyxl so that formula cells return their calculated values rather than formula strings.

**Format detection.** Look for a cell containing "SECTION 2" or "Owner Replacement Compensation" anywhere in the file. If found, use V2 logic. If not found, use legacy logic (the matrix described above).

**Section 1 — ADDBACKS.** Rows are addback categories, columns are years. Cell values are either a number (1 for a 100% addback, or a dollar amount for a fixed addback), a formula that evaluates to a number, or blank (meaning no addback for that category/year). Read each row by its label and apply it using the same rules as before: value of 1 means 100% of the matching P&L line; a dollar amount means exactly that amount. If a Section 1 row is blank for a given year, skip it — no addback applied. New row labels to recognize and match to P&L accounts:

- "Owner Salary" → Officers Salaries, Payroll Expenses-Officer, Owner Salary, or any account name containing "officer"
- "Owner Payroll Tax" → formula-calculated; Payroll Tax Expenses, Taxes - Payroll, or similar
- "Family Salaries" → any salary or compensation account not matched to Owner Salary
- "Family Payroll Tax" → formula-calculated; same matching logic as Owner Payroll Tax
- "Owner Health Insurance" → Insurance - General, Health Insurance, or any insurance account not classified as malpractice or liability
- "Owner Life Insurance" → Life Insurance - Officer, or any life insurance account
- "Owner Retirement/IRA" → Retirement Plan, Simple IRA, IRA, or similar
- "Owner Travel" → Travel Expense, Reimbursable Charges, or travel-related accounts
- "Owner Meals" → Meals and Entertainment
- "Owner Miscellaneous" → Miscellaneous Expense or similar
- "Owner Portion Auto/Truck Lease" → any vehicle lease account
- "Owner Portion Auto/Truck Fuel" → Gas & Oil, Fuel, or similar
- "Owner Portion Auto/Truck Insurance" → vehicle insurance sub-accounts if present
- "Rent Adjustment to Market" → Rent Expense; apply as an addback (positive value means rent is below market and increases SDE; negative value means rent is above market and decreases SDE)
- "Interest Income", "Interest Expense", "Depreciation", "Contributions" → same matching as before

**Section 2 — OWNER REPLACEMENT COMPENSATION.** This section does not produce addbacks on single-year worksheets; it feeds the summary sheet only. Read these rows: "Replacement Salary" (row label may say "Relacement Salary" — accept either spelling), "Benefits - Insurance", "Benefits - Auto", "Benefits - Other", and "Total Annual Compensation Before Bonus" (sum of the above). These values are already discounted at 3% per year going backwards from the most recent year; the file's formula handles this automatically and the agent reads the evaluated values. If Section 2 is present but all values are blank or zero, treat it as not provided and use the existing QA note placeholder behavior.

**Section 3 — RENT NORMALIZATION.** Labeled "used by the valuator, not the agent." The agent does not read or process Section 3 directly; the Rent Adjustment to Market value in Section 1 already incorporates the Section 3 calculation via formula.

If the addbacks file does not have the three-section structure, continue processing using the existing legacy logic.

---

## Step 4: Produce the Single-Year Recast Worksheets

Calculate the normalized figures once per year. The only output format is the 4-column GW Business Valuations format.

Four columns per year:
- Column A: **Statement** (source figures exactly as reported in the financial statement)
- Column B: **Add Backs** (the add-back amount only for that line; blank if no add-back applies)
- Column C: **Adjusted** (the normalized figure after add-backs are applied)
- Column D: **Notes** (brief annotation explaining each add-back, e.g., "ESTIMATE lease vehicle", "Health, Dental, Auto"; blank where no add-back applies)

Add a small header block at the top of each single-year worksheet showing:
- **Year**
- **Months** (number of months covered)
- **Source** (e.g. Internal Financials)

Single-year worksheets do not include any percentage columns. If any percentage value is ever written to a single-year worksheet (for example a gross margin % row), store it as a decimal and apply the number format `'0.0%'` to that cell so it displays as a formatted percentage.

Lines where the Adjusted value is $0 still appear on the single-year worksheet showing the Statement amount, the Add Backs amount, and $0 in Adjusted. Do not remove them.

Structure:
```
Year:    [year]
Months:  [n]
Source:  [Internal Financials]

                          STATEMENT      ADD BACKS      ADJUSTED       NOTES
Revenue
  Total Revenue           $[X]                          $[X]

Cost of Goods
  Total Cost of Goods     $[X]                          $[X]

Gross Profit              $[X]                          $[X]

Operating Expenses
  [Line item 1]           $[X]           $[X]           $[X]           [Note]
  [Line item 2]           $[X]                          $[X]
  [...]
  Total Operating Exp.    $[X]           $[X]           $[X]

Net Income                $[X]

Seller's Discretionary
Earnings (SDE)                                          $[X]
```

The Add Backs column is the only place add-backs appear. Do not repeat a summary block of add-backs below Net Income — there is no "Add-Backs Applied" section and no "Total Add-Backs" row. The worksheet should be compact enough to fit on one printed page.

Net Income row: show the reported net income figure in Column 1 (Statement) only. Leave Column 2 (Add Backs) and Column 3 (Adjusted) blank for this row.

Seller's Discretionary Earnings (SDE) row: immediately below Net Income. Leave Column 1 and Column 2 blank. Show the SDE figure in Column 3 (Adjusted) only. SDE = Net Income plus the sum of all Add Backs applied for that year.

Save each year as `recast-[year].xlsx` in the `outputs/` folder.

### Notes Column Default Text

For every add-back row on the single-year worksheets, generate a Notes entry using these rules. Only leave Notes blank if no add-back applies to that line.

Before applying any of the rules below: If the addback amount for a line is zero or null, leave the Notes cell blank for that line regardless of what the account name is. Do not generate a note for a line that had no addback applied. This applies to both the expense table rows and the Add-Backs Applied section at the bottom of each single-year worksheet.

If the addback value is 1 (100% of the line):
- Officers Salaries / Officer Compensation → "Owner compensation — added back in full"
- Depreciation (any variant) → "Non-cash expense — added back"
- Amortization (any variant) → "Non-cash expense — added back"
- Interest Expense → "Financing cost — added back"
- Interest Income → "Non-operating income — added back"
- Contributions & Donations (any variant) → "Owner charitable contributions"
- Life Insurance Officer (any variant) → "Owner life insurance premium"
- All other 100% addbacks → "[Account Name] — added back in full"

If the addback value is a fixed dollar amount (partial addback), prefix the note with "ESTIMATE" in all caps:
- Insurance - Liability (any variant) → "ESTIMATE personal insurance portion"
- Retirement Plan (any variant) → "ESTIMATE owner retirement contribution"
- Any vehicle-related account → "ESTIMATE personal vehicle use"
- Miscellaneous Expense (any variant) → "ESTIMATE owner personal expenses"
- All other partial addbacks → "ESTIMATE — partial personal expense"

The word ESTIMATE signals to Gary that the amount is a working figure pending client verification, which is standard practice in SBV recasts.

---

## Step 5: Produce the Multi-Year Comparison and Summary

Produce one multi-year comparison file saved as `multi-year-comparison.xlsx`.

Title the sheet: **RECAST INCOME STATEMENTS**

Layout: most recent year on the left, oldest year on the right. Each year occupies two sub-columns: dollar amount and percentage of revenue for that year. The percentage is that line's adjusted figure divided by Total Revenue for that year, expressed to one decimal place. Revenue = 100.0% for all years.

Column headers: show the year number on the first row. Show the data source on the second row (Internal Financials, or Annualized if that year was annualized).

Include all expense line items where the adjusted figure is non-zero in at least one year. Exclude any line where the adjusted figure is $0 across all years — these were fully added back and do not belong on the multi-year sheet. Negative adjusted figures are valid and should be included.

After applying account consolidation and before writing the output, apply this rollup rule. For each expense line item, calculate that line's adjusted value as a percentage of total revenue for each year. If the line is under 1% of revenue in every single year across all years processed, roll it into a consolidated "Other Expenses" line at the bottom of the expense section. Add its value to the Other Expenses total for each year.

Exception: if a line is under 1% of revenue in most years but crosses 1% in at least one year, keep it as a standalone line item across all years. Do not apply the 1% rule selectively per year — it is all-or-nothing per line item. Either the line appears as its own row for all years or it is absorbed into Other Expenses for all years.

Never roll the following into Other Expenses regardless of size: Revenue, Cost of Goods Sold, Gross Profit, Total Expenses, Seller's Discretionary Earnings, and any line that is one of the three largest expense categories by dollar amount in any year.

Do not add year-over-year change rows. The percentage sub-columns provide that context implicitly.

Bottom rows: Total Expenses with percentage, then Seller's Discretionary Earnings with percentage.

When writing percentage values to the xlsx with openpyxl, store them as decimals (e.g., 0.429) and apply the number format `'0.0%'` to every percentage cell — all `% Rev` columns on this sheet — so they display as formatted percentages (42.9%) when opened directly in Excel or Numbers. Do not write pre-multiplied numbers as text.

---

Also add a summary sheet saved as `summary.xlsx`.

Title: **RECAST INCOME STATEMENTS SUMMARY**

Column headers: Most Recent Year / Prior Year / Two Years Prior / Three Years Prior. Show the year number below each header. Show the data source below that (Internal Financials or Annualized).

Apply the same xlsx percentage formatting here: store every percentage-of-revenue sub-row value as a decimal and apply the number format `'0.0%'` to those cells so they render as formatted percentages in Excel or Numbers.

For each of the following rows, show the dollar figure and the percentage of revenue on separate sub-rows:
- Revenue (always 100.0%)
- Cost of Goods Sold
- Gross Profit
- Total Expenses
- Seller's Discretionary Earnings (SDE)

Then below SDE, add the **GM Replacement Compensation for Owner Leaving** block. This replaces the former single "Reasonable Owner Salary" line. Under the section header, show individual sub-lines for each Section 2 item that has a non-zero value across any year:
- Replacement Salary
- Benefits - Insurance (only if non-zero in any year)
- Benefits - Auto (only if non-zero in any year)
- Benefits - Other (only if non-zero in any year)
- **Total GM Replacement Compensation** (sum of the above — bold)

Then show: **EBITDA = SDE minus Total GM Replacement Compensation** (bold, highlighted in ember color in the HTML output).

Remove EBIT entirely. It no longer appears on the summary sheet.

If Section 2 is not provided or all values are blank, show "— (see QA notes)" for the entire GM Replacement Compensation block and the EBITDA row, and apply the existing QA note behavior.

Do not include a Weighting section, Expected SDE Growth, or Weighted Averages section. Those belong to a later agent.

### Summary Sheet Placeholder Handling

When GM Replacement Compensation (Section 2) is not provided, show "— (see QA notes)" in the cells for the entire GM Replacement Compensation block and the EBITDA row.

In the QA notes file, include this block:

```
OWNER REPLACEMENT COMPENSATION REQUIRED TO COMPLETE SUMMARY
GM Replacement Compensation (Section 2 of the add-backs template) was not provided in the inputs.
Historical officer compensation found in source data:
  [List any years where Officers Salaries was non-zero, with the dollar amount]
EBITDA cannot be calculated until replacement compensation is provided.
D&A addbacks found in source data:
  [List any years where Depreciation was added back, with the dollar amount]
EBITDA will auto-populate once GM Replacement Compensation is provided.
Action required: Gary to provide GM Replacement Compensation (replacement salary + benefits) before finalizing summary.
```

### SDE and EBITDA Definitions

At the bottom of the summary sheet, after the EBITDA row, add the following definitions exactly as written. Apply these to both the xlsx summary sheet (as a text block below the data) and the HTML report (as a styled definition section using the SBV brand fonts and colors).

**SDE (Seller Discretionary Earnings)** SDE is a financial metric that reflects the total earnings of a business, accounting for the discretionary expenses that are a benefit to the current owner, which a new owner might not need to incur. SDE is particularly relevant for small businesses and is often used in transactions where the owner's personal income is closely tied to the business operations.

Why It's Important to Know: For potential buyers, SDE provides a clearer picture of what they might actually take home. It can be beneficial when comparing businesses of varying sizes and structures. It's a straightforward way to evaluate profitability from the perspective of the owner's experience.

**EBITDA (Earnings Before Interest Tax Depreciation Amortization)** EBITDA is a more standardized measure of a company's operating performance, especially when measured by strategic buyers or private equity. It focuses on the earnings generated from the core operations of the business, excluding (personal) financial and accounting decisions that might distort the view of operational profitability.

Why It's Important to Know: EBITDA is often used by larger businesses and investors because it offers a clearer comparison of profitability across companies, regardless of their capital structure. It's a commonly accepted metric in the world of mergers and acquisitions, allowing potential buyers to assess a business's operational performance more easily.

In the HTML report, style these definitions in a dedicated section below the summary table. Use Playfair Display for the term headings (SDE, EBITDA), Libre Franklin for the body text, ivory background with a subtle midnight left border, and slightly smaller font size than the main table text.

---

## Step 6: Write the QA Notes File

Produce `qa-notes.html` summarizing:
- Any statements that were not 12 months
- Any accounts that could not be confidently matched between the source and the add-backs list
- Any year-over-year swings greater than 25% in any major line item (flag for human awareness, not necessarily an error)
- Any discrepancies between financial statements and tax returns
- Any assumptions made where the source data was ambiguous
- Overall data quality assessment: CLEAN / REVIEW NEEDED / INCOMPLETE

**Expense line emerging from near-zero check.** For each expense line in the most recent year, check its value in all prior years. If the line's value in the most recent year exceeds $50,000 AND its value was below $10,000 in every prior year, add a Review Needed flag in this format:

```
[Account name] was $[amount] ([X]% of revenue) in [most recent year] and was near-zero or absent in all prior years ([list prior year values]). This represents a significant structural change in how the business operates. Gary should understand this line item before presenting to the client.
```

**Gross margin collapse check.** For each year, calculate gross margin as Gross Profit divided by Total Revenue. If gross margin in any year is below 15%, add a Review Needed flag with this format:

```
[Year] gross margin is [X]% — significantly below the range observed in other years ([list other years and their margins]). This may indicate a bad contract, major project overrun, revenue recognition issue, or cost reclassification. Gary or Nancy should address this before presenting to the client.
```

**Negative SDE check.** If SDE is negative in any year, add an Informational flag with this format:

```
[Year] SDE is negative ([amount]). This is a calculated result, not an error. Net income for that year was [amount] and total add-backs of [amount] were insufficient to produce a positive SDE figure. This is consistent with the gross margin observed for that year. Gary should be prepared to explain this year in the client conversation.
```

Do not omit this file even if there are no other issues. A clean QA file still confirms the agent ran without problems.

---

## Step 7: Produce the HTML Report

After all Excel files are complete, produce a single HTML file saved as `recast-report-[codename]-[YYYY-MM-DD].html` in the outputs folder, using the codename from `project-setup.md` (lowercased with spaces replaced by hyphens) and the run date. This must match the PDF filename exactly except for the `.html` extension.

The HTML file contains all three sections in order: the single-year worksheets (one section per year), the multi-year comparison, and the summary. The data and layout mirrors the Excel outputs exactly.

Styling:
- Use Google Fonts: **Playfair Display** for all headings and section titles, **Libre Franklin** for all body text and numbers
- Page background: ivory (`#F5F0E8`)
- Section header backgrounds: midnight (`#0E1F3D`) with white text
- Accent color for SDE rows and key totals: ember (`#C4553A`)
- Tables should be clean with subtle borders, alternating row shading using a lighter tint of ivory
- Numbers should be right-aligned, labels left-aligned
- Percentage sub-columns should appear in a slightly smaller font directly beside their corresponding dollar amounts
- Include a disclaimer banner at the top and bottom of the page: "THIS INFORMATION IS NOT VERIFIED BY STRATEGIC BUSINESS VALUATIONS — EVALUATION FOR SELLER'S INFORMATION ONLY AND SHOULD NOT BE USED BY BUYER FOR PURCHASE DECISION"

**PDF copy.** After saving the HTML file, also save a print-ready PDF copy to the outputs/ folder as `recast-report-[codename]-[YYYY-MM-DD].pdf`, using the same codename and date as the HTML file (the two filenames must be identical except for the extension). The codename is used, never the client/legal name, per the confidentiality rule. Generate this PDF by rendering the HTML file using the same SBV brand styling. The PDF should be set up for A4 or US Letter (8.5 × 11 inches), portrait orientation, with 0.75-inch margins on all sides. All tables must be fully visible — no clipped columns. Page numbers appear in the footer: "Page X of Y — Strategic Business Valuations — Confidential." The draft disclaimer banner appears on page 1 and the final page. If the PDF renderer is not available in this environment, save a print-optimized HTML version with `@media print` CSS that hides browser chrome and adds page breaks at section boundaries, and note in qa-notes.html that the PDF was not generated and the HTML print version was saved instead.

**Print CSS for PDF fallback.** The HTML output must include a `<style>` block with the following `@media print` rules, keyed to the actual elements in the report so pagination breaks cleanly:

- `h2` — `page-break-before: auto` (section headers flow naturally; do not force a page break before each one).
- `h3.yr-title` — `page-break-before: always` and `page-break-after: avoid` (each year's worksheet starts on a new page and stays attached to its first rows).
- `h3.yr-title:first-of-type` — `page-break-before: auto` (no blank page before the first worksheet).
- `thead` — `display: table-header-group` (column headers repeat at the top of each page a table spans).
- `tr` — `page-break-inside: avoid` (no row is split across a page break).
- `.card` — `page-break-inside: auto` (long tables, such as a single-year worksheet, may flow across pages).
- `.card` containing the multi-year comparison or summary table — `page-break-inside: avoid` (these compact tables stay whole on one page).
- `.defs` — `page-break-inside: avoid` and `page-break-before: avoid` (the SDE/EBITDA definitions block stays together and attached to the summary).

Set body text to `font-size: 11pt` and section headers to `font-size: 13pt`; set all table widths to 100% with `border-collapse: collapse`; show the disclaimer banner on the first and last page only. Print footer via CSS `@page` rule: "Page X of Y — Strategic Business Valuations — Confidential" in 9pt Libre Franklin. Set the page size to US Letter (8.5in × 11in) and margins to 0.75in all sides.

---

## Step 8: Stage Next Agent's Inputs

After all outputs are saved to the `outputs/` folder, stage the downstream agents' inputs automatically so the next session starts with its inputs already in place. Overwrite any existing copy at each destination.

Copy to `/Agents/01-Foundation/SBV-Observations/inputs/`:
- `multi-year-comparison.xlsx`
- `summary.xlsx`
- `qa-notes.html`
- All `recast-[year].xlsx` files

Copy to `/Agents/02-Assembly/SBV-Earnings-Value/inputs/`:
- `multi-year-comparison.xlsx`
- `summary.xlsx`

Copy to `/Agents/02-Assembly/SBV-Report-Narrative/inputs/`:
- `qa-notes.html` (so Agent 03 has it available)

After copying, report which files were copied and to which destination folders, so the operator can confirm the handoff happened. List each destination and the files staged there.

---

## Step 9: Clean Up Temporary Lock Files

After all files are saved and staged, delete any LibreOffice/OpenOffice lock files left in the output folder by the Excel generation and recalculation process. These are temporary artifacts and must never remain in a folder a human will review.

Remove every file in the output folder whose name matches either pattern:

- `.~lock.*.xlsx#`
- `.~lock.*#`

Apply the same cleanup to any folder the outputs were written or staged to. Do not delete any other files — only the lock files matching the patterns above. Confirm in the run report that the lock-file cleanup ran and that no lock files remain.

---

## What This Agent Does NOT Do

- Does not generate narrative commentary or observations (that is a separate agent)
- Does not calculate valuation multiples or estimate business value
- Does not access Value Builder or any external platform
- Does not send output anywhere — all files stay local until a human reviews qa-notes.html
