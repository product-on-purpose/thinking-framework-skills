---
title: "think-eisenhower-moscow-pareto skill"
---

# skills/think-eisenhower-moscow-pareto

`think-eisenhower-moscow-pareto` (Eisenhower / MoSCoW / Pareto) is one of the `think-*` skills in `skills/` (67 in this plugin). It runs whichever of the three named lightweight prioritization presets (Eisenhower urgent/important 2x2, MoSCoW bucketing, or a Pareto vital-few cut) the user asked for by name, caveat-first about how weakly evidenced each preset is, producing a **prioritization preset artifact**.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (`name`, `description`, `metadata`), when to use and not use it, and the step-by-step instructions an agent follows to produce the prioritization preset artifact.
- `skill.meta.yml` - the rich sidecar summarizing `SKILL.md` and `evidence/dossier.md` for the catalog: classification, interface, relationships to other skills, evidence tier, and implementation paths.
- `eval/` - `cases.md`, the trigger/output eval cases this skill is checked against (library.json G3 regression coverage); trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the sourced evidence backing this skill's evidence tier and known failure modes.
- `references/` - the templates and worked example the skill's instructions point to when producing the prioritization preset artifact.
