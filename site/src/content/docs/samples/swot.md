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

Lena runs a six-store regional bookstore chain. A board member has asked for "a SWOT on whether we should launch online ordering." Lena knows SWOT has a bad reputation for producing long lists nobody acts on, so she wants it run with the discipline that makes it useful, not a 20-item dump.

## Prompt

```text
/think-swot "Board asked for a SWOT on whether our six-store bookstore chain should launch online ordering. Run it honestly and turn it into options."
```

## The artifact

> **Evidence caveat (read first):** SWOT is tier X; bare grids "did not constitute analysis" (Hill and Westbrook 1997). What follows is worth reading only because it is pruned, tagged, and matched into options.

### Situation

- Should the chain launch online ordering to defend against e-commerce erosion?

### The grid

| Internal | External |
|---|---|
| **Strengths**<br>- (*) Loyal local customer base and staff curation `[evidence]`<br>- Six pickup points already in the region `[evidence]` | **Opportunities**<br>- (*) Customers asking to reserve online, collect in store `[evidence]`<br>- Local-author events could anchor a site `[assumption]` |
| **Weaknesses**<br>- (*) No inventory system shared across stores `[evidence]`<br>- Thin margins leave little to fund a build `[evidence]` | **Threats**<br>- (*) National e-commerce undercutting on price `[evidence]`<br>- A full webshop invites a price war we lose `[assumption]` |

### Priorities

- Internal: the missing shared inventory system is the binding constraint; the pickup network is the underused asset.
- External: "reserve online, collect in store" is the reachable opportunity; a head-on price war is the threat to avoid.

### TOWS matching

| Match | Strategic option |
|---|---|
| **S-O** | Use the six pickup points for a reserve-and-collect service, not a full webshop. |
| **S-T** | Compete on curation and local events, not price, where national sellers cannot follow. |
| **W-O** | Build a lightweight shared-inventory view first; reserve-online is impossible without it. |
| **W-T** | Avoid a full price-exposed webshop given thin margins; stay reserve-and-collect. |

### What to do next

- The strongest path is W-O then S-O: a thin shared-inventory view, then reserve-and-collect on the existing pickup network, which sidesteps the price war (S-T, W-T). Before committing, verify the two starred assumptions: confirm demand for reserve-and-collect, and test whether local-author events actually anchor the site. That verification, not the grid, is where the decision turns.

## Why this framework fits

The board asked for SWOT by name, so a flat refusal would not help. Run caveat-first, the lens still earns its keep: pruning to the load-bearing few, separating evidence from assumption, and matching the lists into options surfaces a reachable strategy (reserve-and-collect) and the one assumption that gates it. Unaided, "do a SWOT" produces the 20-item dump the field study condemned; the disciplined version produces a decision.
