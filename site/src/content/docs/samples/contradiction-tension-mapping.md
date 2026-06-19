---
title: "Contradiction / Tension Mapping - quick sample"
description: Contradiction / Tension Mapping on a platform team caught in a chronic ship-fast versus stay-stable pendulum.
sidebar:
  label: contradiction-tension-mapping
---

> A compact worked example of [Contradiction / Tension Mapping](../../frameworks/think-contradiction-tension-mapping/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-contradiction-tension-mapping/).

## Situation

Daniel is a staff engineer on a platform team that serves a dozen product squads. Every few quarters the team lurches: a string of incidents triggers a "stability first" clampdown with heavy review gates and a change freeze, velocity craters, the product squads revolt about being blocked, leadership swings to "ship faster," the gates come off, and within two quarters the incidents return. Each swing is treated as a fresh problem to fix, and each fix sets up the next swing. Daniel wants to stop the pendulum, not win one side of it.

## Prompt

```text
/think-contradiction-tension-mapping "Platform team. We keep oscillating between a stability clampdown (review gates, change freezes, velocity tanks, squads furious about being blocked) and a ship-faster push (gates off, incidents climb again two quarters later). Every swing is treated as a one-off fix and each fix causes the next swing. Constraints: shared infra, 12 dependent squads, on-call already stretched. Tried: a stricter change-approval process (it just slowed everyone), then a 'you build it you run it' push (incidents went up). Help me map this as a tension to manage instead of a problem to keep re-solving."
```

## The artifact

> This map manages a tension; it does not resolve it. Do NOT collapse it into "pick one pole." If the situation has a right answer, a dissolvable trade-off, or a real choice, stop and route it (see the diagnosis below). The payoff is staying in the upper half of both poles over time, caught early by the warning signs and corrected by the action steps.

### Diagnosis: polarity or problem?

- **Is this an unsolvable, interdependent polarity, or a solvable problem / dissolvable trade-off / real choice?** A polarity. Delivery speed and platform stability are both permanent sources of value for the team, and neither can be abandoned without eventually summoning the other's downside.
- **Interdependence test:** Would going all-in on shipping speed with zero stability investment (or all-in on stability with zero throughput) be a loss? Yes. Pure speed forfeits the reliability that makes the platform worth depending on and the on-call sanity that keeps people; pure stability forfeits the throughput that justifies the platform's existence and the squads' trust that it will unblock them. Each pole's strength is the other pole's blind spot - a true polarity.
- **If not a polarity:** n/a (it passed). A specific dissolvable trade-off - for example "make the deploy pipeline both fast and safe" via progressive rollout and automated rollback so the speed/risk conflict disappears for that path - would go to `think-contradiction-resolution`. The narrower one-time call "do we adopt change-freeze policy X or Y" is a real choice and would go to `think-decision-option-review`. This map is for the standing speed-versus-stability tension that persists after those are settled.

### The tension

- **Pole A:** Delivery speed / throughput - ship changes fast, keep the squads unblocked, minimize the friction between an idea and production.
- **Pole B:** Platform stability / reliability - protect uptime and on-call health, keep the shared infrastructure dependable for the squads that build on it.

(Neither pole is the villain. The team legitimately wants both fast delivery *and* a dependable platform; the trouble is over-investing in one until the other's strengths atrophy.)

### Greater purpose and deeper fear

- **Greater purpose (top):** A platform the product squads can move fast on *and* trust to stay up - so the company ships features quickly without paying for it in outages, and the platform earns the right to keep existing.
- **Deeper fear (bottom):** The worst of both - a slow, gate-bound platform that *still* has frequent incidents, where squads route around it, on-call burns out and quits, and leadership concludes the platform team is the bottleneck. The downside of both poles at once.

### The four quadrants

|  | **Pole A: Delivery speed / throughput** | **Pole B: Platform stability / reliability** |
|---|---|---|
| **Upside** (positive results of focusing here) | Squads ship fast and stay unblocked; the platform feels like an accelerator, not a tax; fast feedback loops, quick iteration, and goodwill from the teams it serves; the platform proves its value in throughput. | Dependable uptime and a calm on-call rotation; squads can build on shared infra without fearing it will break under them; predictable behavior, low incident load, and trust that compounds over time. |
| **Downside** (what goes wrong when you over-focus here and neglect the other) | Incidents and regressions climb; on-call is overwhelmed and people burn out; technical debt and fragility accrete; the platform becomes a reliability liability that the squads no longer trust. | Heavy gates and freezes choke throughput; squads are blocked and furious; the platform becomes a bureaucratic bottleneck people route around with shadow infra; the team is seen as the thing slowing the company down. |

(Interdependence check: the **downside of speed** - rising incidents, on-call burnout, fragility - is exactly corrected by the **upside of stability**; the **downside of stability** - choked throughput, blocked squads, bottleneck reputation - is exactly corrected by the **upside of speed**. They interlock, confirming a true polarity.)

### Early-warning signs (you have over-leaned into one pole)

| Pole | Observable signals you are sliding into this pole's downside |
|---|---|
| Pole A: Delivery speed / throughput | Change-failure rate and incident count climb; mean-time-to-restore creeps up; on-call pages per week rise and the rotation starts dropping out or escalating; "the platform broke our deploy" recurs in squad retros; error budgets are blown for consecutive weeks. |
| Pole B: Platform stability / reliability | Lead time for changes and PR-to-prod time stretch; the change-approval queue backs up; squads stand up their own shadow infra to bypass the gates; "we're blocked on platform" recurs in squad standups and planning; deploy frequency drops while incident count is already low. |

### Action steps (gain the upside, pull back toward the neglected pole)

| Pole | Steps to gain or keep this pole's upside, and to correct back toward the other pole when warnings fire |
|---|---|
| Pole A: Delivery speed / throughput | Invest in self-service paths, progressive rollout, and fast safe-by-default pipelines that let squads ship without a human gate; keep PR-to-prod time low. *When A's warnings fire (incidents and pages climbing):* spend the next reliability budget on the failing surfaces - more tests in the risky path, tighter rollback, an SLO and error budget on the worst service - rather than adding a blanket freeze. |
| Pole B: Platform stability / reliability | Run SLOs, error budgets, and automated rollback so reliability is earned by the system, not by manual gates; keep on-call load bounded. *When B's warnings fire (lead time stretching, shadow infra appearing):* remove or automate the heaviest gate, raise the error-budget headroom for low-risk change classes, and re-fund self-service so squads stop routing around the platform. |

### How this map will be used over time

The platform team reviews the map at each quarterly planning cycle and watches the two warning-sign rows on a shared reliability/flow dashboard (change-failure rate, MTTR, pages-per-week, error-budget burn for Pole A; lead time, approval-queue depth, shadow-infra sightings, deploy frequency for Pole B). When a row trips its threshold, the corresponding action steps are triggered *that quarter* - the map is what tells the team it has leaned too far and which way to correct, before the next incident wave or squad revolt forces a panic swing. It is an input to the concrete quarterly calls (where the next reliability-vs-developer-experience headcount goes, which gate gets automated away, how much error-budget headroom each change class gets), not a license to fund both equally forever: each quarter still makes a real allocation, deliberately, with the goal of oscillating around the productive upper half of both poles rather than lurching into either downside.

*Evidence caveat: this method ships at tier C - conceptually plausible but under-tested. The evidence supports the idea of a both/and orientation toward a genuine polarity; it does not show that filling in a polarity map measurably improves decisions, and all of it is from human subjects, not AI-augmented use. Treat the map as a structure for managing a real tension, not as a proven decision-improver. See the [framework page](../../frameworks/think-contradiction-tension-mapping/) for the full grading.*

## Why this framework fits

The team kept treating a permanent, interdependent tension as a fresh problem to solve each quarter, which is precisely what manufactures the destructive pendulum. The map converts that reflex into a managed loop: named poles, shared purpose and fear, interlocking quadrants, and - the part unaided thinking rarely produces - concrete early-warning signs and action steps that catch a lean before it becomes the next incident wave or squad revolt and tell the team which way to correct.
