# KB_10 — GoHighLevel (GHL) CRM

*Created: April 8, 2026 | Last updated: April 28, 2026*
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
- Sub-account 2: SBV (active)
- Gary can view reporting across both from agency level

This keeps both businesses completely separate while remaining under one login and one billing relationship.

---

## Key Use Cases (Priority Order)

### 1. SBV Contact Form Destination
The SBV website `contact.js` is currently a stub. Once GHL is configured, the form routes to GHL via native embedded form or webhook. Every submission lands in the SBV pipeline, triggers a confirmation to the prospect, and notifies Nancy or Gary.

### 2. Facebook Lead Ad Integration
Liana Ling's campaign drives Facebook leads directly into GHL pipelines via native integration. When a lead submits a Facebook form, they land in GHL automatically and trigger a follow-up sequence. This is the infrastructure that makes the Facebook campaign functional. GHL must be receiving leads before any ad spend starts.

**Dependency chain:** SBV site live → GHL configured → Facebook campaign launches

### 3. Automated Lead Nurture
Workflow builder enables multi-step automation triggered by form submissions, appointments, or other events. Example: prospect books a call → confirmation fires → reminder fires → post-call follow-up → dropped into nurture sequence. No manual intervention.

### 4. Calendly Replacement
GHL has a built-in calendar system. If it meets Gary's needs, it replaces Calendly ($15/month) and keeps booking data inside the CRM. Needs testing during trial.

### 5. SmarterQueue Replacement
Gary confirmed ~$400/year for SmarterQueue (social media scheduling). GHL includes social scheduling. **Decision: SmarterQueue is yearly — do not cancel. Evaluate at renewal time.**

### 6. Client Portals (Future)
Gary floated offering GHL client portals to SBV clients as a value-add — a mini dashboard showing pipeline status. Explore after core setup is stable.

---

## Pricing

| Plan | Cost | Notes |
|---|---|---|
| Starter | $97/month | Core CRM, basic automation |
| Pro (trial plan) | $90/month | Hugo's current trial plan |
| Agency Unlimited | Higher tier | Unlimited sub-accounts, SaaS mode |

**Watch for:** Usage-based costs on top of subscription. SMS sends, outbound emails, and some AI features are billed per use.

---

## Integration Map

| Tool | Integration Path | Status |
|---|---|---|
| Facebook Lead Ads | Native GHL integration | To configure |
| Calendly | GHL may replace | TBD during trial |
| SmarterQueue | GHL may replace | Evaluate at renewal |
| Pipeline CRM | GHL replaces | Migration pending |
| ValueBuilder | No known integration | Separate research item |
| Zapier | GHL supports Zapier | Available if needed |
| MeclabsAI | No direct integration | Webhook possible |
| DocuSign | eSignature integration | Switching from Adobe Sign (monthly) |

---

## GHL and Hosting

SBV's site is being hosted on Netlify (free static hosting), not GHL. That decision stands unless the walkthrough reveals a compelling reason to consolidate.

---

## Related Documents

- [CRM / GoHighLevel Project Doc — Notion](https://www.notion.so/327f99c396de8107b617d06a11405673)
- [Q2 Quarterly Planning Meeting Notes](https://www.notion.so/33df99c396de81c5a656efe5456fd3e6)
- [SBV-AUTO-03 — Single-Entry Client Onboarding](https://www.notion.so/334f99c396de81f49f4ff663fb1460d1)
- [Workflow Automation Plan — Notion](https://www.notion.so/34ef99c396de81fc94f5db198ace3941)
- [Nancy's Full Automation Plan — Notion](https://www.notion.so/34cf99c396de8113832bc685db196bb4)
- KB_03_CURRENT_PROJECTS.md

---

## Current State (April 28, 2026)

### SBV Sub-Account (Active)
- **Location ID:** `ETrWQNJ5xzOqQPGGXk5a`
- **PIT Token:** `[rotated — see GHL agency settings]`
- **Users:** Gary, Nancy, Hugo, Liana Ling (liana@powerupstrategy.com — Facebook campaign)

### Pipelines Built

**Pipeline 1 — SBV: Outreach & Lead Gen** (`4dlocepdwaCqnS60Db3M`)
Stages: New Lead → Attempted Contact → Connected → Valuation Booked → Valuation Complete → Future Opportunity → Closed Won → Closed Lost

**Pipeline 2 — SBV: Valuation Delivery** (`KmgopAIb10oisDtGbWHf`)
Stages: New Lead → Discovery Call → Client Engagement → Client Docs Received → Client Interview → Draft Review & Sign-Off → Schedule Final Review → Final Payment & Report Delivery → Report Review

Client Engagement Stage ID: `52621698-1e33-49c2-9fb3-3091b75a8bf7`

### Workflows Built

**Workflow 1 — SBV Stage 3: Client Engagement Onboarding** (`64e6f3cc-7c12-421d-82ab-69ae878ff4aa`)
Status: Draft — Emails 1 and 2 complete. Remaining: Wait 1 day → Email 3 (Value Builder Survey) → Wait 1 day → Email 4 (Document Checklist) → Create Task.

### 5 Open Items Before Workflow 1 Goes Live
1. eSignature: switch from Adobe Sign (monthly) to DocuSign — better GHL integration. Nancy confirmed Adobe is monthly so can switch anytime.
2. QuickBooks credentials from Nancy
3. Report delivery method: email attachment vs. SecureSync
4. Booking link: GHL calendar or Calendly?
5. Engagement letter format: one GHL template with merge fields or manual PDF per client?

### Facebook Campaign Funnel
- Funnel ID: `PPZ1GsupRV539ASNFqEh`
- Registration Form ID: `CmXMqIBQdAlRSBZpALih`
- Landing page built with Custom HTML/Javascript block
- Liana has GHL access and will configure Meta Ads tracking once she receives Facebook partner access from Gary

### Note: Workflow Creation via API
Workflow creation is NOT available via the GHL public API (only GET /workflows/ is exposed). Build workflows in GHL UI. Once built, take a snapshot for future sub-account deployments.
