---
title: "skills/think-consider-the-unknowns - folder guide"
---

# skills/think-consider-the-unknowns

The think-consider-the-unknowns skill (family: assumption-and-belief-challenge, evidence-tier M). Produces a known-unknowns ledger by enumerating the relevant evidence not in hand, the variables that bear on a judgment but are unknown or unobservable, rating each unknown by its bearing and its obtainability, then re-rating confidence against the mapped gap. Use when a consequential one-off judgment rests on thin or partial evidence and no usable base rate exists. Not for cases with a real reference class, for widening a numeric interval, or for unknowns cheap enough to just go resolve.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the known-unknowns-ledger procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the known-unknowns-ledger artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills, and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-consider-the-unknowns`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
