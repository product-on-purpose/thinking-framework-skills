---
title: "skills/think-boundary-critique - folder guide"
---

# skills/think-boundary-critique

The think-boundary-critique skill (family: problem-framing, evidence-tier C/P). Audits the boundary judgments that silently define a problem frame. For each of four sources - who benefits, who decides, whose knowledge counts, who has standing - it contrasts the descriptive "is" boundary against the normative "ought" boundary, names the gaps, and lists the affected-but-excluded parties who have no voice in the frame. Use on contested, value-laden, multi-party situations, or when a plan already encodes who matters and who does not and the risk is solving a tidy problem for the people inside the line while pushing harm outside it.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the boundary-audit procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the boundary-judgment-audit artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills, and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-boundary-critique`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
