# Eval cases: tfs-brainwriting

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "I need a wide range of options for how we could onboard new users - lots of different angles, not just the obvious first idea."
- "Help me brainstorm podcast names, but I keep landing on variations of the same theme. Generate ideas from genuinely different directions and build on them."
- "We're at the early divergent stage for our Q3 campaign. I want breadth before we narrow - independent idea streams consolidated into a shortlist."
- "Give me ways to reduce churn from several distinct perspectives so I don't anchor on the first thing."
- "Brainwrite product feature concepts - a few separate streams from different personas, then a build-on round, then the strongest short-listed."
- "My brainstorm feels too narrow and everything sounds alike. Generate parallel sets of ideas independently, then pull together the best."

## Should NOT trigger (wrong tool / near-miss)

- "I have 12 product ideas already - help me rank them and pick the one to build." (convergence/decision)
- "Score these 8 vendors against our criteria and recommend one." (decision)
- "Write a single deeply-reasoned analysis of whether to migrate to Postgres - one expert take, not a spread." (deep single reasoning)
- "We have 40 sticky notes from a brainstorm. Cluster into themes and decide which three to move forward." (near-miss: synthesis/convergence, not generation)
- "Summarize the ideas from yesterday's offsite into a one-page recap." (summarization)
- "Just dump 50 blog titles, whatever comes to mind, unorganized." (bulk dump, no streams/build-on)

## Output checks (a good output must)

- [ ] Contain 3-4 separately-labeled idea streams, each from a distinct angle/persona/constraint, kept visibly separate (not one list relabeled).
- [ ] Include a distinct build-on round that combines and extends across streams (not a fourth parallel list).
- [ ] Merge near-duplicates across streams while keeping distinct ideas.
- [ ] Select a shortlist of the strongest ideas with a reason for each.
- [ ] Be the idea-pool artifact (streams + build-on + shortlist), not prose; not rank/decide a single winner.
- [ ] State the single ideation prompt in one line at the top.

## Value vs unaided baseline

Asked to brainstorm, a strong model defaults to one anchored stream of ideas sharing an implicit framing. This skill forces 3-4 genuinely independent streams generated as if blind to each other, then an explicit cross-stream build-on round before consolidating - the structural step a model does not do unaided. It also keeps scope honest: it generates and shortlists but does not rank/decide, and its evidence is for human groups (mechanism transferred to AI, effect size not measured), so checks must not assume a proven AI advantage.
