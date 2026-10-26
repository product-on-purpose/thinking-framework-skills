---
title: "skills/think-affinity-mapping - folder guide"
---

# skills/think-affinity-mapping

The think-affinity-mapping skill (family: synthesis, evidence-tier P). Produces a clustered theme map that groups many raw notes, observations, quotes, or data points bottom-up into a small set of named, traceable themes (the KJ method). Use when a scattered pile of dozens to hundreds of existing items needs to become a few emergent themes - synthesizing user-research notes, support tickets, survey free-text, or retro stickies - and the right structure should emerge from the data rather than be imposed.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the clustering procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the theme-map artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills, and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-affinity-mapping`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
