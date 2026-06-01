# Backcast Path - Worked Example

A completed run of the `backcasting` skill on a real, consequential goal. This is the quality bar a generated backcast should meet.

---

## Goal under backcast

- **Desired future state:** It is 18 months from now. Northwind's self-serve free tier is the dominant top-of-funnel motion: a majority of new paid customers started self-serve, the free-to-paid path runs without sales touch for small accounts, and sales focuses on the larger deals that self-serve qualifies upward. The free tier pays for itself and the board target for self-serve-sourced revenue is met.
- **Horizon:** 18 months from now.
- **Goal status:** Chosen and validated. The decision to pursue a self-serve free tier has been made and compared against alternatives; this backcast maps the route to it, it does not re-litigate it.

## Success conditions (what is true in that future)

- A majority of new paid logos originate from self-serve, not outbound sales.
- Free-to-paid conversion for small accounts is fully self-serve, with no human touch required to upgrade.
- Self-serve-sourced revenue meets the board target, and gross margin on the free tier is positive after support and infra cost.
- Sales operates on a redesigned motion: it works deals that self-serve usage flags as expansion-ready, and comp rewards that.

## Summary (top of the artifact)

The desired future is a self-serve-led growth motion that meets the board's revenue target with a free tier that pays for itself. Working backward, the path turns on three milestones: a **profitable, instrumented free-to-paid funnel** (B-1), which requires a **launched and stable self-serve product with usage-based upgrade prompts** (B-2), which requires a **redesigned sales motion and unit-economics model agreed before any build** (B-3). The single most important next move now is to model the free-tier unit economics and agree the sales comp redesign with leadership, because every later milestone depends on those being settled first.

## Backcast path (future -> now)

Ordered backward: row 1 is closest to the goal, the last row is the next step today. Each milestone names the preconditions that had to be true just before it.

| Step (back) | Milestone (state reached) | Preconditions that had to be true first | Depends on | Owner |
|---|---|---|---|---|
| Future | Self-serve is the dominant motion; free tier pays for itself; board target met | - | - | - |
| B-1 | Free-to-paid funnel is profitable and instrumented; majority of new paid logos self-serve-sourced | Reliable attribution from free signup to paid; positive margin per free user; usage-based upgrade prompts converting at the modeled rate | B-2 | PM (Growth) |
| B-2 | Self-serve product launched and stable, with usage-based upgrade prompts live | A thin, secure self-serve signup/billing/upgrade flow shipped and load-tested; usage caps and cost controls in place; activation instrumented | B-3 | Eng lead + PM (Growth) |
| B-3 | Sales motion redesigned and free-tier unit economics agreed, before build | Validated unit-economics model (cost per free user, breakeven conversion); sales comp and lead-routing redesigned and signed off; ICP-fit definition for self-serve agreed | B-4 | VP Sales + RevOps + Finance |
| B-4 | Cross-functional commitment and a named owner secured | Exec sponsor; a growth PM with self-serve experience hired or assigned; success metrics and the board target made explicit | Now | Head of Product |
| Now | **Next concrete step (do now):** model the free-tier unit economics and convene sales + finance to agree the comp redesign and breakeven conversion rate | Current cost data, the existing sales comp plan, and one week of leadership time are available today | - | Head of Product |

**Column notes:**
- **Preconditions that had to be true first:** the load-bearing column. Note that B-2 cannot start until B-3's unit-economics model exists, which is why a forward plan that began with "build the product" would invert the real dependency.
- **Depends on:** each milestone points to the earlier (lower) milestone that produces its preconditions; the chain closes only because B-4 lands on an action available now.

## Open gaps and assumptions

- **Assumes the goal is right.** This backcast does not test whether self-serve is the correct strategy; that decision was made upstream. If it is wrong, this is a confident route to the wrong place.
- **Open gap:** B-1 assumes upgrade prompts convert at the modeled rate, but that rate is itself an assumption until B-3's economics work produces it - flagged so it is fixed, not buried.
- **Sequencing risk:** B-3 (economics + comp) is the true starting constraint, not the product build; if the org's instinct is to ship product first, the path will stall when economics turn out negative late.
- The path is a plausible route, not a forecast. Reality will diverge; revise the chain as milestones land or slip.

---

*Note how the value is in the reversal: backcasting put the unit-economics-and-comp milestone (B-3) *before* the product build, exposing it as the real starting constraint. A naive forward plan would have led with "build the self-serve product" and discovered the broken economics only after sinking the build cost.*
