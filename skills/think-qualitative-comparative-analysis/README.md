---
title: "Qualitative Comparative Analysis (QCA) - folder guide"
---

# think-qualitative-comparative-analysis

Handles a by-name request for QCA honestly: at session scale the truth-table input almost never exists in a form the method can certify, so this skill declines to build a truth table from noise. It leads with that evidence gap, then routes the request to the evidence-based move the job actually needs - reference-class forecasting for comparable cases, or process tracing for a single case.

This folder is one method under [`skills/`](../) in the thinking-framework-skills plugin. It is loaded by its installable skill name, `think-qualitative-comparative-analysis`, which matches the folder name.

## Inventory

- `SKILL.md` - the skill definition agents load: frontmatter `name`/`description` (the trigger text), when to use and not use it, and the step-by-step instructions.
- `eval` - trigger and near-miss eval cases (`cases.md`). Trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence` - the evidence dossier (`dossier.md`), the single source of truth this skill's claims, evidence tier, and confidence derive from.
- `references` - the worked `EXAMPLE.md` (the quality bar a generated run should meet) and the fill-in `TEMPLATE.md` the skill's output follows.
- `skill.meta.yml` - the rich sidecar: classification (family, thinking modes, problem contexts), evidence tier, and provenance metadata, hand-summarized from `evidence/dossier.md`.
