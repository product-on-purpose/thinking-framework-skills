# Evidence Dossier: Stocks and Flows Reasoning

> Single source of truth for the `stocks-and-flows-reasoning` skill. The SKILL.md, sidecar, and evals derive from this. A strong-evidence anchor (named empirical core).

| | |
|---|---|
| **Skill** | `thinking-framework-skills.stocks-and-flows-reasoning` (installable name `think-stocks-and-flows-reasoning`) |
| **Family** | systems-and-consequences |
| **Evidence tier** | **S** (a robustly demonstrated reasoning *failure* the skill corrects) |
| **Confidence** | High that people systematically misjudge accumulation; the correction is mechanical |
| **Status** | draft (authored 2026-05-31 from the discovery corpus) |

## 1. The mechanism (what actually does the work)

People reason badly about **accumulations**. They confuse a **stock** (a quantity that accumulates: cash, debt, headcount, a customer base, a backlog, technical debt, CO2, trust) with the **flows** that change it (the inflow that adds to it, the outflow that drains it). The classic error: assuming that because an *inflow is falling*, the *stock is falling*. It is not - the stock keeps rising as long as inflow exceeds outflow. (Emissions can slow while atmospheric CO2 still rises; churn can drop while the customer base still shrinks if new-customer inflow is lower.)

The skill makes the structure explicit: name the stock, name its inflows and outflows separately, and reason about the stock's trajectory from the **net flow** (inflow minus outflow), not from the direction of any single flow. The work is done by forcing the stock/flow distinction that intuition collapses.

## 2. Lineage

- System dynamics: Jay Forrester (origin); John Sterman, *Business Dynamics* (2000); Donella Meadows, *Thinking in Systems* (2008). The accumulation-misjudgment experiments are Sterman's (and Cronin, Gonzalez & Sterman, "Why don't well-educated adults understand accumulation?", 2009).

No trademark. Named descriptively.

## 3. What the evidence shows, and what it does NOT show

**Strongly supported (the S):** the *failure* is robust. Across repeated experiments - including with highly educated subjects (MIT graduate students) - people systematically misread stock/flow relationships (the "bathtub" tasks), inferring stock direction from flow direction. This is one of the better-documented systematic reasoning errors.

**What that means for the skill (honest framing):** the strong evidence is that the *error is real and widespread*, and that making the stock/flow structure explicit removes it on a given problem. There is no claim that running this skill improves general systems-thinking transfer (the broader systems-thinking-pedagogy evidence is mixed). So: claim that it corrects a specific, well-evidenced accumulation error; do not claim it teaches systems thinking wholesale.

## 4. Transferred-evidence flag

The evidence is from human reasoners. Transferred to AI use; a model can also slip into flow-direction-equals-stock-direction reasoning when narrating a trend. The AI value: forcing the explicit stock/inflow/outflow separation and the net-flow logic is a direct counter, and the stock-flow map is inspectable.

## 5. When it works / when it fails

**Works best when:** a problem involves a quantity that accumulates over time, and the question is whether it is rising or falling (runway, debt, backlog, headcount, customer base, technical debt, reserves, emissions); when a trend in a *flow* is being used to infer the *stock*.

**Fails or misleads when (poor-fit / anti-patterns):**
- The quantity does not accumulate (a one-off event, a ratio with no stock structure).
- **Confusing the stock with a flow** (the very error - e.g., treating "revenue this month", a flow, as "cash", a stock).
- Assuming a falling inflow means a falling stock, or ignoring the outflow entirely.
- Treating a *flattening* flow as a *falling* stock.
- When a simple direct relationship (no accumulation) is all that is at play.

## 6. Output artifact

A **stock-flow map**: the stock named explicitly; its inflows and outflows listed separately; the net-flow logic (is inflow above or below outflow, and trending which way); the corrected trajectory of the stock; and the naive intuition it corrects (what someone would wrongly conclude from the flow alone).

## 7. Sources

1. Sterman, J. (2000). *Business Dynamics*; and Sterman's accumulation experiments.
2. Cronin, M., Gonzalez, C., & Sterman, J. (2009). "Why don't well-educated adults understand accumulation?" *Organizational Behavior and Human Decision Processes*.
3. Meadows, D. (2008). *Thinking in Systems*.

> **Verification status:** the Sterman accumulation-failure finding is well-attested; confirm the Cronin/Gonzalez/Sterman citation specifics before a public quantified claim. The honest scope - "corrects a specific accumulation error," not "teaches systems thinking" - is the core caveat.
