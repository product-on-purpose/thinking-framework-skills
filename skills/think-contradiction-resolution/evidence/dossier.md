# Evidence Dossier: Contradiction Resolution (Ideal Final Result)

> The single source of truth for the `contradiction-resolution` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not here, it does
> not belong in the skill. Drafted by the `think-research-framework` engine (2026-06-08) and admitted
> as a Build.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.contradiction-resolution` (installable name `think-contradiction-resolution`) |
| **Family** | problem-framing |
| **Evidence tier** | **P** governing (honest read **M/P**, capped at P - see "What the evidence shows") |
| **Confidence** | Moderate that the reframe-and-separate discipline surfaces real dissolutions; low that any specific effect size transfers to agents |
| **Status** | draft (admitted 2026-06-09 from the SP6 discovery shortlist) |

---

## 1. The mechanism (what actually does the work)

Most problems arrive as a trade-off: to get more of A you must accept less of B. The default response is to optimize - find the least-bad balance point on the curve. Contradiction resolution refuses that move *first*. It reframes the problem as a **contradiction to be dissolved** - a solution in which you stop having to trade A against B at all - rather than a trade-off to be balanced. This reframe is the durable cognitive move, and it is the de-branded core of TRIZ (the Theory of Inventive Problem Solving).

The move has two named parts:

1. **State the contradiction precisely.** A **technical** contradiction: improving one parameter degrades another ("thicker armor protects better but makes the vehicle too heavy"). A **physical** contradiction: a single parameter must hold two opposite values at once ("the landing gear must be present, to land, and absent, to reduce drag"; "the coffee must be hot, to enjoy, and not hot, to not scald"). Naming which form you face is what unlocks the resolution menu, because the two forms resolve differently.
2. **Aim at the Ideal Final Result (IFR), then try to dissolve.** Before reaching for any mechanism, state the **Ideal Final Result**: an implementation-free description of the end-state in which the benefit is delivered with no new cost, no harm, and ideally no new mechanism - "the function happens by itself." The IFR is not a goal restatement; it strips out every "how" so it can expose how much of the assumed apparatus is actually necessary, countering the psychological inertia that makes the trade-off feel inevitable. Then attempt to dissolve the named contradiction with a fixed menu: for a physical contradiction, the four **separation principles** - separate the opposing requirements in **time**, in **space**, by **scale / system level**, or by **condition**; for a technical contradiction, the **40 inventive principles** (segmentation, asymmetry, nesting, "the other way round", and so on), classically looked up in a 39x39 **contradiction matrix**.

The output is a **contradiction-resolution worksheet**: the trade-off written as an explicit opposing pair, the IFR stated implementation-free, one or more dissolution attempts via the separation/inventive principles, and - critically - an honest exit. If no operator dissolves the contradiction, the worksheet says so and routes the problem onward as a *genuine* trade-off. The point is not to pretend every trade-off is fake; it is to test, deliberately and with a fixed toolkit, whether *this* one is, before settling for the balance point.

## 2. Lineage

- **TRIZ (Theory of Inventive Problem Solving):** Genrich Altshuller (1926-1998), from 1946, developed from a study of large patent collections. The contradiction concept, the Ideal Final Result, and the patterns of evolution are the three pillars; the 40 inventive principles, the 39x39 contradiction matrix, the separation principles for physical contradictions, and the fuller ARIZ algorithm are the apparatus built on them.
- **Naming and IP:** "TRIZ" is **not** a live trademark - the mark was formally abolished as of 12 December 2004 (per the G.S. Altshuller Foundation), and TRIZ is treated as a generic, public-domain term. This skill credits Altshuller as lineage but is **not** branded and needs no trademark string. It ships under a mechanism-over-brand name, `contradiction-resolution`, per the library's first commitment.

## 3. What the evidence shows, and what it does NOT show

The honest read is **split, M/P, and capped at the conservative governing grade of P.** Both the split and the cap matter.

**What the record supports (the M-leaning half).** Unlike many practitioner ideation methods, structured contradiction-based ideation has been put through controlled comparison. Several quasi-experimental studies with student subjects report that TRIZ-style ideation improves the **novelty and variety** of generated concepts relative to unstructured ideation, while reducing the raw **quantity** of ideas (the ASEE PEER assessment and related ideation-effectiveness studies). There is also one study close to this library's actual use context: a human-agent design-collaboration experiment (Cambridge, *AI EDAM*, n=32) paired designers with an LLM-based TRIZ agent and an LLM brainstorming agent; TRIZ produced higher **elaboration** and, in the human-agent condition, stronger **flexibility** (multiperspective thinking).

**What the record does NOT support, and why the grade is capped at P.** Three honest deductions hold the governing grade down:

1. **The evidence is for the broad method, not the specific move under test.** The studies measure "doing TRIZ" against "not doing TRIZ." None isolates "reframe as a contradiction to dissolve + state an IFR" as the active ingredient versus the rest of the apparatus, or versus a plain instruction to look for a win-win.
2. **The canonical apparatus is empirically contested.** Spreafico and Russo (2018) - a critique from inside the TRIZ research community - report that only roughly 10-15% of problems can be adequately described by the matrix's standard parameters, and recommend working *around* the single-lookup use. The patent-corpus pedigree is a derivation story, not a validation of recommendation quality, and must not launder the grade upward. The durable, defensible part is the reframe-and-separate discipline; the 39x39 matrix is a contested heuristic.
3. **The one AI-context study is mixed-to-negative on the headline novelty claim.** In the *AI EDAM* experiment, brainstorming scored higher on **fluency** (3.44 vs 2.34 ideas) and was uniquely advantaged on **originality**; TRIZ's wins were on elaboration and flexibility. So the most AI-relevant evidence supports "contradiction methods yield more developed, more multiperspective output," not "more novel solutions" - a narrower claim than the popular framing.

**Net grade: P (governing), honest read M/P.** Claim "tests whether a trade-off is real and provides a disciplined menu that often dissolves it"; do not claim a measured improvement in solution quality or novelty for agents.

## 4. Transferred-evidence flag (required honesty for this library)

Almost all of this evidence is **human-subject** design-education research; the single human-agent study (n=32, one university, neural and creativity measures only, feasibility of ideas not assessed) is suggestive, not decisive, and its authors say so. The evidence is **transferred from human practice and only lightly touched by AI-context testing; it is not validated for autonomous-agent use.** Treat the AI value as: the agent makes the classify-and-separate pass cheap and disciplined, resists the optimize-the-compromise reflex, holds the IFR implementation-free, and enforces the honest "this trade-off is real" exit - benefits that do not depend on any unproven outcome claim.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**
- A problem is stated as, or has collapsed into, an "A vs B" trade-off whose necessity has not been tested.
- The opposing requirements plausibly hold at different times, places, scales, or conditions (common in design of physical, process, scheduling, and product-mechanism problems).
- The obvious answer is "pick a point on the curve" and a dissolution would be worth far more than the compromise.

**Fails or misleads when (poor-fit / anti-patterns):**
- **The trade-off is genuinely fundamental** (physical law, conservation, regulation, hard external limit). Forcing the move manufactures clever non-solutions; the honest output is "real trade-off" routed to `think-decision-option-review`. This is the central wall, and the worksheet must enforce the exit.
- **You need idea volume, not a frame.** The method is convergent on one tension and produces fewer ideas; use `think-brainwriting` or `think-far-analogy-ideation` for breadth.
- **The tension must be managed, not eliminated** (an unresolvable polarity like centralize vs decentralize). That is tension/polarity mapping - surface and navigate the standing balance - not this skill, which treats the trade-off as a defect to dissolve and only declares a polarity when dissolution fails.
- **No real opposition exists.** If the problem is vague or under-specified rather than two-sided, this tool will invent a contradiction. Frame it first with `think-problem-restatement`.
- **The matrix is treated as authoritative.** The 39x39 contradiction matrix is a heuristic idea-prompt, not a correct-answer oracle.

## 6. Output artifact

The skill must emit a **contradiction-resolution worksheet**, not prose: the trade-off written as an explicit opposing pair; the contradiction classified technical or physical; the Ideal Final Result stated implementation-free; each dissolution attempt with the operator it used (separation in time/space/scale/condition, or a named inventive principle) and whether it yielded a candidate; and the outcome - a concrete resolution, or an honest "this is a real trade-off" with the onward route. A short summary sits above the worksheet.

## 7. Sources

1. Genrich Altshuller, *The Innovation Algorithm: TRIZ, Systematic Innovation and Technical Creativity* (English translation, Technical Innovation Center, 1999), and *And Suddenly the Inventor Appeared* (TIC, 1996). The foundational statement of contradictions, the Ideal Final Result, and the inventive principles. Foundational / practitioner.
2. C. Spreafico and D. Russo (2018), "Altshuller's Contradiction Matrix. A Critical View and Best-Practice Recommendations." Critique from inside the TRIZ research community: reports the matrix describes only ~10-15% of problems via its standard parameters and recommends working around the single-lookup use. The key adversarial source on the matrix's empirical limits. (Critical literature.)
3. ASEE PEER, "Experimental Assessment of TRIZ Effectiveness in Idea Generation" (conference paper). Controlled student-subject comparison; reports TRIZ improves novelty and variety while reducing quantity of generated ideas relative to a control. The nameable controlled-effectiveness evidence, on human subjects. (P, experimental.)
4. "Comparing TRIZ and brainstorming in human-agent design collaboration: effects on cognitive processes and performance," *AI EDAM* (Cambridge University Press), n=32. The closest study to this library's AI-use context: TRIZ higher on elaboration and (human-agent) flexibility; brainstorming higher on fluency and originality. (M/P, single small study, AI-context.)
5. "Ideal Final Result," Mycoted (TRIZ reference), and "TRIZ," Wikipedia. Reference descriptions of the IFR, ideality, technical vs physical contradictions, and the separation principles. (Reference.)

> **Verification status:** The mechanism descriptions (Altshuller, Mycoted, Wikipedia) are well-attested and mutually consistent, as is the trademark-abolished fact (G.S. Altshuller Foundation). The Spreafico and Russo critique (2) was read via summary, not the primary full text (the ~10-15% coverage figure is reported as their critical-view claim, not an independently audited constant); the ASEE PEER effect sizes (3) come from the abstract, and the *AI EDAM* numbers (4) from a fetched summary. None of these gaps changes the conservative governing grade of P. Any unsourced "TRIZ solves N% of problems" figure is excluded on the evidence rule and does not influence the tier.
