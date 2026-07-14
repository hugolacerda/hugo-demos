# SBV Intake Agent (Agent 00) — Process

**Version:** 2.2 | June 2026

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | June 2026 | Initial build — per-agent inputs/outputs subfolders. |
| 2.0 | June 2026 | Rebuilt to the isolated engagement-folder architecture. Single stage folder per agent (inputs, 01-recast, 02-observations, 07-earnings, 05-vb-summary, 03-narrative, Deliverables). project-setup.md now carries explicit Stage Paths. No file copying between agents. Codename slug rule (lowercase, hyphens). |
| 2.1 | June 2026 | Deliverables moved out of the engagement folder to a central shared root, `/Agents/Deliverables/[slug]/`, split into `html/` and `pdf/` subfolders. Agent 00 now also creates this project deliverable folder at intake. |
| 2.2 | June 2026 | Deliverables moved back **inside** the engagement folder at `/Agents/Engagements/[slug]/Deliverables/` with `HTML/` and `PDF/` subfolders (reverses the 2.1 central-root split). Agent 00 creates these two folders in Step 4 alongside the other stage folders; the central `/Agents/Deliverables/` root is no longer used. Stage Paths Deliverables rows updated accordingly. |

## Overview

This agent runs once per engagement, before any other agent. It follows a fixed sequence
and does not skip steps. If a required input is missing it stops and requests it — it
never infers or invents a value. It produces no analysis: its only outputs are the
engagement folder structure and `project-setup.md`.

---

## Step 1: Collect the Engagement Inputs

Read the engagement details the operator provided:

- Real client name and business name
- Project codename (assigned by Gary)
- Engagement tier — Express, Explore, Accelerate, or Certified
- Earnings basis — SDE or EBITDA
- Valuation date
- Standing context — what SBV already knows about this client

The agent never infers any of these. Each value comes from the operator.

---

## Step 2: Validate Required Inputs — Hard Stop

Before creating anything, confirm the four required inputs are present. If any is
missing, **stop immediately** and request it. Do not create folders, do not write files,
do not guess.

- **Codename missing** → stop. Reply: "No project codename was provided. Gary assigns the
  codename — I cannot invent one. Please provide the codename to continue." Never invent a
  codename.
- **Engagement tier missing** → stop. Reply: "No engagement tier was provided. Please
  specify one of: Express, Explore, Accelerate, Certified."
- **Earnings basis missing** → stop. Reply: "No earnings basis was provided. Please
  specify SDE or EBITDA."
- **Client name or business name missing** → stop and request it.

Validate the values that are present:
- Tier must be exactly one of Express, Explore, Accelerate, Certified. Otherwise stop and
  confirm.
- Earnings basis must be exactly SDE or EBITDA. Otherwise stop and confirm.

The valuation date and standing context are recorded as provided. If the valuation date
is missing, record it as `[MISSING — confirm with Nancy]` (it is not one of the four hard
stops) so it is visible and not forgotten. If standing context is missing, write
`- None provided at intake.` — never invent context.

---

## Step 3: Derive the Codename Slug

Convert the codename to the folder slug: **lowercase, with spaces replaced by hyphens.**
Strip any leading/trailing spaces first; collapse repeated spaces to a single hyphen.

> `The Price Is Right` → `the-price-is-right`
> `Project Nemo` → `project-nemo`

Use the slug for the folder path. Use the original (display) codename inside
`project-setup.md` text and in the confirmation message.

---

## Step 4: Create the Engagement Folder Structure

Create the engagement root and the fixed set of stage folders. Use the **slug** in the
path. If a folder for that slug already exists, do not overwrite it — stop and report that
the engagement folder already exists so the operator can confirm whether this is a re-run
or a codename collision.

```
/Agents/Engagements/[slug]/
  project-setup.md        ← written in Step 5
  inputs/                 ← operator places raw source files here
  01-recast/              ← Agent 01 writes here
  02-observations/        ← Agent 02 reads from 01-recast/, writes here
  07-earnings/            ← Agent 07 reads from 01-recast/, writes here
  05-vb-summary/          ← Agent 05 reads from inputs/, writes here
  03-narrative/           ← Agent 03 reads all upstream stages, writes here
```

Also create the project's deliverable folder **inside the engagement folder**, named
`Deliverables`, split into `HTML/` and `PDF/` subfolders (created in this step alongside
the other stage folders):

```
/Agents/Engagements/[slug]/Deliverables/
  HTML/                   ← Agent 03 copies the final report HTML (+ supporting HTML) here
  PDF/                    ← Agent 03 copies the final report PDF here
```

Place a `.gitkeep` in every empty folder so the structure is tracked. Apply the same
"do not overwrite if it already exists" rule to the deliverable folder.

---

## Step 5: Write `project-setup.md`

Write the file to `/Agents/Engagements/[slug]/project-setup.md`. Follow the golden example
in `02-golden-example.md` exactly. Include, in order:

1. **H1 title** — `# Project Setup — [Codename]` (display codename).
2. **Purpose blockquote** — single source of truth; outputs use the codename only; legal
   name is internal reference only and must not appear in any filename or output.
3. **Engagement table** — Codename; Legal name (labeled "internal reference only — do not
   use in outputs"); Engagement tier; Earnings basis; Valuation date; Date created
   (today's date from session context); Status (`Active`).
4. **Standing Context** — bulleted, as provided. If none, `- None provided at intake.`
5. **Engagement Root** — `/Agents/Engagements/[slug]/`.
6. **Stage Paths** — the most important section. A table giving the exact folder each
   agent reads from and writes to, relative to the Agents/ root. Reproduce the stage-path
   set from the golden example, substituting the slug. Agent 03 reads from the three
   upstream stages plus `05-vb-summary/` marked optional, and writes to `03-narrative/`.
   The final deliverables are the terminal write target and live inside the engagement:
   `Engagements/[slug]/Deliverables/HTML/` for the report HTML (and supporting HTML) and
   `Engagements/[slug]/Deliverables/PDF/` for the report PDF.

Structure the file so any downstream agent reads it in under 30 seconds.

---

## Step 6: Print the Confirmation Message

Print a confirmation to the operator containing:

- The engagement root path (`/Agents/Engagements/[slug]/`).
- A reminder to place raw source files in the `inputs/` folder **before** running Agent 01.
- The display codename to use when starting each downstream agent session.

Do not proceed to any analysis. Agent 00's job is done once the folder and
`project-setup.md` exist.
