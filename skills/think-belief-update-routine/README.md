---
title: "skills/think-belief-update-routine - folder guide"
---

# skills/think-belief-update-routine

The think-belief-update-routine skill (family: meta-thinking-and-reflection, evidence-tier P). Produces a belief-update ledger that re-scores a standing inventory of open beliefs against newly arrived evidence on a cadence: each belief carries a prior confidence, the evidence accrued since the last review, a revised confidence with an explicit delta and direction, a reason for the size of the move (a guard against under-updating), and a next-review trigger. Use when you hold consequential open beliefs, forecasts, or standing assumptions that should track new evidence over time - not a one-time decision record, a finished-event retro, or a single claim's conditions.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the recurring re-scoring procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the belief-update-ledger artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills, and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-belief-update-routine`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
