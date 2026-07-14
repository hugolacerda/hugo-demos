# Applying the Bootcamp to Our Company: Automation Ideas
*Reference: Katie Milton Jordan's AI Agent Builder Sprint — for use alongside the separate automation-ideas chat*

---

## Where We Are Now (Diagnosing Our Level)

Using the Eight Levels framework, most companies doing ad-hoc AI usage sit at **Level 2–3**: documented processes, maybe some AI-assisted drafts, but tasks still start from scratch each time and knowledge doesn't compound. The goal of this framework is to move deliberately to **Level 4** (AI Agents) and eventually **Level 5** (Orchestration).

Key question to answer for our setup: *Which work do we repeat most often, and which of those has a clear, consistent output format?* Those are the first agents to build.

---

## Immediate Applications (Level 3 → Level 4)

These map directly to the bootcamp's agent-building method. Each would be a five-file agent package.

### 1. Client Deliverable Agents
Any recurring output we produce for clients — reports, proposals, status updates, audits — is a candidate. The five-file structure means:
- `01-start-here.html` defines what the agent does and what it needs from us
- `02-golden-example.html` locks in our quality standard once, so every run matches it
- `03-process.html` is the step-by-step the agent follows
- `04-context.html` holds our brand voice, client-specific background, standing rules
- `05-quality.html` is the checklist the agent self-grades against before handing off

**Trigger:** One sentence. The agent asks clarifying questions in round 1, then runs autonomously from round 2 onward.

### 2. Internal Operations Agents
Recurring internal work that currently lives in someone's head:
- Meeting prep / agenda builder (pulls context from last meeting notes + current goals)
- Weekly status report compiler
- Onboarding document generator for new clients or team members
- Contract or SOW first-draft generator

### 3. Sales & Outreach Agents
- Proposal generator (client name + deal context → formatted proposal)
- Discovery call prep (company research + qualification questions)
- Follow-up email writer (meeting notes → next-step email)

---

## The 3-3-3 Method: How We'd Use It

Every significant output — client report, proposal, presentation, strategy memo — runs through 3-3-3 before it ships. This replaces the current pattern of one person writing something, someone else "taking a look," and edits happening ad hoc.

**Practical workflow:**
1. Agent produces v0
2. Run 3-3-3 pointed at v0, picking the right advisor for the artifact type:
   - Client-facing reports → Minto (pyramid principle) or Tufte (if data-heavy)
   - Proposals → Peep Laja (conversion) or Hormozi (offer clarity)
   - Strategy memos → Rumelt (strategy kernel)
3. v3 is what goes out the door
4. The improvement log becomes a reference for future similar work

The rubric stays fixed across rounds — this is how you measure whether changes actually improved things rather than just changed them.

---

## The Operating System: What We'd Need to Build

The OS is what prevents agents from being a pile of clever tools that nobody remembers to use. Here's what implementing it would look like for us:

### Chief-of-Staff File
A single `chief-of-staff.html` that every Claude session opens with. It would contain:
- Our company mission and offer structure
- Current month's top 1–3 goals (updated monthly)
- House style rules (tone, formatting, file-naming conventions)
- Pre-flight rules: name the goal first, no stray files, state full paths, match house style
- Agent registry: what agents exist, where they live, when they last ran
- The folder spine

This replaces re-explaining brand voice and context at the start of every session.

### Folder Spine (adapted to our areas)
Rather than creating a flat pile of project folders, we'd organize by functional area using the GAAPC structure:

```
00. Chief of Staff/
01. Strategy/
02. Products & Services/
03. Marketing/
04. Sales/
05. Operations/
06. IT & Systems/
07. Finance/
08. HR & Admin/
09. Legal/
10. Continuous Improvement/
```

Inside each: `1. Goals / 2. Advisors / 3. Agents / 4. Projects / 5. Context`

Every deliverable has one obvious home. No "temp" folders, no desktop clutter.

### Agent Registry
A maintained list in the CoS file — every agent we've built, what it does, where it lives, when it last ran. This solves the "did we already build this?" problem and makes the fleet visible.

---

## The Wrap-Up Loop: Building Compounding Value

The wrap-up agent is what turns one-off effort into compounding knowledge. After every significant project:

1. Trigger `"Run project wrap-up."`
2. Get: invoice (time/cost comparison), improvements catalog, suggestions for next time, file inventory
3. Suggestions feed back into the agent's context files → next run is better

**Applied to us:** After every client engagement, the wrap-up captures what worked, what we'd change, what new agents or templates emerged. Over time, our agents get better at our specific work without us having to remember and manually update anything.

---

## The Productized Services Angle

The bonus session points to a longer-term opportunity: any agent we build for internal use can potentially be packaged and sold externally.

The key reframe: *an agent you run for clients is a service; an agent you sell to clients is a product.* The difference is packaging — fixed price, repeatable delivery, same outcome each time.

If we build well-scoped agents for our most common deliverables, those same agents could become productized offerings. The distribution problem (not the build problem) is what determines whether this becomes revenue.

---

## Prioritization Framework

For deciding which agents to build first, score each candidate on:

1. **Frequency** — How often do we produce this deliverable?
2. **Consistency** — Does it follow a repeatable pattern every time?
3. **Pain** — How much time/effort does it currently take?
4. **Quality ceiling** — Is there a clear "gold standard" we can use as the golden example?

High scores on all four = build it first. One-off, highly variable, or judgment-heavy work = leave for later (or use as context input, not agent output).

---

## Suggested First Agents to Build

Based on typical agency/consulting workflows and the bootcamp framework:

| Agent | Area | Why First |
|---|---|---|
| Client proposal generator | Sales | High frequency, clear format, easy golden example |
| Status update / progress report | Operations | Weekly cadence, consistent structure |
| Meeting prep brief | Sales / Ops | Simple trigger, immediate time savings |
| Onboarding doc generator | Operations | Repeatable, currently manual |
| 3-3-3 improvement agent | Continuous Improvement | Improves everything else — high leverage |
| Project wrap-up agent | Continuous Improvement | Closes the loop, builds compounding value |

The last two (3-3-3 and wrap-up) should be built early because they make all the other agents better over time.

---

## Current Level Assessment & Target

| Dimension | Current | Target (3 months) |
|---|---|---|
| Execution level | L2–L3 | L4 (AI Agent) |
| Agent count | 0 | 6–10 core agents |
| OS in place | No | Chief-of-Staff file + folder spine |
| Compounding loop | No | Wrap-up running after every project |
| Improvement cadence | Ad hoc | 3-3-3 on significant outputs |

The goal isn't to build 50 agents immediately. It's to build 6–10 well-scoped agents, get the OS in place so they don't get lost, and run the closed loop so they compound over time.
