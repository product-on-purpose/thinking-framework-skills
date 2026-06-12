# Eval cases: think-walton-argumentation-schemes

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "Someone keeps shooting down our free-tier plan by quoting one analyst who says 'the free-tier era is over.' Is that argument actually any good, or are we letting a say-so settle the call?"
- "This whole objection is 'if we give away a free tier, next they'll want everything for free and we'll never charge anyone' - take that slippery-slope argument apart and tell me whether it holds."
- "The pitch is 'Acme launched a free tier and it worked for them, so it'll work for us.' That's an analogy doing a lot of work - what's it assuming, and where could it break?"
- "We're being told to ship this because 'all our competitors already have a self-serve motion.' Classify that argument and run the standard checks on it before we act."
- "Take this one argument - 'usage is dropping, so the product must be getting worse' - identify what kind of inference it is and put the keyed critical questions to it."
- "There's a consequence-based case going around that launching free will cannibalize our paid plans. Evaluate just that argument and tell me whether the presumption survives."

## Should NOT trigger (wrong tool / near-miss)

- "Lay out our entire case for the free-tier launch - all the reasons, sub-reasons, and objections - as a structured tree so we can see where it's weakest." (a whole multi-premise argument's structure is `think-argument-mapping`; the scheme method evaluates one typed inference at a time and has no view of overall structure. This is the central routing wall.)
- "Prove that if conversion is 4% and CAC is X then the free tier breaks even at N users." (a deductive or statistical derivation is not an instance of any scheme; forcing it into one degrades the analysis. Route it out.)
- "Build the strongest possible opposing case against launching the free tier so we can pressure-test our own thinking." (generating the best opposing CASE is `think-red-team-light` - generative advocacy, not typed interrogation of one existing inference.)
- "Walk our reasoning from the raw signup data up to the conclusion 'users love it' and check each rung." (auditing one inference chain from data to conclusion with no pattern catalog is `think-ladder-of-inference-check`, not scheme classification with a keyed defeater battery.)
- "Sort these twelve statements about the launch into which are evidence and which are inference." (classifying statements by evidence-vs-inference is `think-evidence-vs-inference-sort`, not classifying an argument into a scheme type.)
- "Summarize what the team shipped this quarter for the board update." (unrelated.)

## Output checks (a good output must)

- [ ] Confirm the gate: a single short presumptive argument, restated as a conclusion plus stated premises - not a multi-premise structure (which routes to `think-argument-mapping`) and not a deductive or statistical proof.
- [ ] Name the scheme **explicitly**, name the most plausible **runner-up scheme**, and flag the **match confidence** - the classification is contestable, not hidden (mis-typing corrupts every downstream question).
- [ ] Instantiate the chosen scheme's **premise slots** and surface the **implicit premises** the pattern requires that the argument left unstated.
- [ ] Put the scheme's **keyed critical questions** to the argument - the standard battery for that specific scheme, each with an answer status (answered / open / defeated) and a burden note - not a generic objection list and not shallow rubber-stamp answers.
- [ ] Render a **presumption verdict** (stands / stands-pending / falls) under burden-of-proof semantics, with the single **binding open question** named - not a verdict of valid or invalid.
- [ ] Do **not** present the scheme name as a refutation, and do **not** present an answered checklist as a soundness proof.
- [ ] Deliver the scheme critique sheet artifact, not prose.
- [ ] Not overclaim: keep to a presumptive, burden-of-proof read; the evidence is practitioner-grade (tier P) and transferred from human-subjects classroom-instruction studies, so this is not a soundness proof and not a measured gain in single-application evaluation accuracy. The pre-printed evidence caveat must ship in the artifact.

## Value vs unaided baseline

Asked the same question, a strong model tends to do one of two things: rubber-stamp the argument ("a respected analyst said it, so it's probably right") or dismiss it with a fallacy label ("that's just an appeal to authority"), and in both cases it improvises whatever objections happen to occur to it. It rarely classifies the argument as a specific known type and then retrieves that type's STANDARD defeater battery - the accumulated set of ways that exact pattern fails - so its coverage of the real vulnerabilities depends on what it thought of in the moment. The benchmark evidence backs this up: current models are poor at generating the keyed critical questions on their own (Calvo Figueras and Agerri, 2025; top shared-task system 67.6). This skill forces the discipline: an explicit, contestable scheme classification with its runner-up; the instantiated premise slots that expose the argument's implicit premises; the full keyed critical-question set for that scheme answered with burden notes; and a presumption verdict under burden-of-proof semantics rather than a valid/invalid stamp. It blocks both naive acceptance and naive dismissal, and it converts an improvised reaction to one argument into a typed, defeater-complete, burden-of-proof read.
