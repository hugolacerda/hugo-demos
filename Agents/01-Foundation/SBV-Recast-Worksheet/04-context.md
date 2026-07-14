# SBV Recast Worksheet Agent — Context

## About Strategic Business Valuations

Strategic Business Valuations (SBV) is a certified business valuation firm that serves privately held business owners, primarily in the $1M–$20M revenue range. SBV's work combines formal valuation methodology with an education-first approach — the goal is not just to produce a number but to help owners understand what drives value in their business and how to improve it.

The recast worksheet is the financial foundation of every valuation SBV produces. It translates the owner's raw financial statements into the normalized earnings picture that buyers, lenders, and advisors actually use to evaluate a business.

---

## Why Recasting Exists

Business owners who are also operators routinely run personal expenses through their business. This is legal, common, and often encouraged for tax purposes. However, it means the income statement as reported significantly understates the economic benefit the owner actually receives from the business.

A recast removes those personal expenses (the "add-backs") to reveal the true earnings a new owner would receive. This figure — Seller's Discretionary Earnings (SDE) — is the standard measurement used for small and mid-market business transactions.

Gary's framing: "He went from making $189,000 to $523,000." The reported number and the recast number are both true. The recast is the one that matters for valuation.

---

## Key Terms

**Recast / Recasting**
The process of adjusting a financial statement to remove owner-specific and non-recurring items, producing a normalized picture of business earnings.

**Add-Back**
Any expense on the income statement that is being removed (added back) because it is personal in nature, non-recurring, or would not continue under new ownership. Examples: owner salary, spouse salary, personal vehicle, personal health insurance, one-time legal fees, personal meals.

**Seller's Discretionary Earnings (SDE)**
The most common earnings metric for small business valuation. Calculated as Net Income + all add-backs. Represents the total economic benefit available to a working owner-operator.

**EBITDA**
Earnings Before Interest, Taxes, Depreciation, and Amortization. More commonly used for larger businesses with institutional buyers (private equity, strategic acquirers). SDE and EBITDA tell different stories for different buyer types.

**Cost to Replace Owner**
If an owner is generating significant revenue personally (a doctor, attorney, or service business owner who does the work), a buyer would need to hire someone to replace that function. This figure is subtracted from SDE to arrive at EBITDA Equivalent.

**Trailing 12 Months (TTM)**
A financial statement that covers the 12-month period ending most recently — often more current than the last full fiscal year. For example, a TTM through April 2026 includes May 2025 through April 2026.

**Common Size**
Expressing financial statement line items as a percentage of revenue, enabling comparison across years even when absolute dollar figures differ.

**Gross Profit / Gross Margin**
Revenue minus Cost of Goods Sold. The margin measures how much revenue remains after direct costs to generate it. Industry benchmarks vary widely.

**Normalized**
Interchangeable with "recast" — the adjusted financial statement after add-backs have been applied.

---

## What SBV Reports Need to Do

Gary's stated goal: reports should tell a story. Not a data dump of every line item, but a clear progression that a non-financial business owner can follow.

The recast worksheet serves two audiences:
1. The owner reviewing the report — they need to recognize their own numbers and understand what changed and why
2. A potential buyer or lender reviewing the business — they need confidence in the normalized earnings figure

The worksheet format Gary uses (modeled on Valuetrax) shows the As Reported column next to the Recast column so the owner can literally see: "Here is what your tax return says. Here is what the business actually earned."

---

## Data Variability Gary Flagged

Client financial statements are not consistent in format. SBV receives:
- QuickBooks exports in Excel
- PDFs from accounting software
- PDFs from CPAs
- Occasionally handwritten or poorly formatted statements
- Tax returns always arrive as PDFs

Common data quality issues encountered:
- Statements covering non-standard periods (Gary showed a 13-month example)
- Accounts moved between categories by the CPA without explanation (e.g., wages moved from COGS to operating expenses)
- Sub-categorization varying year to year (six sub-lines of Advertising one year, two the next)
- Missing years (owner only provides recent data)

The agent must handle format variation gracefully and flag anomalies rather than silently processing bad data.

---

## Amanda's Role

Amanda is the operations team member who currently performs the manual version of this process. She is also the human QA layer between the agent's output and the client-facing report. Any QA flags the agent produces should be reviewed by Amanda before output proceeds to Nancy or Gary.
