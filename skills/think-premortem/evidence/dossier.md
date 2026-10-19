# Evidence Dossier: Premortem

> The single source of truth for the `premortem` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not
> here, it does not belong in the skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.premortem` (installable name `think-premortem`) |
| **Family** | risk-and-resilience |
| **Evidence tier** | **S/M** (contested - see "What the evidence shows" below) |
| **Confidence** | Moderate-high that the mechanism helps; low that the published effect sizes mean what they are usually quoted to mean |
| **Status** | draft (first authored 2026-05-31, against discovery corpus) |
| **Reviewed** | 2026-10-19 |

---

## 1. The mechanism (what actually does the work)

A premortem is a deliberate act of **prospective hindsight**: instead of asking "what could go wrong?", you assert that the plan *has already failed* and reason backward to explain why. The shift from a conditional ("might fail") to a definite past ("has failed") is the load-bearing move. It does three things:

1. **Licenses dissent.** Once failure is assumed, naming a reason is no longer disloyalty or pessimism; it is the assigned task. This is why a premortem surfaces concerns that normal risk review and optimistic planning suppress.
2. **Recruits memory and imagination differently.** Explaining a concrete past event is a richer retrieval cue than forecasting an abstract future one, so people generate more, and more specific, causes.
3. **Converts vague worry into pre-committed action.** The output is not a feeling of caution but named causes, each paired with a mitigation, a leading signal (tripwire), and a kill criterion decided *before* sunk cost and momentum distort judgment.

The mechanism is what we implement. The branded "premortem" ritual is the packaging; the durable move is prospective hindsight plus structured conversion to mitigations.

## 2. Lineage

- **Prospective hindsight** as a cognitive effect: Mitchell, D. J., Russo, J. E., & Pennington, N. (1989). "Back to the future: Temporal perspective in the explanation of events." *Journal of Behavioral Decision Making*, 2(1), 25-38.
- **The "premortem" technique** as a management practice: Klein, G. (2007). "Performing a Project Premortem." *Harvard Business Review*, 85(9). Popularized further in Kahneman, *Thinking, Fast and Slow* (2011).
- **Direct evaluation:** Veinott, B., Klein, G., & Wiggins, S. (2010). "Evaluating the Effectiveness of the PreMortem Technique on Plan Confidence." *Proceedings of ISCRAM 2010*.

No trademark. "Premortem" is a generic descriptive term in common use; no attribution is required and none is claimed. We name the skill descriptively and cite the lineage here rather than branding it.

## 3. What the evidence shows, and what it does NOT show

This is the honest core of the dossier. The skill must not overclaim.

**What is reasonably supported (reason generation is the S part; the confidence effect is M):**
- Prospective hindsight (assuming an outcome and explaining it) **increases the number and specificity of causes people generate** relative to ordinary forecasting. In Mitchell, Russo & Pennington (1989), what mattered was outcome certainty: explanations of events treated as certain were longer and included more episodic reasons, while past-versus-future framing had little effect. The popular "**30%**" figure is usually attributed to Klein's (2007) account of that study. It does not appear in the paper's abstract, and this library has not found it in the paper (checked 2026-10-15).
- The technique **lowers confidence in a flawed plan**. In Veinott et al. (2010), 178 participants rated a plan written with deliberate flaws, and the premortem lowered their confidence in it more than critique, pro/con or cons-only review did. The authors call it "a useful tool for combating overconfidence", but they did not measure calibration: "We did not directly examine overconfidence". The effect rests on this one peer-reviewed study, so it is graded M, not S (maintainer decision, 2026-10-19).

**What is NOT shown (the caveat that keeps the skill honest):**
- The widely-quoted "**premortems make decisions ~30% better**" claim **has no support**. The 30% figure is usually credited to Klein's (2007) account of Mitchell, Russo and Pennington (1989), and this library has not found it in that paper (see above). No source located here ties it to decision quality, outcome, or accuracy. Generating more reasons is not the same as deciding better. (Reworded on 2026-10-17. This line previously said the figure measures the number of reasons identified, which this library has not verified.)
- **It may trade one bias for another.** A conference poster reports three pre-registered studies and a pilot (N = 2,345). In them, the premortem reduced overconfidence but magnified self-serving attribution: people blamed prospective failures on factors outside their control, such as weather or luck. Taking action to improve results did not differ across conditions (Gandhi, Duke & Schweitzer, SJDM 2021). It is a poster, not a peer-reviewed article. (Added on 2026-10-17, from the poster.)
- There is **no strong evidence** that premortems improve final outcomes (project success rates, ROI, fewer failures). The mechanism is plausible and the confidence effect is real, but the chain from "more reasons surfaced" to "better real-world result" is not established by controlled study.
- General "thinking tools improve thinking" claims are weak: a 2024 meta-analysis of problem-solving pedagogy (Zhan, He and Zhong; 19 studies) found that the pedagogy enhanced creativity overall, but it "did not reveal any significant benefits for creativity enhancement" in the thinking-tools-assisted condition. (Checked against the abstract on 2026-10-18; cited here as a humility prompt, not a settled fact.)

**Net grade: S/M.** The reason-generation effect is well-supported (S-leaning). The confidence effect rests on one peer-reviewed study and a poster (M). The decision-quality improvement that the technique is usually sold on is not well-supported (M/contested). The skill should claim the first, state the second as a single-study finding, and explicitly disclaim the third.

## 4. Transferred-evidence flag (required honesty for this library)

All of the evidence above comes from **human subjects** in workshop, lab, and team settings. There is **no direct study** of premortems run by, or with, an AI agent, and none of whether an AGENT-produced premortem improves a human's decision. The evidence supporting this skill is therefore **transferred from human contexts, not validated for AI-augmented use.** This skill must say so. Treat the AI value as: the agent makes the mechanism cheap to run, enforces the structure, and produces a durable artifact - benefits that do not depend on the contested decision-quality claim.

## 5. When it works / when it fails (drives the eval negative cases)

**Works best when:**
- The decision is real, consequential, and not yet committed (you can still change course).
- There is genuine uncertainty and the plan has optimistic momentum behind it.
- Causes can be turned into observable signals and pre-decided responses.

**Fails or misleads when (poor-fit / anti-patterns):**
- **Run after the fact** - that is a postmortem, a different tool. (Anti-trigger.)
- **Run as ritual** - rote "imagine it failed, list five risks, done" with no conversion to tripwires/kill criteria produces cargo-cult comfort, not better risk handling. The skill must force the conversion step.
- **Trivial or fully reversible decisions** - the ceremony is not worth it; a two-way door does not need a premortem.
- **Used to launder a decision already made** - if mitigations are never acted on, the premortem becomes theater.
- **Substituted for ideation or for option comparison** - it is a risk tool, not a way to generate options (use SCAMPER/Question Burst) or to choose among them (use Decision Option Review).

## 6. Output artifact

The skill must emit a **risk register**, not prose: a ranked table of causes with likelihood, impact, a leading signal/tripwire, a mitigation, an owner, and a kill criterion, preceded by a short "top risks and what we will do" summary. The artifact is the deliverable; the conversation is not.

## 7. Sources

1. Mitchell, Russo & Pennington (1989), "Back to the future: Temporal perspective in the explanation of events," *J. Behavioral Decision Making* 2(1):25-38 - prospective hindsight; outcome certainty, not temporal framing, lengthened explanations (abstract checked 2026-10-15). The popular ~30% figure is not in the abstract.
2. Klein (2007), *Harvard Business Review* 85(9) - "Performing a Project Premortem."
3. Veinott, Klein & Wiggins (2010), *ISCRAM 2010* - premortem lowered confidence in a flawed plan more than critique, pro/con or cons-only review (178 participants); calibration was not measured.
4. Kahneman (2011), *Thinking, Fast and Slow* - popularization; ties premortem to overcoming optimism bias and groupthink.
5. Gandhi, Duke & Schweitzer (2021), "Problems with Premortems: Self-serving attribution bias in a popular debiasing strategy," poster, Society for Judgment and Decision Making annual meeting - three pre-registered studies plus a pilot, N = 2,345; reduced overconfidence, magnified self-serving attribution; not peer-reviewed.
6. Zhan, He & Zhong (2024), "How does problem-solving pedagogy affect creativity? A meta-analysis of empirical studies," *Frontiers in Psychology* 15:1287082 - 19 studies; no significant creativity benefit in the thinking-tools-assisted condition.

> **Verification status:** citations 1-4 are standard and well-attested in the discovery corpus, but the exact effect-size phrasings and the 2024 meta-analysis claim in section 3 were drawn from a secondary research synthesis. They are safe to use *inside this dossier* because the dossier's job is to be honest about exactly this uncertainty. On 2026-10-15 the Mitchell, Russo and Pennington claim was checked against the paper's abstract and rewritten in section 3: the abstract gives no 30% figure. On 2026-10-18 the rest were checked. Klein (2007), read in archived copies of the HBR page, gives the figure as prospective hindsight "increases the ability to correctly identify reasons for future outcomes by 30%". Veinott et al. (2010), read in full, measured confidence and not calibration, so section 3 no longer says participants were better calibrated. Kahneman (2011) carries no effect size here. The 2024 meta-analysis is Zhan, He and Zhong (citation 6), and section 3 now reports only what its abstract says.
