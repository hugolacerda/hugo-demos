# Quick Reference Card

*Last updated: April 28, 2026*

## Company URLs

| Company | Live Site | Notes |
|---------|-----------|-------|
| GBA | https://www.gatewaybusinessadvisors.com/ | New site being built by Chuck (external) |
| SBV | https://strategicbusinessvaluations.com/ | LIVE on Netlify. Staging at staging--sbv.netlify.app |

---

## SBV Hosting (LIVE)

**Hosting:** Netlify free tier
**DNS:** Network Solutions (not Register.com — verified via RDAP)
**Auto-deploy:** GitHub repo `hugolacerda/hugo-demos`, `sbv` folder as both base and publish directory
**SSL:** Let's Encrypt via Netlify

**Staging workflow:**
```bash
git checkout staging
git add sbv/[file] && git commit -m "description" && git push
# Review at: https://69eff6a1dccf5c000817668e--sbv.netlify.app
# When approved:
git checkout main && git merge staging && git push
```

**Critical:** Email DNS records (MX, TXT, autodiscover, email CNAMEs) must never be touched. They protect Gary's Microsoft/Outlook email.

---

## Demo Hosting

**GitHub Pages (demos and reference builds):**
- Base URL: https://hugolacerda.github.io/hugo-demos/
- Repo: https://github.com/hugolacerda/hugo-demos
- Local path: /Users/hugolacerda/Desktop/hugo-demos/
- Push workflow: `git add . && git commit -m "description" && git push`

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
| Component | ID / Detail |
|---|---|
| Widget ID | `au2pzSqFSbYBqi0KMkzJfI3F` |
| Status | Live on strategicbusinessvaluations.com (site-wide) |
| Action needed | Configure transcript analysis email delivery |

### GBA Industry Insider (formerly Market Pulse)
| Component | ID |
|-----------|-----|
| Widget | `y1nDqm0lbalGkdYGSmzXkQfC` |
| Embed | `<script async src="https://meclabsai.com/embed/chat.js?appId=y1nDqm0lbalGkdYGSmzXkQfC"></script>` |

### Marketing Analyzer
| Component | ID |
|-----------|-----|
| App | `SeeCEgerdwMRABOWH7UC` |
| Widget | `prggLO7YjTahW0ATOD8S` |
| Embed | `<script async src="https://meclabsai.com/embed/chat.js?appId=prggLO7YjTahW0ATOD8S"></script>` |
| Demo | https://hugolacerda.github.io/hugo-demos/market-analyzer/ |

### GBA General Site Agent — NOT YET BUILT
IDs to be documented once built.

### Exit-Window Audit (On Hold)
| Component | ID |
|-----------|-----|
| Expert | `wKZB8QMbPL` |
| App | `KJNAphwyIt` |
| Widget | `yv11q9AWNT` |

---

## GHL Key IDs

| Item | ID |
|---|---|
| SBV Location ID | `ETrWQNJ5xzOqQPGGXk5a` |
| PIT Token | `[rotated — see GHL agency settings]` |
| SBV Outreach & Lead Gen Pipeline | `4dlocepdwaCqnS60Db3M` |
| SBV Valuation Delivery Pipeline | `KmgopAIb10oisDtGbWHf` |
| Client Engagement Stage (Pipeline 2, Stage 3) | `52621698-1e33-49c2-9fb3-3091b75a8bf7` |
| Workflow 1 — Client Engagement Onboarding | `64e6f3cc-7c12-421d-82ab-69ae878ff4aa` |
| Facebook Campaign Funnel | `PPZ1GsupRV539ASNFqEh` |
| Registration Form | `CmXMqIBQdAlRSBZpALih` |

---

## Design Notes

**Orange accent (#E47D46)** is the GBA brand color used in demos and widgets.
**SBV design tokens:** Playfair Display headlines, Libre Franklin body, midnight `#0E1F3D` / ember `#C4553A` / ivory palette, 1400px max-width container.
**Final branding authority:** Gary's graphic designer (teaches at Flagler, Fox Business Network background). Hugo does not make visual design decisions.

---

## ADS Guiding Principle

> **All conversations lead to consultation. Education leads to expertise.**

Applies to every agent on every site. Gary refers to agents as "The Oracle" internally.

---

## Key Deadlines

- **End of June 2026** — 6 new AI agents (Hugo's Q2 goal). Marketing Analyzer = #1.
- **End of June 2026** — 3 additional active exit planning clients. Rusty is first.
- **Q2 2026** — 1,000 CEPA outreach emails sent; 25 Value Builder surveys completed
- **Before Facebook ads launch** — Privacy/terms pages live, GHL funnel finalized, Meta Business Manager access for Liana

---

## Open Technical Questions

- EPI database automation: can CEPA email addresses be extracted programmatically? (Hugo to research)
- GHL: SmarterQueue replacement capability — evaluate at SmarterQueue yearly renewal
- MeclabsAI MCP server: still coming — monitor and connect as soon as available
- Can MeclabsAI widgets be restricted to specific pages? (Quinn — email drafted)
- Katie Milton Jordan: custom eSignature AI agent at $20/month — Gary has call with her, wants Hugo to research her LinkedIn post

---

## Communication Rules (Standing)

- **No Notion links to Gary.** Gary cannot navigate Notion login screens. Send documents as PDF email attachments instead.
- **No em dashes** in any Gary-facing copy. Use commas, periods, or rephrased sentences.
- **All email drafts reviewed by Hugo** before sending on Gary's behalf.
- **Gary communication:** plain language, minimal copy, no technical jargon.

---

## Chuck's Warranty Constraint (Read Before Touching GBA Codebase)

Chuck's company offers a lifetime bug-fix warranty on the GBA site. That warranty is **voided** the moment independent code modifications are made via FTP. Raise explicitly with Gary before any discussion of Hugo taking over the build independently.

---

## Notion Pages (April 2026 Session)

| Document | URL |
|---|---|
| Q2 Quarterly Planning Meeting — April 7, 2026 | https://www.notion.so/33df99c396de81c5a656efe5456fd3e6 |
| SBV Bi-weekly with Flint — April 8, 2026 | https://www.notion.so/33df99c396de81279462d5829a438c5c |
| Morning Calls with Gary — April 8, 2026 | https://www.notion.so/33df99c396de816fbe19cc1cba0e4db6 |
| MeclabsAI Library Project Idea | https://www.notion.so/33df99c396de81c9a7a2c8b2bb7ffd8b |
| SBV Deployment Reference | https://www.notion.so/343f99c396de81a99640c519a7dc96f6 |
| SBV Legal Pages (Privacy + Terms) | https://www.notion.so/34ff99c396de81e4aa9bd1545c7aed5d |
| Nancy's Workflow Automation Plan | https://www.notion.so/34cf99c396de8113832bc685db196bb4 |
| SBV Valuation Delivery Workflow Plan | https://www.notion.so/34ef99c396de81fc94f5db198ace3941 |
| Marketing Analyzer Project Doc | https://www.notion.so/34ff99c396de81d3886bf23763d5aa7e |
| Facebook Campaign — Lead Gen | https://www.notion.so/349f99c396de812487f6f3749a36e7b4 |
| Project Tracker | https://www.notion.so/42cde02da93448a3be7b4dd400c086b4 |

---

## Key People

| Person | Role | Notes |
|--------|------|-------|
| Gary Hallett | Managing Partner (GBA), strategic lead (SBV) | Decision maker, married to Nancy. Public face of SBV on LinkedIn. |
| Nancy Hallett | CVA, runs SBV | SBV is under her name. Stepping back from LinkedIn public presence. |
| Amanda | Operations (GBA/SBV) | Manages Value Builder CRM; leads CEPA email list-building. Use Nancy's MeclabsAI login until Quin resolves access. |
| John | Consulting team expert | No longer a GBA employee; leading west side M&A deal |
| Cal | Referring broker | Referrals only, not deal team, zero CRM contacts |
| Liana Ling | Facebook campaign lead | liana@powerupstrategy.com — external agency, NOT Flint's team. Has GHL access. Needs Meta Business Manager partner access from Gary. |
| Flint McGlaughlin | MeclabsAI founder | Friend of Gary's; platform access, strategy guidance |
| Quin McGlaughlin | MeclabsAI | Technical questions about ADS and account admin; Flint's son |
| Kavin Patel | Convrrt | Attends Flint bi-weekly calls |
| Quinn | MeclabsAI contact | Widget technical questions (note: different from Quin McGlaughlin) |
| Chuck | External GBA developer | Gary is the intermediary; Hugo does not contact Chuck directly |
| Kimberly | Value Builder consultant | Best practices for contact re-engagement |
| Aaron Eiger | CIO, Value Builder | Key contact for platform questions |
| O'Shane | LinkedIn outreach | Activated for CEPA/LinkedIn campaign in Q2 |
| Katie Milton Jordan | AI practitioner | Gary connected. Built custom eSignature AI agent for $20/month. Gary has call with her. |
| Morris | Gary's contact / Harry funder | Funds Hugo's hours for Light to the Nations project |
| Harry | Light to the Nations Ministry | Guatemala. Pending credentials from Gary. |

---

## GBA Brand Colors (Reference)

```css
--primary: #1a3a5c;  /* Navy */
--accent:  #c9a227;  /* Gold */
--orange:  #E47D46;  /* ADS accent */
```

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

## Current Focus (April 28, 2026)

1. **Marketing Analyzer** — Push bug fix, confirm working, send Gary updated link
2. **GHL Workflow 1** — Complete remaining steps, then workflows 2-7
3. **Facebook Campaign** — Fix landing page per Liana's list, build Thank You page, get legal pages approved for privacy/terms links
4. **SBV Legal Pages** — Re-send as PDF attachments to Gary for attorney review
5. **Value Builder warm-up webinar** — Amanda reactivating Gary's paused contacts; social content from top 10 FAQ series
6. **Agent builds** — 5 more agents by end of June
