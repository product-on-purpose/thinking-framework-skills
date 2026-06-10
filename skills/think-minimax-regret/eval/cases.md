# Eval cases: think-minimax-regret

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "We have three launch options and the market could go three ways, but honestly we have no idea which - no base rates, no comparable launch. I don't want to make up probabilities. Pick the option that hedges against the worst regret."
- "Lay out a payoff table for our options against the possible states of the world, then turn it into an opportunity-loss table and tell me which option minimizes the maximum regret. No probabilities - we can't defend any."
- "This is a one-shot bet on a brand-new category. Expected value won't work because I can't probabilize the outcomes. Which choice leaves us least exposed to 'we picked the wrong one' across all the states?"
- "Build me a regret matrix: options as rows, the uncontrollable states as columns, and mark the minimax choice and the state that drives its worst case."
- "Three investment options, four scenarios we can't put odds on. I want the option whose worst-case opportunity loss is smallest, and I want to see where each option's worst case bites."
- "Compare what maximin versus minimizing-the-maximum-regret would each pick on this options-by-states table, and show me where the chosen option's regret is worst - we have no defensible probabilities for the columns."

## Should NOT trigger (wrong tool / near-miss)

- "We can put solid probabilities on each market state from our base rates - 50% flat, 30% up, 20% down. Roll those through the options and give me the expected value of each." (near-miss: a defensible probability distribution exists, so this is `think-expected-value-decision-tree` - chance nodes that sum to one, rolled back to an expected value. Discarding the probabilities to run a probability-free criterion would throw away real information.)
- "Score our three vendors on cost, integration fit, security, and time-to-deploy with weights, and tell me which wins overall." (weighted-attribute scoring with no states of nature and no opportunity-loss transform is `think-decision-option-review`; minimax regret needs uncontrollable states and answers a different question.)
- "Help me figure out, imagining myself at 80 looking back, which career move I'd regret not making." (introspective anticipated-regret life heuristic about a felt future emotion - the descriptive "regret theory" cousin, a single-actor no-matrix prompt; this skill is the formal opportunity-loss matrix criterion over discrete states, a different operation. There is no shipped skill for the introspective heuristic to route to, so just decline the matrix framing.)
- "We don't even know what the possible futures are - the whole environment is wide open and I can't list the states." (the states cannot be enumerated, so the matrix breaks at step one; that is a framing problem. Build out the futures first, e.g. with `think-scenario-planning`, before any options-by-states choice rule can run.)
- "Pick the option with the highest possible payoff in the best case - I'm feeling optimistic." (that is the maximax criterion, not minimax regret; minimax regret hedges the worst opportunity loss, it does not chase the best case.)
- "Summarize the pricing options the team discussed for the board deck." (unrelated - a summary request, no decision rule to run.)

## Output checks (a good output must)

- [ ] State the decision in one line and confirm no defensible probability distribution over the states exists (otherwise route to `think-expected-value-decision-tree`).
- [ ] Present a **frozen, defensible option set** (rows) with any dropped options named - so the IIA flaw cannot steer the result.
- [ ] Present discrete, uncontrollable, enumerable **states of nature** (columns) with a stated payoff unit and sign convention.
- [ ] Show the **payoff matrix** with real inputs (unknown cells flagged, not fabricated) and the per-column best.
- [ ] Show the **regret matrix**: column-best = 0, every other cell = (column-best minus cell), no arithmetic slips, plus each option's **maximum regret**.
- [ ] Mark the **minimax pick** (smallest maximum regret) and name the **binding state** where that pick incurs its worst-case regret.
- [ ] Attach **no probabilities** to the columns and do not rank them by likelihood.
- [ ] Include a sibling-criterion note (what maximin / maximax would pick) and an **IIA-fragility** check - presenting the pick as a worst-case-opportunity-loss hedge, not the one rational answer.
- [ ] Deliver the regret-matrix artifact, not a prose recommendation.
- [ ] Not overclaim: keep to a coherent no-probability choice rule; the evidence is practitioner-grade and transferred, with no measured improvement in decision outcomes.

## Value vs unaided baseline

Asked the same question, a strong model tends to either quietly invent probabilities for the states and compute an expected value (exactly the move that is illegitimate when no distribution is defensible), or jump to a single recommendation justified by hand-wavy "on balance" reasoning that never isolates the worst-case opportunity loss. It rarely builds the explicit payoff matrix, performs the column-by-column regret transform correctly (column-best to zero, the rest as gaps), takes each option's maximum regret, and selects the smallest - and it almost never names the binding state or flags the independence-of-irrelevant-alternatives fragility that can silently steer the pick. This skill forces that discipline: an honest no-probability precondition, a frozen option set, an enumerated state set, a correct regret transform, the marked minimax pick with its binding state, and a sibling-criterion-plus-IIA honesty rail. It converts an under-specified "which should we pick?" into a defensible worst-case-opportunity-loss hedge with its load-bearing assumption (which state binds) made explicit - while refusing to dress itself up as the uniquely rational answer.
