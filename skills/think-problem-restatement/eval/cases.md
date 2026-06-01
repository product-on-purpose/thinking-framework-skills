# Eval cases: think-problem-restatement

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "My CEO wants us to build a mobile app for customer support. Help me think about this before we kick off."
- "Churn is up and the team keeps proposing fixes, but I'm not sure we've pinned down the actual problem. Can you help reframe it?"
- "The problem I was handed is 'users aren't engaging with the dashboard' - that feels like a symptom. Restate it a few ways before I scope work."
- "Before I commit a quarter of engineering, I want to make sure we're solving the right problem. The ask is vague: 'reduce support ticket volume.'"
- "Stakeholders keep describing this differently and the brief is ambiguous. Generate a few genuinely different framings and pick the most useful."
- "We're at the start of a discovery effort and the problem is ill-defined. Sharpen the problem before ideation."

## Should NOT trigger (wrong tool / near-miss)

- "We've already validated the problem and it's well-defined and agreed. Now give me solution ideas to evaluate." (problem is settled)
- "We've narrowed it to three options for the checkout redesign - help me pick the best one." (decision)
- "Rename this variable across the file and fix the lint error - quick reversible change." (trivial)
- "The launch already failed. Run a postmortem." (after the fact)
- "Write the marketing copy for the feature we already decided to build." (execution)
- "Summarize this already-structured PRD into one paragraph." (summarization)

## Output checks (a good output must)

- [ ] Be a problem frame set artifact (original, tagged restatement table, How Might We angles, chosen working frame), not prose.
- [ ] Produce 5-8 restatements, each tagged with a distinct move (altitude up/down, goal-vs-implementation, stakeholder, inversion, is/is-not) and a one-line "why this might be the real problem" - not cosmetic rewordings.
- [ ] Include at least one restatement separating goal from proposed implementation, and at least one inversion or is/is-not.
- [ ] Include 3-5 open "How might we ..." questions from the most promising restatements.
- [ ] Converge on exactly one working frame with a rationale tied to the user's actual goal (not left open).
- [ ] Not overclaim: it sharpens the problem; it does not guarantee a better solution.

## Value vs unaided baseline

A strong model is obligingly literal and defaults to solving the first stated framing, accepting a symptom or a pre-baked "build X" at face value. This skill forces an explicit interrupt that escapes the initial frame via distinct moves and converges on one justified frame plus a durable artifact, rather than sliding into solutioning or producing reworded variants that never shift altitude, stakeholder, or goal-vs-implementation.
