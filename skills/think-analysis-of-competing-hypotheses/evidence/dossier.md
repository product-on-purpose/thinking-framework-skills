# Evidence Dossier: Analysis of Competing Hypotheses (contested lens, warn-and-redirect)

> Single source of truth for the `analysis-of-competing-hypotheses` skill. The SKILL.md, sidecar, and evals derive from this. The full catalog dossier lives at `frameworks/analysis-of-competing-hypotheses/dossier.md`; this is the skill-facing grounding.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.analysis-of-competing-hypotheses` (installable name `think-analysis-of-competing-hypotheses`) |
| **Family** | assumption-and-belief-challenge |
| **Evidence tier** | **X** (tested and found wanting) |
| **Posture** | contested lens, warn-and-redirect, explicit-request-only |
| **Confidence** | High that the matrix does not improve accuracy; the honest move is to warn and redirect |

## 1. The mechanism (what ACH claims to do)

ACH builds an evidence-by-hypothesis disconfirmation matrix: hypotheses across the top, evidence down the side, each cell scored consistent / inconsistent / not applicable, items weighted by diagnosticity, and the hypothesis with the least inconsistent evidence tentatively accepted. The mechanism is genuinely distinct (no shipped skill builds this matrix), but it was tested and found wanting, so this skill does not reproduce it as valid. It warns and redirects.

## 2. Lineage

- Richards J. Heuer Jr., *Psychology of Intelligence Analysis* (CIA Center for the Study of Intelligence, 1999), ch. 8; systematized with Randolph Pherson, *Structured Analytic Techniques for Intelligence Analysis* (2011).
- "Analysis of Competing Hypotheses" is a generic descriptive term from a US government publication in the public domain; no trademark holder.

## 3. What the evidence shows (controlled record is null-to-negative)

- Otzipka (2025, *Applied Cognitive Psychology* 39(5)): 222 participants; ACH significantly raised confidence with no accuracy gain.
- Dhami, Belton and Mandel (2019, *Applied Cognitive Psychology* 33(6)): 50 analysts randomized; steps skipped, mixed bias effects, possibly increased inconsistency and error.
- Karvetski and Mandel (2020, *Judgment and Decision Making* 15(6), N=227): no gain in additivity, coherence, or consistency; slightly reduced reliability.
- Whitesmith (2019); Maegherman et al. (2021); Dhami et al. (2024, the matrix layout specifically failed where a transposed layout helped); Otzipka and Volbert (2026): no debiasing.
- Positives are confined to novices (Lehner et al. 2008) and one small military study (Folker 2000).

The documented mechanism flaw: counting inconsistencies treats evidence items as independent and equally weighted, which they almost never are. Institutional adoption (US tradecraft, UK PHIA, the PARC tool) is adoption evidence, not outcome evidence. The "unparalleled artifact, so build it" argument is grade laundering: artifact elegance is not an evidence tier.

## 4. Transferred-evidence flag

The controlled studies are human-subject trials, several on the home population (intelligence analysts) and stated purpose (debiasing). This is direct negative evidence, not transferred-and-untested. It does not become valid under AI execution.

## 5. When it works / when it fails

**Honest use:** only as a by-name request handled with the warn-and-redirect posture.

**Fails / misleads when:** run as intended (the matrix raises confidence without accuracy); or when institutional adoption is cited as if it were effectiveness.

## 6. Output artifact

An **honest redirect brief**: the controlled-evidence caveat, the real decision behind the request, and the specific evidence-based shipped move to run instead (`think-red-team-light`, `think-evidence-vs-inference-sort`, or `think-what-would-have-to-be-true`). Explicitly NOT a disconfirmation matrix with a declared winner.

## 7. Sources

1. Otzipka (2025), *Applied Cognitive Psychology* 39(5) e70115 (confidence up, accuracy flat).
2. Dhami, Belton and Mandel (2019), *Applied Cognitive Psychology* 33(6).
3. Karvetski and Mandel (2020), *Judgment and Decision Making* 15(6), N=227.
4. Heuer (1999), *Psychology of Intelligence Analysis*, ch. 8 (the origin).

> **Verification status:** the negative record is independently verified source by source. ACH is documented and warned, not endorsed; the better-grounded sibling for genuine within-case rival-explanation work is process tracing.
