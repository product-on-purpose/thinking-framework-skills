---
title: "think-ladder-of-inference-check skill"
---

# skills/think-ladder-of-inference-check

`think-ladder-of-inference-check` (Ladder of Inference Check) is one of the `think-*` skills in `skills/` (67 in this plugin). It reconstructs how a conclusion was reached, from the observable data through the data actually selected to the meaning and assumptions added, then flags the riskiest leap and tests an alternative interpretation, producing a **annotated reasoning trace**.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (`name`, `description`, `metadata`), when to use and not use it, and the step-by-step instructions an agent follows to produce the annotated reasoning trace.
- `skill.meta.yml` - the rich sidecar summarizing `SKILL.md` and `evidence/dossier.md` for the catalog: classification, interface, relationships to other skills, evidence tier, and implementation paths.
- `eval/` - `cases.md`, the trigger/output eval cases this skill is checked against (library.json G3 regression coverage); trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the sourced evidence backing this skill's evidence tier and known failure modes.
- `references/` - the templates and worked example the skill's instructions point to when producing the annotated reasoning trace.
