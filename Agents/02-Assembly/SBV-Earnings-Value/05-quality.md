# SBV Earnings and Value Agent — Quality Checklist
**Version:** 1.0 | June 2026

Run the pre-run gates before producing any output, and the post-calculation checks before saving. Every gate and check must pass. If one fails, fix it or stop and report — do not save a result you cannot verify. The agent applies only the weighting and multiples it was given; it never selects either.

---

## Pre-Run Gates (check before producing any output)

- [ ] **Weights sum to exactly 100%.** Add the weight for every listed year. If the total is anything other than 100%, **stop and report the discrepancy** (state the total found).
- [ ] **All specified years have earnings figures in the Agent 01 output.** For the chosen metric (SDE or EBITDA), confirm a populated figure exists for every year on the input sheet. If a year is missing, **stop and report which year**.
- [ ] **Multiples are ordered correctly:** low ≤ mid ≤ high. If a multiple is out of order, **flag it as a likely input error** before proceeding.
- [ ] **Client name and engagement tier are present** on the input sheet. If either is missing, **stop**.

If any pre-run gate fails, the agent does not calculate a partial result. It names the specific problem and waits for a corrected input sheet.

---

## Post-Calculation Checks (verify before saving)

- [ ] **Weighted earnings reconciles.** Re-add all weighted contributions independently and confirm the sum equals the stated Weighted Earnings figure (tolerance: rounding to the nearest dollar).
- [ ] **Range of value reconciles.** Re-multiply the Weighted Earnings figure by each multiple and confirm the Range of Value figures in the output match.
- [ ] **No external system was accessed** during the run.
- [ ] **No multiple appears that was not on the input sheet.** Every multiple in the output traces to a value Nancy entered.
- [ ] **Disclaimer is present** in the output.

---

## Guardrails — What This Agent Must Never Do

- **Never select or suggest a multiple.** The agent applies only the multiples provided on the input sheet.
- **Never select or adjust weighting.** The agent applies only the weights provided on the input sheet.
- **Never produce a conclusion of value or an enterprise value.** The agent produces a **Range of Value** only. The words "enterprise value" and "conclusion of value" must not appear in the output.
- **Never transmit output externally.** All files stay in the local `outputs/` folder until Nancy reviews them.
- **Never access DealStats, IBBA, or any external system.** The agent reads only the input sheet and the Agent 01 files provided in this session.
- **Never round earnings figures before the final step.** Carry full precision through every multiplication and through the sum; round only the figures displayed in the final output.

---

## Escalate to Hugo If

- **The Agent 01 output files cannot be read or are in an unexpected format** (for example, the expected metric column or year is not where the agent expects it). Do not guess at the layout — escalate.
- **The weighted earnings calculation produces a result that differs materially from what Nancy would expect** based on the input figures (for example, a Weighted Earnings figure that falls outside the range of the individual yearly figures, which is mathematically impossible for a valid weighting). Flag it; do not proceed silently.

In either case, write a clear description of the problem, do not save a final output, and bring it to Hugo before continuing.
