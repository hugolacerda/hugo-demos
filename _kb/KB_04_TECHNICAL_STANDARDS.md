# Technical Standards & Workflows

*Last updated: April 28, 2026*

## Gary Communication Rules (Standing)

- **No Notion links to Gary.** Gary cannot navigate Notion login screens. Send documents as PDF email attachments instead.
- **No em dashes** in any Gary-facing copy. Replace with commas, periods, or rephrased sentences.
- **All email drafts reviewed by Hugo** before sending on Gary's behalf.
- **Plain language** — no technical jargon, minimal copy.

---

## SBV Site — Staging Workflow

All SBV changes go to the `staging` branch before merging to `main` (live site).

```bash
# Work on staging
git checkout staging
git add sbv/[file] && git commit -m "description" && git push
# Preview at: https://69eff6a1dccf5c000817668e--sbv.netlify.app

# When Gary approves:
git checkout main && git merge staging && git push
```

**Critical CSS rules:**
- The `reveal` class must never be applied to above-the-fold or primary layout containers. Only to secondary sections genuinely below the fold. Applying it broadly causes blank pages on short-content pages.
- Email DNS records (MX, TXT, autodiscover, email CNAMEs) must never be touched during any DNS migration.

---

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
**Note:** Trello has been retired in favor of Notion's Kanban structure as of April 2026.
**Notion Project Tracker:** https://www.notion.so/42cde02da93448a3be7b4dd400c086b4

---

## Nightly Email Updates to Gary

Hugo emails Gary at the end of each workday. Based on Hugo's actual email style:

### Characteristics
- **Conversational and friendly** — Gary was Hugo's friend before becoming his boss
- **Shows personality** — Humor is welcome, personal anecdotes are fine
- **Progress-focused** — What was accomplished, what was discovered
- **Technology showcase** — How MeclabsAI (or other tools) solved problems
- **Always includes links** — Demo links, documentation
- **Identifies issues** — Flags concerns discovered
- **Suggests solutions** — Offers recommendations, not just problems
- **No em dashes** — Use commas or rephrase instead
- **No emojis** — Keep it plain text throughout
- **No Notion links** — Send documents as PDF attachments instead

### Typical Structure
```
Hey Gary,

[Brief personal opener or acknowledgment if relevant]

[Main update on what was accomplished today]

[Links to demos, staging previews, or attached PDFs]

[Any issues discovered and suggested solutions]

[Next steps or questions if needed]

Thanks,
Hugo
```

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
