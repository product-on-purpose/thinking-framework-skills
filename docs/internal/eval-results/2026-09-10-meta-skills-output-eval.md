# Output eval - the meta-skills (2026-09-10)

The output half for the library's four meta-skills, paired with the same day's
[skill-selection trigger eval](2026-09-10-skill-selection-trigger-eval.md). Together they
close C2-7 / ADV-1 for three of the four. Same produce-then-judge method as every other
output run: one agent invokes the skill and emits its artifact, a **separate** agent grades
that artifact against the skill's own "Output checks". Model-executed and non-deterministic
- a measurement, not a gate.

## Scope: 3 of 4, and why the fourth is absent

`think-research-framework` is **not** in this run, and the omission is deliberate. It is a
dispatcher, not an artifact-emitting method:

- Its own SKILL.md step 2 says **"Do not run the research inline in this context"** - it
  dispatches to the `think-research-framework` subagent, which holds the honesty discipline
  and runs web research in its own window. The generic produce prompt asks an agent to emit
  the artifact inline, so running it would measure the skill doing the opposite of its
  documented procedure.
- It ships **no `references/` directory at all**, so there is no `TEMPLATE.md` for the
  produce prompt to read.
- Its checks require "3 to 6 real sources (authors, year, what was measured)" and explicit
  refusal of untraceable statistics. The real subagent declares `WebSearch` and carries a
  "REAL SOURCES (hard rule)" non-negotiable; a produce agent following the generic prompt is
  never told to research anything. **A judge passing fabricated citations would return a
  number that rewards the single failure this library exists to prevent.**

So it keeps `output_eval_status: authored` and `maturity: alpha`, with the gap named rather
than papered over. What would close it is recorded in `docs/internal/backlog.md`.

## Read the 20/20 with these three caveats

**1. It is thin.** Three skills, 20 checks, a single run, graded by a model. The repo's own
history shows output-eval results move between runs (hence `-rerun3` / `-rerun4` files).
Treat this as a first baseline, not a settled figure.

**2. The judges recorded real defects inside PASSING reasons.** A check passed because the
check, as written, does not test the thing that was wrong:

| Skill | What the judge recorded anyway |
|---|---|
| `framework-advisor` | Step 4's invocation hard-codes the migrate option while its own prose says to premortem whichever option Step 3 selects - an internal inconsistency. |
| `framework-advisor` | Its decline of the `think-stress-test-decision` recipe **rests on a false premise**: it claims the recipe presupposes an option comparison the user has not done, but that recipe's step 1 *is* `think-decision-option-review`. Verified independently, and flagged by a second judge in the `top3` run. |
| `random-frameworks` | Two concept-map propositions use nodes absent from the artifact's own declared inventory (`signup volume`, `past churners`). |

The advisor one is a **check-coverage gap**, and it is the most useful output of this run:
the check requires a non-empty "what NOT to use" section including the calibrator's cuts -
it does not require each decline to be *correct*. A wrong decline therefore passes. Recorded
in the backlog rather than fixed here, because editing a check mid-measurement is how a
number stops meaning anything.

**3. One check turned out to be judgeable after all, and it is worth saying why.**
`random-frameworks`' "not quietly fit the draw to the topic" looks unverifiable from an
artifact - a reader cannot tell a random draw from a curated one. It is verifiable here
*because* `references/engine.md` specifies a mechanical, content-independent draw. The judge
reproduced it (topic text 140 chars, N=63, indices 140/151/163 mod 63 = 14/25/37, resolving
alphabetically to `think-concept-mapping`, `think-far-analogy-ideation`,
`think-morphological-analysis`) and this was re-verified deterministically afterwards - every
figure matches. A specified mechanism is what makes an "ignore relevance" instruction
auditable instead of a promise.

---

# Output eval scorecard

Skills evaluated: 3. Output checks: 20.

**Overall: 100% of checks passed** (20/20). Skills passing every check: 3/3.

| Skill | checks passed | artifact chars |
|---|---|---|
| framework-advisor | 100% (10/10) | 14010 |
| random-frameworks | 100% (5/5) | 22710 |
| top3 | 100% (5/5) | 26516 |

## Failed checks (0)

_None. Every artifact satisfied every one of its skill's output checks._
