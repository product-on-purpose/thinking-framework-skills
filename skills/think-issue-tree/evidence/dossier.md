# Evidence Dossier: Issue Tree

> The single source of truth for the `issue-tree` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not
> here, it does not belong in the skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.issue-tree` (installable name `think-issue-tree`) |
| **Family** | reasoning-clarity |
| **Evidence tier** | **P** (practitioner; limited controlled evidence) |
| **Confidence** | Moderate that the mechanism makes a big question tractable; low that any published number proves it improves answers |
| **Status** | draft (first authored 2026-05-31, against discovery corpus) |

---

## 1. The mechanism (what actually does the work)

An issue tree takes one big, ambiguous question and **decomposes it top-down into a structured set of smaller sub-questions**, recursively, until the leaves are small enough to answer directly with data or judgment. The load-bearing constraint is **MECE** - at every branch, the children must be **Mutually Exclusive** (no two overlap) and **Collectively Exhaustive** (together they cover the whole parent, nothing important falls outside). The tree does three things:

1. **Converts an unanswerable question into answerable parts.** "Why are sales down?" cannot be answered as posed; "is the decline in volume or in price, and within volume is it fewer customers or lower frequency?" can be, branch by branch.
2. **Forces coverage and prevents double-counting.** The exhaustiveness side stops the analysis from missing a whole category of cause; the exclusivity side stops two branches from secretly measuring the same thing, which would distort any weighting later.
3. **Makes the decomposition inspectable.** Because the structure is explicit, a reader can challenge a single branch ("you split by region but the real split is by product line") instead of arguing about a wall of prose.

The mechanism we implement is **MECE top-down decomposition of a question into a tree of sub-questions.** The popular "issue tree" / "logic tree" packaging is the ritual; the durable move is the disciplined, non-overlapping, gap-free split.

## 2. Lineage

- **Issue trees and the MECE principle** are core consulting-firm problem-structuring tools, most associated with McKinsey. Minto, B. (2009/1987). *The Pyramid Principle: Logic in Writing and Thinking.* (Minto coined "MECE" and the grouping discipline.)
- **Hypothesis and issue trees in structured problem solving:** Rasiel, E. (1999). *The McKinsey Way*; Rasiel & Friga (2001), *The McKinsey Mind* - describe issue trees as the standard decomposition device.
- **Generalized structured problem solving / decision frameworks:** Hammond, Keeney & Raiffa (1999), *Smart Choices* - structuring a problem before solving it; and the broad design-and-analysis literature on decomposition.

No trademark. "Issue tree," "logic tree," and "MECE" are generic descriptive terms in common professional use; no attribution is required and none is claimed. We name the skill descriptively (`issue-tree`) and absorb MECE as the principle the tree must satisfy, rather than branding it.

## 3. What the evidence shows, and what it does NOT show

This is the honest core of the dossier. The skill must not overclaim.

**What is reasonably supported:**
- Issue trees are a **widely taught, widely used practitioner method** with decades of adoption in management consulting, analytics, and engineering problem-solving. Their staying power across firms and curricula is real signal that practitioners find the decomposition tractable and communicable.
- **Decomposition as a general cognitive aid is plausible and partly supported** in adjacent literatures: breaking a complex judgment into components and reasoning about the parts (decision analysis, work-breakdown structures, divide-and-conquer estimation) tends to reduce omission errors and make reasoning auditable. This supports the *direction* of the mechanism.

**What is NOT shown (the caveats that keep the skill honest):**
- There is **no body of controlled studies** establishing that drawing an issue tree produces measurably better answers, faster, than not drawing one. The support is practitioner adoption plus general decomposition reasoning, not head-to-head experiments on issue trees specifically. This is why the tier is **P**, not S or M.
- **MECE is a discipline, not a guarantee.** A tree can be perfectly mutually-exclusive and collectively-exhaustive and still be **decomposed along the wrong axis** (splitting by geography when the real structure is by product), producing a tidy, exhaustive, and useless tree. Exhaustiveness is checkable; *relevance of the chosen split* is a judgment the method does not supply.
- A tree does **not answer the question.** It restructures the question into answerable parts. Confusing "I have a clean MECE tree" with "I have an answer" is the central misuse.

**Net grade: P.** A useful, durable practitioner method whose value is structuring and coverage, not a proven lift in answer quality. The skill claims tractability, coverage, and inspectability, and explicitly disclaims any proven improvement in the final answer.

## 4. Transferred-evidence flag (required honesty for this library)

All of the support above comes from **human practitioner use and adjacent human-subject decomposition research.** There is **no direct study** of issue trees built by, or with, an AI agent, and none of whether an AGENT-produced issue tree improves a human's subsequent analysis. The evidence is therefore **transferred from human practice, not validated for AI-augmented use,** and the practitioner tier means even the human evidence is adoption-and-plausibility, not controlled measurement. The skill must say so. Treat the AI value as: the agent makes a disciplined MECE decomposition cheap to produce, enforces the exhaustiveness and non-overlap checks that humans skip under time pressure, and emits a durable, inspectable artifact - benefits that do not depend on any unproven answer-quality claim.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**
- The question is **big, ambiguous, or multi-cause** and cannot be answered as posed ("why is churn rising?", "should we launch a free tier?", "where is our margin leaking?").
- A team needs **shared structure** so that work can be split, parallelized, or prioritized across non-overlapping branches.
- Coverage matters: missing a whole category of cause or option would be costly, so collective-exhaustiveness has real value.

**Fails or misleads when (poor-fit / anti-patterns):**
- **The question is simple or already has an obvious structure** - decomposing a one-step question into a tree is overhead and false rigor. (Anti-trigger.)
- **The task is to evaluate an existing argument or recommendation for soundness** - that is reasoning over a *given* claim, not decomposing a question. Use `think-argument-mapping`. An issue tree decomposes top-down before any answer exists; an argument map lays out the support and objections for an answer that already exists. (Near-miss anti-trigger.)
- **The inputs are existing notes, findings, or observations to be organized bottom-up into themes** - that is clustering, which builds structure up from the data. Use `think-affinity-mapping`. Issue trees impose a top-down split *before* gathering; affinity maps discover structure *from* what is already gathered.
- **Decomposed along an irrelevant axis** - a MECE-clean tree split on the wrong dimension is tidy and worthless. The method must justify *why this split* and prune branches that are exhaustive but not material.
- **Treated as the answer** - stopping at a pretty tree without driving the leaves to data/judgment is the central misuse; the tree restructures the question, it does not resolve it.

## 6. Output artifact

The skill must emit an **issue tree**, not prose: the root question, then a top-down branching structure whose children at each node are labeled and checked for mutual-exclusivity and collective-exhaustiveness, down to answerable leaf sub-questions. Each leaf should state what would answer it (data, owner, or judgment), and the split axis at each level should be named so the decomposition is inspectable. A short summary above the tree states the root question, the chosen top-level split and why, and which leaves matter most. The artifact is the deliverable; the conversation is not.

## 7. Sources

1. Minto, B. (1987/2009), *The Pyramid Principle* - origin of MECE and the grouping/decomposition discipline.
2. Rasiel, E. (1999), *The McKinsey Way*; Rasiel & Friga (2001), *The McKinsey Mind* - issue trees / logic trees as the standard structured-problem-solving device.
3. Hammond, Keeney & Raiffa (1999), *Smart Choices* - structuring a problem into its parts before solving.
4. Adjacent decomposition support: decision-analysis and divide-and-conquer estimation literatures (cited as plausibility, not as direct issue-tree evidence).

> **Verification status:** citations 1-3 are standard and well-attested attributions for issue trees and MECE. The phrasing of the adjacent decomposition support in section 3 (citation 4) is drawn from secondary synthesis and should be confirmed against primary sources before any public-facing claim. The dossier states the tier as **P** precisely because the issue-tree-specific controlled evidence is thin; that honesty is the point.
