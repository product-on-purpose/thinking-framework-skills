---
title: "think-expected-value-decision-tree skill"
---

# skills/think-expected-value-decision-tree

`think-expected-value-decision-tree` (Expected Value Decision Tree) is one of the `think-*` skills in `skills/` (67 in this plugin). It builds a decision tree of choice and chance nodes, places explicit probabilities on outcomes the decider does not control, rolls the tree back to an expected value per option, and names what would flip the recommended branch, producing a **expected-value decision tree**.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (`name`, `description`, `metadata`), when to use and not use it, and the step-by-step instructions an agent follows to produce the expected-value decision tree.
- `skill.meta.yml` - the rich sidecar summarizing `SKILL.md` and `evidence/dossier.md` for the catalog: classification, interface, relationships to other skills, evidence tier, and implementation paths.
- `eval/` - `cases.md`, the trigger/output eval cases this skill is checked against (library.json G3 regression coverage); trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the sourced evidence backing this skill's evidence tier and known failure modes.
- `references/` - the templates and worked example the skill's instructions point to when producing the expected-value decision tree.
