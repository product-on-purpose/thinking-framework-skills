---
title: "think-frame-creation skill"
---

# skills/think-frame-creation

`think-frame-creation` (Frame Creation) is one of the `think-*` skills in `skills/` (67 in this plugin). It generates a new problem frame from an abductive standpoint ("approach it as if it were Y") that redefines what the problem is, then reasons forward to solution directions native to that new frame, producing a **frame proposal**.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (`name`, `description`, `metadata`), when to use and not use it, and the step-by-step instructions an agent follows to produce the frame proposal.
- `skill.meta.yml` - the rich sidecar summarizing `SKILL.md` and `evidence/dossier.md` for the catalog: classification, interface, relationships to other skills, evidence tier, and implementation paths.
- `eval/` - `cases.md`, the trigger/output eval cases this skill is checked against (library.json G3 regression coverage); trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the sourced evidence backing this skill's evidence tier and known failure modes.
- `references/` - the templates and worked example the skill's instructions point to when producing the frame proposal.
