---
name: think-minimax-regret
description: Produces a regret (opportunity-loss) matrix with the minimax pick and the binding worst-case state, choosing among options over un-probabilized states of nature. Use when a few discrete options face a few discrete uncontrollable states and no defensible probabilities exist. Not an expected-value tree (which needs probabilities) and not an attribute scorecard.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.minimax-regret
  family: decision-and-option-evaluation
  evidence-tier: "P"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Minimax Regret

Some choices pit a few options you control against a few states of the world you do not - the market runs hot, flat, or cold; the rival enters or stays out; the regulation passes or fails - and there is no defensible way to attach probabilities to those states. Expected value cannot run there, because it needs a distribution that does not exist. Minimax regret is the criterion built for exactly that regime. The durable cognitive move is to stop scoring raw payoff and start scoring **opportunity loss**: for each state, ask how much worse off this option leaves you than the option that turns out best in that state, then choose the option whose single worst regret across all states is smallest. It is Savage's less-pessimistic relative of Wald's maximin - it hedges against being badly wrong without throwing away all upside to protect a worst case that barely moves. The output is a **regret matrix with the per-option maximum regret, the minimax pick marked, and the state that binds that pick** - built with no probabilities over the states.

## When to Use

- A few discrete options face a few discrete, uncontrollable states of nature, and no trustworthy probability distribution over those states exists (so an expected-value calculation cannot legitimately run).
- The stakes justify making the trade-offs explicit, and you want a rule that hedges against the "if only I had chosen the other one" outcome rather than one that bets on a guessed distribution.
- One-shot decisions where historical frequencies do not apply: a new-product launch into speculative market scenarios, a one-time investment, a policy choice under deep uncertainty.
- You want a choice rule that is less brutally pessimistic than pure maximin because it scores opportunity loss, not raw worst payoff.

## When NOT to Use

- **Do not use it when a defensible probability distribution exists.** If you can source even rough base rates for the states, discarding them to run a probability-free criterion throws away real information. Price the uncertainty with `think-expected-value-decision-tree` instead (chance nodes whose probabilities sum to one, rolled back to an expected value). Minimax regret is for the regime where expected value legitimately cannot be computed, not a substitute for doing the probability work when it is available. This is the closest sibling and the most important wall.
- **Do not use it to score options on attributes you can assert.** Ranking options on weighted criteria you control (cost, fit, speed, risk) with no states of nature and no opportunity-loss transform is `think-decision-option-review`. That answers "which option scores best on my criteria"; minimax regret answers "which option minimizes worst-case regret across uncontrollable futures." If there are no states of nature, this is the wrong tool.
- **Do not use it when the option set is unstable or gameable.** This is the criterion's deepest formal flaw, not a quibble. Because regret in each state is defined relative to the best option in the current set, adding or removing an option - even a dominated one that would never be chosen - can recompute the column maxima and flip the recommendation (a violation of the independence of irrelevant alternatives, Chernoff 1954). If someone can pad the option list, or the set is fluid, the answer can be steered without changing anything real. Freeze a defensible option set first, or do not use the criterion.
- **Do not invent the states or the payoffs and then trust them.** Like any matrix method, it renders fabricated inputs in an authoritative grammar; a regret table built on made-up cell values produces a confident answer about nothing.
- **Do not present its pick as the one rational answer.** It is one criterion among several (maximin, maximax, Hurwicz, Laplace) that can each recommend a different option on the same matrix. Report it as a hedge against worst-case opportunity loss and note where the criteria disagree, never as the uniquely correct choice.
- **Do not use it when the states cannot even be enumerated.** True deep uncertainty where you cannot list the relevant futures breaks the matrix at step one. That is a framing problem, not a scoring one.

## Instructions

When asked to choose among options under uncertain, un-probabilized states - or whenever a decision has the discrete-options-by-uncontrollable-states shape and no probabilities are available - follow these steps:

1. **Frame the decision and confirm no probabilities.** State, in one line, the choice under pressure. Confirm that the states of nature genuinely cannot be assigned defensible probabilities. If they can, stop and route to `think-expected-value-decision-tree` - that is the right tool, and using minimax regret would discard information.
2. **List the options (rows).** Enumerate the discrete options you actually control and could choose. Freeze this set: because the criterion violates the independence of irrelevant alternatives, an unstable or padded option list can steer the answer. Drop options no one would seriously consider, and say you did.
3. **List the states of nature (columns).** Enumerate the discrete, uncontrollable, mutually exclusive states the world could be in (market hot / flat / cold; rival in / out). If you cannot enumerate them, the matrix breaks here - this is a framing problem, not a scoring one.
4. **Build the payoff matrix.** For each option-by-state cell, record the payoff of that option in that state (profit, net value, utility - state the unit and the sign convention). Do not invent numbers; if a cell is genuinely unknown, mark it and flag the uncertainty rather than fabricating a value.
5. **Transform payoffs into regrets, column by column.** For each state (column), find the best payoff any option achieves in that state. Replace every cell with the gap between that column-best and the cell's payoff - the regret (opportunity loss) for having chosen this option rather than the one that turned out best. The best option in each column gets regret 0; every other cell is a positive number.
6. **Take each option's maximum regret.** For each option (row), find its single largest regret across all states. This is the worst-case opportunity loss that option exposes you to. Record it in a max-regret column.
7. **Apply the minimax rule and name the binding state.** Choose the option whose maximum regret is smallest. Mark it as the minimax pick. Name the state in which that chosen option incurs its worst-case regret - the **binding state** that the whole recommendation turns on.
8. **Sanity-check against the sibling criteria and the IIA flaw.** Note briefly what maximin (best worst-payoff) would pick, and whether any plausible added or removed option would flip the result. If the pick is fragile to the option set, say so. Present minimax regret as a worst-case-opportunity-loss hedge, not the single rational answer.
9. **Emit the regret matrix artifact** per `references/TEMPLATE.md`: the payoff matrix, the regret matrix with the max-regret column, the minimax pick, and the binding state - with the no-probabilities precondition stated plainly.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the filled regret analysis - the payoff matrix, the derived regret matrix with each option's maximum-regret column, the marked minimax choice, and the binding worst-case state - not a prose recommendation. State explicitly that no probabilities were placed over the states. Never attach likelihoods to the columns.

## Quality Checklist

Before finalizing, verify:

- [ ] The decision is one line, and it is confirmed that no defensible probability distribution over the states exists (otherwise this is the wrong tool - route to `think-expected-value-decision-tree`).
- [ ] The option set (rows) is frozen and defensible; no padding, and any dropped options are named - so the IIA flaw cannot steer the answer.
- [ ] The states of nature (columns) are discrete, uncontrollable, and actually enumerable.
- [ ] Payoffs are real inputs with a stated unit and sign convention, not fabricated cell values; unknown cells are flagged, not invented.
- [ ] The regret transform is done correctly: column-best gets 0, every other cell is (column-best minus cell), no arithmetic slips.
- [ ] Each option's maximum regret is taken across all states, and the minimax pick is the smallest of those maxima.
- [ ] The binding state (where the chosen option incurs its worst-case regret) is named.
- [ ] No probabilities are attached to the columns, and the worlds are not ranked by likelihood.
- [ ] The pick is presented as a worst-case-opportunity-loss hedge, with a note on sibling-criterion disagreement and IIA fragility - not as the uniquely rational answer.
- [ ] No overclaiming: the evidence is practitioner-grade and transferred; claim a coherent no-probability choice rule, not a measured improvement in decision outcomes (see `evidence/dossier.md`).

## Evidence

Tier **P** (governing). Minimax regret is a real, named, long-lived decision criterion with an unambiguous lineage (Savage 1951, building on Wald's minimax) and a serious formal literature (Manski 2004; Stoye 2009; and RAND's Robust Decision Making, Lempert et al. 2006). That record supports that the rule is mathematically coherent and has attractive worst-case-regret properties given its formal setup. It does NOT support that a decider - human or AI - who builds a regret matrix and applies minimax makes better real-world decisions than one who uses a cheaper rule; no controlled study measures the generic criterion as a decision procedure against an alternative and finds it improves outcomes. The behaviorally validated "regret" evidence (Bell 1982; Loomes and Sugden 1982; Zeelenberg et al. 1996) belongs to **regret theory** - a descriptive model of anticipated regret under known probabilities - which is a different operation in the very probability regime minimax regret exists to escape; it is deliberately NOT counted toward this grade (borrowing it would launder a cousin's evidence). The criterion also carries a genuine negative formal result - the Chernoff 1954 violation of independence of irrelevant alternatives - which argues for never inflating the grade. Transfer caveat: every datum is a mathematical property of the rule or a finding from human subjects; none studies minimax regret performed by or with an AI agent, so the evidence is transferred and not validated for AI-augmented use. For an agent the honest value is mechanical: build the matrix, run the regret transform without slips, surface the binding state, and refuse to invent cells. Full grading, sources, and caveats: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed regret analysis on a real decision.
