# Eval cases: think-interest-based-negotiation

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "I'm going into a contract renewal with our biggest vendor next week - multiple things on the table (price, term, support level). Help me prepare: what do we actually want under the price ask, what's our walk-away, and where could we trade to a better deal for both of us?"
- "We're hiring a senior engineer and the offer is stuck on base salary. Map out their likely interests behind the number, our best alternative if they decline, and the package trades (equity, start date, scope, remote) that might unlock a yes."
- "Two of our teams are fighting over the same shared infra budget. Prepare an interest-based plan - what each side really needs behind its stated position, and options that could give both more than splitting the budget down the middle."
- "Before I negotiate this partnership, I want my BATNA named and valued, an estimate of theirs, the zone where a deal beats no deal, and a few mutual-gain options - not a script for what to say in the room."
- "Help me prepare for a licensing negotiation. Separate their positions from their interests, work out our reservation point against our alternative, and find where we value the terms differently so we can logroll."
- "Set up the prep for buying out this small competitor - both sides' interests, the walk-away alternatives, the objective standards we can point to on valuation, and what follow-through the agreement needs."

## Should NOT trigger (wrong tool / near-miss)

- "We're deciding between three vendors for our data warehouse - no negotiation, just pick the best one for us. Score them on cost, performance, and support." (no counterparty whose agreement is required; this is solo option evaluation - `think-decision-option-review`, not a negotiation prep map.)
- "It's a fixed-price item, take it or leave it, one number, we'll never deal with them again - just tell me whether to buy at that price." (genuinely single-issue, one-shot, distributive; there is nothing to logroll. The honest output is a zone-only read - is the price below our reservation point - not a manufactured win-win.)
- "Should we even launch the self-serve free tier at all? Just help me make that internal call." (a decision Northwind alone controls, no other party's agreement required - settle it with a solo decision skill; there is no negotiation to prepare.)
- "I'm about to negotiate but I have no other options at all - they know it and I know it. Just get me the best terms I can." (the best alternative is undefined and weak; the first move is to develop an alternative or recognize the duress, not to run an integrative prep that pretends leverage exists.)
- "We're in the room right now - tell me exactly what to say when they lowball us and how to time my concessions." (live-table tactics and concession scripting are explicitly out of scope; this skill is preparation deskwork only.)
- "Summarize the terms we agreed to last quarter for the board." (unrelated; no negotiation to prepare.)

## Output checks (a good output must)

- [ ] Confirm a counterparty exists and state the deal and the parties in one line; if there is no counterparty, route to a solo decision skill instead of producing a map.
- [ ] Separate **positions from interests on BOTH sides** - the user's interests ranked, the counterparty's inferred with confidence flags - not just one side.
- [ ] Mark, for each of the user's interests, whether it is **safe to disclose or should be held**; do not assume good faith by default.
- [ ] Name a **best alternative away from the table, value it, and derive a reservation point**; make no accept-or-walk recommendation without one (and if the alternative is undefined, name developing it as the first action).
- [ ] Estimate the counterparty's alternative and **state the zone of possible agreement** - including an explicit "unknown" or "negative / no overlap" read when that is the truth.
- [ ] Build **options for mutual gain from genuine valuation differences** - or, on a single-issue distributive case, honestly report a zone-only read with no manufactured win-win.
- [ ] Name **objective criteria** for dividing value and the **follow-through** commitments an agreement must carry.
- [ ] Deliver the negotiation preparation map artifact, not prose, and not a live-table script.
- [ ] Not overclaim: keep to a preparation aid; the evidence is practitioner-grade with moderate-grade components, transferred from human dyads, and the package is not a guarantee of a better outcome (the evidence-caveat line is present).

## Value vs unaided baseline

Asked the same question, a strong model tends to coach the live table - what to say, when to concede, how to anchor - and to treat the negotiation as a single-axis price fight to be split down the middle. It rarely models the counterparty's interests separately from their stated position, rarely insists on a named and valued walk-away alternative before any accept-or-walk call, and rarely constructs trades from the fact that the two sides value the issues differently. It also tends to assume good faith and to coach openness that can be exploited. This skill forces the discipline: both-sides interest elicitation with confidence and disclose-or-hold flags, a named and valued best alternative with a derived reservation point, an explicit zone-of-possible-agreement read (including the honest "no overlap" case), value creation across differently-valued issues before division, objective criteria for the split, and follow-through - all as preparation deskwork, with a hard refusal to manufacture win-win on a real distributive haggle or to emit an accept-or-walk call without a walk-away anchor. It converts a position fight into a structured two-party decision against an explicit alternative.
</content>
