# Eval cases: tfs-one-way-vs-two-way-door

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred to the Silver climb); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "Before we spend three weeks debating this, is it even the kind of decision that deserves three weeks? Help me figure out how much process it needs."
- "Everything here goes through the same five approvals and we're drowning. Help me sort which of these calls are actually reversible so we can stop over-processing them."
- "The team wants to just ship the new onboarding flow this week. Is that a decision we can make fast and back out of, or one we need to think hard about first?"
- "We're about to sign a two-year vendor contract and people are treating it like a routine purchase. Is this reversible or not, and who should really be signing off?"
- "Classify this: rolling out a company-wide rename of our core product. One-way door or two-way door, and what level of rigor does it warrant?"
- "I keep convening committees over tiny config changes and rubber-stamping the big irreversible stuff. Help me match the deliberation to how reversible each decision actually is."

## Should NOT trigger (wrong tool / near-miss)

- "We've already agreed this acquisition is huge and irreversible. Now stress-test the plan for what could go wrong." (near-miss: triage is done, the decision is known high-stakes and under analysis - use premortem)
- "We're down to three CI/CD vendors and keep going in circles. Lay out the tradeoffs against what matters and recommend one." (near-miss against the overlapping neighbor: this is comparing options against criteria - use `tfs-decision-option-review`, not a reversibility triage)
- "Score these three onboarding-redesign approaches on the criteria that matter and tell me which to pick." (option comparison, not triage; this skill never recommends an option)
- "Should I rename my staging environment? One-line config I revert anytime - just confirm." (no meaningful reversibility question; over-processing to classify it)
- "Run a premortem on the free-tier launch plan." (risk surfacing, not reversibility triage)
- "Write a status update summarizing what the team shipped this sprint." (unrelated)

## Output checks (a good output must)

- [ ] Test reversibility against multiple named dimensions (money, time, trust/reputation, legal, path-dependence), not assert it from the convenient label.
- [ ] Render a verdict (one-way / two-way door) that follows from those dimensions, and for borderline cases name which way it leans and the single dimension that decides it.
- [ ] State a concrete matched deliberation level: who decides, how much analysis, what sign-off.
- [ ] For a one-way door, point to the heavier tool the decision should go to next (option comparison, premortem), rather than performing that analysis itself.
- [ ] Recommend a *level of process*, never which option to choose.
- [ ] Deliver the classification artifact (verdict + reversibility dimensions + matched deliberation level + one-line summary), not prose, and not overclaim a better outcome - only better-calibrated effort.

## Value vs unaided baseline

Unprompted, a strong model tends to skip triage entirely: it either dives straight into analyzing or recommending the decision (over-processing a reversible call) or waves a hard-to-reverse decision through as "we can always change it later," accepting the convenient reversibility label. This skill forces the reversibility question to be answered explicitly *first*, tests it against multiple dimensions so one-way consequences on trust and path-dependence are not buried, and outputs a matched level of process - who decides and how much rigor - while deliberately stopping short of the analysis itself and handing one-way doors to the right heavier tool.
