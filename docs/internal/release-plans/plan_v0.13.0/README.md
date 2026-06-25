# plan_v0.13.0 - Eval-harness orchestration + CI-guard hardening

**Status:** **SHIPPED 2026-06-25 (v0.13.0).** PR #98 (Tasks 1-7) merged, plus the backlog reconciliation PR #99. Bundles the previously-unreleased v0.12.0 CI-guard hardening (#91-94, PR #97). No new skills; the catalog stays 56 core + 7 contested.

**Theme:** The behavioral eval harness becomes finalize-driven and self-guarding. A single `scripts/eval/finalize.mjs` step writes both scorecard artifacts (`.md` + `.json`) in one go and stamps `skill.meta.yml`, so the machine-readable sidecar that backs the trust page can no longer be dropped by hand. A new 14th conformance-gate layer (`scripts/check-eval-results.mjs`) enforces that every scorecard stays a paired `.md` + `.json` with a valid totals contract.

**Spec:** `docs/internal/specs/2026-06-23-eval-harness-orchestration.md`

**Plan:** `docs/internal/plans/2026-06-24-eval-harness-orchestration.md`

**Version:** minor, **v0.13.0** (0.12.0 -> 0.13.0). No new skills; catalog stays 56 core + 7 contested.

## What shipped

| Item | Status |
|---|---|
| `scripts/eval/finalize.mjs` - writes `.md` + `.json` scorecard in one step, stamps `skill.meta.yml` | Shipped (PR #98) |
| `scripts/eval/score-lib.mjs` - pure scoring logic, extracted and golden-tested | Shipped (PR #98) |
| `scripts/check-eval-results.mjs` - 14th gate layer, enforces paired scorecard contract | Shipped (PR #98) |
| Regenerated the missing 2026-06-19 contested-output `.json` sidecar (was `.md`-only, closes #95) | Shipped (PR #98) |
| CI-guard hardening follow-ups from v0.12.0: `scripts/lib/walk.mjs` shared helper, canonical-link guard extended to `.astro` + intro sources, mermaid-lint + check-repo-links edge-case robustness (#91-94, PR #97) | Bundled |

## Build approach

Built subagent-driven with per-task adversarial review (Tasks 1-7) and a final whole-branch review before the cut. The backlog reconciliation (PR #99) followed as a separate cleanup pass.

## Deliberate deferrals

- **Task 8 (combined-run Workflow):** A combined trigger+output eval Workflow that runs both evals in sequence was scoped and deferred. The gate and finalize step are the pressing correctness gap; the orchestration convenience can land in a future minor.
- **#96 (full 63-skill eval re-run):** A full re-run across all 63 skills (56 core + 7 contested) was identified as desirable but out of scope for this release. The existing scorecards remain valid; a fresh run is a future build-phase task.

## Gate status at cut

- `node scripts/check.mjs`: 0 errors, 0 warnings, 14 layers
- `npm test`: green
- `npm --prefix site run build`: clean
