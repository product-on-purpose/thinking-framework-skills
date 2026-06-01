# Abstraction Ladder - Worked Example

A completed run of the `abstraction-laddering` skill on a real, consequential decision. This is the quality bar a generated ladder should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) so examples across skills read as one coherent product. See `docs/internal/AUTHORING.md`.

---

## Problem under laddering

- **Problem as given (entry rung):** "We need to launch a self-serve free tier."
- **Who framed it / how it arrived:** Brought to the team by leadership as a pre-baked solution, attached to a Q3 board target for top-of-funnel growth. The altitude is accidental: it names *one mechanism*, not the goal, and not the only mechanism.
- **The user's actual goal:** Grow qualified pipeline efficiently enough to hit the Q3 number without breaking the existing sales-led motion.

## Summary (top of the artifact)

The problem arrived two rungs too low: "launch a self-serve free tier" is a specific implementation, not the problem. Climbing reveals the real goal is "grow qualified pipeline efficiently," for which a free tier is only one of several "hows" (free trial, usage-based entry, partner-led, better paid funnel). Climbing one rung higher ("hit the Q3 growth number") is too broad to act on, and climbing to "grow the company" is uselessly universal. We choose to work at **"reduce the cost and friction of a prospect reaching first value"** as the working altitude: it is high enough that a free tier competes against cheaper alternatives instead of being assumed, and low enough to act on this quarter. A free tier may still win - but now it has to earn it.

## The ladder (most abstract at top, most concrete at bottom)

| Rung | Altitude | Statement of the problem at this level | Note |
|---|---|---|---|
| ^ why? | Highest | Grow the company / increase enterprise value | too high: true of almost any project, not workable |
| | Higher | Hit the Q3 top-of-funnel growth target | a target, not a problem to solve; still too broad to act on |
| | High | Grow qualified pipeline efficiently without breaking the sales-led motion | the user's actual goal - several "hows" live below it |
| | **Working** | **Reduce the cost and friction of a prospect reaching first value** | **chosen working altitude** - leaves real options open, still actionable |
| | Lower | Let prospects experience the product before talking to sales | more than one "how" here -> free tier, free trial, interactive demo, usage-based entry |
| | (entry) | Launch a self-serve free tier | <- problem as given; one mechanism among several |
| v how? | Lowest | Ship a free plan with feature gates, usage caps, and a self-serve signup form | too low: a single implementation detail of one mechanism |

**Working altitude (chosen rung):** "Reduce the cost and friction of a prospect reaching first value."

**Rationale:** This rung serves the actual goal (efficient qualified pipeline) while refusing to assume the answer is a free tier. At this altitude the free tier must compete against a free trial, an interactive demo, and a better-instrumented paid funnel on cost, conversion, and load on the sales motion - which is exactly the comparison leadership skipped by handing down a solution. It is concrete enough to scope work this quarter.

---

*Note how the value is in relocating the work: the problem arrived as "launch a free tier" (an answer), and the ladder moved it up to a level where the free tier is one competing option rather than a foregone conclusion - the move a naive prompt, which would have started designing the free tier, would miss.*
