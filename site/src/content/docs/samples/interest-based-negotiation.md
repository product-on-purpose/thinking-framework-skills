---
title: "Interest-Based Negotiation - quick sample"
description: Interest-Based Negotiation on a two-team negotiation over who owns a shared service and its on-call burden.
sidebar:
  label: interest-based-negotiation
---

> A compact worked example of [Interest-Based Negotiation](../../frameworks/think-interest-based-negotiation/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-interest-based-negotiation/).

## Situation

Daniel's Platform team owns a shared notifications service that three product teams depend on. The Payments team wants Platform to take over a flaky message-queue component Payments built, plus its 24/7 on-call rotation, before Payments can ship its next milestone. Platform's lead has dug in on "we will not adopt code we did not write," Payments' lead has dug in on "it is shared infrastructure, so it is yours," and the two have been trading the same two sentences in Slack for a week. A decision is needed before the next planning cycle in eight days.

## Prompt

```
/think-interest-based-negotiation "Payments wants my Platform team to absorb their flaky queue component AND its on-call rotation before their next milestone. Their lead says 'shared infra is yours,' I keep saying 'we don't adopt code we didn't write,' and we're stuck. I need a real prep map before planning next week - what are we actually fighting about and what could a deal look like."
```

## The artifact

> **Evidence caveat (ships with the artifact).** This map is a P-tier (practitioner) preparation aid. Its component moves - separating interests from positions, anchoring on a best alternative, creating value across differently-valued issues - rest on moderate-grade evidence from human-dyad studies; the five-element package as a whole has no controlled validation, and none of it is validated for AI-produced preparation. Treat this as a structuring aid that improves the decision, not a predictor or a guarantee of a better outcome. See `evidence/dossier.md`.

> This is preparation deskwork. It does NOT script the live table (phrasing, concession timing, responses to tactics). And it does NOT manufacture win-win on a genuinely single-issue distributive haggle - on those, report the zone-only read and skip the value-creation rows.

---

### The deal in one line

- **Deal / decision under pressure:** Settle, before next week's planning cycle, who owns the shared notifications queue component and its on-call burden, on terms that do not sink Platform's roadmap or block Payments' milestone.
- **Parties (whose agreement is required):** Daniel's Platform team and the Payments team. Payments' agreement is required - Platform cannot just refuse and have the problem disappear, because the component is on the critical path for a service Platform also runs.
- **Issues in play:** code ownership of the queue component, the on-call rotation for it, a hardening / rewrite effort, the timing relative to Payments' milestone, headcount or temporary engineer loan, and the alerting / SLA the component must hit. Multiple issues valued differently - this is integrative, not a single-issue haggle.
- **Is this single-issue and distributive?** No. "Ownership" is really several separable issues (code, on-call, rewrite, timing, staffing) the two sides value differently - the full map applies.

### Positions and interests (both sides)

A **position** is what a party says it wants; an **interest** is the need the position serves. Surface yours, infer theirs.

| Party | Stated position | Underlying interests | Rank / confidence | Disclose or hold |
|---|---|---|---|---|
| **Platform (you)** | "We do not adopt code we did not write." | (1) Not inheriting an unbounded on-call burden that wrecks the team's nights and weekends; (2) not absorbing a component whose quality we cannot vouch for without a hardening pass; (3) protecting the current roadmap from an unplanned multi-sprint hit; (4) setting a precedent that other teams cannot dump their tech debt on Platform by relabeling it "shared infra." | 1 and 3 top; 2 high; 4 high but long-game | 1, 2, 3 safe to disclose (they explain the refusal honestly); 4 HOLD (naming "precedent" out loud reads as political and hardens them) |
| **Payments** | "It is shared infrastructure, so ownership is yours." | (1) Getting their on-call pager to stop firing at 3am on a component they are tired of carrying; (2) freeing their engineers to focus on the milestone they are measured on; (3) not being blamed if the queue causes a customer-facing incident during the milestone push; (4) avoiding the cost of a rewrite they do not have time for. | (1) and (2) high confidence; (3) high; (4) medium | n/a (inferred) |

(Each Payments interest is an inference, flagged. Payments' interest 2 - milestone focus - is the real driver behind the "it is yours" position; the ownership framing is a means to that end, not the end itself. Platform's interest 4, the precedent worry, is the most dangerous to disclose because it converts a technical conversation into a turf fight. Held.)

### Best alternative and reservation point

- **Your best alternative away from the table:** Escalate to the shared engineering director for a ruling on ownership, and in the meantime keep the queue component where it is (Payments owns it, Payments stays on call). This is real and available, not "walk away" - the director arbitration path exists and has been used before.
- **Value of your alternative:** Mediocre. Escalation likely lands somewhere in the middle anyway, costs both leads political capital, sours the cross-team relationship Platform depends on every quarter, and burns a week of the eight Daniel has. It protects Platform from the worst outcome but produces a slow, resentful result.
- **Your reservation point:** Any deal worse, all-in, than "Payments keeps the component and on-call, and we escalate the disputed parts" is a walk. Concretely: Platform will not take both the code and unbounded on-call without (a) a funded hardening pass and (b) a bounded, shared on-call ramp. Below that line, escalation beats signing.

(A named, valued alternative - director escalation with the status quo preserved - is in hand, so an accept-or-walk call is grounded.)

### The zone of possible agreement

- **Counterparty's estimated alternative:** Payments keeps carrying the pager and the rewrite themselves, which directly threatens their milestone, the thing they are measured on (high confidence). Their alternative is weak - that is the source of their urgency.
- **Counterparty's estimated reservation point:** They need the on-call pain and the incident-blame risk off their plate before the milestone; they will likely concede on full code-ownership transfer and on timing if those two interests are met (medium-high confidence). They probably cannot fund a rewrite from their own budget (medium confidence).
- **Zone of possible agreement:** Positive. Payments walks if their pager keeps firing through the milestone; Platform walks if it inherits unbounded on-call and unowned code with no hardening. The overlap lives in the NON-ownership issues - who pays for hardening, how on-call is shared during a ramp, and the SLA the component must hit - which is exactly where value creation happens. Framed as a binary "whose is it," the zone looks empty; unbundled into its real issues, it opens.

### Options for mutual gain (value creation)

Trades built from issues the two sides value differently - what is cheap for you and dear to them against what is dear to you and cheap for them.

| Option / trade | What you give (cheap for you) | What you get (dear to you) | Why it is mutual gain |
|---|---|---|---|
| Phased ownership with a hardening gate | Platform commits to ADOPT the component, but only after a joint hardening pass closes the top defects; on-call transfers in stages | A funded, bounded hardening pass before the unbounded burden lands (interests 1, 2) | Payments gets a committed handoff date that protects the milestone; Platform never owns code it has not vetted |
| Shared on-call ramp | Platform joins the rotation in parallel for one quarter while Payments stays primary | On-call load is bounded and shared during the riskiest window instead of dumped overnight (interest 1) | Payments' pager pain drops immediately; Platform learns the component before it is solely responsible |
| Loaned engineer funds the rewrite | Platform owns the component long-term | A Payments engineer is seconded to Platform for the rewrite sprint, so the hardening is not an unfunded roadmap hit (interest 3) | Cheap for Payments (one engineer for a sprint vs. carrying it forever); high-value for Platform's roadmap protection |
| Written SLA + precedent note | Platform accepts the component | A documented adoption-criteria SLA that any future "shared infra" handoff must meet | Quietly serves Platform's precedent interest (4) without a turf fight; gives Payments a clean, defensible handoff |

### Objective criteria for dividing value

The legitimacy standards both parties could accept for the division - not willpower, not splitting the difference.

- The org's existing service-ownership and on-call policy (precedent / prior agreements).
- The component's actual incident and pager-frequency data over the last two quarters (independent benchmark - grounds "how bad is it" in numbers, not adjectives).
- How a comparable prior handoff between two other teams was structured (precedent / comparable).
- A platform-team adoption checklist (test coverage, runbook, alerting) as the agreed bar the component must clear before transfer (independent standard).

### Follow-through (so "yes" survives contact with reality)

- **Monitoring / milestones:** A handoff checklist with dated gates - hardening complete, runbook written, alerting wired - each signed off jointly before the next stage of on-call transfers.
- **Dispute-handling:** A named escalation path (the shared eng director) reserved only for a stalled gate, plus a standing 15-minute weekly sync during the ramp quarter.
- **Review / renegotiation triggers:** Reopen the on-call split if pager frequency stays above the agreed threshold 60 days after the hardening pass, or if Payments' seconded engineer is pulled back early.

### The accept-or-walk read

Press for a deal in the zone, but win it on the unbundled issues, not the "whose is it" binary: phased ownership behind a funded hardening gate, plus a one-quarter shared on-call ramp, plus a seconded Payments engineer to fund the rewrite, delivers Platform's real interests (no unbounded on-call, no unvouched code, protected roadmap) while giving Payments what it actually needs - the pager and the blame risk off its plate before the milestone. Hold the precedent interest and serve it quietly through the written adoption SLA. If Payments refuses both the hardening gate and the shared ramp - insisting on a clean overnight dump of code and pager - escalate to the director and keep the status quo, because that alternative is genuinely better all-in than inheriting an unowned, unhardened component on unbounded call.

## Why this framework fits

The Slack stalemate was a position fight - "ours" versus "yours" - that nobody had checked for an actual conflict of interests; the map shows the interests barely conflict (Payments wants pager pain gone before its milestone, Platform wants no unbounded burden on unvetted code), and the real overlap lives in issues neither lead had named. Unaided, Daniel would have escalated and absorbed a middle-ground ruling; the artifact gives him a concrete trade package and a grounded walk line he can take into planning instead.
