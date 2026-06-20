# Complexity Domain Sort - Worked Example

A completed run of `think-complexity-domain-sort`, on the shared Northwind scenario. This is the quality bar a generated sort should meet: the caveat leads, parts are placed separately as judgments, and every placement ends in a concrete next action.

> Northwind is a B2B SaaS weighing a self-serve free-tier launch and unsure whether to plan it like a known rollout or treat it as an experiment.

> **Evidence caveat (read first):** This sort is descriptively named; the framework it derives from is Cynefin, a trademark of The Cynefin Co. (Dave Snowden, 1999). Its evidence is tier C (conceptual): no controlled study shows that classifying a problem this way improves decisions, and the 2021 PMC internal-medicine review found "scientific proof of its validity has yet to be provided." What follows is worth reading only because each placement ends in a concrete next action; the labels alone would not be. For cause decomposition of this decision, `think-issue-tree` is the stronger move.

---

## Situation

- Should Northwind launch a self-serve free tier, and should it plan that launch as a known rollout or run it as an experiment?

## The sort

| Domain | Why here (and how confident) | Response posture | Concrete next action (the deliverable) |
|---|---|---|---|
| **Clear** | The billing and metering plumbing is a known build; the team has shipped metering before. Confident. | sense - categorize - respond | Apply the existing metering pattern; no analysis needed, just schedule the work. |
| **Complicated** | Infra cost of free users is unmodeled but knowable with effort - it needs a capacity analysis, not a guess. Fairly confident. | sense - analyze - respond | Commission a cost model from infra: cost per free user at projected volume, before committing a cap. |
| **Complex** | Whether a gated free tier cannibalizes the sales-led pipeline is coherent only in hindsight; no plan settles it in advance. Confident this is the hard part. | probe - sense - respond | Run a safe-to-fail experiment: open a gated free tier to one segment, instrument pipeline impact, decide from the signal. |
| **Chaotic** | Nothing here is chaotic; demand is steady and there is no fire to put out. | act - sense - respond | n/a (no stabilizing act needed). |
| **Confusion** | Whether the unserved self-serve segment is even large enough to matter is unplaced - it could be a Clear market fact or a Complex bet. | break it into parts you can place | Size the segment first; until then, do not let it drive the launch decision. |

## The danger to name

- The team's comfort zone is Complicated: they want to analyze the cannibalization question into a confident plan. That is the wrong default - cannibalization is Complex, so analysis will manufacture false confidence where a small probe would give a real signal.

## What to do next

- The placement changes the plan in one decisive way: do not treat the free tier as a single known rollout. Apply the known parts (metering build, cost model), but run the cannibalization question as a gated single-segment experiment rather than analyzing it upfront, and size the unserved segment before letting it weigh in. The placement was right if the probe produces a pipeline signal that no amount of pre-launch analysis would have. That probe, not the label "this is complex," is where the decision turns.

---

*Note: the labels alone would have been four buckets and a shrug. The work was placing the parts separately, naming the team's comfort-zone default as the trap, and turning each placement into an action - the metering schedule, the cost model, and above all the single-segment probe. The unplaced segment-size question was parked in Confusion rather than forced into a box.*
