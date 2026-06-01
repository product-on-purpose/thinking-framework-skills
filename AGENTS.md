# thinking-framework-skills - agent guide

An evidence-graded library of agent-executable thinking-method skills, for AI agents and the humans who work with them. The plugin installs as `thinking-framework-skills`. Skill IDs are namespaced `thinking-framework-skills.<method>`, and installable skill names carry a `tfs-` prefix (for example `tfs-premortem`) to avoid cross-plugin collisions. Sibling to `pm-skills`, no technical coupling: `thinking-framework-skills` helps decide *what* to work on and *why* it is sound; `pm-skills` helps execute *how*.

## What makes a skill here different

Each skill is built around four commitments, not just a prompt:

1. **Mechanism over ritual.** The skill implements the durable cognitive move, named descriptively, not a trademarked brand.
2. **Honest evidence grading.** Every skill carries an evidence tier and an `evidence/dossier.md` that says what the research does and does not support, and flags where evidence is transferred from human studies rather than validated for AI use.
3. **Artifact, not prose.** Every skill emits a concrete, reusable artifact (a risk register, an option matrix, a perspective review).
4. **Explicit "when not to use."** Each skill states where it misleads, to guard against cargo-cult execution.

## Skills

| Skill | Family | Evidence | Artifact |
|---|---|---|---|
| [`tfs-premortem`](skills/tfs-premortem/SKILL.md) | risk-and-resilience | S/M | risk register |
| [`tfs-problem-restatement`](skills/tfs-problem-restatement/SKILL.md) | problem-framing | M/P | problem frame set |
| [`tfs-evidence-vs-inference-sort`](skills/tfs-evidence-vs-inference-sort/SKILL.md) | reasoning-clarity | P | evidence/inference ledger |
| [`tfs-ladder-of-inference-check`](skills/tfs-ladder-of-inference-check/SKILL.md) | assumption-and-belief-challenge | P | reasoning trace |
| [`tfs-what-would-have-to-be-true`](skills/tfs-what-would-have-to-be-true/SKILL.md) | decision-and-option-evaluation | P | assumption ledger |
| [`tfs-decision-option-review`](skills/tfs-decision-option-review/SKILL.md) | decision-and-option-evaluation | P (flag) | option matrix |
| [`tfs-parallel-perspectives-review`](skills/tfs-parallel-perspectives-review/SKILL.md) | perspective-and-multi-lens | P (flag) | multi-lens review |
| [`tfs-red-team-light`](skills/tfs-red-team-light/SKILL.md) | assumption-and-belief-challenge | P (flag) | adversarial critique |
| [`tfs-scamper`](skills/tfs-scamper/SKILL.md) | divergent-ideation | P | expansion sheet |
| [`tfs-question-burst`](skills/tfs-question-burst/SKILL.md) | divergent-ideation | P | ranked question set |
| [`tfs-assumption-reversal`](skills/tfs-assumption-reversal/SKILL.md) | divergent-ideation | P | assumptions-and-reversals sheet |
| [`tfs-brainwriting`](skills/tfs-brainwriting/SKILL.md) | divergent-ideation | **S** | idea pool |
| [`tfs-futures-wheel`](skills/tfs-futures-wheel/SKILL.md) | systems-and-consequences | P | consequence map |
| [`tfs-reference-class-forecasting`](skills/tfs-reference-class-forecasting/SKILL.md) | risk-and-resilience | **S** | reference-class estimate |
| [`tfs-argument-mapping`](skills/tfs-argument-mapping/SKILL.md) | reasoning-clarity | **S** | argument map |
| [`tfs-woop`](skills/tfs-woop/SKILL.md) | risk-and-resilience | **S** | WOOP commitment card |
| [`tfs-authentic-dissent`](skills/tfs-authentic-dissent/SKILL.md) | assumption-and-belief-challenge | **S** | dissent audit and plan |
| [`tfs-after-action-review`](skills/tfs-after-action-review/SKILL.md) | meta-thinking-and-reflection | S/M | after-action review |
| [`tfs-far-analogy-ideation`](skills/tfs-far-analogy-ideation/SKILL.md) | divergent-ideation | **S** | far-analogy transfer sheet |
| [`tfs-natural-frequency-bayesian`](skills/tfs-natural-frequency-bayesian/SKILL.md) | reasoning-clarity | **S** | natural-frequency breakdown |
| [`tfs-issue-tree`](skills/tfs-issue-tree/SKILL.md) | reasoning-clarity | P | issue tree (MECE) |
| [`tfs-affinity-mapping`](skills/tfs-affinity-mapping/SKILL.md) | synthesis | P | clustered theme map |
| [`tfs-pyramid-principle`](skills/tfs-pyramid-principle/SKILL.md) | synthesis | P | answer-first pyramid |
| [`tfs-abstraction-laddering`](skills/tfs-abstraction-laddering/SKILL.md) | problem-framing | P | abstraction ladder |
| [`tfs-one-way-vs-two-way-door`](skills/tfs-one-way-vs-two-way-door/SKILL.md) | decision-and-option-evaluation | P | reversibility classification |
| [`tfs-decision-journal`](skills/tfs-decision-journal/SKILL.md) | meta-thinking-and-reflection | P | decision journal entry |
| [`tfs-iceberg-model`](skills/tfs-iceberg-model/SKILL.md) | systems-and-consequences | P | iceberg (4 levels) |
| [`tfs-backcasting`](skills/tfs-backcasting/SKILL.md) | risk-and-resilience | P | backcast path |
| [`tfs-stocks-and-flows-reasoning`](skills/tfs-stocks-and-flows-reasoning/SKILL.md) | systems-and-consequences | **S** | stock-flow map |
| [`tfs-linear-model-aggregation`](skills/tfs-linear-model-aggregation/SKILL.md) | decision-and-option-evaluation | **S** | scoring model |

30 skills, 11 at **S**/S-M tier - the named empirical core is now fully shipped. "(flag)" marks skills with a documented evidence or trademark caveat in their dossier. See `docs/internal/research/framework-catalog.md` for the full framework universe and roadmap.

## Recipes

Composable chains that solve a recurring job end to end (documented chains today; they graduate to invokable commands at the Silver climb). See [`recipes/`](recipes/README.md).

| Recipe | Chain |
|---|---|
| [reframe-problem](recipes/reframe-problem.md) | restate -> evidence-sort -> perspectives |
| [expand-options](recipes/expand-options.md) | restate -> scamper -> assumption-reversal |
| [stress-test-decision](recipes/stress-test-decision.md) | option-review -> WWHTBT -> premortem -> reference-class |
| [audit-reasoning](recipes/audit-reasoning.md) | evidence-sort -> ladder -> perspectives |

## Skill anatomy

```
skills/<name>/
  SKILL.md              # the procedure + frontmatter; what the agent reads
  references/
    TEMPLATE.md         # the structure the output artifact follows
    EXAMPLE.md          # a worked example that anchors quality
  evidence/
    dossier.md          # the graded evidence; the single source of truth
  skill.meta.yml        # rich sidecar (governance, taxonomy, relationships) - draft
```

## Conventions

- Skill IDs are namespace-dot: `thinking-framework-skills.<method>`. Installable skill names carry the `tfs-` prefix (`tfs-<method>`), declared as `prefix` in `library.json`.
- Skills target the open Agent Skills (`agentskills.io`) `SKILL.md` format, so they are portable across agents.
- Plugin and skill standards align to `agent-skills-toolkit` (Bronze/Universal tier today).
- No em-dashes or en-dashes anywhere in this repo's prose.
