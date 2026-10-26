---
title: "think-morphological-analysis skill"
---

# skills/think-morphological-analysis

`think-morphological-analysis` (Morphological Analysis) is one of the `think-*` skills in `skills/` (67 in this plugin). It lays out a solution as a Zwicky box of independent parameters by their possible values, then cross-consistency-prunes it down to the internally consistent configurations, producing a **morphological field**.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (`name`, `description`, `metadata`), when to use and not use it, and the step-by-step instructions an agent follows to produce the morphological field.
- `skill.meta.yml` - the rich sidecar summarizing `SKILL.md` and `evidence/dossier.md` for the catalog: classification, interface, relationships to other skills, evidence tier, and implementation paths.
- `eval/` - `cases.md`, the trigger/output eval cases this skill is checked against (library.json G3 regression coverage); trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the sourced evidence backing this skill's evidence tier and known failure modes.
- `references/` - the templates and worked example the skill's instructions point to when producing the morphological field.
