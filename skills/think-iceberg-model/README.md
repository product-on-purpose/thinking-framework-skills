---
title: "think-iceberg-model skill"
---

# skills/think-iceberg-model

`think-iceberg-model` (Iceberg Model) is one of the `think-*` skills in `skills/` (67 in this plugin). It moves a recurring problem down four levels of causation, from the visible event to the pattern over time, to the underlying structures, to the mental models holding them in place, pairing each level with the intervention it implies, producing a **iceberg**.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (`name`, `description`, `metadata`), when to use and not use it, and the step-by-step instructions an agent follows to produce the iceberg.
- `skill.meta.yml` - the rich sidecar summarizing `SKILL.md` and `evidence/dossier.md` for the catalog: classification, interface, relationships to other skills, evidence tier, and implementation paths.
- `eval/` - `cases.md`, the trigger/output eval cases this skill is checked against (library.json G3 regression coverage); trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the sourced evidence backing this skill's evidence tier and known failure modes.
- `references/` - the templates and worked example the skill's instructions point to when producing the iceberg.
  - `references/CONCEPT.md` - the four-level causation model the skill walks the problem down.

