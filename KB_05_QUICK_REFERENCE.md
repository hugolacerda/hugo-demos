# Quick Reference Card

*Last updated: April 8, 2026*

## Company URLs

| Company | Live Site | Notes |
|---------|-----------|-------|
| GBA | https://www.gatewaybusinessadvisors.com/ | New site being built by Chuck (external) |
| SBV | https://strategicbusinessvaluations.com/ | Migrating from Squarespace to Netlify -- pending DNS cutover |

---

## SBV Hosting Migration (In Progress)

**Current:** Squarespace (domain: strategicbusinessvaluations.com registered at Register.com)
**Target:** Netlify (free static hosting)
**Blocker:** Hugo needs Gary to provide Register.com login credentials

**Steps:**
1. Deploy SBV_draft to Netlify (free, drag-and-drop)
2. Gary provides Register.com access
3. Hugo updates DNS at Register.com to point to Netlify
4. Confirm new site loads on domain
5. Disconnect domain in Squarespace > Settings > Domains & Email
6. Gary cancels Squarespace plan

**Do NOT click "Start Transfer" in Squarespace** -- that would move domain registration
to Squarespace. Domain stays at Register.com.

---

## Demo Hosting

**GitHub Pages (current -- demos and reference builds):**
- Base URL: https://hugolacerda.github.io/hugo-demos/
- Repo: https://github.com/hugolacerda/hugo-demos
- Local path: /Users/hugolacerda/Desktop/hugo-demos/
- Push workflow: `git add . && git commit -m "description" && git push`
- Note: index.html was previously in global gitignore. Fixed March 18, 2026.
  Remove index.html from ~/.gitignore_global if it reappears.

**Netlify (production -- SBV live site):**
- Free tier. No monthly cost for a static site.
- Deploy: drag SBV_draft folder into Netlify deploy zone
- Custom domain configured in Netlify > Domain Management

**Active Demo Links:**

| Project | URL |
|---------|-----|
| Master index | https://hugolacerda.github.io/hugo-demos/ |
| GBA Reference Site | https://hugolacerda.github.io/hugo-demos/gba/site/ |
| Industry Insider | https://hugolacerda.github.io/hugo-demos/gba/industry-advisor/ |
| SBV Assessment Tool | https://hugolacerda.github.io/hugo-demos/sbv/assessment/ |
| Marketing Analyzer | https://hugolacerda.github.io/hugo-demos/market-analyzer/ |
| Net Proceeds Calculator | https://hugolacerda.github.io/hugo-demos/gba/net-proceeds/ |

**pCloud (legacy, do not use for new projects):**
- Old demos still at filedn.com URLs for reference only

---

## MeclabsAI Asset IDs

### SBV Business Value Navigator
| Component | Detail |
|---|---|
| Widget | Live on strategicbusinessvaluations.com |
| Analytics | 19 users, 120 interactions (as of April 8) |
| Action needed | Configure transcript analysis email delivery |

### Industry Insider (GBA) -- formerly Market Pulse
| Component | ID |
|-----------|-----|
| Expert | (log from MeclabsAI dashboard) |
| Widget | `y1nDqm0lbalGkdYGSmzXkQfC` |

### Widget Embed -- Industry Insider
```html
<script async src="https://meclabsai.com/embed/chat.js?appId=y1nDqm0lbalGkdYGSmzXkQfC"></script>
```

### GBA General Site Agent -- NOT YET BUILT
IDs to be documented once built.

### Exit-Window Audit (Concept Stage -- On Hold)
| Component | ID |
|-----------|-----|
| Expert | `wKZB8QMbPL` |
| App | `KJNAphwyIt` |
| Widget | `yv11q9AWNT` |

---

## Design Notes

**Orange accent (#E47D46)** is the GBA brand color used in demos and widgets.
**Final branding authority:** Gary's graphic designer (teaches at Flagler, Fox Business
Network background). Hugo does not make visual design decisions.

**SBV design tokens:** Playfair Display headlines, Libre Franklin body, midnight/ember/ivory
palette, 1400px max-width container.

---

## ADS Guiding Principle

> **All conversations lead to consultation. Education leads to expertise.**

Applies to every agent on every site. Gary refers to agents as "The Oracle" internally.

---

## Key Deadlines

- **~April 22, 2026** -- SBV site must be live (Flint confirmed 2-week window on April 8;
  Facebook campaign cannot launch until the site is live)
- **End of June 2026** -- 6 new AI agents built (Hugo's Q2 goal, confirmed publicly with Flint)
- **End of June 2026** -- 3 additional active exit planning clients
- **Q2 2026** -- 1,000 CEPA outreach emails sent; 25 Value Builder surveys completed

---

## Open Technical Questions

- EPI database automation: can CEPA email addresses be extracted programmatically?
  (Hugo to research before Amanda builds list manually)
- GHL capabilities during trial: does it replace Calendly and SmarterQueue? Can it
  host pages for client sites?
- MeclabsAI MCP server: Flint confirmed ~1 month out. Monitor and connect as soon as
  available.
- Can MeclabsAI widgets be restricted to specific pages? (Quinn -- email drafted)

---

## Chuck's Warranty Constraint (Read Before Touching GBA Codebase)

Chuck's company offers a lifetime bug-fix warranty on the GBA site. That warranty
is **voided** the moment independent code modifications are made via FTP. Gary owns
the IP and can request FTP access once his payment plan completes, but taking that
access ends the warranty. Hugo making code changes outside Chuck's team would trigger
this. Raise it with Gary explicitly before any discussion of Hugo taking over the
build independently.

---

## Notion Pages (April 2026 Session)

| Document | URL |
|---|---|
| Q2 Quarterly Planning Meeting -- April 7, 2026 | https://www.notion.so/33df99c396de81c5a656efe5456fd3e6 |
| SBV Bi-weekly with Flint -- April 8, 2026 | https://www.notion.so/33df99c396de81279462d5829a438c5c |
| Morning Calls with Gary -- April 8, 2026 | https://www.notion.so/33df99c396de816fbe19cc1cba0e4db6 |
| MeclabsAI Library Project Idea | https://www.notion.so/33df99c396de81c9a7a2c8b2bb7ffd8b |
| Gary Call -- Quick Sync, April 2, 2026 | https://www.notion.so/336f99c396de81e4a3d4ec0970194309 |

## Notion Pages (March 2026 Session)

| Document | URL |
|---|---|
| GEO/SEO Seminar Notes | https://www.notion.so/322f99c396de81c2a280f99f6164485d |
| CRM Strategy and Tool Stack | https://www.notion.so/322f99c396de81af8efce24d8554a507 |
| SBV Bi-weekly Call March 11 | https://www.notion.so/322f99c396de81799d1ee6b75cb4868f |
| GBA Website Review Meeting Notes March 17 | https://www.notion.so/327f99c396de81649e68c19be26f6844 |
| GBA Industry Insider Project Doc | https://www.notion.so/327f99c396de81ddacb9ed213ecc084d |
| Expert Benchmark Round 1 | https://www.notion.so/327f99c396de8106b832f16cfdbc3e1b |
| Expert Benchmark Round 2 | https://www.notion.so/327f99c396de810c819cf3405cb33dc6 |
| Expert Benchmark Round 3 | https://www.notion.so/327f99c396de8192b7f2c00a814ff0b2 |

---

## Key People

| Person | Role | Notes |
|--------|------|-------|
| Gary Hallett | Managing Partner (GBA), strategic lead (SBV) | Decision maker, married to Nancy. Public face of SBV on LinkedIn. |
| Nancy Hallett | CVA, runs SBV | SBV is under her name. Stepping back from LinkedIn public presence. |
| Amanda | Operations (GBA/SBV) | Manages Value Builder CRM; leads CEPA email list-building |
| John | Consulting team expert | No longer a GBA employee; leading west side M&A deal |
| Cal | Referring broker | Referrals only, not deal team, zero CRM contacts |
| Flint McGlaughlin | MeclabsAI founder | Friend of Gary's; platform access, strategy guidance |
| Quin McGlaughlin | MeclabsAI | Technical questions about ADS; Flint's son |
| Leanna | MeclabsAI / Facebook | Top Facebook strategist in Flint's group; former attorney; leads Facebook campaign |
| Kavin Patel | Convrrt | Attends Flint bi-weekly calls |
| Quinn | MeclabsAI contact | Widget technical questions (note: different from Quin McGlaughlin) |
| Chuck | External GBA developer | Gary is the intermediary; Hugo does not contact Chuck directly |
| Kimberly | Value Builder consultant | Best practices for inactive/paused contact re-engagement |
| Aaron Eiger | CIO, Value Builder | Identified deliverability issue; key contact for platform questions |
| O'Shane | LinkedIn outreach | Activated for CEPA/LinkedIn campaign in Q2 |
| Morris | Gary's contact / Harry funder | Funds Hugo's hours for Light to the Nations project |
| Harry | Light to the Nations Ministry | Guatemala. Pending credentials from Gary. |

---

## GBA Brand Colors (Reference)

```css
--primary: #1a3a5c;  /* Navy */
--accent:  #c9a227;  /* Gold */
--orange:  #E47D46;  /* ADS accent */
```

*Final branding decisions rest with Gary's graphic designer, not Hugo.*

---

## MECLABS Formula

**C = 4m + 3v + 2(i-f) - 2a**

- C = Conversion probability
- m = Motivation
- v = Value proposition clarity
- i = Incentive
- f = Friction
- a = Anxiety

---

## Current Focus Areas (April 2026)

1. **SBV Website** -- Near launch. Waiting on Register.com access from Gary. ~April 22 deadline.
2. **GHL Setup** -- Trial active. Walkthrough with Gary next week. Must be ready before Facebook campaign.
3. **Facebook Campaign** -- Strategy being developed with Leanna. Launches after SBV site + GHL ready.
4. **Industry Insider Agent** -- Avatar pending Gary selection; Chuck integration pending
5. **GBA General Site Agent** -- Not yet built; needed for GBA site launch
6. **Agent builds (6 by end of June)** -- Process documented in KB_11. Team submitting wish lists.

---

## Pending Decisions and Open Items

1. Register.com access -- Gary to provide to Hugo
2. GHL walkthrough -- schedule next week with Gary
3. Gary's content copy for SBV site -- committed by April 4, confirm received
4. Micro-affirmation icon strip final copy -- connection dropped before Gary confirmed
5. Segmentation Card 2 exact heading -- directional only, needs confirmation
6. Avatar selection for GBA General Agent -- Gary to pick from archetype folder
7. Exit-Window direction -- ADS Version vs custom build vs neither? (Gary)
8. EPI database automation -- can CEPA emails be extracted programmatically? (Hugo to research)
9. MeclabsAI Library project -- when to start? (After SBV launch and GHL setup)
10. Chuck warranty -- raise with Gary before any independent code changes to GBA site
