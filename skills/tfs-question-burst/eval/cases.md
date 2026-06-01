# Eval cases: tfs-question-burst

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. No runner yet (deferred to the Silver climb); check by hand or wire in later.

## Should trigger

- "I've been staring at this churn problem for an hour and I'm stuck. Help me get unstuck before I try to solve it."
- "I think I'm too attached to framing this as a pricing problem. Help me find a better question first."
- "We're just starting to explore this ambiguous onboarding mess and I don't want to commit to an answer yet. Where do I start?"
- "Run a question burst on 'why are users abandoning the signup flow'."
- "I feel like I'm answering the wrong question about our retention dip. Generate questions about it and tell me which one to chase."
- "Before I write the strategy doc, give me a ranked set of questions and pick the most catalytic one to dig into."

## Should NOT trigger (wrong tool / near-miss)

- "I already know the real question is 'why does activation drop after day 3' - now help me answer it." (catalytic question already known)
- "Give me a flat list of 30 questions for our discovery survey." (near-miss: bulk question list, no ranking/selection wanted)
- "We've explored enough. I need a decision on which pricing tier to ship." (convergence)
- "Write a postmortem of last week's outage." (after the fact)
- "Summarize the questions raised in this transcript into a tidy bullet list." (summarization)
- "Brainstorm 20 feature ideas and group them by theme." (ideation)

## Output checks (a good output must)

- [ ] Burst of roughly 12-20 questions, questions only, no answers, no preamble.
- [ ] Rank the questions by how much answering them would change the approach, not by ease.
- [ ] Select exactly one "next question" with a one-line reason it would shift the problem.
- [ ] Be a ranked question set (raw burst, ranking, chosen next question), not a flat dump and not answers.
- [ ] Mix angles (why, how, what-if, who, what-would-change-if), not all one type.
- [ ] State the problem in one line at the top.

## Value vs unaided baseline

Asked to "brainstorm questions," a strong model dumps a long flat list and often slips into answering them - the low-signal failure the dossier flags as worthless for AI (generation is trivial). This skill forces the actual value: ranking by catalytic potential and committing to a single chosen next question with a reason, turning cheap question generation into disciplined reframing.
