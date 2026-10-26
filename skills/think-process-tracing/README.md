---
title: "Process Tracing - folder guide"
---

# think-process-tracing

Adjudicates rival causal explanations of a single case by typing each piece of within-case evidence by its diagnosticity (hoop, smoking-gun, straw-in-the-wind, doubly-decisive) against each rival's mechanism chain. Rivals are eliminated or confirmed item by item, not by a tally, so it fits an incident postmortem or a metric anomaly with real mechanism-level evidence on hand.

This folder is one method under [`skills/`](../) in the thinking-framework-skills plugin. It is loaded by its installable skill name, `think-process-tracing`, which matches the folder name.

## Inventory

- `SKILL.md` - the skill definition agents load: frontmatter `name`/`description` (the trigger text), when to use and not use it, and the step-by-step instructions.
- `eval` - trigger and near-miss eval cases (`cases.md`). Trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence` - the evidence dossier (`dossier.md`), the single source of truth this skill's claims, evidence tier, and confidence derive from.
- `references` - the worked `EXAMPLE.md` (the quality bar a generated run should meet) and the fill-in `TEMPLATE.md` the skill's output follows.
- `skill.meta.yml` - the rich sidecar: classification (family, thinking modes, problem contexts), evidence tier, and provenance metadata, hand-summarized from `evidence/dossier.md`.
