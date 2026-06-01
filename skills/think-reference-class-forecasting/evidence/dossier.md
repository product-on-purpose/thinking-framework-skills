# Evidence Dossier: Reference Class Forecasting

> Single source of truth for the `reference-class-forecasting` skill. The SKILL.md, sidecar, and evals derive from this. This is one of the library's strong-evidence anchors.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.reference-class-forecasting` (installable name `think-reference-class-forecasting`) |
| **Family** | risk-and-resilience |
| **Evidence tier** | **S** (strong; empirical + real-world institutional adoption) |
| **Confidence** | High - among the best-evidenced debiasing methods |
| **Status** | draft (authored 2026-05-31 from the discovery corpus) |

## 1. The mechanism (what actually does the work)

People forecast from the **inside view**: they build an estimate from the specifics of their own plan, which invites optimism and the planning fallacy (systematic underestimation of cost, time, and risk). Reference class forecasting replaces that with the **outside view**: find a reference class of similar past cases, get the **base-rate distribution** of how they actually turned out (cost overruns, schedule slips, success rates), and anchor the forecast on that distribution, adjusting only cautiously for genuine specifics. The work is done by anchoring on real outcomes of comparable cases instead of on the inside story, which is what corrects the optimism.

## 2. Lineage

- Kahneman & Tversky introduced the inside/outside view distinction; Kahneman & Lovallo (1993) formalized the planning fallacy and the case for the outside view.
- Bent Flyvbjerg developed reference class forecasting for large infrastructure projects (documenting systematic cost and schedule overruns) and it has been **adopted by institutions** (for example UK Treasury / transport planning guidance) - real-world uptake, not just lab results.

No trademark. Named descriptively.

## 3. What the evidence shows, and what it does NOT show

**Strongly supported (the S):** the planning fallacy is robustly demonstrated, and taking the outside view via reference classes measurably reduces forecast error; Flyvbjerg's work and its institutional adoption are real-world validation, not only experiments. This is a genuine strong-evidence method and a credibility anchor for the library.

**Boundaries (still honest):** it requires a genuine reference class with real base-rate data. Where no comparable class exists (a truly novel undertaking), or where the specifics genuinely dominate, the method weakens. And it forecasts a distribution, not a certainty.

## 4. Transferred-evidence flag

The strong evidence is from human forecasting and large projects, not AI-augmented use. Transferred, not AI-validated. The AI value is real and pointed: a model will happily produce an inside-view, optimistic estimate from a plan's details; forcing it to construct a reference class and anchor on base rates is a direct counter, with the honest constraint that the agent must use real base-rate data, not invented numbers.

## 5. When it works / when it fails

**Works best when:** forecasting cost, time, or odds of success for something with comparable precedents; the inside view is likely optimistic; high-stakes commitments prone to the planning fallacy.

**Fails or misleads when (poor-fit / anti-patterns):**
- **No real base-rate data** - inventing a distribution is worse than admitting uncertainty (the central failure mode for an AI).
- Choosing a reference class that is too narrow, too flattering, or not actually comparable.
- Over-adjusting back toward the optimistic inside view ("but we are different").
- Genuinely novel undertakings with no comparable class.
- Treating the outside estimate as a point certainty rather than a distribution.

## 6. Output artifact

A **reference-class estimate**: the reference class defined (and why it is comparable), the base-rate distribution (typical and worst-case outcomes, with the data source or an explicit flag that data is missing), the original inside-view estimate, the outside-anchored estimate, and the adjustment rationale (kept conservative).

## 7. Sources

1. Kahneman, D., & Lovallo, D. (1993) - timid choices, bold forecasts; the planning fallacy and the outside view.
2. Flyvbjerg, B. - reference class forecasting for infrastructure; documented cost/schedule overruns; institutional adoption (e.g. UK guidance).
3. Kahneman, D. (2011), *Thinking, Fast and Slow* - inside vs outside view popularization.

> **Verification status:** the planning-fallacy and Flyvbjerg findings, and the institutional adoption, are well-attested; the "S" grade is justified. Keep the "use real base rates, not invented ones" constraint front and center for AI use.
