---
title: "Reflective Equilibrium - quick sample"
description: An explicitly-requested reflective equilibrium run caveat-first - three tiers, bidirectional revision, and an explicit ledger of which commitment gave way.
sidebar:
  label: reflective-equilibrium
---

:::caution[Reflective equilibrium is a contested lens]
Reflective equilibrium is tier C: philosophically central since Rawls (1971) but empirically untested as a procedure. "Equilibrium" has no external stopping test, the inputs can be a reshuffling of prejudices (Brandt 1979), and the method can license rationalizing a preferred outcome; even idealized, convergence is rare (Freivogel 2023, ~27 percent). This sample runs it honestly: the caveat leads, all three tiers are shown, and a revision ledger records what gave way. For an impartial rule under uncertainty prefer [veil of ignorance](../../frameworks/think-veil-of-ignorance-reasoning/); this fires only because reflective equilibrium was asked for by name, explicit-request-only.
:::

> A compact worked example of [Reflective Equilibrium](../../frameworks/think-reflective-equilibrium/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-reflective-equilibrium/).

## Situation

Priya, a policy analyst at a state human-services agency, staffs the hardship-waiver review committee for an energy-assistance program, and she documents every case by hand because the file becomes the public record. The eligibility rule in the program manual (Section 4.2) is bright-line: "an applicant whose household income exceeds 150 percent of the federal poverty line is ineligible for a hardship waiver." This week's file is sympathetic and awkward. A single-earner household sits at 158 percent of the line, but a documented medical-debt repayment plan (Exhibit C) leaves it with less spendable income than most households the program routinely serves, and the caseworker's note says denying it would be perverse. The stakeholders in play: this applicant, every past applicant denied at 151 to 160 percent under the same rule, future applicants who need a predictable rule, the program's auditors, and the agency's accountability to the legislature for consistent, published criteria. Priya does not want to be talked into a tidy answer; she wants the conflict between the written rule and the case adjudicated honestly and on the record, and she names the method she wants to run.

## Prompt

```text
/think-reflective-equilibrium "Run reflective equilibrium on this. Program manual Section 4.2 sets a bright-line rule: a household over 150 percent of the federal poverty line is ineligible for a hardship waiver. This applicant is at 158 percent but a documented medical-debt repayment plan (Exhibit C) leaves them worse off than households we routinely serve, and the caseworker says denying it is perverse. Stakeholders: this applicant, ~40 past applicants denied at 151-160 percent under the same rule, future applicants who need a predictable rule, our auditors, and the agency's accountability to the legislature. Reconcile the rule with the case, run the revision in both directions, and show me on the record which commitment gives way and why."
```

## The artifact

> **Evidence caveat (read first):** Reflective equilibrium is tier C; philosophically central since Rawls (1971) but untested as a procedure, with no external stopping test, a risk of reshuffling prejudices (Brandt 1979), and a license to rationalize. Convergence is rare even idealized (Freivogel 2023, ~27 percent). What follows is worth reading only because the ledger shows which commitment gave way and why.

### The question

- Should the "over 150 percent is ineligible" rule (Section 4.2) apply to this applicant, or is the judgment that denying the waiver would be perverse load-bearing enough to revise the rule?

### Tier a - Considered judgments (particular cases)

- Denying this 158-percent household, which Exhibit C shows is worse off than households the program routinely serves, would be perverse `[held strongly]`
- A rule that committee members waive whenever a single case feels sympathetic invites bias and is unfair to the ~40 past applicants denied at 151-160 percent `[held strongly]`
- Granting a waiver on raw income alone, ignoring the published line entirely, would make the program unaccountable to its auditors and the legislature `[held weakly]`

### Tier b - General principles

- Apply the bright-line 150-percent threshold so eligibility is predictable and cheap to administer `[held weakly]`
- Direct hardship relief by genuine ability to pay, which is the program's stated purpose `[held strongly]`
- Apply the same published criteria to every applicant, this one and the next one alike `[held strongly]`

### Tier c - Background theories (the wide variant)

- Theory of the threshold: gross income at 150 percent is a proxy for hardship, not hardship itself; documented non-discretionary obligations (court-ordered or contractual debt) are an independent signal of ability to pay that the bright line ignores by design.
- Procedural fairness and public accountability: published, consistent criteria protect applicants from arbitrary discretion and let auditors and the legislature check the agency, which is exactly why the "no ad hoc waivers" worry is real and not mere rigidity.

### Conflicts found

- "Denying this would be perverse" collides with "apply the bright-line 150-percent threshold."
- "Ad hoc waivers are unfair to past applicants and unaccountable" collides with simply overriding Section 4.2 for this one file.

### Revision ledger

| Conflict | Commitment that gave way | Direction | Why it was the weaker member | Alternative considered |
|---|---|---|---|---|
| Strong case vs. bright-line 150-percent threshold | The bright-line gross-income principle | case revises principle | It was held weakly and treats a proxy (gross income) as the goal; the threshold theory shows documented non-discretionary debt is an independent ability-to-pay signal the rule was never meant to exclude | Denying per the manual, declined because the hardship judgment was strong and the rule's basis (gross income as a hardship proxy) was thin |
| "Waivers are unfair / unaccountable" vs. "just override Section 4.2 here" | The case judgment (its bare one-off-override form) | principle overrules case | The fairness and accountability worry holds; a *published* successor rule (gross income, OR net of documented court-ordered or contractual obligations) keeps criteria consistent and auditable without case-by-case discretion, and it reaches the ~40 past denials the same way | A silent one-off exception for this applicant, declined because it re-imports the arbitrariness and leaves the record inconsistent |

### Residual disagreements (stop honestly)

- Which obligations count as "documented non-discretionary" (court-ordered only, or contractual repayment plans too), and whether the agency's rulemaking office and legislature will adopt the revised criterion, is unresolved. I reconciled this case and produced a defensible successor rule to propose; I did not enact program policy. Coherence here is local, not global.

## Why this framework fits

Priya asked, by name and on the record, to reconcile a written rule with a conflicting case, so a flat refusal would not help her or the file. Run caveat-first, the lens earns its keep: laying out all three tiers, running the revision in both directions, and recording the ledger surfaces that the 150-percent line was a weak proxy for hardship and produces a fairer, auditable successor rule instead of a quiet override that would treat this applicant differently from the ~40 already denied. Unaided, "reconcile these" tends to narrate to a tidy "it all coheres" with no record of what was traded away, which is the rationalization failure mode the caveat warns about - and for a public record that record is the whole point. If Priya next needs an eligibility rule that is fair across all future applicants regardless of who they are, [veil of ignorance](../../frameworks/think-veil-of-ignorance-reasoning/) is the stronger move.
