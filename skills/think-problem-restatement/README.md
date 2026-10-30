---
title: "Problem Restatement - folder guide"
---

# think-problem-restatement

Generates several genuinely different framings of an ambiguous problem - by altitude, by stakeholder, by separating goal from implementation - and converges on the single most useful one to solve. The output is a problem frame set ending in a chosen working frame with How Might We angles, not an open-ended list.

This folder is one method under [`skills/`](../) in the thinking-framework-skills plugin. It is loaded by its installable skill name, `think-problem-restatement`, which matches the folder name.

## Inventory

- `SKILL.md` - the skill definition agents load: frontmatter `name`/`description` (the trigger text), when to use and not use it, and the step-by-step instructions.
- `eval` - trigger and near-miss eval cases (`cases.md`). Trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence` - the evidence dossier (`dossier.md`), the single source of truth this skill's claims, evidence tier, and confidence derive from.
- `references` - the worked `EXAMPLE.md` (the quality bar a generated run should meet) and the fill-in `TEMPLATE.md` the skill's output follows.
- `skill.meta.yml` - the rich sidecar: classification (family, thinking modes, problem contexts), evidence tier, and provenance metadata, hand-summarized from `evidence/dossier.md`.
