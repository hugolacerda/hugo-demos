# Earnings and Value — Input Sheet
**Complete every required field before running the agent. The notes field is optional.**
The agent applies exactly what is entered here. It does not choose the metric, the weights, or the multiple.

---

## Client and Engagement (required)

- **Client name:** [e.g., Fenetex Corporation]
- **Engagement tier:** [Express / Explore / Accelerate / Certified]
- **Valuation date:** [YYYY-MM-DD]

## Metric (required)

- **Metric to use:** [SDE or EBITDA]
  - Use SDE for owner-operator / Main Street businesses (almost always Express and Explore).
  - Use EBITDA for larger, financial-buyer businesses (typically Certified).

## Years and Weights (required — weights must sum to exactly 100%)

List each year to include and its weight. Add or remove rows as needed. Most Express/Explore engagements use three years; a complex certified engagement may use more.

| Year (label) | Weight (%) |
|--------------|-----------:|
| [e.g., TTM Oct 2025] | [e.g., 30] |
| [e.g., 2024] | [e.g., 30] |
| [e.g., 2023] | [e.g., 20] |
| [e.g., 2022] | [e.g., 10] |
| [e.g., 2021] | [e.g., 10] |
| [e.g., 2020] | [e.g., 0] |
| **Total** | **must equal 100** |

> The earnings figures themselves are not entered here — the agent reads them from the Agent 01 output (`multi-year-comparison.xlsx` / `summary.xlsx`) for the years and metric named above.

## Multiples (required — from DealStats / IBBA Market Pulse, set by Nancy)

- **Low multiple:** [e.g., 4.8]
- **Mid multiple:** [e.g., 5.1]
- **High multiple:** [e.g., 5.4]

> For a single selected-percentile multiple (as in the Fenetex certified case), enter the same value for low, mid, and high, or note the selected percentile in the notes field. Low ≤ Mid ≤ High.

## Notes — Weighting Rationale (optional; appears in the output if provided)

[Free text. Explain the weighting rationale and, if desired, state how many comparable transactions were reviewed and the percentile selected. Example: "Six-year weighting used to balance strong TTM growth against full-year history; 5.4× selected at the 75th percentile from 22 DealStats comparables because the business is outperforming industry benchmarks."]
