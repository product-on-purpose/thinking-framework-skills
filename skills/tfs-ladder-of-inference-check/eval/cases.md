# Eval cases: tfs-ladder-of-inference-check

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "I'm convinced our biggest customer is about to churn - they went quiet after the last release. Walk me back through how I got there and whether it holds."
- "My co-founder and I look at the same launch metrics and reach opposite conclusions. Reconstruct how each of us is reading the data."
- "You concluded the regression was caused by the caching change. Reconstruct your own reasoning from raw evidence to that conclusion and flag the weakest link."
- "I keep telling myself the new PM is underperforming, but it feels like a story I built. Lay out the rungs from what I observed to that judgment and test another reading."
- "We decided the experiment failed and we should kill the feature. Before we act, audit that inference: what data did we select, what did we leave out, is there a credible alternative?"
- "Take the conclusion 'engineering doesn't care about quality' and trace it down from the observable facts to show where interpretation crept in."

## Should NOT trigger (wrong tool / near-miss)

- "Give me five feature ideas to improve retention." (ideation)
- "The conclusion is just arithmetic - we lost three $40k contracts, so $120k. Confirm the total." (no inferential leap)
- "I've decided we're migrating to Postgres. Write me a justification that makes the case as strongly as possible." (advocacy, not audit)
- "Should we order pizza or sandwiches for the offsite?" (trivial)
- "Run a premortem on our Q3 launch plan." (risk, not inference audit)
- "Summarize this finished strategy doc into three bullets." (summarization)

## Output checks (a good output must)

- [ ] Be the annotated reasoning-trace artifact (conclusion on top, reconstructed-ladder table, riskiest rung, alternative interpretation), not prose.
- [ ] Reconstruct the rungs in order: observable data available, data actually selected, meaning added, assumptions, conclusion.
- [ ] Include in "observable data available" the data that was left out / not used, not only the selected subset.
- [ ] State meaning added and assumptions explicitly, separate from the data.
- [ ] Name exactly one riskiest / most-likely-wrong rung.
- [ ] Give at least one credible alternative interpretation of the same data with what it implies - testing the climb, not defending the conclusion.

## Value vs unaided baseline

Asked to "check my reasoning," a strong model tends to evaluate whether the conclusion is right and subtly defend it. This skill forces the inverse: surfacing the data that was left out and committing to a credible alternative reading of the same facts, countering the model's own fluent conclusions. Per the dossier (tier P) it claims no measured accuracy gain, only that it makes a silent inferential jump inspectable.
