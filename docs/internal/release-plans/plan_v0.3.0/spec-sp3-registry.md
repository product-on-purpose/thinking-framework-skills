# SP3 spec: the framework registry (`registry.yaml`) + strong CI

> **STATUS: IMPLEMENTED (2026-06-03); spec retained as the contract.** See `CHANGELOG.md` [Unreleased]. The registry shipped as a zero-dependency `.mjs` data module (not YAML) to keep the repo's scripts dependency-free; same single-source-of-truth + strong-CI intent. Part of [`PLAN.md`](./PLAN.md). The data foundation
> for the Framework Library. Pairs with [`spec-sp9-ip-policy.md`](./spec-sp9-ip-policy.md) (attribution
> fields) and feeds [`spec-sp4-framework-library.md`](./spec-sp4-framework-library.md) (dossiers) and
> [`spec-sp5-research-framework.md`](./spec-sp5-research-framework.md) (the engine that proposes entries).

## Why

Today the catalog of evaluated frameworks lives in **two hand-maintained markdown files** that drift:
`docs/internal/research/framework-catalog.md` (the universe, with `[shipped]/[next]/[cand]/[fold]/...`
tags) and `site/src/content/docs/about/why-not.md` (the public exclusion list). The 2026-06-03 vetting
run proved the drift is real: the catalog still tagged three v0.2.0-shipped skills as `[next]` and one
`[cand]` (leverage-points) that is actually a fold. A hand-list cannot enforce that every shipped
framework has a skill, every fold points at a real target, or every branded entry carries attribution.

The maintainer's decision (locked 2026-06-03): make a **registry the single source of truth**, with
**strong CI** around it, and generate every view. A framework's identity, grade, status, and reasoning
live once; the catalog, the advisor's recommendable feed, and the site Framework Library index are all
**generated and drift-checked**. "Resilient docs" is exactly this: the documents cannot rot because a
required check regenerates and byte-compares them on every PR.

## Design overview

```
frameworks/registry.yaml            <- single source of truth (hand/agent-authored entries)
  |-- registry.schema.json          <- committed JSON Schema (validates every entry)
  |-- gen -> docs/internal/research/framework-catalog.md   (master list, generated)
  |-- gen -> skills/think-framework-advisor/references/recommendable.{json,md}  (advisor + chooser feed)
  |-- gen -> site/src/content/docs/frameworks/ index + per-entry status   (Framework Library, SP4)
scripts/gen-registry.mjs            <- the generator (one source, many views; --check for CI)
scripts/check-registry.mjs          <- the integrity checks (schema, referential, completeness, IP)
```

The registry is **YAML** (decided): comfortable for long `reasoning` prose and multi-line attribution,
diff-friendly, and comment-tolerant. The generated views stay in their existing formats so nothing
downstream (the advisor, the site generator) changes shape; they simply stop being hand-authored.

### The entry schema

Each `frameworks[]` entry (one per evaluated method, shipped or not):

| Field | Req | Notes |
|---|---|---|
| `slug` | yes | kebab method name, no `think-` prefix (e.g. `belief-update-routine`); unique; the dossier dir + skill dir key |
| `name` | yes | display name (e.g. "Belief-Update Routine") |
| `family` | yes | enum: the 11 families (problem-framing ... meta-thinking-and-reflection) |
| `tier` | yes | enum `S/M/P/V/A/C/X` (honest evidence grade; X never ships) |
| `status` | yes | enum `shipped / next / cand / fold / flag / pm / excl` |
| `verdict` | yes | enum `build / fold / recipe / reject / shipped` (the vetting decision) |
| `evalDate` | yes | ISO date the verdict was set/confirmed |
| `reasoning` | yes | why this status/verdict (the decisive rationale; multi-line) |
| `foldInto` | cond | required when `status: fold` / `verdict: fold`; a `slug` that MUST resolve to a `shipped` entry |
| `dossierPath` | cond | `frameworks/<slug>/dossier.md` or the literal `pending`; required once SP4 lands |
| `evalCases` | cond | `skills/think-<slug>/eval/cases.md`; required when `status: shipped` (couples to SP1) |
| `attribution` | cond | author/origin (e.g. "Donella Meadows, 1999"); **required when `branded: true`** |
| `trademark` | cond | TM/owner/license string; **required when `branded: true`** (the IP lint, SP9) |
| `branded` | no | bool; true for IP/branded frameworks (Six Thinking Hats, Cynefin, ...) |
| `sources` | no | list of `{title, url, kind}` for the dossier bibliography seed |
| `aliases` | no | other names (so search/dedupe catches "MECE" == "mutually exclusive ...") |

The `anti_triggers` + `not_use` fields SP1 adds to `recommendable.json` are **registry-shaped**: once
SP3 lands, the registry owns them (or they stay derived from each shipped skill's `eval/cases.md` +
`SKILL.md`, with the registry referencing the source). SP1 forward-fits this on purpose; SP3 does not
rebuild SP1.

### The generated views (drift-checked)

1. **`framework-catalog.md`** - the master list, grouped by family, each row `name | one-line | tier |
   [status] -> note`. Replaces the hand-authored catalog (SP3 open decision: fully generated, or a
   generated table with a hand-authored narrative preamble - recommendation: fully generated table,
   optional hand preamble above a `<!-- generated below -->` marker).
2. **`recommendable.{json,md}`** - unchanged shape (SP1's enriched fields), now sourced from the
   registry's `shipped` entries rather than re-derived independently. The existing
   `gen-recommendable.mjs --check` drift guard subsumes into the registry drift guard.
3. **The site Framework Library index** (SP4) - the list of every framework with its status badge,
   linking to each dossier.

## Components

### C1. `frameworks/registry.yaml` + `frameworks/registry.schema.json`
The authored source + its JSON Schema. Seed `registry.yaml` from the current `framework-catalog.md`
(a one-time migration: parse the existing rows into entries, carry the tags as `status`, the notes as
`reasoning`). The migration is a throwaway script or a careful hand-pass; the registry is hand-owned
thereafter (entries proposed by SP5's `research-framework`).

### C2. `scripts/gen-registry.mjs` (generator, `--check` mode)
Reads `registry.yaml`, writes the three generated views. `--check` regenerates to memory and
byte-compares against the committed files; exits 1 on any drift (the `gen-recommendable` pattern,
generalized). Zero-dependency Node, UTF-8 explicit (the Windows cp1252 trap).

### C3. `scripts/check-registry.mjs` (integrity, `--check`)
The strong CI, run in the required `check` gate:

1. **Schema validation** - every entry validates against `registry.schema.json` (enums for tier,
   status, family; required-field conditionals; `branded -> attribution + trademark`).
2. **Drift guard** - delegates to `gen-registry.mjs --check` (all three views byte-match).
3. **Referential integrity** - `status: shipped` <-> `skills/think-<slug>/` exists (both directions:
   no shipped entry without a skill dir; no skill dir without a shipped entry). Every `foldInto`
   resolves to a `shipped` slug. Every `dossierPath != pending` resolves to a real file. Every source
   `url` is well-formed.
4. **Completeness** - every entry has a `dossierPath` (or `pending`); no `frameworks/<slug>/dossier.md`
   exists without a registry entry (no orphan dossier).
5. **IP / attribution lint** - `branded: true` requires non-empty `attribution` + `trademark`.
6. **Eval coupling** (ties to SP1) - every `shipped` entry's `evalCases` path exists and SP1's static
   validator passes for it.

### C4. Gate wiring
`scripts/check.mjs` invokes `check-registry.mjs` after the toolkit evaluator and the SP1 validator;
`ci.yml`'s required `check` job covers it; `check-registry` is made a **required** status check on
`main` (same posture as `check`). `npm run check` runs the full chain. Worktree-portable toolkit
resolution (SP1's fix) is a prerequisite so the registry checks run from any workspace.

## Acceptance criteria

- **AC1** `frameworks/registry.yaml` holds one entry per framework currently in `framework-catalog.md`,
  validating against `registry.schema.json`; `node scripts/check-registry.mjs --check` exits 0.
- **AC2** `framework-catalog.md`, `recommendable.{json,md}`, and the site index are **generated**;
  hand-editing any of them and running `--check` exits 1 (drift caught).
- **AC3** Referential integrity holds: every `shipped` <-> a skill dir; every `foldInto` -> a real
  shipped slug; every non-`pending` `dossierPath` -> a real file. A fixture that breaks each (orphan
  shipped, dangling fold, missing dossier) makes `--check` exit 1.
- **AC4** A `branded: true` entry missing `attribution` or `trademark` fails the IP lint.
- **AC5** `check-registry` runs inside the required `check` gate on every PR; `npm run check` green
  (advanced, 0/0) from a worktree.

## Out of scope

The dossier *content* and the site Framework Library *rendering* (SP4); the `research-framework`
engine that proposes entries (SP5); the IP re-tag pass and the `why-not.md` rewrite (SP9, which rides
on the `attribution`/`branded` fields this spec defines). SP3 builds the data spine and its guards only.

## Open decisions for review

1. **`framework-catalog.md`: fully generated, or generated-table-under-a-hand-preamble?** Recommendation:
   fully generated table; an optional hand-authored narrative may sit above a `<!-- generated -->` marker
   that the generator preserves.
2. **Registry field ownership of `anti_triggers`/`not_use`:** registry-owned, or registry-references the
   shipped skill's derived values (SP1's source)? Recommendation: keep them derived from the skill's
   authored files (one source), registry references; avoids a second copy of the same prose.
