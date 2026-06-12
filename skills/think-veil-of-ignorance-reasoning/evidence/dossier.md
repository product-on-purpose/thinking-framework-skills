# Evidence Dossier: Veil-of-Ignorance Reasoning

> The single source of truth for the `veil-of-ignorance-reasoning` skill. The `SKILL.md`, the
> sidecar (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not
> here, it does not belong in the skill. Reformatted from the vetted research dossier
> (`_local/proposed-builds/veil-of-ignorance-reasoning/dossier.md`); admitted as a Build at the
> governing tier M.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.veil-of-ignorance-reasoning` (installable name `think-veil-of-ignorance-reasoning`) |
| **Family** | ethics-values-deliberation |
| **Evidence tier** | **M** governing (moderate; honest read - see "What the evidence shows", including what it does NOT show) |
| **Confidence** | Moderate that equiprobable self-placement shifts a positioned judgment and surfaces silent self-interest; the measured outcome is a directional shift in a normatively contested judgment, not validated decision quality |
| **Status** | cand (admitted Build from the v0.7.0 phase-2 vetting sweep; governing tier M confirmed, not downgraded to P) |

---

## 1. The mechanism (what actually does the work)

Veil-of-ignorance (VOI) reasoning is an impartiality device for a values trade-off. The durable
cognitive move is judging an allocation or moral trade-off while **denied knowledge of which
affected party you are**, assuming an equal chance of being each of them, then returning to the
actual, positioned decision and confronting the two answers. The mechanism is knowledge
*removal* - de-identification plus equiprobable self-placement - not viewpoint enumeration. You do
not walk through each party's eyes one at a time; you make a single self-interested choice under
uncertainty about whose eyes you will be looking out of.

The candidate graded here is not Rawls' society-scale thought experiment but the **focused,
per-dilemma application** the modern experimental line tests: a two-stage procedure in which the
decider (1) enumerates the parties a specific decision affects, (2) decides the VOI version of the
dilemma - "what would I want if I had an equal chance of being each of these people?" - with the
decision rule carried behind the veil stated explicitly, and (3) responds to the standard,
positioned version of the same decision, confronting any gap between the veiled and positioned
answers.

The device has two distinct intellectual formulations that matter for using it honestly. John
Rawls (*A Theory of Justice*, 1971) put decision makers behind the veil to derive the governing
principles of a just society, and argued they would choose his "maximin" difference principle
(maximize the position of the worst-off). John Harsanyi (1953, 1955) had independently formulated
the same device decision-theoretically: an equal probability of being each person, combined with
expected-utility reasoning, yields average utilitarianism. Same veil, two different decision
rules, two different outputs. That is why the skillized version must force the decision rule
explicit rather than pretending the veil alone settles anything.

The output is a **veiled-decision comparison**: the affected parties, the explicit decision rule,
the veiled choice, the positioned choice, the named gap and what it reveals (typically where
self-position or group loyalty was silently driving the call), and the final defended position.
The point is not running the ritual; it is surfacing whether self-position was doing silent work
and producing a publicly justifiable position.

## 2. Lineage

The device enters modern philosophy through **John Rawls** (*A Theory of Justice*, Harvard, 1971),
who coined "veil of ignorance" for the epistemic restriction of his original position - read him
for the society-scale version and the maximin argument. **John Harsanyi** formulated the
equiprobability model earlier and independently ("Cardinal Utility in Welfare Economics and in the
Theory of Risk-Taking," 1953; "Cardinal Welfare, Individualistic Ethics, and Interpersonal
Comparisons of Utility," *Journal of Political Economy* 63, 1955) and derived average
utilitarianism from it. The Rawls-Harsanyi dispute is the cleanest demonstration that the veil's
output depends on the rule carried behind it. **Michael Sandel** (*Justice: What's the Right Thing
to Do?*, 2010, and earlier work) is the standard critic on what the veil wrongly strips away.

The experimental tradition begins with **Norman Frohlich and Joe Oppenheimer** (with Cheryl Eavey,
1987; *Choosing Justice*, University of California Press, 1992) - simulated veils in the lab,
unanimous convergence on floor-constrained averaging, maximin never chosen - and continues through
**Tatsuya Kameda** and colleagues (PNAS 113, 2016) on maximin as a cognitive anchor. The focused
per-dilemma application graded here is **Karen Huang, Joshua Greene and Max Bazerman** (PNAS,
2019), extended to self-serving bias by **Huang, Bernhard, Barak-Corren, Bazerman and Greene**
(*Judgment and Decision Making* 16(1), 2021), and carried into AI-principle selection by **Laura
Weidinger, Kevin McKee and colleagues** at DeepMind (PNAS, 2023).

"Veil of ignorance" is generic philosophical vocabulary with named academic attribution. Nothing
here is branded or trademarked. The attribution string credits John Rawls (1971) and John Harsanyi
(1953-1955) for the device, and the experimental line from Huang, Greene and Bazerman (2019).

## 3. What the evidence shows, and what it does NOT show

The honest governing grade is **M (moderate)**, confirming the wave-3 preliminary grade. This is
one of the rare candidates where controlled research tests the *actual move* - the same two-stage
exercise a skill would run - rather than an adjacent construct.

**What the record supports.**

- **Huang, Greene and Bazerman (2019, PNAS).** Seven experiments, n = 6,261, four pre-registered,
  materials and data on OSF. Participants who first completed the VOI version of a dilemma gave
  more utilitarian responses to the standard version across a philosophical dilemma (footbridge:
  38% vs 24% control), a bioethics dilemma (54% vs 43%), a real-stakes charity donation (63% vs
  54% donating to the more effective charity), and autonomous-vehicle policy (83% vs 58%).
  Critically for this library's overlap question, the controls isolate the mechanism: an anchoring
  control (study 4: VOI 75% vs anchoring 55%), a **reversed-probability control** (study 5:
  reversing the odds so they no longer embody impartiality shrank the effect, 73% vs 64%), and a
  **utilitarian-perspective-taking control** (study 6: VOI 37% vs 21% for participants told to
  adopt a utilitarian's perspective). The authors conclude the effect "cannot be explained by
  anchoring, probabilistic reasoning, or generic perspective taking" - the equiprobable
  self-placement is the active ingredient.
- **Huang, Bernhard, Barak-Corren, Bazerman and Greene (2021, Judgment and Decision Making).** Two
  pre-registered studies (n = 414; replication n = 1,276) on COVID-19 ventilator allocation: VOI
  reasoning shifted preferences toward saving younger patients and *eliminated self-serving bias* -
  the effect was concentrated in older participants, whose opposition reversed.
- **Weidinger, McKee, Everett, Huang, Zhu and colleagues (2023, PNAS; DeepMind).** Five studies,
  n = 2,508, an independent research group: participants choosing principles to govern an AI
  assistant from behind a veil more often chose, and endorsed on later reflection, principles
  prioritizing the worst-off, driven by fairness considerations rather than risk attitudes or
  political orientation. Evidence the device works in an AI-governance framing; still humans doing
  the reasoning.
- **The classic experimental line.** Frohlich, Oppenheimer and Eavey (1987) and Frohlich and
  Oppenheimer (*Choosing Justice*, 1992) put small groups behind simulated veils and found robust
  unanimous convergence on a distribution principle - but on floor-constrained average
  maximization, never Rawls' maximin. Kameda and colleagues (2016, PNAS) found maximin operates as
  a common cognitive anchor across distributive and risky decisions. Together: the veil reliably
  changes and partially converges judgments; *which* principle it produces is rule- and
  context-dependent.

**What the record does NOT support.** No study shows VOI reasoning produces *better decisions* by
an outcome standard. The measured effect is a directional shift in normatively contested judgments
(toward aggregate welfare in the 2019/2021 line, toward worst-off priority in the 2023 line; the
difference is itself instructive). The 2019 paper explicitly declines to resolve the
Rawls-Harsanyi dispute or claim the shift is desirable - the authors state the findings "neither
assume nor demonstrate that the effects of VOI reasoning are desirable." Cross-dilemma transfer
failed: study 7 (pre-registered, n = 1,390) tested whether doing VOI exercises on two dilemmas
transferred to a *different* dilemma and found no significant effect on the main dichotomous
measure against either control. So no training or durability claim is supported - it is a
per-decision device. The effect sizes are judgment-proportion shifts of roughly 9 to 25
percentage points in the dilemmas tested, not transformations.

**Why M and not S.** Direct, replicated, multi-lab, partly pre-registered controlled evidence on
the exact move would ordinarily argue strongly. The cap at M reflects that the dependent variable
is normatively contested *direction* rather than validated decision quality, the established
transfer boundary (study 7), and the rule-indeterminacy shown by the older experimental line.

**Why M and not P (the conservative-split rule).** The grade is not transferred from a sibling
method or an adjacent construct. The 2019/2021/2023 studies test this procedure, on these kinds of
dilemmas, against the controls that matter (anchoring, probability, perspective-taking). The
split-grade cap that downgrades "M" candidates whose evidence sits on neighboring claims does not
apply here; the boundaries do, and they are stated.

**Excluded figures (required).** No unsourced statistic is asserted; every number above traces to
the named study. No claim of a general "X% better decisions" exists in this literature, and none
is made.

## 4. Transferred-evidence flag (required honesty for this library)

All evidence is from human subjects. The 2023 study concerns humans choosing principles *for* AI
systems, not AI agents performing VOI reasoning. Nothing here is validated for AI-agent execution
of the exercise. The evidence is **transferred from human contexts and not agent-validated**. The
AI value is mechanical and modest: an agent makes the device cheap to run, enforces the discipline
(a real affected-party enumeration, an explicit decision rule carried behind the veil, an honest
confrontation of the veiled-vs-positioned gap), and produces a durable, inspectable artifact -
benefits that do not depend on any contested outcome claim. The skill ships honestly as an
M-tier impartiality aid that surfaces silent self-interest and produces a defensible position,
never as a neutral verdict and never as a producer of "better" ethical decisions.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**
- A decision distributes benefit and burden across parties and the decider's own position is doing
  silent work: scarce-resource allocation (who gets the ventilator, the headcount, the discount,
  the latency budget), policy and platform calls that trade one user group's safety or welfare
  against another's, and prioritization decisions where the deciding team is itself one of the
  affected parties.
- Self-serving bias is the risk. The strongest documented use case (Huang et al. 2021) is exactly
  this: VOI reasoning reversed older participants' opposition to youth-prioritizing ventilator
  policy, eliminating the self-serving gap between age groups.
- A defensible, publicly justifiable position is needed. Huang, Greene and Bazerman (2019) close
  on this: one can credibly say "this is what I would want for myself if I did not know who I was
  going to be."

**Fails or misleads when (poor-fit / anti-patterns):**
- **The veil is treated as self-justifying.** The veil does not by itself produce an answer; the
  decision rule brought behind it does. Harsanyi's expected-value rule yields average
  utilitarianism, Rawls' maximin yields worst-off priority, and Frohlich and Oppenheimer's
  experimental groups chose neither - they converged on floor-constrained average maximization and
  never chose Rawls' difference principle. Running the exercise without stating the rule launders a
  contested normative choice as "impartiality." This is the central wall.
- **Identity information is morally load-bearing.** The veil strips knowledge of who is who. When
  particular obligations matter - promises, fiduciary duties, desert, compensatory claims for past
  wrongs, special relationships - that stripped information is morally *relevant*, not bias. This
  is the core of Sandel's critique of the original position; the skill must wall these cases off
  rather than veil them away.
- **A neutral analysis is expected.** The device has a known directional push: across all seven
  2019 experiments it shifted judgments toward the aggregate-welfare ("greater good") option. The
  authors are explicit that the findings "neither assume nor demonstrate that the effects of VOI
  reasoning are desirable." If worst-off protection, rights, or commitments are what the situation
  demands, the veiled answer is an input to deliberation, not a verdict.
- **It is used as training rather than per-decision.** Cross-dilemma transfer failed (study 7). It
  is a per-decision device; run it on the decision at hand or not at all. No claim that running it
  builds lasting impartiality is supported.
- **The question is empirical, not normative.** "Which option maximizes retention" needs analysis,
  not impartiality. The veil applies only when the contested matter is whose interests count and
  how much.

## 6. Output artifact

The skill must emit a **veiled-decision comparison**, not prose: the focal decision and the
question type (confirm it is a normative whose-interests-count trade-off, not an empirical one);
the enumerated affected parties; an explicit load-bearing-identity check (does desert, a promise, a
fiduciary duty, or a compensatory claim make the stripped identity information morally relevant? if
yes, flag and stop or scope down); the **explicit decision rule** carried behind the veil (average
utility, maximin worst-off priority, or a floor-constrained variant - stated, not assumed); the
**veiled choice** (what you would want with an equal chance of being any party, under that rule);
the **positioned choice** (the standard, identity-known answer); the **named gap** and what it
reveals about silent self-position or group loyalty; and the **final defended position**, framed as
one input with a known directional push, never as a neutral verdict. A pre-printed evidence caveat
ships in the artifact by construction.

## 7. Sources

1. Karen Huang, Joshua D. Greene and Max Bazerman, "Veil-of-ignorance reasoning favors the greater
   good," *PNAS* 116 (2019), doi 10.1073/pnas.1910125116. Seven experiments, n = 6,261, four
   pre-registered; the VOI exercise shifts subsequent judgments toward the greater-good option
   across philosophical, bioethics, real-donation, and autonomous-vehicle-policy dilemmas;
   anchoring, probabilistic-reasoning, and perspective-taking controls ruled out; study 7
   establishes the cross-dilemma transfer boundary. The primary evidence for the move. (M)
2. Karen Huang, Regan M. Bernhard, Netta Barak-Corren, Max H. Bazerman and Joshua D. Greene,
   "Veil-of-ignorance reasoning mitigates self-serving bias in resource allocation during the
   COVID-19 crisis," *Judgment and Decision Making* 16(1) (2021): 1-19. Two pre-registered studies
   (n = 414; n = 1,276); the self-serving-bias-elimination result. (M)
3. Laura Weidinger, Kevin R. McKee, Richard Everett, Saffron Huang, Tina O. Zhu and colleagues,
   "Using the Veil of Ignorance to align AI systems with principles of justice," *PNAS* 120(18)
   (2023): e2213709120. Five studies, n = 2,508, an independent group; behind the veil
   participants more often choose and later endorse worst-off-prioritizing principles for an AI
   assistant, driven by fairness considerations. Humans choosing principles for AI, not AI doing
   the reasoning. (M)
4. Norman Frohlich, Joe A. Oppenheimer and Cheryl L. Eavey, "Laboratory Results on Rawls's
   Distributive Justice," *British Journal of Political Science* 17(1) (1987): 1-21; and Norman
   Frohlich and Joe A. Oppenheimer, *Choosing Justice: An Experimental Approach to Ethical Theory*
   (University of California Press, 1992). The classic experimental veil: robust convergence, but
   on floor-constrained average maximization, never maximin - the rule-indeterminacy evidence. (M
   for the convergence finding; X for Rawls' specific maximin prediction.)
5. Tatsuya Kameda et al., "Rawlsian maximin rule operates as a common cognitive anchor in
   distributive justice and risky decisions," *PNAS* 113 (2016): 11817-11822. Maximin as a
   spontaneous cognitive anchor across decision domains; context for what deciders bring behind the
   veil. (M)
6. John Rawls, *A Theory of Justice* (Harvard University Press, 1971); John C. Harsanyi, "Cardinal
   Welfare, Individualistic Ethics, and Interpersonal Comparisons of Utility," *Journal of
   Political Economy* 63 (1955): 309-321. The two foundational formulations; philosophical, not
   outcome evidence - cited for lineage and the rule-dependence of the device, not toward the
   grade. (Foundational.)

> Excluded on the evidence rule: no decision-quality or "better-ethics" effect size is asserted as
> fact, because none exists in this literature. The measured effect is a directional shift in
> normatively contested judgments (roughly 9 to 25 percentage points in the dilemmas tested),
> reported with its transfer-failure boundary and the rule-indeterminacy of the classic line, and
> all of it is human-subject evidence not validated for AI-agent execution.
