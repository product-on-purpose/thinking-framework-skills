# Eval cases: think-top3

> Trigger and output evaluation, derived from `SKILL.md`, `references/engine.md`, and `evidence/dossier.md`. No runner yet; these are the cases to check by hand or wire into evals later.

## Should trigger

- "Here is a messy decision about whether to sunset our free tier. Give me the most relevant thinking frameworks worked end to end on it, and tell me what they jointly say."
- "I do not want a plan of what to run. Apply the three best-fitting frameworks to this re-org problem and synthesize the result."
- "Several methods could apply to this pricing change. Rank the three most relevant and actually run each on it."
- "Work my launch-timing call through the top three frameworks for it and reconcile their conclusions into one read."

## Should NOT trigger (wrong tool / near-miss)

- "Which thinking method should I even use here? Just tell me what to do next." (near-miss: routing and recommendation only, which is `think-framework-advisor`; it subtracts and hands off, it does not apply)
- "I am stuck in the same framing. Hit me with three unexpected lenses to break out of it." (near-miss: anti-fit fixation-breaking, which is `think-random-frameworks`)
- "I already know I want a premortem on this." (single known method, run `think-premortem` directly)
- "I have a decision already chosen among compared options and want to pressure-test it before committing." (a curated chain fits, use the stress-test-decision recipe, not an ad-hoc set)
- "Summarize what the team shipped this sprint." (not a thinking task)

## Output checks (a good output must)

- [ ] Select exactly three frameworks, each named with a name present in the recommendable corpus, each with a one-line reason it ranked.
- [ ] Apply each framework, emitting its real artifact (the filled template), not a recommendation to run it.
- [ ] Ensure the three do distinct cognitive jobs, with no near-duplicate lenses.
- [ ] Include a cross-framework synthesis that reconciles convergence, conflict, and the load-bearing conclusion.
- [ ] Carry each framework's evidence tier honestly and not present the meta-skill's selection as validated.

## Value vs unaided baseline

Unprompted, a strong model either recommends methods without running them (the advisor's job) or runs one ad hoc. This skill forces a relevance-ranked selection of exactly three, full application of each into its real artifact, and a cross-framework synthesis, while keeping tiers honest and deferring to a recipe when a curated chain fits.
