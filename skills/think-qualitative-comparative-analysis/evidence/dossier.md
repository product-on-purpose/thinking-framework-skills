# Evidence Dossier: Qualitative Comparative Analysis (contested lens, warn-and-redirect)

> Single source of truth for the `qualitative-comparative-analysis` skill. The SKILL.md, sidecar, and evals derive from this. The full catalog dossier lives at `frameworks/qualitative-comparative-analysis/dossier.md`; this is the skill-facing grounding.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.qualitative-comparative-analysis` (installable name `think-qualitative-comparative-analysis`) |
| **Family** | systems-and-consequences |
| **Evidence tier** | **P** (established research practice; no reasoning-outcome evidence) |
| **Posture** | contested lens, warn-and-redirect, explicit-request-only |
| **Confidence** | High that the truth table is unreliable at session scale; the honest move is to warn and redirect |

## 1. The mechanism (what QCA claims to do)

QCA treats each case not as a bundle of independent variables but as a whole configuration of conditions, then uses Boolean logic to find which combinations of conditions are necessary or sufficient for an outcome across a set of comparable cases. The procedure: calibrate every case's membership in each condition and in the outcome (binary in crisp-set QCA, graded 0 to 1 in fuzzy-set QCA); build a truth table where every logically possible combination of conditions is a row; minimize the table with the Quine-McCluskey procedure to derive the smallest set of configurations linked to the outcome; return to the cases to interpret. The mechanism is genuinely distinct (no shipped skill builds truth-table minimization across coded cases), but it does not fit a single-reasoner session, so this skill does not reproduce it as valid. It warns and redirects.

## 2. Lineage

- Charles Ragin, *The Comparative Method* (University of California Press, 1987) introduced crisp-set QCA; *Redesigning Social Inquiry: Fuzzy Sets and Beyond* (University of Chicago Press, 2008) added fuzzy sets and calibration.
- Benoit Rihoux and Charles Ragin (eds.), *Configurational Comparative Methods* (Sage, 2009) is the standard applied handbook (and states the roughly 10-to-50-case target).
- Carsten Schneider and Claudius Wagemann, *Set-Theoretic Methods for the Social Sciences* (Cambridge University Press, 2012), and their 2010 standards-of-good-practice paper, define current best practice. The COMPASSS network (compasss.org) is the method's community hub. "Qualitative Comparative Analysis" is a generic descriptive method name, not a trademark.

## 3. What the evidence shows, and what it does NOT show

**What the evidence supports:** QCA as a documented, teachable research method for medium-N comparative projects run under its published standards. The 2021 BMC Public Health systematic review (Hanckel and colleagues) endorsed it conditionally, with the comparable-cases precondition stated explicitly.

**What it does NOT show:** there is no controlled study, on humans or agents, measuring whether reasoners who apply QCA reach better judgments or decisions than reasoners who do not - the seven-tier question this library grades. Inside its own methods literature the core inferential claim is contested:

- Lucas and Szatrowski (2014, *Sociological Methodology* 44:1-79): ran QCA on simulated data with a known causal structure; across 70 solutions it recovered the correct causal story 3 times. (Peer-reviewed simulation critique, contested by replies in the same symposium.)
- Hug (2013, *Political Analysis* 21:252-265): inductive use plus measurement error leads to problematic inference.
- Krogslund, Choi and Poertner (2015, *Political Analysis* 23:21-41): parameter sensitivity and confirmation bias in fsQCA, including random variables certified as "sufficient."
- Baumgartner and Thiem (2020, *Sociological Methods and Research* 49:279-311): formal inverse-search trials found only the parsimonious solution type correct; conservative and intermediate solutions drew false causal inferences. (From authors inside the configurational-methods community.)

Methodological pedigree (textbooks, dedicated software, a methods community) is pedigree, not outcome evidence.

## 4. Transferred-evidence flag

Nothing here is transferred evidence; there is simply no reasoning-outcome evidence to transfer. The tier is P, not X: unlike ACH (X on randomized null evidence about its actual move), QCA carries no outcome trials at all, and its methodological debate is live, with standards-based responses. The redirect is grounded not in transferred evidence but in the simulation record plus the input-precondition failure at session scale.

## 5. When it works / when it fails

**Honest use:** as a research method, only when a real population of comparable, knowable cases exists (10 to 50), with case knowledge deep enough to defend every calibration, run under the published standards. In this library, only as a by-name request handled with the warn-and-redirect posture.

**Fails / misleads when:** run at session scale - few cases, several conditions (limited diversity, so the minimized solution rides on counterfactual assumptions); casual coding (results swing on calibration thresholds, and random variables get certified as sufficient); the output is read as causal inference (the conservative and intermediate solutions failed the inverse-search benchmark); or applied to a single case (that is within-case territory, process tracing).

## 6. Output artifact

An **honest redirect brief**: the evidence caveat, the real decision behind the request, an honest input check, and the specific evidence-based move to run instead (`think-reference-class-forecasting` for a set of comparable past cases as a base rate; within-case process tracing in prose for one case). Explicitly NOT a truth table or minimized configurations with a "sufficient configuration" verdict.

## 7. Sources

1. Lucas and Szatrowski (2014), *Sociological Methodology* 44:1-79 (3 correct stories in 70 solutions on simulated data).
2. Krogslund, Choi and Poertner (2015), *Political Analysis* 23:21-41 (random variables certified as sufficient in fsQCA).
3. Baumgartner and Thiem (2020), *Sociological Methods and Research* 49:279-311 (inverse-search benchmark; false causal inferences from conservative/intermediate solutions).
4. Ragin (1987, 2008) and Rihoux and Ragin (2009) (the origin and the standard handbook).
5. Hanckel and colleagues (2021), *BMC Public Health* 21:877 (conditional endorsement with the comparable-cases precondition).

> **Verification status:** the simulation critiques and the established-practice grading are independently verified source by source. QCA is documented and warned, not endorsed as a session move; the better-grounded shipped move for a set of comparable cases is `think-reference-class-forecasting`, and the within-case sibling for one case is process tracing in prose.
