# Confirmed-Only Content — Harry's Ministry Redesign

**Purpose:** This is the content baseline for the new high-fidelity redesign project,
not a replacement for `planning/content-outlines/`. Those six files stay as the
record of what the fuller site should eventually say once Harry gives us the real
answers. These six files are what we're actually allowed to design and build
against right now.

**The rule:** No `[NEED]` brackets anywhere. Every sentence either states something
we've confirmed (via the Wayback Machine research, Gary and Nancy directly, or
public record) or it doesn't appear at all. If a whole section had nothing
confirmed behind it, the section is cut, not shrunk to a placeholder.

**What changed from the original outlines, at a glance:**

| Page | Kept | Cut |
|---|---|---|
| Home | Headline, subhead, 3 of 4 quick facts, "what we do," building section | 4th quick fact (impact number), trust strip (Peru team, cut per decision 9/4) |
| Our Story | Opening paragraph, building section, bare name-change fact | The inferred "why the name changed" story, "Why Poptún" entirely, surname |
| Programs | All 4 program names + one real line each | Every operational detail (who/how many/how often), the "how you can help" line |
| Visit | Facility facts | Trip logistics, provide/provide split, team fit — see the flag in that file |
| Give | Framing paragraph, honest current-state FAQ answers | Tax/receipts detail (replaced with one honest line, see decision 9/4), most FAQ |
| Contact | Form, real email, one FAQ answer | Stale social links, response-time promise, "best channel" FAQ |

**One thing this didn't solve:** photos have the identical problem and haven't
been audited yet. Every photo slot across these six files still needs the same
"do we actually have this" pass before a high-fidelity mock can use it. Flagged,
not solved, in this round.

**Decisions locked in during this pass (September 4, 2026):**
- Home's trust strip: cut entirely, not softened.
- Give's tax-deductibility question: one honest neutral line instead of silence
  or a `[NEED]` block. See `05-give.md` for the exact wording, picked from two
  options Hugo reviewed.

---

**Build:** the Astro project in this folder is documented in `BUILD.md`. Run `npm install` then `npm run dev`.
