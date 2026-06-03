# v0.3.0+ plan: advisor credibility, then the Framework Library platform

> **STATUS: PLANNING** (started 2026-06-03, written before building, per the v0.2.0 "plan the folder when planning starts" note). This is a forward plan and a portfolio decomposition, not an as-built record. Canonical history stays in [`CHANGELOG.md`](../../../../CHANGELOG.md) and [`RELEASE-NOTES.md`](../../../../RELEASE-NOTES.md).

## Where this came from

After v0.2.1 shipped (the docs-site conformance arc), the maintainer delivered a single large batch of feedback: keep a master list of every framework evaluated; give each framework a long-form learning dossier (even the rejected ones, with reasoning); add a `research-framework` engine to produce those; expand the catalog; add two "apply frameworks to my topic" skills (`think-top3`, `think-random-perspectives`); and open the door to branded/IP frameworks with proper attribution. Plus an explicit build order: ship the eval runner + corpus enrichment as a paired "advisor credibility" milestone (v0.3.0), then grow the catalog, and write specs/plans for the rest.

A prior multi-agent analysis of the catalog (recorded in session history) established the priority: **do not add a 35th skill first** - the highest-leverage move is making the `think-framework-advisor`'s central, self-graded-unvalidated routing claim real. This plan executes that, then builds the platform the maintainer's feedback describes.

## The approved architecture (five layers)

```
DATA        frameworks/registry.yaml          single source of truth  [SP3]
              |-- gen -> framework-catalog.md          (master list, generated)
              |-- gen -> recommendable.json + .md       (advisor / top3 / random feed)
              |-- gen -> site Framework Library index
DOCS        frameworks/<slug>/dossier.md       long-form learning, published + in-repo  [SP4]
              (status header generated from the registry; body hand/agent-written)
ENGINE      research-framework subagent + command   researches, writes dossier, proposes entry  [SP5]
SKILLS      think-framework-advisor (reads enriched corpus; role unchanged)
              applicator engine -> think-top3 (rank+apply) + think-random-perspectives (random+apply)  [SP7/8]
              think-belief-update-routine + Fishbone vetting slot  [SP2]
POLICY      IP: document all + TM-annotate; ship as a skill only if evidence + distinctness clear  [SP9]
CREDIBILITY (build first) behavioral eval runner + corpus signal enrichment -> v0.3.0  [SP1]
```

Decisions locked with the maintainer (2026-06-03):
- **Data model:** registry-as-source-of-truth (YAML), with strong CI around it. Generated views, never hand-maintained copies.
- **Docs home:** a published Framework Library on the Astro site, also accessible in-repo as markdown, including honest rejected-with-reasoning entries.
- **IP policy:** open the IP gate, keep the evidence gate. Document every framework (TM-annotated); ship as a skill only if it independently clears evidence + distinctness.
- **Apply-skills:** one shared applicator engine over the recommendable corpus; two thin user-facing skills (`think-top3`, `think-random-perspectives`).
- **research-framework:** a subagent fronted by a thin command (recommended; confirm at its spec).

## Workstream decomposition

| ID | Workstream | Type | Effort | Depends on |
|---|---|---|---|---|
| **SP1** | Advisor credibility: behavioral eval runner + corpus signal enrichment | build now | M | - |
| SP3 | Framework registry (`registry.yaml`) + strong CI | platform | L | - |
| SP9 | IP policy application (re-tag, attribution, why-not -> library index) | policy | S | SP3 |
| SP5 | `research-framework` subagent + command | engine | M | SP3 |
| SP4 | Published Framework Library dossiers (per-framework) | docs | L | SP3, SP5 |
| SP6 | Catalog expansion (discover + evaluate new candidates) | research | M | SP5 |
| SP7 | `think-top3` (rank + apply 3 most relevant) | skill | M | SP1 |
| SP8 | `think-random-perspectives` (random + apply 3) | skill | S | SP7 |
| SP2 | `think-belief-update-routine` + Fishbone-led vetting slot | catalog | M | (registry helps) |

Each sub-project gets its own spec -> implementation plan -> build -> conformance-green -> PR. SP1 is specced in this folder (`spec-sp1-advisor-credibility.md`) and built first.

## Sequence and rationale

1. **SP1 - advisor credibility (v0.3.0).** Build now. Independent of the platform. Turns the dormant `eval/cases.md` into an enforced gate and gives the advisor real negative routing signal. This is the credibility foundation everything else leans on.
2. **SP3 + SP9 - registry + strong CI + IP policy.** The data foundation. SP9 is a small policy pass that rides on the registry's attribution fields. Pair them.
3. **SP5 - research-framework engine.** The thing that populates SP4 and powers SP6.
4. **SP4 + SP6 - dossiers + expansion.** Use the engine to write the library and discover candidates.
5. **SP7 + SP8 - applicator skills.** Built on SP1's enriched corpus.
6. **SP2 - catalog growth.** Slots in after the registry exists (or earlier if catalog growth is wanted sooner; it is not blocked by SP1).

## Strong-CI design for the registry (SP3)

The maintainer's explicit requirement: strong CI must surround the registry so everything stays maintained and enforced. The registry becomes a first-class checked artifact, folded into the existing self-hosting `scripts/check.mjs` gate and `ci.yml`, and made a required status check on `main` (same posture as the existing `check`). Concretely:

1. **Schema validation.** `registry.yaml` validates against a committed JSON Schema: every entry has `slug, name, family, tier, status, evalDate, verdict, reasoning`; enums for `tier` (S/M/P/V/A/C/X), `status` (shipped/next/cand/fold/flag/pm/excl), and `family` (the 11). Branded entries require non-empty `attribution` + `trademark`.
2. **Drift guard.** Every generated view (`framework-catalog.md`, `recommendable.json`/`.md`, the site index) is regenerated and must byte-match what is committed - the existing `--check` pattern, extended to all views.
3. **Referential integrity.** `status: shipped` <-> a `skills/<slug>/` dir exists (both directions: no shipped entry without a skill, no skill without an entry). Every `[fold] -> X` target resolves to a real skill. Every `dossierPath` resolves to an existing file. Every source URL is well-formed.
4. **Completeness.** Every registry entry has a dossier (or an explicit `dossier: pending`); no orphan dossier lacks a registry entry.
5. **IP / attribution lint.** Entries marked branded/IP must carry attribution + a TM string (enforces the open-IP/keep-evidence policy mechanically).
6. **Eval coupling (ties to SP1).** Every `shipped` entry references its `eval/cases.md`, and SP1's static eval validator gates on those existing and being well-formed.

A welcome side effect surfaced during SP1 setup: `check.mjs` resolves the toolkit via a relative `../agent-skills-toolkit`, which breaks when run from a git worktree. SP1 fixes that (worktree-portable resolution) so contributors and these new gates run cleanly from any workspace.

## IP policy application (SP9)

Per the locked policy: trademark/license is no longer an automatic veto. SP9 (a) adds `attribution` + `trademark` fields to affected registry entries, (b) re-tags frameworks whose ONLY exclusion reason was IP (e.g. Six Thinking Hats becomes shippable; Cynefin/Wardley/Blue Ocean become documentable, ship-only-if-evidenced), keeping evidence-tier and overlap verdicts unchanged, and (c) rewrites the live `why-not.md` from a hard exclusion list into an index into the published Framework Library, where each "not shipped" entry links to its full dossier and reasoning. The X/V/C evidence grading and the ~20% overlap ceiling are untouched.

## Open decisions (resolve at the relevant spec review)

- **SP1 - behavioral eval execution.** The behavioral eval is agent-executed by default (judged by the invoking model, no API key, on demand) and is not a blocking gate; the free static layer is the every-PR gate. Optional: an unattended scheduled workflow, the only mode that needs a credential, since headless CI has no ambient model to borrow. Recommendation: agent-executed only for v0.3.0. Detailed in the SP1 spec.
- **SP3 - registry format.** YAML (decided). Confirm whether `framework-catalog.md` becomes fully generated (recommended) or stays hand-authored with a generated appendix.
- **SP4 - dossier authorship loop.** How much of each dossier `research-framework` drafts vs. a human finalizes, and the review gate before publish.
- **SP5 - subagent vs skill** (recommended subagent; confirm at SP5 spec).
