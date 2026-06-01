# MVP backlog and build order

The single source of "what to build next." WIP = 1: build the **Now** skill end to end (per [AUTHORING.md](../../AUTHORING.md)), ship it, then move the pointer. Roster is from the audit (Appendix B canonical roster); names use the `think-` prefix and `thinking-framework-skills.<method>` ids.

## Now

> **31 skills + 4 recipes (as workflow components) + per-skill eval cases; the plugin validates at CONVERGENT (Silver), 0 errors / 0 warnings.** Empirical core complete (11 S/S-M tier). The 31st is **`think-framework-advisor`**, the front-door meta-router: describe a situation, get a prioritized evidence-graded Thinking Plan of which frameworks to use and why (built from its spec; evidence verified + adversarially reviewed; graded M/C - honest that the routing itself is unvalidated). Silver climb done: agent-targets claude+codex, prefix, components-match, chain contract, workflows (S5), per-target generated manifests (S6). Remaining: the **go-public flip** (make repo public, re-pin + merge the held `agent-plugins` listing); deferred follow-ups: recipe slash-commands (until the toolkit wires `ctx.workflows` so command `maps-to` a workflow resolves), a behavioral eval runner (Gold-era per the toolkit), and the docs site (`documentation-and-site-plan.md`). Known go-public item: the generated `.claude-plugin/plugin.json` omits `license` (gen-manifest's nativeSpine drops it) - carry it via the registry entry/LICENSE, or add `license` to the toolkit's nativeSpine. See `framework-catalog.md` (universe). `think-framework-advisor` is **shipped** (spec at `docs/internal/specs/meta-skill-framework-advisor.md`; the spec's pre-verification "P" estimate was downgraded to M/C at build time - see its build-decision note). **Docs site: S0+S1 shipped** - the Astro Starlight site in `site/` builds clean (55 pages, Pagefind) as a generated view of the skills (`scripts/gen-site.mjs`); per-framework pages use the 4-layer progressive disclosure + the graded bibliography; deploy is wired (`.github/workflows/deploy-pages.yml`) but manual until go-public. **Corpus secured (2026-06-01):** the `backup/discovery-corpus-*` branch was removed from the remote (local branch + a verified offline bundle + plain copy kept at `E:\Projects\product-on-purpose\backup\`), secret scan clean, so `main` is the only remote branch and its history never held the corpus. Remaining gated work: the **go-public flip**, and docs-site **S2-S4** (learning layer, exploration lenses + mermaid visuals, polish).

## Build order

Statuses: `done` | `now` | `next` | `later`. The two `wk3` rows are the strong-evidence additions that keep the "evidence-graded" brand honest (the consensus roster skews to practitioner-tier methods).

| # | Skill (`think-<method>`) | Family | Evidence (provisional) | Wave | Status |
|---|---|---|---|---|---|
| 1 | `think-premortem` | risk-and-resilience | S/M | showcase | **done (v0.1.0)** |
| 2 | `think-problem-restatement` | problem-framing | M/P | showcase | **done (v0.1.0)** |
| 3 | `think-evidence-vs-inference-sort` | reasoning-clarity | P | showcase | **done (v0.1.0)** |
| 4 | `think-what-would-have-to-be-true` | decision | P | showcase | **done (v0.1.0)** |
| 5 | `think-scamper` | divergent-ideation | P | showcase | **done (v0.1.0)** |
| 6 | `think-ladder-of-inference-check` | assumption-and-belief-challenge | P | mvp | **done** |
| 7 | `think-parallel-perspectives-review` | perspective-and-multi-lens | P (flag) | mvp | **done** |
| 8 | `think-question-burst` | divergent-ideation | P | mvp | **done** |
| 9 | `think-futures-wheel` (sub: second-order-effects) | systems-and-consequences | P | mvp | **done** |
| 10 | `think-decision-option-review` | decision-and-option-evaluation | P (flag) | mvp | **done** |
| 11 | `think-assumption-reversal` | divergent-ideation | P | mvp | **done** |
| 12 | `think-red-team-light` | assumption-and-belief-challenge | P (flag) | mvp | **done** |
| 13 | `think-brainwriting` (6-3-5 / NGT) | divergent-ideation | **S** | mvp | **done** |
| 14 | `think-reference-class-forecasting` | risk-and-resilience | **S** | mvp | **done** |

## Milestones

- **Showcase (`v0.1.0` -> public preview):** skills 1-5 + 1-2 recipes. Going public also requires making the repo public and re-pinning the held `agent-plugins` listing (branch `stage/thinking-framework-skills-listing`). See the audit, section 6.4 and 6.5 (the demand probe).
- **Full MVP (`v0.2.0`):** skills 6-14 + the four recipes below.

## Recipes (after 2+ composable skills exist; thin command files)

- `/think:reframe-problem` - problem-restatement -> evidence-vs-inference-sort -> parallel-perspectives-review
- `/think:expand-options` - problem-restatement -> scamper -> assumption-reversal
- `/think:stress-test-decision` (marquee) - decision-option-review -> what-would-have-to-be-true -> premortem -> futures-wheel
- `/think:audit-reasoning` - evidence-vs-inference-sort -> ladder-of-inference-check -> parallel-perspectives-review

## Parallel / later (not gates on the Now skill)

- DONE: renamed `_LOCAL` -> `_local` (folder + `.gitignore`). Corpus relocation reconsidered and NOT done: kept private (gitignored `_local/` + the `backup/discovery-corpus-2026-05-31` branch) rather than committed, because the repo is heading public and committing it would expose ~106k words of strategy research in public history. See `docs/internal/research/README.md`.
- DONE: `eval/cases.md` authored for every skill (triggers, anti-triggers, output checks, value-vs-unaided baseline). Not yet executed by a harness; the runner is a Silver-climb item.
- Confirm license (Apache-2.0); decide the Silver climb; the go-public flip at the showcase.

## v0.3 - empirical core (DONE)

The highest-value move was to finish the empirical core: the strongest-evidenced methods the MVP did not include. All six shipped and validated (Tier universal, 0/0), taking the catalog to 9 S/S-M-tier skills of 20.

| Skill | Family | Evidence | Status |
|---|---|---|---|
| `think-argument-mapping` | reasoning-clarity | **S** (van Gelder) | **done** |
| `think-woop` | risk-and-resilience | **S** (Oettingen, 25+ RCTs) | **done** |
| `think-authentic-dissent` | assumption-and-belief-challenge | **S** (Nemeth) | **done** |
| `think-after-action-review` | meta-thinking-and-reflection | S/M (Tannenbaum & Cerasoli) | **done** (opened the reflection family) |
| `think-far-analogy-ideation` | divergent-ideation | **S** (Gentner & Smith) | **done** |
| `think-natural-frequency-bayesian` | reasoning-clarity | **S** (Gigerenzer) | **done** |

Later tranche (v0.4, fill still-empty families; mostly P, high composability): synthesis (`think-mece-decomposition` / `think-issue-trees`, `think-affinity-mapping`, `think-pyramid-principle`); problem-framing (`think-abstraction-laddering`); decision (`think-one-way-vs-two-way-door`, `think-decision-journal`); perspective (`think-stakeholder-lens-review`, `think-steelmanning`); systems (`think-iceberg-model`, `think-leverage-points`); strategy (`think-opportunity-solution-tree`); foresight (`think-backcasting`).

Selection bar unchanged: each must clear the four commitments (mechanism over ritual, honest evidence grade, artifact-not-prose, when-not-to-use) and stay under a ~20% overlap ceiling vs existing skills.
