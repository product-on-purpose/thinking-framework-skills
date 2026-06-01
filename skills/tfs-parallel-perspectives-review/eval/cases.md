# Eval cases: tfs-parallel-perspectives-review

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "We're deciding whether to launch a free tier in 6 weeks. Give this a rounded look before we commit - I don't want us to only see the downside."
- "Weigh this acquisition offer from every angle - facts, upside, risks, gut-feel, other options - then pull it together into a balanced call."
- "Every time we discuss the migration the most risk-averse person hijacks it. Make sure the optimistic and creative angles get airtime too."
- "I want a multi-lens review of moving to a four-day work week, with separate lenses so one perspective doesn't drown out the rest."
- "We keep skipping intuition and alternatives when we evaluate vendors. Walk through this vendor choice one perspective at a time."
- "Should we rebrand next quarter? Give a balanced read separating what we know from upside, cautions, and creative alternatives, then name the tension."

## Should NOT trigger (wrong tool / near-miss)

- "Tear apart my argument that we should drop the on-prem line - the strongest case against it." (near-miss: red team, single adversarial thesis)
- "Run a premortem on the Q3 launch." (risk over time)
- "Write up the postmortem for last night's incident." (after the fact)
- "Just tell me the security risks of exposing this billing endpoint - that's all I care about." (single lens is all that matters)
- "Summarize this 12-page strategy doc into one page." (summarization)
- "What's the cheapest cloud provider for a 500GB Postgres database?" (factual lookup)

## Output checks (a good output must)

- [ ] Be the multi-lens review artifact (one-line "under review", per-lens rows, then a synthesis), not blended prose.
- [ ] Address all six lenses in order - Facts, Upside, Risks, Intuition, Alternatives, Process - or explicitly drop an inapplicable lens with a note (not padded).
- [ ] Keep each lens to its own mode; risk content does not leak into upside and vice versa.
- [ ] Give the easily-skipped Intuition and Alternatives lenses a real, substantive pass.
- [ ] End with a synthesis that integrates the lenses and names a central tension to resolve.
- [ ] Not cite de Bono's "493%" figure or lean on Six Thinking Hats marketing; lineage, if mentioned, is descriptive.

## Value vs unaided baseline

Asked to "look at this from all sides," an unaided model produces one blended take where the dominant mode (usually risk or upside) quietly colors everything and the quiet lenses get a token line or get skipped. This skill forces a genuinely separate pass per lens with the easily-skipped ones protected, keeps the lenses from blurring, ends in a synthesis that names the actual tension, and avoids importing the unsupported branded productivity claims.
