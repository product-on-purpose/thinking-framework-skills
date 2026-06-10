# Regret (Opportunity-Loss) Matrix - Worked Example

A completed run of the `minimax-regret` skill on a real, consequential decision. This is the quality bar a generated regret analysis should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch). Where `think-scenario-planning` builds four uncontrollable external worlds and `think-expected-value-decision-tree` would price the launch *if* the adoption states could be probabilized, this skill handles the case where Northwind genuinely *cannot* attach defensible probabilities to how the market adopts a free tier - so it chooses the launch option that minimizes worst-case opportunity loss, with no probabilities over the states. See `docs/internal/AUTHORING.md`.

> No probabilities are placed on the states below. The columns are not ranked or weighted by likelihood. The value is the minimax pick and the binding state, not a forecast.

---

## Focal decision and no-probability precondition

- **Decision:** Choose Northwind's self-serve packaging for the next product cycle - among **(A) no free tier (stay sales-led trial-only)**, **(B) a limited free tier (tight usage caps, few integrations)**, and **(C) a generous free tier (broad individual-value features, open integrations)**.
- **Why no probabilities:** This is a one-shot launch into a market whose response to a Northwind free tier has no precedent. Adoption could be weak, healthy-and-converting, or high-volume-but-low-converting, and there is no base rate or comparable launch to ground a defensible probability on any of those. Expected value cannot legitimately run, so a no-probability criterion is appropriate. (If Northwind *could* source credible adoption probabilities, the right tool would be `think-expected-value-decision-tree`, not this.)
- **Payoff unit and sign convention:** three-year contribution to net new ARR, in $M, net of the incremental cost to serve the free tier. Higher is better.

## Options (rows) - frozen set

- **Option A: No free tier** - keep the sales-led, time-boxed-trial motion; spend nothing on free-tier infrastructure or support.
- **Option B: Limited free tier** - ship a capped free tier (low usage limits, a thin integration set) that acquires users cheaply but converts modestly and costs little to serve.
- **Option C: Generous free tier** - ship a broad free tier (real individual-value features, open integrations) that acquires and activates strongly but carries a heavy cost to serve if volume is high and conversion is weak.

(Set frozen at these three. A fourth idea - "freemium plus a paid prosumer tier" - was dropped as a separate decision for a later cycle; noting it here because, under this criterion, padding the option list could move the column maxima and steer the pick.)

## States of nature (columns) - uncontrollable, un-probabilized

- **State 1: Cold** - the market shrugs at a free tier; self-serve signups are low and Northwind's buyers keep behaving sales-led.
- **State 2: Convert** - a free tier lands well and a healthy share of signups convert to paid; the self-serve motion works as hoped.
- **State 3: Flood** - a free tier draws high signup volume but a low conversion rate; the funnel fills with users who consume support and infrastructure without paying.

(Discrete, mutually exclusive, and outside Northwind's control - Northwind sets the packaging, not how the market responds. Enumerable, so the matrix holds at step one.)

## Payoff matrix

Three-year net new ARR contribution, $M, net of cost to serve. Estimates are Northwind's planning figures; no cell is invented to force a result, and each is a real planning input.

| Option \ State | State 1: Cold | State 2: Convert | State 3: Flood |
|---|---|---|---|
| A: No free tier | 6 | 6 | 6 |
| B: Limited free tier | 5 | 12 | 4 |
| C: Generous free tier | 2 | 20 | -3 |
| **Column best** | **6 (A)** | **20 (C)** | **6 (A)** |

(Read the rows: A is flat at 6 because a sales-led motion is roughly indifferent to how a free tier would have done. B gives up a little in the Cold state, gains in Convert, and is only mildly hurt in Flood because its caps limit the cost to serve. C swings hardest - biggest upside in Convert, biggest loss in Flood where the generous tier's cost to serve outruns conversion.)

## Regret matrix

For each column, regret = (column-best payoff) minus (this cell's payoff). Column-best gets 0; every other cell is a positive opportunity loss. Then take each row's maximum regret.

| Option \ State | State 1: Cold | State 2: Convert | State 3: Flood | **Max regret (row)** |
|---|---|---|---|---|
| A: No free tier | 0 | 14 | 0 | **14** |
| B: Limited free tier | 1 | 8 | 2 | **8** |
| C: Generous free tier | 4 | 0 | 9 | **9** |

(Worked: in Convert the best is C at 20, so A's regret is 20 minus 6 = 14 and B's is 20 minus 12 = 8. In Flood the best is A at 6, so C's regret is 6 minus (-3) = 9. Each row's max is its single worst opportunity loss across the three states.)

## Minimax pick and binding state

- **Minimax pick: Option B, the limited free tier** - its maximum regret is 8, the smallest of the three max-regret values (14, 8, 9).
- **Binding state: Convert** - B's worst-case regret of 8 occurs in the Convert state, where a generous tier (C) would have captured 8 more $M of ARR. That is the opportunity loss B accepts in exchange for never being badly exposed.
- **What this means:** choosing the limited free tier guarantees Northwind's opportunity loss never exceeds 8 $M whatever the market does. The generous tier (C) has a *higher* ceiling on regret (9, in Flood) despite its huge Convert upside, and no free tier (A) has the highest regret of all (14, in Convert) because it forfeits the entire self-serve upside. B is the worst-case-opportunity-loss hedge.

## Sibling-criterion and IIA check (honesty rail)

- **What maximin would pick (best worst-payoff):** Option A. Its worst payoff is 6 (in every state), versus B's worst of 4 (Flood) and C's worst of -3 (Flood). Pure maximin protects the floor and picks "no free tier." Minimax regret disagrees: it judges that A's safety costs too much forgone upside (a regret of 14 in Convert), and prefers B. The two criteria pointing at different options is exactly why this pick is reported as a hedge, not as the one rational answer.
- **Where the criteria disagree:** maximin says A (protect the floor), minimax regret says B (limit the worst opportunity loss), and a maximax optimist would say C (chase the 20 in Convert). On the same matrix, three defensible criteria give three different answers - this is reported, not hidden.
- **IIA fragility:** the pick is moderately sensitive to the option set. If a fourth option were added that beat C in the Convert column, B's regret in Convert (and so its max regret) could rise and the ranking could shift, even though nothing about B changed. This is the Chernoff (1954) independence-of-irrelevant-alternatives flaw in action, and the reason the option set was frozen and the dropped "prosumer tier" idea was named rather than silently included.

---

*Note how this differs from its neighbors on the same Northwind decision. `think-expected-value-decision-tree` would attach probabilities to Cold / Convert / Flood and roll back an expected ARR - which is the right move only if those probabilities are defensible; here they are not, so that tool cannot legitimately run. `think-scenario-planning` would build the uncontrollable external worlds as narratives and look for moves robust across all of them, without ever scoring a single best option. `think-decision-option-review` would score A, B, and C on weighted attributes Northwind asserts (cost, strategic fit, effort) with no states of nature at all. Minimax regret does the one thing none of those does: it chooses a single option by minimizing the maximum opportunity loss across states it refuses to probabilize, and it names the state that binds that choice.*
