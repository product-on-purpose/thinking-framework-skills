# Pairwise Comparison Matrix - Worked Example

A completed run of the `pairwise-comparison` skill on a real, consequential decision. This is the quality bar a generated comparison matrix should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch). Pairwise comparison does not fit the *whole* free-tier bet - that is a criteria-and-tradeoffs decision for `think-decision-option-review` (named criteria, a defensible scale). It fits a *sub-decision inside* the launch where no scale applies: choosing the name and core message for the free tier from five qualitative candidate concepts that marketing, product, and the founders each react to differently and that no one can defend a 1-to-10 score for. That is exactly the "rank qualitative artifacts where holistic marking is noisy and criteria cannot be articulated" case. See `docs/internal/AUTHORING.md`.

> This is a forced-choice ranking, not an absolute score. There is no criteria column and no 1-to-10 scale below.

---

## Ranking question and items

- **Ranking question:** "For a developer or team lead landing on the free-tier signup page cold, which of these two concepts better makes them want to start using Northwind today?"
- **Why no scale:** The team tried scoring each concept 1-to-10 on "clarity," "appeal," and "fit" and the scores drifted every session - no one could defend what a 7 meant, and the criteria themselves were contested (is "playful" a plus or a minus here?). But for any two concepts, people could reliably say which one they would rather land on. So: rank by head-to-head, no scale.
- **Items to rank (n = 5):**
  - A: **"Northwind Free"** - plain, literal, says exactly what it is
  - B: **"Start with Northwind"** - action-framed, invitational
  - C: **"Northwind Spark"** - playful sub-brand, hints at a smaller/lighter product
  - D: **"Northwind for Teams, on us"** - leads with the team use case and the gift framing
  - E: **"Try Northwind free, no card"** - leads with the friction-removal (no credit card)

## Item-count check

- **Pairs to judge: n(n-1)/2 = 5(4)/2 = 10.** Small enough to judge every pair by hand. No pruning or hand-off needed.

## The comparison matrix (binary A-beats-B votes)

Read each cell as "does the ROW concept beat the COLUMN concept on the ranking question?" Each pair was considered in both orders before the winner was committed. The diagonal is blank.

|        | vs A | vs B | vs C | vs D | vs E | **Wins** |
|--------|------|------|------|------|------|----------|
| **A** "Northwind Free"          |  -  | L | W | W | L | **2** |
| **B** "Start with Northwind"    | W   | - | W | W | L | **3** |
| **C** "Northwind Spark"         | L   | L | - | L | L | **0** |
| **D** "Northwind for Teams, on us" | L | L | W | - | W | **2** |
| **E** "Try Northwind free, no card" | W | W | W | L | - | **3** |

Pair-by-pair record (the 10 judgments):

- A vs B: **B** (the invitation beats the bare label)
- A vs C: **A** ("Spark" reads as a toy; plain is safer)
- A vs D: **A** (broad beats narrowing to teams for a cold visitor)
- A vs E: **E** (removing the card objection beats just saying "Free")
- B vs C: **B**
- B vs D: **B** (action framing beats the gift framing)
- B vs E: **E** (no-card concreteness edged out the generic invitation)
- C vs D: **D**
- C vs E: **E**
- D vs E: **D** (for a *team* landing, the team framing edged out no-card)

## Derived ranking

Order by win count, highest first; ties broken by head-to-head.

| Rank | Item | Wins | Tie-break note |
|------|------|------|----------------|
| 1 (tie on wins) | **E** "Try Northwind free, no card" | 3 | E and B both have 3 wins. **E beat B head-to-head**, so E ranks first. |
| 2 | **B** "Start with Northwind" | 3 | Lost to E head-to-head. |
| 3 (tie on wins) | **A** "Northwind Free" | 2 | A and D both have 2 wins. **A lost to D head-to-head** - see the consistency note below. |
| 4 | **D** "Northwind for Teams, on us" | 2 | Beat A head-to-head. |
| 5 | **C** "Northwind Spark" | 0 | Lost every pair - the clear cut. |

## Consistency check

Scan for cycles (A beats B, B beats C, C beats A triangles).

- **Result: Cycle found.** Among the three middle concepts: **A beats D** (A vs D), **D beats E** (D vs E), but **E beats A** (A vs E). That is a 3-cycle: A > D > E > A. The win counts hide it because they aggregate across all pairs, but the head-to-head votes are intransitive here.
- **Action:** Revisit these three judgments. The likely cause is that the ranking question quietly shifted - "D beats E" was judged with a *team* visitor in mind ("for a team landing, the team framing wins"), while "E beats A" and the rest were judged for a *generic* cold developer. The comparative question must be held fixed. Re-decide the audience for the page, then re-judge the A/D/E triangle under that single audience. Until then, treat the A-vs-D ordering (ranks 3-4) as unsettled; the top of the ranking (E, then B) and the bottom (C) are stable and unaffected by the cycle.

## Honest framing

This order is a forced-choice ranking derived from head-to-head votes, not an objective measurement of concept quality. The surfaced A > D > E > A cycle is the artifact earning its keep: it caught a drifting comparison question that a single holistic score would have buried. A passing consistency check would not have made any concept "correct," and adding a sixth near-duplicate concept (say another no-card variant) could shift these rankings - so the matrix informs the naming call, it does not settle it.

---

*Note how this differs from its neighbors. `think-decision-option-review` would handle the larger free-tier *bet* - named criteria (reach, conversion, support cost), a defensible scale, weighted scores, and a recommendation with stated tradeoffs. This skill is for the sub-problem where that scale collapses: five qualitative concepts no one can score but anyone can compare two at a time. The deliverable is a consistency-checked order, not a weighted total - and crucially, the cycle it surfaced is information, not an error to hide.*
