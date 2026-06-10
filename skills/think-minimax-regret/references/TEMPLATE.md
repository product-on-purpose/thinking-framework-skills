# Regret (Opportunity-Loss) Matrix - Template

Fill this in. The deliverable is the regret analysis - the payoff matrix, the derived regret matrix with each option's maximum regret, the marked minimax pick, and the binding state - not a prose recommendation.

> No probabilities go on the states. Do NOT rank the columns by likelihood or weight them. The whole point of this criterion is to choose *without* a probability distribution. If you can defensibly probabilize the states, this is the wrong tool - use an expected-value decision tree instead.

---

## Focal decision and no-probability precondition

- **Decision:** [the choice under pressure, in one line]
- **Why no probabilities:** [one line confirming the states genuinely cannot be assigned defensible probabilities - a one-shot situation with no base rates, deep uncertainty, etc. If they CAN be probabilized, stop and route to think-expected-value-decision-tree.]
- **Payoff unit and sign convention:** [e.g. "net profit in $M, higher is better" - state it so the regret transform is unambiguous]

## Options (rows) - frozen set

- **Option 1:** [an option you control and could choose]
- **Option 2:** [...]
- **Option 3:** [...]

(Freeze this set. Because the criterion violates the independence of irrelevant alternatives, an unstable or padded option list can steer the answer. Name any options you dropped and why.)

## States of nature (columns) - uncontrollable, un-probabilized

- **State A:** [a discrete, uncontrollable state the world could be in]
- **State B:** [...]
- **State C:** [...]

(Must be discrete, mutually exclusive, uncontrollable, and enumerable. If you cannot list them, the matrix breaks here - that is a framing problem, not a scoring one.)

## Payoff matrix

Payoff of each option in each state (in the unit stated above). Do not invent cells; flag any genuinely unknown cell rather than fabricating it.

| Option \ State | State A | State B | State C |
|---|---|---|---|
| Option 1 | [payoff] | [payoff] | [payoff] |
| Option 2 | [payoff] | [payoff] | [payoff] |
| Option 3 | [payoff] | [payoff] | [payoff] |
| **Column best** | **[max of column]** | **[max of column]** | **[max of column]** |

## Regret matrix

For each column, regret = (column-best payoff) minus (this cell's payoff). The best option in each column gets 0; every other cell is a positive opportunity loss. Then take each row's maximum regret.

| Option \ State | State A | State B | State C | **Max regret (row)** |
|---|---|---|---|---|
| Option 1 | [regret] | [regret] | [regret] | **[worst regret]** |
| Option 2 | [regret] | [regret] | [regret] | **[worst regret]** |
| Option 3 | [regret] | [regret] | [regret] | **[worst regret]** |

## Minimax pick and binding state

- **Minimax pick:** [the option whose maximum regret is the SMALLEST of the max-regret column] - worst-case regret = [value].
- **Binding state:** [the state in which the chosen option incurs that worst-case regret - the state the whole recommendation turns on].
- **What this means:** choosing [pick] guarantees the opportunity loss never exceeds [value], whatever state arrives. That is the hedge against being badly wrong.

## Sibling-criterion and IIA check (honesty rail)

- **What maximin would pick (best worst-payoff):** [option, and whether it agrees with the minimax-regret pick].
- **Where the criteria disagree:** [note any divergence - minimax regret is one criterion among several, not the uniquely rational answer].
- **IIA fragility:** [would adding or removing a plausible option flip the pick? If the result is fragile to the option set, say so - this is the criterion's central formal flaw].
