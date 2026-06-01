# Eval cases: tfs-what-would-have-to-be-true

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "We're about to commit engineering to a self-serve free tier to hit our Q3 target. What would have to be true for this to actually be the right bet?"
- "The team has argued for two weeks about moving upmarket into enterprise. It's just dueling opinions now. Help me cut through it."
- "I want to acquire this competitor. The deal looks great but I think I'm being optimistic. Pressure-test the assumptions my case rests on."
- "We've narrowed to building the integration in-house. Before the go/no-go, surface the conditions this depends on and which to test first."
- "My VP is convinced doubling the sales team fixes our pipeline. What conditions would need to hold for that to be the best use of budget, and how confident should we be?"
- "Lay out the load-bearing assumptions behind our plan to enter Europe and tell me which is most likely to sink us if it's wrong."

## Should NOT trigger (wrong tool / near-miss)

- "We shut down the free-tier launch after six months and it flopped. Run a retrospective." (after the fact)
- "Brainstorm a wide list of growth strategies for next year, nothing decided." (ideation)
- "Build me a scorecard comparing four vendor proposals so I can pick one." (decision comparison)
- "PostgreSQL or MySQL for an internal logging tool? Quick reversible call." (trivial)
- "Imagine our launch failed six months from now; map everything that caused it." (near-miss: premortem, failure causes not success conditions)
- "Summarize this finished strategy deck; the decision is already made." (summarization)

## Output checks (a good output must)

- [ ] Be an assumption-ledger artifact (option statement, conditions table, killer-conditions section), not prose arguing for/against.
- [ ] Open by stating the single option/claim under examination in one sentence.
- [ ] Frame conditions as "would have to be true," not asserted as true, each marked for why it is load-bearing.
- [ ] Give each condition a confidence (H/M/L) with a reason and a concrete cheap test/signal.
- [ ] Name one or two "killer" conditions (most load-bearing and least certain) to test before committing.
- [ ] Reach for risky load-bearing factors (demand, economics, execution, competitive response, stakeholders), not only easy ones; not claim the bet is proven.

## Value vs unaided baseline

Asked the same question, a strong model fluently argues for or against the option and may list some assumptions, but tends to produce agreeable, already-true-sounding conditions and stop. This skill forces separating "would have to be true" from "is true," rating each condition's confidence honestly, and converging on the one or two load-bearing-and-uncertain killer conditions to test first, rather than declaring the bet validated.
