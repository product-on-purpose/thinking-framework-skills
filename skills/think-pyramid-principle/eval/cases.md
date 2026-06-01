# Eval cases: think-pyramid-principle

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred to the Silver climb); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "I've decided we should consolidate onto one cloud provider. Help me write this up for the exec team so the recommendation leads, not the analysis."
- "Here's my three-page memo - the actual recommendation is buried in the last paragraph. Restructure it so the point comes first and the support hangs under it."
- "Turn these findings into a tight top-down case for the board: what we should do, then the few reasons, then the evidence."
- "Structure my argument for killing the legacy SKU answer-first, with a small set of grouped reasons under the conclusion."
- "I need an executive summary for the migration proposal. Lead with the call, then the key arguments, MECE, then the detail."
- "Give me an SCQA intro and a pyramid for why we should raise prices next quarter."

## Should NOT trigger (wrong tool / near-miss)

- "I'm not sure yet whether we should build, buy, or wait - help me think it through from scratch." (no conclusion yet; early exploratory thinking, wrong place for answer-first structure)
- "Here's a vendor's case for switching to their platform. Pull it apart and tell me whether the reasoning actually holds and where the weak links are." (near-miss vs think-argument-mapping: analyze an argument for soundness, do not compose one)
- "Break the question 'why is activation dropping?' into MECE sub-questions so I know what to investigate." (near-miss vs think-issue-tree: decompose the QUESTION for analysis, not structure an ANSWER for a reader)
- "Run a premortem on the free-tier launch before we commit." (risk tool, not communication)
- "Compare these three onboarding redesigns on the criteria that matter and recommend one." (decision-option-review: choose among options; the conclusion does not exist yet)
- "Proofread this paragraph and fix the grammar." (copyedit, not restructuring around a conclusion)

## Output checks (a good output must)

- [ ] Lead with a single governing thought that is a concrete conclusion or recommendation, stated first - not a topic, a question, or a teaser.
- [ ] Present a small set of key arguments (roughly three to five), each answering "why?" for the governing thought.
- [ ] Make the key arguments MECE - no two overlap, and nothing material to the claim is missing - and show the support sitting under the right key line.
- [ ] Put the key arguments in a deliberate, stated order (importance, time, or structure), not discovery order, and confirm the key lines sum to the governing thought.
- [ ] Deliver the pyramid artifact (governing thought + ordered key lines + support, optional SCQA intro), not a flowing essay.
- [ ] Not imply that a tidy pyramid certifies the recommendation is correct; limit the claim to clearer communication of a conclusion the author already holds.

## Value vs unaided baseline

Asked to write up a recommendation unaided, a strong model defaults to narrating its reasoning - context first, supports in the order they occurred to it, and the actual recommendation arriving late - and it tends to present the resulting tidy structure as if the structure itself proved the case. This skill forces the inversion: the governing thought leads, the supports are cut into a small MECE set and put in a deliberate, stated order, each key line is checked to actually sum to the conclusion, and the result is surfaced as an inspectable pyramid a reader can descend or stop at. It also holds the honest caveat that clear structure is not a sound argument, so the win is communication, not a claim of correctness.
