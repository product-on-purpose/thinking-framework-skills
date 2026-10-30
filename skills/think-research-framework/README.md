---
title: "Research Framework - folder guide"
---

# think-research-framework

Researches a candidate thinking framework end to end and produces a schema-valid proposed registry entry plus a learning dossier, grading the evidence on the seven-tier model and assessing overlap against the shipped catalog. It is for deciding build-or-fold on a candidate method before it becomes a skill, which is why it carries no evidence/ or references/ of its own: its output IS an evidence dossier for some other skill.

This folder is one method under [`skills/`](../) in the thinking-framework-skills plugin. It is loaded by its installable skill name, `think-research-framework`, which matches the folder name.

## Inventory

- `SKILL.md` - the skill definition agents load: frontmatter `name`/`description` (the trigger text), when to use and not use it, and the step-by-step instructions.
- `eval` - trigger and near-miss eval cases (`cases.md`). Trigger eval: `measured-2026-10-20`, output eval: `measured-2026-09-11` (skill.meta.yml `quality`).
- `skill.meta.yml` - the rich sidecar: classification (family, thinking modes, problem contexts), and implementation paths. `evidence.evidence_tier` is `n/a` here, not hand-summarized from a dossier: this skill carries no `evidence/` of its own (see above), because its job is producing one for some other skill.
