---
title: "skills/think-brainwriting - folder guide"
---

# skills/think-brainwriting

The think-brainwriting skill (family: divergent-ideation, evidence-tier S). Generates ideas the way silent parallel brainwriting does, producing several independent idea streams that build on each other without anchoring on the first voice, then consolidates them into a shortlisted idea pool. Use when you need breadth of options and want to avoid the anchoring and conformity that make ordinary brainstorming underperform.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the parallel-streams procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the idea-pool artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills, and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-brainwriting`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
