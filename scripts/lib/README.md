---
title: "scripts/lib - folder guide"
---

# scripts/lib

The shared library the check and generator scripts in [`../`](../README.md) import: mostly pure functions, kept free of filesystem and network access where possible so they are unit-tested directly rather than through a CLI. Each file carries the same four-field header (G9) as its caller.

## Inventory

- `cases-lib.mjs` - the shared markdown-section parser and validator for `skills/*/eval/cases.md` and `skills/*/SKILL.md`: extracts named `## ...` sections and their top-level bullets.
- `changelog-lib.mjs` - pure text transforms for the generated site changelog pages: rewrites relative markdown links in `CHANGELOG.md` / `RELEASE-NOTES.md` to their site or repo-blob destinations.
- `confirm-notes-lib.mjs` - pure helpers behind `check-registry.mjs`'s confirm-note ratchet: counts unresolved "confirm before a public claim" notes in a dossier.
- `contested-lib.mjs` - the structural conformance rules for one contested-lens skill against the caveat-first contract (DS-01): a famous-but-weak framework must lead with its deficiency.
- `count-surface-lib.mjs` - the matcher behind `check-counts.mjs`: given a document, a pattern, and the canonical number, returns the mismatches.
- `dispatch-checks-lib.mjs` - the pure ordering rule for the dispatch output eval: splices machine-decided and model-judged per-check grades into one list.
- `doi-sweep-lib.mjs` - the extraction and classification rules behind `sweep-crossref.mjs`, kept free of network and disk access so they are unit-tested directly.
- `eval-results-lib.mjs` - the pure validation rules over `docs/internal/eval-results/`: `.md`/`.json` pairing, plus whether a scorecard overclaims what the skill sidecars record.
- `example-coverage-lib.mjs` - the set arithmetic behind "every newly shipped skill ships a worked example": given shipped slugs, referenced slugs, and the grandfathered baseline, returns what is uncovered and what fails.
- `fingerprint-lib.mjs` - the pure functions recording which case set and which model produced a scorecard: fingerprints a skill's `eval/cases.md` (sha256, LF-normalized, first 12 hex) and builds run provenance.
- `lifecycle-lib.mjs` - the rules deciding whether one `skill.meta.yml` tells the truth about that skill's lifecycle and measurement state.
- `manifest-roster-lib.mjs` - the local, semantic half of the `manifest.generated.json` drift guard: checks `library.json`'s name/version/tier/standard and every on-disk skill and command still matches.
- `mermaid-lint.mjs` - the zero-dependency structural validator for mermaid code blocks: an unclosed fence, an empty block, or an unrecognized diagram type, without a full semantic parse.
- `recipe-agent-lib.mjs` - the pure transform from a `_workflows/<name>.md` recipe to an `agents/<name>.md` reasoning subagent, plus the allowlist of which recipes get one.
- `recipe-command-lib.mjs` - the pure transform from a `_workflows/<name>.md` recipe to a `commands/<name>.md` slash command.
- `registry-entry-lib.mjs` - the shared schema validator for a single framework registry entry against `frameworks/registry.schema.json`.
- `research-appendix-lib.mjs` - the pure renderer behind `research-appendix.mjs`: lists every registry method, grouped by family, with its aliases and disposition.
- `route-parity-lib.mjs` - the comparison between a committed route baseline (`route-manifest.txt`) and a freshly built site: what was removed (a failure) and what was added (allowed).
- `selection-lib.mjs` - the pure rules behind the skill-selection behavioral eval: builds the installed roster an agent actually sees and resolves a case against it.
- `tier-claim-lib.mjs` - keeps the published conformance tier, medal, and declared Standard version honest against `library.json` everywhere they are asserted in prose.
- `tier-lib.mjs` - ties a skill's three evidence-tier surfaces together: the `## Evidence` prose, the frontmatter `evidence-tier`, and `frameworks/registry.mjs`.
- `toolkit-pin-lib.mjs` - recovers which `agent-skills-toolkit` commit this repo grades against, by scanning `.github/workflows/ci.yml`'s checkout step.
- `walk.mjs` - the one recursive, zero-dependency directory walker shared by every file-scanning check in this repo.
- `warning-count-lib.mjs` - keeps the gate's headline warning count honest: parses an evaluator run's totals and the places that count is published in prose.
- `workflow-mirror-lib.mjs` - the workflows half of the components mirror: checks that `library.json`'s declared workflows and the `_workflows/` directory describe the same set, in both directions.

## Relation to parent

Every file here is imported by at least one script in [`../`](../README.md) (the checks, the generators, or the eval harness); nothing in this folder is run directly, and nothing in `../` reimplements logic that belongs here.
