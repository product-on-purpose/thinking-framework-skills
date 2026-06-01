# Authoring a skill - the repeatable loop

This is the lean, self-executing process for adding a skill to `thinking-framework-skills`. It is reverse-engineered from the first shipped skill (`tfs-premortem`), which is the reference example. Follow it per skill; do not re-design it.

The discipline: **ship one complete skill at a time, validated, before starting the next.** WIP = 1. The [BACKLOG](release-plans/plan_v0.1.0/BACKLOG.md) always names the single "Now" skill.

---

## Conventions (the contract every skill meets)

**Naming**
- Installable skill `name` = directory name = `tfs-<method>` (the `tfs-` prefix avoids cross-plugin collisions and is declared as `prefix` in `library.json`).
- Canonical `metadata.id` = `thinking-framework-skills.<method>` (no `tfs-` in the id; the namespace already conveys the library).
- `<method>` is the bare, descriptive, kebab-case method name (mechanism over trademark, e.g. `premortem`, `problem-restatement`, `parallel-perspectives-review`).

**The four commitments (what makes a skill best-in-class here)**
1. **Mechanism over ritual** - implement the durable cognitive move, named descriptively, not a brand.
2. **Honest evidence grading** - every skill carries an `evidence-tier` and an `evidence/dossier.md` that states what the research does and does NOT support, and flags evidence transferred from human studies (not AI-validated). No laundered statistics.
3. **Artifact, not prose** - every skill emits a named, structured, reusable artifact (risk register, option matrix, assumption ledger, perspective review).
4. **Explicit "When NOT to Use"** - every skill states where it misleads, to guard against cargo-cult execution.

**Evidence tiers:** S strong, M moderate, P practitioner, V vendor, A anecdotal, C conceptually plausible, X poor/contradictory. Grade honestly; "P, useful anyway, here is when not to use it" is more trustworthy than a dressed-up "S".

**Skill anatomy** (mirror `skills/tfs-premortem/`):
```
skills/tfs-<method>/
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
3. **Scaffold** from the template: copy `templates/skill/` to `skills/tfs-<method>/`.
4. **Write `evidence/dossier.md` FIRST** (the source of truth). Everything else derives from it.
5. **Write `SKILL.md`** from the dossier: `tfs-<method>` name (must match the directory), a description that leads with an action verb + a "Use when ..." trigger clause (under 1024 chars, no first person - it is the activation trigger), the four commitments, a bounded procedure, and a quality checklist drawn from the dossier's failure modes.
6. **Write `references/TEMPLATE.md` and `references/EXAMPLE.md`** (the artifact structure, and a worked example on the Northwind scenario).
7. **Fill `skill.meta.yml`** (id, family, relationships, failure modes) from the dossier.
8. **Register** the skill: add the component to `library.json` (`name: tfs-<method>`, `path: skills/tfs-<method>/SKILL.md`).
9. **Validate to zero errors at Bronze** (the gate):
   ```
   node "E:/Projects/product-on-purpose/agent-skills-toolkit/scripts/evaluate.mjs" "E:/Projects/product-on-purpose/thinking-framework-skills"
   ```
   Require `Tier: universal`, `0 error(s), 0 warning(s)`. Fix anything flagged. (Silver/Gold items in the burndown are deferred.)
10. **Commit** on a branch, open a PR, merge. Then update the BACKLOG (mark the skill done, move the "Now" pointer to the next skill).

---

## Guardrails (do not reproduce the stall)

- A working session is not "done" unless it changed a file under `skills/` or committed product. Design-only sessions end by naming the single next build action, not a new decision.
- Reject any proposal to add a meta-skill pipeline, schema enforcement, catalog generators, CI, or more governance until a concrete pain from a shipped skill demands it. The template + this loop + the evaluator are the whole system for now. (Realized exception, 2026-06-01: `tfs-framework-advisor` is a router whose one unforgivable failure is naming a skill that does not exist, so it ships with `scripts/gen-recommendable.mjs` - a tiny, single-purpose generator that derives the valid-name set from `library.json` + frontmatter. That is the "concrete pain demanded it" bar being met, not a general license to add generators.)
- Open questions (license confirmation, MVP weighting, the Silver climb, going public) are parallel/later, never gates on the next skill.

---

## Windows note

If you write any helper script, pass explicit UTF-8 encoding. The default cp1252 will silently corrupt content. Prefer no scripts; the loop above needs none beyond the evaluator.
