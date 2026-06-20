# QCA - Honest Redirect Brief - Worked Example

A completed run of `think-qualitative-comparative-analysis`, on the shared Northwind scenario. This is the quality bar: the caveat leads, no truth table is produced as valid, and the brief routes to the move the job actually needs.

> Northwind is a B2B SaaS weighing a self-serve free-tier launch and feeling stuck on "build it or not."

> **Evidence caveat (read first):** QCA is tier P established research practice, but it does not fit a single-reasoner session. Simulations show it certifies configurations from noise at the casual scale a session can reach (Krogslund, Choi and Poertner 2015; Lucas and Szatrowski 2014 recovered the correct story 3 times across 70 solutions). This brief does not build the truth table as if valid.

---

## What was asked

- "Run a QCA across our last eight product launches to find which combination of conditions - pricing model, onboarding depth, launch channel - is sufficient for a successful launch, so we can decide whether the free tier will land." The real decision: ship the self-serve free tier or not.

## Why not the QCA truth table

- The input QCA needs is a real population of comparable, deeply-known cases calibrated on shared conditions; eight loosely-remembered launches, each different in market and timing, is not that. Worse, eight cases across three or more conditions is the limited-diversity, casual-calibration regime where the simulation literature shows QCA stamps "sufficient" onto noise - Krogslund and colleagues certified random variables as sufficient, and Lucas and Szatrowski recovered the true story 3 times in 70. A truth table here would hand Northwind a confident "pricing-plus-deep-onboarding is sufficient for success" verdict built from anecdotes, which is exactly the false confidence to avoid. And proper QCA is a research program (calibration justification, robustness tests, negated-outcome analysis), not a session move.

## Is the input even there?

- No. Northwind has eight launches, not a calibrated medium-N population, and no defensible coding of "success" or of each condition's membership. The input precondition fails before any conditions are coded.

## The evidence-based move instead

- A set of comparable past cases, and you want a base rate (an outcome distribution), not coded configurations: `think-reference-class-forecasting`.
- One case, and you want a causal account: within-case process tracing in prose.

- **Chosen move:** `think-reference-class-forecasting`. The honest question behind "which configuration is sufficient for a successful launch" is really "given launches like this, how often do they succeed, and what is the base rate for a self-serve free tier specifically?" Reference-class forecasting takes the comparable past launches as an outcome distribution and gives a defensible base rate, instead of pretending eight anecdotes can certify a sufficient causal configuration. If Northwind later wants to understand why one particular past launch failed, that is within-case process tracing in prose - for each suspected driver, ask what evidence would be necessary or sufficient and check the record - not a cross-case truth table.

---

*Note: QCA was requested by name, so a flat refusal would not help. The honest answer leads with the simulation record, declines to manufacture a sufficient-configuration verdict from eight anecdotes, and hands Northwind a concrete, better-grounded next move: a base rate from the comparable cases it actually has.*
