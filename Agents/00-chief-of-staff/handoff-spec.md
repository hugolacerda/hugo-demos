# Agent Handoff Specification
Last updated: 2026-06-18

## Purpose
Defines exactly what each agent passes to the next agent in the pipeline. This locks the output contract between agents. If an output filename changes, update this spec and the downstream agent's 01-start-here.md simultaneously.

## Pipeline Sequence
Agent 00 → Agent 01 → Agent 02 → Growth Forecast → Agent 07 → Agent 05 → Agent 03 → Nancy review → Client → Deliverables folder (`/Agents/Engagements/[slug]/Deliverables/`)

The Deliverables folder is the terminal point of the pipeline: Agent 03 drops the completed report and all supporting upstream files there so Nancy and Gary have the full engagement package in one place. Deliverables live **inside the engagement folder** — `/Agents/Engagements/[slug]/Deliverables/`, split into `HTML/` and `PDF/` subfolders. Agent 00 creates this nested deliverable folder at intake, in Step 4, alongside the other stage folders.

> **Read the "Engagement-Folder Architecture" section below first.** It defines the current handoff model: each engagement has one isolated folder, agents read/write stage folders inside it per `project-setup.md`, and there is no file copying between agents. The per-agent sections that follow describe the *file contracts* (which files each agent produces and consumes); their read-from/write-to *locations* are now the engagement stage folders, superseding the older `inputs/` and `outputs/` references in those sections.

---

## Agent 00 → All Agents (Intake to everyone)
Agent 00 runs first, before any other agent, on every new engagement. It is the security and intake gate. It produces no analysis — its only outputs are `project-setup.md` and the isolated per-engagement folder structure. Every downstream agent reads `project-setup.md` before doing anything else.

Output file: **`project-setup.md`** — the single source of truth for the engagement.

Location: `/Agents/Engagements/[slug]/project-setup.md`, where `[slug]` is the codename lowercased with spaces replaced by hyphens (`The Price Is Right` → `the-price-is-right`).

What it contains (any downstream agent can read it in under 30 seconds):
- **Codename** — the project identifier Gary assigned. Used in every downstream output filename.
- **Legal name** — the real client and business name, labeled "internal reference only — do not use in outputs." This is the **only** place the real name appears anywhere in the pipeline. It never appears in a filename or any agent output.
- **Engagement parameters** — engagement tier (Express / Explore / Accelerate / Certified), earnings basis (SDE or EBITDA), valuation date, date created, status (Active).
- **Standing context** — what SBV already knows about this client (accounting styles, known one-time events, owner context) so downstream agents do not rediscover or misread it.
- **Engagement root** — `/Agents/Engagements/[slug]/`.
- **Stage paths** — the most important section: the exact folder each agent reads from and writes to.

The engagement folder is the isolated home for all of this engagement's work:

```
/Agents/Engagements/[slug]/
  project-setup.md
  inputs/            ← operator drops raw source files; Agents 01 and 05 read here
  01-recast/         ← Agent 01 writes
  02-observations/   ← Agent 02 writes (reads 01-recast/)
  07-earnings/       ← Agent 07 writes (reads 01-recast/)
  05-vb-summary/     ← Agent 05 writes (reads inputs/)
  03-narrative/      ← Agent 03 writes (reads all upstream stages)
```

Deliverables live **inside the engagement folder**, in a `Deliverables` folder split into
`HTML/` and `PDF/` subfolders. Agent 00 creates this at intake (Step 4) alongside the
other stage folders:

```
/Agents/Engagements/[slug]/Deliverables/
  HTML/    ← Agent 03 copies the final report HTML (+ supporting upstream HTML) here
  PDF/     ← Agent 03 copies the final report PDF here
```

Hard stops: Agent 00 stops and requests the missing item if the codename, engagement tier, earnings basis, or client/business name is not provided. It never invents a codename.

---

## Agent 01 → Agent 02 (Recast to Observations)
Agent 02 reads from Agent 01's outputs/ folder.

Required files:
- multi-year-comparison.xlsx — the primary input. All years side by side with dollar amounts and percentage of revenue sub-columns. Must be present.
- qa-notes.html — optional but preferred. Agent 02 reads all flagged items and carries them into its own DATA FLAGS section.

Optional files:
- Individual recast-[year].xlsx files — reference for add-backs detail.

QA clearance signal: Agent 02 checks qa-notes.html for any CRITICAL flags before running. If a critical flag is present (add-back exceeds reported expense, missing revenue section), Agent 02 stops and reports. A REVIEW NEEDED flag does not stop Agent 02.

Filename format Agent 01 must produce:
- multi-year-comparison.xlsx (fixed name — Agent 02 looks for this exact name)
- qa-notes.html (fixed name)

---

## Agent 01 → Growth Forecast
The Growth Forecast reads two values from Agent 01's multi-year summary:
- The base year margin (most recent full year's gross profit divided by revenue)
- The base year operating expenses (total operating expenses for the most recent full year)

These values are read programmatically from summary.xlsx. The Growth Forecast uses them as fixed inputs; it does not recalculate them.

---

## Agent 01 + Agent 02 → Agent 07 (Recast + Observations to Earnings and Value)
Agent 07 reads from Agent 01's outputs/ folder only. It does not read Agent 02's output.

Required files:
- multi-year-comparison.xlsx and/or summary.xlsx from Agent 01
- A completed Nancy input sheet from input-templates/earnings-value-inputs.md

The Nancy input sheet specifies: metric (SDE or EBITDA), years and weights, low/mid/high multiples, client name, engagement tier.

Agent 07 does not consume Agent 02's observations — those go directly to Agent 03.

---

## Agents 01, 02, 05, 07 → Agent 03 (All upstream to Report Narrative)
Agent 03 reads from all upstream agents' outputs/ folders. All files must be placed in Agent 03's own inputs/ folder before running.

Required:
- multi-year-comparison.xlsx and summary.xlsx (from Agent 01)
- observations-[client-name]-[date].html (from Agent 02) — exact filename pattern required
- earnings-value-[client-name]-[date].html (from Agent 07) — exact filename pattern required
- client-context.md (completed template from Agent 03's input-templates/)

Optional but strongly recommended:
- vb-summary-[client-name]-[date].html (from Agent 05)
- qa-notes.html (from Agent 01)

Agent 03 validates all required files are present before writing a single word. If any required file is missing it stops and reports exactly what is missing.

---

## Agent 05 (Value Builder Summary) — standalone
Agent 05 does not depend on any other CoWork agent. It reads the Value Builder Assessment PDF directly. Its output feeds Agent 03 as one of the optional-but-recommended inputs.

Required input:
- [client-name]-vb-assessment.pdf in Agent 05's inputs/ folder

Output filename: vb-summary-[client-name]-[YYYY-MM-DD].html

---

## Filename Conventions (all agents)
All output files follow this pattern: [agent-shortname]-[codename]-[YYYY-MM-DD].html and the same with .pdf

Agent 00 is now built, so filenames use the **project codename** assigned by Gary — not the real client name. The real client name appears only in the `project-setup.md` header and never in any filename. The codename for an engagement is read from `/Agents/Engagements/[codename]/project-setup.md`.

(Legacy outputs produced before Agent 00 was built use the actual client name in the filename; new engagements use the codename.)

---

## Engagement-Folder Architecture — No File Copying
Agent 00 now leads the pipeline, and the handoff model has changed. Each engagement gets one isolated folder at `/Agents/Engagements/[slug]/` containing a fixed stage folder for every agent. Each agent reads directly from the prior stage folder and writes to its own stage folder, all inside the engagement. **There is no file copying between agents** — the engagement folder eliminates the need. The previous model, where each agent copied its outputs into the next agent's `inputs/` folder, is superseded.

How the handoffs work under this model:

- Every agent reads `project-setup.md` first to learn its read-from and write-to stage paths.
- **Agent 01 (Recast)** reads `inputs/`, writes `01-recast/`.
- **Agent 02 (Observations)** reads `01-recast/`, writes `02-observations/`.
- **Agent 07 (Earnings and Value)** reads `01-recast/`, writes `07-earnings/`.
- **Agent 05 (VB Summary)** reads `inputs/` (the VB Assessment PDF), writes `05-vb-summary/`.
- **Agent 03 (Report Narrative)** reads `01-recast/`, `02-observations/`, `07-earnings/`, and `05-vb-summary/` (optional — omits the qualitative section if absent), writes `03-narrative/`.
- **Deliverables** — Agent 03 copies the final report HTML (and supporting upstream HTML) to `/Agents/Engagements/[slug]/Deliverables/HTML/`, and the final report PDF to `/Agents/Engagements/[slug]/Deliverables/PDF/`. This nested-in-engagement folder is the **terminal point of the pipeline**.

The file contracts above (which files each agent produces and consumes) still hold — only the *location* changes: read-from/write-to are now the engagement stage folders named in `project-setup.md`, not the agents' own `inputs/` and `outputs/` folders.

**Done (2026-06-18):** all five downstream agents' `03-process.md` files now carry a native **Step 0 — Locate the Engagement and Read project-setup.md** that resolves their read-from/write-to locations to the engagement stage folders named in `project-setup.md` (with a legacy local `inputs/`/`outputs/` fallback for ad hoc runs when no codename is given). Deliverables were also moved back inside the engagement at `/Agents/Engagements/[slug]/Deliverables/` (`HTML/` and `PDF/`). The old per-agent file-copying staging steps remain documented but are superseded by the stage-folder handoff under this model.

---

## What Is Not Yet Specced
The following handoffs are not yet locked because the agents are not built:
- Agent 01 → Growth Forecast agent (the calc spec is defined in Agent 01's process file; the display spec will be defined when the Growth Forecast agent is built)
- Growth Forecast → Agent 08 (Scenario Planner) — not built yet

Update this file when those agents are built.
