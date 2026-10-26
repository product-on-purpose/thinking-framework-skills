---
title: "think-framework-advisor skill"
---

# skills/think-framework-advisor

`think-framework-advisor` (Framework Advisor) is one of the `think-*` skills in `skills/` (67 in this plugin). It diagnoses which thinking frameworks a situation actually needs and produces a prioritized, evidence-graded plan naming the fewest fitting frameworks, in order, each with its evidence tier and a ready-to-run prompt, producing a **thinking plan**.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (`name`, `description`, `metadata`), when to use and not use it, and the step-by-step instructions an agent follows to produce the thinking plan.
- `skill.meta.yml` - the rich sidecar summarizing `SKILL.md` and `evidence/dossier.md` for the catalog: classification, interface, relationships to other skills, evidence tier, and implementation paths.
- `eval/` - `cases.md`, the trigger/output eval cases this skill is checked against (library.json G3 regression coverage); trigger eval: `measured-2026-10-20`, output eval: `measured-2026-09-11` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the sourced evidence backing this skill's evidence tier and known failure modes.
- `references/` - the templates and worked example the skill's instructions point to when producing the thinking plan.
  - `references/recommendable.json` - the machine-readable list of frameworks this library ships that the advisor is allowed to recommend.
  - `references/recommendable.md` - the human-readable counterpart to `recommendable.json`.

