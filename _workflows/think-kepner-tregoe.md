---
name: think-kepner-tregoe
description: Run the Kepner-Tregoe rational process as a chain of shipped moves, taking a bounded operational problem through cause-finding, then a weighted choice among options, then a forward risk pass, so a fix is de-risked end to end.
steps:
  - think-issue-tree
  - think-decision-option-review
  - think-premortem
metadata:
  version: 0.1.0
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Recipe: kepner-tregoe (workflow)

Kepner-Tregoe (a registered trademark of Kepner-Tregoe, Inc.) is not a separate skill here: it is a bundle of four named procedures - Situation Appraisal, Problem Analysis, Decision Analysis, Potential Problem Analysis - and each is a generic move the library already ships. This recipe runs the de-branded chain honestly rather than dressing the package up as a new method. Situation Appraisal is the routing front-end (run only the steps the situation needs); the three analytic procedures map to shipped skills.

Run the steps in order, carrying forward only the compressed artifact between them:

1. `think-issue-tree` (Problem Analysis) -> carry the **most-probable cause** of the deviation. The KT IS/IS-NOT specification grid is a worksheet convention for this cause decomposition, not a separate move.
2. `think-decision-option-review` (Decision Analysis) -> carry the **chosen option**. KT MUSTs are veto (pass/fail) columns on the weighted matrix; WANTs are the weighted criteria.
3. `think-premortem` (Potential Problem Analysis) -> carry the **risk register with preventive and contingent actions**. KT's own materials call PPA "a simplified FMEA", and FMEA-lite already folds into premortem.

Composite artifact: a rational-process record - the most-probable cause, the de-risked chosen option, and the preventive/contingent action plan. Full prose and rationale: `recipes/kepner-tregoe.md`.
