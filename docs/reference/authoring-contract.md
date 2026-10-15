---
title: The authoring contract
description: For each thing you author in this repo, where its rules live and which gate layer enforces them. An index that links to the sources rather than copying them.
audience: engineer
level: intermediate
tags: [authoring, gate, reference]
---

# The authoring contract

This page answers one question for whatever you are about to author: where its contract lives, and what enforces it. It is an index, not a second copy of the rules. The repo's [generated-view principle](../architecture.md#the-generated-view-principle-no-second-store) forbids hand-duplicating a list that already lives somewhere else, so each row links to the source instead.

Where nothing enforces a contract, the cell says "none found". A visible gap is more useful than a guessed check.

## What you create or edit, and what checks it

| What you are authoring | Where the contract lives | Gate layer that enforces it | Generated? |
|---|---|---|---|
| A skill's `SKILL.md` (frontmatter and body) | The scaffold [`templates/skill/SKILL.md`](../../templates/skill/SKILL.md), and the [conventions in AUTHORING.md](../internal/AUTHORING.md#conventions-the-contract-every-skill-meets). | Layer 1, the toolkit's structural validators ([architecture.md](../architecture.md#the-conformance-gate)). Layer 3, [`check-registry.mjs`](../../scripts/check-registry.mjs) section 7c, checks the `## Evidence` prose against the frontmatter tier. | No. |
| The `skill.meta.yml` sidecar | The scaffold [`templates/skill/skill.meta.yml`](../../templates/skill/skill.meta.yml), and [the per-skill loop](../internal/AUTHORING.md#the-per-skill-loop). | Layer 3, `check-registry.mjs` section 9 (lifecycle truth), through [`lifecycle-lib.mjs`](../../scripts/lib/lifecycle-lib.mjs). | No. Its fields feed the generated AGENTS.md Skills table, which you never hand-edit. |
| `references/TEMPLATE.md` and `references/EXAMPLE.md` | The scaffolds [`TEMPLATE.md`](../../templates/skill/references/TEMPLATE.md) and [`EXAMPLE.md`](../../templates/skill/references/EXAMPLE.md), and [the per-skill loop](../internal/AUTHORING.md#the-per-skill-loop). | None found. `SKILL.md` names these files in code spans, and the toolkit's link check (U6) resolves only markdown links. A missing file would not fail the gate. | No. |
| `evidence/dossier.md` | The scaffold [`templates/skill/evidence/dossier.md`](../../templates/skill/evidence/dossier.md), and the [conventions in AUTHORING.md](../internal/AUTHORING.md#conventions-the-contract-every-skill-meets). | None found for the skill's own dossier. `check-registry.mjs` sections 3 and 4 check a different file: the research record at `frameworks/<slug>/dossier.md`, which the registry's `dossierPath` names. | No. |
| `eval/cases.md` | The structural rules in [`cases-lib.mjs`](../../scripts/lib/cases-lib.mjs), and the behavioral rules in [`scripts/eval/README.md`](../../scripts/eval/README.md). | Layer 2, [`eval-cases.mjs`](../../scripts/eval-cases.mjs) (well-formed and name-safe). Layer 3, `check-registry.mjs` section 6 (eval coupling). | No. Its "Should NOT trigger" bullets are copied into the router's catalog, so never close an eval miss by adding one. See [close the loop](../../scripts/eval/README.md#close-the-loop-every-miss-ends-in-a-decision-roadmap-c2-2). |
| A registry entry in `frameworks/registry.mjs` | The schema [`registry.schema.json`](../../frameworks/registry.schema.json), and [the two sources of truth](../architecture.md#the-two-sources-of-truth). | Layer 3, `check-registry.mjs` (schema, referential integrity, tier consistency, the IP lint). Layer 7, [`check-counts.mjs`](../../scripts/check-counts.mjs), catches a README count a new entry left stale. | No, it is a source. The catalog tables and the why-not index are generated from it. |
| A recipe in `_workflows/` | [Reasoning subagents](../internal/AUTHORING.md#reasoning-subagents-when-a-recipe-becomes-one), and the allowlist in [`recipe-agent-lib.mjs`](../../scripts/lib/recipe-agent-lib.mjs). | Layer 3, `check-registry.mjs` section 10 (the workflows mirror). Layer 5, [`gen-recipe-commands.mjs`](../../scripts/gen-recipe-commands.mjs) `--check`. | No, it is a source. Its command, any subagent, and the AGENTS.md Recipes row are generated from it. |
| A sample or Showcase page | [`CONTENT-STYLE.md`](../internal/CONTENT-STYLE.md) for voice and links, and [`SCENARIO_PROFILES.md`](../internal/SCENARIO_PROFILES.md) for the recurring cast. | Layer 8, [`check-example-coverage.mjs`](../../scripts/check-example-coverage.mjs). The site build's link and route guards also check the rendered page. | No. It belongs to the [hand-authored learning layer](../architecture.md#the-hand-authored-learning-layer). |
| `CHANGELOG.md` and `RELEASE-NOTES.md` entries | [`release-process.md`](../internal/release-process.md#cut-steps-to-the-gated-line). | Layer 14, [`check-changelog.mjs`](../../scripts/check-changelog.mjs). | No. |
| An eval scorecard in `docs/internal/eval-results/` | [Reproducibility](../../scripts/eval/README.md#reproducibility-which-model-which-cases-roadmap-c2-1) in the eval README. | Layer 15, [`check-eval-results.mjs`](../../scripts/check-eval-results.mjs). From 2026-10-14 it also requires the model and the case fingerprint. | Produced by [`finalize.mjs`](../../scripts/eval/finalize.mjs) or `score-selection.mjs`. Never write either half by hand. |

## Generated files

A generated file is never something you author. Its generator and its `--check` mode are listed in the [generator table](../architecture.md#the-generated-view-principle-no-second-store). The full list of committed generated files is in [AUTHORING.md](../internal/AUTHORING.md#the-files-source-of-truth-and-generated-artifacts). Edit the source, then regenerate. The gate fails a hand edit, because each check byte-compares the committed file against a fresh run.

## Read next

- [AUTHORING.md](../internal/AUTHORING.md) - the per-skill authoring loop this page indexes.
- [release-process.md](../internal/release-process.md) - how merged work becomes a tagged release.
- [AGENTS.md](../../AGENTS.md) - the agent guide, with the generated Skills and Recipes tables.
- [scripts/eval/README.md](../../scripts/eval/README.md) - the trigger, skill-selection and output evals.
- [troubleshooting.md](../troubleshooting.md) - what to do when a skill will not fire or a gate layer fails.
