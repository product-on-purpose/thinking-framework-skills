---
title: "skills/think-authentic-dissent - folder guide"
---

# skills/think-authentic-dissent

The think-authentic-dissent skill (family: assumption-and-belief-challenge, evidence-tier S). Checks whether a decision has genuine minority dissent or only smooth surface consensus, identifies who actually holds a contrary view, and plans how to elicit and protect real dissent, flagging clearly where a view is constructed rather than authentically held. Use when consensus feels too easy, or to set up genuine challenge before a high-stakes call.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the elicitation procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the dissent-audit artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills, and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-authentic-dissent`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
