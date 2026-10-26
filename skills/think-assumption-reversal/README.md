---
title: "skills/think-assumption-reversal - folder guide"
---

# skills/think-assumption-reversal

The think-assumption-reversal skill (family: divergent-ideation, evidence-tier P). Generates non-obvious ideas by surfacing the foundational assumptions a problem or solution rests on, negating each, and reframing from the reversed assumptions, then shortlisting, producing an assumptions-and-reversals sheet. Use when an option space feels stuck inside default constraints, or when you need to expose premises that are taken for granted.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the reversal procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the assumptions-and-reversals sheet shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills, and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-assumption-reversal`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
