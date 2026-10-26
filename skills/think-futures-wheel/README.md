---
title: "think-futures-wheel skill"
---

# skills/think-futures-wheel

`think-futures-wheel` (Futures Wheel) is one of the `think-*` skills in `skills/` (67 in this plugin). It traces the first, second, and third order effects of a change or decision radiating outward from the center, surfacing ripples beyond the obvious and flagging the high-impact branches, producing a **consequence map**.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (`name`, `description`, `metadata`), when to use and not use it, and the step-by-step instructions an agent follows to produce the consequence map.
- `skill.meta.yml` - the rich sidecar summarizing `SKILL.md` and `evidence/dossier.md` for the catalog: classification, interface, relationships to other skills, evidence tier, and implementation paths.
- `eval/` - `cases.md`, the trigger/output eval cases this skill is checked against (library.json G3 regression coverage); trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the sourced evidence backing this skill's evidence tier and known failure modes.
- `references/` - the templates and worked example the skill's instructions point to when producing the consequence map.
  - `references/CONCEPT.md` - the underlying Futures Wheel concept and how the radiating orders of effect are defined.

