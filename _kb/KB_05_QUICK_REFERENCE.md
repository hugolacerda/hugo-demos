# Quick Reference Card

*Last updated: April 15, 2026 — SBV site live on Netlify*

## Company URLs

| Company | Live Site | Notes |
|---------|-----------|-------|
| GBA | https://www.gatewaybusinessadvisors.com/ | New site being built by Chuck (external) |
| SBV | https://strategicbusinessvaluations.com/ | LIVE on Netlify as of April 15, 2026 |

---

## SBV Hosting (Live)

**Hosting:** Netlify (free static hosting)
**Netlify project:** app.netlify.com/projects/sbv
**GitHub repo:** hugolacerda/hugo-demos | Base directory: sbv
**Domain registrar:** Network Solutions (login: nehallett@gmail.com)
**Full deployment reference:** https://www.notion.so/343f99c396de81a99640c519a7dc96f6

**Deploy command:**
```
cd ~/Desktop/hugo-demos && git add sbv/ && git commit -m "message" && git push
```

**DNS at Network Solutions (do not touch MX/TXT/email records):**
- A record: `@` → `75.2.60.5` (Netlify load balancer)
- CNAME: `www` → `sbv.netlify.app`

**Contact form:** Netlify Forms → Gary@gatewaybusinessadvisors.com
To swap to GHL: Netlify dashboard → Forms → contact → Form notifications → replace
email notification with GHL webhook URL. No code changes needed.

**Squarespace:** Gary needs to disconnect the domain and cancel the subscription.
Go to Squarespace → Settings → Domains & Email → remove strategicbusinessvaluations.com
(do NOT click "Start Transfer"). Then cancel the Squarespace plan.

---

## Demo Hosting

**GitHub Pages (demos and reference builds):**
- Base URL: https://hugolacerda.github.io/hugo-demos/
- Repo: https://github.com/hugolacerda/hugo-demos
- Local path: /Users/hugolacerda/Desktop/hugo-demos/
- Push workflow: `git add . && git commit -m "description" && git push`

**Netlify (SBV live site):**
- Free tier, auto-deploys from GitHub on push to main
- Custom domain: strategicbusinessvaluations.com
- SSL: Let's Encrypt, auto-renews every 3 months

**Active Demo Links:**

| Project | URL |
|---------|-----|
| Master index | https://hugolacerda.github.io/hugo-demos/ |
| GBA Reference Site | https://hugolacerda.github.io/hugo-demos/gba/site/ |
| Industry Insider | https://hugolacerda.github.io/hugo-demos/gba/industry-advisor/ |
| SBV Assessment Tool | https://hugolacerda.github.io/hugo-demos/sbv/assessment/ |
| Marketing Analyzer | https://hugolacerda.github.io/hugo-demos/market-analyzer/ |
| Net Proceeds Calculator | https://hugolacerda.github.io/hugo-demos/gba/net-proceeds/ |

---

## MeclabsAI Asset IDs

### SBV Business Value Navigator
| Component | Detail |
|---|---|
| Widget ID | au2pzSqFSbYBqi0KMkzJfI3F |
| Embed script | `<script async src="https://meclabsai.com/embed/chat.js?appId=au2pzSqFSbYBqi0KMkzJfI3F"></script>` |
| Deployed | All 7 pages of strategicbusinessvaluations.com |
| Analytics | 19 users, 120 interactions (as of April 8) |
| Action needed | Configure transcript analysis email delivery |

### Industry Insider (GBA) -- formerly Market Pulse
| Component | ID |
|-----------|-----|
| Widget | `y1nDqm0lbalGkdYGSmzXkQfC` |
| Embed script | `<script async src="https://meclabsai.com/embed/chat.js?appId=y1nDqm0lbalGkdYGSmzXkQfC"></script>` |

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

**SBV brand colors:**
- Midnight (navy): `#0E1F3D`
- Ember (orange): `#C4553A`
- Ivory (background): `hsl(30, 27%, 95%)`
- Fonts: Playfair Display (headlines), Libre Franklin (body)

**GBA brand colors (reference only -- final authority is Gary's graphic designer):**
- Navy: `#1a3a5c`
- Gold: `#c9a227`
- Orange accent: `#E47D46`

---

## ADS Guiding Principle

> **All conversations lead to consultation. Education leads to expertise.**

Applies to every agent on every site. Gary refers to agents as "The Oracle" internally.

---

## Key Deadlines

- **~April 22, 2026** -- Facebook campaign deadline (SBV site is now live, GHL still needed)
- **End of June 2026** -- 6 new AI agents built (Hugo's Q2 goal)
- **End of June 2026** -- 3 additional active exit planning clients
- **Q2 2026** -- 1,000 CEPA outreach emails sent; 25 Value Builder surveys completed

---

## Open Technical Questions

- EPI database automation: can CEPA email addresses be extracted programmatically?
- GHL capabilities during trial: does it replace Calendly and SmarterQueue?
- MeclabsAI MCP server: Flint confirmed ~1 month out. Monitor and connect when available.
- Can MeclabsAI widgets be restricted to specific pages? (Quinn -- email drafted)

---

## Chuck's Warranty Constraint (Read Before Touching GBA Codebase)

Chuck's company offers a lifetime bug-fix warranty on the GBA site. That warranty
is **voided** the moment independent code modifications are made via FTP. Hugo cannot
touch the GBA codebase independently. All changes go through Gary to Chuck.

---

## Notion Pages (April 2026 Session)

| Document | URL |
|---|---|
| Q2 Quarterly Planning Meeting -- April 7, 2026 | https://www.notion.so/33df99c396de81c5a656efe5456fd3e6 |
| SBV Bi-weekly with Flint -- April 8, 2026 | https://www.notion.so/33df99c396de81279462d5829a438c5c |
| Morning Calls with Gary -- April 8, 2026 | https://www.notion.so/33df99c396de816fbe19cc1cba0e4db6 |
| MeclabsAI Library Project Idea | https://www.notion.so/33df99c396de81c9a7a2c8b2bb7ffd8b |
| Gary Call -- Quick Sync, April 2, 2026 | https://www.notion.so/336f99c396de81e4a3d4ec0970194309 |
| SBV Website -- Hosting & Deployment Reference | https://www.notion.so/343f99c396de81a99640c519a7dc96f6 |

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
| Leanna | MeclabsAI / Facebook | Top Facebook strategist in Flint's group; leads Facebook campaign |
| Kavin Patel | Convrrt | Attends Flint bi-weekly calls |
| Quinn | MeclabsAI contact | Widget technical questions (different from Quin McGlaughlin) |
| Chuck | External GBA developer | Gary is the intermediary; Hugo does not contact Chuck directly |
| Kimberly | Value Builder consultant | Best practices for inactive/paused contact re-engagement |
| Aaron Eiger | CIO, Value Builder | Identified deliverability issue; key contact for platform questions |
| O'Shane | LinkedIn outreach | Activated for CEPA/LinkedIn campaign in Q2 |
| Morris | Gary's contact / Harry funder | Funds Hugo's hours for Light to the Nations project |
| Harry | Light to the Nations Ministry | Guatemala. Pending credentials from Gary. |

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

1. **GHL Setup** -- Trial active. Walkthrough with Gary next week. Must be ready before Facebook campaign.
2. **Facebook Campaign** -- Strategy with Leanna. Launches after GHL ready.
3. **Industry Insider Agent** -- Avatar pending Gary selection; Chuck integration pending
4. **GBA General Site Agent** -- Not yet built; needed for GBA site launch
5. **Agent builds (6 by end of June)** -- Process documented in KB_11. Team submitting wish lists.

---

## Pending Decisions and Open Items

1. GHL walkthrough -- schedule with Gary
2. Gary's content copy for SBV site -- confirm received / outstanding items
3. Avatar selection for GBA General Agent -- Gary to pick from archetype folder
4. Exit-Window direction -- ADS Version vs custom build vs neither? (Gary)
5. EPI database automation -- can CEPA emails be extracted programmatically? (Hugo to research)
6. MeclabsAI Library project -- when to start? (After GHL setup)
7. Chuck warranty -- raise with Gary before any independent code changes to GBA site
8. Gary to disconnect domain in Squarespace and cancel subscription
