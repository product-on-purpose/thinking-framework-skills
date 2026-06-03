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
8. **Register** the skill: add the component to `library.json` (`name: think-<method>`, `path: skills/think-<method>/SKILL.md`).
9. **Validate to zero errors at Bronze** (the gate):
   ```
   node "E:/Projects/product-on-purpose/agent-skills-toolkit/scripts/evaluate.mjs" "E:/Projects/product-on-purpose/thinking-framework-skills"
   ```
   Require `Tier: universal`, `0 error(s), 0 warning(s)`. Fix anything flagged. (Silver/Gold items in the burndown are deferred.)
10. **Commit** on a branch, open a PR, merge. Then update the BACKLOG (mark the skill done, move the "Now" pointer to the next skill).

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

Everything below is **generated from `library.json`** (plus the skills' own files). Do not
hand-edit any of it: edit the source and regenerate, or the next generation overwrites the
change and drifts from the source of truth.

| Generated artifact | Produced by | What it is |
|---|---|---|
| `manifest.generated.json` | agent-skills-toolkit `gen-manifest` | The resolved, denormalized roster (each skill's name, path, full description) a tool can read in one shot. It omits a `license` field; the root `LICENSE` (Apache-2.0) is authoritative. |
| `.claude-plugin/plugin.json` | agent-skills-toolkit `gen-manifest` | The Claude Code plugin manifest (identity only; skills are auto-discovered). The marketplace install entry point. |
| `.codex-plugin/plugin.json` | agent-skills-toolkit `gen-manifest` | The Codex CLI manifest; adds `skills: "./skills/"` and an `interface` block. |
| `skills/think-framework-advisor/references/recommendable.{json,md}` | `scripts/gen-recommendable.mjs` | The advisor's name-safety set - the closed set of names it may recommend. CI runs `--check`, so a forgotten regenerate fails the build instead of shipping an advisor that names a nonexistent skill. |
| `site/src/content/docs/{frameworks,families,recipes,evidence,explore}/` | `scripts/gen-site.mjs` | The Starlight docs pages - a generated *view* of the skills. Gitignored and rebuilt each build. |

The two generator scripts (`scripts/gen-site.mjs`, `scripts/gen-recommendable.mjs`) document
their own what / why / usage in their file headers; read those rather than a per-file sidecar.

---

## Guardrails (do not reproduce the stall)

- A working session is not "done" unless it changed a file under `skills/` or committed product. Design-only sessions end by naming the single next build action, not a new decision.
- Reject any proposal to add a meta-skill pipeline, schema enforcement, catalog generators, CI, or more governance until a concrete pain from a shipped skill demands it. The template + this loop + the evaluator are the whole system for now. (Realized exception, 2026-06-01: `think-framework-advisor` is a router whose one unforgivable failure is naming a skill that does not exist, so it ships with `scripts/gen-recommendable.mjs` - a tiny, single-purpose generator that derives the valid-name set from `library.json` + frontmatter. That is the "concrete pain demanded it" bar being met, not a general license to add generators.)
- Open questions (license confirmation, MVP weighting, the Silver climb, going public) are parallel/later, never gates on the next skill.

---

## Windows note

If you write any helper script, pass explicit UTF-8 encoding. The default cp1252 will silently corrupt content. Prefer no scripts; the loop above needs none beyond the evaluator.
