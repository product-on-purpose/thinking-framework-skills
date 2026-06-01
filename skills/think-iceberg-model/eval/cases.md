# Eval cases: think-iceberg-model

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred to the Silver climb); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "Enterprise accounts keep churning inside 90 days and the save calls aren't working. Why does this keep happening, and where do we actually intervene?"
- "We keep firefighting the same production incidents every few weeks. I want to get below the latest outage to whatever structure is causing the pattern."
- "Support keeps escalating the same complaint. Treating each ticket as a one-off isn't fixing it - help me see the events, the pattern, the structures, and the beliefs underneath."
- "Our sales reps keep sandbagging forecasts. Move this from the symptom down to the incentives and mental models that produce it."
- "Build me an iceberg on why our onboarding handoff keeps failing for new accounts."
- "Every quarter we miss the same deadline and every quarter we blame the quarter. What's the systemic cause beneath this recurring miss?"

## Should NOT trigger (wrong tool / near-miss)

- "We're about to launch a self-serve free tier. Map the knock-on effects over time - if we ship it, then what happens next across the business?" (near-miss vs futures-wheel: maps forward/outward to consequences, not downward to causes)
- "My PM concluded the feature failed because users hate it. Walk back how she got from the data to that conclusion and test an alternative reading." (near-miss vs ladder-of-inference-check: one person's data-to-conclusion reasoning, not systemic levels of causation)
- "The deploy failed because the cert expired at midnight. Renew it and we're done." (simple, linear, single cause - no iceberg needed)
- "Brainstorm names for our new free tier." (ideation, not causal analysis)
- "Summarize this 10-page incident report into a paragraph." (summarization)
- "We've decided to rebuild checkout in-house; this is the last gate before we commit budget. Surface what could blow up." (premortem: risk on a forward decision, not the causes of a recurring problem)

## Output checks (a good output must)

- [ ] Be a four-level iceberg artifact (event, pattern, structures, mental models), not prose.
- [ ] Actually descend to structures and mental models, not stop at event or pattern.
- [ ] Distinguish the four levels as different things, not the same idea reworded four times.
- [ ] State mental models as honest beliefs/assumptions (including uncomfortable ones), not restated structures.
- [ ] Pair each level with the intervention it implies, tag its leverage, and call out the single highest-leverage intervention.
- [ ] Either confirm the problem is systemic (a real pattern) or, if it is a genuine single-cause one-off, say so and stop rather than manufacturing depth.
- [ ] Not present the leverage ranking as a measured or proven effect (it is a judgment for argument).

## Value vs unaided baseline

Asked the same question, a frontier model tends to react at the event level - diagnose the latest incident and propose a direct fix - or, at best, name a single root cause without separating the pattern over time, the structures generating it, and the mental models holding those structures in place. This skill forces the full downward descent through all four levels, pairs each with the intervention it implies, surfaces uncomfortable beliefs the baseline glosses, and calls out a higher-leverage structural or mindset intervention than another reactive fix - while honestly framing leverage as a judgment, not a validated measurement (its evidence is transferred systems-thinking practice, not AI-validated outcome data).
