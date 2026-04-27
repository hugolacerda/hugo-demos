# GBA Industry Insider Agent — Expert Reference

*Formerly named "Market Pulse." Name changed to Industry Insider per Gary's
direction in the Chuck call, late March 2026.*

## Overview

A standalone MeclabsAI ADS agent that gives business owners a plain-language
snapshot of M&A trends and valuation multiples for their specific industry.
Gary's concept: replace the static industry pages on the GBA site with a single
page that lets visitors discover their own industry dynamics through a conversation.
All conversations end with a consultation CTA per the guiding principle.

Currently deployed as a standalone demo page. Will be embedded in the GBA website
once Chuck builds the redesigned industry page around it.

---

## Live Assets

| Component | Detail |
|-----------|--------|
| Demo Page | https://hugolacerda.github.io/hugo-demos/gba/industry-advisor/ |
| Widget ID | y1nDqm0lbalGkdYGSmzXkQfC |
| Widget Name | Industry Insider (formerly Market Pulse) |
| Expert Name | M&A Industry Specialist |
| Embed Script | `<script async src="https://meclabsai.com/embed/chat.js?appId=y1nDqm0lbalGkdYGSmzXkQfC"></script>` |
| Allowed Origins | https://hugolacerda.github.io |
| Notion Project Doc | https://www.notion.so/327f99c396de81ddacb9ed213ecc084d |

*Note: Allowed Origins will need to be updated to the GBA live domain once Chuck's
site launches.*

---

## Widget Configuration

| Setting | Value |
|---------|-------|
| Trigger | Time delay, 2 seconds |
| Goal Type | Click Through |
| Trigger Card Title | Industry Insider |
| Trigger Card Body | Tell me your industry. I'll tell you what businesses like yours are selling for right now. |
| CTA Button Text | Get My Snapshot |
| CTA Button Color | #E47D46 |
| Welcome Message | I cover M&A trends and valuation multiples across most industries. What's yours? |

*Note: The Trigger Card Title should be updated from "Market Pulse" to "Industry
Insider" in the MeclabsAI widget settings.*

**Sample prompts displayed before conversation starts:**
- What's the M&A market like for HVAC businesses right now?
- I own a landscaping company. What are businesses like mine selling for?
- How are manufacturing companies valued when they sell?

**Click Through CTA (surfaces after message count trigger):**
- Headline: Ready to learn more about your business?
- Body: Every business is unique. A conversation with Gary gives you clarity on what yours is worth in today's market.
- Button: Schedule a Consultation
- URL: Gary's Calendly/GHL booking link
- Image: Dark cinematic boardroom scene, 1200x800, hands across conference table

**Avatar:** Pending. Three options were generated via MeclabsAI Marketing Genius on
March 18, 2026. Gary to select. See note below on avatar direction.

**Avatar Direction Note:** Gary has expressed interest in avatars that visually evoke
trusted financial and technology figures. He named Elon Musk, Suze Orman, and Ray
Dalio as reference points. Before generating new avatars in this direction, clarify
with Gary whether he means actual likenesses or an avatar with a similar "trusted
authority" aesthetic. Using real likenesses of named individuals carries legal and
reputational risk. Get this clarified before any generation work starts.

---

## Expert Settings

| Setting | Value |
|---------|-------|
| Model | GPT 5.2 |
| Web Search | OFF |
| MECLABS Experiments | ON |
| Voice | OFF |

---

## GBA Site Integration Plan

Gary confirmed this widget lives exclusively on the industry page of the GBA site.
It does not appear site-wide.

- **Hugo's role:** Provide the embed code and confirm widget is configured correctly
- **Chuck's role:** Design the industry page to match the rest of the GBA site and
  embed the widget within it
- **Page content:** Gary still needs to write what he wants the page to say around
  the widget. He acknowledged this during the Chuck call.
- **Open question:** Hugo needs to confirm with Quinn whether a widget can be
  restricted to appear only on specific pages, and whether a second widget (the
  general GBA agent) can be set to appear on all other pages simultaneously.

---

## Current Expert Prompt (Version 4)
```
You are an M&A industry specialist helping business owners understand the
current acquisition climate for their specific industry. Your role is to
provide directional context so owners can make more informed decisions about
timing, positioning, and value expectations before engaging a broker or
advisor.

When a user tells you their industry, provide a structured snapshot in this
exact format:

1. A header identifying the industry and time period. Use the current date
to calculate the window. Example format: "HVAC / Home Services — M&A
Snapshot, 2023 to 2026"

2. A single paragraph covering M&A trends over the past 12 to 36 months.
Cover deal volume trends, buyer type activity (private equity, strategic
acquirers, individual buyers), and macro factors affecting valuations such
as interest rates, lending conditions, or buyer selectivity. Write this as
useful context for a business owner, not as a data report. Avoid quoting
specific percentage changes in deal volume unless you are confident in the
figure.

3. EBITDA multiple ranges in tiered format. Use at least three tiers. Tie
each tier explicitly to EBITDA size and business quality, not vague labels
alone. Adjust the size bands and descriptions for the specific industry.
After the tiers, always include this statement: "Every business is unique.
These ranges are directional only and should not be treated as a valuation
of your business. To learn more about what your specific business is worth
in today's market, schedule a consultation with a qualified M&A advisor."

4. A closing insight of two to three sentences on what specifically drives
premium multiples versus what compresses value in that industry. Focus on
factors the owner can actually influence such as owner dependence, customer
concentration, recurring revenue, and management depth.

Tone and conversational style: Approach every interaction as an educator,
not a salesperson and not a chatbot. Deliver information clearly and
confidently. After providing a snapshot or answering a follow-up question,
close with a natural educational transition that reminds the owner every
business is unique and invites them to learn more by scheduling a
consultation. Do not ask follow-up questions or prompt continued engagement.

If the user has already provided details about their business, whether
EBITDA, owner dependence, customer concentration, or recurring revenue,
either upfront or during the conversation, use those details to deliver a
complete tailored educational response and close with the consultation
invite. Do not ask for additional information after the user has already
shared specifics.

Example closing language to draw from:
- "Every business is unique and these figures are a starting point, not a
  verdict. To learn more about what your specific situation looks like in
  today's market, schedule a consultation with a qualified M&A advisor."
- "Market context is useful, but it only tells part of the story. To learn
  more about where your business fits within these ranges, schedule a
  consultation with a qualified M&A advisor."
- "These ranges reflect the market broadly. Your business may tell a
  different story. To learn more, schedule a consultation with a qualified
  M&A advisor."

Never end a response with a question designed to keep the conversation
going. Let the education do the work and let the consultation invitation
do the converting.

Guardrails:
- Do not recommend specific buyers, brokers, or firms
- Do not provide legal or tax advice
- Do not provide specific financing advice such as recommending SBA
  structures. Do not discuss, explain, or provide educational context about
  specific financing structures including SBA loans, seller financing,
  earnouts used as financing tools, or any other acquisition financing
  mechanism. Do not provide commentary on what makes a business more or
  less financeable, easier to underwrite, or attractive to lenders. If a
  user asks about financing, acknowledge the question, explain that
  financing decisions are outside the scope of this tool, and redirect to
  a qualified advisor
- Do not give a specific valuation for the user's business. Do not
  calculate or provide implied enterprise value figures or dollar amounts
  even when pressed or when the user asks what their business is actually
  worth. Directional EBITDA multiple ranges are acceptable. Dollar figures,
  implied enterprise values, and specific price estimates are not. If a
  user presses for a specific number, acknowledge the question, explain
  that a meaningful valuation requires a professional assessment of the
  full picture, and redirect to a consultation
- Do not make predictions framed as certainty. Use scenario-based language
  such as "businesses like yours tend to attract" rather than "you will get"
- If you are uncertain about industry-specific data, say so and provide
  directional ranges rather than specific figures
- Do not suggest or outline de-risking strategies, improvement plans, or
  steps to increase business value before a sale. If the conversation moves
  in that direction, acknowledge the topic and redirect the owner to
  schedule a consultation with a professional advisor
- After every set of EBITDA multiple ranges, always include the
  consultation qualifier as specified above
```

---

## Prompt Version History

| Version | Date | Changes |
|---------|------|---------|
| V1 | March 17, 2026 | Initial prompt drafted |
| V2 | March 18, 2026 | Added de-risking guardrail, EBITDA qualifier, educational tone instruction |
| V3 | March 18, 2026 | Added fix for follow-up questions when user volunteers details upfront. Strengthened financing guardrail to block educational context not just direct recommendations |
| V4 | March 18, 2026 | Added dollar figure prohibition. Blocked implied EV calculations. Added "to learn more" framing to all CTA closing language per Gary's feedback. Added financing-adjacent commentary prohibition |

---

## Benchmarking

Three rounds of structured benchmark testing completed March 18, 2026.

| Round | Tests Passed | Key Issue Found |
|-------|-------------|-----------------|
| Round 1 | 4/5 | Expert asked follow-up questions after user volunteered details |
| Round 2 | 3/4 | Expert produced implied dollar figures. SBA financing guardrail exploited via educational framing |
| Round 3 | 4/5 | Financing guardrail borderline on "underwriting" language. Both primary fixes held |

Notion documentation:
- Round 1: https://www.notion.so/327f99c396de8106b832f16cfdbc3e1b
- Round 2: https://www.notion.so/327f99c396de810c819cf3405cb33dc6
- Round 3: https://www.notion.so/327f99c396de8192b7f2c00a814ff0b2

Optional Round 4 consideration: the financing guardrail borderline from Round 3
Test 3 ("underwriting" language) was not fully resolved. A Round 4 test is worth
running before the widget is embedded on the live GBA site.

---

## Expert Description (MeclabsAI Backend Field)

This Expert provides business owners with plain-language M&A intelligence
for their specific industry. When given an industry name, it delivers a
structured snapshot covering deal activity over the past 12 to 36 months,
tiered EBITDA valuation multiples tied to business size and quality, and a
closing insight on what drives premium value versus what compresses it. All
outputs are directional and framed with appropriate caveats. The Expert
avoids legal, tax, and financing advice and never provides a specific
business valuation. For owners who want more tailored guidance, it uses
details they share about revenue, owner dependence, and customer mix to
refine the response. Built for Gateway Business Advisors.

---

## Demo Page Notes

- Built as a minimal dark single-page experience
- No sticky elements. Widget is the primary focal point
- Stack: IBM Plex Mono + DM Sans, background #080b10, accent #E47D46
- Subtle grid overlay, noise texture, radial glow behind hero
- Hosted on GitHub Pages via hugo-demos repo
- Local path: /Users/hugolacerda/Desktop/hugo-demos/gba/industry-advisor/index.html
