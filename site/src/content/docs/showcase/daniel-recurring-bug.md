---
title: "Daniel traces a recurring bug"
description: A senior engineer adjudicates the rival causes of a bug that keeps coming back after each fix, weighing the evidence by diagnosticity instead of guessing again.
sidebar:
  label: "Daniel -> process tracing"
---

> **Daniel**, senior engineer at a ~200-person company. The decision: which rival cause actually drives a checkout 500 error that keeps reappearing after every "fix." Prompting style: organized.

This is a complete run, prompt to artifact. Framework: [Process Tracing](../../frameworks/think-process-tracing/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

The same class of bug - intermittent 500s on the checkout confirm endpoint - has been "fixed" three times in two months and keeps coming back. Each fix targeted a different suspected cause, shipped, looked clean for a week, then the errors returned. Daniel is done guessing; he wants to adjudicate the rival causes by the diagnostic weight of the evidence in the logs and traces, not by whichever theory is loudest in the channel.

## The prompt

```
/think-process-tracing "Outcome: intermittent HTTP 500s on POST /checkout/confirm,
~0.3% of calls, clustered in bursts. Recurs ~5-8 days after each fix. Single service
(checkout-api v3), single case = this recurring failure.

Rival hypotheses already tried and shipped:
  1. DB connection-pool exhaustion under load (raised pool size in fix #1)
  2. A race in the idempotency-key cache (added a lock in fix #2)
  3. Upstream payment-gateway timeouts surfacing as 500s (raised client timeout in fix #3)

Evidence available: structured logs, distributed traces (Jaeger), pool metrics,
GC logs, deploy timestamps, the payment-gateway status page, and the burst timestamps.

Adjudicate which cause the evidence actually supports - I keep fixing the wrong thing."
```

A short structured block: the outcome and case in one line, the three rivals already tried, the evidence on hand, and the ask. The framework supplies the diagnosticity discipline.

## The output

> **Rival-Explanation Evidence Ledger - Recurring checkout 500s**

> Evidence is weighed by diagnosticity, not by count. One decisive observation (a failed hoop, a smoking gun, a doubly-decisive find) outranks any amount of straw-in-the-wind support. Test types were assigned from the expected fingerprints stated before the evidence was graded - not after the find.

### Focal outcome and case

- **Outcome:** Intermittent HTTP 500s on `POST /checkout/confirm` (~0.3% of calls, in bursts), recurring 5-8 days after each of three shipped fixes.
- **Case:** This one recurring failure in `checkout-api v3`. N equals one - "why does THIS keep coming back?", not "what causes 500s in general."
- **Within-case check:** Single-case, backward-looking "why did this specific recurrence happen?" question. Confirmed in scope. The recurrence-after-fix pattern is itself a piece of evidence, not just a nuisance.

### Rival explanations and their mechanism chains

Three rivals were already tried in production. Each is made concrete as a mechanism chain, with the observable fingerprints stated before any evidence was graded. A fourth was added because the recurrence pattern fit none of the three.

#### Rival A: Connection-pool exhaustion under load
- **Mechanism chain:** traffic rises -> all pooled DB connections checked out -> new confirm requests wait, then time out acquiring a connection -> the handler throws and returns 500.
- **Expected fingerprints (stated first):** 500 bursts should coincide with traffic peaks and with pool-utilization hitting 100%; logs should show `connection acquisition timeout`; raising the pool size (fix #1) should have moved the ceiling and changed the burst rate.

#### Rival B: Race in the idempotency-key cache
- **Mechanism chain:** two concurrent retries with the same idempotency key -> both miss the cache -> both write -> the second write violates the unique constraint -> the handler 500s.
- **Expected fingerprints:** 500s should carry a `duplicate key` / constraint-violation error; the two offending spans should overlap in time on the same key; the lock added in fix #2 should have eliminated the overlap.

#### Rival C: Upstream payment-gateway timeouts
- **Mechanism chain:** the gateway slows or times out -> the confirm call exceeds the client deadline -> the exception is not caught as a gateway error -> it surfaces as a generic 500.
- **Expected fingerprints:** 500 bursts should align with gateway latency spikes on its status page; traces should show the time spent in the gateway span, not in our code; raising the client timeout (fix #3) should have converted some 500s into slow-but-successful confirms.

#### Rival D: Connection leak from a code path that only runs after a deploy settles
- **Mechanism chain:** a handler branch (a rarely-hit refund-on-failure path) acquires a pooled connection and never returns it on one error branch -> leaked connections accumulate slowly -> ~5-8 days post-deploy the pool is silently starved -> confirm requests fail. Each "fix" deploy resets the pool, which is why the clock restarts.
- **Expected fingerprints:** pool free-connection count should trend monotonically downward across days, independent of traffic; the decline should reset to full at each deploy timestamp; the leak should trace to one branch; the 5-8 day recurrence should match the time to exhaust the pool at the leak rate.

### Evidence typed per rival

Each item typed against the rivals by certainty (must we see this if the rival is true?) and uniqueness (could the others produce it too?). The expected-fingerprint column was predicted before each find.

| Evidence item | Expected fingerprint (stated first) | Diagnosticity | Test type | Effect on rivals |
|---|---|---|---|---|
| Pool free-connection count declines monotonically from ~50 to 0 over the 5-8 days after each deploy, then snaps back to 50 at the next deploy timestamp - sawtooth, independent of daily traffic | D predicted a monotonic post-deploy decline resetting at each deploy | If D is true we MUST see the sawtooth (certain); a load-driven A would track traffic and recover overnight, not decline monotonically for days (unique to D) | **Doubly decisive** for Rival D | D confirmed; A, B, C cannot produce a deploy-anchored monotonic leak |
| 500 bursts do NOT coincide with traffic peaks; the worst burst hit during an overnight low-traffic window 6 days post-deploy | A predicted bursts at traffic peaks with pool at 100% under load | Certain test for A: if exhaustion were load-driven, bursts must track load; an off-peak burst fails it | **Hoop** for A (A fails) | A eliminated as the driver - the exhaustion is real but not load-caused |
| 500 error payloads are `connection acquisition timeout`, not `duplicate key`; zero constraint-violation errors in the window | B predicted duplicate-key / constraint-violation errors on the 500s | Certain for B: a cache race must surface as a key collision; their total absence fails it | **Hoop** for B (B fails) | B eliminated |
| Gateway status page shows no latency incidents across the bursts; traces show the failing requests never reach the gateway span - they die acquiring a DB connection first | C predicted bursts aligned to gateway latency, time spent in the gateway span | Certain for C: a gateway-timeout cause must show time in the gateway; dying before that span fails it | **Hoop** for C (C fails) | C eliminated |
| The leak traces to the refund-on-failure branch in `ConfirmHandler`: it acquires a connection, and on the `PaymentDeclined` error path returns before `conn.release()` | D predicted the leak isolates to one branch that skips release on an error path | Unique to D - this exact branch leaking a connection is D's mechanism, nothing else predicts it | **Smoking gun** for Rival D | D strengthened to confirmed-with-mechanism |
| Each prior "fix" deploy reset the sawtooth, which is why every fix "worked" for ~a week regardless of what it changed | D predicted each deploy resets the decline (the clock restart) | Consistent with D and explains the recur-after-fix pattern; not certain on its own (any deploy resets state) | **Straw in the wind** for D | D nudged up; explains why A/B/C fixes appeared to work |

### Running status per rival

| Rival | Status after the typed evidence | What decided it |
|---|---|---|
| Rival A: pool exhaustion under load | **eliminated as driver** | failed the load-coincidence hoop - the worst burst was off-peak; exhaustion is real but not load-caused |
| Rival B: idempotency-cache race | **eliminated** | failed its hoop - zero duplicate-key / constraint errors in the window |
| Rival C: gateway timeouts | **eliminated** | failed its hoop - no gateway latency incident; failing requests never reach the gateway span |
| Rival D: connection leak in the refund-on-failure branch | **confirmed** | the doubly-decisive deploy-anchored sawtooth plus a smoking-gun on the exact non-releasing branch |

### Surviving explanation and residual uncertainty

- **Surviving explanation:** The recurring 500s are caused by a **connection leak in the `ConfirmHandler` refund-on-failure branch** (Rival D): the `PaymentDeclined` error path returns without releasing its pooled connection, so the pool drains monotonically over 5-8 days until confirm requests can no longer acquire a connection. Each prior fix only "worked" because the deploy reset the pool - the recur-after-fix pattern was the tell.
- **Residual uncertainty:** The leak rate is inferred from the sawtooth slope, not measured directly; whether the `PaymentDeclined` path is the only leaking branch is not yet proven (a second slow leak could hide under the same trend). The fix is to release on every branch, but the residual question is whether free-connection count then stays flat across a full deploy-free interval.

### Most decisive missing observation

Patch the `ConfirmHandler` to release the connection on the `PaymentDeclined` path, deploy, then watch pool free-connection count across a full 8-day window with no further deploys. If the sawtooth flattens to a stable line and no 500 burst appears past day 8, that is a doubly-decisive confirmation of Rival D and rules out a second hidden leak. If the count still trends down (even slowly), there is another non-releasing branch and the trace-for-unreleased-connections sweep becomes the next thing to run. This single forward observation settles the residual better than any further mining of the existing logs.

---

> **Evidence caveat.** This ledger is a structured single-case adjudication aid, not a measured accuracy improver. The method's governing evidence tier is **P (practitioner)**: process tracing has a deep, peer-reviewed methodological literature on inferential validity in case-study research, but there is no controlled trial showing that using it improves reasoning accuracy, for humans or for agents, and the evidence is transferred from human case-study methodology and is not agent-validated. The nearby controlled evidence is negative and belongs to the cousin method ACH; it sets no tier here. Treat this as a disciplined way to discriminate rival explanations and to name the next decisive observation, not as proof that the surviving explanation is correct.

## Why this prompt worked

Daniel named the **single recurring outcome** and gave the **three rivals he had already tried**, which let the framework treat each shipped "fix" as a falsifiable mechanism chain instead of a settled fact. Listing the **available evidence** (traces, pool metrics, deploy timestamps) let the typing pick decisive items - a failed hoop eliminated each load/race/gateway theory, and the deploy-anchored sawtooth was doubly decisive. The recurrence-after-fix pattern, which had read as bad luck, became the clue once it was forced into a mechanism.

## What happened next

Daniel shipped the one-line release fix on the `PaymentDeclined` branch and, on the ledger's instruction, did not declare victory at the usual one-week mark - that mark had fooled the team three times. He held the pool-utilization graph open across a full deploy-free interval; the sawtooth flattened and stayed flat past day 8, which was the doubly-decisive confirmation the ledger had asked for. He pasted the ledger into the postmortem so the next on-call would see why the earlier three fixes only appeared to work, and added a leaked-connection alert on the monotonic trend so the next leak would be caught in hours, not days. When a different team later asked him to recommend a framework for an unrelated incident, he pointed them at the [framework advisor](../../tools/think-framework-advisor/) to route the situation rather than guess at the tool.
