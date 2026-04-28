# Current Projects Status

*Last Updated: April 28, 2026 (L10 meeting + MeclabsAI enterprise call)*

---

## Q2 Goals (April -- June 2026)

Set at the April 7 quarterly planning meeting:

| Goal | Target | Notes |
|---|---|---|
| Valuations | 15 (ramp to 30-40 by Q4) | ~2/week now. Nancy added Rise Up Legal + restaurant referral (Kendra) |
| M&A Engagements | 2 | John leading west side; Europe deal (Kia/Neha) under research |
| AI Agents | 6 new by end of June | Hugo's goal. Marketing Analyzer counts as 1. |
| Value Builder Surveys | 25 | E-book funnel + Smart Flow. Amanda reactivating Gary's paused contacts. |
| Active Exit Planning Clients | 3 additional by end of June | Rusty (Global Laundry) is first consulting engagement |
| CEPA Outreach Emails | 1,000 | Jan/Feb/March graduating classes; 50% opt-in target |

---

## 1. SBV Website (LIVE)

**Status:** LIVE at strategicbusinessvaluations.com
**Priority:** Ongoing maintenance
**Local path:** /Users/hugolacerda/Desktop/hugo-demos/sbv/
**Notion doc:** https://www.notion.so/343f99c396de81a99640c519a7dc96f6

### Hosting
- Live site: Netlify free tier, auto-deploy from GitHub repo (hugolacerda/hugo-demos), sbv folder
- DNS: Managed via Network Solutions (not Register.com — verified via RDAP)
- SSL: Let's Encrypt via Netlify, auto-renews
- Staging: `staging` branch on GitHub deploys to `staging--sbv.netlify.app`
  - All SBV changes go to staging first, Gary reviews, then merge to main

### Workflow (staging → production)
```bash
git checkout staging
git add sbv/[file]
git commit -m "description"
git push
# Review at staging--sbv.netlify.app
# When approved:
git checkout main && git merge staging && git push
```

### Pending on staging (not yet merged to main)
- Valuations pricing: Accelerate $5,500, Certified $7,500 (confirmed by Gary and Nancy April 9, re-confirmed April 28)
- privacy.html and terms.html: Draft legal pages pending Gary attorney review
- Contact page: Already shows Nancy's office line (904) 667-8122 — correct

### Post-launch items
- Marketing Analyzer page: Gary wants it embedded in SBV site with no nav link
- Contact form (contact.js stub): needs GHL connection
- Legal pages: pending attorney approval before publishing to main

---

## 2. GHL (GoHighLevel) CRM (ACTIVE)

**Status:** Active — trial converted, SBV sub-account in use
**Priority:** High
**Notion doc:** https://www.notion.so/327f99c396de8107b617d06a11405673
**Full reference:** KB_10_GHL_CRM.md

### Architecture (confirmed)
- Agency account (Hugo manages)
- SBV sub-account: `ETrWQNJ5xzOqQPGGXk5a` — active
- GBA sub-account: to be configured

### Pipelines Built (SBV)
| Pipeline | ID |
|---|---|
| SBV: Outreach & Lead Gen | `4dlocepdwaCqnS60Db3M` |
| SBV: Valuation Delivery | `KmgopAIb10oisDtGbWHf` |

### Workflows Built
| Workflow | ID | Status |
|---|---|---|
| SBV — Stage 3: Client Engagement Onboarding | `64e6f3cc-7c12-421d-82ab-69ae878ff4aa` | Draft — partially complete |

Workflow 1 has: trigger (Pipeline Stage Changed → Client Engagement), Email 1 (Welcome), Email 2 (Deposit Invoice). Remaining steps: Wait 1 day → Email 3 (Value Builder Survey) → Wait 1 day → Email 4 (Document Checklist) → Create Task.

### 5 open items before Workflow 1 goes live
1. eSignature: switch from Adobe Sign (monthly — can cancel) to DocuSign for better GHL integration
2. QuickBooks credentials from Nancy
3. Report delivery method confirmed (email attachment vs. SecureSync)
4. Booking link decision: GHL calendar or Calendly?
5. Engagement letter format: one GHL template or manual PDF per client?

### Contacts
- Rusty (Global Laundry): Nancy's first GHL contact. Needs Friday follow-up task.
- Liana Ling (liana@powerupstrategy.com): Has GHL access — added April 23

### Key IDs
- Location ID: `ETrWQNJ5xzOqQPGGXk5a`
- PIT Token: `pit-9bc7ec1d-6228-42c7-9110-f01665fabeb6`
- Registration Form ID: `CmXMqIBQdAlRSBZpALih`
- GHL Facebook Funnel ID: `PPZ1GsupRV539ASNFqEh`
- Workflow Automation Plan (Notion): https://www.notion.so/34ef99c396de81fc94f5db198ace3941
- Nancy Workflow Plan (Notion): https://www.notion.so/34cf99c396de8113832bc685db196bb4

---

## 3. Facebook Campaign (ACTIVE — PRE-LAUNCH)

**Status:** Landing page built. Pre-campaign warm-up in progress. Ads not yet running.
**Priority:** High
**Lead:** Liana Ling (liana@powerupstrategy.com) — external agency, not Flint's team
**Dependency:** Legal pages approved → GHL funnel finalized → ads launch

### New Direction (L10 April 28)
Run webinar for existing warm Value Builder contacts (600-700 people) BEFORE spending on paid Facebook ads. Test the content and format with a warm audience first. Amanda to reactivate Gary's paused nurture contacts (same process as Nancy's).

### Liana's Pre-Launch To-Do List
1. CTA button text: change "Button" → "Reserve Your Spot" in GHL form editor
2. Privacy/terms links: currently point to example.com — waiting on Gary attorney approval
3. URL slug: change from generic slug to "business-value-workshop"
4. Landing page copy: Gary's approved copy (sent April 23) needs to be incorporated
5. Thank You page: build with Gary's copy + survey field ("What's the #1 thing you want to get from this workshop?")
6. Funnel end-to-end test: confirm form submission → contact added to GHL → confirmation email fires
7. Meta Business Manager partner access: Gary must grant Liana access to ad account, Facebook page, and dataset

### Landing Page (built in GHL — custom HTML)
- Funnel ID: `PPZ1GsupRV539ASNFqEh`
- Step: Landing Page + Thank You Page
- Current issue: Full-width CSS override needed (GHL wrapper constrains width)
- Gary's approved copy: headline "Is Your Business Worth What You Think It Is?", subheadline, What You'll Learn (5 bullets), Who This Is For (3 bullets), tone-setting paragraph, CTA "Reserve Your Spot"

### Pre-Campaign Warm-Up (per L10 April 28)
- Nancy to release queued SmarterQueue posts to warm up SBV Facebook page (274 followers, last post Jan 28)
- Every post must be run through MECLABS (Marketing Analyzer) before release
- Gary dropped top 10 FAQ questions into MeclabsAI and requested blog posts for social — shared link with team
- Post every third day
- Hugo asked Amanda for SmarterQueue login to audit queued content

### Webinar Dates (Gary proposed)
May 14 (Thurs), May 16 (Sat), May 19, 21, 22 (Tues-Thurs). No date confirmed. Liana needs 2 weeks of ad run time before the webinar.

### Video Clips
Gary approved Hugo filming him delivering the webinar content solo for short-form video clips (social media, shorts). Gary comfortable on camera. Schedule a filming session.

---

## 4. Marketing Analyzer (BUILT — BUGS BEING FIXED)

**Status:** Built, deployed to GitHub Pages. Three bugs identified and fixed. Awaiting final push.
**Priority:** High
**Demo:** https://hugolacerda.github.io/hugo-demos/market-analyzer/
**Notion doc:** https://www.notion.so/34ff99c396de81d3886bf23763d5aa7e

### MeclabsAI Assets
| Component | ID |
|---|---|
| Expert | Marketing Analyzer |
| App | `SeeCEgerdwMRABOWH7UC` |
| Widget | `prggLO7YjTahW0ATOD8S` |

### Bug History
- Bug 1: CSS wildcard `[id^="meclabs-ai-widget"]` collapsed modal to zero height
- Bug 2: `window.AIWidget.openAIWidget()` doesn't exist — onclick silently failed
- Bug 3 (April 28): `display: none !important` on trigger button prevented modal from positioning — backdrop appeared but chat window was invisible. Fixed by moving btn off-screen with `position: fixed; bottom: -999px` instead of display:none.

### To deploy fix
```bash
# Download fixed index.html from Claude outputs
# Replace: /Users/hugolacerda/Desktop/hugo-demos/market-analyzer/index.html
git add market-analyzer/index.html
git commit -m "Fix Marketing Analyzer widget trigger"
git push
```

### Pending
- Expert prompt tweak: add instruction to proceed with stated assumptions when optional fields are blank (don't ask follow-up questions)
- Gary wants to review on a Zoom call after he finishes GBA content
- Final home TBD: Gary likely wants it embedded in SBV site with no nav link
- Note: MeclabsAI GenUI update (week of April 28) may affect widget behavior — test after deploying

---

## 5. MeclabsAI ADS Implementations

**Status:** Active
**Priority:** High

### SBV ADS Agent (Business Value Navigator)
- **Widget ID:** `au2pzSqFSbYBqi0KMkzJfI3F`
- **Status:** Live on strategicbusinessvaluations.com (site-wide)
- **Action needed:** Configure transcript analysis email delivery. Path: Analytics > Transcript Analysis > Generate Analysis > set up email schedule.

### GBA Industry Insider Agent
- **Status:** Live demo — avatar pending upload, Chuck integration pending
- **Demo:** https://hugolacerda.github.io/hugo-demos/gba/industry-advisor/
- **Widget ID:** `y1nDqm0lbalGkdYGSmzXkQfC`
- **Expert prompt:** Version 4, benchmarked through 3 rounds
- **Pending:** Gary to select avatar; update Trigger Card Title from "Market Pulse" to "Industry Insider" in widget settings; Round 4 benchmark recommended before live GBA site embed
- **Full reference:** KB_06_INDUSTRY_ADVISOR_EXPERT.md

### GBA General Site Agent
- **Status:** Concept confirmed, not yet built
- **Priority:** High (needed for GBA site launch alongside Industry Insider)
- **Pending:** Gary to select avatar; define Expert prompt; build Expert, App, and Widget; confirm Quinn on page-restriction capability

### Marketing Analyzer
- See Section 4 above.

### MeclabsAI Platform Updates (April 28 enterprise call)
- **GenUI (Smart Display Responses):** OFF by default on ADS but ON automatically on the homepage. Must be explicitly enabled per ADS. If experts behave differently after the week of April 28 update, this is likely the cause. Control output via the GenUI instructions field in expert settings.
- **Inline form generation:** Expert can generate forms mid-conversation and capture contact data. New "Chat Contacts" section in Analytics captures submissions. Email notification and webhook coming end of week of April 28.
- **New file formats:** DOCX, PowerPoint, XLSX now supported uploads. Gary's "only PDFs" limitation is resolved.
- **MCP server:** Confirmed still coming — monitor and connect as soon as available.

---

## 6. AI Agent Development (Q2 Goal: 6 New Agents)

**Status:** Active — 1 built (Marketing Analyzer), 5 remaining
**Priority:** High
**Full reference:** KB_11_AGENT_DEVELOPMENT_PROCESS.md

### Current Build Queue

| Agent | Type | Priority | Status | Notes |
|---|---|---|---|---|
| Marketing Analyzer | ADS | High | Built — bugs fixed | Counts as Q2 agent #1 |
| SBV Report Narrative Writer (AUTO-02) | Internal/Material | High | Backlog | Nancy's primary need; blocked on AUTO-01 |
| GBA General Site Agent | ADS | High | Backlog | Blocks GBA site launch |
| CIM Builder | Internal/Material | Medium | Backlog | Gary demoed concept at quarterly |
| Financial Statement Variance Analyzer | Internal/Material | Medium | Backlog | Compares income statement vs tax return |
| Agent TBD | TBD | TBD | Backlog | Nancy and Amanda to submit requests |

**Note:** Existing deployed agents (SBV Business Value Navigator, GBA Industry Insider) do not count toward the Q2 goal of 6 new agents.

---

## 7. GBA Website (External Build)

**Status:** Active — piecemeal revisions
**Priority:** Medium
**Full reference:** KB_05_QUICK_REFERENCE.md for Chuck warranty details

Hugo's reference build: https://hugolacerda.github.io/hugo-demos/gba/site/

### Critical: Chuck's Warranty
The warranty is voided if independent code modifications are made via FTP. Hugo cannot touch the codebase independently. All changes go through Gary to Chuck.

### Industry Insider Integration
- Widget lives on the industry page only (not site-wide)
- Chuck pastes embed script + small URL-detection inline script on the industry page
- Gary still needs to write surrounding copy for the industry page

---

## 8. SBV Automation Projects (Backlog)

All blocked on Nancy providing sample reports + NACVA doc. AUTO-01 is the prerequisite for everything else.

| ID | Project | Notion Doc | Blocker |
|---|---|---|---|
| AUTO-01 | Branded Report Templates | https://www.notion.so/334f99c396de8139a003fea13d16c0f3 | Nancy samples + NACVA doc |
| AUTO-02 | Report Narrative Agent | https://www.notion.so/334f99c396de81ec9ee5c7133f1e8823 | AUTO-01 first |
| AUTO-03 | Single-Entry Client Onboarding | https://www.notion.so/334f99c396de81f49f4ff663fb1460d1 | GHL trial needed first |
| AUTO-04 | Excel-to-Word Financial Table | https://www.notion.so/334f99c396de81619d00ed07828f8ac1 | AUTO-01 first |
| AUTO-05 | Branded Non-Certified Report | https://www.notion.so/334f99c396de814eb9d6f3447ed6fa04 | AUTO-01 first |
| AUTO-06 | Document Collection Portal | https://www.notion.so/334f99c396de8135a6dfdfbe9b40d3a9 | SecureSync cleanup first |

---

## 9. SBV Legal Pages (Pending Attorney Review)

**Status:** Draft on staging — pending Gary's attorney review
**Priority:** High (Meta requires working privacy policy link before Facebook ads can run)
**Notion doc:** https://www.notion.so/34ff99c396de81e4aa9bd1545c7aed5d

| Page | Staging URL |
|---|---|
| Privacy Policy | https://69eff6a1dccf5c000817668e--sbv.netlify.app/privacy |
| Terms of Use | https://69eff6a1dccf5c000817668e--sbv.netlify.app/terms |

**Gary's feedback (L10 April 28):** Add Value Builder and MeclabsAI to Section 5 (third-party tools). Agreed attorney review makes sense. Confirmed he read both.

**Before publishing:**
1. Gary sends to attorney
2. Attorney approves / requests changes
3. Hugo removes draft notice from both pages
4. Merge to main → live at strategicbusinessvaluations.com/privacy.html and /terms.html
5. Update GHL landing page footer links (currently point to example.com)

---

## 10. CEPA Outreach Campaign

**Status:** List-building in progress
**Priority:** High (Q2 goal: 1,000 emails, 50% opt-in target)

Amanda owns list-building. Hugo to research EPI database automation. O'Shane handles LinkedIn side.

---

## 11. AEO/Content — Top 10 FAQ Series

**Status:** In progress — Gary started in MeclabsAI, shared link with team
**Priority:** High (feeds Facebook warm-up and AEO strategy)

Gary dropped top 10 FAQ questions (optimized for AEO) into MeclabsAI Marketing Genius with prompt to generate blog posts for social media. Every post must be run through Marketing Analyzer before publishing. Post every third day.

Hugo to work with Amanda on the blog post series using Gary's shared MeclabsAI conversation. MECLABS can also generate image recommendations per post.

---

## 12. Net Proceeds Calculator

**Status:** Built and live on demo
**Demo:** https://hugolacerda.github.io/hugo-demos/gba/net-proceeds/

Pending: Gary's booking link for CTA button; decision on where it lives on the GBA site.

---

## 13. Video Content

**Status:** Greenlit (L10 April 28)
**Priority:** Medium

Gary confirmed comfortable being filmed delivering the webinar solo for social media clips. Hugo offered camera. Gary said yes. Schedule a filming session around the Jim Moran Institute presentation (next Tuesday). Output: short-form clips for Facebook warm-up, AEO content.

---

## 14. Light to the Nations Ministry

**Status:** Active — waiting on credentials
**Priority:** Medium (separate from GBA/SBV work)
**Full reference:** KB_07_HARRYS_MINISTRY.md

Waiting for Gary to send Harry's login credentials. Hours tracked separately. Morris is the primary funder.

---

## 15. LinkedIn Professional Services Marketing

**Status:** Strategy defined — activation in progress
**Priority:** High (Q2)

Gary is the public face. Nancy stepping back from active LinkedIn presence. O'Shane handling outreach campaigns. Focus: CPAs, estate planning attorneys, wealth advisors (professional services referral targets), CEPA-certified wealth advisors.

---

## Future / Backlog

- GBA General Site Agent (blocked on avatar selection + Quinn page-restriction confirmation)
- Exit-Window Marketing Audit (awaiting Gary's direction)
- Website builds for SBV/GBA clients with no web presence (Gary floated at quarterly)
- Agent-as-a-service offering for clients ($5,000-$10,000 range per build)
- AEO/GEO presence on Reddit, Quora, TikTok (Q3)
- Katie Milton Jordan follow-up: custom eSignature AI agent for $20/month — Gary has call scheduled, wants Hugo to research her LinkedIn post
- MeclabsAI Library project — when to start (after SBV legal pages and GHL stable)
- GHL social scheduling as SmarterQueue replacement (when SmarterQueue yearly subscription renews)

---

## Project Tracking

**Notion database:** https://www.notion.so/42cde02da93448a3be7b4dd400c086b4
