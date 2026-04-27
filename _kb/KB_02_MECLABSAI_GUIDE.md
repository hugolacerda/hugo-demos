# MeclabsAI Platform Guide

## Overview

MeclabsAI is an AI platform built on MECLABS conversion science methodology. It allows users to create custom AI-powered tools (called "ADS" - AI Decision Support) for marketing optimization, diagnostics, and content generation.

Gary Hallett is deeply invested in the MECLABS methodology and uses MeclabsAI for many marketing technology implementations.

**Platform URL:** https://meclabsai.com

---

## Key Contacts

- **Quin** — MeclabsAI contact for technical questions about ADS customization
- **Flint's Team** — MeclabsAI developers for deeper integrations (inline embedding, API access, etc.)

---

## Core Components

### 1. Experts

Experts are the AI reasoning engines with custom prompts that define behavior. Think of them as specialized AI assistants.

**Key settings:**
- **Name** — Display name for the expert
- **Description** — What the expert does (80-120 words)
- **Main Prompt** — The detailed instructions that govern behavior
- **Model** — Usually GPT 5.2 for reasoning-heavy tasks
- **Web Search** — ON/OFF (usually OFF for audit tools to prevent unverified claims)
- **MECLABS Experiments** — ON for hypothesis-driven outputs
- **Voice** — ON/OFF for voice interaction

**Creating an Expert:**
1. Use the "Expert Creator" assistant in MeclabsAI
2. Provide context about what you want the expert to do
3. Iterate on the prompt architecture
4. Configure settings (model, web search, voice, etc.)

### 2. Apps

Apps are structured intake experiences that collect consistent information before running the Expert. They provide form-like interaction instead of open-ended chat.

**Key features:**
- Structured input fields (URL, audience, goal, etc.)
- Consistent context collection
- "Run Audit" or similar action buttons
- Can require specific inputs before proceeding

**Creating an App:**
1. Use the "App Maker" assistant in MeclabsAI
2. Define the intake fields needed
3. Link to an Expert for processing
4. Configure the action button and flow

### 3. Widgets (ADS)

Widgets are embeddable components that can be deployed on external websites. They contain the Expert + App experience in a deployable package.

**Widget types:**
- Floating bubble (bottom-right corner, chatbot-like)
- Centered modal
- Inline embed (limited support)

**Key settings:**
- **Goal** — Lead Generation, Support, etc.
- **Trigger** — Button click, time delay, message count, scroll-based
- **Lead Form** — Fields to capture before access
- **Allowed Origins** — Domains where widget can be embedded

**Embed code format:**
```html
<script async src="https://meclabsai.com/embed/chat.js?appId=WIDGET_ID"></script>
```

---

## Widget Architecture (Technical)

Based on analysis of the MeclabsAI chat.js embed script:

### Rendering Behavior
- Widget injects at **body level** of the page, not inside target containers
- Uses CSS classes for positioning (`bottom-right-corner`, `float-center`, etc.)
- Starts hidden with `transform: scale(0); opacity: 0`
- Becomes visible when `meclabs-ai-widget-visible` class is added

### Container Detection
The widget has awareness of `#cfdContainer`:
```css
#cfdContainer #meclabs-ai-widget.bottom-right-corner {
  position: absolute !important;
}
```
However, this only changes from `fixed` to `absolute` positioning—corner positioning is retained.

### Available Positions
- `bottom-right-corner` (default)
- `float-center` (fixed, centered on screen)
- `fullscreen` variant

### Trigger Options
- Auto-open after page load
- Time delay
- Button click
- Scroll-based (user shows interest by scrolling)
- Message count

### Limitations
1. **True inline embedding** — Widget renders at body level by design
2. **Programmatic control** — No exposed JS API for open/close
3. **Deep-linking to App** — Cannot force App-first flow programmatically
4. **Internal styling** — Cannot style inside the widget iframe
5. **CTA deep links** — Making "Book A Call" go directly to Calendly may require Quin's help

### What Requires Flint's Team (MeclabsAI Developers)
- True iframe/inline embedding
- Programmatic App launch
- Custom widget positions beyond presets
- Direct API access for fully custom UI

---

## Making Widgets Feel "App-Like"

MeclabsAI recommended these tactics to reduce "chatbot feel":

### Copy Changes
- Replace: "Hello and welcome! I'm here to help..."
- With: "Run a MECLABS-style diagnostic on one marketing asset..."

### Interaction Design
1. **Button-click trigger** — User explicitly initiates (not time delay)
2. **Scroll-based trigger** — Opens when user shows interest by scrolling
3. **Tool-first language** — "Run Your Audit" not "How can I help?"
4. **Structured intake** — Route to App flow immediately
5. **Report-style outputs** — Consistent headings, not conversational

### Page Layout
Surround the widget with app-like context:
- Clear headline explaining the tool
- Feature boxes showing deliverables
- "How It Works" steps
- Professional design (not chatbot aesthetic)

---

## Current MeclabsAI Assets

### Exit-Window Marketing Audit (Concept Stage)

| Component | Name | ID |
|-----------|------|-----|
| Expert | MECLABS Marketing Audit Coach | `wKZB8QMbPL` |
| App | MECLABS Audit Tool | `KJNAphwyIt` |
| Widget | Exit-Window Audit Widget | `yv11q9AWNT` |

**Dashboard Links:**
- Expert: https://meclabsai.com?settings=experts&id=wKZB8QMbPL
- App: https://meclabsai.com?settings=apps&id=KJNAphwyIt
- Widget: https://meclabsai.com?settings=embed-widget&id=yv11q9AWNT

---

## MECLABS Heuristics (For Reference)

The MECLABS conversion formula: **C = 4m + 3v + 2(i-f) - 2a**

Where:
- **C** = Probability of conversion
- **m** = Motivation of the user
- **v** = Clarity of value proposition
- **i** = Incentive to take action
- **f** = Friction in the process
- **a** = Anxiety about taking action

### Diagnostic Lenses Used in Audit Tools

1. **Clarity** — Is the primary value claim clear?
2. **Intent Match** — Does the message match audience motivation?
3. **Differentiation** — Why choose this vs alternatives?
4. **Proof/Credibility** — Is there specific, verifiable support?
5. **Friction** — Steps, complexity, cognitive load
6. **Anxiety** — Risk, trust gaps, uncertainty
7. **CTA Continuity** — Message match from source to next step
8. **Offer Strength** — What's being exchanged and is it clear?
9. **Sequencing** — Information in the right order?

---

## Useful MeclabsAI Experts

Based on Hugo's experience:
- **Expert Creator** — For building custom Experts
- **App Maker** — For creating structured intake Apps
- **Marketing Genius** — General marketing advice and feedback
- **Project Planner** — Good for creating actionable items and plans

---

## Best Practices

1. **Start with Expert Creator** — Define the AI reasoning first
2. **Iterate the prompt** — Test and refine before building Apps
3. **Use structured intake** — Apps provide consistency
4. **Test embedding early** — Widget behavior may surprise you
5. **Keep widgets simple** — Lead forms with fewer fields convert better
6. **Document asset IDs** — You'll need them for troubleshooting
7. **Share MeclabsAI conversation links** — Include them in updates to Gary so he can see the process
