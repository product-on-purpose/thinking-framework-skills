# Eval cases: tfs-linear-model-aggregation

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "Our reps decide which inbound leads to chase by gut and it's all over the place. Give me a consistent way to score them."
- "We screen hundreds of applicants. Build a simple scoring rule so it's not a different call every time."
- "I want a repeatable rubric to triage incoming bug reports by priority."
- "Help me replace 'I have a good feeling about this deal' with a consistent scoring model."
- "Scoring candidates is noisy across interviewers - can we make it a fixed formula on a few signals?"
- "Build a mechanical rule to prioritize our support queue."

## Should NOT trigger (wrong tool / near-miss)

- "We have three vendors and need to pick one this week." (near-miss: a one-off choice -> decision-option-review, not a repeated-judgment scoring model)
- "Should we enter the European market?" (a unique strategic decision)
- "We have no data on what predicts a good lead - just estimate the odds." (no real cues; the skill must refuse to fabricate)
- "Score this one candidate for me." (a single instance, not a recurring rule)
- "Brainstorm what makes a good lead." (ideation)
- "Given a positive lead-score flag, what's the real chance it converts?" (natural-frequency-bayesian)

## Output checks (a good output must)

- [ ] Confirm the judgment is recurring with a measurable outcome (route one-offs to decision-option-review).
- [ ] Use a few cues, each with a stated reason to be predictive.
- [ ] Default to equal/simple weights unless data justifies otherwise (no fake precision).
- [ ] Give a per-cue rubric concrete enough for consistent scoring, plus a formula and threshold.
- [ ] Mandate consistent application and flag the cue-validity caveat.
- [ ] Flag fairness/legal/ethical caveats for judgments about individuals.
- [ ] Be the scoring-model artifact, not prose.

## Value vs unaided baseline

Asked to "help me evaluate leads," a strong model tends to produce either a holistic per-case opinion or an elaborate many-factor weighted rubric with false precision. This skill applies the Meehl/Dawes result: a few cues, simple/equal weights, a fixed formula, applied consistently - and it refuses to invent cues without predictive validity, mandates consistent application (the source of the benefit), and flags fairness limits. The win is consistency over cleverness, which an unaided model does not impose on itself.
