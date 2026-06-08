# Authoring a skill - the repeatable loop

This is the lean, self-executing process for adding a skill to `thinking-framework-skills`. It is reverse-engineered from the first shipped skill (`think-premortem`), which is the reference example. Follow it per skill; do not re-design it.

The discipline: **ship one complete skill at a time, validated, before starting the next.** WIP = 1. The [BACKLOG](release-plans/plan_v0.1.0/BACKLOG.md) always names the single "Now" skill.

---

## Conventions (the contract every skill meets)

**Naming**
- Installable skill `name` = directory name = `think-<method>` (the `think-` prefix avoids cross-plugin collisions and is declared as `prefix` in `library.json`).
- Canonical `metadata.id` = `thinking-framework-skills.<method>` (no `think-` in the id; the namespace already conveys the library).
- `<method>` is the bare, descriptive, kebab-case method name (mechanism over trademark, e.g. `premortem`, `problem-restatement`, `parallel-perspectives-review`).

**The four commitments (what makes a skill best-in-class here)**
1. **Mechanism over ritual** - implement the durable cognitive move, named descriptively, not a brand.
2. **Honest evidence grading** - every skill carries an `evidence-tier` and an `evidence/dossier.md` that states what the research does and does NOT support, and flags evidence transferred from human studies (not AI-validated). No laundered statistics.
3. **Artifact, not prose** - every skill emits a named, structured, reusable artifact (risk register, option matrix, assumption ledger, perspective review).
4. **Explicit "When NOT to Use"** - every skill states where it misleads, to guard against cargo-cult execution.

**Evidence tiers:** S strong, M moderate, P practitioner, V vendor, A anecdotal, C conceptually plausible, X poor/contradictory. Grade honestly; "P, useful anyway, here is when not to use it" is more trustworthy than a dressed-up "S".

**Skill anatomy** (mirror `skills/think-premortem/`):
```
skills/think-<method>/
  SKILL.md                 # procedure + frontmatter; what the agent reads
  references/TEMPLATE.md   # the artifact structure
  references/EXAMPLE.md    # a worked example (use the shared Northwind scenario)
  evidence/dossier.md      # graded evidence; the single source of truth
  skill.meta.yml           # rich sidecar (draft)
```

**Shared example scenario (for cross-skill coherence):** use **Northwind**, a B2B SaaS weighing a self-serve free-tier launch, as the recurring scenario across `EXAMPLE.md` files where it fits, so the library reads as one product (a lightweight version of pm-skills' "threads").

---

## The per-skill loop

1. **Pick the "Now" skill** from the [BACKLOG](release-plans/plan_v0.1.0/BACKLOG.md). One at a time.
2. **Gather evidence** for that method from the discovery corpus (committed under `docs/internal/research/` once relocated, or on the `backup/discovery-corpus-2026-05-31` branch): lineage, evidence tier, what the evidence does/does-not show, failure modes, citations. Be honest; flag transferred evidence.
3. **Scaffold** from the template: copy `templates/skill/` to `skills/think-<method>/`.
4. **Write `evidence/dossier.md` FIRST** (the source of truth). Everything else derives from it.
5. **Write `SKILL.md`** from the dossier: `think-<method>` name (must match the directory), a description that leads with an action verb + a "Use when ..." trigger clause (under 1024 chars, no first person - it is the activation trigger), the four commitments, a bounded procedure, and a quality checklist drawn from the dossier's failure modes.
6. **Write `references/TEMPLATE.md` and `references/EXAMPLE.md`** (the artifact structure, and a worked example on the Northwind scenario).
7. **Fill `skill.meta.yml`** (id, family, relationships, failure modes) from the dossier.
8. **Register** the skill in both sources of truth. Add the component to `library.json` (`name: think-<method>`, `path: skills/think-<method>/SKILL.md`), and add or update its entry in `frameworks/registry.mjs` (`status: 'shipped'`, the governing `tier`, `family`, `verdict`, `reasoning`, and - for a branded method - `attribution` + `trademark`). Then regenerate the views: `npm run gen:registry` (catalog + why-not) and `npm run gen:recommendable` (the advisor corpus). CI enforces shipped-entry <-> skill-dir parity both ways and tier consistency, so a skill without a matching entry (or a tier that disagrees with the SKILL.md `evidence-tier`) fails the gate.
9. **Validate to zero errors at the conformance gate:**
   ```
   node scripts/check.mjs        # advanced tier, 0 errors / 0 warnings (structural + eval-cases + registry + engine drift)
   npm test                      # the node --test suites
   ```
   The gate resolves the `agent-skills-toolkit` at the CI-pinned ref (clone it next to this repo, or as a `.agent-skills-toolkit` worktree). Require `advanced`, `0 error(s), 0 warning(s)` across every layer. For a site-affecting change also run `npm --prefix site run build` and the link/route guards (`scripts/check-rendered-links.mjs`, `scripts/check-route-parity.mjs`). Fix anything flagged.
10. **Commit** on a branch, open a PR, merge. Then record the method as `shipped` in the registry status (the catalog/roadmap is the generated view of it).

> **Vetting a candidate first.** Rather than research a method by hand, run the `think-research-framework` engine (the `/think-research-framework` command, or its subagent): it grades the evidence conservatively, proves distinctness against the catalog, drafts the dossier to `frameworks/_proposed/<slug>/`, and prints a schema-valid proposed registry entry. It never writes the registry - you admit the entry, then build the skill with the loop above. Note the **frameworks vs tools** split: a graded thinking method gets a registry entry and ships under `/frameworks/`; a meta-skill (router/applicator like the advisor, top3, random-frameworks, or the engine itself) gets NO registry entry, is added to the `META_SKILLS` set in `check-registry.mjs` + `gen-recommendable.mjs`, and renders under `/tools/`.

---

## The files: source of truth and generated artifacts

`library.json` (repo root) is the **hand-authored source of truth** for the library: the
plugin identity (name, version, description, license, keywords), the build/distribution
settings (the `standard` version, `tier`, the `think-` install `prefix`, the `agent-targets`),
and the roster - `components.skills`, each entry wiring a `name` to its `SKILL.md` `path`.
Edit it directly when you add, rename, retire, or re-grade a skill (the per-skill loop above,
step 8). A stale or wrong entry here silently drops a skill from the docs site and the
generated manifests even though its files still exist on disk, so keep it in lockstep with
`skills/`.

There is a **second hand-authored source of truth**: `frameworks/registry.mjs`, the catalog of
every evaluated method (shipped or not) with its evidence tier, status, verdict, and reasoning
(see [architecture](../architecture.md)). Edit it when you add, re-grade, fold, or retire a
method; CI cross-checks it against the skills (shipped entry <-> skill dir, tier consistency).

Everything below is **generated from `library.json` + `frameworks/registry.mjs`** (plus the
skills' own files). Do not hand-edit any of it: edit the source and regenerate, or the next
generation overwrites the change and drifts from the source of truth.

| Generated artifact | Produced by | What it is |
|---|---|---|
| `manifest.generated.json` | agent-skills-toolkit `gen-manifest` | The resolved, denormalized roster (each skill's name, path, full description) a tool can read in one shot. It omits a `license` field; the root `LICENSE` (Apache-2.0) is authoritative. |
| `.claude-plugin/plugin.json` | agent-skills-toolkit `gen-manifest` | The Claude Code plugin manifest (identity only; skills are auto-discovered). The marketplace install entry point. |
| `.codex-plugin/plugin.json` | agent-skills-toolkit `gen-manifest` | The Codex CLI manifest; adds `skills: "./skills/"` and an `interface` block. |
| `skills/think-framework-advisor/references/recommendable.{json,md}` | `scripts/gen-recommendable.mjs` | The advisor's name-safety set + enrichment (anti-triggers, when-not, overlaps). CI runs `--check`, so a forgotten regenerate fails the build instead of shipping an advisor that names a nonexistent skill. Meta-skills (tools) are excluded. |
| `docs/internal/research/framework-catalog.md`, `site/.../about/why-not.md` | `scripts/gen-registry.mjs` | Generated *views* of `frameworks/registry.mjs`: the catalog family tables (between markers; narrative preserved) and the public why-not index. `--check` byte-compares. |
| `INDEX.md` | agent-skills-toolkit `gen-index` | The repo-root index of components (regenerated at release time with the manifests). |
| `skills/think-random-frameworks/references/engine.md` | `scripts/gen-engine.mjs` | The byte-identical copy of the shared applicator engine authored in `think-top3`. `--check` is a layer of the gate. |
| `site/src/content/docs/{frameworks,tools,families,recipes,evidence,library,explore}/` | `scripts/gen-site.mjs` | The Starlight docs pages - a generated *view* of the skills + registry (frameworks, the `/tools/` meta-skills, the Framework Library, lenses, map, chooser). Gitignored and rebuilt each build. |

The generator scripts (`scripts/gen-site.mjs`, `scripts/gen-recommendable.mjs`,
`scripts/gen-registry.mjs`, `scripts/gen-engine.mjs`) document their own what / why / usage in
their file headers; read those rather than a per-file sidecar.

---

## Guardrails (do not reproduce the stall)

- A working session is not "done" unless it changed a file under `skills/` or committed product. Design-only sessions end by naming the single next build action, not a new decision.
- Reject any proposal to add a meta-skill pipeline, schema enforcement, catalog generators, CI, or more governance until a concrete pain from a shipped skill demands it. The template + this loop + the evaluator are the whole system for now. (Realized exception, 2026-06-01: `think-framework-advisor` is a router whose one unforgivable failure is naming a skill that does not exist, so it ships with `scripts/gen-recommendable.mjs` - a tiny, single-purpose generator that derives the valid-name set from `library.json` + frontmatter. That is the "concrete pain demanded it" bar being met, not a general license to add generators.)
- Open questions (license confirmation, MVP weighting, the Silver climb, going public) are parallel/later, never gates on the next skill.

---

## Windows note

If you write any helper script, pass explicit UTF-8 encoding. The default cp1252 will silently corrupt content. Prefer no scripts; the loop above needs none beyond the evaluator.
