# Evidence Dossier: Framework Advisor

> The single source of truth for the `tfs-framework-advisor` skill. The `SKILL.md`, the
> sidecar (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is
> not here, it does not belong in the skill. This skill is a **meta/router**, so its
> evidence is about the *act of matching a thinking method to a situation* - distinct from
> the evidence for any one framework it recommends (those carry their own dossiers).

| | |
|---|---|
| **Skill** | `thinking-framework-skills.framework-advisor` (installable name `tfs-framework-advisor`) |
| **Family** | meta-thinking-and-reflection (router across all families) |
| **Evidence tier** | **M/C (split)** - see section 3. M that applying a *fitting structured method* helps (with an S empirical core in one narrow case); C that *this router reliably selects the right method* (untested). |
| **Confidence** | Moderate that structured-method-fit beats unaided judgment; low that automated routing accuracy is validated. The skill must claim the former and disclaim the latter. |
| **Status** | draft (first authored 2026-06-01; evidence verified via a 5-agent web-verification pass) |

---

## 1. The mechanism (what actually does the work)

The advisor does three moves, in order, and its value is in doing them honestly and *subtractively*:

1. **Diagnose the cognitive job.** Classify the situation by the *thinking move it needs* (reframe, diverge, challenge assumptions, stress-test, reason about the system, decide, synthesize, reflect), by evidence from the input, not by topic. Name the **dominant** job - the one that unblocks the most right now. This is the routing engine; the library's 11-family catalog is its table.
2. **Calibrate the heft.** Read the decision's **reversibility x stakes** and let that cap how many frameworks and how much rigor to prescribe. This is the governor against over-tooling: a reversible, low-stakes call gets one fast move; a one-way-door, high-stakes call earns the fuller sequence.
3. **Route to the fitting method(s) and hand off.** Recommend the fewest frameworks that do the work, in sequence, each tagged with its own evidence tier, each with a filled, ready-to-run invocation - and say explicitly what *not* to use.

The load-bearing principle is **subtraction**: prescribing more frameworks is not better thinking. The mechanism we implement is "diagnose -> calibrate -> recommend the minimal fitting sequence," not "run the user through a battery."

## 2. Lineage

- **The over-application failure mode the advisor guards against** ("law of the instrument"): Kaplan, A. (1964), *The Conduct of Inquiry*, p. 28 ("Give a small boy a hammer, and he will find that everything he encounters needs pounding"); restated with the now-popular "nail" wording in Maslow, A. H. (1966), *The Psychology of Science*, pp. 15-16. The closest *empirical* cousin is the **Einstellung (mental set) effect**: Luchins, A. S. (1942), and Luchins & Luchins (1959) - prior success with one method induces a set that persists even when a simpler one is available.
- **The heft calibrator** (match deliberation to reversibility): Bezos, J. P., **2015 Letter to Shareholders** (Amazon; released spring 2016 with the FY2015 report), the "one-way door / two-way door" (Type 1 / Type 2) framing. Its decision-theoretic shadow is the irreversibility-under-uncertainty literature (Arrow & Fisher 1974; Bernanke 1983; McDonald & Siegel 1986; Dixit & Pindyck 1994). This library already ships the practitioner version as `tfs-one-way-vs-two-way-door`.
- **The contingency stance** (the right method depends on the situation): Snowden & Boone (2007), the Cynefin sense-making model; and the naturalistic-decision-making tradition (Klein 1998, *Sources of Power*; Klein et al. 1993; Mosier et al. 2018).
- **The "structured method helps" basis**: the clinical-vs-mechanical-prediction line (Meehl 1954; Dawes 1979; Grove et al. 2000) and the decision-process literature (Lovallo & Sibony 2010; Kahneman, Lovallo & Sibony 2011; Kahneman, Sibony & Sunstein 2021; Milkman, Chugh & Bazerman 2009).

No trademark on the advisor itself. Note: **Cynefin is a proprietary framework developed through Snowden's consultancy** (not a verified registered trademark); the advisor borrows the contingency idea, not the Cynefin model, and tiers it honestly.

## 3. What the evidence shows, and what it does NOT show

This is the honest core. The skill must not overclaim. The grade is a **split**, because the advisor does two separable things and they have very different evidentiary support.

### 3a. "Applying a fitting structured method beats unaided judgment" - tier M, with an S core

**Supported:**
- **S (narrow, replicated):** Mechanical/linear combination of cues equals or beats holistic expert judgment for *repeated, measurable predictive judgments*. Grove et al. (2000) meta-analysis (~136 studies): ~10% higher accuracy on average, with mechanical equal-or-better in most studies (not a uniform +10% per study), robust across task and expertise; Dawes (1979) and Meehl (1954) established that even crude ("improper") linear models beat intuition. This is the genuine empirical anchor - but it is confined to repeated numerical prediction with valid cues, **not** unique strategic one-offs.
- **M (correlational field evidence):** Decision *process* quality predicts decision outcomes. Lovallo & Sibony (2010) studied 1,048 major business decisions and found process mattered more than analysis "by a factor of six"; Kahneman, Lovallo & Sibony (2011) build a 12-question checklist on it. This is observational, self-reported, not peer-reviewed - suggestive, not proof.
- **P (synthesis/advocacy):** Structured "decision hygiene" reduces noise (Kahneman, Sibony & Sunstein 2021, *Noise*). A peer-reviewed survey of debiasing (Milkman, Chugh & Bazerman 2009) organizes the case and is honest that evidence for many interventions is mixed.

**Net for 3a: M.** Using a structured method that fits the decision type is well-motivated and, in one narrow case, strongly proven (S). It is not a blanket law that "any structure helps any decision."

### 3b. "This router reliably picks the *right* method for your situation" - tier C

**Not shown.** No source tested the accuracy of *method selection / routing* - the advisor's actual distinctive act. The contingency stance it rests on (Cynefin: C, a sense-making model with limited independent validation; NDM: M as a descriptive paradigm) establishes that *different situations have been studied with different methods*, not a validated rule for picking one. So the routing step is **conceptually plausible but under-tested (C)**. The advisor must own this.

### 3c. "Fewer frameworks is better" (the subtraction principle) - motivation, not proof (C)

The "law of the instrument" (Kaplan 1964; Maslow 1966) is an aphorism, not evidence. The Einstellung effect (Luchins 1942) is real experimental evidence for *method rigidity* but is about within-task carryover, not framework over-prescription - it supports the failure mode *by analogy* (M for the effect, C for the inference). **Choice overload / "paradox of choice" is contested**: Iyengar & Lepper (2000) is real but context-bound; Scheibehenne, Greifeneder & Todd (2010) meta-analyzed 50 studies and found a *near-zero mean effect*; Chernev, Bockenholt & Goodman (2015) recovers a *moderated* effect under specific preconditions. So "more options harm decisions" is **not** established science. The advisor may use minimalism only as a **context-sensitive heuristic**, never as a proven law.

### Bottom line for the frontmatter

**M/C.** Honest one-liner the skill must carry: *"Applying a fitting structured method to a decision is well-supported (M, with an S core for mechanical prediction). Whether this router picks the right method for you is not validated (C). The frameworks it recommends carry their own, often stronger, evidence - trust those tiers, and treat the routing as a useful starting hypothesis, not a verified answer."*

## 4. Transferred-evidence flag (required honesty for this library)

Two gaps, both of which the skill must state:

1. **Human-context evidence, not AI-validated.** All of the support above comes from human decision-makers. There is **no study** of an AI agent doing the routing, nor of whether an agent-produced Thinking Plan improves a human's decision. As with the rest of the library, treat the AI value as: the agent makes diagnosis cheap, enforces the subtraction discipline, and produces a durable, auditable artifact - benefits that do not depend on the unproven routing-accuracy claim.
2. **The routing accuracy itself is untested** (section 3b). This is a stronger caveat than the usual transferred-evidence flag and is specific to a meta/router skill: even granting all the human evidence, *whether this particular decision table selects the right method* has not been measured. The skill mitigates this structurally - it shows its diagnosis and `Source:` citations so a user can challenge the routing ("why this job, why this framework?"), and it always lists what it chose **not** to recommend.

## 5. When it works / when it fails (drives the eval negative cases)

**Works best when:**
- The user has a genuine reasoning/decision situation and is unsure which move to make.
- There is enough signal to diagnose a dominant job (stakes and reversibility are stated or inferable).
- The user benefits from a small, sequenced, named plan plus filled hand-off prompts.

**Fails or misleads when (poor-fit / anti-patterns):**
- **Not a thinking task** (factual lookup, coding, content generation): the advisor should redirect, not recommend frameworks.
- **The user wants the framework executed, not selected.** If they already know they want a premortem, route them straight to `tfs-premortem`; the advisor is for "what should I even do here?"
- **Over-stacking** (the signature failure): recommending five frameworks "to be thorough." The stakes calibrator exists to prevent exactly this; a Thinking Plan that ignores it has failed.
- **Inventing a skill name.** Naming a framework not in `references/recommendable.json` is a critical defect. Plain-language fallback is mandatory when no listed component fits.
- **Tier inflation.** Presenting a P-tier framework as settled science, or claiming S for the routing. The split grade in section 3 forbids this.
- **A thin-family situation** (most of strategy -> `pm-skills`; group facilitation -> human-social) forced into a poor-fit `tfs-` recommendation instead of an honest "this library serves that poorly."

## 6. Output artifact

The skill must emit a **Thinking Plan**, not prose: a source ledger, an executive summary, an input mirror, a diagnosis (dominant job + stakes/reversibility/heft), a prioritized sequence of 1-4 framework recommendations (each with job, why-this-one, evidence tier, expected artifact, a filled invocation, and a stop signal), an explicit "what NOT to use, and why," and an evidence/source map. Structure in `references/TEMPLATE.md`; worked example (the Northwind scenario) in `references/EXAMPLE.md`.

## 7. Sources

Verified in a 5-cluster web-verification pass (2026-06-01); reliability noted per item.

**The advisor's own basis (structured-method value):**
1. Grove, W. M., Zald, D. H., Lebow, B. S., Snitz, B. E., & Nelson, C. (2000). "Clinical versus mechanical prediction: A meta-analysis." *Psychological Assessment* 12(1):19-30. **(primary; S; narrow scope)**
2. Dawes, R. M. (1979). "The robust beauty of improper linear models in decision making." *American Psychologist* 34(7):571-582. **(primary; S; narrow scope)**
3. Meehl, P. E. (1954). *Clinical versus Statistical Prediction.* Univ. of Minnesota Press. **(primary; foundational)**
4. Lovallo, D., & Sibony, O. (2010). "The Case for Behavioral Strategy." *McKinsey Quarterly.* **(field study, 1,048 decisions; M; correlational, not peer-reviewed)**
5. Kahneman, D., Lovallo, D., & Sibony, O. (2011). "Before You Make That Big Decision." *Harvard Business Review* 89(6):50-60. **(primary; M; practitioner checklist)**
6. Kahneman, D., Sibony, O., & Sunstein, C. R. (2021). *Noise: A Flaw in Human Judgment.* Little, Brown Spark. **(synthesis/advocacy; P)**
7. Milkman, K. L., Chugh, D., & Bazerman, M. H. (2009). "How Can Decision Making Be Improved?" *Perspectives on Psychological Science* 4(4):379-383. **(peer-reviewed survey; honest about mixed debiasing evidence)**

**The heft calibrator (reversibility):**
8. Bezos, J. P. **2015 Letter to Shareholders** (Amazon; released spring 2016), "Invention Machine" section - the Type 1/Type 2, one-way/two-way door framing. **(primary; P. NOTE: it is the 2015 letter, not the 2016 letter - a common citation error.)**
9. Arrow, K. J., & Fisher, A. C. (1974), *QJE* 88(2):312-319 (quasi-option value); Bernanke (1983), *QJE* 98(1):85-106; McDonald & Siegel (1986), *QJE* 101(4):707-728; Dixit & Pindyck (1994), *Investment under Uncertainty.* **(decision-theoretic shadow; M; supports the principle by analogy, not the specific calibrator.)**

**The contingency stance (method-fit):**
10. Snowden, D. J., & Boone, M. E. (2007). "A Leader's Framework for Decision Making." *Harvard Business Review* 85(11):68-76 (Cynefin). **(primary; C; sense-making model, proprietary, limited independent validation.)**
11. Klein, G. A. (1998). *Sources of Power: How People Make Decisions.* MIT Press (RPD/NDM). **(primary; M; field/observational.)** Plus Klein et al. (1993); Mosier, Fischer, Hoffman & Klein (2018), *Cambridge Handbook of Expertise* (2nd ed., ch. 23).

**The subtraction principle (over-application / choice overload):**
12. Kaplan, A. (1964), *The Conduct of Inquiry*, p. 28; Maslow, A. H. (1966), *The Psychology of Science*, pp. 15-16. **(aphorisms; C - origin of the concept, not proof.)**
13. Luchins, A. S. (1942), "Mechanization in problem solving: The effect of Einstellung," *Psychological Monographs* 54(6); Luchins & Luchins (1959). **(M for the effect; supports the failure mode by analogy.)**
14. Iyengar, S. S., & Lepper, M. R. (2000), *JPSP* 79(6):995-1006; Scheibehenne, Greifeneder & Todd (2010), *J. Consumer Research* 37(3):409-425 (near-zero mean effect); Chernev, Bockenholt & Goodman (2015), *J. Consumer Psychology* 25(2):333-358 (moderated). **(choice overload is contested; C as a hard justification - soft motivation only.)**

> **Verification status:** all citations above were checked in a web-verification pass on 2026-06-01; primary vs reputable-secondary reliability is noted per item. Items 1-3, 5, 8, 10, 11, 14 were confirmed against primary or publisher records; items 9 and 13 are confirmed by citation metadata and standard secondary literature (treat exact internal wording as not line-verified). The honest split grade (M/C) is the load-bearing conclusion and is what the skill claims.
