---
title: "skills/think-complexity-domain-sort - folder guide"
---

# skills/think-complexity-domain-sort

The think-complexity-domain-sort skill (family: decision-and-option-evaluation, evidence-tier C). Runs a complexity-domain sort - also known as Cynefin - sorting a situation into Clear, Complicated, Complex, Chaotic, or Confusion and choosing the response posture that fits, caveat-first: it leads with the weak evidence (a 2021 PMC internal-medicine review found scientific proof of its validity has yet to be provided), then forces an explicit response posture and a concrete next action rather than just a label. Use only when this sort is asked for by name; for cause decomposition prefer think-issue-tree.

## Inventory

- `SKILL.md` - the skill definition: frontmatter (name, description, evidence-tier, family) plus the caveat-first sorting procedure.
- `eval/` - `cases.md`, the "should trigger" / "should not trigger" eval cases the behavioral trigger eval and the advisor's anti-triggers are built from; trigger eval: `measured-2026-10-20`, output eval: `measured-2026-10-20` (skill.meta.yml `quality`).
- `evidence/` - `dossier.md`, the evidence dossier this skill's frontmatter `evidence-tier` and description are a hand-authored summary of.
- `references/` - `TEMPLATE.md` (the domain-sort-plus-posture artifact shape) and `EXAMPLE.md` (a worked example of this skill's output).
- `skill.meta.yml` - the rich lifecycle sidecar: classification, interface, relationships to sibling skills (including the boundary against think-issue-tree), and measured eval status.

## Relation to parent

One of the frameworks installed under [`../`](../../docs/README.md#pointers-off-this-folder); its installable name (`think-complexity-domain-sort`) is this directory's own name, and `skills/` is the plugin's single source of truth that the generated site, catalog, and `AGENTS.md` tables all derive from.
