---
title: "Argumentation Schemes with Critical Questions - quick sample"
description: Classify-then-probe one defeasible argument - a security consultant's say-so driving a database migration - and read whether its presumption survives.
sidebar:
  label: walton-argumentation-schemes
---

> A compact worked example of [Argumentation Schemes with Critical Questions](../../frameworks/think-walton-argumentation-schemes/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-walton-argumentation-schemes/).

## Situation

Daniel is the staff engineer on a 200-person company's platform team. They are deciding whether to move the primary user store off self-managed Postgres onto a managed cloud database. A hired security consultant delivered a one-line verdict in the review: "Self-managed Postgres is a liability at your scale - you should migrate to the managed service." That sentence has started to settle a six-figure, hard-to-reverse decision, and Daniel wants to know whether it can carry that weight before the team commits.

## Prompt

```
/think-walton-argumentation-schemes "A security consultant we hired told us 'self-managed Postgres is a liability at your scale, migrate to the managed service.' That one line is basically driving our migration decision now. Before we commit, is that argument actually strong enough to lean on, or are we taking an expert's say-so further than it goes?"
```

## The artifact

# Scheme Critique Sheet

> **Evidence caveat (ships with every sheet, by construction).** This verdict is a *presumptive,
> burden-of-proof* read, not a soundness proof. The method is graded **tier P (practitioner)** on
> this library's conservative rule: the supporting evidence is a 30-year theoretical literature, a
> formal adoption line, and two controlled CLASSROOM-INSTRUCTION studies (Song and Ferretti 2013;
> Nussbaum and Edwards 2011) - an adjacent claim measured on human students over weeks of teaching,
> not on a single application of the method, and not on AI agents. The evidence is transferred from
> human contexts and untested for agent use. An answered checklist is not proof; naming the scheme
> is not a refutation. Treat the verdict as a disciplined defeater-coverage read, never a guarantee.

---

## Gate (confirm before proceeding)

- **Single, short, presumptive argument?** Yes. The argument is a one-step inference from an authority's say-so to an action recommendation. It is not a multi-premise structure (no whole-argument tree to lay out, so not `think-argument-mapping`) and not a deductive or statistical proof. It is a textbook presumptive move, so the scheme method fits.

## 1. The argument, restated

- **Conclusion:** The team should migrate the primary user store off self-managed Postgres onto the managed cloud service.
- **Stated premises:** A hired security consultant asserted that "self-managed Postgres is a liability at your scale." Therefore the team should migrate to the managed service.

## 2. Scheme classification (stated and contestable)

- **Scheme:** Appeal to expert opinion (argument from authority). The argument's whole force is "a hired security expert asserted it, so presumably accept it and act on it."
- **Runner-up scheme:** Practical reasoning ("we have a security goal, the migration achieves it, so do the migration"). The conclusion is action-shaped, so a means-to-end reading is available - but the load-bearing premise as stated is the consultant's say-so, not an independently established goal-and-means chain, so appeal to expert opinion is the better fit.
- **Match confidence:** High. The recommendation is explicitly "the consultant told us," and the decision is riding on that say-so. (The runner-up is named because if the team were actually reasoning from its own security goal rather than from the consultant's authority, the keyed questions would shift to the practical-reasoning battery - so the classification is left contestable.)

## 3. Instantiated premise slots

The appeal-to-expert-opinion premise template, filled against the argument.

| Premise slot (required by the scheme) | Instantiated against this argument | Stated or implicit? |
|---|---|---|
| Source E is an expert | The author is a hired security consultant | Stated |
| E is an expert in the relevant field F | The recommendation spans *both* security risk *and* database/cloud operations and cost; security is the consultant's field, operations and cost may not be | Implicit - the field of the conclusion is broader than the field of the credential |
| E actually asserted proposition A | E asserted "self-managed Postgres is a liability at your scale" | Stated (but A is a risk judgment, not "therefore migrate") |
| A falls within E's domain of competence | Security liability assessment is within a security consultant's competence | Stated, plausibly |
| E is trustworthy and unbiased | Unaddressed - whether the consultant has a referral relationship or preferred-vendor incentive is not examined | Implicit / missing |
| A is consistent with what other experts say | Unaddressed - no second opinion (a DBA, an SRE, a cost owner) is cited or compared | Implicit / missing |
| A is consistent with the available evidence | Unaddressed - no specific CVE history, incident record, or threat-model gap for *this* cluster is given | Implicit / missing |

- **Implicit premises the pattern requires:** that a *security* liability judgment licenses an *operations-and-cost* action (migrate); that the consultant is unbiased toward the managed vendor; that the same managed-service move is what other relevant experts and the team's own incident evidence would also recommend. The argument as stated supplies none of these.

## 4. Keyed critical questions

The standard critical-question battery for appeal to expert opinion (the six Walton CQs), each answered.

| # | Critical question (keyed to the scheme) | Status | Who carries the burden / note |
|---|---|---|---|
| CQ1 - Expertise | How credible is E as an expert? | Answered | A hired, credentialed security consultant; expertise as such is not the weak point. |
| CQ2 - Field | Is E an expert in the field that A is in? | **Open** | E's field is security; the *conclusion* (migrate, a six-figure ops-and-cost move) reaches into database operations, reliability, and cost, where a security credential does not establish competence. The proponent must show the recommendation stays inside E's field. |
| CQ3 - Opinion | What did E actually assert, and does it imply A? | **Open** | E asserted a liability judgment ("Postgres is a liability"), not "migrate to the managed service." The jump from "there is a risk" to "this specific costly action is the answer" is unstated and is doing the real work; mitigations short of migration were never weighed. |
| CQ4 - Trustworthiness | Is E personally reliable and unbiased? | **Open** | Any referral, partnership, or preferred-vendor relationship with the managed provider was not examined. Not a defeat, but an unmet burden. |
| CQ5 - Consistency | Is A consistent with what other experts say? | **Open** | No DBA, SRE, or cost owner was asked; a managed move trades one risk set for another (lock-in, egress cost, less control) that a different expert would foreground. |
| CQ6 - Backing evidence | Is A based on evidence? | **Open** | The consultant gave a verdict, not the threat model, CVE exposure, or incident history behind it. The presumption cannot be discharged without seeing what specifically makes *this* cluster a liability. |

## 5. Presumption verdict

- **Verdict:** STANDS-PENDING, leaning toward FALLS. The appeal creates a real presumption (CQ1 expertise is satisfied), but five of the six critical questions are open, and two of them - CQ2 (the recommendation reaches past the security field into ops and cost) and CQ3 (the unstated jump from "is a liability" to "migrate") - shift a burden the one-liner does not meet. The argument is not refuted, but it is nowhere near strong enough to settle a six-figure, hard-to-reverse migration on its own.
- **Binding open question:** CQ3 - does "self-managed Postgres is a liability" actually imply "migrate to the managed service," or does it only imply "reduce the liability," which patching, hardening, and managed backups might also do? Until the action is shown to follow from the judgment, the say-so justifies attention, not this specific move.
- **What would change the verdict:** the concrete threat model and incident evidence for this cluster (discharges CQ6), a side-by-side of migration against cheaper mitigations (discharges CQ3), an ops-and-cost expert's read on the managed trade-offs (discharges CQ2, CQ5), and a check on the consultant's vendor incentives (discharges CQ4). With those, the presumption either firms up into a justified migration or clearly falls in favor of a smaller fix - on evidence rather than on authority.

---

*The sheet evaluates one typed inference, not a whole argument's structure (that is `think-argument-mapping`). The scheme classification is contestable by design - if the runner-up scheme (practical reasoning) is the right one, the critical questions change. Re-read the evidence caveat above before acting on the verdict.*

## Why this framework fits

The skill does the disciplined work Daniel cannot reliably do under time pressure on his own: it names the argument's type (appeal to expert opinion) and then retrieves, rather than improvises, the standard ways that pattern fails, so the unstated leap from "is a liability" to "migrate" gets caught instead of waved through. The artifact gives him a burden-of-proof ledger that blocks both "a paid expert said it, case closed" and "consultants are alarmists, ignored," and names the single question to discharge before committing six figures.
