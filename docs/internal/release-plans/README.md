# Release plans

One folder per release line. These are **internal planning and build records** - what was scoped, the build order, and (after the fact) what actually shipped. They are not the canonical changelog.

The canonical, user-facing records live at the repo root:

- [`CHANGELOG.md`](../../../CHANGELOG.md) - technical history (Keep a Changelog).
- [`RELEASE-NOTES.md`](../../../RELEASE-NOTES.md) - curated highlights.
- GitHub releases: <https://github.com/product-on-purpose/thinking-framework-skills/releases>.

## Releases

| Plan | Release | Status | What it covered |
|---|---|---|---|
| [`plan_v0.1.0/`](./plan_v0.1.0/) | [v0.1.0](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.1.0) | **Shipped** 2026-06-01 | The MVP build-out: the 14-skill canonical roster that grew into 31 skills + 4 recipes, the framework advisor, the docs site, and the go-public flip. `plan_v0.1.0/BACKLOG.md` is the historical build order. |
| [`plan_v0.2.0/`](./plan_v0.2.0/) | [v0.2.0](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.2.0) | **Shipped** 2026-06-01 | Catalog growth (+3 skills, +1 recipe, vetted before building), docs visual polish, and the advanced (Gold) tier hardening, then published and re-pinned in the marketplace. See [`plan_v0.2.0/PLAN.md`](./plan_v0.2.0/PLAN.md). |
| [`plan_v0.2.1/`](./plan_v0.2.1/) | [v0.2.1](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.2.1) | **Shipped** 2026-06-03 | Maintenance: tags the docs-site conformance arc merged after v0.2.0 (the family Astro site standard convergence + the local 14.11 link/route guards + 43 pre-existing broken-link fixes). No catalog changes. See [`plan_v0.2.1/PLAN.md`](./plan_v0.2.1/PLAN.md). See also [`astro-starlight-conformance/`](./astro-starlight-conformance/) for the conformance work record. |
| [`plan_v0.3.0/`](./plan_v0.3.0/) | [v0.3.0](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.3.0) | **Shipped** | The Framework Library platform: the framework registry as single source of truth (SP3), generated catalog/why-not views, check-registry as a gate layer, and the registry-era follow-ups. |
| [`plan_v0.5.0/`](./plan_v0.5.0/) | [v0.5.0](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.5.0) | **Shipped** 2026-06-09 | Catalog expansion phase 1: the 7-candidate research shortlist (3 Build / 2 Fold / 2 Reject), specs for the three builds (theory-of-constraints, expected-value-decision-tree, scenario-planning), and the 11th family. (v0.4.0 had no plan folder; it grew out of PR #45 directly.) |
| [`plan_v0.6.0/`](./plan_v0.6.0/) | [v0.6.0](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.6.0) | **Shipped** 2026-06-10 | Catalog expansion phase 2: all 26 remaining candidates researched + adversarially verified (7 Build / 11 Fold / 2 Recipe / 6 Reject), catalog 40 -> 47, library 8 -> 25 dossiers. |
| [`plan_v0.7.0/`](./plan_v0.7.0/) | [v0.7.0](https://github.com/product-on-purpose/thinking-framework-skills/releases/tag/v0.7.0) | **Cutting** 2026-06-12 | Eval-informed quality pass + wave-3 candidate intake: both behavioral evals landed, the four output-eval-flagged skills tightened, the re-opened 30-cand queue vetted (9 Build / 7 Fold / 1 Recipe / 13 Reject), catalog 47 -> 56 with a new Ethics & Values Deliberation family, 20 documented "no"s published. |

## Convention

- A release line gets a folder when planning starts. While in flight it holds the live backlog / build order; once shipped it is annotated to a record of what landed.
- Keep these honest. If a plan changed mid-flight (scope cut, candidate rejected, milestone renumbered), say so here rather than silently rewriting history - the value is the trail, not a tidy fiction.
