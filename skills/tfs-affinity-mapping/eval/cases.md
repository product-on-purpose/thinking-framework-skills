# Eval cases: tfs-affinity-mapping

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred to the Silver climb); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "I have about 60 user-interview notes from our onboarding study. Help me find the themes in them."
- "Here are 80-odd support tickets tagged 'evaluation.' What patterns are in this pile?"
- "We ran a retro and there are 40 stickies. Cluster them into a few themes so we know what to act on."
- "I pasted all the open-text survey answers below. Group them and tell me what people are actually saying, with the structure coming from the data, not my assumptions."
- "We have a scattered mess of research observations and quotes. Synthesize them into named themes and keep each theme traceable back to the quotes."
- "Take these 50 feature requests and find the natural groupings - I don't want to start from predefined buckets."

## Should NOT trigger (wrong tool / near-miss)

- "Break down 'why is free-tier activation low?' into a structured tree of sub-questions to investigate." (near-miss: top-down decomposition from a question - that is an issue-tree, not bottom-up clustering of existing items)
- "I need fresh feature ideas for next quarter. Generate a bunch of options for me." (near-miss: idea generation - affinity mapping organizes items that already exist, it does not create them; use brainwriting first)
- "I have three customer quotes. What do they tell me?" (too few items - reason about them directly; the clustering ceremony adds overhead without insight)
- "Sort each of these tickets into our fixed severity taxonomy: P0, P1, P2, P3." (coding into authoritative predefined buckets, not discovering emergent themes)
- "We're about to launch the free tier next week. Stress-test it and tell me how it could fail." (risk tool - premortem, not synthesis)
- "Write a project status update summarizing what the team shipped this sprint." (unrelated)

## Output checks (a good output must)

- [ ] Cluster the items before naming any theme, so the themes emerge from the items rather than from predefined buckets.
- [ ] Give each theme a short name that answers to the items inside it, with a one-line statement of what unifies them.
- [ ] Keep every item traceable to a theme (representative items shown) and put items that did not cluster in an explicit outliers / parking lot, not dropped.
- [ ] Weight themes by relative size or strength and flag thin or borderline clusters as Tentative rather than laundering them with a confident label.
- [ ] Deliver the clustered-theme-map artifact (named-theme table + a short "themes and what they tell us" summary), not a prose paragraph.
- [ ] Not claim the themes are objectively better or bias-free; limit any claim to "organized, named, and traceable."

## Value vs unaided baseline

Unprompted, a strong model reads a large pile and returns a confident summary paragraph or a flat bullet list - it tends to impose a few obvious buckets, drop the long tail, and lose the trail from any theme back to the specific items that support it. This skill forces the bottom-up discipline (cluster before naming, so structure emerges from the data instead of confirming a prior frame), keeps every item traceable to its theme, preserves outliers, weights themes by salience, and flags thin clusters as tentative rather than dressing them up as findings - and it holds the honest practitioner-grade, no-overclaim caveat.
