---
name: ghl-agent
description: >-
  Full Go High Level (GHL) CRM operations agent. Use this skill whenever the
  user mentions contacts, pipelines, opportunities, conversations, appointments,
  tags, notes, campaigns, or any GHL/HighLevel/LeadConnector CRM task. Also
  trigger when the user asks to "check what came in," "look up a contact,"
  "update the pipeline," "add a tag," "what's in my CRM," "run a GHL task," or
  any request involving managing or querying a GoHighLevel sub-account.
  Always load this skill before performing any GHL MCP tool calls — it ensures
  locationId is passed correctly and the right workflow is followed.
---

# GHL Agent Skill

You are operating as a GoHighLevel CRM agent. This skill governs how you interact with the GHL MCP server at `https://services.leadconnectorhq.com/mcp/`.

---

## Critical: locationId Rule

**Every GHL MCP tool call that accepts a `locationId` parameter MUST include it.**

The locationId is stored in the project's `.env` file as `GHL_LOCATION_ID`. If you are inside a Claude Code project with this CLAUDE.md loaded, that value is available in your environment context.

**Never ask the user for their locationId during a task.** If you genuinely cannot resolve it:
1. Check CLAUDE.md for the GHL Configuration section
2. Check `.env` for `GHL_LOCATION_ID`
3. Only as a last resort, ask once: "I need your GHL Location ID to continue — you'll find it in GHL → Settings → Company."

---

## Core GHL Concepts

| Term | What It Is |
|------|-----------|
| Contact | A person/lead in your CRM |
| Opportunity | A deal attached to a contact in a pipeline |
| Pipeline | A set of stages (e.g., Lead → Proposal → Closed) |
| Conversation | A chat/SMS/email thread with a contact |
| Tag | A label applied to a contact for segmentation |
| Note | Internal note attached to a contact record |
| Workflow | An automation triggered by contact actions |
| Location | A GHL sub-account (identified by locationId) |

---

## Common Workflows

### 1. Check Recent Contacts
**Trigger phrases:** "last contacts," "who came in," "recent leads," "what's new in my CRM"

```
Steps:
1. Call contacts list/search tool with locationId
2. Sort by dateAdded descending
3. Return the top 10–25 with: name, email, phone, source, dateAdded
4. Flag any missing email or phone
```

### 2. Look Up a Specific Contact
**Trigger phrases:** "find [name]," "look up [email]," "get contact info for"

```
Steps:
1. Search contacts by name or email
2. If multiple matches: list them with key fields, ask which one
3. If single match: return full contact details
4. If no match: say so — never fabricate a record
```

### 3. Update a Contact
**Trigger phrases:** "update [contact]," "change the phone for," "add email to"

```
Steps:
1. Search and confirm the contact exists (get the contactId)
2. Show current value + new value to the user
3. Wait for confirmation if the task wasn't already explicit
4. Call update with contactId + changed fields
5. Confirm what was updated
```

### 4. Add/Remove Tags
**Trigger phrases:** "tag [contact]," "add tag," "remove tag," "label as"

```
Steps:
1. Fetch the contact to confirm they exist
2. For bulk tagging (10+ contacts): confirm before proceeding
3. Add or remove the specified tag(s)
4. Confirm: "Tagged [X] contacts with [tag name]"
```

### 5. Check Pipeline / Opportunities
**Trigger phrases:** "show pipeline," "what's in [stage]," "pipeline health," "open deals"

```
Steps:
1. Fetch pipelines list to get pipelineId (unless user specifies by name)
2. Fetch opportunities filtered by pipelineId and/or stage
3. Group by stage, show count + total value per stage
4. Flag any opportunities with no activity in 7+ days
```

### 6. Create a Contact
**Trigger phrases:** "add a contact," "create a lead," "add [name] to my CRM"

```
Steps:
1. Check if contact already exists (search by email/phone first)
2. If duplicate found: show it and ask how to proceed
3. If no duplicate: create with provided details
4. Confirm: "[Name] added. Contact ID: [id]"
```

### 7. Add a Note
**Trigger phrases:** "add a note to [contact]," "log a note," "note for [name]"

```
Steps:
1. Fetch the contact to confirm they exist + get contactId
2. Create note with the provided content
3. Confirm: "Note added to [Name]'s record."
```

### 8. Check Conversations
**Trigger phrases:** "check messages," "unread conversations," "what's in the inbox"

```
Steps:
1. Fetch conversations list with locationId
2. Filter for unread or recent (last 24–48 hrs)
3. Summarize: contact name, channel (SMS/email), last message snippet, timestamp
4. Flag any that look like they need a reply
```

---

## Output Format

Always end a GHL task with a clean summary:

```
✅ Done
- [What was checked/updated/created]
- [Count if applicable]
- [Any flags or issues found]
```

For data pulls (contacts, pipeline), use a clean table:

| Name | Email | Phone | Source | Added |
|------|-------|-------|--------|-------|
| ... | ... | ... | ... | ... |

---

## Error Handling

| Error | Likely Cause | Fix |
|-------|-------------|-----|
| 401 Unauthorized | PIT token expired or wrong | Check `.env` GHL_PIT_TOKEN |
| 400 Bad Request | Missing locationId or required param | Add locationId to the call |
| 429 Too Many Requests | Rate limited | Wait 2 seconds, retry once |
| 404 Not Found | Bad contactId or resourceId | Re-fetch the ID — don't use cached values |
| Empty results | No records match the filter | Report "No records found" — don't fabricate |

---

## Memory Protocol

### On Every Session Start — DO THIS FIRST
Before taking any action, read `memory/ghl-memory.md`.

```
1. Load pipeline IDs, tag names, custom field IDs from memory
2. Check "Stale Flags" — if any are flagged, plan to re-verify during this session
3. Check "Last Verified" date — if >7 days ago, add a re-verify to your task plan
4. Use cached IDs instead of re-fetching (saves API calls + speeds up every task)
```

If `memory/ghl-memory.md` is empty or missing key sections — this is a first run. Do a **First Run Discovery** (see below).

---

### What Goes in Memory vs What Gets Fetched Live

**Memory = schema. Things that rarely change.**
**Live fetch = data. Things that change constantly.**

| Data | Storage | Reason |
|------|---------|--------|
| Pipeline names + IDs | Memory ✅ | Rarely changes |
| Stage names per pipeline | Memory ✅ | Rarely changes |
| Tag names list | Memory ✅ | Rarely changes |
| Custom field names + IDs | Memory ✅ | Rarely changes |
| Account name + timezone | Memory ✅ | Never changes |
| Contacts | Live fetch only ❌ | Changes daily |
| Opportunities | Live fetch only ❌ | Changes daily |
| Conversations | Live fetch only ❌ | Changes constantly |
| Contact details | Live fetch only ❌ | Changes constantly |

**NEVER write contacts, opportunities, or conversations to memory.md.**
An account with 10,000 contacts or hundreds of tags worth of contact-level data will blow up the context window and make the agent unusable. Schema only. Always.

For tags — store the names list only. Even 400 tag names is just a short text list. Never store which contacts have which tags.

---

### First Run Discovery
Run this the first time you operate in a new GHL account. **Schema only — no contact data, ever.**

```
1. Confirm locationId resolves (one test API call)
2. Fetch pipelines → store names + IDs + stage names only
3. Fetch tags → store tag names only (no counts, no contact associations)
4. Fetch custom fields → store field names + IDs only
5. Note account name + timezone
6. Write to memory/ghl-memory.md
7. Log: "First Run Discovery complete — [date]"

STOP. Do not fetch contacts.
Do not fetch opportunities.
Do not fetch conversations.
That data is always pulled live when needed — never cached.
```

---

### On Every Session End — DO THIS LAST
Before finishing any session, run the **Memory Update Loop**:

```
Step 1: LEARN (schema only — never contact data)
  - Did I discover a new pipeline, stage, tag name, or custom field? → Add to memory
  - Did I find a new account quirk worth remembering? → Add to Learned Behaviors
  - Did any API call fail in an instructive way? → Note it
  → NEVER write contact records, opportunity details, or conversation data to memory

Step 2: EVALUATE
  - Did anything I assumed (from memory) turn out to be wrong?
  - Are any pipeline stages, tag names, or IDs I used now invalid?
  → Flag stale entries in the "Stale Flags" section

Step 3: REFLECT
  - Did this session reveal a better way to do a common task?
  - Is there a workflow pattern I should document for next time?
  → Add to "Learned Behaviors" if worth keeping

Step 4: LOG
  - Append one line to the Session Log: date + one-sentence summary
  → Example: "2025-03-29 | Pulled 47 contacts, tagged 12 as 'webinar-march', discovered new pipeline 'Enterprise'"

Step 5: UPDATE TIMESTAMP
  - Update "Last Updated" at the top of memory.md
```

---

### Periodic Re-Verification (every 7 days)
GHL data changes. Pipelines get renamed, tags get deleted, custom fields get added. If the last verification was >7 days ago:

```
1. Re-fetch pipelines list → compare to memory.md → update any changes
2. Re-fetch tags list → add new tags, flag deleted ones
3. Re-fetch custom fields → update any name/ID changes
4. Clear resolved items from "Stale Flags"
5. Update "Last Verified Against Live GHL Data" timestamp
```

You don't need to do this all at once — if the user asks for a contact task, re-verify contacts-related data. If they ask about pipelines, re-verify pipeline data. Spread it naturally across sessions.

---

## Self-Evaluation Checklist
Run this at the end of every session before signing off:

- [ ] Did I read memory.md before starting?
- [ ] Did I use cached IDs where available (didn't re-fetch unnecessarily)?
- [ ] Did I update memory.md with anything new I learned?
- [ ] Did I flag anything that might be stale?
- [ ] Did I log this session in the Session Log?
- [ ] Is my output clear — did I tell the user exactly what was done?
- [ ] Did I follow all the Rules below (no sends/deletes without confirmation)?

If any box is unchecked — fix it before finishing.

---

## Rules

- Never ask for locationId mid-task if it's resolvable from context
- Never send SMS/email without explicit user confirmation
- Never delete records without explicit user confirmation
- Never bulk-operate (50+ records) without confirming count first
- Always fetch before update — never update by name alone
- Never fabricate contact IDs, pipeline IDs, or opportunity IDs
- Always report what you did and what changed

---

## MCP Server Details

- **Endpoint**: `https://services.leadconnectorhq.com/mcp/`
- **Auth**: Bearer token via `Authorization` header (set in Claude Code MCP config)
- **locationId**: Passed as a tool parameter on each relevant call
- **Scope**: Tied to the sub-account matching the locationId

---

## Packaging Note (for VCI / Distribution)

This skill is designed to be dropped into any GHL agent project. To install:

1. Place this file at `skills/ghl-agent/SKILL.md` in your project
2. Add `GHL_LOCATION_ID` and `GHL_PIT_TOKEN` to your `.env`
3. Ensure the GHL MCP is configured in `.claude.json` (see setup SOP)
4. Reference the skill in your project `CLAUDE.md` skills table

The agent will handle locationId injection automatically — students never need to type it again after initial setup.
