# Constraint-Intervention Plan - Template

Fill this in. The deliverable is the plan - the named binding constraint, the capacity-versus-demand test, and the exploit / subordinate / elevate decisions with a re-check trigger - not a prose essay.

---

## Problem under analysis

- **Problem as given:** [the request or problem, verbatim, in one line]
- **The user's actual goal:** [what lifting throughput here is ultimately meant to achieve]

## Summary (top of the artifact)

[3-5 sentences. Name the system flow, name the one binding constraint as a hypothesis, and state the exploit-before-elevate decision. A reader who stops here should know which single step caps throughput and where effort should be aimed. If no single constraint binds, say that here and stop.]

## System / flow

[State the system as a sequence of steps that work passes through (work items, candidates, tickets, units). One step per line, in order. If there is no flow, or several co-equal limiters, or an unstable shifting constraint, stop here - this is not the right tool; route out per "When NOT to Use".]

1. [step]
2. [step]
3. [step]
4. [step]

## Capacity vs demand per step

For each step, state its capacity against the demand placed on it. The binding constraint is the step where demand meets or exceeds capacity and the steps after it sit starved or idle. If the table does not single out one step, say the constraint is unproven and stop short of the exploit sequence.

| Step | Capacity (per unit time) | Demand placed on it | Starved or saturated? |
|---|---|---|---|
| [step] | [how much it can process] | [how much arrives] | [starved / saturated / matched] |
| [step] | [...] | [...] | [...] |
| [step] | [...] | [...] | [...] |
| [step] | [...] | [...] | [...] |

## Binding constraint (hypothesis)

- **The constraint:** [the one step the table singles out, stated as a hypothesis - not the loudest or most-visible step by reflex]
- **Evidence it binds:** [demand >= capacity here, and the steps downstream sit starved or idle while this one is saturated]
- **If unproven:** [if the table did not single out one step, say so - the constraint is unproven, do not proceed to exploit]

## Exploit (before any spend)

[How to get maximum useful throughput from the constraint step with resources already on hand, before spending a cent. For example: remove idle time on it, stop it doing work that is not throughput, feed it only good inputs, offload non-essential tasks elsewhere.]

## Subordinate (everything else)

[How each non-constraint should run at the pace the constraint can absorb, not at its own local maximum. Name the local-efficiency habits to deliberately give up - a non-bottleneck running flat-out just builds queue in front of the constraint.]

## Elevate (only if still binding after exploit)

[What added capacity would raise the constraint - hire, buy, parallelize, redesign the step - explicitly gated behind exploitation being exhausted. Do not list elevate moves you would reach for before exploiting.]

## Re-check trigger

[What would move the constraint to a new step (e.g. once this one is exploited or elevated), the trigger to return to identify, and the warning not to keep optimizing the old bottleneck out of inertia.]
