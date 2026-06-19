---
title: "Concept Mapping - quick sample"
description: Concept Mapping run on an on-call team's reliability picture, turning vague "alerts cause burnout" beliefs into named, checkable propositions.
sidebar:
  label: concept-mapping
---

> A compact worked example of [Concept Mapping](../../frameworks/think-concept-mapping/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-concept-mapping/).

## Situation

Daniel's 200-person company runs a 6-engineer on-call rotation, and leadership keeps asking why the team is exhausted and why incidents still slip through. Everyone has a theory - too many alerts, flaky tests, a thin runbook - but the theories float free and nobody has laid out how reliability, alert volume, on-call load, and burnout actually connect. Before proposing a fix, Daniel wants the relationships made explicit so the team can argue about propositions, not vibes.

## Prompt

```
/think-concept-mapping "Map how our on-call setup actually hangs together: alert volume, false
positives, runbook coverage, MTTR, on-call burnout, attrition, and overall reliability. Everyone
has a pet theory about why we're tired and why incidents still leak. Name every link so we can
argue about the relationships instead of the vibe."
```

## The artifact

# Concept Map - On-call reliability and burnout

> Daniel's team believes alerts cause burnout and burnout hurts reliability, but the chain has never been drawn. This map externalizes how alert volume, on-call load, burnout, and reliability relate, and tests each link as a proposition.

---

## Focus question (optional)

- How do alert volume, on-call load, burnout, and reliability actually relate in our on-call system?

## Concepts

- **Cluster A (Signal / alerting):** alert volume, false-positive rate, runbook coverage, alert tuning
- **Cluster B (Human / load):** on-call load, on-call burnout, attrition, tribal knowledge
- **Cluster C (Outcomes):** MTTR, incident leakage, overall reliability

## Propositions (labeled links)

| Source concept | Linking phrase (named) | Target concept | Reads as a sentence |
|---|---|---|---|
| alert volume | inflates | on-call load | High alert volume inflates on-call load. |
| false-positive rate | inflates | alert volume | A high false-positive rate inflates effective alert volume. |
| alert tuning | reduces | false-positive rate | Alert tuning reduces the false-positive rate. |
| on-call load | drives | on-call burnout | Sustained on-call load drives on-call burnout. |
| on-call burnout | causes | attrition | On-call burnout causes attrition. |
| attrition | depletes | tribal knowledge | Attrition depletes the team's tribal knowledge. |
| runbook coverage | reduces | MTTR | Good runbook coverage reduces MTTR. |
| MTTR | worsens | incident leakage | Higher MTTR worsens incident leakage (slow fixes let impact spread). |
| incident leakage | erodes | overall reliability | Incident leakage erodes overall reliability. |
| runbook coverage | reduces | on-call load | Good runbook coverage reduces on-call load by making responses routine. |

## Cross-links (across clusters)

| Source (cluster) | Linking phrase | Target (cluster) | Why this cross-link matters |
|---|---|---|---|
| tribal knowledge (B) | underpins | runbook coverage (A) | Names a hidden dependency: runbooks are only as good as the knowledge behind them, so attrition silently degrades the very thing that lowers MTTR and load. |
| false-positive rate (A) | accelerates | on-call burnout (B) | Noise burns people faster than real incidents do; this links the signal side directly to the human side, not just through raw volume. |
| on-call burnout (B) | lengthens | MTTR (C) | Tired responders are slower and more error-prone, so burnout feeds back into the outcome it is usually treated as separate from. |

## Surfaced gaps, missing links, and questionable propositions

- **Under-connected concepts (gaps):** "alert tuning" connects only inward (it reduces false positives) and has no link to who owns it or what it costs in engineer-time, so the one obvious lever is described but unstaffed in the map. "overall reliability" is a pure sink - nothing flows out of it - so the map never connects reliability back to the leadership pressure that started this, leaving the business consequence unmapped.
- **Missing links:** there is no link from "on-call burnout" or "attrition" back to "alert tuning" or "runbook coverage" - the map shows the team degrading but never shows the degraded team doing less of the maintenance work that would relieve it. Add a "burnout -> reduces -> maintenance capacity -> lowers -> runbook coverage" loop; that reinforcing spiral is probably the real story and it is currently invisible.
- **Questionable propositions:** "on-call burnout - causes - attrition" reads true but is the team's most load-bearing assumption and has no timescale on it, so it may be overstated in the short run. More sharply, the implied chain "alerts therefore burnout" runs through "alert volume - inflates - on-call load", yet the cross-link "false-positive rate - accelerates - on-call burnout" suggests it is alert *quality*, not volume, that hurts most. That contested junction (is the fix fewer alerts or better alerts?) is the real open question, and it was invisible until every link had to be named.

---

*Note: the value is not a prettier diagram. Forcing each line to be a named proposition turned "alerts cause burnout, burnout hurts reliability" into a network with a contested junction (volume vs noise) and a missing reinforcing loop (a degraded team does less maintenance). Those findings are the gap list, and they hand Daniel a sharper next question than the prose did. The map judges nothing about which fix to pick - that decision work routes to a decision skill; this only makes the relationships inspectable.*

## Why this framework fits

The cognitive job here is to externalize a tangle of "everyone has a theory" beliefs and force each one to be named as a directed proposition, which is exactly what concept mapping does. Unaided thinking left "alerts cause burnout" as a vague association; the artifact surfaces a contested junction (alert volume versus alert noise) and a missing reinforcing loop that point Daniel at the real open question before he commits to a fix.
