---
title: Premortem
slug: premortem
generated_status: true
---

<!-- STATUS:GENERATED (gen-site.mjs from frameworks/registry.mjs) - do not edit between these markers -->
<!-- /STATUS:GENERATED -->

## What it is

A premortem is prospective hindsight: you assume the plan has *already failed*, set a concrete horizon ("it is six months after launch and this failed badly"), and reason backward to explain why. The durable cognitive move is the grammatical shift from a conditional ("what might go wrong?") to a definite past ("it went wrong, here is why"). That shift does three things at once. It licenses dissent, because once failure is assumed, naming a reason is the assigned task rather than disloyalty. It recruits memory and imagination differently, because explaining a concrete past event is a richer retrieval cue than forecasting an abstract future, so people generate more and more specific causes. And it converts vague worry into pre-committed action by pairing each top cause with a leading signal (tripwire), a mitigation, an owner, and a kill criterion decided before sunk cost and momentum distort judgment. The branded ritual is the packaging; the move is prospective hindsight plus structured conversion to mitigations. The deliverable is a ranked risk register, not a discussion.

## When it helps / when it misleads

It helps most when the decision is real, consequential, and not yet committed - a launch, hire, investment, migration, or vendor selection where you can still change course - and the plan carries optimistic momentum that is quietly suppressing concerns. It earns its keep when causes can be turned into observable signals and pre-decided responses, and it is often best run last, after options have been compared and one chosen, as the final gate before committing.

It misleads or wastes effort when:

- The outcome is already known - that is a postmortem, a different tool. (This is the sharp when-NOT boundary.)
- The decision is trivial or fully reversible. A two-way door does not need the ceremony.
- It is run as ritual - "imagine it failed, list five risks, done" with no conversion to tripwires and kill criteria produces cargo-cult comfort, not better risk handling. The conversion step is mandatory.
- It is used to launder a decision already made. If the mitigations are never acted on, the premortem is theater.
- It is substituted for ideation or option comparison. It is a risk tool, not a way to generate or choose options.

## What the evidence says

The honest grade is **S/M (contested)**, and the dossier is deliberate about which half is which. The well-supported part: prospective hindsight reliably increases the number and specificity of causes people generate, and running a premortem reduces overconfidence and improves a planner's calibration. The not-supported part: there is no strong evidence that premortems improve final outcomes (success rates, ROI, fewer failures), and the famous "~30%" figure measures the number of reasons identified, not any gain in decision quality - quoting it as "30% better decisions" is a misreading the skill explicitly refuses. A required honesty flag applies: all of this evidence comes from human subjects in lab, workshop, and team settings; none of it studies a premortem run by or with an AI agent. The evidence is therefore transferred from human contexts, not validated for AI-augmented use, so the agent's value is framed narrowly - it makes the mechanism cheap to run, enforces the structure, and produces a durable artifact - none of which depends on the contested decision-quality claim. The full grading, the primary-source caveats, and the verification status of each effect-size phrasing live in the skill's evidence record: skills/think-premortem/evidence/dossier.md.

## Why it is / is not a skill here

Verdict: **Build / Shipped.** Premortem is a distinct, evidence-backed move, not a duplicate of anything else in the catalog, so it earned its own skill. The distinctness is in the mechanism: prospective hindsight (assume failure, explain backward) is not the same as forward risk listing, inversion, or option comparison, and the supported effects (more causes surfaced, better calibration) attach specifically to that framing. Shipping it also let it absorb two would-be siblings: Kill criteria / Tripwires folds into its register as the per-cause conversion step rather than standing alone, and FMEA-lite and Inversion remain candidates partly because they overlap what premortem already covers. The learning value of the decision is that "shipped" here did not mean "endorsed as outcome-improving" - it meant the move is real and the supported claims are worth packaging, with the overclaim (better decisions) and the AI-transfer gap disclaimed in the skill itself.

## Lineage and who to read

The underlying cognitive effect comes from Deborah Mitchell, J. Edward Russo, and Nancy Pennington, "Back to the future: Temporal perspective in the explanation of events" (Journal of Behavioral Decision Making, 1989) - the study behind the "more reasons under the has-happened framing" finding. The named technique is Gary Klein's, "Performing a Project Premortem" (Harvard Business Review, 2007); Klein is the attribution carried in the registry. The direct evaluation of plan calibration is Veinott, Klein & Wiggins, "Evaluating the Effectiveness of the PreMortem Technique on Plan Confidence" (ISCRAM 2010). Daniel Kahneman popularized it in Thinking, Fast and Slow (2011), tying it to overcoming optimism bias and groupthink. "Premortem" is a generic descriptive term in common use - no trademark, no attribution required - which is why the skill names it descriptively and cites the lineage rather than branding it. Read Klein for the practice and Mitchell et al. for why it works.
