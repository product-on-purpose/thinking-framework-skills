# Five Whys chain - Template

Fill this in. The deliverable is the single linear why-chain with a branch-or-not flag on each step plus one countermeasure at the terminal node, not a confident single root cause stripped of its alternatives.

> **Evidence caveat (read first):** Five Whys is tier X. The single-chain technique oversimplifies multi-causal problems and follows one path when failures are usually multi-causal (Card 2017). The value below is the discipline, not the chain: flag each step as single-cause or branch, and the moment a step branches, stop and route to `think-issue-tree`. Do not report a single root cause as the answer to a many-cause problem, and do not invent effectiveness numbers.

---

## Problem

- [one line: the concrete, observable symptom this chain is about]

## The chain (ask "why?" of each answer; flag each step `[single cause]` or `[branch]`)

1. **Why did [the problem] happen?** [answer] `[single cause / branch]`
2. **Why did that happen?** [answer] `[single cause / branch]`
3. **Why did that happen?** [answer] `[single cause / branch]`
4. **Why did that happen?** [answer] `[single cause / branch]`
5. **Why did that happen?** [terminal cause you can act on] `[single cause / branch]`

## Multi-cause check

- [State whether any step was `[branch]` or the failure is socio-technical. If so: say plainly that the chain is discarding alternatives, and recommend `think-issue-tree` instead of treating the terminal node as the cause.]

## Countermeasure (only if the chain held as single-cause throughout)

- [one fix aimed at the terminal node, not the original symptom]

## What to do next

- [if single-cause: verify the terminal cause before acting; if any branch: hand the problem to `think-issue-tree` for a branching, coverage-checked decomposition]
