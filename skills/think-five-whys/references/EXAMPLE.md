# Five Whys chain - Worked Example

A completed run of `think-five-whys`, on a simple linear failure where the method is at its best. This is the quality bar a generated Five Whys should meet: the caveat leads, every step is flagged single-cause or branch, and the multi-cause check is honest about when to stop.

> A nightly data export to a partner failed silently for three days before anyone noticed.

> **Evidence caveat (read first):** Five Whys is tier X. The most-cited critique found the single-chain method oversimplifies multi-causal problems and follows one path when failures are usually multi-causal (Card 2017). What follows is worth reading only because each step is flagged for branching and the chain stays honest about being one path; a confident single root cause would not be. The moment a step branches, the stronger move is `think-issue-tree`.

---

## Problem

- The nightly data export to the partner produced an empty file for three consecutive nights, undetected.

## The chain

1. **Why did the export produce an empty file?** The query returned zero rows. `[single cause]`
2. **Why did the query return zero rows?** It filtered on a status column that no longer holds the expected value. `[single cause]`
3. **Why did the status value change?** A schema migration last week renamed the status enum and the export query was not updated. `[single cause]`
4. **Why was the export query not updated with the migration?** The export job lives in a separate repo not covered by the migration's change checklist. `[single cause]`
5. **Why was it undetected for three nights?** The job exits 0 on an empty result, so monitoring saw "success." `[single cause]`

## Multi-cause check

- Every step held as `[single cause]`: this is a genuinely linear, deterministic failure (a renamed enum the query was never updated for, masked by a success-on-empty exit code). No step branched, and there is no person-blame terminus, so Five Whys is a fair fit here. If, instead, step 4 had branched (for example, "the query was not updated AND review was rushed AND nobody owned the export"), the chain would be discarding real contributing causes, and the honest move would be to hand the problem to `think-issue-tree` for a branching, coverage-checked decomposition rather than picking one "why."

## Countermeasure

- Make the export job fail loudly on an empty result (exit non-zero plus alert), and add the export repo to the migration change checklist so schema renames force a query update. The empty-on-success exit is the terminal node: fixing it surfaces this whole class of silent failure, not just this one.

## What to do next

- Verify the terminal cause before shipping the fix: confirm the job really does exit 0 on empty (reproduce it), and confirm no other downstream job shares the same silent-success pattern. That second check is exactly where a single chain risks missing a sibling cause - if it turns up more than one job with the pattern, the problem is broader than one chain and belongs in `think-issue-tree`.

---

*Note: the chain alone would have stopped at "the query returned zero rows" and patched the symptom. The work was walking past it to the renamed enum and the success-on-empty exit, and staying honest that this only worked because the failure really was a single path. The instant a step had branched, the discipline is to redirect, not to force one "why."*
