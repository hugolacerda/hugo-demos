# KB_10 — GoHighLevel (GHL) CRM

*Created: April 8, 2026*
*Source: Q2 Quarterly Planning Meeting, GHL research session, onboarding prep*

---

## Overview

GoHighLevel (GHL) is the CRM and marketing automation platform being adopted across GBA and SBV, replacing Pipeline CRM. Trial started April 7, 2026 ($90/month, 14-day trial). The platform was demoed live at the Q2 quarterly planning meeting and Gary approved a full walkthrough the following week.

**Why GHL:** It consolidates lead capture, pipeline management, automated follow-up, appointment booking, email/SMS campaigns, and social scheduling into one platform. For Gary and Nancy's team size, it can replace several standalone tools (Calendly, SmarterQueue, Pipeline CRM) while adding automation they don't currently have.

---

## Architecture Decision: Two Sub-Accounts

GHL operates on an agency/sub-account model. One GHL account at the agency level manages multiple sub-accounts, each with their own CRM, pipelines, automations, calendars, and contacts.

**Plan:**
- One GHL agency account (Hugo manages)
- Sub-account 1: GBA
- Sub-account 2: SBV
- Gary can view reporting across both from agency level

This keeps both businesses completely separate while remaining under one login and one billing relationship.

---

## Key Use Cases (Priority Order)

### 1. SBV Contact Form Destination
The SBV website `contact.js` is currently a stub. Once GHL is configured, the form routes to GHL via native embedded form or webhook. Every submission lands in the SBV pipeline, triggers a confirmation to the prospect, and notifies Nancy or Gary.

### 2. Facebook Lead Ad Integration
Flint's campaign drives Facebook leads directly into GHL pipelines via native integration. When a lead submits a Facebook form, they land in GHL automatically and trigger a follow-up sequence. This is the infrastructure that makes the Facebook campaign functional. GHL must be receiving leads before any ad spend starts.

**Dependency chain:** SBV site live → GHL configured → Facebook campaign launches

### 3. Automated Lead Nurture
Workflow builder enables multi-step automation triggered by form submissions, appointments, or other events. Example: prospect books a call → confirmation fires → reminder fires → post-call follow-up → dropped into nurture sequence. No manual intervention.

### 4. Calendly Replacement
GHL has a built-in calendar system. If it meets Gary's needs, it replaces Calendly ($15/month) and keeps booking data inside the CRM. Needs testing during trial.

### 5. SmarterQueue Replacement
Gary confirmed ~$400/year for SmarterQueue (social media scheduling). GHL includes social scheduling. Whether it's robust enough to replace SmarterQueue is TBD during trial.

### 6. Client Portals (Future)
Gary floated offering GHL client portals to SBV clients as a value-add — a mini dashboard showing pipeline status. GHL's white-label capability supports this. Explore after core setup is stable.

---

## Pricing

| Plan | Cost | Notes |
|---|---|---|
| Starter | $97/month | Core CRM, basic automation |
| Pro (trial plan) | $90/month | Hugo's current trial plan |
| Agency Unlimited | Higher tier | Unlimited sub-accounts, SaaS mode |

**Watch for:** Usage-based costs on top of subscription. SMS sends, outbound emails, and some AI features are billed per use. Budget for these separately once automation runs at volume.

---

## Onboarding Questions (Prepared for Onboarding Call)

1. Two sub-accounts (GBA + SBV) under one agency account — correct setup, and can Gary see cross-account reporting?
2. How does Facebook Lead Ads integration work — native, Zapier, or webhook?
3. SBV contact form: embed a GHL form or webhook from existing HTML form?
4. Can GHL replace Calendly and how does it sync with Google Calendar?
5. Realistic monthly costs beyond base plan (SMS, email, AI features)?
6. Common mistakes new accounts make in the first 30 days?
7. User permissions: Nancy accesses SBV only, Gary accesses both?

---

## Integration Map

| Tool | Integration Path | Status |
|---|---|---|
| Facebook Lead Ads | Native GHL integration | To configure |
| Calendly | GHL may replace | TBD during trial |
| SmarterQueue | GHL may replace | TBD during trial |
| Pipeline CRM | GHL replaces | Migration pending |
| ValueBuilder | No known integration | Separate research item |
| Zapier | GHL supports Zapier | Available if needed |
| MeclabsAI | No direct integration | Webhook possible |

---

## GHL and Hosting

Gary asked at the quarterly whether GHL can host websites — specifically quick builds for businesses being sold with no web presence. GHL has a website/funnel builder. Whether it's appropriate for full marketing sites vs. landing pages needs to be confirmed in the walkthrough.

SBV's site is being hosted on Netlify (free static hosting), not GHL. That decision stands unless the walkthrough reveals a compelling reason to consolidate.

---

## Related Documents

- [CRM / GoHighLevel Project Doc — Notion](https://www.notion.so/327f99c396de8107b617d06a11405673)
- [Q2 Quarterly Planning Meeting Notes](https://www.notion.so/33df99c396de81c5a656efe5456fd3e6)
- [SBV-AUTO-03 — Single-Entry Client Onboarding](https://www.notion.so/334f99c396de81f49f4ff663fb1460d1)
- KB_03_CURRENT_PROJECTS.md
