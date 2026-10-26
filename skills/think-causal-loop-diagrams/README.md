---
title: "skills/think-causal-loop-diagrams - folder guide"
---

# skills/think-causal-loop-diagrams

The think-causal-loop-diagrams skill (family: systems-and-consequences, evidence-tier M/P). Builds a signed causal loop diagram by closing the feedback loops in a situation, labeling each loop reinforcing (R) or balancing (B) with its link polarities, and reading likely dynamics (spiral, goal-seeking, or oscillation) off which loop dominates. Use when a situation feeds back on itself - growth that funds more growth, a fix that recreates its own problem, capacity that relieves then re-attracts demand. Not for a single accumulation, a one-directional consequence tree, or a genuinely linear chain.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the loop-diagram procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the signed-loop-diagram artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills, and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-causal-loop-diagrams`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
