---
title: "Top 3 - folder guide"
---

# think-top3

Ranks the whole library of thinking frameworks for relevance to a topic, runs the top three so each emits its real artifact, then reconciles them into one cross-framework synthesis. It is for a decision that deserves more than one lens and wants worked output now, not a plan of which methods to run later.

This folder is one method under [`skills/`](../) in the thinking-framework-skills plugin. It is loaded by its installable skill name, `think-top3`, which matches the folder name.

## Inventory

- `SKILL.md` - the skill definition agents load: frontmatter `name`/`description` (the trigger text), when to use and not use it, and the step-by-step instructions.
- `eval` - trigger and near-miss eval cases (`cases.md`). Trigger eval: `measured-2026-10-20`, output eval: `measured-2026-09-11` (skill.meta.yml `quality`).
- `evidence` - the evidence dossier (`dossier.md`), the single source of truth this skill's claims, evidence tier, and confidence derive from.
- `references` - the worked `EXAMPLE.md` (the quality bar a generated run should meet) and the fill-in `TEMPLATE.md` the skill's output follows.
- `skill.meta.yml` - the rich sidecar: classification (family, thinking modes, problem contexts), evidence tier, and provenance metadata, hand-summarized from `evidence/dossier.md`.
