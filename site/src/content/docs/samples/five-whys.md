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

Mira runs ops for a small SaaS team. The status page showed "all systems operational" while a paying customer was getting 500s on checkout for two hours. Her lead asked for "a quick five whys on it" for the incident review. Mira knows Five Whys has a reputation for stopping at one tidy cause, so she wants it run with the discipline that flags when there's really more than one.

## Prompt

```text
/think-five-whys "Run a five whys on why checkout 500'd for two hours while the status page said all green. Be honest about where it's just one chain and where it isn't."
```

## The artifact

> **Evidence caveat (read first):** Five Whys is tier X; the single-chain method oversimplifies multi-causal problems (Card 2017). What follows is worth reading only because each step is flagged for branching and the chain stays honest about being one path. The moment a step branches, the stronger move is `think-issue-tree`.

### Problem

- Checkout returned 500s for two hours while the status page reported "all systems operational."

### The chain

1. **Why did checkout 500?** The payment service rejected every request. `[single cause]`
2. **Why did the payment service reject every request?** Its API credential had expired. `[single cause]`
3. **Why did the credential expire unnoticed?** It was a manually rotated key with no expiry alerting. `[branch]`
4. **Why did the status page stay green?** The health check pinged the homepage, not the checkout path. `[branch]`

### Multi-cause check

- Two steps branched, and they are independent: the expired credential (a process gap in key rotation) and the blind status page (a monitoring gap) each caused real harm, and neither is downstream of the other. Forcing a single chain here would pick one and bury the other. This is the documented Five Whys failure mode, so the honest move is to hand it to [think-issue-tree](../../frameworks/think-issue-tree/), which branches the "credential" and "monitoring" causes side by side with coverage discipline rather than walking just one.

### Countermeasure (held back)

- Not emitted as a single fix: because the chain branched, presenting one countermeasure would imply one cause. The two real fixes (expiry alerting on rotated keys; a health check that exercises the checkout path) belong on separate branches of an issue tree, not at the bottom of one chain.

## Why this framework fits

Mira's lead asked for Five Whys by name, so a flat refusal would not help. Run caveat-first, the lens still earns its keep here, but in an unexpected way: the branch flags are what surface that this incident had two independent causes, not one. Unaided, "do a five whys" produces a confident single chain ending at "expired credential" and silently drops the blind status page. The disciplined version catches the branch and redirects to the tool that keeps both causes, which is exactly the honest outcome the critique (Card 2017) asks for.
