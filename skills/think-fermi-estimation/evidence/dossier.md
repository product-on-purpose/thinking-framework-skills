# Evidence Dossier: Fermi Estimation

> Single source of truth for the `fermi-estimation` skill. The SKILL.md, sidecar, and evals derive from this. A moderate/practitioner-tier method (M/P) with a transferred-evidence flag: the controlled support is real but conditional, and the field track record is lore, not measurement.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.fermi-estimation` (installable name `think-fermi-estimation`) |
| **Family** | decision-and-option-evaluation |
| **Evidence tier** | **M/P** (some controlled support for the decomposition mechanism, capped below clean M; transferred-evidence) |
| **Confidence** | Moderate that multiplicative decomposition helps for *extreme/uncertain* quantities; low that it helps for ordinary ones |
| **Status** | draft (authored 2026-06-01 from the discovery corpus) |

## 1. The mechanism (what actually does the work)

You need a number for which no lookup-able data exists ("how many paying accounts would a free tier convert in year one?", "how much support load would self-serve signups add?"). The Fermi move is **multiplicative decomposition of a magnitude**: factor the unknown into a short chain of sub-quantities, each one guessable to within a factor (an order of magnitude or better), then multiply the chain back into a point estimate, and compound the per-factor bands into a low/high range.

The reason this can beat a single all-at-once guess is **partial cross-factor error cancellation**. If the per-factor errors are roughly independent and centered (over-guess one factor, under-guess another), they tend to offset in the product rather than compound. Stated more formally: a product of independent multiplicative factors is approximately log-normal, and the geometric mean of independent over- and under-estimates pulls the combined estimate toward the truth. The work is done by replacing one wild guess about a large magnitude with several smaller, more anchorable guesses whose errors partly wash out.

That same formalism names the failure condition: cancellation depends on the factors being **independent**. If two factors share a driver (both scale with the same underlying thing), their errors are correlated, do not offset, and the decomposition can be worse than a single guess.

## 2. Lineage

- Named for Enrico Fermi and the back-of-the-envelope "Fermi problems" tradition (the canonical teaching example being "how many piano tuners in Chicago?"). The technique is a staple of physics pedagogy, quantitative-reasoning courses, and analyst/consulting case interviews.
- The controlled-research thread is judgmental **decomposition**: MacGregor & Armstrong (2007), "Judgmental Decomposition: When Does It Work?" (*Decision Sciences*); and D. MacGregor (2001), "Decomposition for judgmental forecasting and estimation," in J. S. Armstrong (ed.), *Principles of Forecasting*. These study breaking an estimate into parts that are judged separately and recombined.

No trademark. Named descriptively after the technique, not licensed.

## 3. What the evidence shows, and what it does NOT show

**Supported (the M half):** judgmental decomposition - splitting an estimate into components, estimating each, and recombining - has *some* controlled support for reducing estimation error relative to a single holistic guess. MacGregor & Armstrong (2007) and MacGregor (2001) report that decomposition can improve accuracy. That is a real empirical signal for the underlying mechanism this skill uses, and it is why the grade is not pure practitioner-lore.

**Three facts cap it below a clean M and demand honest framing:**

1. **The benefit is strictly conditional.** It shows up for *extreme, uncertain* targets - quantities that are large and unfamiliar, where a holistic guess is badly anchored. For **ordinary, familiar** quantities the decomposition benefit was absent, and could even be **negative** (you add noise by guessing several things instead of one you already know). So this is not "decomposition always helps"; it is "decomposition helps where a direct guess is hopeless."
2. **The cancellation premise is fragile.** The error-offsetting that makes multiplicative decomposition work assumes the component errors are roughly **independent**. Correlated component errors erode or reverse the benefit. Multiplicative chains are specifically sensitive to this, because correlated factors multiply their errors together instead of averaging them out.
3. **The evidentiary base is thin.** It is essentially a single multi-problem study line (MacGregor / MacGregor & Armstrong), plus **field lore** (the practitioner claim that Fermi estimates land "within an order of magnitude"), plus a **statistical argument** (the log-normal / geometric-mean cancellation result). It is **not** replicated across many independent labs and **not** meta-analytic. Treat it as "promising and partly demonstrated," not "established."

**Explicitly NOT claimed - no laundered statistics.** Practitioner and secondary write-ups float specific figures for the size of the decomposition effect (for instance a "median error factor of 99 for holistic guesses versus 3 for decomposed ones," or "roughly a 42% error reduction"). Those numbers could **not** be verified to a primary source in this dossier's research, and stating them would read as far more precise than the grade warrants. This skill therefore cites **no effect-size figure**. The honest claim is directional only: decomposition can reduce error for extreme uncertain quantities, under an independence condition, on a thin evidence base.

## 4. Transferred-evidence flag

All of the above is **human-subject** evidence: human estimators making judgmental forecasts. It has **not** been validated for an AI agent. Transferred, not AI-validated. A model can run the same multiplicative decomposition and may inherit the same correlated-factor trap, plus model-specific failure modes (over-confident sub-estimates, anchoring on a remembered figure). The AI value is real but unproven: the structure forces the agent to expose each factor, its basis, and its band, so a reader can challenge one number instead of one opaque total - and the worksheet makes the independence assumption and the dominant uncertainty inspectable.

## 5. When it works / when it fails

**Works best when:**
- The target is a magnitude with **no lookup-able data and no usable reference class** - you genuinely have to build the number from factors.
- The quantity is **large and unfamiliar** (the regime where the controlled benefit appeared).
- The factors are **roughly independent** (do not share a single driver), so per-factor errors can partly cancel.
- An **order-of-magnitude** answer with an honest band is useful (sizing, sanity-checking, triage), not a number that must be exact.

**Fails or misleads when (poor-fit / anti-patterns):**
- **A genuine reference class with real base-rate data exists.** Then build the estimate from that data, not from invented factors - use `think-reference-class-forecasting`. Fermi is precisely the method for when no such class exists.
- **The task only needs the question decomposed for coverage, not a number.** If the goal is a mutually-exclusive, collectively-exhaustive breakdown of a question (and explicitly *no* number), use `think-issue-tree`, which produces a tree, not an estimate.
- **The quantity is ordinary and familiar.** Decomposing something you could estimate directly adds noise; the benefit was absent or negative in that regime.
- **Factors share a driver (correlated).** Multiplicative error-cancellation fails; the chain can be worse than one careful guess. Flag it and stop, or restructure to independent factors.
- **A point estimate is emitted with no band.** A Fermi number without its low/high range hides exactly the uncertainty the method is supposed to make legible. Never emit a point estimate alone.

## 6. Output artifact

A **Fermi decomposition worksheet**:
- The **target quantity** (and its unit) stated precisely.
- The **multiplicative factor chain** - the unknown written as a product of sub-quantities.
- A **per-factor band**: low / best / high for each factor, each with the **basis** for the guess (where the number came from).
- The **combined point estimate** (multiply the best-guesses) and a **low/high range** (compound the per-factor bands).
- An explicit **independence check** that flags any correlated factors (factors sharing a driver), because correlation breaks the cancellation premise.
- A **dominant-uncertainty flag** naming the one factor whose band most drives the width of the combined range - i.e. where to spend effort to tighten the answer.

## 7. Sources

1. MacGregor, D. G., & Armstrong, J. S. (2007). "Judgmental Decomposition: When Does It Work?" *Decision Sciences* (study of when decomposing an estimate into parts improves accuracy; benefit concentrated on extreme/uncertain quantities).
2. MacGregor, D. G. (2001). "Decomposition for judgmental forecasting and estimation." In J. S. Armstrong (ed.), *Principles of Forecasting*. Kluwer.
3. Fermi-problem tradition / quantitative-reasoning and case-interview pedagogy (the "within an order of magnitude" field lore) - practitioner, not controlled.
4. Statistical argument: a product of independent factors is approximately log-normal; the geometric mean of independent over/under estimates cancels (the cross-factor error-cancellation premise).

> **Verification status:** the *existence* of a conditional decomposition benefit (present for extreme/uncertain quantities, absent or negative for ordinary ones) and the *independence* sensitivity are the defensible claims and set the M/P grade. Specific effect-size numbers (e.g. "error factor 99 vs 3", "42% reduction") are **deliberately omitted** as unverifiable to a primary source. The honest scope - "directional help for build-from-factors magnitudes under an independence condition, on a thin base, human-subject not AI-validated" - is the core caveat.
