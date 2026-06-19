---
title: "Belief-Update Routine - quick sample"
description: A belief-update ledger re-scoring a senior engineer's open architectural bets one quarter into a migration.
sidebar:
  label: belief-update-routine
---

> A compact worked example of [Belief-Update Routine](../../frameworks/think-belief-update-routine/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-belief-update-routine/).

## Situation

Daniel, a staff engineer, owns a six-month effort to move the payments service off a shared Postgres instance and onto a dedicated event-sourced store. At kickoff the team wrote down a handful of load-bearing bets that the plan depended on. It is now the end of the first quarter, real data has landed (a load test, a partial cutover, a vendor benchmark), and he wants a disciplined re-score of those bets rather than a vibe check in standup.

## Prompt

```text
/think-belief-update-routine "Quarterly re-score of the open architectural bets behind our payments migration. Four beliefs we set at kickoff: event-sourced store can hold p99 write latency under 50ms at peak, the dual-write window is safe for a quarter, the team can absorb the new ops burden without a hire, and the vendor's managed tier is cheaper than self-hosting at our volume. We now have a load test, a partial cutover, and a vendor invoice. Give me a ledger with explicit deltas and an under-updating guard."
```

## The artifact

# Belief-Update Ledger

## Ledger header

- **Review date:** 2026-06-19
- **Cadence:** Quarterly, or earlier on a forcing signal (a load-test result, a cutover incident, or a metric crossing a pre-set line)
- **Owner:** Daniel (staff engineer, payments platform)
- **Beliefs tracked:** 4 open - 0 resolved-this-cycle

## Belief portfolio (at-a-glance)

| # | Belief (one line) | Prior | Revised | Delta | Next review |
|---|---|---|---|---|---|
| 1 | Event-sourced store holds p99 write latency under 50ms at peak | 70% | 80% | +10 | 2026-09-19 (full-volume load test) |
| 2 | The dual-write window is safe to run for a full quarter | 75% | 40% | -35 | 2026-07-15 (post-incident review) |
| 3 | The team absorbs the new ops burden without a new hire | 60% | 45% | -15 | 2026-09-19 |
| 4 | Vendor managed tier is cheaper than self-hosting at our volume | 65% | 65% | no change | 2026-07-31 (first full-month invoice) |

---

## Belief entries (the detail)

### 1. The event-sourced store holds p99 write latency under 50ms at peak load

- **Prior confidence:** 70% (scored 2026-03-18, at kickoff)
- **Evidence accrued since last review:**
  - *For:* A staged load test at 1.5x current peak held p99 writes at 38ms (2026-05-22); the vendor's published benchmark at our event size landed at 41ms (2026-05-30).
  - *Against:* The test ran against a clean store with no compaction backlog, so it understates steady-state behavior (2026-05-22).
- **Revised confidence:** 80% - **up 10 points**
- **Reason for the size of the move:** Modest, deliberately. The direct measurement is genuinely good and clears the bar with headroom, which is why this moves up rather than sideways. Under-updating guard: is +10 too small given a clean pass? No, and over-moving would be the error here - the test omitted compaction pressure, so the strongest real-world stressor is still unmeasured. A jump to 90% would over-read a benign-conditions result.
- **Next-review trigger:** 2026-09-19 full-volume load test with a seeded compaction backlog.
- **Status:** open

### 2. The dual-write window is safe to run for a full quarter

- **Prior confidence:** 75% (scored 2026-03-18, at kickoff)
- **Evidence accrued since last review:**
  - *Against:* The partial cutover surfaced two silent write-skew incidents where the two stores diverged for ~40 minutes before reconciliation caught it (2026-06-05); the reconciliation job has no alerting, only a daily batch check (2026-06-05).
  - *For:* None material. Both incidents self-healed, but only because traffic was low.
- **Revised confidence:** 40% - **down 35 points**
- **Reason for the size of the move:** Large, and warranted. This is direct evidence against the exact property the belief asserts - safety of the window - and it is a class of failure (silent divergence) the design assumed could not persist undetected. Under-updating guard: the pull is to call these "early teething issues" and stay near 75%. That softening is precisely the conservatism this routine exists to catch. Two undetected divergences in a low-traffic partial cutover is a hard signal; -35 is the honest size, not pessimism.
- **Next-review trigger:** 2026-07-15 post-incident review after real-time reconciliation alerting ships (pulled earlier than the quarterly cadence - this belief crossed a safety line).
- **Status:** open

### 3. The team absorbs the new operational burden without a new hire

- **Prior confidence:** 60% (scored 2026-03-18, at kickoff)
- **Evidence accrued since last review:**
  - *Against:* On-call pages for the new store ran ~1.7x the old service in the first month, and two of four engineers are not yet able to debug the event log unaided (2026-06-10).
  - *For:* A runbook now covers the three most common pages, which should cut future toil (2026-06-12).
- **Revised confidence:** 45% - **down 15 points**
- **Reason for the size of the move:** Moderate. The added load is real and measured, but it is partly the expected ramp of a new system rather than a structural staffing gap, and the runbook plus on-call ramp-up may close some of it. A -15 records a genuine update without committing to "we need a hire" on one month of elevated pages while the team is still climbing the learning curve.
- **Next-review trigger:** 2026-09-19, after a quarter of runbook coverage and cross-training.
- **Status:** open

### 4. The vendor's managed tier is cheaper than self-hosting at our volume

- **Prior confidence:** 65% (scored 2026-03-18, at kickoff)
- **Evidence accrued since last review:** No material new evidence. The first invoice covered a partial month at staging volume, which is not representative of production cost. There is nothing here to update on yet.
- **Revised confidence:** 65% - **no change**
- **Reason for the size of the move:** Honest no-update. The only data point is a partial-month, staging-volume invoice that cannot speak to cost at production scale. This is the absence of decision-relevant evidence, stated as such, not stickiness - inventing a small bump from an unrepresentative invoice would be exactly the reflection theater this routine warns against.
- **Next-review trigger:** 2026-07-31, the first full-month production invoice.
- **Status:** open

---

*Value added: one quarter into the migration, this ledger re-scores the open bets against what has actually landed, and it does the two things an unaided "how's the migration going?" review usually skips. It states an explicit delta and direction on every belief - so you can see one moved up, one moved hard, one moderately, and one not at all - and on the dual-write belief it applies the under-updating guard to force a large move the prior would have resisted. The ledger makes no claim that re-scoring improves the migration's odds; its value is keeping the bets honest against the evidence and building a calibration trail across the cadences still to come. Its direct evidence is limited (see the framework's dossier).*

## Why this framework fits

Daniel is holding several consequential, still-open architectural bets while fresh evidence arrives unevenly across them, which is exactly the under-updating trap this skill targets: the dual-write divergence is easy to wave off as teething, and an informal review would likely leave that 75% nearly untouched. The ledger forces an explicit delta and a size justification on each bet, so the hard -35 gets made on purpose and an unrepresentative invoice is honestly logged as "no update" rather than a manufactured nudge.
