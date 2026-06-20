# Eval cases: think-qualitative-comparative-analysis

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. This is a contested lens with the warn-and-redirect posture: explicit-request-only, caveat-first. It should fire only when QCA is asked for by name, and it must never build the truth table or minimized configurations as a valid conclusion.

## Should trigger

- "Run a QCA across our last eight launches to find which combination of conditions is sufficient for success."
- "Use qualitative comparative analysis on these programs to see which configuration of conditions drives the outcome."
- "Build me a truth table and minimize it to the sufficient configurations for these cases."
- "I learned fsQCA in grad school - apply it to our deals and tell me the necessary and sufficient conditions for a closed win."
- "Do a configurational comparison with Boolean minimization across our site rollouts."
- "Code these cases into a crisp-set QCA truth table and give me the minimized solution."

## Should NOT trigger (wrong tool / near-miss)

- "Given launches like ours, how often do they succeed?" (a base-rate question; route to think-reference-class-forecasting, not QCA)
- "What's the base rate for a self-serve free tier landing, using our comparable past launches?" (route to think-reference-class-forecasting)
- "Why did this one launch fail?" (single-case causal account; that is within-case process tracing in prose, not cross-case minimization)
- "Map how these reinforcing factors feed back on each other in our growth loop." (feedback structure; route to think-causal-loop-diagrams)
- "Score these three launch options against our criteria and pick one." (option scoring; route to think-decision-option-review)
- "Break this messy launch decision into its component sub-questions." (decomposition; route to think-issue-tree)

## Output checks (a good output must)

- [ ] Lead with the evidence caveat (QCA is tier P; simulations certify configurations from noise at the casual scale a session can reach) before anything else.
- [ ] Does not reproduce the QCA truth table or minimized configurations as a valid conclusion or name a "sufficient configuration" winner; redirects to an evidence-based alternative.
- [ ] Name the real decision behind the request.
- [ ] Check the input precondition honestly (a real population of comparable, deeply-known cases almost never exists in a session).
- [ ] Redirect to a specific evidence-based shipped skill (think-reference-class-forecasting) for a set of comparable cases, or to process tracing in prose for one case.
- [ ] Not cite methodological pedigree (textbooks, software, a methods community) as if it were outcome evidence.

## Value vs unaided baseline

Asked to "run a QCA," a strong model dutifully codes the handful of cases it is given, builds a truth table, runs the minimization, and declares a sufficient configuration - producing exactly the confident verdict-from-noise the simulation literature condemns at session scale, where the input is a casual case set the method cannot support. This skill refuses that. It leads with the evidence that QCA certifies configurations from random data at this scale, checks whether the input even exists, declines to manufacture a sufficient-configuration verdict, names the real decision, and routes the user to a better-grounded shipped move (a reference-class base rate) or to within-case process tracing, so an explicitly-requested QCA yields an honest answer instead of laundered false confidence.
