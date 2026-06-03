---
title: Why not Six Thinking Hats, SWOT, ...
description: The popular methods this library deliberately leaves out, and the reason for each - mechanism over ritual, the overlap ceiling, and excluded X-tier evidence.
---

A library that grades honestly has to be willing to say no. Most "thinking tools" collections grow by addition: every named method gets a card. This one keeps a selection bar, so a method earns its place or it does not ship. Three reasons account for nearly every exclusion.

## Mechanism over ritual

We implement the durable cognitive move, named descriptively, not the brand wrapped around it. When a popular method is really a ritual on top of a move we already ship, we ship the move and skip the ritual.

- **Six Thinking Hats** is a branded parallel-thinking ritual. Its mechanism - examine a decision through separated lenses instead of all at once - ships as [Parallel Perspectives Review](../../frameworks/think-parallel-perspectives-review/). The trademark and the thin branded evidence stay out.
- **Steelmanning** and **Stakeholder Lens Review** are moves, not standalone methods: the first is the core of [Red Team Light](../../frameworks/think-red-team-light/), the second a mode of parallel perspectives.
- **How Might We**, **Is / Is Not**, and **Frame Storming** are outputs or moves of [Problem Restatement](../../frameworks/think-problem-restatement/), not separate skills.

## The overlap ceiling

A candidate that mostly duplicates a shipped skill does not earn a second slot. **FMEA-lite**, **Inversion**, and **Crazy 8s** each overlap an existing skill enough to fold in rather than stand alone. **Leverage Points** (Meadows' intervention ladder) folds into [Iceberg Model](../../frameworks/think-iceberg-model/), which already calls out the highest-leverage intervention and draws on the same source; **MECE decomposition** is the load-bearing discipline inside [Issue Tree](../../frameworks/think-issue-tree/), not a separate skill. Folding keeps the catalog small enough to choose from, which is the point: more cards is not more capability.

## X-tier: poor or contradictory evidence

Some methods are popular and have evidence pointing the wrong way. These are excluded on the merits, and we say why.

- **SWOT** sits at the X tier: the available evidence is weak or contradictory (Hill and Westbrook, 1997). It survives here as a legacy reference only.
- **Unstructured verbal brainstorming** loses to silent and nominal-group methods across decades of replication, so we ship [Brainwriting](../../frameworks/think-brainwriting/) instead.
- **Role-played Devil's Advocacy** underperforms genuine minority dissent, so we ship [Authentic Dissent](../../frameworks/think-authentic-dissent/) and flag the role-played version.
- **Five Whys** is fine for simple linear failures and misleading beyond them, so it is flagged rather than shipped as a general cause method.

## A few are out of scope, not out of evidence

Not every exclusion is a verdict on quality. **Liberating Structures** formats (1-2-4-All, Open Space, Lean Coffee) draw their value from human social dynamics an agent cannot reproduce. **Opportunity-Solution Tree**, **JTBD**, and **Porter's Five Forces** are PM and business-domain methods that belong in a sibling library. The **OODA Loop** is more useful as an agent's own loop than as a skill.

The full bar, and how to propose a method that clears it, lives in [contributing](../contributing/).
