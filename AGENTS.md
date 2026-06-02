# thinking-framework-skills - agent guide

An evidence-graded library of agent-executable thinking-method skills, for AI agents and the humans who work with them. The plugin installs as `thinking-framework-skills`. Skill IDs are namespaced `thinking-framework-skills.<method>`, and installable skill names carry a `think-` prefix (for example `think-premortem`) to avoid cross-plugin collisions. Sibling to `pm-skills`, no technical coupling: `thinking-framework-skills` helps decide *what* to work on and *why* it is sound; `pm-skills` helps execute *how*.

## What makes a skill here different

Each skill is built around four commitments, not just a prompt:

1. **Mechanism over ritual.** The skill implements the durable cognitive move, named descriptively, not a trademarked brand.
2. **Honest evidence grading.** Every skill carries an evidence tier and an `evidence/dossier.md` that says what the research does and does not support, and flags where evidence is transferred from human studies rather than validated for AI use.
3. **Artifact, not prose.** Every skill emits a concrete, reusable artifact (a risk register, an option matrix, a perspective review).
4. **Explicit "when not to use."** Each skill states where it misleads, to guard against cargo-cult execution.

## Skills

| Skill | Family | Evidence | Artifact |
|---|---|---|---|
| [`think-premortem`](skills/think-premortem/SKILL.md) | risk-and-resilience | S/M | risk register |
| [`think-problem-restatement`](skills/think-problem-restatement/SKILL.md) | problem-framing | M/P | problem frame set |
| [`think-evidence-vs-inference-sort`](skills/think-evidence-vs-inference-sort/SKILL.md) | reasoning-clarity | P | evidence/inference ledger |
| [`think-ladder-of-inference-check`](skills/think-ladder-of-inference-check/SKILL.md) | assumption-and-belief-challenge | P | reasoning trace |
| [`think-what-would-have-to-be-true`](skills/think-what-would-have-to-be-true/SKILL.md) | decision-and-option-evaluation | P | assumption ledger |
| [`think-decision-option-review`](skills/think-decision-option-review/SKILL.md) | decision-and-option-evaluation | P (flag) | option matrix |
| [`think-parallel-perspectives-review`](skills/think-parallel-perspectives-review/SKILL.md) | perspective-and-multi-lens | P (flag) | multi-lens review |
| [`think-red-team-light`](skills/think-red-team-light/SKILL.md) | assumption-and-belief-challenge | P (flag) | adversarial critique |
| [`think-scamper`](skills/think-scamper/SKILL.md) | divergent-ideation | P | expansion sheet |
| [`think-question-burst`](skills/think-question-burst/SKILL.md) | divergent-ideation | P | ranked question set |
| [`think-assumption-reversal`](skills/think-assumption-reversal/SKILL.md) | divergent-ideation | P | assumptions-and-reversals sheet |
| [`think-brainwriting`](skills/think-brainwriting/SKILL.md) | divergent-ideation | **S** | idea pool |
| [`think-futures-wheel`](skills/think-futures-wheel/SKILL.md) | systems-and-consequences | P | consequence map |
| [`think-reference-class-forecasting`](skills/think-reference-class-forecasting/SKILL.md) | risk-and-resilience | **S** | reference-class estimate |
| [`think-argument-mapping`](skills/think-argument-mapping/SKILL.md) | reasoning-clarity | **S** | argument map |
| [`think-woop`](skills/think-woop/SKILL.md) | risk-and-resilience | **S** | WOOP commitment card |
| [`think-authentic-dissent`](skills/think-authentic-dissent/SKILL.md) | assumption-and-belief-challenge | **S** | dissent audit and plan |
| [`think-after-action-review`](skills/think-after-action-review/SKILL.md) | meta-thinking-and-reflection | S/M | after-action review |
| [`think-far-analogy-ideation`](skills/think-far-analogy-ideation/SKILL.md) | divergent-ideation | **S** | far-analogy transfer sheet |
| [`think-natural-frequency-bayesian`](skills/think-natural-frequency-bayesian/SKILL.md) | reasoning-clarity | **S** | natural-frequency breakdown |
| [`think-issue-tree`](skills/think-issue-tree/SKILL.md) | reasoning-clarity | P | issue tree (MECE) |
| [`think-affinity-mapping`](skills/think-affinity-mapping/SKILL.md) | synthesis | P | clustered theme map |
| [`think-pyramid-principle`](skills/think-pyramid-principle/SKILL.md) | synthesis | P | answer-first pyramid |
| [`think-abstraction-laddering`](skills/think-abstraction-laddering/SKILL.md) | problem-framing | P | abstraction ladder |
| [`think-one-way-vs-two-way-door`](skills/think-one-way-vs-two-way-door/SKILL.md) | decision-and-option-evaluation | P | reversibility classification |
| [`think-decision-journal`](skills/think-decision-journal/SKILL.md) | meta-thinking-and-reflection | P | decision journal entry |
| [`think-iceberg-model`](skills/think-iceberg-model/SKILL.md) | systems-and-consequences | P | iceberg (4 levels) |
| [`think-backcasting`](skills/think-backcasting/SKILL.md) | risk-and-resilience | P | backcast path |
| [`think-stocks-and-flows-reasoning`](skills/think-stocks-and-flows-reasoning/SKILL.md) | systems-and-consequences | **S** | stock-flow map |
| [`think-linear-model-aggregation`](skills/think-linear-model-aggregation/SKILL.md) | decision-and-option-evaluation | **S** | scoring model |
| [`think-causal-loop-diagrams`](skills/think-causal-loop-diagrams/SKILL.md) | systems-and-consequences | M/P | signed causal loop diagram |
| [`think-concept-mapping`](skills/think-concept-mapping/SKILL.md) | synthesis | M/P | concept map |
| [`think-fermi-estimation`](skills/think-fermi-estimation/SKILL.md) | decision-and-option-evaluation | M/P | Fermi decomposition worksheet |
| [`think-framework-advisor`](skills/think-framework-advisor/SKILL.md) | meta (router) | M/C | Thinking Plan |

34 skills, 11 at **S**/S-M tier - the named empirical core is fully shipped. **`think-framework-advisor` is the front door / meta-router:** describe a situation and it returns a prioritized, evidence-graded *Thinking Plan* of which of the other skills to use and why (graded M/C - honest that the routing itself is unvalidated; see its dossier). "(flag)" marks skills with a documented evidence or trademark caveat. See `docs/internal/research/framework-catalog.md` for the full framework universe and roadmap.

## Recipes

Composable chains that solve a recurring job end to end. Each ships as a **workflow component** in [`_workflows/`](_workflows/) (a `steps:` list of skills) with human-readable prose in [`recipes/`](recipes/README.md). The plugin validates at **advanced (Gold)** tier, targeting Claude Code and Codex; native manifests are generated from `library.json` (do not hand-edit `.claude-plugin/` or `.codex-plugin/`).

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

- Skill IDs are namespace-dot: `thinking-framework-skills.<method>`. Installable skill names carry the `think-` prefix (`think-<method>`), declared as `prefix` in `library.json`.
- Skills target the open Agent Skills (`agentskills.io`) `SKILL.md` format, so they are portable across agents.
- Plugin and skill standards align to `agent-skills-toolkit` (Bronze/Universal tier today).
- No em-dashes or en-dashes anywhere in this repo's prose.
