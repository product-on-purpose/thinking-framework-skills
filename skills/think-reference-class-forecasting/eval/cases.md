# Eval cases: think-reference-class-forecasting

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "We told the board this migration would take 3 months and cost $200k. I think that's optimistic - help me get a realistic estimate."
- "Forecast how long our platform rewrite will actually take. We keep blowing past our own timelines."
- "What are realistic odds this new B2B SaaS hits $1M ARR in two years? Our deck assumes we sail past it."
- "Give me a defensible budget range for this office buildout. Every construction project we've done ran over."
- "Our roadmap says the API integration ships in 6 weeks. Sanity-check it against how similar integrations usually go."
- "I want an outside-view estimate for this acquisition's integration cost instead of the bottom-up number my team built."

## Should NOT trigger (wrong tool / near-miss)

- "The project finished 4 months late and 60% over budget. Run a postmortem." (after the fact)
- "We're inventing a genuinely new category - no one has shipped anything like this. How should I size it?" (near-miss: no comparable reference class exists)
- "Give me one exact number for Q3 revenue for the press release - a single committed value, no ranges." (wants a point certainty)
- "Walk me through the bottom-up engineering breakdown so I can assign tasks." (inside-view task breakdown)
- "Imagine this launch already failed - work backward and list what caused it." (premortem)
- "What's the current USD/EUR exchange rate?" (factual lookup)

## Output checks (a good output must)

- [ ] Name an explicit reference class of comparable past cases and say why they are genuinely comparable (not narrow/self-flattering).
- [ ] State a base-rate distribution (typical and worst-case) with a data source, OR explicitly flag that real data is missing and refuse to fabricate numbers.
- [ ] Present the final estimate as a range/distribution, not a point certainty.
- [ ] Anchor on the base-rate distribution first, adjusting for specifics conservatively; the optimistic inside-view number does not reappear as the answer.
- [ ] Be the reference-class estimate artifact (reference class, base rates, inside-view estimate, outside-anchored estimate, adjustment rationale), not prose.
- [ ] Capture and label the original inside-view estimate separately so the outside view can be contrasted.

## Value vs unaided baseline

Unprompted, a strong model readily produces a fluent inside-view estimate from the plan's details and, asked for an outside view, often invents a plausible-sounding base-rate distribution rather than admit none exists. This skill's distinctive value is enforcing the honest constraint - construct a real reference class, cite or flag the base-rate source, refuse to fabricate numbers - while preventing the optimistic inside-view figure from sneaking back as the answer.
