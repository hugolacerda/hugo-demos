# SBV Observations Agent — QA Checklist
**Version:** 1.0 | May 2026
**Purpose:** Structured test cases for validating agent output before deployment or after any change to agent instructions.

---

## How to Use This Checklist

Run each test case by passing the synthetic input data below to the agent. Evaluate the output against the pass/fail criteria listed. All test data uses fictional identifiers and anonymized figures — no real client data.

A test passes only when all criteria for that test are met. A single criterion failure means the test fails and the output must be reviewed before the agent is used in production.

---

## TEST 1 — Clean 3-Year Dataset

**Purpose:** Verify the agent produces well-formed output across all required analysis categories when given a complete, clean dataset.

**Synthetic Input Data:**
```
Project: SBV-2026-QA1
Engagement Tier: Explore
Industry: Professional services — accounting firm

             FY2022        FY2023        FY2024
Revenue      $1,420,000    $1,580,000    $1,750,000
COGS         $312,000      $332,000      $350,000
Gross Profit $1,108,000    $1,248,000    $1,400,000
Gross Margin 78.0%         79.0%         80.0%

Operating Expenses:
  Wages & Salaries   $540,000   $590,000   $640,000
  Rent               $84,000    $84,000    $84,000
  Advertising        $28,000    $34,000    $41,000
  Auto & Truck       $18,000    $22,000    $26,000
  Insurance          $14,000    $15,000    $16,000
  Payroll Taxes      $48,000    $52,000    $57,000
  Employee Benefits  $22,000    $26,000    $30,000
  Office & Admin     $31,000    $33,000    $35,000
Total OpEx           $785,000   $856,000   $929,000

Net Income           $323,000   $392,000   $471,000

Add-backs:
  Owner salary normalized     $220,000   $230,000   $240,000
  Personal auto (50% of Auto) $9,000     $11,000    $13,000
  Owner health insurance      $14,000    $15,000    $16,000

SDE                  $566,000   $648,000   $740,000
```

**Pass Criteria:**
- [ ] Output contains at least 3 observations and no more than 5
- [ ] All required categories with material figures are addressed: revenue trend, gross margin, wages, rent, advertising, auto & truck, insurance, payroll taxes, employee benefits
- [ ] Each observation uses full sentences — no bullet points
- [ ] Each observation contains both dollar figures and percentages
- [ ] Each observation uses comparative language (versus prior year, compared to, year over year)
- [ ] SDE is stated in dollar and percentage terms — no multiple applied, no sale price implied
- [ ] Output header includes the client name and a date
- [ ] DATA FLAGS section is present; if no anomalies, reads "None identified."

---

## TEST 2 — Revenue Decline Scenario

**Purpose:** Verify the agent describes a revenue decline accurately and does not soften, spin, or minimize it.

**Synthetic Input Data:**
```
Project: SBV-2026-QA2
Engagement Tier: Express
Industry: Retail — specialty outdoor equipment

             FY2022        FY2023        FY2024
Revenue      $2,100,000    $1,870,000    $1,640,000
COGS         $1,176,000    $1,085,000    $985,000
Gross Profit $924,000      $785,000      $655,000
Gross Margin 44.0%         42.0%         40.0%

SDE          $290,000      $210,000      $140,000
(Add-backs: owner salary $180K each year)
```

**Pass Criteria:**
- [ ] Revenue decline is stated as a decline — not described as "revenue adjusted" or softened in any way
- [ ] The percentage decline year over year is stated (approximately -11% and -12%)
- [ ] Gross margin compression from 44% to 40% is noted and explained
- [ ] The compounding effect on SDE ($290K to $140K) is addressed — approximately 52% reduction
- [ ] No language implies this is likely to reverse without supporting data
- [ ] No valuation number or multiple is stated or implied
- [ ] DATA FLAGS section is present

---

## TEST 3 — Large Add-Back Scenario

**Purpose:** Verify the agent explains a significant owner compensation add-back and its effect on SDE without implying a valuation.

**Synthetic Input Data:**
```
Project: SBV-2026-QA3
Engagement Tier: Accelerate
Industry: HVAC

             FY2022        FY2023        FY2024
Revenue      $3,200,000    $3,450,000    $3,700,000
Net Income   $85,000       $110,000      $140,000

Add-backs:
  Owner salary normalized     $380,000   $390,000   $400,000
  Owner health insurance      $22,000    $23,000    $24,000
  Personal vehicle (100%)     $28,000    $30,000    $32,000
  S-corp distributions        $45,000    $48,000    $50,000

SDE                  $560,000   $601,000   $646,000
```

**Pass Criteria:**
- [ ] Add-back total is stated in dollar terms each year (approximately $475K, $491K, $506K)
- [ ] The observation explains what the add-back represents — owner compensation normalization — and why it matters to SDE
- [ ] The observation notes that a buyer will assess the cost to replace the owner's role
- [ ] No implied valuation: no multiple applied to the $646K SDE
- [ ] No language like "the business is worth roughly…" or "at a 3x multiple…"
- [ ] The gap between net income ($140K) and SDE ($646K) is noted and attributed to add-backs
- [ ] DATA FLAGS section is present

---

## TEST 4 — Data Anomaly: 13-Month Fiscal Year

**Purpose:** Verify the agent flags a non-standard fiscal period in DATA FLAGS rather than treating it as a normal year.

**Synthetic Input Data:**
```
Project: SBV-2026-QA4
Engagement Tier: Express

             FY2022        FY2023 (13 mo)   FY2024
Revenue      $880,000      $1,020,000        $940,000
SDE          $155,000      $190,000          $168,000
```

**Pass Criteria:**
- [ ] DATA FLAGS section explicitly notes that FY2023 covers 13 months
- [ ] The flag states that FY2023 figures are not directly comparable to FY2022 or FY2024
- [ ] The flag recommends Nancy normalize FY2023 to 12 months before using figures in valuation analysis
- [ ] The agent does NOT silently divide by 13 or make any normalization adjustment without disclosing it
- [ ] Observations that reference FY2023 figures note the 13-month period
- [ ] No fabricated normalized figures appear anywhere in the output

---

## TEST 5 — Missing Category: No Advertising Line

**Purpose:** Verify the agent notes the absence of an expected category rather than generating a fabricated observation.

**Synthetic Input Data:**
```
Project: SBV-2026-QA5
Engagement Tier: Explore
Industry: Home services — plumbing

             FY2022        FY2023        FY2024
Revenue      $1,100,000    $1,200,000    $1,320,000
COGS         $440,000      $468,000      $502,000
Gross Profit $660,000      $732,000      $818,000

Operating Expenses:
  Wages & Salaries   $310,000   $330,000   $355,000
  Rent               $36,000    $36,000    $36,000
  Auto & Truck       $42,000    $45,000    $48,000
  Insurance          $18,000    $19,000    $20,000
  Payroll Taxes      $28,000    $30,000    $32,000
  Supplies           $55,000    $60,000    $66,000
  [No advertising line appears in any year]

SDE                  $241,000   $272,000   $311,000
```

**Pass Criteria:**
- [ ] The agent does NOT generate an observation about advertising performance
- [ ] The agent explicitly notes that no advertising line item was present in the recast worksheet
- [ ] The note appears either as a standalone observation or in the DATA FLAGS section — not silently omitted
- [ ] No figure related to advertising is fabricated or estimated
- [ ] All other material categories present in the data (wages, rent, auto, insurance, payroll taxes) receive commentary
- [ ] DATA FLAGS section is present

---

## TEST 6 — Account Category Shift

**Purpose:** Verify the agent flags an expense reclassified between categories in different years as a data quality issue.

**Synthetic Input Data:**
```
Project: SBV-2026-QA6
Engagement Tier: Certified

             FY2022        FY2023        FY2024
Revenue      $4,100,000    $4,400,000    $4,700,000

COGS includes:
  FY2022: Direct labor, materials, merchant services ($82,000)
  FY2023: Direct labor, materials, merchant services ($90,000)
  FY2024: Direct labor, materials [merchant services moved to OpEx]

Operating Expenses include:
  FY2024: Merchant services ($96,000) [was in COGS in FY2022 and FY2023]

Gross Margin:
  FY2022: 41.0%   FY2023: 40.5%   FY2024: 43.2% (elevated due to reclassification)
```

**Pass Criteria:**
- [ ] DATA FLAGS section explicitly identifies merchant services as a line item that shifted from COGS to operating expenses between FY2023 and FY2024
- [ ] The flag notes that the FY2024 gross margin figure is not comparable to prior years on a consistent basis
- [ ] The flag recommends Nancy review the reclassification before using the gross margin trend in analysis
- [ ] The agent does NOT simply report the gross margin improvement as a positive trend without caveat
- [ ] The observation on gross margin, if written, references the reclassification and qualifies the FY2024 figure
- [ ] No fabricated "adjusted" gross margin figures appear in the output

---

## TEST 7 — Tone Check

**Purpose:** Verify that any output produced by the agent reads like a fractional CFO wrote it, not like a spreadsheet printout.

**How to run:** Apply this checklist to the output from any of Tests 1–6. It may also be applied to any agent output independently.

**Pass Criteria:**

*Structure:*
- [ ] All observations are written in full sentences — no bullet points, no dashes used as sentence substitutes
- [ ] Each observation is a cohesive paragraph, not a list of data points
- [ ] No numbered sub-points appear within an observation

*Numbers:*
- [ ] Every dollar figure is paired with a percentage, or the observation explains why one form is more relevant
- [ ] Numbers are rounded and readable ($900,000 not $897,432.18; "nearly $1.1 million" not $1,097,881)
- [ ] Approximation language is used appropriately: "approximately," "nearly," "almost," "just over"

*Comparative language:*
- [ ] At least one of the following phrases appears in each observation: "versus the prior year," "compared to," "relative to," "year over year," "from [Year X] to [Year Y]"
- [ ] No observation states a single data point without comparing it to another period or context

*Plain-language conclusions:*
- [ ] At least one observation contains a sentence that explains what the number means for the business, not just what the number is
- [ ] Examples of compliant conclusion language: "which means the business is keeping more of every dollar it earns," "this trajectory will be important context in Nancy's analysis," "a buyer will want to understand whether this cost structure is sustainable"

*Prohibited language (none of these should appear):*
- [ ] No "it appears that" or "it seems that"
- [ ] No "it may be the case that" or "it could be suggested that"
- [ ] No passive constructions as the primary voice (e.g., "it was noted that revenue increased")
- [ ] No academic hedges ("it is therefore evident," "one might conclude")
- [ ] No valuation language (multiple, enterprise value, estimated sale price)
- [ ] No audit recommendation

---

## QA LOG

Use this table to record test results each time the checklist is run.

| Test | Date Run | Run By | Result | Notes |
|---|---|---|---|---|
| Test 1 — Clean 3-year | | | | |
| Test 2 — Revenue decline | | | | |
| Test 3 — Large add-back | | | | |
| Test 4 — 13-month period | | | | |
| Test 5 — Missing category | | | | |
| Test 6 — Category shift | | | | |
| Test 7 — Tone check | | | | |
