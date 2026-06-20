---
title: "SWOT - quick sample"
description: An explicitly-requested SWOT run caveat-first - pruned, evidence-tagged, and matched into options via TOWS.
sidebar:
  label: swot
---

:::caution[SWOT is a contested lens]
SWOT is tier X (weak evidence). The most-cited field study found bare SWOT grids "did not constitute analysis" (Hill and Westbrook 1997). This sample runs it honestly: the caveat leads, each box is pruned and tagged, and the TOWS step turns the lists into options. For rigorous decomposition prefer [issue trees](../../frameworks/think-issue-tree/); this fires only because SWOT was asked for by name.
:::

> A compact worked example of [SWOT](../../frameworks/think-swot/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-swot/).

## Situation

Mira runs an 8-person seed-stage product company with a self-serve product. A board member has asked her for "a SWOT on whether we should chase that big enterprise pilot." She knows the pilot would pull the tiny team off self-serve for months, and she knows SWOT has a bad reputation for producing long lists nobody acts on, so she wants it run with the discipline that makes it useful, not a 20-item dump.

## Prompt

```text
/think-swot "board wants a SWOT on whether we chase the big enterprise pilot. we're 8 people on self-serve and it'd eat the team for months. run it honest and turn it into options."
```

## The artifact

> **Evidence caveat (read first):** SWOT is tier X; bare grids "did not constitute analysis" (Hill and Westbrook 1997). What follows is worth reading only because it is pruned, tagged, and matched into options.

### Situation

- Should the team take the big enterprise pilot, knowing it pulls everyone off the self-serve product?

### The grid

| Internal | External |
|---|---|
| **Strengths**<br>- (*) Self-serve product ships fast with no sales overhead `[evidence]`<br>- Eight people who all know the codebase `[evidence]` | **Opportunities**<br>- (*) One named enterprise wants to pay for a pilot now `[evidence]`<br>- A logo could anchor a future sales motion `[assumption]` |
| **Weaknesses**<br>- (*) No one on the team has run an enterprise delivery `[evidence]`<br>- Self-serve growth stalls the moment the team turns away `[assumption]` | **Threats**<br>- (*) The pilot's custom asks may not generalize to other buyers `[assumption]`<br>- Self-serve momentum and signups decay while we are heads-down `[evidence]` |

### Priorities

- Internal: the missing enterprise-delivery experience is the binding constraint; the small all-knowing team is the asset the pilot would consume.
- External: the one paying enterprise is the reachable opportunity; losing self-serve momentum is the threat to avoid.

### TOWS matching

| Match | Strategic option |
|---|---|
| **S-O** | Scope the pilot tight enough that the fast self-serve build skills carry it, not a bespoke enterprise rebuild. |
| **S-T** | Protect self-serve by ring-fencing part of the team; don't let everyone go heads-down. |
| **W-O** | Take the pilot only if its asks generalize; use it to learn enterprise delivery on someone else's dime. |
| **W-T** | Decline or defer if the pilot is fully custom and would stall self-serve for months with no transferable win. |

### What to do next

- The decision turns on one starred assumption: do the pilot's asks generalize to other enterprise buyers, or are they one-off custom? If they generalize, the S-O and W-O path (tight scope, learn delivery, ring-fence part of the team for self-serve, S-T) is worth it. If they are bespoke, W-T says decline. Before committing, get the pilot's actual requirements in writing and test whether self-serve signups really decay when the team turns away. That verification, not the grid, is where the call is made.

## Why this framework fits

The board asked for SWOT by name, so a flat refusal would not help. Run caveat-first, the lens still earns its keep: pruning to the load-bearing few, separating evidence from assumption, and matching the lists into options surfaces a clear pivot (tight scope plus ring-fencing) and the one assumption that gates it. Unaided, "do a SWOT" produces the 20-item dump the field study condemned; the disciplined version produces a decision.
