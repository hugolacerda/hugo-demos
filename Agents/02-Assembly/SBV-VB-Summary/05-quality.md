# SBV Value Builder Summary Agent — Quality Checklist
**Version:** 1.0 | June 2026

Run this checklist before saving any output. Every gate must pass. If a gate fails, fix the output and re-check before saving. Do not deliver output that fails a gate.

---

## Gate 1 — Security

- [ ] Client name is present in the output header (format: VALUE BUILDER SUMMARY — [Client Name] — [Date])
- [ ] No reference to external data not present in the source PDF
- [ ] No valuation figures referenced in the output — no SDE amounts, no estimate of value range, no multiples applied to earnings

**If any item fails:** Remove the offending content, replace with compliant language, and re-check Gate 1 before proceeding.

---

## Gate 2 — Selection Logic

- [ ] Exactly 3 priority observations are present in the output — not 2, not 4
- [ ] The selection logic was documented internally before writing began (driver ranking across all four criteria: gap magnitude, leverage, specificity, actionability)
- [ ] All 8 drivers are accounted for in the output: 3 in Priority Observations, 5 in Remaining Drivers. Count them. If the math does not add to 8, something is missing or doubled.
- [ ] No driver appears in both Priority Observations and Remaining Drivers

**If any item fails:** Audit the driver count, verify the ranking, and correct before proceeding.

---

## Gate 3 — Specificity

- [ ] Each priority observation contains at least one detail specific to this business drawn from the source PDF: a score, an industry average, a gauge answer, a stated percentage, or commentary from a specific driver section
- [ ] Each observation can pass the copy-paste test: if you removed the client name and context and tried to paste this observation onto a different client's report, would it still make sense? If yes, it is too generic — rewrite it.
- [ ] Each Recommended Action is tied to what the report actually says about this specific business. It does not restate generic Value Builder guidance (e.g., "consider adding a subscription model" with no reference to this business's specific situation is a failure).
- [ ] No fabricated details: every figure and every claim in the output appears in the source PDF. If a specific detail was assumed or inferred beyond what the PDF states, it is flagged rather than stated as fact.

**If any item fails:** Identify which observation is too generic or contains a fabricated detail, rewrite using only what the report provides, and re-check Gate 3.

---

## Gate 4 — Voice

- [ ] No bullet points appear inside any priority observation. The observation text is written in full sentences only.
- [ ] No hedge phrases appear in any observation: "it appears," "it seems," "may have," "could suggest," "might indicate." Every statement is declarative.
- [ ] No passive constructions used as main clauses: "It was noted that…" or "It can be seen that…" are failures.
- [ ] The Analyst Note is written in full sentences, declarative, and reads as if Nancy wrote it. It is not a summary of what the agent did or a list of the three selected drivers.
- [ ] Each Recommended Action is written in the imperative and is specific: it tells the owner what to do, not what to consider.
- [ ] No academic phrasing: "It is therefore evident that," "As demonstrated above," and similar constructions do not appear.

**If any item fails:** Rewrite the offending sentence(s) in declarative, active, specific language. Re-check Gate 4.

---

## Gate 5 — Format

- [ ] Output is a single branded **HTML** file using the SBV palette (Playfair Display headings, Libre Franklin body, midnight `#0E1F3D`, ivory `#F5F0E8`, ember `#C4553A`), consistent with the other SBV agent outputs
- [ ] The header banner carries the client name, engagement tier, and date (content equivalent to `VALUE BUILDER SUMMARY — [Client Name] — [Date]`)
- [ ] Engagement Tier is present in the header (value: one of the four tiers, or "Not specified in source document")
- [ ] Each Priority Observation contains: driver name, short title, score line (Score: X/100 | Industry Average: Y/100), 2–3 sentences of body text, and a Recommended Action line
- [ ] The REMAINING DRIVERS section is present and contains exactly 5 entries — one per non-priority driver
- [ ] The ANALYST NOTE section is present and contains one paragraph
- [ ] The SBV disclaimer is present at the bottom: "Prepared by Strategic Business Valuations. For internal review only. Not for client distribution without Nancy Hallett CVA sign-off."
- [ ] No section is missing. Count: header → engagement tier → 3 priority observations → remaining drivers (5 entries) → analyst note → disclaimer. All present.

**If any item fails:** Add the missing section or correct the format before saving. Re-check Gate 5.

---

## Gate 6 — Output Saved Correctly

- [ ] Output file is saved to the `outputs/` subfolder within the agent package folder (`02-Assembly/SBV-VB-Summary/outputs/`)
- [ ] Filename follows the convention: `vb-summary-[client-name]-[YYYY-MM-DD].html`
- [ ] Agent registry has been updated: the Last Live Test date for the Value Builder Summary Agent row in `/Agents/00-chief-of-staff/agent-registry.md` reflects today's date
- [ ] Any assumptions made during the run, any unclear elements in the source document, and any missing context (e.g., engagement tier not provided) are reported to the user after the output is saved

**If the registry update was not completed:** Complete it before closing the run. This is a standing rule from the Chief-of-Staff file.

---

## Summary — Gate Failure Reference

| Gate | What It Checks | Common Failure Mode |
|------|---------------|---------------------|
| 1 — Security | No external data referenced, no valuation figures | Referencing SDE or value-range figures from the PDF |
| 2 — Selection Logic | Exactly 3 priority observations, all 8 drivers accounted for | Selecting 4 or forgetting a remaining driver |
| 3 — Specificity | Each observation is business-specific, recommendations are tied to the report | Generic recommendations not anchored to this client's scores or answers |
| 4 — Voice | Declarative, active, no hedges, no bullets inside observations | Hedge phrases, passive voice, or Analyst Note written as a bullet list |
| 5 — Format | Exact output format from 01-start-here.md | Missing engagement tier line, missing Analyst Note, misformatted score header |
| 6 — Output Saved | File in correct location, filename correct, registry updated | Saved to root folder instead of outputs/, registry not updated |
