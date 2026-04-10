# Current Projects Status

*Last Updated: April 8, 2026 (Q2 quarterly planning + Flint bi-weekly)*

---

## Q2 Goals (April -- June 2026)

Set at the April 7 quarterly planning meeting:

| Goal | Target | Notes |
|---|---|---|
| Valuations | 15 (ramp to 30-40 by Q4) | ~1/week now |
| M&A Engagements | 2 | John leading west side; Europe deal under research |
| AI Agents | 6 new by end of June | Hugo's goal, 1 every ~2 weeks |
| Value Builder Surveys | 25 | E-book funnel + Smart Flow |
| Active Exit Planning Clients | 3 additional by end of June | First prospect meeting scheduled |
| CEPA Outreach Emails | 1,000 | Jan/Feb/March graduating classes; 50% opt-in target |

---

## 1. SBV Website (PRIMARY -- NEAR LAUNCH)

**Status:** Near launch -- pending Register.com DNS access from Gary
**Priority:** Critical -- Facebook campaign blocked until site is live
**Hard Deadline:** ~April 22, 2026 (Flint confirmed 2-week window on April 8 call)
**Local path:** /Users/hugolacerda/Desktop/hugo-demos/SBV_draft/
**Notion doc:** https://www.notion.so/327f99c396de8102b782fbc922ac258d

### Overview
Full 7-page static site built in SBV_draft. Gary approved going live on April 8.
No longer on Squarespace -- migrating to Netlify (free static hosting).

### Hosting Plan
1. Deploy SBV_draft to Netlify (free, drag-and-drop deploy)
2. Gary provides Register.com login credentials
3. Hugo updates DNS A record at Register.com to point to Netlify
4. Confirm new site is live on the domain
5. Disconnect domain in Squarespace settings
6. Gary cancels Squarespace plan

**Blocker:** Hugo does not have Register.com access. Gary needs to provide it.
Domain is registered at Register.com (owned by Gary since before Squarespace).
DNS currently points to Squarespace.

### Completed
- All 7 pages built: Homepage, Valuations, Exit Planning, Advisory, Insights, About, Contact
- Shared CSS architecture (main.css + per-page CSS files)
- Real assets: SBV_logo.webp, team photos, 8KeyDriversEbook.png, credential logos
- Blog images mapped from blog-imgs/ folder (matching live Squarespace filenames)
- Navigation dropdown with subheadings (Flint approved)
- Globe watermark on segmentation section
- Team photo hover tooltips with name, role, bio
- Hero CTA alignment fixed
- All CTA buttons changed to "Speak with a Certified Expert"
- Segmentation section reordered and rewritten per Gary's direction
- Credential labels updated: CVA & CEPA Certified

### Remaining Before Launch
- Gary's content copy (committed by April 4 -- confirm received)
- "Three things we do differently" copy update (communicate WHY strategic = more than a number)
- Micro-affirmation icon strip copy (three items in hero -- needs Gary confirmation)
- Segmentation Card 2 exact heading (directional notes given, not locked)
- Register.com DNS access from Gary
- DALL-E images for 3 placeholder pages (valuations.html hero, exit.html hero, advisory.html two-col)
- Valuation Professional article thumbnail (800x360)
- Contact form: contact.js stub awaiting GHL connection (can launch without it)

### Post-Launch
- Cancel Squarespace plan (Gary to handle)
- Connect GHL to contact form
- Revisit hosting question during GHL walkthrough (GHL may host pages long-term)

---

## 2. GHL (GoHighLevel) CRM (ACTIVE TRIAL)

**Status:** Trial active as of April 7, 2026 ($90/month, 14-day trial)
**Priority:** High -- must be configured before Facebook campaign launches
**Notion doc:** https://www.notion.so/327f99c396de8107b617d06a11405673
**Full reference:** KB_10_GHL_CRM.md

### Overview
GHL is replacing Pipeline CRM. Trial demoed live at Q2 quarterly. Gary wants a full
walkthrough next week. Two sub-accounts needed: GBA and SBV.

### Key Use Cases (Priority Order)
1. SBV contact form destination (contact.js stub ready to connect)
2. Facebook Lead Ads receiving pipeline (required before Flint's campaign)
3. Automated lead nurture sequences
4. Calendly replacement (TBD during trial)
5. SmarterQueue replacement for social scheduling (TBD during trial -- Nancy pays ~$400/year)
6. Client portals as value-add for SBV clients (future)

### Next Steps
- Schedule GHL walkthrough with Gary (next week)
- Schedule onboarding call (included in trial)
- Prepare video tutorials of core features before walkthrough
- Confirm sub-account architecture for GBA + SBV
- Wire SBV contact form to GHL
- Configure Facebook Lead Ads integration before campaign launches

---

## 3. Facebook Campaign (PENDING -- NEAR TERM)

**Status:** Strategy being developed -- launches after SBV site goes live
**Priority:** High
**Dependency:** SBV site live AND GHL configured to receive leads

### Overview
Flint's team is developing the Facebook advertising strategy. Leanna (former attorney,
15 years mastering Facebook, teaches globally) is the lead Facebook strategist in Flint's
group. Meeting between Flint and Leanna happened April 8.

### Two Approaches Being Tested
1. Landing page lead gen -- drive to a page, get them to raise their hand (ideal but hard)
2. Drive to an event -- Gary or Nancy speaks on business valuation, harvest leads from
   registrants and attendees

### Lead Quality Tiers (Flint's Framework)
- D lead: Registered for event
- C lead: Showed up
- B lead: Unlocked the tool
- A lead: Completed the assessment

### Valuation Range Tool
Flint built an HTML tool that asks financial foundation questions + value driver questions,
runs a scoring engine, and outputs a value RANGE (not specific number) to drive conversion
to consultation. Flint is sending this HTML file to Gary. Potential uses:
- Facebook lead magnet
- Embedded ADS inside SBV site
- Internal Nancy tool
- Standalone lead gen page

### NGF Target
Net Growth Factor = Average Customer Value minus Customer Acquisition Cost. Any positive
NGF means pour more into the channel. Gary and Flint will establish target numbers once
the campaign has initial data.

---

## 4. MeclabsAI ADS Implementations

**Status:** Active
**Priority:** High

### SBV ADS Agent (Business Value Navigator)
- **Status:** Live on site, active
- **Transcript analysis:** 19 users, 120 interactions in first 2.5 weeks (~61 were Hugo
  testing). High engagement ratio from real users.
- **Action needed:** Configure transcript analysis email delivery in MeclabsAI.
  Path: Analytics > Transcript Analysis > Generate Analysis > set up email schedule.
  Gary wants daily reports once volume picks up; weekly for now.

### GBA Industry Insider Agent
- **Status:** Live demo -- avatar pending upload, Chuck integration pending
- **Demo:** https://hugolacerda.github.io/hugo-demos/gba/industry-advisor/
- **Expert prompt:** Version 4, benchmarked through 3 rounds
- **Pending:** Gary to select avatar from archetype folder; update Trigger Card Title
  from "Market Pulse" to "Industry Insider" in widget settings; Round 4 benchmark
  optional but recommended before live GBA site embed
- **Full reference:** KB_06_INDUSTRY_ADVISOR_EXPERT.md

### GBA General Site Agent
- **Status:** Concept confirmed, not yet built
- **Priority:** High (needed for GBA site launch alongside Industry Insider)
- **Pending:** Gary to select avatar; define Expert prompt and behavior; build Expert,
  App, and Widget; confirm Quinn on page-restriction capability

---

## 5. AI Agent Development (Q2 Goal: 6 New Agents)

**Status:** Active -- process documented, builds in queue
**Priority:** High
**Full reference:** KB_11_AGENT_DEVELOPMENT_PROCESS.md

Gary established the repeatable agent-building framework at the Q2 quarterly. All team
members were asked to send Hugo an email with their agent needs.

### Current Build Queue

| Agent | Type | Priority | Notes |
|---|---|---|---|
| SBV Report Narrative Writer (AUTO-02) | Internal/Material | High | Nancy's primary need; see AUTO-02 doc |
| GBA General Site Agent | ADS | High | Blocks GBA site launch |
| CIM Builder | Internal/Material | Medium | Gary demoed concept at quarterly; has sample CIMs |
| Financial Statement Variance Analyzer | Internal/Material | Medium | Compares income statement vs tax return |
| Marketing Analyst (production-ready) | ADS | Medium | Gary has given to 2-3 people; needs polish |
| Agent TBD from team wish list | TBD | TBD | Nancy and Amanda to submit requests |

**Note:** Existing deployed agents (SBV Business Value Navigator, GBA Industry Insider)
do not count toward the Q2 goal of 6 new agents.

### MeclabsAI Platform Updates (April 8)
- MCP server coming in ~1 month -- Hugo can connect directly from Claude to MeclabsAI
- Q2 UX overhaul ships publicly -- zero learning curve, full product lifecycle management
- Podcast Creator available in Advanced Apps -- auto-generates podcast from blog articles
- Taylor (Flint's PM) is gone; 85% of PM work replaced with agents

---

## 6. GBA Website (External Build)

**Status:** Active -- piecemeal revisions
**Priority:** Medium (Deal Studio deadline passed March 31; Gary accepted delay)
**Full reference:** KB_05_QUICK_REFERENCE.md for Chuck warranty details

Hugo's reference build: https://hugolacerda.github.io/hugo-demos/gba/site/

### Critical: Chuck's Warranty
The warranty is voided if independent code modifications are made via FTP. Hugo cannot
touch the codebase independently. All changes go through Gary to Chuck.

### Industry Insider Integration
- Widget lives on the industry page only (not site-wide)
- Chuck pastes embed script + small URL-detection inline script on the industry page
- Gary still needs to write surrounding copy for the industry page

---

## 7. SBV Automation Projects (Backlog)

All blocked on Nancy providing sample reports + NACVA doc. AUTO-01 is the prerequisite
for everything else.

| ID | Project | Notion Doc | Blocker |
|---|---|---|---|
| AUTO-01 | Branded Report Templates | https://www.notion.so/334f99c396de8139a003fea13d16c0f3 | Nancy samples + NACVA doc |
| AUTO-02 | Report Narrative Agent | https://www.notion.so/334f99c396de81ec9ee5c7133f1e8823 | BUILD as MeclabsAI structured intake App. AUTO-01 first. |
| AUTO-03 | Single-Entry Client Onboarding | https://www.notion.so/334f99c396de81f49f4ff663fb1460d1 | GHL trial needed first |
| AUTO-04 | Excel-to-Word Financial Table | https://www.notion.so/334f99c396de81619d00ed07828f8ac1 | AUTO-01 first |
| AUTO-05 | Branded Non-Certified Report | https://www.notion.so/334f99c396de814eb9d6f3447ed6fa04 | AUTO-01 first |
| AUTO-06 | Document Collection Portal | https://www.notion.so/334f99c396de8135a6dfdfbe9b40d3a9 | SecureSync cleanup first |

---

## 8. CEPA Outreach Campaign

**Status:** List-building in progress
**Priority:** High (Q2 goal: 1,000 emails, 50% opt-in target)

### Overview
Target: newly certified CEPAs from January/February/March 2026 graduating classes.
~85% of CEPAs are wealth advisors -- the key referral target for SBV valuations.

### Email Sourcing Challenge
EPI database does not expose email addresses at the basic membership tier. Options:
- Manual extraction from EPI database (slow)
- LinkedIn congratulatory outreach (less salesy approach)
- Upgrade EPI membership for email data access
- Research EPI API/export capability (Hugo to investigate)

**Amanda** owns list-building. Hugo to research EPI database automation.

### Outreach Message
Congratulate them on their CEPA certification. Introduce SBV as the valuation and exit
planning specialist they can work alongside. Focus on how SBV helps their business owner
clients -- not on selling to the wealth advisor directly.

---

## 9. LinkedIn Professional Services Marketing

**Status:** Strategy defined -- activation in progress
**Priority:** High (Q2)

### Overview
Gary is the public face. Nancy stepping back from active LinkedIn presence.
O'Shane handling outreach campaigns.

### Focus Areas
- CPAs, estate planning attorneys, and wealth advisors (professional services referral targets)
- CEPA-certified wealth advisors (intersection with CEPA outreach campaign)
- Business owners as secondary audience

### Content Strategy
Ongoing posts with Value Builder content, e-book promotion, survey invitations.
SmarterQueue currently used for scheduling; GHL may replace it.

---

## 10. MeclabsAI Library -- KB Integration (NEW PROJECT IDEA)

**Status:** Concept -- not yet started
**Priority:** Medium (Q2/Q3)
**Notion doc:** https://www.notion.so/33df99c396de81c9a7a2c8b2bb7ffd8b

### Overview
Connect the KB files and SBV/GBA methodology documents to MeclabsAI Libraries so every
agent built on the platform draws from grounded, SBV-specific knowledge rather than
general training data. Flint's MeclabsAI MCP server (coming ~1 month) will make this
significantly more efficient.

---

## 11. Net Proceeds Calculator

**Status:** Built and live on demo
**Priority:** Active -- ready to share with Gary
**Demo:** https://hugolacerda.github.io/hugo-demos/gba/net-proceeds/

Pending: Gary's booking link for the CTA button; decision on where it lives on the GBA site.

---

## 12. SBV Facebook Profile Cleanup

**Status:** Pending credentials
**Priority:** Active -- needed before Flint's campaign launches
**Priority order:** SBV Facebook first, GBA Facebook second.

Pending: Login credentials for SBV Facebook page from Gary.

---

## 13. Light to the Nations Ministry (ACTIVE)

**Status:** Active -- waiting on credentials
**Priority:** Medium (separate from GBA/SBV work)
**Full reference:** KB_07_HARRYS_MINISTRY.md

Waiting for Gary to send Harry's login credentials. Hours tracked separately from GBA/SBV.
Morris is the primary funder.

---

## 14. Video Content

**Status:** Concept confirmed -- Gary willing and easy to capture
**Priority:** Low-medium (Q2/future)

Gary: "Honestly if I just took the audio and fed it through an AI I have a podcast already."
No format or plan confirmed yet.

---

## Future / Backlog

- GBA General Site Agent (blocked on avatar selection + Quinn confirmation on page restrictions)
- Exit-Window Marketing Audit (awaiting Gary's direction -- ADS vs custom build vs neither)
- Website builds for SBV/GBA clients with no web presence (Gary floated at quarterly)
- Agent-as-a-service offering for clients ($5,000-$10,000 range per build)
- AEO/GEO content presence on Reddit, Quora, TikTok (Q3 -- after sites optimized)
- CEPA LinkedIn outreach campaign (O'Shane handles LinkedIn side)
- ADS for marketing analyst deployment (Bernadette / Alyanna -- context TBD)
- Video content series / podcast (Gary is a natural on camera)

---

## Project Tracking

**Notion database:** https://www.notion.so/42cde02da93448a3be7b4dd400c086b4
