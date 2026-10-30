---
title: "skills/think-analysis-of-competing-hypotheses - folder guide"
---

# skills/think-analysis-of-competing-hypotheses

The think-analysis-of-competing-hypotheses skill (family: assumption-and-belief-challenge, evidence-tier X). Handles a by-name request for ACH honestly rather than building the matrix as if it were valid: controlled trials found ACH raises confidence with no accuracy gain and does not reduce confirmation bias, so this skill leads with that evidence, then routes to the evidence-based move the job actually needs (think-red-team-light, think-evidence-vs-inference-sort, or think-what-would-have-to-be-true). Use only when someone asks for ACH or a competing-hypotheses matrix by name.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the honesty-first routing procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` (X, the weakest grade) and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the routing/caveat artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to the skills it routes to, and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-analysis-of-competing-hypotheses`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
