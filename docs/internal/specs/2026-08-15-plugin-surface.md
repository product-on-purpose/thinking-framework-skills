# SPEC-09: the plugin surface (runnable recipes, flagship commands, reasoning subagents)

| | |
|---|---|
| **Status** | Proposed (2026-08-15) |
| **Roadmap items** | C3-1 (runnable recipes), C3-2 (flagship commands), C3-3 (reasoning subagents) |
| **Issues** | #107 (C3-1). C3-2 and C3-3 unfiled pending this spec |
| **Audit findings** | N-1 (recipes not invokable), N-3 (no end-user runtime surface), N-5 (G3 vacuous) |
| **External driver** | agent-skills-toolkit ADR 0047, ratified 2026-08-14. The `S3` workflow mirror warns at Standard 0.14 and **gates at 0.15** |
| **Effort** | Phase 1 M, phase 2 M, phase 3 M |

## Problem

The library ships 67 skills and 9 recipes behind exactly **1 slash command and 1 subagent**, both of them the contributor-facing `think-research-framework`. There is no authored entry point for the jobs users actually arrive with, and the nine recipes the README calls "shipped as workflow components" are declared nowhere and runnable nowhere: a user who wants the marquee chain reads a markdown file and runs four skills by hand, carrying the compressed artifact between them themselves.

This is the largest gap between what the repo is (a Gold-tier skill library) and what it claims to be (a plugin).

## The distinction this spec exists to make

**A declared workflow is not a runnable workflow, and conflating them would deliver conformance with no user-visible capability.**

ADR 0047 is explicit that `_workflows/` is a HOUSE construct: *"No runtime scans it. This is a Standard construct that only this toolkit reads."* Declaring the nine recipes in `library.json` therefore satisfies `S3` and closes the 0.15 cliff, and changes nothing whatsoever for a user. The runnable surface must be a **command**, because commands are what the runtimes actually expose.

So phase 1 has two independent halves that are easy to mistake for one:

| Half | Delivers | Driven by |
|---|---|---|
| **1a. Declaration** | `S3` mirror satisfied, 0.15 cliff closed, README claim made true | Conformance |
| **1b. Invocation** | `/think-stress-test-decision` actually runs the chain | Product |

Ship both. Ship 1a first because it is small and time-boxed by an external deadline; ship 1b because it is the reason the item is on the roadmap at all.

## The settled contract (read the code, not the ADR)

Verified 2026-08-15 against the shipped toolkit, not the ADR's proposal text.

- **Entry shape.** `library.json` `components.workflows[]`, each entry requiring at minimum a string `name`. Match the sibling component shape already used for `skills` / `subagents` / `commands`: `{ name, path, version, tier, status }` with `tier: "convergent"`.
- **`name` is the file basename.** `_workflows/<name>.md` -> `name`. Frontmatter is deliberately not consulted for identity; workflows in the wild carry `title`, and the basename is what the Standard's path form and a command's `maps-to` both refer to.
- **The mirror is bidirectional.** A declared workflow with no file is a finding; a file with no declaration is a finding.
- **Exclusions.** `README.md` and `_`-prefixed control files under `_workflows/` are not workflows.
- **Migration window.** Findings carry `{ capAt: "warn", until: "0.15" }`. Under this repo's Standard 0.8 pin they do not even warn yet; they gate when the repo re-pins at or past 0.15.
- **The chain contract does not apply.** `agents/_chain-permitted.yaml` is intentionally `{}`, and its own comment records why: recipes compose skills through their `steps:` lists, validated by `S5` (`workflow-skills`), not through frontmatter `chain:`. **Declaring workflows creates no chain-contract obligation.** Do not add entries there.

## Phase 1a: declare the workflows

1. Add `components.workflows` to `library.json` with one entry per `_workflows/*.md`, excluding `README.md` and `_`-prefixed files. Match the sibling shape: `{ name, path, version, tier: "convergent", status }`.
2. Add a repo-local drift assertion so this cannot rot between re-pins: a `_workflows/*.md` on disk that is undeclared, or a declared workflow with no file, fails `check-registry.mjs`. **Rationale for duplicating a toolkit check:** the toolkit's mirror is capped at `warn` until the repo pins Standard 0.15, which may be months away; the repo-local one gates today. Same argument that justifies `check-counts` guarding surfaces the toolkit does not.

> **Corrected 2026-08-15, mid-implementation.** An earlier draft of this spec required regenerating the native manifests so they "reflect the new component type". **That is not achievable and never was.** Verified by reading both generators: neither the pinned 0.8 `gen-manifest.mjs` nor the current v1.13.0 one has any concept of workflows, so `manifest.generated.json` and the two native `plugin.json` files carry `skills` and `commands` only. ADR 0047 added the `S3` mirror as a *check* that reads `library.json` directly; it did not add manifest emission.
>
> Measured proof that `library.json` alone is sufficient, run against the current toolkit: **undeclared, 9 `S3` findings (137 warnings total); declared, 0 (128 total).** Regenerating the manifests produced an empty diff. An implementer following the old criterion would have chased a regeneration that does nothing.

### Acceptance criteria (1a)

- [ ] `library.json` declares exactly the nine `_workflows/` recipes, no more, no fewer, with the `README.md` and `_`-prefix exclusions honored.
- [ ] The 9 `S3` workflow findings the current toolkit reports are gone, measured before and after. (They are capped at `warn` under the 0.8 pin, so this is pre-emptive: it closes the cliff before the repo re-pins rather than after.)
- [ ] A repo-local assertion fails, **today**, in both directions: a declared workflow with no file, and a file with no declaration. **Demonstrated red in both directions before the item is called done.**
- [ ] `node scripts/check.mjs` green at the pinned ref; `npm test` green.
- [ ] **No** native-manifest change is expected. If a regeneration produces a diff, something else drifted and that is the finding.
- [ ] README wording reconciled: today's "shipped as workflow components" becomes true of 1a but says nothing about runnability, so it must not imply the latter until 1b lands.

## Phase 1b: make the recipes runnable

**Design: one generated command per recipe.** A command is the only surface the runtimes expose, and generating rather than authoring keeps nine files from drifting against their `_workflows/` source.

1. `scripts/gen-recipe-commands.mjs`, following the established generator contract (`--check` mode, byte-exact drift comparison, wired into `check.mjs`, tested).
2. Source of truth is `_workflows/<name>.md` frontmatter: `name`, `description`, `steps[]`.
3. Each generated command instructs the agent to run the chain **with its documented handoff compression** - the "carry forward only X" line is the recipe's actual value and must survive into the command, not be flattened into "run these four skills".
4. Commands are `maps-to` their workflow, which is exactly what `S7` (`command-contract`) resolves now that `ctx.workflows` is built (ADR 0047 part 1).

### Open decision for the implementer

**Naming.** `/think-stress-test-decision` collides conceptually with the skill namespace, where `think-` prefixes a *framework*. Options: keep `think-` for consistency with the prefix declared in `library.json`; or use a distinct prefix (`recipe-`) so a user can tell a chain from a single method at the point of invocation. **Recommendation: keep `think-`**, because the prefix exists to avoid cross-plugin collisions rather than to encode component type, and a second prefix would need its own justification in `library.json`. Record whichever is chosen.

### Acceptance criteria (1b)

- [ ] Nine generated commands, one per recipe, regenerating byte-identically; a hand-edit reds CI.
- [ ] Each carries its recipe's handoff compression, verified by reading the generated output against the source recipe, not assumed from the generator's code.
- [ ] Invoking the marquee recipe runs the chain end to end and emits the expected artifacts.
- [ ] **Footprint delta recorded** against the 2026-08-14 baseline of 33,233 description chars across 67 skills (guardrail 6). Report the number whether or not it is small.
- [ ] Eval cases added for each new invocable surface (roadmap C2-6).

### Hard stop

Guardrail 6 requires a new surface to report a footprint delta **and** a routing re-run. The footprint delta is a character count and is in scope. **The routing re-run is a live behavioral eval producing public trust-page numbers and is maintainer-gated.** Phase 1 may be taken to built, declared, gate-green and footprint-recorded, and no further. Do not claim the surface is measured without the re-run.

## Phase 2 (C3-2): flagship commands

6 to 10 curated commands with argument hints and a worked example each, for the jobs users arrive with rather than the framework names they would have to already know.

- **Selection input:** the trigger-eval corpus is the honest signal for which jobs are most requested; do not pick from intuition. Candidates: the advisor (the declared front door), premortem, decision-option-review, issue-tree, argument-mapping.
- **Relationship to the underlying skill must be documented per command:** a command is a front door to a skill, never a fork of its procedure. Two copies of a procedure is exactly the drift class this repo builds gates against.
- Same footprint and eval obligations as 1b.

## Phase 3 (C3-3): reasoning subagents

2 to 3 subagents that preload specific skills and return only the artifact.

- **Selection must be data-driven.** Every sidecar already carries `execution.subagent_suitable` and `execution.mode`, authored per skill and currently driving nothing. Inventory those fields first; if they turn out to be stale, fixing them is part of this phase rather than a reason to ignore them.
- **Apply the C4-6 tool-constraint pattern from the start.** The one existing subagent grants six tools with instruction-level prohibitions only, and is being retrofitted with hard constraints. New subagents should not repeat that.

## Out of scope

Hooks (roadmap C3-4, a measured experiment with a pre-registered threshold, not a feature). MCP (C3-5, a recorded demand-gated deferral). Catalog expansion of any kind (guardrail 1).

## Second-order effect worth recording

Declaring real chains is what makes Gold check **G3** (chain/hook eval coverage) non-vacuous, and `docs/conformance.md` currently states honestly that G3 "passes because there is nothing to fail". When phase 1 lands, that page must be updated: G3 stops being N/A and has to be satisfied for real. That is a documentation obligation of this spec, not an afterthought.
