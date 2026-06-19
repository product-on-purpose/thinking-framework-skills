---
title: "Consider the Unknowns - quick sample"
description: A known-unknowns ledger that re-rates an engineer's confidence in a one-shot database cutover built from thin pre-production evidence.
sidebar:
  label: consider-the-unknowns
---

> A compact worked example of [Consider the Unknowns](../../frameworks/think-consider-the-unknowns/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-consider-the-unknowns/).

## Situation

Daniel, a staff engineer at a ~200-person company, is signing off on a one-shot cutover that moves the orders service from a single Postgres instance to a sharded cluster during a four-hour Sunday window. The plan rehearsed clean in staging twice, and the team is confident the cutover will land inside the window with no data loss. But staging runs at a fraction of production volume and never carries real Black-Friday-shaped traffic, so the confidence rests on a thin, coherent slice of evidence with no comparable prior cutover to anchor against.

## Prompt

```
/think-consider-the-unknowns "Signing off Sunday's orders-DB cutover to the sharded cluster. Two clean staging rehearsals, team's at ~85% it lands in the 4-hour window with zero data loss. But staging is a fraction of prod volume and we've never done this exact migration before. What are we not looking at, and is 85% honest?"
```

## The artifact

# Known-Unknowns Ledger

> The unknowns listed are RELEVANT and ABSENT: variables not in hand that bear on the call, not a restatement of claims already present. Time-box the enumeration - the space of what you do not know is unbounded; this ledger covers the unknowns that matter, not all unknowns.

---

## Judgment under consideration

- **Judgment:** "Sunday's cutover to the sharded cluster will complete inside the four-hour window with zero data loss, so we sign off and proceed as planned."
- **Original confidence:** High - the team put it at about 85%.
- **Why an unknowns audit fits here:** This is a one-off, consequential call built from a thin, coherent slice of evidence - two staging rehearsals at a fraction of production scale and the team's prior that a rehearsed runbook holds. There is no clean reference class for "will THIS migration of THIS service land in window," the bet is a one-way door once the cutover starts, and the 85% feels driven as much by two tidy rehearsals as by evidence about how the plan behaves under real load. Classic omission-neglect setup.

## Wall check (confirmed before building the ledger)

- [x] No genuine reference class exists - "this service's first shard migration" is a single case, not a base-rate class of comparable cutovers we can score.
- [x] Not an interval-width task - this is a discrete go/no-go judgment, not a numeric estimate with a stated range to widen.
- [x] The unknowns are NOT all cheap to resolve - some (backfill rate at prod scale, rollback timing) are partly testable before Sunday; the decisive ones are not knowable until the live run.
- [x] The judge is plausibly OVERconfident, not underconfident - 85% off two clean low-volume rehearsals is the target case.
- [x] Consequential and not trivially reversible - once writes cut to the new cluster under live traffic, rolling back is itself a risky, time-pressured operation.

## The unknowns

The relevant variables that bear on the "lands in window, zero data loss" judgment but are not in hand.

| Unknown variable | Bearing (how much it would move the call) | Obtainability (resolvable, at what cost / unobservable) | Resolve before committing? |
|---|---|---|---|
| Backfill / data-copy throughput at real production row counts | High - the four-hour window assumes a copy rate only ever measured at staging volume | Resolvable - dry-run the copy step against a production-sized snapshot or a read replica, timed | Yes - this is the load-bearing timing assumption and it is testable |
| How the new sharded cluster behaves under live write traffic, not synthetic load | High - shard hotspots or lock contention under real traffic could blow the window or corrupt writes | Mostly unobservable before Sunday - real traffic only exists in production; staging never reproduced it | No (cannot fully resolve now) - becomes an irreducible unknown the confidence must absorb |
| Rollback duration and whether rollback is clean mid-cutover | High - if the abort path is slow or lossy, "zero data loss" depends on never needing it | Resolvable - rehearse the rollback path itself (not just the forward path) and time it on staging | Yes - cheap and the rehearsals only exercised the happy path |
| In-flight orders and dual-write consistency during the switch | High - a gap or double-apply at cutover is silent data loss that no smoke test catches | Resolvable - design and test a reconciliation check that runs against the cutover boundary | Yes - decisive for the "zero data loss" half of the claim |
| Downstream consumers (analytics, fulfillment) holding the old connection string or schema assumptions | Medium - a missed consumer fails after sign-off, outside the window's view | Resolvable - audit the service dependency graph and connection inventory | Yes - cheap, and an obvious omission once named |
| Whether the on-call and DBA staffed for the window have done a real cutover before | Medium - improvisation cost under pressure shapes whether a surprise stays inside four hours | Resolvable - confirm the roster and pre-brief; run a tabletop on the abort criteria | Yes - cheap |
| Sunday's actual traffic level (low, but not zero, and not the rehearsal's zero) | Low-medium - shifts how much live-traffic risk is in play during the window | Partly resolvable - historical Sunday-window traffic curves; coarse | No - coarse, and the live-behavior unknown above already carries this |

- **Resolve-before-committing list (high bearing AND resolvable):** (1) Time the backfill against a production-sized snapshot to validate the four-hour window against real row counts; (2) rehearse and time the ROLLBACK path, not just the forward path; (3) build and test a cutover-boundary reconciliation check for in-flight and dual-written orders; (4) audit downstream consumers for stale connection strings or schema assumptions. These are obtainable before Sunday and each could change go to no-go.
- **Irreducible unknowns (high bearing but unobservable):** How the sharded cluster actually behaves under live production write traffic. No pre-Sunday work fully reproduces it; it is the uncertainty the confidence has to honestly carry, and it argues for a staffed abort criterion rather than a one-way commit.

## Re-rated confidence

- **Re-rated confidence:** Medium - roughly 60%, pending the four resolve-first items, with an explicit abort criterion in place for the live-traffic unknown.
- **Delta from original:** Down from ~85% to ~60% (a meaningful drop).
- **Reason the delta is this size:** The original 85% rested on two rehearsals that only ever exercised the FORWARD path at a fraction of production volume - so the window-timing assumption, the rollback path, and the zero-data-loss claim at the cutover boundary were each confidence built on a gap, not on evidence held. The drop is meaningful but not total because the runbook itself is genuinely sound and the team is strong - the audit cuts the confidence that came from never having timed the copy at scale or tested the abort path, not the confidence that came from real rehearsal. If the four resolve-first items come back clean, confidence can rise again on a firmer basis; if the backfill is too slow or rollback is lossy, this ledger has done its job by catching it before a one-way door, not after.

---

## Evidence caveat (ships with every ledger)

> This ledger is a calibration aid, not a measured improvement in the decision's outcome. Its evidence tier is **M (moderate)**: the move that listing relevant unknowns before stating confidence reduces overconfidence selectively (where the judge is overconfident) has direct controlled support (Walters, Fernbach, Fox and Sloman, 2017) plus an independent mechanism line (omission neglect; Kardes et al., 2006). It is M and not S because the exact prompt rests on a single research line with no named independent replication, on student and online-panel populations. All of that evidence is **transferred from human studies and has not been validated on AI agents**. The move does NOT repair the width of a numeric interval (Ferretti, Montibeller and von Winterfeldt, 2023), and it is no substitute for a real reference class when one exists. Treat the re-rated ~60% as a more honest confidence, not a proven-more-accurate one.

## Why this framework fits

The cognitive job here is to make the absent evidence an object of attention: two clean rehearsals feel like proof, so the team never noticed that the window-timing, rollback, and zero-data-loss claims were each built on what was not tested. The ledger gives Daniel a sorted action list - the high-bearing, resolvable unknowns to close before Sunday - plus an honest 60% that names the one irreducible unknown to staff an abort criterion against, neither of which an unaided "it rehearsed clean" read would surface.
