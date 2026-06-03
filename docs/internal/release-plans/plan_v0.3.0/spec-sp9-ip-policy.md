# SP9 spec: IP policy application (open the IP gate, keep the evidence gate)

> **STATUS: SPEC, pending maintainer review.** Part of [`PLAN.md`](./PLAN.md). A small policy pass that
> rides on [`spec-sp3-registry.md`](./spec-sp3-registry.md)'s `attribution`/`trademark`/`branded` fields.
> The 2026-06-03 catalog + why-not truth-up (this session) is the **down-payment**; SP9 is the full pass.

## Why

The maintainer reversed the blanket IP/trademark exclusion (2026-06-03): **document every framework
(shipped, candidate, rejected) with proper trademark/attribution; ship as a skill only if it
independently clears the evidence + distinctness bar.** Branded status is no longer an automatic veto;
weak evidence still is. The catalog's identity stays honest grading, not breadth - the win is the
learning value of documenting everything (including why a thing was rejected) without diluting the
shippable skill set. SP9 applies that policy mechanically and rewrites the one artifact built on the old
rule: `why-not.md`.

## What changes

### A. Registry attribution fields (defined in SP3, populated here)
`attribution` (author/origin), `trademark` (TM/owner/license), `branded` (bool). The SP3 IP lint already
**requires** `attribution` + `trademark` when `branded: true`, so the policy is enforced by CI, not by
vigilance.

### B. The IP-only re-tag pass
Frameworks whose **only** exclusion reason was IP/branding are re-evaluated on evidence + distinctness
alone, tags updated, with the change reasoned in the registry `reasoning` field:
- **Six Thinking Hats** -> becomes shippable IF it clears evidence + distinctness (properly attributed to
  Edward de Bono). Note: the library already ships `think-parallel-perspectives-review` as the
  descriptive, mechanism-named version of separated-lens review, so Six Thinking Hats most likely lands
  as a **branded alias / documented-not-shipped** entry pointing at it - the re-tag does not presume a
  Build, it removes the IP veto and re-runs the evidence/overlap test (via `research-framework`, SP5).
- **Cynefin, Wardley Mapping, Blue Ocean** -> become **documented** (full Framework Library dossiers with
  attribution) and ship as skills only if their evidence supports it (likely C/P with distinctness
  questions - documented, not shipped).
The X/V/C evidence grading and the ~20% overlap ceiling are **untouched**: opening the IP gate does not
lower the evidence bar.

### C. `why-not.md` -> an index into the Framework Library
The live `site/src/content/docs/about/why-not.md` is rewritten from a **hard exclusion list** into an
**index into the published Framework Library**: each "not shipped" framework becomes a short entry that
links to its full dossier (`library/<slug>/`) and states the one-line reason (folded / under-evidenced /
out-of-scope / branded-and-documented). The page stops being a dead-end "no" and becomes a doorway to the
learning content. It is generated from the registry (the `status != shipped` entries) so it cannot drift
from the verdicts - the same generated-view discipline as everything else.

## Relationship to the 2026-06-03 down-payment (item 1, this session)

Before SP3/SP9 exist, this session makes the **cheap, durable** version of the same move so the vetting
verdicts do not evaporate:
- `framework-catalog.md` is truthed-up by hand (re-tag leverage-points `[cand] -> [fold]`; fix the stale
  `[next]` rows; mark belief-update Build + idea-quality-audit Recipe).
- `why-not.md` gains the four folds + the reject as honest documented entries (forward-compatible with
  the index role: each carries its reason and its fold-target, so the SP9 rewrite only has to add the
  dossier links).
When SP3 lands, these hand-edits are migrated into `registry.yaml` and both files become generated; the
down-payment is structured so that migration is a lift, not a rewrite.

## Components

- **C1** Populate `attribution`/`trademark`/`branded` on affected registry entries (rides on SP3).
- **C2** The IP-only re-tag pass (run `research-framework` on the formerly-IP-excluded set; update tags +
  reasoning; most become documented-not-shipped).
- **C3** `why-not.md` becomes a generated view of the registry's `status != shipped` entries, each
  linking to its dossier. Folded into `gen-registry.mjs` (SP3) + its drift guard.
- **C4** The IP lint (SP3 C3.5) is the enforcement; no separate mechanism.

## Acceptance criteria

- **AC1** Every `branded: true` registry entry carries `attribution` + `trademark`; the IP lint is green
  and fails on a branded entry missing either.
- **AC2** The formerly-IP-excluded set (Six Thinking Hats, Cynefin, Wardley, Blue Ocean, ...) is re-tagged
  on evidence + distinctness, each with `reasoning`; none is excluded *solely* for being branded.
- **AC3** `why-not.md` is generated from the registry, links each not-shipped framework to its dossier,
  and `--check` catches drift; the X/V/C grading and the overlap ceiling are unchanged from before.

## Out of scope

The registry + schema + IP lint mechanism (SP3 defines them; SP9 populates + applies). The dossiers the
re-tagged frameworks now need (SP4 + SP5). SP9 is the policy application + the `why-not` rewrite only.
