# SP4 spec: the published Framework Library (per-framework dossiers, resilient docs + Astro)

> **STATUS: SPEC, pending maintainer review.** Part of [`PLAN.md`](./PLAN.md). Depends on
> [`spec-sp3-registry.md`](./spec-sp3-registry.md) (the registry that supplies each dossier's status
> header) and [`spec-sp5-research-framework.md`](./spec-sp5-research-framework.md) (the engine that
> drafts dossiers). This is the "resilient docs and astro dossiers for all frameworks" deliverable.

## Why

The library's identity is **honest grading, not breadth** - but the maintainer wants the *learning*
value of documenting every framework that was evaluated, including the rejected ones with their
reasoning, without diluting the shippable skill catalog (the open-IP / keep-evidence policy, SP9).
Today that knowledge is trapped: a one-line row in `framework-catalog.md` and, for exclusions, a
paragraph in `why-not.md`. There is no place a reader can go to learn what Cynefin *is*, why it was
not shipped as a skill, what the evidence actually says, and who to read next.

SP4 builds that place: a **long-form dossier per framework**, published on the Astro site as a browsable
**Framework Library** and committed in-repo as markdown, with a **status header generated from the
registry** so the verdict can never drift from the dossier. "Resilient" = the dossier set is guarded by
the same registry CI (every entry has a dossier or `pending`; no orphan dossiers; the status badge is
generated, not typed).

## Design overview

```
frameworks/<slug>/dossier.md          <- long-form, hand/agent-authored body + a generated status block
  (frameworks/ is the registry + dossier home; skills/ stays the shippable-skill home)
gen-site.mjs (extended)               -> site/src/content/docs/library/<slug>/   (Astro Framework Library)
                                      -> site/src/content/docs/library/index      (the browsable index)
registry.yaml (SP3)                   -> the status block injected at the top of each rendered dossier
```

A **shipped** framework has BOTH a `skills/think-<slug>/` (the agent-executable skill, source of truth
for the SKILL.md) AND a `frameworks/<slug>/dossier.md` (the human learning doc). They are different
audiences: `SKILL.md` is the terse activation contract an agent reads; the dossier is the essay a person
reads. The shipped skill's own `evidence/dossier.md` is the *evidence* record; the Framework Library
dossier is the *learning* record (lineage, when-to-use, who-to-read, and for shipped skills a pointer to
the skill). Open decision below: whether to unify a shipped skill's two dossiers or keep them distinct.

### The dossier format (`frameworks/<slug>/dossier.md`)

A generated status block (do-not-edit, from the registry) + a hand/agent-authored body:

```markdown
---
title: <name>
slug: <slug>
generated_status: true   # the block below is generated from registry.yaml; edit the registry, not this
---

<!-- STATUS (generated from frameworks/registry.yaml by gen-site.mjs - do not edit) -->
> **Status:** <Shipped | Documented, not shipped | Folded | Candidate>  ·  **Evidence:** <tier badge>
> ·  **Family:** <family>  ·  **Verdict:** <verdict> (<evalDate>)
> <if shipped> Run it: [`think-<slug>`](../../frameworks/think-<slug>/)
> <if fold>   Use instead: [`<foldInto>`](...)
> <if branded> <name> is a trademark of <trademark>. <attribution>.
<!-- /STATUS -->

## What it is
The mechanism, in plain language. The durable cognitive move, named for what it does.

## When it helps / when it misleads
The situations it fits, and the "when NOT to use" boundary (for shipped skills, the same hard-walls).

## What the evidence says
Honest grade with the actual research: what it supports, what it does NOT, transferred-evidence flag.
No laundered statistics. (For shipped skills, this can transclude or summarize the skill's dossier.)

## Why it is / is not a skill here
The vetting verdict and reasoning: distinct move (Build), already-covered (Fold -> X), no separable
mechanism (Recipe), or out-of-scope/under-evidenced (Reject). This is the "rejected with reasoning"
content the maintainer asked for - the learning value of a no.

## Lineage and who to read
Origin, key people/companies, books/talks, and the graded sources (seeded from registry `sources`).
```

### The Astro Framework Library

`gen-site.mjs` gains a `library/` output: one page per `frameworks/<slug>/dossier.md`, plus an index
page listing every framework grouped by family with its status badge and evidence tier (the same
generated-view discipline as the rest of the site - gitignored, rebuilt each build). It joins the
sidebar as a top-level "Framework Library" group alongside "Frameworks (by name)" (the shipped skills).
Generated-page Edit links point at `frameworks/<slug>/dossier.md` (its true source) per the
"Generated-page Edit links" rule; the status block is `editUrl: false`-equivalent (it is registry-derived).

## Components

### C1. Dossier scaffold + the first tranche
A `frameworks/_template/dossier.md` skeleton (the format above). Author dossiers for the highest-value
set first: the 34 shipped skills (transclude/summarize their evidence dossiers), then the notable
rejections that carry learning (the 2026-06-03 folds/rejects: steelmanning, stakeholder-lens, leverage-
points, mece, opportunity-solution-tree), then the branded set SP9 opens (Six Thinking Hats, Cynefin,
Wardley, Blue Ocean). Most dossiers are drafted by `research-framework` (SP5) and finalized by a human.

### C2. `gen-site.mjs` Framework Library output
The new `library/` generated pages + index, the status block injected from the registry, the sidebar
group, the Edit-link handling. Reuses the existing generator's patterns (no new dependency).

### C3. Registry CI extension (delegates to SP3)
The "every entry has a dossier or `pending`; no orphan dossier" completeness check is SP3's C3.4. SP4
flips entries from `dossier: pending` to a real path as dossiers land; the check enforces no shipped
framework is left without one indefinitely (open decision: a deadline/quota, or just the `pending`
visibility).

### C4. Link/route resilience
Every dossier is a rendered route, so the clause-14.11 rendered-link + route-parity guards (already in
CI) cover the Framework Library automatically: a broken cross-dossier link or a dropped framework page
fails the build. The route manifest is regenerated to include `library/` routes. This is the "resilient"
guarantee made concrete - the docs cannot ship browser-broken.

## Acceptance criteria

- **AC1** `frameworks/<slug>/dossier.md` exists for every shipped skill and every 2026-06-03 verdict;
  each renders at `library/<slug>/` on the site with a registry-generated status block.
- **AC2** The Framework Library index lists every registry entry grouped by family with status + tier
  badges; it is generated (hand-editing it and rebuilding restores it).
- **AC3** The registry completeness check (SP3) is green: no shipped/notable entry without a dossier;
  no orphan dossier without an entry.
- **AC4** The rendered-link + route-parity guards pass over the new `library/` routes (no broken
  cross-links; route manifest updated).
- **AC5** A dossier's status badge changes when its registry `status` changes and the site is rebuilt
  (proof the badge is generated, not typed).

## Out of scope

The registry + schema + most CI (SP3); the engine that drafts dossiers (SP5); the IP re-tag + why-not
rewrite (SP9). SP4 is the dossier *format*, the *rendering*, and the *resilience guarantees* only.

## Open decisions for review

1. **Shipped skills: one dossier or two?** A shipped skill has `skills/think-<slug>/evidence/dossier.md`
   (evidence) and would gain `frameworks/<slug>/dossier.md` (learning). Recommendation: keep both but
   have the learning dossier *transclude/summarize* the evidence one (single source for the graded
   evidence), so they cannot contradict.
2. **Dossier review gate before publish** (shared with SP5): how much `research-framework` drafts vs. a
   human finalizes, and whether a dossier publishes at `draft` status or only after sign-off.
3. **`frameworks/` vs `docs/library/` as the in-repo home.** Recommendation: `frameworks/` at repo root
   (co-located with `registry.yaml`, parallel to `skills/`), rendered into the site's `library/`.
