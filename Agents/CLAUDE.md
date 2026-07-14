# SBV Agent Fleet — Operating System (CLAUDE.md)
*Entry point for any CoWork/Claude session working in this folder.*
*Last updated: 2026-06-24 (post GLS report analysis). Maintained by Hugo Lacerda.*

> **Read this first.** This file orients a fresh session to the whole fleet. For the
> standing rules every agent obeys, see `00-chief-of-staff/chief-of-staff.md`. For the
> live status of each agent, see `00-chief-of-staff/agent-registry.md`. For exactly what
> each agent passes to the next, see `00-chief-of-staff/handoff-spec.md`.

---

## What this is

An agentic team that performs the mechanical and analytical work of an SBV business
valuation so **Nancy Hallett (CVA)** reviews, edits, approves, and signs — instead of
writing from scratch. Agents normalize financials, write observations, summarize the
Value Builder assessment, compute the weighted earnings and range of value, and assemble
the narrative report. **AI produces the draft; Nancy's name goes on the deliverable.**

Built on Katie Milton Jordan's five-file methodology. Each agent produces exactly **one
deliverable (a noun)**. If it looks like a process, it is more than one agent.

---

## Current status snapshot (2026-06-24)

Q2 goal met — five CoWork agents built. A sixth (Agent 00 Intake) and a chief-of-staff
orchestration layer were added June 18. A full end-to-end engagement ("The Price Is
Right" / Trivia Nation) ran June 18–19. On June 24 Nancy's sample reports were analyzed
across all four tiers for the first time; the **GLS report** was identified as the Explore
golden example and four pipeline gaps were surfaced (see "Known gaps" below).

| Agent | Deliverable | Status |
|---|---|---|
| 00 — Intake | `project-setup.md` + isolated engagement folder | Built (v2.2). Not yet live-run |
| 01 — Recast Worksheet | Normalized recast (SDE/EBITDA), 3-sheet Excel + HTML | Built, Gary-validated |
| 02 — Observations | Financial observations memo (HTML) | Built; **format in rework** (see gaps) |
| 07 — Earnings & Value | Weighted earnings + range of value (HTML) | Built; live-run June 19; **DCF expansion pending** |
| 05 — Value Builder Summary | Value-driver summary (HTML) | Built; rework pending (3-vs-8 drivers) |
| 03 — Report Narrative Writer | Full report draft (HTML + PDF) | Built; **golden example being re-based to Explore/GLS** |
| 04 — Financial Table Builder | — | **Retired** (tables now HTML inside Agent 03) |
| Growth Forecast | 5-scenario projection | Planned — blocked on Gary's spreadsheet |
| 06 — Forecasting (Accelerate) | Forward pro forma P&L | Backlog Q3 |
| 08 — Scenario Planner | Combined two-lever scenario plan | Backlog Q3 |

---

## The four tiers (same intake, different output depth)

| Tier | Product name | Price | Pipeline scope | NACVA |
|---|---|---|---|---|
| Express | Value Snapshot | $2,500 | 01, 02, 05, 07 (+ Agent 03 Express variant, target state) | No |
| **Explore** | Value Market & Insight | $4,000 | **Full pipeline incl. Agent 03 — primary build target. Golden example: GLS.** | No |
| Accelerate | Value Growth Strategy | $5,500 | Full pipeline + Agent 06 | No |
| Certified | NACVA Compliant | $7,500 | **Out of scope per Gary (June 23).** Fenetex is the reference structure only | Yes |

Express and Explore are the core valuation products. Certified is explicitly **not** an
agent build target — Nancy's CVA signature is the point of that tier.

---

## Folder spine (as on disk)

```
/Agents/
  CLAUDE.md                ← you are here (fleet entry point)
  00-chief-of-staff/       ← standing rules, agent registry, handoff spec
  01-Foundation/           ← Agent 00 (SBV-Intake), Agent 01 (Recast), Agent 02 (Observations)
  02-Assembly/             ← Agent 07 (Earnings & Value), Agent 05 (VB Summary), Agent 03 (Report Narrative)
  03-Orchestration/        ← reserved for pipeline-wiring agents (currently empty)
  Engagements/             ← one isolated folder per client engagement (see below)
  ExampleDocuments/        ← shared golden-example SOURCE documents (Fenetex, GLS, VB samples, Vertical IQ, etc.)
  Bootcamp/                ← Katie Milton Jordan training + reference packages
  _session-logs/           ← analysis notes, audit reports, pipeline test logs
  sbv-agent-roadmap*.html  ← visual roadmap (v3.1 current; v3.2 to follow)
```

> Note: `01-Foundation` and `02-Assembly` group agents by pipeline phase, not by number.
> Agent 00 lives in `01-Foundation/SBV-Intake`; Agent 07 lives in `02-Assembly`. The
> `chief-of-staff.md` folder-spine description that placed Agents 06/07 in
> `03-Orchestration` is aspirational — `03-Orchestration` is currently empty.

---

## How an engagement runs (engagement-folder architecture)

Since June 18 there is **no file copying between agents**. Agent 00 creates one isolated
folder per engagement and every other agent reads/writes stage folders inside it, resolved
from `project-setup.md`.

```
Agent 00 (Intake) → Agent 01 → Agent 02 → [Growth Forecast] → Agent 07 → Agent 05 → Agent 03 → Nancy review → Deliverables/
```

```
/Agents/Engagements/[slug]/        (slug = codename, lowercased, spaces→hyphens)
  project-setup.md                 ← single source of truth; every agent reads this first
  inputs/                          ← operator drops raw source files (Agents 01 and 05 read here)
  01-recast/        02-observations/      07-earnings/
  05-vb-summary/    03-narrative/
  Deliverables/HTML/   Deliverables/PDF/  ← Agent 03 drops the full package here (terminal point)
```

To start a new engagement: run **Agent 00** with the client/business name, Gary's
**codename**, tier, earnings basis (SDE/EBITDA), and valuation date. Then run agents in
sequence, each invoked with the codename. Every downstream agent has a **Step 0 — Locate
the Engagement** that reads `project-setup.md` and resolves its stage paths.

---

## Standing rules (the short version — full text in chief-of-staff.md)

- **One deliverable per agent.** A noun, not a process.
- **No agent produces a valuation, selects a multiple, a weighting, or an earnings basis.**
  Those are Nancy's judgment, supplied on her input sheet. Agents apply, never choose.
- **Never invent a financial figure.** Missing data point → flag and stop.
- **Never blend financial-statement figures with tax-return figures** in the same year.
  Use one source per year and state which.
- **Never annualize a partial period.** Label it (e.g. "Jan–Sep 2024 — 9 months") and continue.
- **Interest, Depreciation, Amortization are always added back when present; their absence
  is never flagged.**
- **Use "estimate of value"** — never "most probable sale price," "enterprise value," or
  (outside Certified) "conclusion of value."
- **Plain, common-people language** in Express/Explore — no appraisal boilerplate.
  Margin is a percentage; gross profit is dollars; never interchanged. Value vs. price is
  always stated.
- **Codename only** in every output filename and document header. The real client name
  lives only in `project-setup.md`, labeled internal-reference-only.
- **Nothing leaves the machine** until a human reviews `qa-notes`. AI is a draft.
- **Every HTML deliverable also saves a PDF.**
- After any change, update the file's "Last updated" line and `agent-registry.md`.

---

## Five-file structure + naming convention

Every agent folder is a five-file package. The **canonical** names are:

```
01-start-here.md      02-golden-examples/    03-process.md
04-context.md         05-quality.md
input-templates/      inputs/    outputs/     (as needed)
```

**Known naming deviations to normalize at next rebuild (do not churn working agents now):**
- `SBV-Observations/04-guardrails.md` → should be `04-context.md` (and the `04_guardrails.md`
  reference inside its `01-start-here.md` corrected). Observations is in format rework, so
  fold this into that rebuild.
- `02-golden-examples` is a **folder** in Recast / Earnings-Value / Report-Narrative but a
  **file** (`02-golden-examples.md`) in Observations and VB-Summary, and singular
  (`02-golden-example.md`) in Intake. Standardize on the **folder** form when each is next touched.

---

## Golden examples index (source docs live in `ExampleDocuments/`)

| Agent | Calibrates against | Source file | Notes |
|---|---|---|---|
| 01 Recast | Utility contractor; P100 retired | — | P100 used annualized data (now forbidden) — retired as calibration |
| 02 Observations | Pending Gary's bullet-format example | — | Do not rebuild format until Gary delivers it |
| 07 Earnings & Value | Fenetex (Certified, EBITDA, Market-only); Trivia Nation (SDE) | `Final Dec 2025 Fenetex Conclusion_of_Value_Report.pdf` | Add GLS as DCF golden example if Agent 07 expands |
| 05 VB Summary | Jason Horowitz VB report | `Value Builder Score Report ... Jason Horowitz.pdf` | — |
| 03 Report Narrative | **Re-basing to GLS (Explore)** | `GLS Valuation.pdf` / `.docx` | **Pending Nancy clearance** to use as calibration case. Fenetex kept as Certified reference only |

Also in `ExampleDocuments/` for the entertainment / Trivia Nation engagement: BBF
Entertainment + BRG Arts & Entertainment (market-multiple comps) and two Vertical IQ
Performing Arts files (industry benchmark / common-size source).

---

## Known gaps (surfaced by the June 24 GLS analysis)

1. **Executive Summary** — first page of an Explore report; no agent produced it. → Add to Agent 03 as the final assembly step.
2. **Recommendations** — GLS has a full section (5 items, 3–4 action bullets each, mapped to the observations). No agent owns it. → Decision pending (Agent 02 extension vs. Agent 03 section).
3. **Common Size / Industry Benchmark** — mechanical table of line items as % vs. an Industry column (sourced from Vertical IQ). No agent owns it. → Add to Agent 01 or a lightweight step.
4. **Agent 07 DCF + dual basis** — GLS runs DCF on Adjusted EBITDA **and** Market on Adjusted SDE in one engagement, reconciled 50/50. Agent 07 currently does Market only. → Expand (golden example = GLS DCF table) once Nancy confirms DCF is routine in Explore.

---

## Open questions gating work (need Gary / Nancy)

1. **Express delivery** — replace the Value Builder platform report entirely, or supplement it with SBV-branded pages?
2. **GLS clearance** — is Nancy comfortable using GLS as Agent 03's Explore calibration case?
3. **Observations format** — prose (Nancy's GLS style) vs. bullets (Gary's June 16 direction). Proposed resolution: Agent 02 emits bullets; Agent 03 reflows to prose for the assembled report.
4. **Recommendations owner** — which agent writes it?
5. **Agent 07 DCF scope** — is DCF used regularly in Explore?

---

## Related knowledge base (Obsidian)

`Garry AI Project - MecLabs/Project Knowledge Base/` — KB_01 (company overview), KB_03
(current projects), KB_11 (agent development process), KB_13 (valuation methodology),
`02_agent_roadmap.md`, `sbv-identity-context-insertntitled.md` (Agent 03 voice rules).
These predate the June 18 architecture and June 24 GLS analysis in places — treat this
file and the chief-of-staff layer as the current source of truth for fleet state.
