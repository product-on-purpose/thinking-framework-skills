# Expected Value Decision Tree - Worked Example

A completed run of the `think-expected-value-decision-tree` skill on a real, consequential decision. This is the quality bar a generated tree should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) so examples across skills read as one coherent product. Where `think-decision-option-review` scored the growth options on weighted criteria, this skill takes the one option whose payoff genuinely hinges on an uncertain outcome - the free-to-paid conversion rate - and prices it. See `docs/internal/AUTHORING.md`.

---

## Decision

- Should Northwind launch the self-serve free tier now, run a paid pilot first to learn the conversion rate before committing, or not launch at all.

## Options

- A: **Launch now** - ship the free tier to the whole market this quarter.
- B: **Test first** - run a 6-week paid conversion pilot to a matched segment, then decide go / no-go on the real rate.
- C: **No-go** - stay on the current paid-trial motion.

## Tree

Choice nodes are squares; chance nodes are circles. The load-bearing uncertainty is the same in A and B - whether free-to-paid conversion lands **high** or **low** - but A bets on it blind while B buys the signal first. Values are annualized 12-month contribution in $K, net of infra, support, and cannibalization. Base rate for "high" is sourced, not guessed (see the probability note).

```
[Decision]
 |
 |--[A: Launch now] ---( conversion )-- p=0.35 high [base rate] --> +1200
 |                                      p=0.65 low  [base rate] --> -300
 |
 |--[B: Test first] -- pilot cost -80 --( pilot signal )-- p=0.35 "high" --> [commit] --> +1200
 |                                                         p=0.65 "low"  --> [do not launch] --> 0
 |
 |--[C: No-go] --> 0   (status-quo baseline, no chance node)
```

## Outcome values

- High-conversion launch: **+1200** (durable self-serve motion pays for the infra and lifts paid pipeline).
- Low-conversion launch: **-300** (infra + support + some paid cannibalization, with too-thin paid uptake to cover it).
- Pilot cost: **-80** (6 weeks of build + run, paid before the signal arrives).
- No launch: **0** (baseline).
- **Common unit:** $K annualized contribution vs the status quo.
- **Incommensurable / unpriced:** board optics of shipping (or not shipping) a visible "free tier", and brand signal. Real, but left out of the arithmetic rather than given a fake dollar value - flagged here so they are weighed as judgment, not laundered into the EV.

## Rollback (fold back, right to left)

- **Probability note:** p(high) = 0.35 is a base rate from comparable self-serve B2B launches at this ACP, sourced with `think-reference-class-forecasting`, not invented inside the tree. The pilot in B is treated, for this illustration, as a clean read of which branch is true; in practice it is itself noisy, which only strengthens the case for testing.
- **Option A chance node:** EV = 0.35 x 1200 + 0.65 x (-300) = 420 - 195 = **+225**.
- **Option B pilot signal node:** EV = 0.35 x 1200 + 0.65 x 0 = **+420**, then subtract the pilot cost 80 -> **+340**. (The fold-back of B keeps the high branch and prunes the low branch *because the pilot lets the decision wait* - that option to not-launch after a "low" read is exactly what the test buys.)
- **Option C:** **0**.
- **Per-option EV:** A = +225; B = +340; C = 0.

## Recommendation

- **Chosen:** B, **Test first** - EV **+340**, the highest of the three.
- **Path that produces it:** run the paid pilot; commit to the full launch only on a "high" read, walk away on a "low" read. The pilot's value is that it converts the blind -300 downside of A into an avoidable 0, for an 80 premium.

## What-flips-it (sensitivity)

- **Most fragile input:** p(high), the probability that free-to-paid conversion lands in the high branch.
- **Flip threshold:** B beats A as long as p(high) is below **0.73**; above that, the value of waiting no longer justifies the 80 pilot premium and **Launch now (A)** wins. We are at 0.35, far on the test-first side - the recommendation is robust. (For completeness: A only beats No-go once p(high) > 0.20, so even committing blind is positive-EV here, but it leaves 115 of avoidable downside on the table versus testing.)

## Ruin / risk flag

- **Ruin check:** a public free-tier launch is **hard to unwind** - pricing and packaging are visible to the market and to existing customers, so the "-300" low branch is not a clean financial loss you can quietly reverse; it carries reputational and channel-conflict tails the dollar figure understates. That is not literal ruin (it does not end the company), but it is exactly the kind of asymmetric, hard-to-reverse downside that makes the *option to test before committing* worth more than its raw EV margin suggests. It is also why this decision earns a tree at all rather than a quick reversible call.
- **Risk attitude:** Northwind is capital-constrained this year, so a mild risk aversion is a real preference, not a bias - it reinforces B (cap the downside) over A. Surfaced, not used to override the arithmetic, which already points the same way.

---

*Note how the value is in pricing the uncertainty instead of arguing it: unaided, a strong model tends to debate "should we launch the free tier?" in prose and land on a hedge. The tree forces the one number that matters (the conversion base rate) into the open, shows that the right move is not launch-vs-no-launch at all but **buy the signal first**, and states exactly how good conversion would have to look (p > 0.73) to justify committing blind. Source the chance-node probability with `think-reference-class-forecasting`; if the call had been reversible and low-stakes, `think-one-way-vs-two-way-door` would have triaged it away before any tree was warranted.*
