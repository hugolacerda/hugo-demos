# Recast Worksheet QA Checklist — Amanda

Use this checklist every time the Recast Worksheet Agent produces output. Do not forward output to Nancy or Gary until this checklist is complete.

---

## Step 1: Read the QA Notes File First

Open `outputs/qa-notes.html` before looking at anything else. This file is now an HTML report — open it in a browser, not a text editor.

- [ ] QA notes file (`qa-notes.html`) exists
- [ ] Data quality assessment at the bottom says CLEAN or REVIEW NEEDED (not INCOMPLETE)
- [ ] If REVIEW NEEDED: read every flagged item and confirm you understand what needs attention
- [ ] If INCOMPLETE: do not proceed. Contact Hugo.

---

## Step 2: Period Check

Open each single-year recast worksheet.

- [ ] Every year's recast is labeled with the correct year and period (e.g., "FY 2023 — Jan 1 to Dec 31")
- [ ] No year is labeled as 12 months if the source document was not 12 months
- [ ] If a TTM statement was included, it is clearly labeled as TTM (not as a fiscal year)

---

## Step 3: Math Check (spot check, not full audit)

Pick the most recent year's recast and verify:

- [ ] Gross Profit = Total Revenue minus Total Cost of Goods (verify manually in a cell)
- [ ] Total Operating Expenses is the sum of all individual expense lines
- [ ] Net Income appears in Column 1 (Statement) only — Column 3 (Adjusted) should be blank on that row.
- [ ] SDE appears on a separate row directly below Net Income, with a value in Column 3 only — Column 1 should be blank on that row.
- [ ] Verify: SDE = Net Income + Total Add-Backs.
- [ ] If Net Income and SDE appear on the same row, or Net Income shows a value in Column 3, flag it to Hugo as a formatting error.

---

## Step 4: Add-Backs Check

The addbacks file uses a matrix format (rows = addback categories, columns = years). A blank cell means no addback was applied for that category and year.

- [ ] Every non-blank cell in the addbacks matrix has a corresponding line in that year's recast
- [ ] If an addback row has a value but no matching line appears in the recast, flag it in your review notes
- [ ] No 100% add-back exceeds the corresponding reported expense (you cannot add back more than was spent)

---

## Step 5: Multi-Year Comparison Check

Open `outputs/multi-year-comparison.xlsx`.

- [ ] All processed years are present (columns)
- [ ] Each year has two sub-columns: a dollar amount and a percentage of revenue shown beside it. Verify the percentages look proportional to the dollar amounts — Revenue should always show 100.0%.
- [ ] SDE for each year matches the single-year recast worksheets
- [ ] Most recent year is leftmost

---

## Step 6: Naming Check

- [ ] Files are named clearly and consistently using the client's name

---

## Step 7: Overall Reasonableness

This is a judgment check. You have seen enough of these to know when something looks wrong.

- [ ] Does the SDE figure seem plausible given the business size and industry?
- [ ] Are any year-over-year swings so large they seem like data errors rather than real business changes?
- [ ] Does the multi-year trend tell a coherent story, or does something look off?

If anything feels wrong, flag it for Nancy before proceeding. Write a note in a separate file called `qa-review-[client-name].txt` and describe what concerned you.

---

## Sign-Off

When the checklist is complete and you are confident in the output:

Move all output files to the client's folder in SecureSync. Notify Nancy that the recast worksheets are ready for her review.

Do not send output directly to the client. Nancy reviews before client delivery.

---

## Common Issues and What To Do

| Issue | What To Do |
|---|---|
| QA notes flag a 13-month (or non-12-month) statement | The agent automatically annualizes partial-year data and flags it in the QA notes. Confirm the QA file notes which year was annualized and what period it covered. No intervention needed unless the QA file marks it as Critical. |
| An add-back account name doesn't match any statement line | Check the source document for a similar account name. If still no match, note it and ask Nancy. |
| Net income on recast doesn't match the original statement | This is a math error. Flag immediately to Hugo. |
| Revenue swings more than 40% year over year | Flag for Nancy to address in the observations — not necessarily a problem, but she needs to be aware. |
