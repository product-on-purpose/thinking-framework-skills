---
title: "skills/think-decision-journal - folder guide"
---

# skills/think-decision-journal

The think-decision-journal skill (family: meta-thinking-and-reflection, evidence-tier P). Produces a decision journal entry that records a consequential decision at the moment it is made - the decision, the rationale, the predicted outcome, an explicit confidence level, and the assumptions it rests on - so it can be honestly reviewed later against what actually happened. Use when committing to a consequential, uncertain decision (a launch, hire, investment, bet, or strategic choice) and you want to lock in the prediction now to defeat hindsight bias and build calibration.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the record-now procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the decision-journal-entry artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills, and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-decision-journal`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
