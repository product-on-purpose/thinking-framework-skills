---
title: "skills/think-contradiction-resolution - folder guide"
---

# skills/think-contradiction-resolution

The think-contradiction-resolution skill (family: problem-framing, evidence-tier M/P). Converts a stuck trade-off into a contradiction to dissolve rather than a compromise to settle for. Names the two conflicting requirements, states an implementation-free Ideal Final Result, and applies the four separation principles (time, space, scale, or condition) to satisfy both at once, then produces either a concrete resolution or an honest flag that the trade-off is genuine. Use when a decision has hardened into an either/or like speed versus quality, and splitting the difference feels wrong.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the separation-principles procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the Ideal-Final-Result / resolution artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills, and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-contradiction-resolution`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
