---
name: think-veil-of-ignorance-reasoning
description: Produces a veiled-decision comparison that decides a values trade-off as if the decider had an equal chance of being any affected party, under an explicit decision rule, then returns to the positioned decision and names the gap that self-interest was silently driving. Use when a decision distributes benefit and burden across parties, the decider is one of those parties, and the risk is a self-serving call dressed as fairness. Not a neutral verdict, not forecasting, and not for cases where desert, promises, or compensatory claims make identity morally load-bearing.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.veil-of-ignorance-reasoning
  family: ethics-values-deliberation
  evidence-tier: "M"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Veil-of-Ignorance Reasoning

Most contested allocations quietly tilt toward whoever is deciding. The deciding team is one of the affected parties, and "fair" ends up meaning "fair to us." Veil-of-ignorance reasoning refuses that tilt by *removing* the one piece of information that drives it: which affected party you are. The durable move is to decide the trade-off as if you had an equal chance of being each affected person, under a decision rule made explicit, and then return to the actual, positioned decision and confront the gap between the two answers. The mechanism is knowledge removal - de-identification plus equiprobable self-placement - not viewpoint enumeration. You do not walk through each party's eyes one at a time; you make a single self-interested choice under uncertainty about whose eyes you will be looking out of. The output is a **veiled-decision comparison**: the affected parties, the explicit decision rule, the veiled choice, the positioned choice, the named gap and what it reveals, and the final defended position - framed as one input with a known directional push, never as a neutral verdict.

## When to Use

- A decision distributes benefit and burden across parties, and the decider's own position is doing silent work - scarce-resource allocation (who gets the ventilator, the headcount, the discount, the latency budget), or a policy or platform call that trades one group's welfare against another's.
- The deciding team is itself one of the affected parties, and the risk is a self-serving call dressed up as fairness.
- An emotionally uncomfortable but defensible trade-off needs to be made publicly justifiable: "this is what I would want for myself if I did not know who I was going to be."
- The contested matter is normative - whose interests count and how much - not an empirical question of which option performs best.

## When NOT to Use

- **Do not run it without an explicit decision rule behind the veil.** The veil does not by itself produce an answer; the rule brought behind it does. An expected-value rule yields average utilitarianism, a maximin rule yields worst-off priority, and lab groups have converged on floor-constrained averaging instead - same veil, different outputs. Running the exercise without stating the rule launders a contested normative choice as "impartiality." This is the central wall.
- **Do not veil away morally load-bearing identity.** When particular obligations are doing the moral work - promises, fiduciary duties, desert, compensatory claims for past wrongs, special relationships - the stripped identity information is *relevant*, not bias (Sandel's critique). Flag these cases and stop or scope down; do not impartiality-wash them.
- **Do not present the veiled answer as a neutral verdict.** The device has a measured directional push toward the aggregate-welfare ("greater good") option. If worst-off protection, rights, or commitments are what the situation demands, the veiled answer is an input to deliberation, not the decision.
- **Do not use it as training or a durability fix.** Cross-dilemma transfer failed in the research (study 7). It is a per-decision device; run it on the decision at hand or not at all. Claim no lasting impartiality from having run it.
- **Do not use it on an empirical question.** "Which option maximizes retention" needs analysis, not impartiality. The veil applies only when the contested matter is whose interests count.
- **Do not confuse it with walking each stakeholder's perspective.** That is `think-parallel-perspectives-review` (identity-known, one party's eyes at a time, synthesized after). The veil does the opposite with the same party list: it removes identity knowledge and forces one self-interested choice under equiprobability. The research controls show generic and even utilitarian perspective-taking do not reproduce the effect.

## Instructions

When asked to take a defensible position on a values trade-off, or to check whether an allocation is self-serving, follow these steps:

1. **Confirm the question is normative.** State the focal decision in one line. Confirm the contested matter is whose interests count and how much, not an empirical "which option performs best." If it is empirical, stop and route to analysis - the veil does not apply.
2. **Enumerate the affected parties.** List every party the decision distributes benefit or burden across, including the decider's own group and any party with no voice in the room. (If who counts as affected is itself in question, that audit is `think-boundary-critique`, the natural upstream feed; this skill takes the party list as given.)
3. **Run the load-bearing-identity check.** Ask whether desert, a promise, a fiduciary duty, a special relationship, or a compensatory claim for a past wrong makes the stripped identity information morally *relevant*. If yes, flag it and stop or scope the veil to the sub-question where identity is genuinely irrelevant. Do not veil away obligations.
4. **State the decision rule explicitly.** Choose and name the rule carried behind the veil: average utility (equiprobable expected value), maximin (maximize the position of the worst-off), or a floor-constrained variant. The rule is a contested normative choice; surface it, and report it with the result. Refuse to proceed on an unstated rule.
5. **Decide the veiled version.** With the rule fixed and identity stripped, decide: "What would I want here if I had an equal chance of being each of these parties?" Record the veiled choice and the reasoning the rule produced.
6. **Decide the positioned version.** Now answer the standard, identity-known version of the same decision - the call the decider would actually make from their real position.
7. **Name and read the gap.** Compare the veiled and positioned choices. Where they diverge, name what the gap reveals - typically where self-position or group loyalty was silently driving the positioned call. Where they agree, say so; convergence is itself informative.
8. **Take a defended position.** State the final position and the rule it rests on. Frame it as one input with a known directional push (toward aggregate welfare), explicitly not a neutral verdict, and note what a different rule (for example worst-off priority) would have produced.
9. **Emit the veiled-decision comparison artifact** per `references/TEMPLATE.md`, including the pre-printed evidence caveat. The deliverable is the filled comparison, not a prose essay.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the filled veiled-decision comparison - affected parties, the load-bearing-identity check, the explicit decision rule, the veiled choice, the positioned choice, the named gap, and the defended position with its evidence caveat - not a prose essay. Always report the decision rule with the result; never present the veiled answer as a neutral verdict.

## Quality Checklist

Before finalizing, verify:

- [ ] The focal decision is stated in one line and confirmed to be a normative whose-interests-count trade-off, not an empirical question.
- [ ] The affected parties are enumerated, including the decider's own group and any voiceless party.
- [ ] The load-bearing-identity check is run, and any case where desert, a promise, a duty, or a compensatory claim makes identity morally relevant is flagged - not veiled away.
- [ ] The decision rule behind the veil is named explicitly (average utility, maximin, or a floor-constrained variant) and reported with the result - never left implicit.
- [ ] Both the veiled choice and the positioned choice are recorded, and the gap between them is named and read for silent self-position.
- [ ] The final position is framed as one input with a known directional push toward aggregate welfare, never as a neutral verdict, and notes what a different rule would have produced.
- [ ] The output is the veiled-decision comparison artifact, not prose.
- [ ] No overclaiming: the evidence is moderate and transferred from human studies; claim an impartiality aid that surfaces silent self-interest, not a producer of better ethical decisions (see `evidence/dossier.md`).

## Evidence

Tier **M** (governing; moderate). This is one of the rare methods where controlled research tests the *actual move* - the same two-stage exercise the skill runs - rather than an adjacent construct. Huang, Greene and Bazerman (2019, seven experiments, n = 6,261, four pre-registered) found the veiled exercise shifts subsequent judgments toward the greater-good option, with anchoring, reversed-probability, and utilitarian-perspective-taking controls all ruling out the obvious alternatives - the equiprobable self-placement is the active ingredient. Replicated and extended to self-serving bias by Huang, Bernhard, Barak-Corren, Bazerman and Greene (2021, two pre-registered studies) and independently for AI-principle selection by Weidinger, McKee and colleagues (2023, five studies, n = 2,508). The grade is capped at M, not S: the measured outcome is a directional shift in normatively contested judgments, not validated decision quality; cross-dilemma transfer failed (2019 study 7), so it is a per-decision device, not training; and the classic line (Frohlich and Oppenheimer) shows the veil's output depends on the rule carried behind it. It is held at M and not downgraded to P because the controlled studies test this procedure, not a sibling construct. All evidence is from human subjects; the 2023 work has humans choosing principles for AI systems, not agents performing the reasoning, so nothing here is validated for AI-agent execution. The skill ships as an M-tier impartiality aid with a hard "state the rule, never a neutral verdict" wall. Full grading, sources, and caveats: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed veiled-decision comparison on a real decision.
