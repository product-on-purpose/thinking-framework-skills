# Eval cases: tfs-after-action-review

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "The Q3 launch is done. Let's actually learn from it instead of just moving on - run a proper review."
- "Our migration finished last week. Compare what we expected to what happened and what we'd change."
- "We just wrapped the sprint. I want a structured retro that ends in specific changes, not venting."
- "The incident is resolved. Do a blameless after-action review: expected vs actual, why, sustain and change."
- "We ran the pricing experiment and it's over. Turn the result into owned takeaways for next time."
- "Review how the onboarding revamp went against what we planned - including what went better than expected."

## Should NOT trigger (wrong tool / near-miss)

- "We're about to launch - imagine it failed and tell me why." (near-miss: premortem, before the event)
- "Write the status update for what the team shipped this sprint." (status report, not learning)
- "Summarize the incident timeline for the board." (summarization)
- "Should we do A or B for the next launch?" (decision)
- "Brainstorm improvements to onboarding." (ideation; no expected-vs-actual)
- "The thing failed and I want to know whose fault it was." (blame - the skill explicitly resists this)

## Output checks (a good output must)

- [ ] State what was expected (recorded, or honestly labeled as reconstructed), separate from the outcome.
- [ ] State what actually happened including better-than-expected, not only failures.
- [ ] Give a real, blameless "why" for each meaningful gap.
- [ ] Capture what to sustain, not only what to change.
- [ ] Make changes specific and owned, not vague.
- [ ] Be the AAR artifact (expected/actual/why/sustain/change), not a status update.

## Value vs unaided baseline

Asked "how did it go?", a strong model writes a tidy narrative summary that quietly back-fits the story to the known outcome and produces vague lessons. This skill forces the expected-vs-actual comparison (the structure the meta-analysis says is the active ingredient), surfaces better-than-expected results, keeps it blameless, and ends in specific owned changes - rather than hindsight narrative. Unstructured retros, the evidence shows, do not carry the benefit.
