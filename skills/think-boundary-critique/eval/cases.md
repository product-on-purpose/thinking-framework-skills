# Eval cases: think-boundary-critique

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "Our launch plan optimizes for the growth metric. Before we ship it, I want to check who this frame is actually built for and who it leaves out."
- "This efficiency proposal makes the numbers better, but I have a feeling it makes someone's life worse who isn't in the room. Audit who the frame includes and excludes."
- "We keep saying this change is an 'improvement.' Improvement for whom? Walk the boundary judgments - who benefits, who decides, whose expertise counts, who has standing - in is-versus-ought terms."
- "Run a boundary critique on this intervention design: I want the affected-but-excluded parties surfaced, not just the stakeholders we already talk to."
- "The proposal assumes the right people are deciding and the right people benefit. Test those assumptions descriptively versus normatively and list who has a stake but no voice."
- "This policy is contested and value-laden. Before we reason inside it, interrogate the frame itself - is it drawn legitimately, and who's outside the line?"

## Should NOT trigger (wrong tool / near-miss)

- "We've already agreed who this is for and how we'll measure success, and everyone's on board - now help us execute." (the frame is settled, agreed, and legitimate; auditing the boundary here manufactures doubt and stalls execution.)
- "This is a purely technical config decision with one obvious owner and no one else affected - which option is best?" (single-party, no excluded affected parties; a boundary audit produces empty "ought" columns. Use a decision tool such as `think-decision-option-review`.)
- "We know the boundary is disputed - now just tell us who's right and settle it." (boundary critique surfaces and debates the is-vs-ought gap; it does not adjudicate it. Take the surfaced gap to `think-decision-option-review` to choose under it.)
- "Walk this proposal through each of our key stakeholders' eyes so everyone feels heard." (that is a stakeholder round-up of in-scope parties; use `think-parallel-perspectives-review` stakeholder mode. Boundary critique is the different, upstream move - it audits whether the stakeholder set itself is legitimate.)
- "The problem is still fuzzy and I'm not even sure what the real issue is - help me frame it." (no frame to audit yet; frame first with `think-problem-restatement`, then audit the frame here.)
- "Summarize what the team shipped this sprint for a status update." (unrelated.)

## Output checks (a good output must)

- [ ] Capture the frame under audit verbatim, in one line, with the improvement it claims.
- [ ] Answer all four sources (who benefits, who decides, whose knowledge counts, who has standing) in *both* is and ought modes - no source left in one mode only.
- [ ] State an explicit is-vs-ought gap for each source (or an honest "no gap - legitimate boundary"), not a restatement of the answers.
- [ ] List the affected-but-excluded as a distinct section - parties outside the line with a stake but no voice, each with who (if anyone) witnesses for them - not merged into a voicing of in-scope stakeholders.
- [ ] State plainly that the audit surfaces the boundary question and does NOT adjudicate it, and route a real gap onward (e.g. to `think-decision-option-review`).
- [ ] Deliver the boundary-judgment audit artifact, not prose.
- [ ] Not overclaim: keep to "surfaces who the frame illegitimately includes or excludes, descriptively versus normatively"; the evidence is conceptual (C) and transferred from human practice.

## Value vs unaided baseline

Unprompted, a strong model reasons *inside* the frame it is given. Asked to "design the free tier to maximize conversions" or "improve the efficiency of this process," it accepts the frame's beneficiary and success measure as settled and optimizes within them - it does not ask whose improvement the metric encodes or who bears the cost outside the line. This skill forces the frame itself to become the object: it interrogates each of the four boundary judgments in is-versus-ought terms, names where the line is drawn versus where it ought to be, and - the move no stakeholder walk-through can make - enumerates the affected-but-excluded who have a stake but no seat. It then refuses to overreach: it surfaces and debates the boundary question and routes a real gap to a decision step, rather than pretending to settle who is right. The value is catching the tidy-frame failure (solving cleanly for the people inside the line while externalizing harm) before the frame is acted on.
