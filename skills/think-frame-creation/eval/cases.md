# Eval cases: think-frame-creation

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (a harness is deferred); these are the cases to check by hand, or to wire into evals later.

## Should trigger

- "We've thrown more support staff, more docs, and more reminders at churn for a year and it keeps climbing. I don't think we have a retention problem the way we've been treating it. Help me see what kind of problem this actually is."
- "Every plan we draw for the free tier is just a worse version of the paid product and nobody's excited. I think we're framing the whole thing wrong - help me find a different way to look at what a free tier even is for us."
- "The city keeps answering the late-night district with more police and CCTV and it's still grim. The law-and-order framing isn't working. Reframe the situation from the ground up."
- "This onboarding problem is stuck. Don't give me more onboarding ideas - I want to step back, look at what's really going on for these users, and reconceive what the problem is."
- "Leadership has framed this as a tooling problem and we keep buying tools that don't help. I suspect the frame itself is the obstacle. Build a new standpoint for it."
- "We're going in circles on this open, messy stakeholder mess. Explore the broader context, find the real tension, and propose a fresh frame - approach it as if it were some different kind of situation."

## Should NOT trigger (wrong tool / near-miss)

- "We've nailed down the problem - we need a faster batch-import pipeline - now find me clever solution ideas by borrowing how other domains solve throughput problems." (near-miss, the sharp one: the **problem is fixed and correct**; the user wants an analogy aimed at the **solution**. That is `think-far-analogy-ideation` - it imports a working *mechanism* from a distant domain under a held-fixed frame. Frame creation does the opposite: it changes what the problem *is* and derives solutions forward from the new frame. Do not trigger frame creation on a problem the user is happy with.)
- "Give me a few different ways to word this problem statement - try a stakeholder shift, an inversion, the is/is-not version - and help me pick the best framing." (near-miss: this is menu-driven rewording and *selection among* candidate framings within the problem's own terms - that is `think-problem-restatement`. Frame creation does not reword-and-select; it abduces a single new working principle from theme analysis outside the problem's current terms.)
- "I just need the right altitude to work this problem at - is it 'add a dashboard' or 'help users understand their data'? Move it up and down." (single vertical why/how axis, no new standpoint constructed - that is `think-abstraction-laddering`.)
- "We've accepted this is a real generous-vs-limited trade-off; help us weigh options and pick a point." (a settled trade-off to choose under - `think-decision-option-review`; and the problem is already well-framed, which is the central wall for frame creation.)
- "This is a familiar problem we've solved a dozen times; just give me the standard approach." (closed, familiar, already-well-framed - forcing a reframe manufactures a paradox that isn't there.)
- "Summarize what the team shipped this sprint for a status update." (unrelated.)

## Output checks (a good output must)

- [ ] Confirm the problem is genuinely open and paradoxical and that solving inside its current frame has failed - not a closed or already-well-framed problem with a manufactured paradox.
- [ ] Explore the broader context and distil **themes** (underlying patterns/motives/meanings), not just restate facts - the frame must be built from these.
- [ ] Name the **core paradox** and the **value actually sought**, and let the value anchor the frame (guard against goal-reformulation drift).
- [ ] State the new frame as an "approach it as if it were Y" reconception in IF/THEN form that redefines what the problem *is* - earned by the themes, not free-associated, and not a reworded problem or a solution analogy under a fixed frame.
- [ ] Derive the solution directions *forward* from the new frame (what it generates natively), not mechanisms transferred from the source domain.
- [ ] Check adoptability - the frame is one the people who own the problem could take up.
- [ ] Deliver the frame-proposal artifact, explicitly marked as a standpoint to develop and test, not a proven answer.
- [ ] Not overclaim: keep to "constructs a new, theme-grounded standpoint that generates native solution directions"; the evidence is conceptual (C) and transferred from human design practice.

## Value vs unaided baseline

Unprompted, a strong model solves inside the frame it is handed. Given "tune the free-tier funnel" it tunes the funnel; given "reduce churn" it lists retention tactics - because "answer the question as framed" is the default. It rarely tests whether the *frame itself* is the obstacle, and when it does reach for an analogy it tends to aim it at the solution ("here's how Netflix reduces churn") rather than using it to reconceive the problem. This skill forces the frame-creation discipline: explore the broader context, distil the underlying themes, locate the core paradox and the real value, abduce a new working principle crystallised as an "as if it were Y" reconception that redefines what the problem *is*, then reason forward to the directions that frame unlocks - and present the result honestly as an untested standpoint. It is distinct from `think-far-analogy-ideation` (analogy on the solution, fixed problem), from `think-problem-restatement` (menu-driven rewording and selection within the problem's terms), and from `think-abstraction-laddering` (single why/how axis): only frame creation builds a new standpoint from themes and derives solutions forward from it.
