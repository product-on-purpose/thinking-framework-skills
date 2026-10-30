---
title: "skills/think-causal-layered-analysis - folder guide"
---

# skills/think-causal-layered-analysis

The think-causal-layered-analysis skill (family: systems-and-consequences, evidence-tier C). Produces a four-layer matrix (litany, system, worldview, myth) of the current "used future" beside a reconstructed preferred future per layer, anchored by a deliberately changed deep metaphor. Use when an issue is stuck because the framing itself is stuck, the official account and the system explanation have been argued to exhaustion, and the real disagreement is about clashing worldviews and the unexamined story underneath. Not a single-cause diagnosis (that is think-iceberg-model) and not a forecast.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the four-layer procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the four-layer-matrix artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills (including the boundary against think-iceberg-model), and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-causal-layered-analysis`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
