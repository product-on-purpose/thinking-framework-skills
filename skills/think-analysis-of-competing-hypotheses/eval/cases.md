# Eval cases: think-analysis-of-competing-hypotheses

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. This is a contested lens with the warn-and-redirect posture: explicit-request-only, caveat-first. It should fire only when ACH is asked for by name, and it must never build the disconfirmation matrix as a valid conclusion.

## Should trigger

- "Use ACH to work out which of three explanations for the outage is most likely."
- "Run an analysis of competing hypotheses on whether the churn spike is pricing, onboarding, or lead quality."
- "Build me a competing-hypotheses matrix for these suspects."
- "I was taught ACH in intel training. Apply it to this evidence and tell me the least-inconsistent hypothesis."
- "Do an evidence-diagnosticity matrix across our candidate root causes."

## Should NOT trigger (wrong tool / near-miss)

- "Which of these three explanations for the churn spike is right?" (generic rival-explanation work; route to think-evidence-vs-inference-sort, not ACH)
- "Poke holes in our leading theory of the outage." (route to think-red-team-light)
- "What would have to be true for the pricing explanation to hold?" (route to think-what-would-have-to-be-true)
- "List the evidence for and against each option." (a plain pro/con table, no ACH requested)
- "Summarize the competing theories in this thread." (summarization)

## Output checks (a good output must)

- [ ] Lead with the controlled-evidence caveat (ACH raises confidence without accuracy; randomized trials found no bias reduction) before anything else.
- [ ] Does not reproduce the ACH disconfirmation matrix as a valid conclusion or name a "least-inconsistent winner."
- [ ] Name the real decision behind the request.
- [ ] Redirect to a specific evidence-based shipped skill (think-red-team-light, think-evidence-vs-inference-sort, or think-what-would-have-to-be-true) that fits the job.
- [ ] Not cite institutional adoption as if it were outcome evidence.

## Value vs unaided baseline

Asked to "run ACH," a strong model dutifully builds the evidence-by-hypothesis matrix and declares a least-inconsistent winner, producing exactly the confident-but-no-more-accurate output the controlled trials condemned. This skill refuses that. It leads with the evidence that ACH does not work, declines to manufacture a matrix verdict, names the real decision, and routes the user to a better-grounded shipped move, so an explicitly-requested ACH yields an honest answer instead of laundered false confidence.
