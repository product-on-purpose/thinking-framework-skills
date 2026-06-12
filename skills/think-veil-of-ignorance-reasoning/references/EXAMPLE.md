# Veiled-Decision Comparison - Worked Example

A completed run of the `veil-of-ignorance-reasoning` skill on a real, consequential decision. This is the quality bar a generated veiled-decision comparison should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) on its ethics dimension. Where `think-scenario-planning` stress-tests the free-tier *bet* against uncontrollable external futures, this skill takes one values trade-off the launch forces - how to ration a fixed support-and-reliability budget across paying and free users when the deciding team's own bonus is tied to paid revenue - and asks what an impartial decider would choose. See `docs/internal/AUTHORING.md`.

> **Evidence caveat (ships with this artifact by construction).** Governing evidence tier: **M (moderate)**. The veil-of-ignorance device has direct, replicated, partly pre-registered controlled support on this exact move (Huang, Greene and Bazerman 2019; Huang et al. 2021; Weidinger et al. 2023), but the measured effect is a directional *shift* in normatively contested judgments toward the greater-good option, not validated "better" decisions. All of it is **human-subject evidence, transferred and not validated for AI-agent execution**. The veiled answer is one input with a known directional push, never a neutral verdict. State the decision rule; a different rule yields a different answer from the same veil.

---

## Focal decision and question type

- **Focal decision:** When the free tier launches, Northwind's support and reliability budget is fixed for the year. Should that budget be rationed strictly by revenue (paying customers get the SLA, support queue priority, and the redundant infrastructure; free-tier users get best-effort and a community forum), or should some floor of reliability and support be guaranteed to free-tier users even though they pay nothing?
- **Question type:** Normative. This is a whose-interests-count trade-off (how much do non-paying users' welfare and the paying customers' purchased guarantees each weigh), not the empirical question of which rationing maximizes revenue. The empirical question is real but separate; the veil applies to the normative one.

## Affected parties

- **Paying enterprise customers** - bought an explicit SLA and priority support; stand to lose responsiveness if budget is diverted to free users.
- **Free-tier users** - pay nothing, but many are individual practitioners and small teams who will rely on the product daily and have no purchased guarantee; stand to lose reliability and any human support.
- **Prospective customers inside the free tier** - the future paying accounts the free tier is meant to convert; their first experience of Northwind is whatever the free tier delivers.
- **The product and support team making this call** - its variable compensation is tied to paid net revenue retention, so it has a direct stake in protecting the paid experience. This is the decider's own group, and the reason the veil is worth running here.

## Load-bearing-identity check

Does desert, a promise, a fiduciary duty, a special relationship, or a compensatory claim make the stripped identity information morally *relevant* rather than bias?

- **Verdict:** Partly yes - flag and scope, do not veil it all away.
- **Detail:** Paying customers hold an explicit promise - a contractual SLA Northwind sold them. That promise is a genuine obligation, not self-serving bias, so the veil must not strip it: an impartial decider behind the veil still honors a commitment already made. The veil is therefore scoped to the *discretionary* budget above the contracted SLA floor - the surplus the team could direct either to faster-than-contracted paid support or to a free-tier reliability floor. Within that scoped sub-question, identity (am I a paying or a free user) is not load-bearing, so the veil applies cleanly.

## Decision rule behind the veil (stated, not assumed)

- **Rule:** Floor-constrained average maximization. Guarantee every party a minimum acceptable floor (no party is left with a product that simply does not work), then allocate the remaining discretionary budget to maximize total user welfare across all parties.
- **Why this rule:** Pure average utility would let the largest, loudest revenue segment absorb all surplus; pure maximin would route everything to the worst-off free user even past the point of diminishing return. The floor-constrained variant is what lab groups behind simulated veils actually converge on (Frohlich and Oppenheimer), and it fits a case where one party (paying customers) already holds a contractual floor and the open question is the surplus. The rule is a choice, not a neutral default - a maximin decider would weight the free-tier floor harder, and that alternative is noted below.

## The veiled choice

With identity stripped and the floor-constrained rule fixed: "What would I want here if I had an equal chance of being any of these parties - a paying customer, a free user, a future convert, or a member of the deciding team?"

- **Veiled choice:** Honor the contracted paid SLA in full, then spend the discretionary surplus first on a basic free-tier reliability floor (the product stays up and core flows work) and a self-serve plus community support path, before spending any surplus on faster-than-contracted paid support. Behind the veil, an equal chance of landing as a free user makes a guaranteed "the product works and I am not stranded" floor worth more than the marginal chance of being a paid user who gets two-hour instead of four-hour responses.
- **Reasoning:** Under equiprobable self-placement the downside of being a free user with a broken, unsupported product is large and concentrated; the downside of being a paid user whose already-contracted SLA is met but not exceeded is small. Floor-constrained averaging routes the surplus to lift the worst floor first.

## The positioned choice

The standard, identity-known answer - the call Northwind's team would actually make from its real position.

- **Positioned choice:** Direct essentially all discretionary budget to the paid experience (premium support staffing, paid-tier redundancy, faster-than-SLA response), and give the free tier strict best-effort with no reliability floor and no human support.
- **Reasoning:** The team's compensation tracks paid net revenue retention; protecting and over-delivering on the paid experience is the legible, rewarded move, and free users "are not paying anything anyway."

## The gap and what it reveals

| | Veiled choice | Positioned choice |
|---|---|---|
| **Option** | Honor paid SLA, then fund a free-tier reliability floor + self-serve support from surplus before over-delivering on paid | All discretionary budget to over-delivering on the paid experience; free tier best-effort with no floor |
| **Rests on** | Floor-constrained averaging behind the veil | The team's revenue-tied incentive and "they do not pay" |

- **Gap:** Wide and one-directional. The positioned choice withholds the surplus from the free-tier floor; the veiled choice funds that floor first.
- **What it reveals:** The positioned call is being driven by the deciding team's own stake (compensation tied to paid revenue), not by an impartial reading of the trade-off. "They are not paying" is doing the moral work of justifying a self-serving allocation. The gap is exactly the silent self-interest the veil exists to surface - and it maps onto the documented self-serving-bias finding (Huang et al. 2021), where the party with the stake systematically discounted the other party until the veil removed the stake.

## Defended position

- **Position:** Honor the contracted paid SLA in full, then fund a basic free-tier reliability floor and a self-serve plus community support path out of the discretionary budget before spending surplus on faster-than-contracted paid support. Revisit once free-to-paid conversion data shows what the floor actually buys.
- **Rule it rests on:** Floor-constrained average maximization, with the contractual paid SLA preserved as a prior obligation the veil does not touch.
- **Directional push acknowledged:** This answer leans toward aggregate welfare across all users, which is the device's known directional push toward the "greater good" option - state it plainly. It is one input to the decision, not a neutral verdict, and the empirical question (does the free-tier floor pay for itself in conversion) still has to be settled separately.
- **What a different rule would produce:** A strict maximin decider would push further - guaranteeing the free-tier floor even at the cost of trimming below-SLA-but-still-contracted paid headroom - because maximin weights the worst-off party hardest. A pure average-utility decider, by contrast, might favor the paid segment if it is large enough to dominate the total. The veil did not settle the rule; it made visible that the positioned choice was settling it by self-interest.

---

*Note how this differs from its neighbors on the same Northwind decision. `think-parallel-perspectives-review` would walk the proposal through each party's eyes in turn - the paid customer's view, the free user's view, the team's view - identity known, and synthesize them afterward. This skill does the opposite with the same party list: it removes identity knowledge and forces one self-interested choice under an equal chance of being any party, then confronts the positioned answer with it. The research controls show the difference is causally real - generic and even utilitarian perspective-taking did not reproduce the veil's effect; the equiprobable self-placement did. The deliverable is a veiled-vs-positioned comparison that surfaces silent self-interest, not a set of per-party reads.*
