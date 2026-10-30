---
title: "skills/think-abstraction-laddering - folder guide"
---

# skills/think-abstraction-laddering

The think-abstraction-laddering skill (family: problem-framing, evidence-tier P). Builds an abstraction ladder that moves a problem up ("why / to what end?") and down ("how / what specifically?") to locate the right altitude to work at, then marks one rung as the working level. Use when a problem is stated as a bare solution with an unstated purpose, as a vague aspiration with no concrete handle, or when people are arguing past each other at different levels.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the step-by-step laddering procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the abstraction-ladder artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills (problem-restatement, issue-tree, question-burst), and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-abstraction-laddering`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
