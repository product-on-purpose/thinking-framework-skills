# Evidence Dossier: Argumentation Schemes with Critical Questions

> The single source of truth for the `walton-argumentation-schemes` skill. The `SKILL.md`, the
> sidecar (`skill.meta.yml`), the references, and the eval cases all derive from this file. If a
> claim is not here, it does not belong in the skill. Reformatted from the vetted proposed dossier
> (`_local/proposed-builds/walton-argumentation-schemes/dossier.md`) and admitted as a Build at
> tier P (confirming the wave-3 preliminary cand/build).

| | |
|---|---|
| **Skill** | `thinking-framework-skills.walton-argumentation-schemes` (installable name `think-walton-argumentation-schemes`) |
| **Family** | reasoning-clarity (registry catalog family: synthesis-and-reasoning-clarity) |
| **Evidence tier** | **P** governing (honest read; an M-flavored controlled signal exists but only on an adjacent claim - see "What the evidence shows") |
| **Confidence** | Moderate that scheme-keyed critical questions surface more relevant defeaters than improvised objection-raising; low that single-application evaluation accuracy or any decision-quality effect transfers to agents |
| **Status** | draft (admitted from the v0.7.0 phase-2 sweep; the sole survivor of the argumentation trio) |

---

## 1. The mechanism (what actually does the work)

Most everyday arguments are not deductive proofs. They are defeasible, presumptive moves: an
expert says X, so presumably X; this case is like that case, so presumably the same verdict; doing
A leads to bad consequence B, so presumably do not do A. Douglas Walton's insight is that these
arguments come in a finite set of stereotyped patterns, that each pattern is legitimate (not a
fallacy) when its conditions hold, and that each pattern has its own characteristic ways of
failing. The method packages that insight into a two-step evaluation procedure: first identify
WHICH stereotyped scheme an argument instantiates, then interrogate it with the standard critical
questions keyed to that scheme.

The durable cognitive move is **classify-then-probe-with-keyed-defeaters.** Concretely:

1. Extract the argument's conclusion and stated premises.
2. Match it against the scheme catalog - appeal to expert opinion, argument from analogy, argument
   from sign, argument from cause to effect, argument from consequences, argument from popular
   opinion or practice, slippery slope, practical reasoning, and so on (Walton 1996 defines 25
   schemes; the Walton, Reed and Macagno 2008 compendium organizes roughly 60 main schemes plus
   about 44 sub-schemes, the count usually quoted as "96").
3. Instantiate the scheme's premise slots, which mechanically exposes the implicit premises the
   pattern requires (for expert opinion: E is an expert, in the relevant field, E actually asserted
   X, E is credible and unbiased, X is consistent with what other experts say and with the
   evidence).
4. Put the scheme's critical questions to the argument.
5. Render a **presumption verdict**: the argument creates a presumption that STANDS if its critical
   questions are answered or discharged, and FALLS where a question shifts the burden of proof and
   the burden goes unmet.

Two properties distinguish this from generic objection-raising. The defeaters are RETRIEVED, not
improvised: each scheme's question set encodes the accumulated knowledge of how that specific
pattern fails, so coverage of the standard vulnerabilities does not depend on what occurs to the
evaluator in the moment. And the semantics are presumptive: the output is not "valid/invalid" but a
burden-of-proof ledger - which questions were answered, which remain open, and whether the
presumption survives. The Carneades formal model (Gordon, Prakken and Walton 2007) makes this
precise by modeling critical questions as typed premises (assumptions versus exceptions) that
allocate the burden of proof differently per question.

## 2. Lineage

The scheme idea descends from Aristotle's topoi and was revived in the 20th century by Perelman and
Olbrechts-Tyteca and by Arthur Hastings' 1962 dissertation, but the method in its usable form is
Douglas Walton's (University of Winnipeg, then the University of Windsor's CRRAR), beginning with
*Argumentation Schemes for Presumptive Reasoning* (1996), which paired 25 schemes with their
critical questions and grounded evaluation in burden of proof. The mature reference is Walton, Reed
and Macagno, *Argumentation Schemes* (Cambridge, 2008), with its compendium of roughly 60 main
schemes and 44 sub-schemes; Walton and Macagno's later work addresses classification. J. Anthony
Blair (2001) wrote the standard critique. The computational line runs through Chris Reed's Dundee
group (Araucaria, 2004; the Argument Interchange Format; argument mining) and the AI-and-law
formalizations (Gordon, Prakken and Walton's Carneades, 2007; Prakken's ASPIC+). The pedagogy line
is E. Michael Nussbaum (critical questions in classroom argumentation) and Yi Song with Ralph
Ferretti (writing instruction). The LLM-era line is Blanca Calvo Figueras and Rodrigo Agerri's
critical-questions-generation benchmark and the CQs-Gen shared task at ArgMining 2025.

The terms "argumentation scheme," "presumptive reasoning," and "critical question" are generic and
descriptive; the durable move is named for what it does (classify-then-probe-with-keyed-defeaters),
and the skill ships documented descriptively with the lineage credited here rather than branded.
The attribution credits Douglas Walton (1996) and Douglas Walton, Chris Reed and Fabrizio Macagno
(2008).

## 3. What the evidence shows, and what it does NOT show

The honest grade is **P (practitioner)**, confirming the preliminary registry grade. The split,
stated in full: the foundational literature is conceptual argumentation theory and the AI-and-law
adoption is formal modeling, neither of which is outcome evidence; there ARE two controlled-ish
classroom studies with positive results, but they measure weeks of scheme-and-critical-question
INSTRUCTION on student writing and discussion quality - an adjacent claim to "applying the schemes
once improves an evaluation," and human-subjects only. By this library's conservative rule the
governing grade is P, not M.

**What the record supports.** This is a 30-year theoretical literature with a coherent, well-worked
rationale; a formal AI-and-law adoption line; software embodiments; an annotated corpus; an active
LLM benchmark; and two positive controlled classroom studies. The cleanest of those is Song and
Ferretti (2013): college students in three conditions (critical questions for two schemes; the two
schemes without their critical questions; no instruction); the group taught the critical questions
wrote higher-quality essays with more counterarguments, alternative standpoints, and rebuttals than
either contrasting condition. Notably, it was the critical questions, not the schemes alone, that
carried the effect. Nussbaum and Edwards (2011), a multi-month design experiment in middle-school
social-studies classes, found the critical-questions group produced more arguments integrating both
sides and constructed more salient critical questions.

**What the record does NOT support.** No study measures single-application argument-evaluation
accuracy - the actual move this skill performs. Both supportive studies measure weeks of writing
and discussion instruction, which is an adjacent claim, not the move. Mis-typing is a live risk,
not a corner case: Feng and Hirst (2011) found even the five most common schemes are only
machine-separable at 63-91% one-against-others accuracy (against a 50% baseline), so a wrong scheme
match - which corrupts every downstream critical question - is a real failure mode. And the
keyed-question apparatus is NOT already free in a plain-prompted model: Calvo Figueras and Agerri
(2025) built a benchmark of about 5,000 manually annotated critical questions and the companion
CQs-Gen shared task, and the task is genuinely hard for current models (the top shared-task system
reached only 67.6 accuracy).

Why not M: the only controlled results are two small studies of sustained classroom instruction in
writing contexts; moderate-tier would require controlled evidence that applying the method once
improves an evaluation or a decision, which does not exist. Why not C: the theoretical literature,
the formal adoption line, the software, the corpus, the benchmark, and the two positive controlled
classroom studies put it well past conceptually-plausible-but-untested. **P is the honest governing
grade.**

## 4. Transferred-evidence flag (required honesty for this library)

Every study above is on human subjects - students in classroom and writing settings - and every
positive result is on sustained INSTRUCTION, not on a single application of the method. None studies
a scheme critique produced by or with an AI agent, nor whether an agent-produced critique improves a
human's judgment. The evidence is **transferred from human contexts and not validated for
AI-augmented use**, which independently caps the grade at P. The Calvo Figueras and Agerri (2025)
benchmark, while not human-reasoning outcome evidence, is directly relevant the other way: it
indicates the keyed-question apparatus is not already free in a plain-prompted model, which is the
operative question for an agent-skills library and the gap a scheme-keyed skill closes. The AI value
is mechanical and modest: an agent makes the method cheap to run, forces the discipline (a stated
and contestable scheme classification, the instantiated premise slots, the full keyed-question
battery, the presumption verdict), and produces a durable, inspectable artifact - benefits that do
not depend on any contested outcome claim. The skill ships honestly as a P-tier
argument-evaluation aid with hard walls, never as a soundness proof.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**

- A single, usually short, defeasible argument has to be evaluated for whether its presumption
  deserves acceptance: a recommendation resting on an authority's say-so, an analogy doing
  load-bearing work in a proposal, a slippery-slope objection in a policy debate, a "users are
  asking for it" appeal, a consequence-based case for or against an action.
- An argument map would be overkill or unhelpful. The scheme method is strongest exactly where a map
  is weakest: a one-premise pattern argument ("the analyst report says the market is contracting, so
  we should not enter") maps to a trivial two-node tree, while the scheme method immediately yields
  the six standard expert-opinion probes.
- Critique needs discipline in both directions. Walton's central point is that these patterns are
  NOT automatic fallacies, so the method blocks both naive acceptance ("an expert said it") and
  naive dismissal ("appeal to authority, ignored").

**Fails or misleads when (poor-fit / anti-patterns):**

- **The case is structurally complex and multi-premise.** When the question is how a whole argument
  hangs together and where its weakest links are, that is argument-mapping's job; the scheme method
  evaluates one typed inference at a time and has no view of overall structure. This is the central
  routing wall.
- **The argument is deductive or statistical.** The schemes formalize presumptive reasoning; a
  mathematical proof or a regression result is not an instance of any of them, and forcing one into
  a scheme degrades the analysis. Route such material out.
- **The scheme is mis-typed.** Every downstream critical question is keyed to the classification, so
  a wrong match (reading an argument from sign as an argument from cause) produces a confident
  interrogation of the wrong vulnerabilities. The classification must be stated explicitly and be
  contestable, with the runner-up scheme named and low-confidence matches flagged (Feng and Hirst
  2011 confirm mis-typing is live, not rare).
- **It becomes checklist theater.** Walking the critical questions and recording shallow answers
  produces the appearance of scrutiny; the presumption verdict is only as good as the honesty of the
  answers. An answered checklist is not a soundness proof.
- **Naming the scheme is treated as the verdict.** Naming the scheme is the beginning of evaluation,
  not a refutation. "Appeal to authority" is a classification, not a defeat.

## 6. Output artifact

The skill must emit a **scheme critique sheet**, not prose. It contains: the argument restated as
conclusion plus stated premises; the identified scheme with the classification made contestable
(named, with the runner-up scheme noted and a confidence flag); the instantiated premise slots,
including the implicit premises the pattern requires; each keyed critical question with its answer
status (answered / open / defeated) and the burden note (who must discharge it); and a presumption
verdict (stands / falls / stands-pending) with the single binding open question named. A standing
evidence caveat ships in the artifact by construction: the verdict is a presumptive,
burden-of-proof read at tier P on transferred human-subjects evidence, never a soundness proof. The
walls are enforced inside the sheet: presumptive arguments only, the scheme classification stated
and contestable, no answered checklist presented as proof, no scheme name presented as a refutation.

## 7. Why it is a skill here (distinctness)

The single durable move it adds: classify a defeasible argument as an instance of a stereotyped
scheme, then test its presumptive standing with that scheme's keyed critical questions, unanswered
questions defeating the presumption.

- **Closest shipped skill, HIGH overlap face: `think-argument-mapping` (S, shipped).** Honest
  accounting first: the skeleton is shared. Both take one argument, extract its conclusion and
  premises, surface implicit premises, and flag weaknesses - roughly a quarter to a third of the
  working whole, which presses this library's overlap ceiling and is stated rather than hidden. The
  wall is in the evaluative engine, which is disjoint: argument-mapping lays out THIS argument's
  particular structure as a tree and generates objections ad hoc from its content; the scheme method
  classifies the argument as an instance of a known TYPE and retrieves that type's standard defeater
  battery, then renders a presumption verdict under burden-of-proof semantics that no map carries (a
  map flags weak links; it has no concept of a question shifting a burden that then goes unmet). The
  two also fail differently: mapping fails by garbage structure, scheme critique fails by mis-typing.
  Routing wall, usable by the advisor: a structurally complex multi-premise case, or "how does this
  whole argument hang together" - `think-argument-mapping`; a short typed presumptive argument, or
  "does this pattern's presumption survive its standard defeaters" - this skill.
- **Why a mode or sequence cannot already produce it.** Argument-mapping's objection step contains
  no typology, no keyed retrieval, and no defeat semantics; `think-red-team-light` builds the
  strongest opposing CASE for a proposal (generative advocacy, not typed interrogation of one
  inference); `think-ladder-of-inference-check` audits one reasoning chain from data to conclusion
  with no pattern catalog; `think-evidence-vs-inference-sort` classifies statements, not argument
  types. No chain of these retrieves the expert-opinion battery when it sees an expert-opinion
  argument. The empirical point that this is not free in the model: Calvo Figueras and Agerri (2025)
  found models perform poorly at generating useful critical questions. The formal record agrees the
  apparatus is additional machinery, not a notational variant: Araucaria had to import Walton's
  catalog wholesale, and Carneades had to invent typed premises and proof standards to model the
  critical questions.
- **The sole survivor of the argumentation trio (v0.7.0 phase-2 reconciliation).** Of
  {walton-argumentation-schemes, toulmin-argument-model, issue-position-argument-mapping} versus
  shipped argument-mapping, at most one builds and exactly one does. `toulmin-argument-model` folds
  into argument-mapping (claim/data/warrant/rebuttal map about 1:1; argument-mapping's own dossier
  names Toulmin as its ancestor). `issue-position-argument-mapping` (IBIS) becomes a recipe (its
  three node types each map to a shipped move). This candidate builds because it is the only one with
  a move argument-mapping lacks: scheme typing plus a retrieved per-scheme defeater battery plus a
  burden-of-proof presumption verdict.
- **The runner-up reading, recorded honestly.** Fold-with-enrichment into argument-mapping (add "where
  an inference instantiates a known scheme, apply that scheme's critical questions as the objection
  generator" to its objection step) captures a real fraction of the value. What it loses: the scheme
  catalog itself, the complete per-scheme question batteries, the presumption/burden verdict, and the
  named artifact - machinery that would roughly double the target skill and change its evaluation
  procedure, which is the signature of a second method rather than a mode. The dossier's judgment is
  Build; the fold is the defensible second-place verdict if catalog parsimony is weighted over the
  residue.

## 8. Sources

1. Douglas N. Walton (1996), *Argumentation Schemes for Presumptive Reasoning*, Lawrence Erlbaum.
   The canonical statement: defines 25 presumptive schemes and matches a set of critical questions
   to each, with the burden-shifting account of how a presumptive argument is evaluated. Foundational
   and conceptual; defines the method, measures nothing. (Foundational.)
2. Douglas Walton, Chris Reed and Fabrizio Macagno (2008), *Argumentation Schemes*, Cambridge
   University Press. The mature compendium: systematic analysis of the major schemes plus a user's
   compendium (roughly 60 main schemes and 44 sub-schemes, often summarized as "96"), with the
   classification problem treated head-on. (Foundational; conceptual.)
3. J. Anthony Blair (2001), "Walton's Argumentation Schemes for Presumptive Reasoning: A Critique and
   Development," *Argumentation* 15: 365-379. The standard internal critique: presses on scheme
   individuation and the unsettled logical status of the critical questions. Evidence of serious
   methodological scrutiny, not of outcomes. (Critique; P.)
4. Thomas F. Gordon, Henry Prakken and Douglas Walton (2007), "The Carneades model of argument and
   burden of proof," *Artificial Intelligence* 171(10-15): 875-896. Formalizes critical questions as
   typed premises (assumptions, exceptions) allocating burden of proof per question, with proof
   standards. Demonstrates the critical-question apparatus required NEW machinery beyond argument
   structure. Not outcome evidence. (Formalization / field uptake; P.)
5. Chris Reed and Glenn Rowe (2004), "Araucaria: Software for Argument Analysis, Diagramming and
   Representation," *International Journal on Artificial Intelligence Tools* 14(3-4): 961-980.
   Argument-diagramming software designed from the outset to handle schemes; the key overlap fact is
   that the analysis tradition treats schemes as a layer that mapping tools had to import from Walton.
   (Adoption; P.)
6. Vanessa Wei Feng and Graeme Hirst (2011), "Classifying arguments by scheme," Proceedings of
   ACL-HLT 2011. Machine classification of arguments into the five most common schemes on the
   Araucaria corpus (about 660 annotated arguments): 63-91% one-against-others, 80-94% pairwise,
   against a 50% baseline. Computational feasibility plus an honest measure of how confusable the
   types are; the basis for the mis-typing wall. (Computational feasibility, not reasoning outcomes;
   P.)
7. E. Michael Nussbaum and Ordene V. Edwards (2011), "Critical Questions and Argument Stratagems: A
   Framework for Enhancing and Analyzing Students' Reasoning Practices," *Journal of the Learning
   Sciences* 20(3): 443-488. Multi-month design experiment in middle-school social-studies classes:
   the critical-questions group produced more arguments integrating both sides and constructed more
   salient critical questions. Positive but small, quasi-experimental, classroom, sustained
   instruction; an adjacent claim to the single-application move. (Controlled instruction study.)
8. Yi Song and Ralph P. Ferretti (2013), "Teaching critical questions about argumentation through
   the revising process: effects of strategy instruction on college students' argumentative essays,"
   *Reading and Writing* 26: 67-90. College students, three conditions; the group taught the
   critical questions wrote higher-quality essays with more counterarguments, alternative
   standpoints, and rebuttals than either contrasting condition. The cleanest controlled result in
   the record, and notable that the critical questions, not the schemes alone, carried the effect;
   still writing instruction, small N, an adjacent claim. (Controlled instruction study.)
9. Blanca Calvo Figueras and Rodrigo Agerri (2025), "Benchmarking Critical Questions Generation: A
   Challenging Reasoning Task for Large Language Models," Findings of EMNLP 2025 (arXiv:2505.11341),
   with the companion CQs-Gen shared task at the 12th Workshop on Argument Mining (ACL 2025). About
   5,000 manually annotated critical questions grounded in argumentation-scheme theory; the benchmark
   and shared task show the task is genuinely hard for current models (the top shared-task system
   reached only 67.6 accuracy). Not human-reasoning outcome evidence, but directly relevant: the
   keyed-question apparatus is not already free in a plain-prompted model. (LLM benchmark.)

> Excluded on the evidence rule: no single-application argument-evaluation accuracy figure is
> asserted as fact, because no study measures it; the two positive controlled effects (Song and
> Ferretti; Nussbaum and Edwards) are reported with their sustained-instruction, writing-context,
> human-subjects limitations, and the field-feasibility and benchmark evidence is not laundered into
> an outcome claim. The governing grade is the conservative P.
