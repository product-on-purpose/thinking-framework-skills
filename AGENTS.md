# thinking-tools (working name) - agent guide

An evidence-graded library of agent-executable thinking-method skills, for AI agents and the humans who work with them. Sibling to `pm-skills`, no technical coupling: `thinking-tools` helps decide *what* to work on and *why* it is sound; `pm-skills` helps execute *how*.

## What makes a skill here different

Each skill is built around four commitments, not just a prompt:

1. **Mechanism over ritual.** The skill implements the durable cognitive move, named descriptively, not a trademarked brand.
2. **Honest evidence grading.** Every skill carries an evidence tier and an `evidence/dossier.md` that says what the research does and does not support, and flags where evidence is transferred from human studies rather than validated for AI use.
3. **Artifact, not prose.** Every skill emits a concrete, reusable artifact (a risk register, an option matrix, a perspective review).
4. **Explicit "when not to use."** Each skill states where it misleads, to guard against cargo-cult execution.

## Skills

| Skill | Family | Evidence | What it produces |
|---|---|---|---|
| [`premortem`](skills/premortem/SKILL.md) | risk-and-resilience | S/M (contested) | A risk register: ranked failure causes with tripwires, mitigations, owners, and kill criteria |

More skills are in progress; see the release plan and the audit in `_local/`.

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

- IDs are namespace-dot: `thinking-tools.<slug>`.
- Skills target the open Agent Skills (`agentskills.io`) `SKILL.md` format, so they are portable across agents.
- Plugin and skill standards align to `agent-skills-toolkit` (Bronze/Universal tier today).
- No em-dashes or en-dashes anywhere in this repo's prose.
