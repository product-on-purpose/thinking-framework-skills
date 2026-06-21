# Contributing a framework

This library grows by addition, not accretion. A new framework earns its place by clearing a deliberate selection bar, carrying an honest evidence grade, producing a concrete artifact, and stating where it misleads. This page is the gate. The canonical step-by-step build process lives in [the authoring loop](./internal/AUTHORING.md); read it before you write any files.

## The selection bar

A candidate must clear all four commitments and the overlap ceiling. If it fails any one, it does not ship here.

**The four commitments**

1. **Mechanism over ritual.** Implement the durable cognitive move, named descriptively for what it does, not for a brand. We ship `parallel-perspectives-review` (installed as `think-parallel-perspectives-review`), not "Six Thinking Hats."
2. **Honest evidence grading.** Assign a real tier and back it with a dossier of graded sources (below). No laundered statistics, no dressing a practitioner method up as strong research.
3. **Artifact, not prose.** The skill must emit a named, structured, reusable deliverable - a risk register, an option matrix, an assumption ledger, a concept map. A method that only produces "think harder" is not a skill here.
4. **Explicit "When NOT to Use."** State the situations where the method misleads or wastes effort, so it cannot be cargo-culted.

The canonical statement of all four is in [Philosophy](https://thinking-framework-skills.productonpurpose.com/about/philosophy/) on the docs site.

**The overlap ceiling.** A new method must add a distinct, durable cognitive move and not substantially duplicate an existing one (it shares no more than about a fifth of its working mechanism with any shipped skill). If the move is already a mode of a shipped skill, fold it in rather than shipping a near-twin. The **framework registry** (`frameworks/registry.mjs`) is the single source of truth for what the library has judged: every in-scope method carries a `status` (`shipped`, `next`, `cand`, `recipe`, `fold`, `flag`, `pm`, or `excl`) and the reasoning behind it, so each fold or exclusion is a recorded decision rather than an oversight. (The [framework catalog](./internal/research/framework-catalog.md) and the public why-not index are generated *views* of the registry - do not hand-edit them.) The fastest way to vet a candidate is the `think-research-framework` engine (the `/think-research-framework` command): it grades the evidence conservatively, proves distinctness against the catalog, drafts the dossier, and prints a schema-valid proposed registry entry for review - it never auto-admits.

## The evidence requirement

Every skill carries an `evidence-tier` and an `evidence/dossier.md` that is the single source of truth - you write it first, and everything else derives from it. The dossier must state what the research does and does NOT support, and flag any evidence transferred from human studies that has not been validated on AI.

Grade honestly against the seven-tier model: **S** strong research, **M** moderate, **P** practitioner, **V** vendor/commercial, **A** anecdotal, **C** conceptually plausible but under-tested, **X** poor or contradictory (excluded). A truthful "P, useful anyway, and here is when not to use it" is more valuable than an inflated "S." Methods that grade X do not ship; they are documented as deliberate exclusions instead.

**Contested lenses.** A low-tier famous-but-weak method may ship only as a **contested lens** under the caveat-first contract (`check-contested.mjs`): the deficiency must lead every surface the skill touches (it is not a footnote); the skill is explicit-request-only and never reached for by the advisor on a generic prompt; branded lenses carry attribution to the originating work. The 9-layer gate enforces this contract at CI time. A method that cannot meet the caveat-first contract does not ship here in any form.

## How to propose and add one

1. Confirm the method clears the selection bar above. Sanity-check it against the catalog for overlap and prior decisions.
2. Open the [framework catalog](./internal/research/framework-catalog.md) and place your candidate: is it genuinely additive, or a `[fold]`?
3. Follow [the authoring loop](./internal/AUTHORING.md) end to end: gather evidence, scaffold from the template, write the dossier first, then `SKILL.md`, the template and worked example, the metadata sidecar, and the eval cases.
4. Use the shared **Northwind** scenario in your worked example where it fits, so the library reads as one product.
5. Register the method in both sources of truth (the `library.json` component and a `status: shipped` entry in `frameworks/registry.mjs`) and regenerate the views, then validate to zero errors at the conformance gate (`node scripts/check.mjs`; the 13-layer gate - see [`docs/conformance.md`](./conformance.md) for the full layer list). Commit on a branch and open a PR. CI re-runs the same gate plus the site link/route guards.

## Conventions

- Install name and directory are `think-<method>`; the canonical id is `thinking-framework-skills.<method>`. Use the bare, descriptive, kebab-case method name.
- Any diagrams follow the pm-skills utility-mermaid-diagrams house style: a mermaid block with a `%%{init: {'theme':'base',...}}%%` header and colored `classDef` nodes.
- The docs site is a generated view; the skill files under `../skills/` are the source of truth. Do not edit generated pages by hand.
