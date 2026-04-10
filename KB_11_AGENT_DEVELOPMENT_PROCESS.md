# KB_11 — Agent Development Process

*Created: April 8, 2026*
*Source: Q2 Quarterly Planning Meeting — Gary established this as the team standard*

---

## Overview

Gary used the Q2 quarterly meeting to establish a repeatable, documentable process for building AI agents. The goal is a framework anyone on the team can follow to request an agent build, and that Hugo can use consistently whether the output is an internal tool, a client-facing ADS, or a monetizable product.

This document is the reference for that process.

---

## Two Categories of Agents

Before starting any build, determine which type of agent you need:

### Type 1 — Conversational / ADS Agents
Public-facing widgets that sit on a website and drive conversions. The team has a solid handle on these. Examples: SBV Business Value Navigator, GBA Industry Insider, Marketing Analyst.

**Characteristics:**
- Output is a conversation, not a document
- Deploys as a MeclabsAI ADS widget on a website
- Benchmarking and guardrails are the primary quality lever
- Turnaround: afternoon to a few days depending on complexity

### Type 2 — Material-Output Agents
Internal tools that produce formatted documents, reports, analyses, or other deliverables. More complex. These require sample materials, a defined output format, and more iteration.

**Characteristics:**
- Output is a document, spreadsheet, report, or structured file
- Lives inside MeclabsAI or connects to external tools via MCP
- Requires the requester to provide examples of what "good output" looks like
- Turnaround: several days to weeks depending on integrations required

---

## The Build Process

### Step 1 — Identify the Need

Someone on the team identifies a task that an agent could handle better, faster, or more consistently than a human. The need should be specific enough to describe in a sentence or two.

Examples of well-defined needs:
- "An agent that takes a business owner interview transcript and produces a first draft CIM"
- "An agent that analyzes an income statement vs. tax return and flags variances"
- "An agent that generates post-valuation report narratives in Nancy's voice"

Examples of too vague:
- "An agent that helps with marketing"
- "Something that makes valuations easier"

---

### Step 2 — Write a 500-Word Brief

The person requesting the agent writes a brief covering these five points:

1. **Purpose** — What is this agent for? What problem does it solve?
2. **Inputs** — What does the agent receive? (transcript, spreadsheet, form responses, etc.)
3. **Output** — What does the agent produce? What should it look like?
4. **Guardrails** — What should it never do or say?
5. **Success criteria** — How will you know if the agent is working correctly?

This brief does not need to be technical. The requester knows the domain; Hugo handles the technical translation. The better the brief, the closer the first iteration will be to what's needed.

Gary's framing: "The person who wants the thing is the one who understands the need."

---

### Step 3 — Provide Sample Materials

For Type 2 agents especially, Hugo needs examples:
- If building a report writer: send completed reports as PDFs or Word docs
- If building a financial analyst: send spreadsheets of past work with expected output
- If building a CIM builder: send completed CIMs in the preferred format

The agent is trained on what you give it. Generic agents give generic outputs.

---

### Step 4 — Expert Builder in MeclabsAI

Hugo takes the brief and sample materials into MeclabsAI's Expert Builder:

1. Describe what you want to the Expert Builder (this generates the initial prompt)
2. Review the generated prompt — check the "black copy" (the actual instructions) for accuracy
3. Add domain-specific requirements Gary's team knows that the AI wouldn't assume
4. Save the expert

Hugo typically refines the initial prompt across 2-3 iterations of the Expert Builder before moving to testing.

---

### Step 5 — Benchmark Testing

Hugo runs structured benchmark tests before declaring an expert ready:

- Build a set of test questions (typically 20) that probe the agent's behavior across expected scenarios
- Include edge cases: what happens when the user asks for something outside scope?
- Document results in Notion (pass/fail per question, issues found)
- Update the prompt based on what failed
- Repeat until results are consistent

The Industry Insider agent went through 3 rounds of benchmark testing. This is the standard.

For ADS agents specifically, benchmark tests should probe:
- Does it stay in its lane? (doesn't give legal, tax, or financial advice it shouldn't)
- Does it handle vague inputs gracefully?
- Does it always end with the appropriate CTA?
- Does it give consistent answers to the same question asked different ways?

---

### Step 6 — Deploy

Deployment depends on agent type:

**For ADS agents:**
1. Create the Expert in MeclabsAI
2. Create an App (structured intake) if needed
3. Create a Widget (ADS) linked to the Expert
4. Configure trigger, CTA, lead form, and allowed origins
5. Test the embed on the target page
6. Document all asset IDs in Notion

**For internal agents:**
1. Expert lives in MeclabsAI and is accessed directly by team members
2. Confirm access permissions — experts created by Hugo should be visible to the full team under the shared account
3. Document the agent's purpose, inputs, and limitations in Notion so the team knows how to use it correctly

---

## How to Request an Agent Build

If you want an agent built, send Hugo an email or Notion message with:

1. A clear one-sentence description of what you want
2. A 500-word brief covering the five points above
3. Any sample materials (reports, transcripts, spreadsheets) that represent what "good output" looks like
4. Your availability for a quick feedback session once the first version is testable

Hugo will evaluate, prioritize against the active build queue, and follow up with questions if needed.

---

## Current Agent Build Queue (Q2 2026 Goal: 6 New Agents)

Agents count toward the Q2 goal of 6 new agents by end of June. Existing ADS agents (SBV Business Value Navigator, GBA Industry Insider) do not count — these are already deployed.

Priority order is determined by Gary. Current known candidates:

| Agent | Type | Priority | Owner/Requester |
|---|---|---|---|
| SBV Report Narrative Writer (AUTO-02) | Type 2 | High | Nancy |
| CIM Builder | Type 2 | Medium | Gary |
| Financial Statement Variance Analyzer | Type 2 | Medium | Nancy |
| GBA General Site Agent | Type 1 (ADS) | High | Gary |
| Marketing Analyst (production-ready) | Type 1 | Medium | Gary |
| Agent TBD from team wish list | TBD | TBD | All |

---

## Agent Monetization Potential

Gary opened the door at the quarterly to offering agent-building services to clients:

- **ADS on client websites** — Estimated value: $5,000-$10,000 per build
- **Marketing Analyst as licensed product** — Possible SaaS model ($100/month?)
- **Internal workflow agents for clients** — Tied to SBV's value acceleration consulting
- **Website + ADS package** — Quick website build + agent for businesses being sold

The process documented here is the foundation for any client-facing agent offering. Consistent quality requires a consistent process.

---

## Key Principles

- **Garbage in, garbage out.** The quality of the brief and sample materials directly determines the quality of the first agent version.
- **Benchmark before deploying.** Never put an agent on a client-facing page without at least one round of structured testing.
- **Document everything.** Every agent gets a Notion page with its purpose, asset IDs, prompt version history, and benchmark results.
- **Guardrails are non-negotiable.** Every agent must have explicit instructions on what it cannot do. This protects Gary's liability and the brand.
- **All conversations lead to consultation.** This is Gary's standing principle for every client-facing ADS agent. The education builds trust; the CTA converts.

---

## Related Documents

- [SBV-AUTO-02 — Report Narrative Agent](https://www.notion.so/334f99c396de81ec9ee5c7133f1e8823)
- [GBA Industry Insider Expert — KB_06](KB_06_INDUSTRY_ADVISOR_EXPERT.md)
- [Q2 Quarterly Planning Meeting Notes](https://www.notion.so/33df99c396de81c5a656efe5456fd3e6)
- [MECLABS Project Tracker](https://www.notion.so/42cde02da93448a3be7b4dd400c086b4)
- KB_02_MECLABSAI_GUIDE.md
