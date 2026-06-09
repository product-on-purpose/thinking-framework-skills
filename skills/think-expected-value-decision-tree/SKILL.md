---
name: think-expected-value-decision-tree
description: Evaluates competing actions under uncertainty by building a decision tree of choice and chance nodes, placing explicit probabilities on outcomes the decider does not control, rolling the tree back to an expected value per option, recommending the best-EV branch, and adding a what-flips-it note naming the probability or value that would reverse the choice. Use when a decision turns on uncertain outcomes you can put rough probabilities on, when the structure is sequential (a choice opens chance events that open later choices), and when the stakes justify making the probability assumptions explicit and inspectable instead of buried in a gut feel.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.expected-value-decision-tree
  family: decision-and-option-evaluation
  evidence-tier: "P"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Expected Value Decision Tree

When a decision turns on outcomes you do not control, the reflex is to argue the options in prose and decide on a hunch. An expected-value decision tree refuses that. It prices the uncertainty: lay out the options as a tree of **choice nodes** (branches the decider controls) and **chance nodes** (branches nature controls, each carrying a probability), put values at the leaves, then **roll the tree back** right to left so every chance node collapses to its expected value (the sum of probability times value) and every choice node keeps its best branch. What survives the rollback is the highest-EV option and the path that produces it. The load-bearing ingredient, the thing a deterministic option matrix cannot express, is the chance node. The output is a **decision tree with rolled-back EVs, the chosen branch, and a what-flips-it note**, never a bare EV number presented as the answer.

## When to Use

- A decision genuinely hinges on uncertain outcomes you can put rough, sourceable probabilities on (a launch with a real failure rate, an investment with uncertain payoffs).
- The structure is sequential - a choice now opens chance events that open later choices ("test first, then decide" vs "commit now").
- The stakes justify making the probability assumptions explicit and inspectable, so a disagreement becomes a disagreement about a named number rather than a clash of intuitions.
- You already have a probability to work with (or can source one), and the remaining question is what to do with it.

## When NOT to Use

- **The probabilities and values are guessed and then trusted.** A tree renders fabricated inputs in the authoritative grammar of arithmetic, manufacturing **false precision** - the central failure mode. A number with no defensible source does not become trustworthy by being multiplied. Where the probability is the hard part, source a base rate with `think-reference-class-forecasting` instead of inventing one inside the tree.
- **The decision is a one-shot with intolerable downside.** EV is an average over many independent repetitions; the law of large numbers guarantees convergence across many bets, not on the single bet in front of you. A positive-EV gamble that includes a small chance of ruin is the wrong call for a one-time, non-repeated decision. The criterion there is risk of ruin or a risk-averse utility, not raw EV - treating the average as the answer is a category error.
- **It is mistaken for descriptive truth.** EV is **normative** (what a coherent decider should do given those numbers), not a description of good judgment. People predictably depart from it via the certainty effect and nonlinear probability weighting (Allais 1953; prospect theory, Kahneman and Tversky 1979), and some of those departures are real risk preferences. The tool's job is to surface the tradeoff, not to declare the risk-neutral answer "correct" and the decider's risk aversion a bias.
- **The outcome space cannot be enumerated or priced.** Deep uncertainty (you cannot even list the outcomes) and incommensurable values that resist a common scale both break the rollback and produce tidy-but-fictional EVs.
- **The call is reversible and low-stakes.** A two-way door does not need a tree; building one is its own small over-process. Triage with `think-one-way-vs-two-way-door` first, before reaching for quantitative machinery.

## Instructions

When asked to choose under uncertainty by pricing outcomes, follow these steps:

1. **Frame the decision and the options.** State the one-line choice and list the real, distinct actions under consideration. If the call is reversible and low-stakes, stop and triage with `think-one-way-vs-two-way-door` instead of building a tree.
2. **Lay out the tree.** For each option, draw the sequence of **choice nodes** (branches the decider controls) and **chance nodes** (branches nature controls). Put the outcomes at the leaves.
3. **Source the probabilities, do not invent them.** For every chance-node fan, assign probabilities that sum to 1, and name where each number came from (a base rate via `think-reference-class-forecasting`, a measured rate, a stated assumption). Flag any probability that is a guess at the node it enters.
4. **Price the outcomes.** Put a value on each leaf in a common unit. Note any outcome whose value resists a common scale (an incommensurable cost), rather than forcing a fake number.
5. **Roll the tree back (fold back), right to left.** At each chance node, replace the fan with its expected value (the sum of probability times value). At each choice node, keep the best-EV branch and prune the rest. Carry the arithmetic explicitly so it can be checked.
6. **Run the what-flips-it (sensitivity) step.** Identify the single probability or value the recommendation is most fragile to, and state the threshold at which it would flip the chosen branch. This is the deliverable's spine, not an optional extra.
7. **Check for ruin and risk attitude before recommending.** If any branch carries a small probability of an intolerable, non-recoverable loss on a one-shot decision, say so and flag that raw EV is the wrong criterion (risk of ruin or a risk-averse utility governs). If the decider's risk aversion is a real preference, surface it rather than overriding it with the risk-neutral EV.
8. **Recommend and emit the artifact.** State the chosen option, its EV, the path that produces it, the what-flips-it note, and any ruin or incommensurability flags, per `references/TEMPLATE.md`.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the filled tree - options, the choice/chance structure, sourced probabilities, the rolled-back EVs with arithmetic shown, the recommendation and path, the what-flips-it note, and a ruin/risk flag - not a prose essay and not a bare EV number.

## Quality Checklist

Before finalizing, verify:

- [ ] The tree separates **choice nodes** (decider controls) from **chance nodes** (nature controls), and each chance fan's probabilities sum to 1.
- [ ] Every probability names its source, and any guessed probability is flagged at the node it enters - no fabricated input is laundered into the arithmetic.
- [ ] Outcomes are priced in a common unit; any incommensurable value is noted, not forced into a fake number.
- [ ] The rollback is shown right to left with explicit arithmetic (chance node to EV, choice node to best branch), so it can be checked.
- [ ] A **what-flips-it** note names the single probability or value the recommendation is most fragile to and the threshold at which the choice flips.
- [ ] A ruin check is run - any small-probability intolerable one-shot loss is flagged, with the note that raw EV is the wrong criterion there.
- [ ] The output is the tree artifact with the chosen path, not a bare EV presented as the answer.
- [ ] No overclaiming: the evidence is practitioner-grade and transferred; claim "prices uncertain outcomes and makes the assumptions inspectable," not a measured gain in decision outcomes (see `evidence/dossier.md`).

## Evidence

Tier **P** (governing; honest read split, capped at P). The split must not be laundered upward. That *expected-value or expected-utility maximization is the normatively correct rule given coherent probabilities and utilities* rests on von Neumann and Morgenstern (1944) and Savage (1954) - an S-tier mathematical result, but it measures the wrong thing for a skill (it establishes the rule given the inputs; it is not evidence that drawing a tree decides better than a cheaper rule). The claim a skill actually makes - *building a tree and computing EV makes a real decider's decisions better than the rule they would otherwise use* - has only practitioner-level, transferred support (clinical decision analysis: Raiffa 1968; Pauker and Kassirer 1980; Bae 2014). The one nameable comparative finding is mixed and indirect (Mhaskar et al. 2014: decision-analysis results concorded with matching RCT systematic reviews in 73% of cases, 27/37, and with single RCTs in only 50%) - it bounds reliability, it does not lift the grade. Every effectiveness datum is from human deciders; none is from an AI-produced EV tree, so the evidence is transferred and the conservative **P** governs. No "decision-tree analysis improves decisions by N%" figure traces to a primary source, and none is asserted. Full grading, sources, and caveats: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed expected-value decision tree on a real decision.
