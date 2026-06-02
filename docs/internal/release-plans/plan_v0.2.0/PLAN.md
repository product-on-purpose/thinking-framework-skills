# v0.2.0 release record

> **STATUS: SHIPPED** on 2026-06-01. Tag [`v0.2.0`](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.2.0); marketplace re-pinned so installers get this build. This is the as-built record - what was scoped and what actually landed. Canonical history: [`CHANGELOG.md`](../../../../CHANGELOG.md) and [`RELEASE-NOTES.md`](../../../../RELEASE-NOTES.md).

Unlike v0.1.0, v0.2.0 was not driven by a pre-committed backlog. It grew from three post-launch tracks the maintainer chose after the public launch settled: **grow the catalog**, **polish the docs**, and **harden to Gold**. This file records all three plus the publish step.

## Goals

1. Grow the catalog without diluting the moat - only frameworks that clear the selection bar and the overlap ceiling.
2. Make the docs site easier to learn from (legible diagrams, beginner aids).
3. Close the deferred Gold-tier gaps so the plugin is self-validating.
4. Publish: cut the release and update the marketplace.

## What shipped

### 1. Catalog growth (+3 skills, +1 recipe): 31 to 34 skills, 4 to 5 recipes

Vetted **before** building. A 12-agent evidence-and-overlap workflow assessed 6 candidate frameworks against the 31 shipped skills; only 3 cleared both the evidence bar and the ~20% overlap ceiling.

| Candidate | Verdict | Reason |
|---|---|---|
| Concept Mapping | **Built** (`M/P`) | Distinct synthesis move; meta-analysis evidence is real but measures human retention, so graded `M/P` with a transferred-evidence flag (not `S`, despite a larger meta-analysis than `S`-tier Argument Mapping, because retention does not transfer to an agent the way reasoning quality does). |
| Causal Loop Diagrams | **Built** (`M/P`) | Distinct systems move (signed feedback loops); evidence is feedback-misperception studies on humans, flagged. |
| Fermi Estimation | **Built** (`M/P`) | Distinct decision move (order-of-magnitude decomposition); dossier deliberately **refuses** the floated "99 vs 3 / 42%" effect sizes as untraceable to a primary source. |
| First Principles | **Recipe, not skill** | No separable mechanism of its own - it is decomposition + assumption-stripping, so it shipped as the `first-principles` recipe chaining `think-abstraction-laddering` + `think-assumption-reversal`. |
| Key Assumptions Check | **Rejected** | Same artifact as `think-what-would-have-to-be-true`'s assumption ledger. |
| Double Crux | **Rejected** | Solo-reduces to WWHTBT killer-conditions; overlaps authentic-dissent / red-team-light. |

Each built skill follows the standard 5-file structure and hard-walls its overlaps in "When NOT to use." Registered in `library.json`; advisor name-safety set regenerated.

### 2. Docs visual polish

- README lifecycle diagram and the site all-frameworks map went from horizontal to **vertical** layouts so they are legible in a narrow column (the earlier horizontal-squish fix).
- **Beginner concept diagrams** on six framework pages via an optional `references/CONCEPT.md` per skill, rendered after the quick-facts card: natural-frequency-bayesian (frequency tree), reference-class-forecasting (inside/outside view), causal-loop-diagrams (R/B loops), stocks-and-flows (bathtub), iceberg (4 levels), futures-wheel (consequence fan). Source-controlled, dark-mode-safe, not in the agent-facing `SKILL.md`.
- `getting-started` and `how-to-read-a-page` converted to interactive `.mdx` (cards, steppers, callouts).

### 3. Advanced (Gold) tier hardening

Closed the three deferred Gold gaps so the plugin validates at `advanced`, 0 errors / 0 warnings:

- **G2 - self-hosting CI.** `scripts/check.mjs` (a thin locator that runs the toolkit's validators, no logic of its own) + `.github/workflows/ci.yml` running it on every PR / push. `check` is a required status check on `main`. Root `package.json` exposes `npm run check`.
- **G4 - generated INDEX + manifests.** `INDEX.md` generated and drift-checked alongside the native manifests.
- **G5 - release notes.** `RELEASE-NOTES.md` (curated) added, distinct from `CHANGELOG.md`.
- Tier declared `advanced` in `library.json`; version `0.1.0` to `0.2.0`.
- G1 (hooks) and G3 (chain/hook evals) are N/A - this plugin ships no hooks and no chain contracts. See [`docs/conformance.md`](../../../conformance.md).

### 4. Publish

- Annotated tag `v0.2.0` + GitHub release (body from the RELEASE-NOTES v0.2.0 section).
- Marketplace listing in `product-on-purpose/agent-plugins` re-pinned from the v0.1.0 commit to the v0.2.0 commit; marketplace metadata bumped. The pinned manifest carries `license` (the validate-registry gate).

## Notes for next time

- The vetting-before-building workflow did real work (rejected 3 of 6 candidates) and is the reusable pattern for catalog growth. Re-run it before adding skills; do not add a framework that reduces to a shipped one.
- A fan-out build had concurrent agents racing on `library.json` (each registers itself per AUTHORING.md step 8); only one landed cleanly. Register the rest by hand, or serialize the registration step.
- `release-plans/` should get its `plan_vX/` folder when planning starts, not after shipping - this v0.2.0 record was reconstructed after the fact, which is why it reads as a record rather than a backlog.
