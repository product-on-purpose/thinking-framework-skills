# Recipes

Recipes are composable workflows: short, ordered chains of skills that solve a recurring job end to end. Each recipe names the skills to run, in order, what to carry forward (compressed) between steps, and the composite artifact produced.

These are **documented chains**, runnable by an agent that reads the recipe and invokes each skill in turn. They are intentionally not yet packaged as invokable slash-commands: in the `agent-skills-toolkit` Standard a multi-skill chain is a *workflow* component with a command that maps to it, which is Silver-tier machinery. That packaging is deferred to the Silver climb so the library stays cleanly at Bronze (Universal) for now. The chains themselves are usable today.

**Token discipline:** between steps, carry forward only the compressed artifact (the chosen frame, the shortlist, the ledger), not the full working text of the prior step. The audit flagged unbounded recipe context as the main operational risk; compress at each handoff.

## The recipes

| Recipe | Job | Chain |
|---|---|---|
| [reframe-problem](reframe-problem.md) | Make sure you are solving the right problem | problem-restatement -> evidence-vs-inference-sort -> parallel-perspectives-review |
| [expand-options](expand-options.md) | Break past the obvious option set | problem-restatement -> scamper -> assumption-reversal |
| [stress-test-decision](stress-test-decision.md) (marquee) | Pressure-test a decision before committing | decision-option-review -> what-would-have-to-be-true -> premortem -> reference-class-forecasting |
| [audit-reasoning](audit-reasoning.md) | Check whether a conclusion is sound | evidence-vs-inference-sort -> ladder-of-inference-check -> parallel-perspectives-review |

Each chain references skills by their installable name (`tfs-<method>`) and `skills/tfs-<method>/SKILL.md`.
