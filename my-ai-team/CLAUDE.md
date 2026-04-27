# CLAUDE.md — My AI Team

## What This Project Is
This is your personal AI team. Each subfolder is a specialist agent with its own skills, memory, and instructions. Donna is the orchestrator — she's the only one you talk to directly.

---

## Project Structure

```
my-ai-team/
  CLAUDE.md              ← This file — project map
  .env                   ← All credentials for all agents (gitignored)
  .env.example           ← Placeholder names — safe to share
  donna/                 ← YOUR FRONT DOOR — always talk to Donna
  ghl-agent/             ← GoHighLevel CRM specialist
  content-agent/         ← Writing, copy, and content specialist
  research-agent/        ← Research and summarization specialist
  youtube-agent/         ← YouTube optimization specialist
```

---

## The Golden Rule

**You never open a specialist agent directly. You always talk to Donna.**

Donna receives your request, decides which specialist(s) to call, delegates the work, and brings the result back to you. The specialists don't talk to you — they talk to Donna.

---

## How to Use This Project

```bash
cd my-ai-team
claude
```

That's it. You're now talking to Donna and have access to your entire AI team.

---

## Agent Roster

| Agent | Path | What It Does |
|-------|------|-------------|
| Donna | `./donna/` | Orchestrator — your front door to everything |
| GHL Agent | `./ghl-agent/` | GoHighLevel contacts, pipelines, conversations |
| Content Agent | `./content-agent/` | Copy, emails, social posts, scripts |
| Research Agent | `./research-agent/` | Web research, summaries, competitive intel |
| YouTube Agent | `./youtube-agent/` | Titles, descriptions, hooks, thumbnails |

---

## Adding New Agents

Create a new subfolder, add a `CLAUDE.md`, and register it with Donna. That's all. Your team grows as your needs grow.

---

## Environment Variables

All credentials live in one `.env` file at the project root.
Every agent reads from the same file — you set credentials once, all agents have them.
See `.env.example` for all required variable names.
