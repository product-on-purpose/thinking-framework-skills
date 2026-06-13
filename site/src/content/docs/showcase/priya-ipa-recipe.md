---
title: "Priya works a contested docket with the IPA recipe"
description: A policy analyst takes a contested public-comment docket where commenters argue past each other and runs the issue-position-argument-mapping recipe on it - first decomposing the open issues, then enumerating the rival positions on each, then mapping the arguments for and against, so the agency's response is structured rather than ad hoc.
sidebar:
  label: "Priya -> IPA recipe"
---

> **Priya**, policy analyst at a government agency. The decision: how to structure the agency's response to a contested public-comment docket on a proposed rule, where commenters take conflicting positions. Prompting style: detailed.

Recipe: [issue-position-argument-mapping](../../recipes/issue-position-argument-mapping/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

The comment period on a proposed rule - new disclosure requirements for consumer lending - has closed with roughly 240 comments, and they are talking past each other: some argue the threshold is wrong, some argue the timeline is wrong, some argue the whole approach is wrong, and many do several at once. The agency owes a reasoned response to significant comments, and "reasoned" requires structure, not a comment-by-comment slog that buries which questions are actually contested. Priya wants to see the docket's shape before she drafts a word: what is genuinely being asked, which answers commenters put on the table, and what each answer rests on - so the response addresses positions, not personalities.

## Step 1 - surface the open issues

**The prompt**

```
/think-issue-tree

Decompose this contested docket into the open issues, so I can structure the
agency's response by question rather than comment by comment.

Context: comment period closed on our proposed rule "Enhanced Disclosure
Requirements for Consumer Lending" (Docket FR-2026-0142). ~240 comments. They
contest several different things at once and talk past each other.

Recurring threads I'm seeing across the comments:
- the $50,000 loan-size threshold for who the rule covers (too low / about
  right / should be removed entirely)
- the 180-day compliance timeline (too short for small lenders / fine)
- whether the disclosure should be a standardized form or principles-based
- whether small lenders (<$10M originations) should be exempt
- whether the rule duplicates existing state-level disclosure laws

Stakeholders writing in: consumer-advocacy groups, large lenders, community
banks and credit unions, two state regulators, a trade association.

This is a contested deliberation, not a clean decomposition - relax MECE. I want
the real questions in play as IBIS-style issues, surfaced by question, not a
tidy partition. Flag which issues the response most needs to resolve first.
```

Full context: the docket number, the comment volume, the recurring threads quoted as commenters framed them, and the explicit stakeholder list. Priya hands the framework the contested questions, not her own answers, and tells it to relax MECE because a live docket does not partition cleanly.

**The artifact**

> **Issue Tree - Contested docket FR-2026-0142 (Enhanced Disclosure Requirements for Consumer Lending)**

## Root question

- **Question:** How should the final rule on consumer-lending disclosure be set, given the conflicting positions in the public comments?
- **Why it cannot be answered as posed:** It bundles several independent contested questions (scope, timeline, form, exemptions, federalism) that different commenters answer differently; a single yes/no hides them.
- **A tree is warranted because:** The response must address each significant question on its own terms, and the docket entangles them - surfacing them as separate issues is what makes a reasoned response possible.

## Summary (top of the artifact)

The docket contests five largely independent questions, so the root is split by **decision dimension of the rule** (scope, timing, form, exemptions, federalism) rather than by commenter or by stakeholder, because the agency owes a reasoned answer per question, not per commenter. MECE is deliberately relaxed: these are the real questions in play, and they overlap at the edges (the small-lender exemption interacts with both scope and timing). The two issues most likely to carry the response are **Issue 1 (coverage threshold)** and **Issue 4 (small-lender exemption)**, because nearly every other position shifts depending on how those two resolve. A reader who stops here knows the docket breaks into five answerable issues and that scope and exemption are the load-bearing pair.

## Issue tree

Split axis: **decision dimension of the rule**. Issues, not a clean partition - they are the questions the comments actually contest.

```
How should the final disclosure rule be set, given the conflicting comments?
- Top-level split axis: decision dimension of the rule (what part of the rule is contested)
  - Issue 1: Coverage threshold - who does the rule apply to?
    - Split axis: where the line sits
      - Leaf 1a: Is the $50,000 loan-size threshold the right line? - answered by: distributional analysis of which borrowers fall above/below, plus the rule's stated consumer-protection purpose
      - Leaf 1b: Should there be a loan-size threshold at all, vs. covering all consumer loans? - answered by: judgment on the rule's purpose against the burden of full coverage
  - Issue 2: Compliance timeline - how long do covered entities get?
    - Leaf 2a: Is 180 days workable for the systems changes required? - answered by: implementation-cost evidence from lenders + the agency's own systems estimate
    - Leaf 2b: Should the timeline vary by entity size? - answered by: judgment, contingent on Issue 4
  - Issue 3: Disclosure form - standardized form or principles-based?
    - Leaf 3a: Does a standardized form improve comparability enough to justify rigidity? - answered by: consumer-comprehension evidence on standardized vs. free-form disclosures
    - Leaf 3b: Can a principles-based rule be enforced consistently? - answered by: enforcement-feasibility judgment
  - Issue 4: Small-lender exemption - should entities under $10M originations be exempt?
    - Leaf 4a: Does the compliance burden fall disproportionately on small lenders? - answered by: per-entity cost evidence scaled by origination volume
    - Leaf 4b: Does an exemption leave a material share of borrowers unprotected? - answered by: share of covered borrowers served by sub-$10M lenders
  - Issue 5: Federalism - does the rule duplicate or conflict with state disclosure laws?
    - Leaf 5a: Where do existing state laws already require equivalent disclosure? - answered by: a state-by-state overlap map (the two state regulators' comments are the starting data)
    - Leaf 5b: Does federal action preempt, complement, or conflict with those laws? - answered by: legal judgment from agency counsel
  - Other / not covered above: comments on the underlying statutory authority (out of scope for this rule's response; routed to the legal record)
```

## Leaf register (the answerable parts)

| Leaf sub-question | Parent branch | What would answer it (data / metric / owner / judgment) | Priority (H/M/L) |
|---|---|---|---|
| 1a: Is $50,000 the right coverage line? | Issue 1 (scope) | Distributional analysis + rule purpose; owner: policy team | H |
| 1b: Any size threshold at all? | Issue 1 (scope) | Judgment on purpose vs. burden; owner: policy lead | H |
| 4a: Does burden fall disproportionately on small lenders? | Issue 4 (exemption) | Per-entity cost evidence; owner: economics team | H |
| 4b: Does an exemption leave borrowers unprotected? | Issue 4 (exemption) | Share of borrowers at sub-$10M lenders; owner: economics team | H |
| 2a: Is 180 days workable? | Issue 2 (timeline) | Implementation-cost evidence + agency estimate | M |
| 3a: Standardized form vs. principles-based comprehension | Issue 3 (form) | Consumer-comprehension evidence | M |
| 5a: Where do state laws already overlap? | Issue 5 (federalism) | State-by-state overlap map; owner: counsel | M |
| 2b: Timeline by size? | Issue 2 (timeline) | Judgment, contingent on Issue 4 | L |
| 3b: Principles-based enforceability | Issue 3 (form) | Enforcement-feasibility judgment | L |
| 5b: Preempt, complement, or conflict? | Issue 5 (federalism) | Legal judgment; owner: counsel | L |

## MECE check

- **Mutually exclusive:** Mostly, by design only loosely - Issue 2 (timeline) and Issue 4 (exemption) overlap, because "how long" and "exempt entirely" are two answers to the same small-lender burden concern. Kept as separate issues because commenters argue them separately; the overlap is flagged, not hidden.
- **Collectively exhaustive:** The five issues plus the explicit "statutory authority" remainder cover the contested ground in the docket. Comments on enforcement budget were folded into Issue 3b rather than given their own branch.
- **Split-axis sanity:** Splitting by decision dimension is the material axis - it maps one-to-one to the parts of the rule the agency can actually change. Splitting by stakeholder would have been tidy and useless: it would sort comments by who sent them, not by what must be decided.

## Pruned / out-of-scope branches

- Challenges to the agency's statutory authority to issue any rule (routed to the legal record; not a disclosure-design question).
- General "we support / we oppose" comments with no specific contested question (acknowledged in the response's summary, not a separate issue).

---

*The handoff to Step 2 carries forward the set of open issues - the five contested questions, not the full leaf register. Issues 1 and 4 (scope and exemption) are flagged as the load-bearing pair the positions step should map first.*

## Step 2 - enumerate the rival positions

The handoff carries the **set of open issues**. The tree told Priya *which questions* the docket contests; the position step now lists, for each issue, the *rival answers commenters actually put on the table* - the IBIS positions. She runs it on the two load-bearing issues first (scope and exemption), using the option-enumeration front of the decision skill: she is laying out the candidate answers, not yet picking a winner, because the agency's job at this stage is to show it considered the real alternatives.

**The prompt**

```
/think-decision-option-review

For the most contested issue in the docket, enumerate the rival positions the
comments put forward, and lay out the tradeoffs - I am surfacing the positions
for a reasoned response, not yet selecting one.

Issue (carried from the issue tree): "Who should the rule cover? Where should the
coverage threshold sit?"

The positions commenters actually argued:
- Position A: keep the $50,000 loan-size threshold as proposed (large lenders,
  trade association)
- Position B: lower or remove the threshold so the rule covers all consumer loans
  (consumer-advocacy groups)
- Position C: keep a threshold but pair it with a small-lender exemption under
  $10M originations (community banks, credit unions)

Criteria that matter for a disclosure rule of this kind: consumer-protection
coverage, compliance burden, enforceability, and consistency with the rule's
stated purpose. Surface what each position gives up; flag soft scores. This feeds
an argument map next, so I want the positions and their tradeoffs explicit, not a
single ranked winner.
```

**The artifact**

> **Criteria-Weighted Option Matrix - Issue 1: coverage threshold for FR-2026-0142**

## Decision

- For the contested coverage-threshold issue, which rival position the agency's response should treat as the leading answer (positions enumerated, not yet adjudicated).

## Options

- A: Keep the $50,000 loan-size threshold as proposed.
- B: Remove the threshold - cover all consumer loans.
- C: Keep a threshold but add a small-lender exemption (<$10M originations).

## Matrix

| Criterion (weight H/M/L, why) | A: keep $50k | B: cover all | C: threshold + exemption |
|---|---|---|---|
| Consumer-protection coverage (H - it is the rule's purpose) | 3 - leaves sub-$50k loans uncovered | 5 - covers everyone | 3 - covers by size but exempts small-lender borrowers |
| Compliance burden on entities (H - drives most of the opposition) | 4 - bounded to larger loans | 2 - heaviest, hits everyone | 4 - relieves the smallest entities |
| Enforceability (M - a rule the agency cannot enforce protects no one) | 4 - clear bright line | 3 - broad scope strains capacity | 3 - two thresholds add edge cases |
| Consistency with stated purpose (M - the response must be reasoned) | 3 - a $50k line needs its own justification | 4 - matches "protect consumers" most directly | 3 - introduces a burden rationale alongside the purpose |

Score scale: 1-5, where 5 = best on that criterion. Soft scores flagged below: the coverage scores for A and C (3) depend on the distributional analysis from Leaf 1a, not yet run, so treat them as provisional.

## Tradeoffs

- **Option A** gives up: coverage of borrowers with sub-$50,000 loans, who may be exactly the consumers the rule means to protect; buys a clean, low-burden bright line.
- **Option B** gives up: bounded compliance burden and enforcement headroom; buys the broadest, most purpose-aligned coverage.
- **Option C** gives up: simplicity and some coverage (the borrowers of exempt small lenders); buys relief for the entities that argued burden hardest - but only by reopening Issue 4, the exemption, which it presupposes.

## Factors that resist scoring

- The federalism overlap (Issue 5): if state laws already cover the sub-$50k segment in much of the country, Option A's coverage gap is smaller than the matrix shows. Not yet mapped.
- Political durability of each option on judicial review - real, but not a disclosure-design criterion and deliberately kept out of this matrix.

## Recommendation

- **Recommended:** No single winner selected at this stage - the positions are enumerated for the response, and **C is the position most entangled with another open issue** (it cannot be evaluated without resolving the small-lender exemption first).
- **Would flip if:** the distributional analysis (Leaf 1a) shows the sub-$50k segment is large and underserved by state law, which would move the leading answer toward B.

---

*The handoff to Step 3 carries forward the positions answering the issue - A, B, and C - and the flag that C presupposes the exemption. The argument step now maps what each position rests on, starting with the position whose support is least examined.*

## Step 3 - map the arguments

The handoff carries the **positions answering each issue**. The position matrix laid out *what each answer trades off*; the argument map now excavates *what each answer's case actually rests on* - the reasons, the co-premises each silently needs, and the objections - doing strictly more than a flat IBIS pro/con list by surfacing the unstated assumptions and flagging the weak links. Priya maps the most-argued position first: Option B, remove the threshold, which the advocacy comments pushed hardest and whose support is the least examined.

**The prompt**

```
/think-argument-mapping

Map the argument for the position that drew the strongest comments, so the
agency's response can engage its actual structure, not its rhetoric.

Position (carried from the option review): "Remove the coverage threshold - the
rule should cover all consumer loans" (Issue 1, Option B; argued by the
consumer-advocacy commenters).

Their case as written across the comments:
- "Sub-$50,000 borrowers are the most vulnerable and are exactly who disclosure
  protects."
- "A threshold creates a loophole lenders will structure around by splitting loans."
- "Other federal consumer rules apply regardless of loan size."

Lay out the reasons, the co-premises each silently needs, the strongest
objections (the burden and federalism points other commenters raised), and flag
the load-bearing-but-unsupported links. Where an argument raises a new open
question, name it so I can add it back as an issue.
```

**The artifact**

> **Argument Map - Position B: remove the coverage threshold (Issue 1, docket FR-2026-0142)**

## Contention

- The final rule should remove the loan-size threshold and cover all consumer loans.

## Map

- **Reason 1:** Sub-$50,000 borrowers are the most vulnerable, and disclosure is exactly what protects them.
  - *Co-premise (unstated):* The sub-$50,000 segment is materially large and is not already protected by other (e.g. state) disclosure law.
  - *Objection:* If state laws already cover much of that segment (Issue 5), the marginal protection from removing the threshold is smaller than claimed. -> *Rebuttal:* Advocates note state coverage is uneven, but cite no map.
- **Reason 2:** A loan-size threshold creates a loophole lenders will structure around by splitting loans.
  - *Co-premise (unstated):* The compliance saving from staying under the threshold exceeds the cost of restructuring a loan to do so.
  - *Objection:* Loan-splitting to dodge a disclosure form is costly and visible; whether it is worth it is an empirical question nobody has answered. -> *Rebuttal:* None offered.
- **Reason 3:** Other federal consumer rules apply regardless of loan size, so this one should too.
  - *Co-premise (unstated):* Those other rules are comparable in compliance burden, so parity is a fair analogy.
  - *Objection:* Parity of scope does not imply parity of burden; a disclosure-form mandate may cost far more per loan than the rules cited. -> *Rebuttal:* None; the analogy is asserted, not sized.
- **Objection to the contention:** Full coverage imposes the heaviest compliance burden on the smallest lenders, which is the exact concern Issue 4 (the small-lender exemption) raises - so Position B cannot be evaluated without resolving whether small lenders are exempt. -> *Rebuttal:* Advocates argue an exemption guts the rule, which is itself a position on Issue 4, not a rebuttal.

## Weak links and unsupported premises

| Link or premise | Problem | What it would need to hold |
|---|---|---|
| Co-premise of Reason 1 (segment large + unprotected) | Load-bearing: the protection case rests on it, but neither the segment size nor the state-law overlap is shown | The distributional analysis (Leaf 1a) + the state overlap map (Leaf 5a) |
| Co-premise of Reason 2 (splitting pays) | Asserts a behavior with no evidence it is economically rational | A cost comparison: compliance saving vs. restructuring cost |
| Reason 3 -> contention (parity analogy) | Equates scope with burden; the analogy is the whole inference and it is unsized | Evidence the cited rules impose comparable per-loan burden |
| Objection (burden on small lenders) | Not rebutted; routes straight into Issue 4 | A resolution of the small-lender exemption question |

## Verdict

The structure is partly valid but leans on two unsupported co-premises and one unresolved cross-issue dependency. The contention follows only if the sub-$50,000 segment is both large and not already covered by state law (Reason 1's co-premise) - which is unproven and is precisely what Leaf 1a and the Issue 5 overlap map would settle. Reason 3 is an analogy doing inferential work it has not earned: same scope does not mean same burden. And the strongest objection (burden on small lenders) is not an argument against Position B so much as a pointer that Position B and Issue 4 must be decided together. **New issue surfaced for the loop:** the loan-splitting claim in Reason 2 is really a new open question - "will a size threshold be gamed, and at what rate?" - which should be added back to the issue set, because the answer changes the case for both A and B.

## Why the chain worked

Each step did a different job on the same docket, and the compressed handoffs are what kept the third step sharp instead of drowning in 240 comments. The issue tree converted a tangle of comments into five answerable questions and flagged the load-bearing pair; the position review enumerated the rival answers on the most contested issue and exposed that one position secretly depended on another open issue; the argument map then excavated what the strongest position actually rests on and surfaced a brand-new question the flat comment thread had buried. Decompose to find *which questions*, enumerate to find *which answers*, map to find *what each answer rests on* - the recipe turns a sprawling docket into a typed, inspectable structure the agency can respond to question by question.

## What happened next

Priya did not draft the response comment by comment; she drafted it issue by issue, and the structure carried straight into the agency's reasoned-response document. The map's verdict reshaped the work order: because Position B's whole case rested on an unrun distributional analysis and an unmapped state-law overlap, those two analyses became the first deliverables, not afterthoughts, and the scope and exemption issues were paired for a single decision rather than answered in separate sections that would have contradicted each other. The new loan-splitting question went back onto the issue list and got its own short analysis before the rule was finalized. When the next contested docket arrived, she described the situation to the [advisor](../../tools/think-framework-advisor/) and let it confirm the recipe before she touched the first comment.
