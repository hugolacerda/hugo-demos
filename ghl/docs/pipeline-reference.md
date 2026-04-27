# GHL Pipeline Reference — SBV Sub-Account
*Last updated: April 25, 2026*
*Location ID: ETrWQNJ5xzOqQPGGXk5a*

---

## Pipeline 1 — SBV: Outreach & Lead Gen
**Pipeline ID:** `4dlocepdwaCqnS60Db3M`

| Position | Stage Name | Stage ID |
|---|---|---|
| 0 | New Lead | `9f1c2791-38df-4baa-824e-9fb2aae2efc3` |
| 1 | Attempted Contact | `915116ac-84f4-43a3-b97d-2e68b79872eb` |
| 2 | Connected | `4d764d50-d5c5-4113-a9b0-31787d6852bc` |
| 3 | Valuation Booked | `8c06c8a2-1c2e-4c17-8c68-37551f3f3cac` |
| 4 | Valuation Complete | `43dc1ab4-777f-415c-b048-c743c1565095` |
| 5 | Nuture (typo — fix to "Future Opportunity" in UI) | `a73db456-8ecd-49d0-9498-b36d0c50522a` |
| 6 | Closed Won | `b3e81803-74b5-4d9a-a196-c45c8350a35f` |
| 7 | Closed Lost | `2dfb2672-32e5-47a0-965d-581b4b89ef0e` |

**Purpose:** Facebook campaign traffic, cold outreach, CEPA LinkedIn leads.
Tracks from first touch through booked valuation.
Nos stay in pipeline with a task and return date — not moved to Closed Lost.

---

## Pipeline 2 — SBV: Valuation Delivery
**Pipeline ID:** `KmgopAIb10oisDtGbWHf`

| Position | Stage Name | Stage ID |
|---|---|---|
| 0 | New Lead | `a9d95629-b978-45e9-8ed6-7ba609c5e1db` |
| 1 | Discovery Call | `8bca3f58-c43d-4dd8-898c-5dc4e92ac213` |
| 2 | Client Engagement | `52621698-1e33-49c2-9fb3-3091b75a8bf7` |
| 3 | Client Docs Received | `368261ac-a28e-4569-98e0-f893a5ce8696` |
| 4 | Client Interview | `c42b4256-0a6e-499b-9eb9-fae2e3d932bb` |
| 5 | Draft Review & Sign-Off | `383461a2-7848-4197-8475-3e77a2c640f1` |
| 6 | Schedule Final Review | `0d4f4267-43ec-45f5-a352-3d612e9b883a` |
| 7 | Final Payment & Report Delivery | `d6db6dcb-7726-4f4f-8b98-10e4c23e1a6a` |
| 8 | Report Review | `a27299df-a8fc-44b5-8f95-40f4f5ff2809` |

**Purpose:** Tracks every active SBV valuation engagement from referral to delivered report.
Gary confirmed: tracks customer stage only, NOT internal workflow steps (financial analysis,
market method calculation, etc. are process — not pipeline stages).

**After Stage 8 (Report Review):** Tag contact `Valuation Complete` + `SBV Client`,
mark opportunity Won, enroll in nurture cycle.

**Key rule from Gary (L10 April 21):** Nos between Discovery Call and Client Engagement
do NOT move to Closed Lost. They stay in Discovery Call with a note and a follow-up task
with a return date. Example: "Reach out again in September."

---

## Automation Hooks (Future — build in GHL Workflow Builder)

| Trigger Stage | Automation |
|---|---|
| Client Engagement | Fire onboarding email sequence (engagement letter + deposit link + VB survey link) |
| Client Docs Received | Send document collection form link |
| Draft Review & Sign-Off | Create internal task for Nancy: "Review draft — [Client Name]" |
| Schedule Final Review | Send client calendar booking link |
| Final Payment & Report Delivery | Send payment request + report pre-delivery |
| Report Review | Tag Won, enroll nurture, create annual check-in task (October) |

---

## Key Reference Notes
- **Value Builder** = nurture content (separate from GHL — do not replace)
- **GHL CRM** = SBV service delivery and lead tracking
- Gary: "Value Builder is about Value Builder content. CRM is about SBV services."
- CRM go-live target: April 30, 2026
- "Nuture" stage (Pipeline 1) still needs typo fix in GHL UI → rename to "Future Opportunity"
