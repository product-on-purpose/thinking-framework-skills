---
title: "skills/think-argument-mapping - folder guide"
---

# skills/think-argument-mapping

The think-argument-mapping skill (family: reasoning-clarity, evidence-tier S). Produces an argument map by laying out a claim's supporting reasons, the co-premises each silently depends on, and the objections against it as an explicit structure, then flags the weakest links and unsupported premises. Use when an argument or recommendation must be evaluated for soundness, or when a fluent case may be hiding a broken inference.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the mapping procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the argument-map artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills, and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-argument-mapping`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
