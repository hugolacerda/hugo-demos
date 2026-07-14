<!-- Note: This file contains both QA checks and hard guardrails. Consider splitting into separate files to match the Observations Agent structure in a future revision. -->

# SBV Recast Worksheet Agent — Quality & Guardrails

**Version:** 1.1 | June 2026

| Version | Date | Notes |
|---------|------|-------|
| 1.1 | June 2026 | QA logic corrections per Gary June 16 meeting. No annualization. IDA absence not flagged. Neutral QA framing. PDF output added. |

## QA Checks the Agent Must Perform

### Period Validation
- [ ] If a financial statement covers fewer than 12 months, do not halt. Label the period as partial in all outputs (e.g. "Jan–Sep 2024 — 9 months"). Do not annualize, do not gross up, do not adjust the figures. Flag the partial period in qa-notes.html noting the exact months covered, and continue processing with the figures as reported.
- [ ] The period end date of the financial statement matches the expected fiscal year end.
- [ ] If a TTM statement is included, its period is clearly identified and labeled as TTM, not as a fiscal year.

### Account Matching
- [ ] Every non-IDA add-back in the add-backs document was matched to a corresponding account in the source financial statement.
- [ ] Interest, Depreciation, and Amortization (IDA) are always added back when present on the P&L. If IDA lines are absent from the P&L, take no action and write no flag — their absence is not an anomaly.
- [ ] If a non-IDA add-back instruction references an account name that does not exist in the statement for that year, flag it with the account name and the year. Do not silently drop it.
- [ ] If the add-back amount for a given year exceeds the reported amount of that expense line, flag it. (You cannot add back more than was spent.)

### Revenue & Net Income Sanity
- [ ] Total Revenue is greater than zero for all years.
- [ ] Net Income can be negative — this is valid. Do not flag negative net income alone.
- [ ] Gross Profit should be positive. If Total COGS exceeds Total Revenue, flag it.

### Year-Over-Year Variance Flags (informational, not errors)
Flag any of the following in the QA notes as worth human review:
- Revenue change greater than 40% in either direction year over year
- Gross margin change greater than 10 percentage points year over year
- Any single expense line changing by more than 50% year over year
- SDE declining year over year for two or more consecutive years

These are not necessarily errors — they may have legitimate explanations. Flag them as neutral internal notes for Amanda and Nancy's review. Do not infer a cause, do not speculate about a structural or business-model change, and do not use language implying SBV needs to address something before speaking to the client. SBV typically already knows the context.

### Cross-Reference: Financial Statement vs. Tax Return
If both a financial statement and a tax return exist for the same year:
- Compare Total Revenue between the two. If the difference exceeds 5%, flag it with both figures shown.
- Compare Net Income between the two. If the difference exceeds 10%, flag it with both figures shown.
- Note in the QA file whether the financial statement or the tax return was used as the primary source for the recast, and why.

---

## What This Agent Must Never Do

**Never calculate a valuation or estimate of value.**
The recast worksheet produces normalized earnings figures only. It does not apply multiples, does not estimate enterprise value, does not produce a range of value. That is a separate process.

**Never send output externally.**
All outputs stay in the local `outputs/` folder. The agent does not email, upload, or transmit anything.

**Never proceed past a critical QA flag without human acknowledgment.**
Critical flags: add-back amount exceeds reported expense, missing revenue section in a source document. For these, write the flag to qa-notes.html and stop. Do not produce output for that year until the issue is resolved. (A partial period is not a critical flag — label it and continue with the figures as reported. Never annualize.)

**Never invent figures.**
If a data point is missing from the source document, leave the cell blank and note the gap in qa-notes.html. Do not interpolate, estimate, or fill in missing data.

**Never aggregate tax return figures with financial statement figures.**
If both sources exist for the same year, choose one as the primary source and flag which was used. Do not blend the two.

**Never produce a separate common size sheet.**
Percentage of revenue figures appear as sub-columns beside the dollar amounts on the same row of the multi-year sheet. Never on a separate page.

---

## Output Quality Standards

Before marking the job complete, confirm:
1. Every input year has a corresponding output recast worksheet
2. The multi-year comparison includes all years processed
3. qa-notes.html exists and has been written (even if it says "No issues found")
4. All percentage columns calculate correctly (spot check: SDE % Revenue = SDE / Total Revenue)

---

## When to Escalate to Hugo

Escalate (do not proceed) if:
- Source documents are in a format the agent cannot read
- The add-backs document is missing entirely
- There are fewer than 2 years of financial data available
- The QA notes indicate potential fraud indicators (e.g., revenue on tax return significantly lower than financial statement with no explanation)

In any of these cases, write a clear description of the issue to qa-notes.html and stop.
