# Scheme Critique Sheet - Worked Example

A completed run of the `walton-argumentation-schemes` skill on one short, load-bearing argument inside a real decision. This is the quality bar a generated scheme critique sheet should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) so examples across skills read as one coherent product. Where `think-scenario-planning` builds the alternative external worlds Northwind's free-tier bet must survive, this skill zooms all the way in: it takes ONE presumptive argument circulating in the room - an analyst's say-so that has started to drive the call - and asks whether its presumption survives the standard defeaters for its pattern. See `docs/internal/AUTHORING.md`.

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

- **Single, short, presumptive argument?** Yes. The argument in the room is a one-step inference from an authority's say-so. It is not a multi-premise structure (no whole-argument tree to lay out, so not `think-argument-mapping`) and not a deductive or statistical proof. It is a textbook presumptive move, so the scheme method fits.

## 1. The argument, restated

The context: Northwind's leadership is debating whether to commit to a self-serve free tier as the primary growth motion. A circulated note from a respected industry analyst has started to settle the question. The note's argument, isolated:

- **Conclusion:** Northwind should not launch a self-serve free tier.
- **Stated premises:** A senior analyst at a well-known industry research firm published a note concluding that free tiers no longer convert at viable rates in B2B SaaS, and that "the free-tier era is over." Therefore Northwind should not launch one.

## 2. Scheme classification (stated and contestable)

- **Scheme:** Appeal to expert opinion (argument from authority). The argument's whole force is "an expert in the field asserted it, so presumably accept it."
- **Runner-up scheme:** Argument from popular practice ("the market is moving away from free tiers, so we should too"). The note gestures at a trend, so a reading as "everyone is abandoning free tiers" is available - but the load-bearing premise as stated is the analyst's authority, not the count of firms, so appeal to expert opinion is the better fit.
- **Match confidence:** High. The note is explicitly "an analyst says," and the conclusion rides on that say-so. (The runner-up is named precisely because if the team were actually leaning on the trend data rather than the analyst, the keyed questions would shift to the popular-practice battery - so the classification is left contestable.)

## 3. Instantiated premise slots

The appeal-to-expert-opinion premise template, filled against the argument.

| Premise slot (required by the scheme) | Instantiated against this argument | Stated or implicit? |
|---|---|---|
| Source E is an expert | The author is a senior analyst at a recognized research firm | Stated |
| E is an expert in the relevant field F | The relevant field is *Northwind's specific segment and buyer*, not B2B SaaS in general | Implicit - the note speaks to B2B SaaS broadly, not to Northwind's segment |
| E actually asserted proposition A | The note asserts "free tiers no longer convert at viable rates" and "the era is over" | Stated (but A is a general claim, not "Northwind specifically should not") |
| A falls within E's domain of competence | Free-tier conversion economics is within an industry analyst's competence | Stated, plausibly |
| E is trustworthy and unbiased | Unaddressed - the firm's funding model and the analyst's incentives are not examined | Implicit / missing |
| A is consistent with what other experts say | Unaddressed - no second source is cited or compared | Implicit / missing |
| A is consistent with the available evidence | Unaddressed - no conversion data from comparable companies is given | Implicit / missing |

- **Implicit premises the pattern requires:** that the analyst's *general-market* claim transfers to *Northwind's specific segment*; that the analyst is unbiased; that other experts and the underlying data agree. The argument as stated supplies none of these.

## 4. Keyed critical questions

The standard critical-question battery for appeal to expert opinion (the six Walton CQs), each answered.

| # | Critical question (keyed to the scheme) | Status | Who carries the burden / note |
|---|---|---|---|
| CQ1 - Expertise | How credible is E as an expert? | Answered | Genuinely a recognized analyst; expertise is not the weak point. |
| CQ2 - Field | Is E an expert in the field that A is in? | **Open** | E speaks to B2B SaaS broadly; the live question is Northwind's *specific* segment and buyer, where free-tier economics can differ sharply. The proponent of the conclusion must show the general claim transfers. |
| CQ3 - Opinion | What did E actually assert, and does it imply A? | **Open** | E asserted a general market claim ("the era is over"), not "Northwind should not launch." The leap from the general to Northwind's specific case is unstated and is doing the real work. |
| CQ4 - Trustworthiness | Is E personally reliable and unbiased? | **Open** | The firm's funding model and any vendor relationships were not examined. Not a defeat, but an unmet burden. |
| CQ5 - Consistency | Is A consistent with what other experts say? | **Open** | No second expert or contrary view was sought; several practitioner sources argue the opposite (free tiers still work for product-led bottom-up motions). |
| CQ6 - Backing evidence | Is A based on evidence? | **Open** | The note gives a verdict, not the conversion data behind it. The presumption cannot be discharged without seeing it. |

## 5. Presumption verdict

- **Verdict:** STANDS-PENDING, leaning toward FALLS. The appeal creates a real presumption (CQ1 expertise is satisfied), but five of the six critical questions are open, and two of them - CQ2 (field fit to Northwind's segment) and CQ3 (the unstated jump from a general claim to Northwind's specific case) - shift a burden the note does not meet. The argument is not refuted, but it is nowhere near strong enough to settle the decision on its own.
- **Binding open question:** CQ2/CQ3 together - does the analyst's *general-market* claim actually transfer to *Northwind's specific segment and buyer*? Until that is shown, the say-so is about a different population than the one being decided on.
- **What would change the verdict:** segment-specific conversion data for companies like Northwind (discharges CQ2, CQ3, CQ6), plus a second independent expert view (discharges CQ5) and a check on the firm's incentives (discharges CQ4). With those, the presumption either firms up or clearly falls - on evidence rather than on authority.

---

*Note how this differs from its neighbors on the same Northwind decision. `think-scenario-planning` builds four external worlds the free-tier bet must survive; `think-argument-mapping` would lay out the full structure of Northwind's case for the launch as a tree. This skill does neither: it isolates one presumptive argument (the analyst's say-so), classifies it as a known type, and runs that type's standard defeater battery to see whether its presumption survives. The deliverable is a burden-of-proof read on one inference - and the discipline that blocks both "a respected analyst said so, case closed" and "analysts are always wrong, ignored." The scheme name (appeal to expert opinion) is the start of the evaluation, not the refutation. Re-read the evidence caveat above before acting on the verdict.*
