# Argument Map - Worked Example

A completed run of `think-argument-mapping`, on the shared Northwind scenario. This is the quality bar a generated map should meet.

> Northwind is a B2B SaaS. Here the skill maps the argument in the memo advocating the free tier, to test whether it actually holds together.

---

## Contention

- Northwind should launch a self-serve free tier to hit the Q3 growth target.

## Map

- **Reason 1:** A free tier will sharply increase signups.
  - *Co-premise (unstated):* The people who sign up for free are the people we want (ICP-fit), not tire-kickers.
  - *Objection:* Competitor free tiers attract mostly non-ICP users. -> *Rebuttal:* We can gate it (but then it is not really "self-serve free").
- **Reason 2:** More signups will increase revenue.
  - *Co-premise (unstated):* Free-to-paid conversion at our ICP is high enough to outweigh free-tier cost.
  - *Objection:* Our current trial-to-paid conversion is falling, which predicts low free-to-paid too.
- **Reason 3:** Competitors all have a free tier.
  - *Co-premise (unstated):* Their economics and ICP resemble ours (so imitation is valid).
- **Objection to the contention:** The Q3 growth shortfall may be a funnel problem, not a packaging gap, in which case a free tier adds cost without fixing the cause. -> *Rebuttal:* None offered in the memo.

## Weak links and unsupported premises

| Link or premise | Problem | What it would need to hold |
|---|---|---|
| Co-premise of Reason 2 (ICP free-to-paid conversion) | Load-bearing and unsupported; the whole revenue case rests on it | A pilot showing ICP free-to-paid covers free-tier cost |
| Reason 3 -> contention | Imitation is not an argument; assumes comparable economics | Evidence competitors' free tiers actually pay off, and that ours would too |
| Unaddressed objection (funnel vs packaging) | The argument never rules out the cheaper alternative explanation | Data that packaging, not the funnel, drives the shortfall |

## Verdict

The structure is not yet valid: the contention follows only if the Reason-2 co-premise (ICP conversion economics) holds and the funnel-vs-packaging objection is answered, and the memo supports neither. Reason 3 is imitation dressed as logic. For the argument to hold, run the conversion pilot and rule out the funnel explanation - i.e. the case is currently fluent but unsound.

---

*Note: the value is exposing that the entire revenue case rests on one unstated, untested co-premise (ICP free-to-paid economics) and that the strongest objection was never addressed - both invisible in the smooth prose of the original memo.*
