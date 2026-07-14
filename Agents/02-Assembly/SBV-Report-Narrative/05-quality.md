# SBV Report Narrative Writer Agent — Quality Checklist
**Version:** 1.0 | June 2026

Run the pre-run gates before writing, and the post-writing checks before saving. Every gate and check must pass. If one fails, fix it, or stop and escalate — do not save a draft you cannot verify. The agent assembles and paraphrases upstream content; it never originates figures, approaches, multiples, or weightings.

---

## Pre-Run Gates (check before writing any narrative)

- [ ] **All required input files are present:** `multi-year-comparison.xlsx` and/or `summary.xlsx` (Agent 01), `observations-[client-name]-[date].html` (Agent 02), `earnings-value-[client-name]-[date].html` (Agent 07), and `client-context.md`.
- [ ] **Engagement tier is specified** in `client-context.md` (Express / Explore / Accelerate / Certified). This selects the variant.
- [ ] **Client name is present** in `client-context.md`.
- [ ] **Agent 07 output contains a Range of Value figure.** If it does not, **stop** — the report cannot be completed without the value conclusion.
- [ ] **The valuation date is present** in `client-context.md`.

If any pre-run gate fails, stop and report exactly what is missing. Do not write a partial report.

---

## Post-Writing Checks (verify before saving)

- [ ] **Every financial figure in the report can be traced to an input file** — flag any figure that cannot be sourced to Agent 01, 02, or 07.
- [ ] **The value conclusion in the transmittal letter matches the Range of Value in the body** (and both match Agent 07's output).
- [ ] **The standard of value definition is present and verbatim** (IRS Revenue Ruling 59-60, per `04-context.md`).
- [ ] **Assumptions and limiting conditions are present and complete for the tier** — 14 for Certified, 11 for Express/Explore — reproduced in full, not abbreviated.
- [ ] **For Certified:** the Analyst's Representation section is present with Nancy's name, credentials, signature line, and date line.
- [ ] **The DRAFT disclaimer banner appears at the top and bottom.**
- [ ] **A table of contents is present.**
- [ ] **No financial figures were recalculated by the agent** — all figures are sourced from input files (the weighted earnings table is copied from Agent 07, not recomputed).

---

## Guardrails

- **Never invent financial figures.** Every number traces to Agent 01, 02, or 07.
- **Never select a valuation approach, multiple, or weighting.** These come from Agent 07 and `client-context.md`.
- **Never omit or abbreviate the assumptions and limiting conditions.**
- **Never use passive voice in narrative sections.**
- **Never use "enterprise value"** — use "fair market value" or "Range of Value."
- **Never use "conclusion of value" in the body text** — use "opinion of value."
- **Never use the word "calculate" when describing the conclusion** — use "estimate" or "opinion of value."
- **Never remove the DRAFT disclaimer.**
- **Never transmit output externally.**

---

## Escalate to Hugo If

- **The Agent 01, 02, or 07 input files are missing or unreadable** (or are in an unexpected format the agent cannot parse). Do not guess at the contents — escalate.
- **The Range of Value in Agent 07's output is missing or appears to be zero.** Do not write a conclusion around a missing or zero value.
- **The engagement tier is Certified but Agent 07 did not include an income approach section and `client-context.md` does not address this** — flag for Nancy to decide whether an income approach is required for this engagement, rather than producing the certified report without it.

In any of these cases, write a clear description of the problem, do not save a final output, and bring it to Hugo before continuing.
