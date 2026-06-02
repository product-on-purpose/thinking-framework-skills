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

## Convention

- A release line gets a folder when planning starts. While in flight it holds the live backlog / build order; once shipped it is annotated to a record of what landed.
- Keep these honest. If a plan changed mid-flight (scope cut, candidate rejected, milestone renumbered), say so here rather than silently rewriting history - the value is the trail, not a tidy fiction.
