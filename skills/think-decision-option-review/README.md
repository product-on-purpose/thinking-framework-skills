---
title: "think-decision-option-review skill"
---

# skills/think-decision-option-review

`think-decision-option-review` (Decision Option Review) is one of the `think-*` skills in `skills/` (67 in this plugin). It compares a set of real options against explicit, weighted criteria, scores each one, and recommends a choice while flagging where the scoring is soft, producing a **criteria-weighted option matrix**.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (`name`, `description`, `metadata`), when to use and not use it, and the step-by-step instructions an agent follows to produce the criteria-weighted option matrix.
- `skill.meta.yml` - the rich sidecar summarizing `SKILL.md` and `evidence/dossier.md` for the catalog: classification, interface, relationships to other skills, evidence tier, and implementation paths.
- `eval/` - `cases.md`, the trigger/output eval cases this skill is checked against (library.json G3 regression coverage); trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the sourced evidence backing this skill's evidence tier and known failure modes.
- `references/` - the templates and worked example the skill's instructions point to when producing the criteria-weighted option matrix.
