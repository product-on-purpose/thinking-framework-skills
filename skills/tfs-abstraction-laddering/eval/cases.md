# Eval cases: tfs-abstraction-laddering

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred to the Silver climb); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "Leadership told us to 'build a mobile app.' I don't think that's really the problem - help me figure out what level we should actually be solving at."
- "Our goal this quarter is 'improve engagement.' That's too vague to do anything with. Can we get it down to something concrete and actionable?"
- "Engineering wants to talk about the caching layer and the execs want to talk about 'being more customer-centric.' We keep talking past each other - are we just at different levels of the same problem?"
- "We've been handed 'add a dashboard' as the requirement. Before we scope it, I want to know what it's actually in service of and whether a dashboard is even the right altitude."
- "Walk this problem up and down the abstraction ladder so I can pick the right level to attack it."
- "Is 'launch a free tier' the actual problem, or a solution we've assumed? Move it up to the goal and down to specifics so I can see."

## Should NOT trigger (wrong tool / near-miss)

- "This problem is fuzzy and I want a few genuinely different ways to frame it - shift the stakeholder, invert it, bound what it is and isn't - then pick one to work on." (near-miss: this is `tfs-problem-restatement`; it generates several framing moves and converges, while laddering only moves up and down the altitude axis.)
- "We agree the problem is 'reduce checkout abandonment at the payment step' and that's the right level. Now break it into its component sub-problems so we can assign owners." (decomposition into all parts -> issue tree, not a single vertical chain.)
- "We've settled on the right problem. Now give me a bunch of creative solution ideas for it." (ideation, not altitude.)
- "We have three framings on the table and need to pick which one to fund." (decision/option comparison, not laddering.)
- "Summarize what the team shipped this sprint for a status update." (unrelated.)

## Output checks (a good output must)

- [ ] Capture the problem as given, verbatim, and mark it as the entry rung on the ladder.
- [ ] Climb up with genuine "why / to what end" purposes and descend with genuinely more concrete "how / what specifically" rungs, not rewordings.
- [ ] Present a single vertical ladder ordered abstract-to-concrete, flagging the too-high (uselessly universal) and too-low (bare detail) rungs - not a sideways pile or a branching tree.
- [ ] Select exactly one rung as the working altitude, with a rationale tied to the user's actual goal.
- [ ] Deliver the abstraction-ladder artifact (ordered ladder + short summary), not prose.
- [ ] Not claim a better solution or a guaranteed-correct level; limit the claim to making the altitude choice explicit and deliberate.

## Value vs unaided baseline

Unprompted, a strong model tends to accept the problem at the altitude it was handed and start solving there - designing the dashboard, listing engagement tactics - so it inherits the accidental level instead of choosing one. When it does abstract, it often drifts sideways into loosely related ideas rather than holding a clean why-up / how-down chain, and rarely commits to a single working rung. This skill forces the vertical interrogation in both directions, keeps the ladder a single ordered chain, marks the entry rung, requires selecting one working altitude with a goal-tied rationale, and holds the honest practitioner-grade caveat that it locates the level rather than guaranteeing the answer.
