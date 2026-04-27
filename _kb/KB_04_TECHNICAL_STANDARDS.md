# Technical Standards & Workflows

## Documentation Workflow

Every project should maintain parallel documentation in both Notion and Trello with cross-links.

### Notion (Detailed Documentation)
Used for:
- Full technical specifications
- Process documentation
- Asset inventories
- Decision reasoning
- How-tos and step-by-step instructions
- Logs of changes made to sites or projects

**Structure:**
- Project overview at top
- Table of contents for long docs
- Clear section headers
- Code blocks for technical details
- Tables for asset IDs and comparisons

### Trello (Project Tracking)
Used for:
- Current status at a glance
- Task tracking (when applicable)
- Quick links to demos and docs
- Team visibility

**Board:** MECLABS
**Link:** https://trello.com/invite/b/69912a923445fd4d5e490e45/ATTI09f9501126703bfa11c8babc85bc2924C9845D1A/meclabs

**Card Structure:**
- Status badge at top
- Overview section
- Links section (demos, Notion, assets)
- Current blockers/next steps

### Cross-Linking
Every Notion page should link to its Trello card.
Every Trello card should link to its Notion page.

---

## Nightly Email Updates to Gary

Hugo emails Gary at the end of each workday. Based on Hugo's actual email style:

### Characteristics
- **Conversational and friendly** — Gary was Hugo's friend before becoming his boss
- **Shows personality** — Humor is welcome, personal anecdotes are fine
- **Progress-focused** — What was accomplished, what was discovered
- **Technology showcase** — How MeclabsAI (or other tools) solved problems
- **Always includes links** — MeclabsAI conversation links, demos, documentation
- **Identifies issues** — Flags concerns discovered (like spam forms, SEO problems)
- **Suggests solutions** — Offers recommendations, not just problems
- **No em dashes** — Use commas or rephrase instead; em dashes don't reflect Hugo's writing style
- **No emojis** — Keep it plain text throughout

### Typical Structure
```
Hey Gary,

[Brief personal opener or acknowledgment if relevant]

[Main update on what was accomplished today]

[Links to MeclabsAI conversations, demos, or documentation]

[Any issues discovered and suggested solutions]

[Next steps or questions if needed]

[Hours attachment mention if applicable]

Thanks,
Hugo
```

### How Claude Can Help
Hugo prefers to write his own emails but may need help:
- Summarizing what was accomplished during a work session
- Articulating technical work in accessible terms
- Organizing multiple topics into a coherent update
- Generating full emails when explicitly requested

---

## AI Integration

### Primary: Claude API (Anthropic)
- Used for brainstorming, code generation, document creation
- Custom solutions when MeclabsAI isn't the right fit

### MeclabsAI Platform
- Used for MECLABS-specific marketing tools
- ADS Agents (website chatbots)
- Experts, Apps, and Widgets
- See KB_02_MECLABSAI_GUIDE.md for full details

---

## Technology Approach

**Philosophy:** Don't limit solutions to any specific stack. Be open to whatever technology is most optimized and efficient for the task at hand, as long as it:
1. Fits Gary's requirements (when specified)
2. Best serves the interpreted vision (when requirements aren't specified)

Hugo is a web developer with primarily frontend experience, so solutions will typically be web-based, but the specific technologies should be chosen based on the problem, not predetermined preferences.

---

## Demo Hosting

### Current: pCloud (filedn.com)
Hugo currently uses pCloud's public folder functionality for hosting demos.

**Pattern:**
```
https://filedn.com/lEMp35zyDdcjd62Gt1NDwuS/[ProjectFolder]/[file.html]
```

**Current demos:**
- Exit-Window ADS: `/MarketAnalyzer.html`
- Exit-Window V1: `/MarketingAnalyzer/index.html`
- SBV Assessment Widget: `/SBV_Assessment_Tool_Squarespace.html`

**Note:** Hugo isn't satisfied with pCloud for demo hosting and is open to brainstorming better solutions for dev sites and demos in the future.

### GBA Dev Site (External)
- URL: https://gba.consultprdevsites-18.com
- **Important:** This is owned by the external company building the GBA site, NOT by Hugo or Gary's team
- Will have a different URL when the site launches

---

## Asset Management

### MeclabsAI Assets
Always document:
- Component type (Expert, App, Widget)
- Name
- ID
- Dashboard link

**Format:**
| Component | Name | ID |
|-----------|------|-----|
| Expert | [Name] | `[ID]` |
| App | [Name] | `[ID]` |
| Widget | [Name] | `[ID]` |

### Widget Embed Codes
Always save the full embed snippet:
```html
<script async src="https://meclabsai.com/embed/chat.js?appId=[WIDGET_ID]"></script>
```

---

## Testing & QA

### Before Sharing with Gary
1. Test on mobile and desktop
2. Verify all links work
3. Check form submissions (if applicable)
4. Review copy for typos
5. Ensure assets load properly
6. Test in multiple browsers if possible

---

## Knowledge Base Updates

This knowledge base should be updated as projects evolve. Hugo may upload additional notes over time. When new information is provided:
- Integrate it into the appropriate knowledge base file
- Note what changed and when
- Flag any conflicts with existing documentation
