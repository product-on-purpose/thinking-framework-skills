# Reversibility Classification - Template

Fill this in. The deliverable is the classification (verdict, dimensions, matched deliberation level) plus the one-line summary above it, not prose, and not a recommendation about which option to choose.

---

## Decision being triaged

- **Decision:** [one line: the specific choice being made]

## Summary (top of the artifact)

[One line. The verdict and the matched level of process, e.g. "Two-way door: a reversible pricing-page test - let the growth PM ship it this week; do not route it through committee." A reader who stops here knows how much machinery this decision deserves.]

## Reversibility test

| Dimension | Cost to walk it back | Reversible on this dimension? (Y / N / partial) |
|---|---|---|
| Money (spend / refunds / write-offs) | | |
| Time (how long to undo) | | |
| Trust / reputation (customers, market, team) | | |
| Legal / contractual (commitments, regulation) | | |
| Path-dependence (future options foreclosed, learning sunk) | | |

**Column notes:**
- **Cost to walk it back:** what it would actually take to reverse the decision after committing, on this dimension. Be concrete; a vague "some cost" hides the one-way consequences the binary tends to bury.
- Do not accept the convenient label. A decision that feels reversible (the money comes back) can still be a one-way door on trust or path-dependence.

## Verdict

- **Classification:** [one-way door / two-way door]
- **For borderline cases - leans:** [which way, and the single dimension that decides it]

## Matched deliberation level

- **Who decides:** [the lowest level that can responsibly own this]
- **How much analysis:** [light/none for two-way doors; named heavier work for one-way doors]
- **Sign-off:** [what approval, if any, is warranted]
- **Next tool (one-way doors only):** [the heavier tool the decision should now go to - e.g. `tfs-decision-option-review` to compare options, `tfs-premortem` to stress-test the commitment]
- **Why this level:** [for a two-way door, why slowing it down is the real cost; for a one-way door, why the rigor is warranted]
