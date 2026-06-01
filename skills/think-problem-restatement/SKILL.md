---
name: think-problem-restatement
description: Generates several genuinely different framings of an ambiguous problem by varying altitude, stakeholder, and goal-versus-implementation, then selects the most useful one to solve and produces a reframed problem statement with How Might We angles. Use when a problem is vague, arrived as a symptom or a pre-baked solution, or before committing significant work to solving the wrong thing.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.problem-restatement
  family: problem-framing
  evidence-tier: "M/P"
  version: 0.1.0
  standard: "0.8"
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Problem Restatement

The default failure is to solve a problem exactly as first stated, even though the first statement usually encodes a symptom, a presupposed solution, or one stakeholder's view. Problem restatement is a deliberate interrupt before solving: generate several genuinely different formulations of the problem, each by a distinct move (change altitude, separate goal from implementation, shift stakeholder, invert, bound with is/is-not), then choose the most useful one to work on. The output is a **problem frame set** ending in a single chosen working frame, not a longer list and not prose.

## When to Use

- The problem is ambiguous, ill-defined, or stated as a symptom.
- The request names a solution ("build X") but the underlying goal is unstated.
- Solving the wrong problem would be costly; this is upstream of significant work.
- At the start of most reframing, discovery, or strategy workflows.

## When NOT to Use

- The problem is already well-defined and validated; reframing a correct, clear problem wastes effort and manufactures doubt.
- For trivial or fully reversible tasks where a wrong frame costs little.
- To generate solutions (use an ideation skill) or to choose among them (use a decision skill); this tool only sharpens the problem.
- As endless reframing that avoids ever committing to solve. Restatement that never selects a working frame is the main failure mode.

## Instructions

When asked to restate or reframe a problem, follow these steps:

1. **Capture the problem as given.** Record it verbatim. Note who framed it and whether it names a symptom or a presupposed solution.
2. **Generate restatements with distinct moves, not rewordings.** Produce 5 to 8 genuinely different frames using: altitude up ("what is this ultimately in service of?") and down ("what concretely is failing?"); goal versus implementation (separate the outcome wanted from the solution proposed); stakeholder shift (state it as each affected party would); inversion ("how would we cause this on purpose?"); and is / is not (what the problem explicitly is and is not).
3. **Justify each briefly.** For every restatement, add one line: why this might be the real problem.
4. **Draw How Might We angles.** From the most promising restatements, write 3 to 5 open "How might we ..." questions.
5. **Select one working frame.** Choose the single restatement that best serves the user's actual goal, and say in one or two sentences why. Converge; do not leave it open.
6. **Emit the problem frame set.** Produce the artifact in `references/TEMPLATE.md`: the original, the tagged restatement table, the How Might We angles, and the chosen working frame with rationale.

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the frame set ending in one chosen working frame, not a prose essay.

## Quality Checklist

Before finalizing, verify:

- [ ] Restatements use distinct framing moves (altitude, goal-vs-implementation, stakeholder, inversion, is/is-not), not cosmetic rewordings.
- [ ] The underlying goal is separated from any proposed implementation.
- [ ] At least one restatement challenges a load-bearing assumption (an inversion or an is/is-not).
- [ ] Exactly one working frame is selected, with a rationale tied to the user's actual goal.
- [ ] The output is the frame set artifact, not prose.
- [ ] No overclaiming: the skill sharpens the problem, it does not guarantee a better solution (see `evidence/dossier.md`).

## Evidence

Tier **M/P**. That how a problem is framed affects the quality and originality of solutions has moderate support (problem-finding research, Getzels & Csikszentmihalyi and successors; Nutt on decision failure from poor definition), and design practice treats a tight problem statement as upstream of better ideation (Stanford d.school; Wedell-Wedellsborg, HBR 2017). The specific "restate it several ways" technique is practitioner-grade, and evidence is transferred from human studies, not AI-validated. The popular Einstein "55 minutes" quote is apocryphal and is not used as support. Full grading and caveats: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed problem frame set.
