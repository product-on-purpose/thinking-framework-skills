---
title: "skills/think-concept-mapping - folder guide"
---

# skills/think-concept-mapping

The think-concept-mapping skill (family: synthesis, evidence-tier M/P). Builds a concept map - a non-hierarchical network of concept nodes joined by directed, labeled linking phrases so each node-link-node reads as an explicit proposition, with cross-links across clusters - then surfaces gaps, missing links, and questionable propositions. Use when a domain has many interrelated concepts and the goal is to externalize and inspect how they relate, forcing every relationship to be named rather than left as a vague association.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the concept-mapping procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the concept-map artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills, and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-concept-mapping`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
