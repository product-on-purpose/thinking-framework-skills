# Eval cases: think-research-framework

> Trigger and output evaluation for the framework-research engine, derived from SKILL.md and the subagent system prompt. No runner yet; check by hand or wire in later.

## Should trigger

- "Is steelmanning worth shipping as its own skill, or is it already covered? Research it, grade the evidence, and tell me build or fold."
- "Research the Eisenhower matrix as a thinking method: grade its evidence honestly and draft a dossier with a proposed registry entry."
- "We keep hearing about Six Thinking Hats. Document it properly with attribution and tell me whether the evidence and distinctness clear our bar."
- "Discover three candidate methods in the risk-failure-and-resilience family that we do not already ship, with a distinctness hypothesis for each."

## Should NOT trigger (wrong tool / out of scope)

- "Run a premortem on our launch." (the user wants a framework executed, not researched and graded; route to `think-premortem`)
- "Which thinking framework should I use for this stuck decision?" (routing an unframed situation is the advisor's job; route to `think-framework-advisor`)
- "Write the SKILL.md for a method we already decided to build." (authoring, not vetting; use the skill-authoring flow)
- "What is our Q3 revenue forecast?" (a product or domain question, not a thinking-method evaluation; defer to pm-skills)

## Output checks (a good research run must)

- [ ] Grade the evidence on the seven-tier model (S, M, P, V, A, C, X) against the method's ACTUAL move, and set transferred_evidence when the support is borrowed from an adjacent method or from human-subject studies not validated on AI agents.
- [ ] Name 3 to 6 real sources (authors, year, what was measured) and refuse any widely-quoted statistic with no traceable primary source rather than laundering it into the grade.
- [ ] State an explicit overlap call (distinct, fold to a named shipped skill, recipe, reject, or out-of-scope) honoring the roughly 20 percent ceiling.
- [ ] For a branded method, fill attribution and trademark and set branded true; opening the IP gate does not lower the evidence gate.
- [ ] Emit a proposed registry entry that passes `scripts/check-proposed-entry.mjs`, and never write `frameworks/registry.mjs` directly.
- [ ] For a Build verdict, name the concrete artifact the skill would emit and the explicit when-NOT-to-use wall versus the nearest shipped skill.

## Value vs unaided baseline

Asked "should we add framework X," an unaided model will typically inflate the evidence (call a practitioner heuristic "research-backed"), accept catalog overlap (ship a near-twin of an existing skill), invent plausible-sounding citations, and default to "yes, build it." This engine does the opposite on every count: grade the actual move honestly (most methods are P, not S), refuse untraceable statistics, enforce the overlap ceiling so near-twins fold instead of shipping, document branded methods with proper attribution without lowering the evidence bar, and treat rejection as the product. The verdict is sourced and reproducible, not an opinion.
