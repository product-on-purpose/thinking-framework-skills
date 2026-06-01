# Eval cases: tfs-issue-tree

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred to the Silver climb); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "Churn jumped last quarter and nobody can say why. Help me break 'why is churn rising?' into parts we can actually investigate."
- "Our gross margin is slipping but it's a mush. I want a structured breakdown of everywhere margin could be leaking so we don't miss a whole category."
- "Should we launch a self-serve free tier? It's too big a question - help me decompose it into the things that would actually have to be true."
- "Split this analysis into non-overlapping workstreams so growth, finance, and sales can each own a branch without stepping on each other."
- "I keep going in circles on 'how do we grow revenue?' Give me a MECE tree of the levers down to things I can measure."
- "Break 'why are deploys failing more often?' into a logic tree, exhaustive, no double-counting, down to questions an owner can answer."

## Should NOT trigger (wrong tool / near-miss)

- "Here's the team's recommendation to build the integration in-house. Walk through whether the argument actually holds up." (near-miss: evaluating a given argument's soundness, not decomposing a question - use argument-mapping)
- "We ran 40 user interviews and have a pile of sticky notes. Help me group them into themes." (bottom-up clustering of existing notes - use affinity-mapping)
- "Should I merge this branch now or wait an hour? Quick gut check." (simple, one-step question; a tree is false rigor)
- "Rename the 'why churn is rising' doc to something punchier." (trivial wording task, no decomposition)
- "The free-tier launch shipped and went badly. Help me run a postmortem on what happened." (after-the-fact analysis of a known outcome, not decomposing an open question)
- "Write the board update summarizing this quarter's results." (unrelated reporting task)

## Output checks (a good output must)

- [ ] State a single, precise root question and confirm a tree is warranted (not a simple one-step question).
- [ ] Name the split axis at each level, with a one-line justification for why the top-level axis is the material split (not merely a tidy one).
- [ ] Keep children MECE at every branch: mutually exclusive (no overlap or double-count) and collectively exhaustive (an explicit remainder branch where coverage is at risk).
- [ ] Drive leaves down until answerable, with each leaf naming the data, metric, owner, or judgment that would answer it.
- [ ] Flag the two or three highest-value leaves and prune branches that are exhaustive but immaterial.
- [ ] Deliver the issue-tree artifact (root question, branching tree, leaf register, MECE check) plus a short summary, not prose, and not claim the tree is the answer.

## Value vs unaided baseline

Unprompted, a strong model tends to answer a big question directly with a fluent narrative, or to produce a flat bulleted list of "factors" that quietly overlap and miss whole categories, and it rarely names the split axis or checks exhaustiveness. This skill forces a single material top-level split with a justification, enforces mutual-exclusivity and collective-exhaustiveness at every branch (including an explicit remainder), drives leaves down to questions that name what data would answer them, and prunes to the few leaves that carry the decision - while holding the honest caveat that a tidy MECE tree restructures the question but does not by itself produce a better answer.
