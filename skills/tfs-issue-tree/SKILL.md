---
name: tfs-issue-tree
description: Produces an issue tree that decomposes one big, ambiguous question top-down into a mutually-exclusive, collectively-exhaustive (MECE) set of smaller sub-questions, branch by branch, until the leaves are small enough to answer with data or judgment. Use when a question is too broad or multi-cause to answer as posed (for example "why is churn rising?", "where is margin leaking?", "should we launch a free tier?"), when analysis work must be split into non-overlapping parts, or when coverage matters and missing a whole category would be costly. Not for evaluating a given argument's soundness (use argument-mapping) or clustering existing notes (use affinity-mapping).
license: Apache-2.0
metadata:
  id: thinking-framework-skills.issue-tree
  family: reasoning-clarity
  evidence-tier: "P"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Issue Tree

A big question like "why are sales down?" cannot be answered as posed; it has to be broken into parts. An issue tree decomposes one question top-down into a structured set of sub-questions, recursively, until the leaves are small enough to answer directly. The load-bearing constraint is **MECE**: at every branch the children must be Mutually Exclusive (no two overlap) and Collectively Exhaustive (together they cover the whole parent, with nothing important left outside). That discipline forces coverage, prevents double-counting, and makes the decomposition inspectable - a reader can challenge one branch instead of arguing a wall of prose. The output is an **issue tree**, not a discussion, and it restructures the question rather than answering it.

## When to Use

- A question is too broad, ambiguous, or multi-cause to answer as posed ("why is churn rising?", "where is our margin leaking?", "should we launch a free tier?").
- Analysis must be split so work can be parallelized or prioritized across non-overlapping branches.
- Coverage matters: missing a whole category of cause or option would be costly, so collective-exhaustiveness has real value.
- Early in a diagnosis or strategy workflow, to turn an unanswerable prompt into a tractable set of answerable parts.

## When NOT to Use

- **The question is simple or already has an obvious structure.** Decomposing a one-step question into a tree is overhead and false rigor.
- **To evaluate whether a given argument or recommendation is sound.** That is reasoning over an answer that already exists - use `tfs-argument-mapping`. An issue tree decomposes a question top-down *before* any answer exists; an argument map lays out the support and objections for an answer already on the table.
- **To organize existing notes, findings, or observations bottom-up into themes.** That is clustering from the data - use `tfs-affinity-mapping`. An issue tree imposes a top-down split before gathering; affinity mapping discovers structure from what is already gathered.
- **As the answer.** A clean tree restructures the question; it does not resolve it. Stopping at a pretty tree without driving the leaves to data or judgment is the central misuse.

## Instructions

When asked to build an issue tree, follow these steps:

1. **State the root question precisely.** One clear question at the top. If it is already simple or one-step, say so and stop - a tree is not warranted.
2. **Choose the top-level split axis, and justify it.** Decide the single dimension to break the root on (for example: by component, by cause type, by stage of the funnel, by lever). Name the axis and say in one line why this split is the material one. The wrong axis produces a tidy, useless tree.
3. **Split into MECE children.** Make the children mutually exclusive (no two overlap) and collectively exhaustive (together they cover the whole parent). If exhaustiveness is hard, add an explicit "other / remainder" branch rather than silently dropping coverage.
4. **Recurse until leaves are answerable.** Break each child the same way, stopping a branch when its leaf is small enough to answer directly with data or judgment. Keep depth proportional to the stakes; do not over-split.
5. **Make each leaf actionable.** For every leaf, state what would answer it: the data, metric, owner, or judgment call required. A leaf nobody can answer is not yet a leaf.
6. **Prune and prioritize.** Cut branches that are exhaustive but not material. Mark the two or three leaves most likely to carry the answer, so the tree drives effort, not just coverage.
7. **Emit the issue tree and a short summary.** Produce the artifact in `references/TEMPLATE.md`: a one-paragraph summary (root question, top-level split and why, which leaves matter most) above the tree.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the filled issue tree plus its summary, not a prose essay.

## Quality Checklist

Before finalizing, verify:

- [ ] The root is a single, clearly stated question, and a tree is actually warranted (not a simple one-step question).
- [ ] The split axis at each level is named, and the top-level axis has a one-line justification for why it is the material split.
- [ ] At every branch the children are mutually exclusive (no overlap) and collectively exhaustive (an explicit remainder branch if needed).
- [ ] Leaves are driven down far enough to be answerable, and each names the data, metric, owner, or judgment that would answer it.
- [ ] Branches that are exhaustive but immaterial are pruned, and the two or three highest-value leaves are flagged.
- [ ] The output is the issue-tree artifact, not prose.
- [ ] No overclaiming: the skill structures the question for coverage and tractability; it does not claim to produce a better answer (see `evidence/dossier.md`).

## Evidence

Tier **P** (practitioner). The issue tree is a widely taught, widely adopted structured-problem-solving method (Minto's *Pyramid Principle*; the McKinsey logic-tree tradition), and decomposition as a cognitive aid is plausible and partly supported in adjacent decision-analysis work. There is **no body of controlled studies** showing that drawing an issue tree produces measurably better or faster answers than not drawing one, and a MECE-clean tree split on the wrong axis can be tidy and useless. The value is coverage, tractability, and inspectability, not a proven lift in answer quality. Evidence is transferred from human practice, not AI-validated. Full grading, sources, and caveats: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed issue tree on a real decision.
