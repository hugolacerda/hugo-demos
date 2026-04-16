# Current Projects Status

*Last Updated: April 15, 2026 — SBV site launched, Netlify migration complete*

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

## 1. SBV Website -- LIVE

**Status:** LIVE as of April 15, 2026
**URL:** https://strategicbusinessvaluations.com
**Local path:** /Users/hugolacerda/Desktop/hugo-demos/sbv/
**GitHub repo:** hugolacerda/hugo-demos (subfolder: sbv/)
**Notion project doc:** https://www.notion.so/327f99c396de8102b782fbc922ac258d
**Hosting & deployment reference:** https://www.notion.so/343f99c396de81a99640c519a7dc96f6

### Hosting Summary
- Hosted on Netlify (free tier), connected to GitHub for auto-deploy on push
- Domain registrar: Network Solutions (login: nehallett@gmail.com)
- SSL: Let's Encrypt via Netlify, auto-renews every 3 months
- Contact form: Netlify Forms routing to Gary@gatewaybusinessadvisors.com
- ADS agent: SBV Business Value Navigator embedded on all 7 pages
  (widget ID: au2pzSqFSbYBqi0KMkzJfI3F)

### Completed
- All 7 pages built and live: Homepage, Valuations, Exit Planning, Advisory,
  Insights, About, Contact, FAQ
- Shared CSS architecture (main.css + per-page CSS files)
- Real assets: SBV_logo.webp, team photos, 8KeyDriversEbook.png, credential logos
- Blog images mapped from blog-imgs/ folder
- Navigation dropdown with subheadings
- Favicon in place
- Netlify Forms wired to Gary's email
- MeclabsAI ADS agent embedded site-wide
- FAQ CSS class mismatch fixed (April 15, 2026)
- DNS cutover from Squarespace to Netlify complete
- SSL provisioned

### Post-Launch Backlog
- Gary to formally disconnect domain in Squarespace and cancel subscription
- Connect contact form to GHL (when GHL is configured) -- swap Netlify Forms
  email notification for GHL webhook. No code changes needed.
- Add canonical tags to blog posts
- Add FAQPage JSON-LD schema once Gary sends final FAQ content
- Replace placeholder hero images (valuations.html, exit.html, advisory.html)
  with final DALL-E images
- Valuation Professional article thumbnail (800x360)
- Future: GHL may host pages long-term -- revisit during GHL walkthrough

### Deploy Workflow
```
cd ~/Desktop/hugo-demos
git add sbv/
git commit -m "description"
git push
```
Netlify auto-deploys within ~30 seconds of push.

---

## 2. GHL (GoHighLevel) CRM -- ACTIVE TRIAL

**Status:** Trial active as of April 7, 2026 ($90/month, 14-day trial)
**Priority:** High -- must be configured before Facebook campaign launches
**Notion doc:** https://www.notion.so/327f99c396de8107b617d06a11405673
**Full reference:** KB_10_GHL_CRM.md

### Overview
GHL is replacing Pipeline CRM. Trial demoed live at Q2 quarterly. Gary wants a full
walkthrough next week. Two sub-accounts needed: GBA and SBV.

### Key Use Cases (Priority Order)
1. SBV contact form destination (replace Netlify Forms email notification with GHL webhook)
2. Facebook Lead Ads receiving pipeline (required before Flint's campaign)
3. Automated lead nurture sequences
4. Calendly replacement (TBD during trial)
5. SmarterQueue replacement for social scheduling (TBD during trial)
6. Client portals as value-add for SBV clients (future)

### Next Steps
- Schedule GHL walkthrough with Gary
- Schedule onboarding call (included in trial)
- Confirm sub-account architecture for GBA + SBV
- Wire SBV contact form to GHL (replace Netlify Forms notification with webhook)
- Configure Facebook Lead Ads integration before campaign launches

---

## 3. Facebook Campaign -- PENDING

**Status:** Strategy being developed -- launches after SBV site live + GHL configured
**Priority:** High
**Dependency:** SBV site LIVE (done) AND GHL configured to receive leads

### Overview
Flint's team is developing the Facebook advertising strategy. Leanna (former attorney,
15 years mastering Facebook) is the lead Facebook strategist.

### Two Approaches Being Tested
1. Landing page lead gen -- drive to a page, get them to raise their hand
2. Drive to an event -- Gary or Nancy speaks on business valuation, harvest leads

### Valuation Range Tool
Flint built an HTML tool that asks financial foundation + value driver questions and
outputs a value RANGE (not specific number) to drive consultation conversion.
Potential uses: Facebook lead magnet, embedded ADS inside SBV site, standalone lead gen.

---

## 4. MeclabsAI ADS Implementations -- ACTIVE

**Status:** Active
**Priority:** High

### SBV ADS Agent (Business Value Navigator)
- **Status:** Live on strategicbusinessvaluations.com (all 7 pages)
- **Widget ID:** au2pzSqFSbYBqi0KMkzJfI3F
- **Analytics:** 19 users, 120 interactions in first 2.5 weeks (~61 were Hugo testing)
- **Action needed:** Configure transcript analysis email delivery in MeclabsAI.
  Path: Analytics > Transcript Analysis > Generate Analysis > set up email schedule.

### GBA Industry Insider Agent
- **Status:** Live demo -- avatar pending upload, Chuck integration pending
- **Demo:** https://hugolacerda.github.io/hugo-demos/gba/industry-advisor/
- **Widget ID:** y1nDqm0lbalGkdYGSmzXkQfC
- **Expert prompt:** Version 4, benchmarked through 3 rounds
- **Pending:** Gary to select avatar; update Trigger Card Title from "Market Pulse"
  to "Industry Insider" in widget settings; Round 4 benchmark recommended before
  live GBA site embed
- **Full reference:** KB_06_INDUSTRY_ADVISOR_EXPERT.md

### GBA General Site Agent
- **Status:** Concept confirmed, not yet built
- **Priority:** High (needed for GBA site launch alongside Industry Insider)
- **Pending:** Gary to select avatar; define Expert prompt; build Expert, App, Widget;
  confirm Quinn on page-restriction capability

---

## 5. AI Agent Development -- Q2 Goal: 6 New Agents

**Status:** Active -- process documented, builds in queue
**Priority:** High
**Full reference:** KB_11_AGENT_DEVELOPMENT_PROCESS.md

### Current Build Queue

| Agent | Type | Priority | Notes |
|---|---|---|---|
| SBV Report Narrative Writer (AUTO-02) | Internal/Material | High | Nancy's primary need |
| GBA General Site Agent | ADS | High | Blocks GBA site launch |
| CIM Builder | Internal/Material | Medium | Gary demoed concept; has sample CIMs |
| Financial Statement Variance Analyzer | Internal/Material | Medium | Income stmt vs tax return |
| Marketing Analyst (production-ready) | ADS | Medium | Needs polish |
| Agent TBD from team wish list | TBD | TBD | Nancy and Amanda to submit |

**Note:** Existing deployed agents (SBV Business Value Navigator, GBA Industry Insider)
do not count toward the Q2 goal of 6 new agents.

### MeclabsAI Platform Updates (April 8)
- MCP server coming in ~1 month -- Hugo can connect directly from Claude to MeclabsAI
- Q2 UX overhaul ships publicly
- Podcast Creator available in Advanced Apps

---

## 6. GBA Website (External Build) -- ACTIVE

**Status:** Active -- piecemeal revisions
**Priority:** Medium
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

## 7. SBV Automation Projects -- BACKLOG

All blocked on Nancy providing sample reports + NACVA doc. AUTO-01 is prerequisite
for everything else.

| ID | Project | Notion Doc | Blocker |
|---|---|---|---|
| AUTO-01 | Branded Report Templates | https://www.notion.so/334f99c396de8139a003fea13d16c0f3 | Nancy samples + NACVA doc |
| AUTO-02 | Report Narrative Agent | https://www.notion.so/334f99c396de81ec9ee5c7133f1e8823 | Build in MeclabsAI. AUTO-01 first. |
| AUTO-03 | Single-Entry Client Onboarding | https://www.notion.so/334f99c396de81f49f4ff663fb1460d1 | GHL trial needed first |
| AUTO-04 | Excel-to-Word Financial Table | https://www.notion.so/334f99c396de81619d00ed07828f8ac1 | AUTO-01 first |
| AUTO-05 | Branded Non-Certified Report | https://www.notion.so/334f99c396de814eb9d6f3447ed6fa04 | AUTO-01 first |
| AUTO-06 | Document Collection Portal | https://www.notion.so/334f99c396de8135a6dfdfbe9b40d3a9 | SecureSync cleanup first |

---

## 8. CEPA Outreach Campaign -- ACTIVE

**Status:** List-building in progress
**Priority:** High (Q2 goal: 1,000 emails, 50% opt-in target)

### Overview
Target: newly certified CEPAs from January/February/March 2026 graduating classes.
~85% of CEPAs are wealth advisors -- the key referral target for SBV valuations.

### Email Sourcing Challenge
EPI database does not expose email addresses at basic membership tier. Options:
- Manual extraction from EPI database
- LinkedIn congratulatory outreach
- Upgrade EPI membership for email data access
- Research EPI API/export capability (Hugo to investigate)

**Amanda** owns list-building. Hugo to research EPI database automation.

---

## 9. LinkedIn Professional Services Marketing -- ACTIVE

**Status:** Strategy defined -- activation in progress
**Priority:** High (Q2)

Gary is the public face. Nancy stepping back from active LinkedIn presence.
O'Shane handling outreach campaigns.

---

## 10. MeclabsAI Library -- KB Integration

**Status:** Concept -- not yet started
**Priority:** Medium (Q2/Q3)
**Notion doc:** https://www.notion.so/33df99c396de81c9a7a2c8b2bb7ffd8b

Connect KB files and SBV/GBA methodology documents to MeclabsAI Libraries so every
agent draws from grounded, SBV-specific knowledge. Flint's MeclabsAI MCP server
(coming ~1 month) will make this significantly more efficient.

---

## 11. Net Proceeds Calculator -- BUILT

**Status:** Built and live on demo
**Demo:** https://hugolacerda.github.io/hugo-demos/gba/net-proceeds/

Pending: Gary's booking link for the CTA button; decision on where it lives on GBA site.

---

## 12. SBV Facebook Profile Cleanup -- PENDING

**Status:** Pending credentials
**Priority:** Active -- needed before Flint's campaign launches
**Priority order:** SBV Facebook first, GBA Facebook second.

Pending: Login credentials for SBV Facebook page from Gary.

---

## 13. Light to the Nations Ministry -- ACTIVE

**Status:** Active -- waiting on credentials
**Priority:** Medium (separate from GBA/SBV work)
**Full reference:** KB_07_HARRYS_MINISTRY.md

Waiting for Gary to send Harry's login credentials. Hours tracked separately.
Morris is the primary funder.

---

## 14. Video Content -- CONCEPT

**Status:** Concept confirmed -- Gary willing and easy to capture
**Priority:** Low-medium (Q2/future)

No format or plan confirmed yet.

---

## Future / Backlog

- GBA General Site Agent (blocked on avatar + Quinn confirmation on page restrictions)
- Exit-Window Marketing Audit (awaiting Gary's direction)
- Website builds for SBV/GBA clients with no web presence
- Agent-as-a-service offering ($5,000-$10,000 per build)
- AEO/GEO content presence on Reddit, Quora, TikTok (Q3)
- CEPA LinkedIn outreach campaign
- Video content series / podcast

---

## Project Tracking

**Notion database:** https://www.notion.so/42cde02da93448a3be7b4dd400c086b4
