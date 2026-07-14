# SBV Intake Agent (Agent 00) — Context

## About Strategic Business Valuations

Strategic Business Valuations (SBV) is a certified business valuation firm serving
privately held business owners, primarily in the $1M–$20M revenue range. Nancy Hallett
provides professional valuation judgment; Gary Hallett manages client relationships. The
agent fleet handles the mechanical and analytical work so Nancy and Gary can focus on
judgment and relationships. Agent 00 is the front door to that fleet.

---

## Why an Intake and Security Agent Exists

**1. Client confidentiality through codenames.** SBV does not attach a client's real name
to working files as they move through the pipeline. Every engagement is identified by a
themed project codename that Gary assigns (see the Project Codename Protocol in
`00-chief-of-staff/chief-of-staff.md`). The real name survives in exactly one place: the
engagement table of `project-setup.md`, labeled internal reference only. Agent 00 is the
gate that establishes the codename and enforces this from the start.

**2. An isolated home for each engagement.** Without an intake step, work for different
clients would scatter across the agents' own folders, and agents would have to copy files
to each other to hand off. Agent 00 instead creates one isolated folder per engagement,
with a fixed stage folder for each agent. Every agent reads the prior stage and writes its
own stage inside that engagement folder. There is no file copying between agents — the
folder structure is the handoff.

**3. A single source of truth.** `project-setup.md` records the engagement parameters
(tier, earnings basis, valuation date), the standing context, and the exact stage paths.
Downstream agents read it first and never have to rediscover or guess any of it.

---

## The Engagement-Folder Architecture

Each engagement lives at `/Agents/Engagements/[slug]/`, where the slug is the codename
lowercased with spaces replaced by hyphens. Inside:

- `inputs/` — the operator drops raw source files here (financials, add-backs, the VB
  Assessment PDF). Agent 01 and Agent 05 both read from here.
- `01-recast/` — Agent 01 writes its recast outputs. Agents 02 and 07 read from here.
- `02-observations/` — Agent 02 writes its observations.
- `07-earnings/` — Agent 07 writes its earnings-and-value output.
- `05-vb-summary/` — Agent 05 writes its Value Builder summary.
- `03-narrative/` — Agent 03 reads all upstream stages and writes the report narrative.

Deliverables live **inside the engagement folder**, at
`/Agents/Engagements/[slug]/Deliverables/`, split into `HTML/` and `PDF/` subfolders.
Agent 03 copies the final report HTML (and supporting HTML) to `HTML/` and the final
report PDF to `PDF/`. This nested folder is the terminal point of the pipeline, and
Agent 00 creates it at intake alongside the other stage folders.

The flow of stages mirrors the pipeline sequence: inputs → 01-recast → (02-observations
and 07-earnings) → 03-narrative → `Engagements/[slug]/Deliverables/`, with 05-vb-summary
feeding 03-narrative as an optional input read directly from `inputs/`.

---

## Key Terms

**Codename**
The project identifier Gary assigns. Used in the folder slug, every output filename, and
every agent output header. The agent never invents one — if it is missing, stop and
request it.

**Codename slug**
The folder-safe form of the codename: lowercase, spaces replaced by hyphens. `The Price Is
Right` → `the-price-is-right`. Used only in paths; the display codename is used in text.

**Engagement tier**
Express, Explore, Accelerate, or Certified. Shapes how downstream agents frame output.
Agent 00 records it; it does not choose it.

**Earnings basis**
SDE (Seller's Discretionary Earnings) or EBITDA. Nancy decides; Agent 00 records.

**Standing context**
Everything SBV already knows about this client that downstream agents should not
rediscover or misread — known accounting styles, known one-time events, owner context,
mid-history bookkeeping changes. Capturing it up front prevents agents from treating known
facts as anomalies.

**Stage paths**
The read-from / write-to folder for each agent, recorded in `project-setup.md`. The
contract that lets agents hand off through the folder structure with no file copying.

---

## Relationship to the Standing Rules

The chief-of-staff standing rules apply to this agent. Most relevant here:

- **No agent in this pipeline produces a valuation.** Agent 00 produces no valuation,
  recast, narrative, or analysis of any kind.
- **No agent selects a multiple, a weighting, or an earnings basis.** Agent 00 *records*
  the earnings basis the operator provides; it never selects it.
- **Never invent figures or facts.** Extended here to codenames and context: the agent
  never invents a codename and never invents standing context. Missing required inputs
  stop the agent.
- **Codename, not legal name.** The legal name appears only in `project-setup.md`, labeled
  internal reference only — never in a filename or any output.
