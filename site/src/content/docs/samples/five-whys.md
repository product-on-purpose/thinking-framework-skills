---
title: "Five Whys - quick sample"
description: An explicitly-requested Five Whys run caveat-first - a single linear chain with a branch-or-not flag on each step and a redirect when the problem turns multi-cause.
sidebar:
  label: five-whys
---

:::caution[Five Whys is a contested lens]
Five Whys is tier X (weak evidence). The most-cited critique found the single-chain method oversimplifies multi-causal problems and follows one path when failures are usually multi-causal (Card 2017). This sample runs it honestly: the caveat leads, every step is flagged single-cause or branch, and the moment a step branches it redirects. For any problem that might have more than one cause prefer [issue trees](../../frameworks/think-issue-tree/); this fires only because Five Whys was asked for by name.
:::

> A compact worked example of [Five Whys](../../frameworks/think-five-whys/) on a realistic situation. For full end-to-end narratives see the [Showcase](../../showcase/); for the evidence behind the method see its [framework page](../../frameworks/think-five-whys/).

## Situation

Daniel is a staff engineer at a 200-person company whose nightly ETL job loads the previous day's orders into the analytics warehouse. Last Tuesday's run reported success, but finance noticed the daily revenue total was short: a batch of roughly 4,000 orders from one source feed never landed, and no alert fired. His EM asked for "a quick five whys on the dropped batch" for the incident review. Daniel knows Five Whys has a reputation for stopping at one tidy cause, so he wants it run with the discipline that flags when there is really more than one.

## Prompt

```text
/think-five-whys "Run a five whys on this.
Situation: nightly ETL reported success but silently dropped a 4,000-order batch from one feed; no alert fired.
Constraints: incident review tomorrow, I need root cause(s), not a tidy single story.
Already tried: traced the missing batch to one upstream feed and confirmed the job exit code was 0.
Be honest about where it's one chain and where it branches."
```

## The artifact

> **Evidence caveat (read first):** Five Whys is tier X; the single-chain method oversimplifies multi-causal problems (Card 2017). What follows is worth reading only because each step is flagged for branching and the chain stays honest about being one path. The moment a step branches, the stronger move is `think-issue-tree`.

### Problem

- The nightly ETL reported exit code 0 ("success") while silently dropping a 4,000-order batch from one source feed, so the warehouse revenue total ran short and no alert fired.

### The chain

1. **Why was the batch missing from the warehouse?** The loader skipped every record from that feed for the run. `[single cause]`
2. **Why did the loader skip those records?** They failed schema validation, so the loader discarded them. `[single cause]`
3. **Why did they fail validation?** The upstream feed had added a new currency code the loader's enum did not allow. `[branch]`
4. **Why did the job still report success?** Discarded records were counted as "filtered," not "failed," so the exit code stayed 0. `[branch]`

### Multi-cause check

- Two steps branched, and they are independent: the rejected records (a schema-contract gap with the upstream feed) and the green-on-data-loss exit code (an error-handling gap in the loader) each caused real harm, and neither is downstream of the other. A stricter enum would have stopped the drop; a loader that failed on discarded records would have caught it even with the enum unchanged. Forcing a single chain here would pick one and bury the other. This is the documented Five Whys failure mode, so the honest move is to hand it to [think-issue-tree](../../frameworks/think-issue-tree/), which branches the "schema contract" and "error handling" causes side by side with coverage discipline rather than walking just one.

### Countermeasure (held back)

- Not emitted as a single fix: because the chain branched, presenting one countermeasure would imply one cause. The two real fixes (a versioned schema contract that fails the feed on unknown values, and a loader that treats silently discarded records as a job failure, not a filter) belong on separate branches of an issue tree, not at the bottom of one chain.

## Why this framework fits

Daniel's EM asked for Five Whys by name, so a flat refusal would not help. Run caveat-first, the lens still earns its keep here, but in an unexpected way: the branch flags are what surface that this failure had two independent causes, not one. Unaided, "do a five whys" produces a confident single chain ending at "the upstream feed changed its schema" and silently drops the loader that called data loss a success. The disciplined version catches the branch and redirects to the tool that keeps both causes, which is exactly the honest outcome the critique (Card 2017) asks for.
