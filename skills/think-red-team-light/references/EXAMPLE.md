# Adversarial Critique - Worked Example

A completed run of `think-red-team-light`, on the shared Northwind scenario. This is the quality bar a generated critique should meet.

> Northwind is a B2B SaaS and the team has reached easy consensus that the free tier is the answer. Here the skill attacks that thesis.

---

## Thesis under attack

- Launching a self-serve free tier is the best way for Northwind to hit the Q3 growth target, because it lowers the barrier to entry and competitors already have one.

## Strongest objections (ranked by force)

| Rank | Objection (steelmanned) | Damage if true | How the thesis must answer it | Can it? |
|---|---|---|---|---|
| 1 | The conversion drop is a funnel/ramp problem, not a packaging gap; a free tier adds cost without fixing the actual cause | Fatal - the whole rationale collapses and money is spent on the wrong problem | Show data that packaging, not onboarding or new-rep ramp, drives the drop | Not yet; the data has not been checked |
| 2 | Free-to-paid economics at our ICP are unproven; a large non-converting free cohort breaks unit economics | Severe - growth in signups with negative margin is worse than no growth | Cite or pilot ICP free-to-paid conversion and cost-per-free-user | Not yet; no pilot run |
| 3 | "Competitors have one" is imitation, not strategy; their economics and ICP may differ from ours | Moderate - removes the main external justification | Show why it works for our model specifically | Weakly |
| 4 | A 6-week build risks shipping an insecure billing/auth path under time pressure | Moderate - reputational and security risk | Commit to a security gate and scope cut | Yes, if disciplined |

## Verdict

- **Decisive objections:** #1 and #2. Either, if true, sinks the plan. Both are currently unanswered and both are cheaply testable (data check + small pilot) before committing.
- **Survivable objections:** #3 (weakens the case but not fatal) and #4 (manageable with a gate).
- **Genuine dissent needed?** Given this is a near-one-way-door, board-visible decision, yes: before committing, get a real dissenter (someone who genuinely believes the funnel-fix thesis) to argue #1, rather than relying on this constructed critique alone.

---

*Note: the value is ranking #1 and #2 as decisive and noting both are unanswered yet cheap to test. The honesty flag matters here: the model can articulate the counter-case, but on a one-way door the team should still hear it from someone who actually holds it.*
