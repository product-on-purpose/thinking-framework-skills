---
title: "skills/think-backcasting - folder guide"
---

# skills/think-backcasting

The think-backcasting skill (family: risk-and-resilience, evidence-tier P). Produces a backcast path by fixing a vivid desired future state and reasoning backward through the milestones and preconditions required to reach it, ending at the next concrete step available now. Use when planning toward a transformative or long-horizon goal that forward planning anchors too low, or when a chosen future needs a route mapped back to today with explicit milestones and dependencies.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the backcasting procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the backcast-path artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills, and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-backcasting`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
