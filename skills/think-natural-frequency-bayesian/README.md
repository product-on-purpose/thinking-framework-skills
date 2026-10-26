---
title: "think-natural-frequency-bayesian skill"
---

# skills/think-natural-frequency-bayesian

`think-natural-frequency-bayesian` (Natural-Frequency Bayesian Framing) is one of the `think-*` skills in `skills/` (67 in this plugin). It converts a conditional-probability or base-rate question into natural frequencies over a concrete population to compute the correct posterior and expose base-rate neglect, producing a **natural-frequency breakdown**.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (`name`, `description`, `metadata`), when to use and not use it, and the step-by-step instructions an agent follows to produce the natural-frequency breakdown.
- `skill.meta.yml` - the rich sidecar summarizing `SKILL.md` and `evidence/dossier.md` for the catalog: classification, interface, relationships to other skills, evidence tier, and implementation paths.
- `eval/` - `cases.md`, the trigger/output eval cases this skill is checked against (library.json G3 regression coverage); trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the sourced evidence backing this skill's evidence tier and known failure modes.
- `references/` - the templates and worked example the skill's instructions point to when producing the natural-frequency breakdown.
  - `references/CONCEPT.md` - why natural frequencies avoid the base-rate-neglect trap that raw conditional probabilities invite.

