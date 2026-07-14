# SBV Intake Agent (Agent 00) — Quality & Guardrails

**Version:** 2.2 | June 2026

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | June 2026 | Initial build. |
| 2.0 | June 2026 | Rebuilt for the engagement-folder architecture: stage-folder checks, codename slug rule, Stage Paths section check. |
| 2.1 | June 2026 | Deliverables moved to central shared root `/Agents/Deliverables/[slug]/` with `html/` and `pdf/` subfolders; updated folder and stage-path checks. |
| 2.2 | June 2026 | Deliverables moved back inside the engagement at `/Agents/Engagements/[slug]/Deliverables/` (`HTML/` and `PDF/`); folder-structure and Stage Paths checks updated to the nested location (reverses 2.1). |

## Hard Guardrails — Never Violate

Stop conditions. The agent halts and requests the missing item rather than proceeding.

- [ ] **No codename → STOP and request one.** Never invent a codename. Gary assigns
      codenames. This is the single most important rule for this agent.
- [ ] **No engagement tier → STOP and request it.** Must be Express, Explore, Accelerate,
      or Certified.
- [ ] **No earnings basis → STOP and request it.** Must be SDE or EBITDA.
- [ ] **No client name or business name → STOP and request it.**
- [ ] **The agent produces no analysis.** Its only outputs are the engagement folder
      structure and `project-setup.md`. No financial analysis, no narrative, no valuation.
- [ ] **The agent never infers any input.** Everything comes from the operator. Nothing is
      guessed.

---

## Codename & Confidentiality Checks

- [ ] The legal (real) name appears in **exactly one place**: the engagement table of
      `project-setup.md`, labeled "internal reference only — do not use in outputs."
- [ ] The legal name appears in **no folder name and no filename**.
- [ ] The engagement folder is named with the **codename slug only** (lowercase, hyphens):
      `/Agents/Engagements/[slug]/`.
- [ ] The slug is derived correctly: lowercase, spaces → hyphens, no leading/trailing
      hyphens, no double hyphens. (`The Price Is Right` → `the-price-is-right`.)
- [ ] The `project-setup.md` H1 and sections lead with the display codename.

---

## Input Validation Checks

- [ ] Engagement tier is exactly one of: Express, Explore, Accelerate, Certified.
- [ ] Earnings basis is exactly SDE or EBITDA.
- [ ] Valuation date is present and a valid date. If missing, record
      `[MISSING — confirm with Nancy]` (do not stop on this one).
- [ ] Standing context recorded as provided. If none, `- None provided at intake.` Never
      invent context.

---

## Folder Structure Checks

- [ ] `/Agents/Engagements/[slug]/` was created.
- [ ] It contains exactly these stage folders: `inputs/`, `01-recast/`,
      `02-observations/`, `07-earnings/`, `05-vb-summary/`, `03-narrative/`, and a
      `Deliverables/` folder (with `HTML/` and `PDF/` subfolders).
- [ ] The nested deliverable folder `/Agents/Engagements/[slug]/Deliverables/` was created
      with `HTML/` and `PDF/` subfolders.
- [ ] Every empty folder contains a `.gitkeep` so the structure is tracked.
- [ ] If a folder for that slug already existed (engagement or deliverable), the agent
      stopped and reported it rather than overwriting.

---

## project-setup.md Content Checks

- [ ] All seven elements present in order: H1 title, purpose blockquote, engagement table,
      standing context, engagement root, stage paths, (date created + status are inside the
      engagement table).
- [ ] Engagement table includes: codename, legal name (labeled internal reference only),
      tier, earnings basis, valuation date, date created (today's date), status (`Active`).
- [ ] **Stage Paths section is present and correct.** Each agent's read-from and write-to
      folder matches the architecture: Agent 01 reads `inputs/` writes `01-recast/`; Agent
      02 reads `01-recast/` writes `02-observations/`; Agent 07 reads `01-recast/` writes
      `07-earnings/`; Agent 05 reads `inputs/` writes `05-vb-summary/`; Agent 03 reads
      `01-recast/`, `02-observations/`, `07-earnings/`, and `05-vb-summary/` (optional) and
      writes `03-narrative/`; final deliverables go to
      `Engagements/[slug]/Deliverables/HTML/` (report HTML + supporting HTML) and
      `Engagements/[slug]/Deliverables/PDF/` (report PDF).
- [ ] A downstream agent can read the file in under 30 seconds and know its read/write
      folders without scrolling back and forth.

---

## Confirmation Message Check

- [ ] The agent printed a confirmation with the engagement root path, the reminder to
      place raw source files in `inputs/` before running Agent 01, and the display codename
      to use for downstream sessions.

---

## QA Framing

This agent does not produce client-facing QA notes. Its checks are internal scaffolding to
confirm intake was clean. If something is wrong, the failure mode is to **stop and ask the
operator**, not to write a flag and continue.
