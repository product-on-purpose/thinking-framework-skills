---
title: "think-far-analogy-ideation skill"
---

# skills/think-far-analogy-ideation

`think-far-analogy-ideation` (Far-Analogy Ideation) is one of the `think-*` skills in `skills/` (67 in this plugin). It states a problem's deep relational structure, maps it onto distant source domains (nature, other industries, games), and transfers the underlying mechanism rather than surface features, producing a **far-analogy transfer sheet**.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (`name`, `description`, `metadata`), when to use and not use it, and the step-by-step instructions an agent follows to produce the far-analogy transfer sheet.
- `skill.meta.yml` - the rich sidecar summarizing `SKILL.md` and `evidence/dossier.md` for the catalog: classification, interface, relationships to other skills, evidence tier, and implementation paths.
- `eval/` - `cases.md`, the trigger/output eval cases this skill is checked against (library.json G3 regression coverage); trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the sourced evidence backing this skill's evidence tier and known failure modes.
- `references/` - the templates and worked example the skill's instructions point to when producing the far-analogy transfer sheet.
