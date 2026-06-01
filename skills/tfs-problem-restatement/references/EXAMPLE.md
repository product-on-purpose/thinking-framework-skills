# Problem Frame Set - Worked Example

A completed run of the `tfs-problem-restatement` skill, on the shared Northwind scenario. This is the quality bar a generated frame set should meet.

> Northwind is a B2B SaaS weighing a self-serve free-tier launch. (The same scenario the premortem example uses, so the library reads as one product. Restate the problem here, then a chosen option can be stress-tested with `tfs-premortem`.)

---

## Problem as given

- **Stated problem (verbatim):** "We need to build a self-serve free tier so we can hit our Q3 growth target."
- **Framed by:** Head of Growth.
- **Flags:** Names a presupposed solution ("free tier") for an unstated goal ("growth"). "Growth" itself may be a proxy. Sales and Finance viewpoints are absent.

## Restatements

| # | Restated problem | Move used | Why this might be the real problem |
|---|---|---|---|
| 1 | How do we hit the Q3 growth target? | altitude up (goal) | A free tier is one means among several; the target is the actual objective. |
| 2 | Why is our current self-serve signup-to-paid conversion too low to grow without a free tier? | altitude down (concrete) | The real failing may be a leaky funnel, not the absence of a free tier. |
| 3 | What is the cheapest way to create qualified pipeline at the rate Q3 requires? | goal vs implementation | "Free tier" is an implementation; the goal is qualified pipeline and revenue. |
| 4 | How do we grow without flooding Sales with unqualified free users to triage? | stakeholder shift (Sales) | Surfaces a cost/conflict the original framing hides. |
| 5 | How would we guarantee a free tier fails to drive growth? | inversion | Exposes the assumptions the free tier rests on: no cannibalization, ICP fit, bearable support and infra cost. |
| 6 | This is a problem of insufficient qualified demand by Q3; it is NOT necessarily a problem of missing product packaging. | is / is not | Bounds scope and challenges the leap from "we need growth" to "we need a free tier." |

## How Might We angles

- How might we hit the Q3 target with the least irreversible commitment?
- How might we raise qualified pipeline without degrading conversion or unit economics?
- How might we test demand for a free tier before building it?
- How might we grow in a way Sales and Finance both endorse?

## Chosen working frame

- **Working frame:** "How do we generate qualified pipeline at the rate the Q3 target requires, with the least irreversible commitment?"
- **Why:** It keeps the real goal (qualified growth by Q3) central, demotes "free tier" from a given to one testable option, and pulls in the Sales and Finance constraints the original framing buried. It does not foreclose the free tier; it refuses to assume it.
- **Hands off to:** option generation (e.g. SCAMPER on the growth approaches), then a decision skill to choose, then `tfs-premortem` on the chosen option.

---

*Note: the value is in moves 3, 5, and 6. A naive reframe would reword "build a free tier" into "create a free tier"; the useful work is separating the goal from the implementation and exposing the buried assumptions and stakeholders.*
