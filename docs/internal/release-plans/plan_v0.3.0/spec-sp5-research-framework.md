# SP5 spec: the `research-framework` engine (subagent + command) + its prompts

> **STATUS: SPEC, pending maintainer review.** Part of [`PLAN.md`](./PLAN.md). The engine that
> populates [`spec-sp4-framework-library.md`](./spec-sp4-framework-library.md) (dossiers) and proposes
> entries for [`spec-sp3-registry.md`](./spec-sp3-registry.md) (the registry). Codifies the 2026-06-03
> multi-agent vetting workflow (evidence + overlap + judge) into a reusable, repeatable engine.

## Why

The 2026-06-03 vetting run worked but was a one-off ad-hoc workflow. The maintainer wants documenting
and evaluating frameworks to be a **repeatable engine**, not a bespoke fan-out each time. `research-
framework` is that engine: given a framework name (or a discovery brief), it researches the method,
grades the evidence honestly, assesses overlap against the shipped catalog, drafts the SP4 dossier, and
proposes an SP3 registry entry - leaving the ship/no-ship call to the human (or the vetting judge for
borderline cases). It is the same evidence + overlap discipline the vetting used, made a tool.

## Form: subagent fronted by a thin command (recommended)

A **subagent** (`agents/research-framework.md`) holds the role, the bar, and the honesty discipline in
its system prompt; a **thin command** (`commands/research-framework.md`) is the user-facing entry that
gathers the input (a framework name, or "discover N candidates in family X") and dispatches the subagent.
This matches the family pattern (heavy logic in the agent, thin command) and keeps the prompt versioned
as a file. The subagent has read access to the repo (INDEX.md, the catalog/registry, shipped skills),
web search, and write access only to `frameworks/<slug>/` (the dossier) and a proposed-entry block it
prints for human paste into `registry.yaml` (it does NOT silently mutate the registry - a human or the
registry CI is the gate).

## What it produces (per framework)

1. **A dossier** `frameworks/<slug>/dossier.md` in the SP4 format (body sections filled; the status
   block left for the registry to generate).
2. **A proposed registry entry** (YAML) with `slug, name, family, tier, status, verdict, evalDate,
   reasoning, foldInto?, sources, attribution?, trademark?, branded?` - validated against
   `registry.schema.json` before it is emitted.
3. **A one-screen verdict summary** (the evidence grade, the overlap call, the recommended status).

For **discovery mode** ("find candidates in family X"), it returns a ranked shortlist of method names
with a one-line distinctness hypothesis each, for the human to greenlight before full dossiers are run.

## The prompts

### System prompt (`agents/research-framework.md` body)

```
You are research-framework, the framework-documentation engine for the thinking-framework-skills
library. The library's identity is HONEST EVIDENCE GRADING, not breadth. Your job is to research a
thinking method, grade its evidence truthfully, assess whether it adds a distinct move the library does
not already have, draft its long-form learning dossier, and propose a registry entry. You document
everything; you do NOT decide what ships - you give the human an honest, sourced basis to decide.

Non-negotiables:
- HONEST GRADE. Use the seven-tier model: S strong research, M moderate, P practitioner, V vendor, A
  anecdotal, C conceptually-plausible-but-undertested, X poor/contradictory. Most practitioner methods
  are P. Reserve S/M for genuine research backing on the ACTUAL move (not a related one). If the
  evidence is borrowed from an adjacent method or from human studies not validated on AI agents, say so
  explicitly and set transferred_evidence true. Laundering a P into an M by citing a cousin's robustness
  is the single failure this library exists to prevent. A truthful "P, useful anyway, here is when not
  to use it" beats an inflated "S".
- REAL SOURCES. Cite findings you can name (authors, year, what was measured). Do not invent citations
  or effect sizes. If a widely-quoted statistic has no traceable primary source, say so and refuse it.
- OVERLAP HONESTY. Read INDEX.md (the shipped skills) and framework-catalog.md / registry.yaml. A method
  earns "distinct" only if it adds a durable cognitive move not already covered (the ~20% overlap
  ceiling). If it is a mode of a shipped skill, recommend FOLD (name the target). If it has no separable
  mechanism (a chain of existing moves), recommend RECIPE. If it belongs in the sibling pm-skills library
  by domain, recommend out-of-scope. Default to fold/reject; near-twins dilute the catalog.
- IP / ATTRIBUTION. The IP gate is open: branded/trademarked frameworks are DOCUMENTED (with proper TM,
  owner, attribution) and ship as a skill only if evidence + distinctness independently clear. For any
  branded method, fill attribution + trademark and set branded true.
- ARTIFACT-FIRST for shippable candidates. If you recommend Build, name the concrete structured artifact
  the skill would emit (a register, matrix, ledger, map - not "think harder") and the explicit
  "when NOT to use" hard-wall vs the nearest shipped skill.

You write the dossier body (What it is / When it helps-misleads / What the evidence says / Why it is or
is not a skill here / Lineage and who to read) and emit a schema-valid proposed registry entry plus a
one-screen verdict. You never edit registry.yaml directly and never claim a grade the sources do not earn.
```

### Task prompt (dispatched by the command, per framework)

```
Research the thinking method: "<name>" (<one-line gloss if known>).
Repo root: <REPO>. Read INDEX.md (shipped skills), docs/internal/research/framework-catalog.md (and
frameworks/registry.yaml once it exists), docs/contributing.md (the selection bar). Use web search for
the actual literature; do not invent citations.

Produce, in order:
1. EVIDENCE: the real mechanism (not the brand); the honest tier (S..X) with what the research does and
   does NOT support; transferred_evidence flag; 3-6 named sources with what each shows and its grade.
2. OVERLAP: the closest shipped skills (high/medium/low) and why; distinct / fold(->target) / recipe /
   reject / out-of-scope; the hard-wall vs the nearest skill, or "near-twin".
3. VERDICT: Build / Fold / Recipe / Reject, with the decisive reason, the proposed evidence tier, and
   (if Build) the named artifact + the when-NOT-to-use wall. Honor the catalog's prior tag unless you
   have a concrete reason to overturn it (state it if you do).
4. DOSSIER: write frameworks/<slug>/dossier.md in the SP4 format (body only; leave the status block for
   the registry generator).
5. REGISTRY ENTRY: emit a schema-valid YAML entry for registry.yaml (do not write the file; print it).
Be adversarial about Build: the rejections are the product.
```

### Discovery-mode prompt (optional, for catalog expansion / SP6)

```
Propose <N> candidate thinking methods in family "<family>" that the library does NOT already cover
(check INDEX.md + the registry). For each: the method name, a one-line mechanism, a distinctness
hypothesis (what move it adds that no shipped skill has), and a rough evidence-tier guess. Rank by
(distinctness x evidence strength). Do not write dossiers yet - this is a shortlist for the human to
greenlight before full research runs.
```

## Components

- **C1** `agents/research-framework.md` (the subagent: system prompt above + frontmatter: name,
  description, tools = read/grep/glob/websearch + write scoped to `frameworks/`).
- **C2** `commands/research-framework.md` (the thin command: takes a framework name or a discovery brief;
  dispatches the subagent with the task/discovery prompt; both Claude + Codex per the agent-targets).
- **C3** A `--check`-friendly proposed-entry validator: the emitted YAML entry is validated against
  `registry.schema.json` (SP3) before it is shown, so a malformed proposal cannot reach the registry.
- **C4** Wiring into the Standard's manifest pipeline (a new subagent + command are Silver/Gold
  components; `gen-manifest` + the per-target presence checks must stay 0/0).

## Acceptance criteria

- **AC1** `research-framework "<name>"` produces a schema-valid proposed registry entry + a
  `frameworks/<slug>/dossier.md` body in the SP4 format + a one-screen verdict, with named sources.
- **AC2** On a method already covered (e.g. steelmanning), it returns Fold -> the correct shipped skill,
  matching the 2026-06-03 verdict (a regression check that the engine reproduces the vetting).
- **AC3** On a branded method (e.g. Six Thinking Hats), it fills attribution + trademark + branded.
- **AC4** It refuses an untraceable statistic rather than laundering a grade (proven on a known case,
  e.g. the "Fermi 99-vs-3 / 42%" effect the catalog already flags as untraceable).
- **AC5** Adding the subagent + command keeps the conformance gate green (advanced, 0/0); per-target
  manifests regenerate.

## Out of scope

The registry + its CI (SP3); the dossier rendering on the site (SP4); the IP re-tag pass (SP9); the
applicator skills that USE the corpus (SP7/SP8). SP5 is the producer engine + its prompts only.

## Open decisions for review

1. **Subagent vs in-skill** (recommendation: subagent + thin command, above).
2. **Auto-write the dossier vs print-for-review.** Recommendation: write the dossier file (cheap to
   revert, under `frameworks/`), but print-only the registry entry (the registry is the gated source of
   truth; a human or CI admits it).
3. **Where discovery mode runs** (the command, or a separate `discover-frameworks` thin command).
