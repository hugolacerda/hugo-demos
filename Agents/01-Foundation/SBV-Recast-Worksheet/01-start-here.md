# SBV Recast Worksheet Agent — Start Here

## What This Agent Does

This agent takes raw financial documents from a client and produces a clean, normalized recast income statement in SBV's standard format. It applies add-backs, aggregates expense categories, and outputs a year-by-year recast ready for the valuation report.

This is the first step in every SBV valuation. Nothing else — the multi-year comparison, the observations, the value estimate — can happen until the recast is done correctly.

---

## Before You Run This Agent

You need three things ready in this folder before invoking the agent:

### 1. Source Financial Documents
Place in the `inputs/` subfolder. Accepted formats:
- Excel spreadsheets (.xlsx, .xls)
- PDF income statements
- PDF tax returns

Name them clearly:
- `financial-statement-2022.pdf`
- `financial-statement-2023.xlsx`
- `tax-return-2022.pdf`
- etc.

Provide 3 to 5 years where available. Always include the most recent full year. If a trailing 12-month statement is available (e.g., through April of the current year), include it as well and name it `ttm-2026.xlsx` or similar.

### 2. Add-Backs Document
The addbacks file is a matrix where rows are account names and columns are years. Each cell is either 1 (add back 100% of that line for that year) or a dollar amount (add back exactly that amount). The file may be a separate document in the inputs folder, or it may be a tab named AddBacks within the same Excel file as the income statements (it's a QuickBooks export). Either format is acceptable.

### 3. Assumptions Document (optional but recommended)
Place in `inputs/` as `assumptions.txt` or add a tab to the add-backs file.

Common assumptions to include:
- Cost to replace the owner at market rate (if known)
- Any one-time items to flag (legal fees, equipment purchases, disaster losses)
- Any months where the business was not operating normally

---

## How to Run the Agent

Open CoWork. Navigate to this folder. Run:

```
Use the SBV Recast Worksheet Agent to process the files in the inputs/ folder.
Output the completed recast worksheets to the outputs/ folder.
Flag any data quality issues in a separate QA notes file before finalizing.
```

Do not run this agent without reviewing the QA notes file it produces. See `05-quality.md` for what to look for.

---

## What You Get

The agent produces the following in the `outputs/` folder:

1. **recast-[year].xlsx** — One per year. The normalized income statement for that year in the 4-column GW Business Valuations format (Statement / Add Backs / Adjusted / Notes).
2. **multi-year-comparison.xlsx** — All recast years side by side, most recent year leftmost, with a dollar and percentage-of-revenue sub-column per year.
3. **summary.xlsx** — Revenue, COGS, Gross Profit, Total Expenses, and SDE (plus Reasonable Owner Salary, EBITDA, and EBIT) across the years.
4. **recast-report.html** — A single styled HTML report containing the single-year worksheets, multi-year comparison, and summary.
5. **qa-notes.html** — Flags, anomalies, and anything requiring human review before the output is used in a report.

---

## File Naming

Name client documents and the outputs folder using the client's name. Before placing files in the `inputs/` folder:

1. Name all source files clearly using the client's name (e.g., `vesta-utility-financial-2023.xlsx`)
2. The outputs folder should be named with the client's name as well

---

## Questions or Problems

If the agent flags a QA issue you're not sure how to resolve, contact Hugo before proceeding. Do not override a QA flag and send output to a client without a human review.
