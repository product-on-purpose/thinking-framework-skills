# Eval cases: think-backcasting

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred to the Silver climb); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "We've decided we want to be the default self-serve platform in our category in two years. Work backward from that and tell me what has to happen and what we do first."
- "Picture our team three years out running fully on the new architecture. Map the milestones backward to where we are now."
- "I keep planning forward from this quarter and we never get near the big goal. Start from the goal and reason back to the next step."
- "We have a chosen 5-year carbon-neutral target. Lay out the path back from that future to today, with the preconditions at each stage."
- "What would have to be true, in order, for us to reach a $50M ARR self-serve business - working back from there to what I should do this month?"
- "Help me build a route from our desired end state to a concrete next action, surfacing the dependencies between milestones."

## Should NOT trigger (wrong tool / near-miss)

- "We're about to launch the free tier. Imagine it's six months out and it failed badly - why did it fail and what do we watch for?" (near-miss: premortem - works back from *failure* to causes, not from *success* to the path)
- "If we launch this free tier, what are the second- and third-order knock-on effects over time?" (futures wheel - forward consequences radiating outward, not a goal-first backward route)
- "I've decided to ship daily code reviews but I keep skipping them. Help me actually follow through." (WOOP - personal intention-action gap, not a route to a future)
- "Should we even build a self-serve free tier, or double down on sales-led? Help me decide." (the goal is unsettled - decision/option evaluation first; backcasting assumes the endpoint)
- "I need to rename a staging environment - just a quick config change. What's the next step?" (near-term, trivial plan; forward planning is sufficient)
- "Write a status update on what the team shipped this sprint." (unrelated)

## Output checks (a good output must)

- [ ] State the desired future vividly and concretely as an already-true state anchored to a horizon, not a vague aspiration like "things are better."
- [ ] Build the chain *backward* from the future, with each milestone naming the preconditions that had to be true before it (not a forward to-do list relabeled as a backcast).
- [ ] Check preconditions and dependencies for gaps and ordering, surfacing dangling links rather than hiding them.
- [ ] Terminate at a concrete next step that can be taken now (the vision-to-action link is present).
- [ ] Deliver the backcast-path artifact (future state, backward milestone chain with preconditions, next step + a short summary), not prose.
- [ ] Not overclaim: present the path as a constructed route to a *chosen* future, not a forecast, not proof the goal is right, and not a guaranteed outcome.

## Value vs unaided baseline

Unprompted, a strong model produces a forward plan: it starts from today's constraints and lists steps in chronological order, which anchors on the status quo and quietly inverts real dependencies (it leads with the visible build work and discovers the binding constraint late). It also tends to leave the goal unexamined and the milestones without named preconditions. This skill forces the reversal (fix a vivid endpoint, derive milestones backward), requires each link to name the preconditions that had to be true before it, surfaces dependency gaps and the true starting constraint, lands on a concrete next step, and holds the honest caveat that the path is a route to a *chosen* future, not a forecast or a test of whether the goal is right.
