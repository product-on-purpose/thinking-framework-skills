# Eval cases: think-random-perspectives

> Trigger and output evaluation, derived from `SKILL.md`, `references/engine.md`, and `evidence/dossier.md`. No runner yet; these are the cases to check by hand or wire into evals later.

## Should trigger

- "I keep circling the same framing for this retention problem and cannot get out of it. Throw three random frameworks at it to shake me loose."
- "Give me three unexpected, off-pattern lenses on this strategy, even ones that do not obviously fit, to surface what I am missing."
- "We are fixated. Draw some frameworks at random and apply them so we see angles we would never reach for."
- "Use seed 'wildcard' and run three random thinking frameworks on this problem so the run is reproducible."

## Should NOT trigger (wrong tool / near-miss)

- "Apply the three most relevant frameworks to this decision and synthesize them." (near-miss: best-fit ranked application, which is `think-top3`)
- "Which framework actually fits this stakes-bearing call? Recommend the fewest moves." (near-miss: fit-first routing, which is `think-framework-advisor`)
- "Give me one random-stimulus prompt to spark ideas." (single stimulus, not a meta-rotation, use `think-far-analogy-ideation`)
- "Rotate the fixed facts, upside, risk, and alternatives lenses over this decision." (a curated lens set inside one method, that is `think-parallel-perspectives-review`)
- "Flip the one assumption we are taking for granted." (single premise flip, use `think-assumption-reversal`)

## Output checks (a good output must)

- [ ] Draw exactly three frameworks at random (seed or fresh draw stated), each name present in the recommendable corpus.
- [ ] Not quietly fit the draw to the topic; the selection ignores relevance on purpose.
- [ ] Apply each framework, emitting its real artifact, and flag poor structural fit rather than swapping it out.
- [ ] Harvest the non-obvious angles the draw exposed.
- [ ] Present the set as a fixation-breaker, not a fitted recommendation to act on.

## Value vs unaided baseline

Unprompted, a strong model picks sensible, relevant frameworks, which is exactly what reinforces a stuck framing. This skill forces a deliberately unranked random draw of three whole frameworks, full application of each, and a harvest of non-obvious angles, with an explicit honesty caveat that the set is exploratory, not a fitted recommendation.
