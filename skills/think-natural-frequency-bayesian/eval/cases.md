# Eval cases: think-natural-frequency-bayesian

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "Our fraud model flags a transaction. It's 95% accurate and fraud is 0.5% of transactions. If it flags one, what's the real chance it's fraud?"
- "A screening test is 90% sensitive with a 5% false-positive rate and the condition affects 2% of people. A patient tests positive - what's the actual probability they have it?"
- "Sales treats every 'high-intent' flag from our model as a hot lead. Given the base rate, what does a flag actually mean?"
- "Help me interpret this positive A/B signal given how rare a real effect is for us."
- "Walk through this base-rate problem in frequencies so the team stops over-reading positives."
- "Given a positive result, what's the chance it's a true positive? Lay it out as counts, not percentages."

## Should NOT trigger (wrong tool / near-miss)

- "How long will the platform rewrite take, given our past projects?" (near-miss: reference-class forecasting / outside view, not a conditional-probability test result)
- "What's our churn rate this quarter?" (a single statistic, no conditional structure)
- "We don't know the base rate or the model's false-positive rate - just estimate the chance." (no real inputs; the skill must refuse to fabricate)
- "Forecast next quarter's revenue with a range." (forecasting)
- "Brainstorm reasons the model might be wrong." (ideation)
- "Summarize the model's validation report." (summarization)

## Output checks (a good output must)

- [ ] Distinguish P(condition | positive) from P(positive | condition) explicitly.
- [ ] Use real input rates with sources, or flag missing data and refuse to invent numbers.
- [ ] Show a frequency tree over a concrete population (e.g., 1,000).
- [ ] Compute the posterior as true positives / all positives.
- [ ] Name the common wrong intuition (base-rate neglect) and why it is wrong.
- [ ] Be the natural-frequency breakdown artifact, not a bare percentage.

## Value vs unaided baseline

Asked a base-rate question, an unaided model often answers near the hit rate (the same base-rate-neglect error humans make) or, when it lacks the inputs, invents plausible-sounding rates. This skill forces the natural-frequency tree that keeps the base rate in the counts (the format the evidence shows lifts accuracy from ~10% to 50-90%), distinguishes the two conditionals, and refuses to fabricate the input rates - producing an inspectable breakdown instead of a confident wrong number.
