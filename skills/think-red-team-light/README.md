---
title: "Red Team Light - folder guide"
---

# think-red-team-light

Constructs the strongest case against a proposal or thesis - the best objections an intelligent adversary would raise - then judges which objections actually land and what would rebut them. It is for pressure-testing a plan that has too-easy consensus, or for steelmanning the opposition before committing.

This folder is one method under [`skills/`](../) in the thinking-framework-skills plugin. It is loaded by its installable skill name, `think-red-team-light`, which matches the folder name.

## Inventory

- `SKILL.md` - the skill definition agents load: frontmatter `name`/`description` (the trigger text), when to use and not use it, and the step-by-step instructions.
- `eval` - trigger and near-miss eval cases (`cases.md`). Trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence` - the evidence dossier (`dossier.md`), the single source of truth this skill's claims, evidence tier, and confidence derive from.
- `references` - the worked `EXAMPLE.md` (the quality bar a generated run should meet) and the fill-in `TEMPLATE.md` the skill's output follows.
- `skill.meta.yml` - the rich sidecar: classification (family, thinking modes, problem contexts), evidence tier, and provenance metadata, hand-summarized from `evidence/dossier.md`.
