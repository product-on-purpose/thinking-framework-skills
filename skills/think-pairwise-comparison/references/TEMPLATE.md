# Pairwise Comparison Matrix - Template

Fill this in. The deliverable is the artifact - the comparison matrix of binary A-beats-B votes, the derived ranking, and the consistency check - not a prose essay.

> This is a forced-choice ranking, not an absolute score. There is deliberately no criteria column and no 1-to-10 scale. If you can name the criteria and defend a scale, this is the wrong tool - use `think-decision-option-review`.

---

## Ranking question and items

- **Ranking question:** [the single comparative question asked of every pair, e.g. "which of these two better serves X?" - it must be identical for every pair]
- **Why no scale:** [one line confirming there is no defensible absolute scale and no articulable criteria axis here, so a scored matrix does not apply]
- **Items to rank (n = [count]):**
  - A: [item]
  - B: [item]
  - C: [item]
  - ... [add rows as needed]

## Item-count check

- **Pairs to judge: n(n-1)/2 = [number].** [Confirm this is small enough to judge every pair by hand - roughly 28 or fewer, i.e. up to 8 items. If larger, stop: cut the set down or hand off to a scored method, and say which.]

## The comparison matrix (binary A-beats-B votes)

Read each cell as "does the ROW item beat the COLUMN item?" Mark the winner of each pair. The diagonal is blank (an item is not compared with itself); each off-diagonal pair is one win (W) and one loss (L).

|        | vs A | vs B | vs C | ... | **Wins** |
|--------|------|------|------|-----|----------|
| **A**  |  -   | [W/L] | [W/L] |  | [row win count] |
| **B**  | [W/L] |  -   | [W/L] |  | [row win count] |
| **C**  | [W/L] | [W/L] |  -   |  | [row win count] |
| ...    |      |      |      |  -  |  |

(To dampen order effects, consider each pair in both orders before committing the winner. Force a winner unless the pair is genuinely undecidable; record a tie only then.)

## Derived ranking

Order by win count, highest first. Break ties by the head-to-head result between the tied items.

| Rank | Item | Wins | Tie-break note (if any) |
|------|------|------|--------------------------|
| 1 | [item] | [n] | |
| 2 | [item] | [n] | |
| 3 | [item] | [n] | [e.g. "tied with #2 on wins; beat #2 head-to-head"] |
| ... | | | |

## Consistency check

Scan for cycles - any triangle where A beats B, B beats C, and C beats A. A cycle means the comparative question shifted or two judgments conflict; it is surfaced to revisit, not auto-corrected.

- **Result:** [**Transitive** - no cycles found] OR [**Cycle(s) found:** list each, e.g. "B > C > E > B - revisit the B-vs-E and C-vs-E judgments; the question may have drifted between these pairs"]
- **Action on any cycle:** [which specific pair(s) of judgments to re-examine, and why]

## Honest framing

[One line: this order is a forced-choice ranking derived from head-to-head votes, not an objective measurement. A passing consistency check does not make the preference correct, and adding a near-duplicate item could shift the order.]
