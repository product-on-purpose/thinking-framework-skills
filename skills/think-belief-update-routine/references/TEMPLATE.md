# Belief-Update Ledger - Template

Fill this in on each review cadence. The deliverable is the structured ledger, not prose. It is
designed to be reopened on the next cadence and re-scored again. Do not delete prior scores: the value
is the trail of how each belief moved (or did not) and why.

---

## Ledger header

- **Review date:** [the date of this re-score]
- **Cadence:** [how often this inventory is reviewed, e.g. monthly / quarterly / on a forcing signal]
- **Owner:** [who maintains this ledger]
- **Beliefs tracked:** [count] open · [count] resolved-this-cycle

## Belief portfolio (at-a-glance)

| # | Belief (one line) | Prior | Revised | Delta | Next review |
|---|---|---|---|---|---|
| 1 | [claim] | [X%] | [Y%] | [+/- n] | [date / signal] |
| 2 | [claim] | [X%] | [Y%] | [no change] | [date / signal] |

---

## Belief entries (the detail)

### 1. [Belief stated as a concrete, one-line claim]

- **Prior confidence:** [X%] (scored [date])
- **Evidence accrued since last review:**
  - *For:* [dated item], [dated item]
  - *Against:* [dated item]
  - *(or)* No material new evidence since [date].
- **Revised confidence:** [Y%] - **[up/down n points]** (or **no change**)
- **Reason for the size of the move:** [why this much, given how strong the evidence is. Apply the
  under-updating guard: is this move large enough for the evidence, or am I clinging to the prior? If
  "no change," confirm it is because no real evidence arrived, not because the belief is sticky.]
- **Next-review trigger:** [a date, or the specific signal that should force an earlier re-score]
- **Status:** open / resolved (if resolved: retire from the open inventory; if a decision rode on it,
  close the loop with `think-after-action-review`)

### 2. [next belief...]

[repeat the block]

---

**Field notes:**
- The **delta and direction** are the point. A revised number with no stated change from the prior is
  not an update - it hides whether you moved at all.
- The **size justification** is where under-updating is caught. The robust human tendency is to revise
  too little for the evidence; force the question "is this move big enough?" on every non-trivial change.
- **"No change" is a legitimate, even common, entry - but only when no material new evidence arrived.**
  Re-scoring on the calendar with nothing new is reflection theater. If nothing changed, say so; do not
  invent a delta.
- This is **not** a decision journal (that fixes one prediction at commit time and forbids editing it),
  **not** an after-action review (that needs a resolved outcome and emits process actions), and **not** a
  what-would-have-to-be-true analysis (that decomposes one claim's conditions). This is the recurring
  re-score of an inventory of still-open beliefs.
- Calibration is a property of the *trail*, not a single review: over many cycles, comparing how your
  stated confidences moved against how things actually resolved is the signal. One ledger cannot give it
  to you; keeping the ledger over time can.
