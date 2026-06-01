# Recipes

Recipes are composable workflows: short, ordered chains of skills that solve a recurring job end to end. Each recipe names the skills to run, in order, what to carry forward (compressed) between steps, and the composite artifact produced.

These are **documented chains**, runnable by an agent that reads the recipe and invokes each skill in turn. As of the Silver climb each recipe also ships as a **workflow component** in [`_workflows/`](../_workflows/) (a `steps:` list of skills, validated by the Standard's S5 check); these docs are the human-readable prose for those workflows. A thin slash-**command** per recipe is still deferred: the toolkit's command contract resolves a command's `maps-to` against skills only (workflow resolution "arrives in a later phase"), so a command pointing at a workflow would not yet validate. The chains and workflows are usable today.

**Token discipline:** between steps, carry forward only the compressed artifact (the chosen frame, the shortlist, the ledger), not the full working text of the prior step. The audit flagged unbounded recipe context as the main operational risk; compress at each handoff.

## The recipes

| Recipe | Job | Chain |
|---|---|---|
| [reframe-problem](reframe-problem.md) | Make sure you are solving the right problem | problem-restatement -> evidence-vs-inference-sort -> parallel-perspectives-review |
| [expand-options](expand-options.md) | Break past the obvious option set | problem-restatement -> scamper -> assumption-reversal |
| [stress-test-decision](stress-test-decision.md) (marquee) | Pressure-test a decision before committing | decision-option-review -> what-would-have-to-be-true -> premortem -> reference-class-forecasting |
| [audit-reasoning](audit-reasoning.md) | Check whether a conclusion is sound | evidence-vs-inference-sort -> ladder-of-inference-check -> parallel-perspectives-review |

Each chain references skills by their installable name (`think-<method>`) and `skills/think-<method>/SKILL.md`.
