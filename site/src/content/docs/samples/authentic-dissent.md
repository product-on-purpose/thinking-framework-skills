---
title: "Authentic Dissent - quick sample"
description: Audit a too-smooth architecture consensus and plan how to elicit and protect real dissent before a hard-to-reverse database migration.
sidebar:
  label: authentic-dissent
---

> A compact worked example of [Authentic Dissent](../../frameworks/think-authentic-dissent/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-authentic-dissent/).

## Situation

Daniel's platform team held an architecture review and agreed in under fifteen minutes to move the primary datastore from Postgres to a managed NoSQL service to "scale for the next stage." The staff engineer who proposed it spoke first and longest, and the room nodded along. One backend engineer who has lived through a prior NoSQL migration raised a concern about query patterns, then dropped it after a quick "we can model around that." The cutover is a one-way door across three services.

## Prompt

```
/think-authentic-dissent "Architecture review just agreed in 15 min to migrate our primary store from Postgres to a managed NoSQL service. Felt too easy. The proposer is our most senior voice and went first; one engineer flagged query-pattern risk then dropped it. Cutover is basically irreversible across 3 services. Is this real consensus, and how do I get genuine pushback before we commit?"
```

## The artifact

> **Dissent Audit and Plan**

## Decision

- Migrate the primary datastore from Postgres to managed NoSQL in the next quarter; the architecture review agreed within fifteen minutes.

## Consensus audit

- **Is the agreement genuine?** Likely smoothed, not genuine.
- **Signs:** the most senior engineer proposed it and spoke first and longest, anchoring the room; no one named a concrete downside aloud (no migration cost, no rollback plan, no query-pattern audit); the one engineer with direct NoSQL scar tissue raised query-pattern risk and then dropped it after a fast "we can model around that"; agreeing is the low-cost move with a scaling narrative already sold upward.

## Dissent currently in play

| Who / what | View | Authentic or constructed? | Heard or suppressed? |
|---|---|---|---|
| Backend engineer (prior NoSQL migration) | Our access patterns are relational and joins will get re-implemented badly in app code | Authentic (genuinely held, lived experience) | Suppressed - flagged once, then dropped after a quick dismissal |
| The AI's counter-argument against the migration | Strongest available case for staying on Postgres | Constructed | Available, but not a substitute for a real holder |
| "Assign someone to argue the Postgres side" (proposed) | Whatever they are told to argue | Constructed | Would be discounted as performance |

## Plan to elicit and protect genuine dissent

- Ask the backend engineer who has done this before to make their strongest case first, before anyone defends the migration, and signal the concern is wanted, not tolerated.
- Collect anonymous pre-reads from the whole team on "the most likely way this migration hurts us in production" before the next review, so naming a risk does not require contradicting the senior proposer in the room.
- Bring in one outside engineer who actually ran a Postgres-to-NoSQL migration and genuinely thinks it was the wrong call, not someone assigned to argue the con.
- Separate generation (surface the failure modes and the real query patterns) from evaluation (decide go/no-go) so concerns are not killed on contact in the same meeting.
- Protect the dissenter from cost: make it explicit that flagging a migration risk is not read as blocking the senior engineer or being "not a team player."

## High-stakes prescription

- This is a near-one-way door across three services. Do not let the AI's counter-argument or an assigned advocate stand in for real dissent. Put the genuine skeptic (the backend engineer, plus an outside operator who has run this migration and regrets it) into the decision with explicit protection, and weight their case against a concrete rollback and query-pattern audit before committing.

---

*Note: the value, and the honesty, is refusing to let the constructed critiques (the AI's, or an assigned advocate's) count as the dissent the evidence says actually helps. The skill's job was to find the real skeptic who got dismissed and build a plan to genuinely hear him.*

## Why this framework fits

The cognitive job here is to tell smooth consensus apart from real agreement and to stop a constructed critique from masquerading as the genuine dissent that the evidence says broadens a group's thinking. Unaided, Daniel would either commit on a false consensus or "assign a devil's advocate" and call it covered; the artifact names the real skeptic who was dismissed and gives concrete moves to elicit and protect his view before a one-way migration.
