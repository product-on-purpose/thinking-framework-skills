# Constraint-Intervention Plan - Worked Example

A completed run of the `theory-of-constraints` skill on a real, consequential decision. This is the quality bar a generated plan should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) so examples across skills read as one coherent product. Where `iceberg-model` would descend a recurring problem to its structural causes and `stocks-and-flows-reasoning` would read whether an accumulation is rising or falling, this skill takes the new-account activation pipeline that the free-tier launch is about to flood and finds the single step that caps how many accounts reach first value. See `docs/internal/AUTHORING.md`.

---

## Problem under analysis

- **Problem as given:** "Activation is our bottleneck. New accounts take about six weeks to reach first value, and the free-tier launch is about to multiply signups. We are talking about hiring across onboarding, buying a better onboarding tool, and rewriting the docs. Where do we actually unblock throughput?"
- **The user's actual goal:** Get many more new accounts to first value per week, fast enough that the free-tier launch grows activated users rather than a backlog.

## Summary (top of the artifact)

Northwind's activation pipeline is a clear flow, and the team is about to spread effort across every step at once. The capacity-versus-demand table singles out one binding constraint: the **mandatory solutions-engineer (SE) provisioning review** that every new account must pass, which clears about 20 accounts per week against roughly 50 arriving - while the steps after it (training, go-live) sit starved. The plan is to **exploit** that review before spending (stop routing self-serve free-tier accounts through it at all, batch the reviews, and feed the SE only complete intake) and only **elevate** (hire a second SE) if it still binds afterward. Hiring across onboarding or buying a tool would have poured money into non-constraints and changed nothing. The plan also flags that exploiting this step will likely move the constraint downstream to training.

## System / flow

A new account passes through, in order:

1. **Signup and intake** - account created, intake form submitted.
2. **Solutions-engineer provisioning review** - an SE reviews each account's setup, data model, and security questionnaire and approves it for configuration. **Mandatory, every account.**
3. **Configuration** - the account is configured against the approved plan.
4. **Training and onboarding session** - the customer is walked through their workspace.
5. **Go-live / first value** - the customer runs their first real workflow.

## Capacity vs demand per step

| Step | Capacity (per unit time) | Demand placed on it | Starved or saturated? |
|---|---|---|---|
| Signup and intake | ~200 accounts/week (self-serve, automated) | ~50 accounts/week now; far more after free-tier launch | Matched (under-loaded) |
| **SE provisioning review** | **~20 accounts/week (2 SEs, manual, 4 hrs each)** | **~50 accounts/week** | **Saturated - queue building** |
| Configuration | ~60 accounts/week | ~20/week (only what the SE releases) | Starved (idle, waiting on review) |
| Training session | ~40 sessions/week | ~20/week (only what clears review) | Starved (idle) |
| Go-live / first value | ~as fast as accounts arrive configured | ~20/week | Starved |

Demand meets or exceeds capacity only at the SE provisioning review (50 arriving, 20 cleared). Every step downstream sits starved, idle while the queue in front of the SE grows - the signature of the binding constraint. Intake, the loudest source of complaints ("the form is clunky"), is not the constraint at all; it is under-loaded.

## Binding constraint (hypothesis)

- **The constraint:** the **mandatory solutions-engineer provisioning review** (step 2).
- **Evidence it binds:** it is the one step where demand (~50/week) exceeds capacity (~20/week); the configuration, training, and go-live steps after it are starved and idle, waiting on releases; the queue and the six-week lead time are almost entirely time spent waiting for this review. The free-tier launch raises demand on this step most of all.
- **If unproven:** here the table singles out one step cleanly, so the analysis proceeds. (Had two steps both been saturated with the rest starved between them, the plan would have declared the constraint unproven and stopped before exploit.)

## Exploit (before any spend)

Get maximum throughput from the existing two SEs before hiring or buying anything:

- **Stop routing self-serve free-tier accounts through the SE review at all.** Free-tier accounts are low-risk, single-user, on standard configuration - gate them with an automated checklist and reserve the human review for paid and enterprise accounts. This removes the bulk of the demand the launch would add.
- **Batch the reviews.** Group similar account types so the SE is not context-switching account by account; review standard setups in a single block.
- **Feed the SE only complete, validated intake.** Reject incomplete intake forms upstream automatically so no SE time is spent chasing missing data (today a large share of each review is back-and-forth on missing fields).
- **Offload the security-questionnaire portion** to a pre-filled standard response for low-risk tiers, so the SE reviews only genuine exceptions.

## Subordinate (everything else)

- Run intake, configuration, training, and go-live at the **pace the SE review can absorb**, not flat-out. There is no value in the intake team driving signups through faster, or the configuration team clearing its queue to zero - that only piles more inventory in front of the SE.
- **Local-efficiency habits to give up:** stop measuring the intake and configuration teams on their own throughput or utilization (a busy non-constraint is not progress); stop the "rewrite the docs" and "buy a faster onboarding tool" initiatives aimed at non-constraint steps - they cannot lift system throughput while the SE review caps it.

## Elevate (only if still binding after exploit)

Only if the SE review is *still* the binding constraint after the exploit moves above:

- Hire a second-tier SE (or train an existing configuration specialist to clear standard reviews), raising review capacity.
- Build tooling that automates the standard-configuration review entirely, leaving humans only the genuine exceptions.

Do not start here. If exploiting cuts paid-account review demand to within the existing two SEs' capacity, no hire is needed and the spend is avoided.

## Re-check trigger

Once the SE review is exploited (and free-tier accounts are routed around it), the constraint will very likely **move downstream to training** (capacity ~40 sessions/week), which becomes the new rate-limiter as far more accounts clear provisioning. Trigger: when the SE review queue stops growing and a queue starts building in front of training, return to step 2 and re-identify. Do not keep optimizing the SE review out of inertia once it is no longer the binding step.

---

*Note how the value is in refusing to spread effort evenly and refusing to chase the loudest step: the problem arrived as "hire across onboarding and buy a tool," and the loudest complaint was about the intake form. An unaided pass would have improved several steps at once. The capacity-versus-demand test singled out the one step that actually caps throughput, exploit-before-elevate avoided an unnecessary hire, the subordinate decision stopped wasted effort on non-constraints, and the re-check trigger flags that the win will move the constraint downstream rather than ending the problem.*
