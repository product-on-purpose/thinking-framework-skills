---
title: "Speculative Harms and Anti-Goals - folder guide"
---

# think-speculative-harms-anti-goals

Assumes a design succeeds at scale, narrates the near-future in which that success harms third parties and is exploited in bad faith by named bad actors, then converts each speculated harm into a standing design constraint. It is for a success case that could externalize harm beyond the customer relationship, not a premortem and not a security threat model.

This folder is one method under [`skills/`](../) in the thinking-framework-skills plugin. It is loaded by its installable skill name, `think-speculative-harms-anti-goals`, which matches the folder name.

## Inventory

- `SKILL.md` - the skill definition agents load: frontmatter `name`/`description` (the trigger text), when to use and not use it, and the step-by-step instructions.
- `eval` - trigger and near-miss eval cases (`cases.md`). Trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence` - the evidence dossier (`dossier.md`), the single source of truth this skill's claims, evidence tier, and confidence derive from.
- `references` - the worked `EXAMPLE.md` (the quality bar a generated run should meet) and the fill-in `TEMPLATE.md` the skill's output follows.
- `skill.meta.yml` - the rich sidecar: classification (family, thinking modes, problem contexts), evidence tier, and provenance metadata, hand-summarized from `evidence/dossier.md`.
