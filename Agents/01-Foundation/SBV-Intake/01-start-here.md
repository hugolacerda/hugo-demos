# SBV Intake Agent (Agent 00) — Start Here

## What This Agent Does

This is the **Security and Intake Agent**. It runs **once per engagement, before any
other agent**. It accepts engagement details from the operator, creates an isolated
folder structure for that engagement, and produces **`project-setup.md`** — the file
every downstream agent reads first to know where to find its inputs and where to write
its outputs.

The real client name exists **only** in `project-setup.md`. Every downstream agent works
from the **codename** only.

This agent creates structure and writes one file. It produces no financial analysis, no
narrative, and no valuation of any kind.

---

## Inputs (all provided by the operator — never inferred)

| Input | Provided by | Notes |
|---|---|---|
| Real client name and business name | Operator | Lives only in `project-setup.md`, labeled internal reference. |
| **Project codename** | **Gary** | Gary assigns this. The agent never invents one. |
| **Engagement tier** | Operator | Express, Explore, Accelerate, or Certified. |
| **Earnings basis** | Operator | SDE or EBITDA. |
| Valuation date | Operator | The as-of date for the engagement. |
| Standing context | Operator | Anything SBV already knows about this client that downstream agents should not rediscover or misread. |

**Hard stop.** If any of the first four — client/business name, codename, tier, or
earnings basis — is missing, the agent **stops and requests it**. It does not proceed
without all four. It never invents a codename.

---

## What It Creates

A single isolated engagement folder at `/Agents/Engagements/[codename]/`, where
`[codename]` is the project codename **lowercased with spaces replaced by hyphens**.

> Example: `The Price Is Right` → `the-price-is-right`

```
/Agents/Engagements/[slug]/
  project-setup.md        ← created by this agent, read by all others
  inputs/                 ← operator places raw source files here
  01-recast/              ← Agent 01 writes here
  02-observations/        ← Agent 02 reads from 01-recast/, writes here
  07-earnings/            ← Agent 07 reads from 01-recast/, writes here
  05-vb-summary/          ← Agent 05 reads from inputs/, writes here
  03-narrative/           ← Agent 03 reads all upstream stages, writes here
```

Deliverables live **inside the engagement folder**. Agent 00 also creates the project's
deliverable folder there — nested in the engagement, named `Deliverables`, with `HTML/`
and `PDF/` subfolders:

```
/Agents/Engagements/[slug]/Deliverables/
  HTML/                   ← Agent 03 copies the final report HTML (+ supporting HTML) here
  PDF/                    ← Agent 03 copies the final report PDF here
```

Every empty folder gets a `.gitkeep` so it is tracked.

The engagement folder eliminates file copying between agents: each agent reads from and
writes to its own stage folder inside the engagement, and the next agent reads directly
from the prior stage. `project-setup.md` records the exact paths.

---

## How to Run the Agent

Open CoWork, navigate to this folder, provide the engagement details, and run:

```
Use the SBV Intake Agent to set up a new engagement.

Client name: [real client name]
Business name: [real business name]
Codename: [Gary's assigned codename]
Tier: [Express | Explore | Accelerate | Certified]
Earnings basis: [SDE | EBITDA]
Valuation date: [YYYY-MM-DD]
Standing context: [anything SBV already knows about this client]
```

If the codename, tier, earnings basis, or client/business name is missing, the agent
stops and asks for it before creating anything.

---

## What You Get Back

After creating the folder and `project-setup.md`, the agent prints a confirmation with:

- The engagement root path (`/Agents/Engagements/[codename]/`).
- A reminder to place raw source files in the `inputs/` folder before running Agent 01.
- The codename to use when starting each downstream agent session.

See `02-golden-example.md` for a fully worked `project-setup.md`, `03-process.md` for the
step sequence, and `05-quality.md` for the guardrails.

---

## Questions or Problems

If a required input is missing and you are not sure how to fill it, contact Gary (for the
codename) or Nancy (for tier, basis, valuation date). Do not let the agent proceed with a
guessed value.
