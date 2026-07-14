# Katie Milton Jordan — AI Agent Builder Sprint: Lessons Summary
*Days 3–5 + Bonus Session*

---

## Day 3: Run It. Improve It. Wrap It Up.

### Core Idea
Building an agent is just the start. Running one teaches you what it's actually like to work with one. Improving one is how the work compounds. The key insight: continuous improvement is itself automated — you have agents for it.

### How to Run an Agent (Two Steps)
Every agent follows the same interface pattern:
1. Open the agent's `01-start-here.html` file — the "front door." This gives Claude the working context for that agent.
2. Say **"Let's run this agent."** Claude reads its own five files (start-here, golden example, process, context, quality) in order, then does the work.

No setup. No prompt to write. No context to paste.

### The 3-3-3 Method
A second agent that improves any artifact — including other agents.

**Principle:** Three rounds of three improvements beats one pass at nine. Each round changes the surface and reveals what to fix next. You can't see round 2's best ideas until round 1 has run.

**Structure:**
- **Step 1 — Pick an advisor.** The agent proposes three candidates matched to the artifact type (landing page, dashboard, memo, etc.). You choose one. The advisor *is* the rubric.
- **Step 2 — Derive a rubric.** 4–6 scorable criteria pulled from the advisor's methodology. Stays fixed across all three rounds for honest measurement.
- **Step 3 — Run the loop.** Three rounds, three improvements each, re-reading the artifact between rounds. Score → snapshot → log → repeat.

**Advisor Library (examples):**

| Artifact Type | Advisors |
|---|---|
| Landing / sales page | Peep Laja, Alex Hormozi, April Dunford, Joanna Wiebe |
| Design / UX | Oliver Reichenstein, Luke Wroblewski, Steve Krug |
| Dashboard / data viz | Edward Tufte, Stephen Few, Cole Knaflic |
| Training docs | Barbara Minto, Julie Dirksen, Chip & Dan Heath |
| Strategy memo | Richard Rumelt, Roger Martin, Barbara Minto |

**Outputs:** `v0-baseline.html`, `v1.html`, `v2.html`, `v3.html` (the original is never edited), plus an `improvement-log.html` with scoring matrix and before/after cards.

**Trigger:** `Read the 3-3-3-method agent and apply it to [path-to-your-file.html].` (~23 minutes from advisor pick to v3.)

### The Project Wrap-Up Agent
A third agent that closes every project loop. Trigger phrase: **"Run project wrap-up."**

The agent scans the project folder and produces a single `wrap-up.html` with four sections:
1. **Embedded invoice** — before/after cost comparison (traditional vs. AI-powered)
2. **Improvements catalog** — every system change made: new agents, edited rubrics, updated context files, house-style rules
3. **Suggested next improvements** — patterns observed that didn't make it into v1, seeding the next sprint
4. **Workflow packaging + inventory** — repeatable workflows packaged as new agents, complete file inventory

**The closed loop:** Run agent → Apply 3-3-3 → Run wrap-up → Catalog lands in continuous-improvement file → Next agent you run is better. Not because you remembered — because the system did.

---

## Day 4: The Eight Levels of AI Execution + The Operating System

### The Eight Levels
A scale of 0.1× to 1,000,000× — six orders of magnitude between where most people are and where the ceiling is.

| Level | Multiplier | Description |
|---|---|---|
| L1 | 0.1× | **Manual.** Everything starts from scratch. Knowledge walks out the door with people. |
| L2 | 1× | **Documented.** Process stays but speed doesn't change. Playbooks exist, but every task still runs on human effort. |
| L3 | 10× | **AI Workflow.** One person produces what used to take a team. Playbooks become prompts; AI handles drafts; human reviews. |
| L4 | 100× | **AI Agent.** You review output, not process. The agent reads the plan, builds the deliverable, writes the follow-up. |
| **L5** | **1,000×** | **Orchestration.** Every stage fires in sequence with dependencies respected. A quarter's work moves in a day. |
| L6 | 10,000× | **Swarm.** Work that previously didn't exist becomes possible — personalized proposals for every prospect, individualized campaigns for every lead. |
| L7 | 100,000× | **Self-Governing.** The system improves itself overnight. Morning briefing tells you what needs attention. |
| L8 | 1,000,000× | **Portfolio.** One person runs many companies, each with its own L7 engine and agent fleet. |

> **The threshold** between L4 and L5 is the critical line: everything before it is one person, one task. Everything after is one person, many systems. Most companies never cross it.

### The Operating System (The Chief-of-Staff File)
An agent without an OS has amnesia — it runs once, lands somewhere, and the next session starts from zero. The OS is what makes the second run better than the first.

**Five failure modes without an OS:**
1. Stray files everywhere — can't find what you shipped
2. Duplicate agents built because no registry exists
3. No standing rules — every session re-explains brand voice
4. Drift — work starts as one thing and ends as another
5. No compounding — every project starts from a blank page

**The Chief-of-Staff file** (`0. Chief of Staff/chief-of-staff.html`) does four things every session before any other work:
- Names the goal first (no work begins without a named goal)
- Holds the standing rules (house style, file-naming, where things save)
- Delegates to the right VP agent by functional area
- Knows where everything is (agent registry, folder spine, canonical sources)

**Four pre-flight rules (override all one-off instructions):**
- A: Name the goal first — which monthly goal does this serve?
- B: No stray files — every deliverable lives at `[N. Functional Area]/4. Projects/[project-folder]/[file].html`
- C: State the full path before any link — plain text first, then the link
- D: All HTML matches the house style — read `house-style.html` before authoring

### The Folder Spine (Ten Numbered Areas)
The whole company fits in ten folders. Numbers impose order — the value chain runs left-to-right so when an agent must pick a home, the question collapses to: *which number is this?*

```
00. Chief of Staff
01. Strategy
02. Products
03. Marketing
04. Sales
05. Operations
06. IT
07. Finance
08. HR & Admin
09. Legal
10. Continuous Improvement
11. Invoices
```

**Inside every folder — the GAAPC standard (same five subfolders, always):**
- **G** — Goals
- **A** — Advisors
- **A** — Agents
- **P** — Projects
- **C** — Context (+ Catalog for Marketing & Sales)

Once you know one folder, you know all of them.

### How a Task Flows Through the OS
Example: "Build me a deck for the Tuesday client meeting."
1. CoS reads first — pre-flight rule A fires, goal named
2. CoS routes to Sales VP
3. Sales VP picks the right agent from `4. Sales/3. Agents/`
4. Agent runs with house style and brand already loaded, saves to the correct path
5. Wrap-up closes the loop

Nothing decided ad hoc. No re-explaining the brand. No rebuilding prompts.

---

## Bonus Session: Productized Services

### The Thesis
Professional work is being unbundled into deliverables → deliverables become agents → agents become productized services. The four-step movement:

**Unbundle into deliverables → Rebuild as agents → Package into productized services → The new operating layer**

The deliverable is the atomic unit of knowledge work. Most people don't view it that way.

### The Evidence
AI now outperforms expert knowledge workers (14+ years of experience) 83%+ of the time in blind taste tests on expert knowledge work. The gap keeps widening.

### The Key Insight: Distribution, Not Product
You can rebuild every deliverable on the planet as an agent. The hard part isn't building — it's distribution. Getting in front of customers, converting attention to revenue, building a self-sustaining funnel.

### Three Business Opportunities
1. **Order the Work Directly** — Go to companies, offer services at 10¢ on the dollar. Replace agency spend with AI-powered deliverables. (B2B productized services)
2. **License & White-Label** — License your agent stack to individuals who want a business-in-a-box
3. **Build the Platform** — Become the operating layer itself

### The Agent OS Bootcamp Progression
| Stage | Format | Goal |
|---|---|---|
| Weekly Workshop | Ongoing | Understand the model |
| Agent Builder Sprint | 5 days, 5 sessions | Reach Level 4. Build first real agents. |
| **Agent OS Bootcamp** | 1 month, 20 sessions | Install the operating system |
| Performance Bootcamp | 1 month, 20 sessions | Lift Revenue, Execution, and Risk |
| Forum / License | Ongoing | Compound performance or deploy internally |

---

## Key Principles Across All Sessions

- **Five-file structure** is always the same: start-here, golden example, process, context, quality
- **Trigger phrases** are the interface — one sentence starts the whole system
- **Agents improve agents** — the 3-3-3 method works on the agent's own files, not just outputs
- **The wrap-up writes the next sprint** — closing the loop is the loop
- **An agent registry is non-negotiable at scale** — if it's not in §07, it doesn't exist yet
- **The OS handles everything the agent shouldn't have to rediscover** — brand, rules, paths, goals
