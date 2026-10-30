---
title: "think-parallel-perspectives-review skill"
---

# skills/think-parallel-perspectives-review

`think-parallel-perspectives-review` (Parallel Perspectives Review) is one of the `think-*` skills in `skills/` (67 in this plugin). It evaluates a decision or idea through several deliberately separated lenses in turn (facts, upside, risks, intuition, alternatives, process) so no single mode dominates, then synthesizes them into a balanced read, producing a **multi-lens review**.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (`name`, `description`, `metadata`), when to use and not use it, and the step-by-step instructions an agent follows to produce the multi-lens review.
- `skill.meta.yml` - the rich sidecar summarizing `SKILL.md` and `evidence/dossier.md` for the catalog: classification, interface, relationships to other skills, evidence tier, and implementation paths.
- `eval/` - `cases.md`, the trigger/output eval cases this skill is checked against (library.json G3 regression coverage); trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the sourced evidence backing this skill's evidence tier and known failure modes.
- `references/` - the templates and worked example the skill's instructions point to when producing the multi-lens review.
