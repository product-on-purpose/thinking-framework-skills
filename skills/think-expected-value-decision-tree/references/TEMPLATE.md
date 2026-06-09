# Expected Value Decision Tree - Template

Fill this in. The deliverable is the tree plus the rollback plus the what-flips-it note, not a prose essay and not a bare EV number. Source every probability; flag any guess at the node it enters.

---

## Decision

- [one line: what is being chosen]

## Options

- A: [...]
- B: [...]
- C: [...]

## Tree

Choice nodes are squares (the decider controls); chance nodes are circles (nature controls). Each chance fan's probabilities must sum to 1, with a source per probability.

```
[Decision]
 |
 |--[A] ----( chance )-- p=[..] [source] --> leaf: [outcome], value [..]
 |                       p=[..] [source] --> leaf: [outcome], value [..]
 |
 |--[B] ----( chance )-- p=[..] [source] --> ( chance ) ... (sequential: a chance event opens a later choice/chance)
 |
 |--[C] --> leaf: [outcome], value [..]   (a deterministic option needs no chance node)
```

## Outcome values

- [leaf]: [value in the common unit]
- [leaf]: [value in the common unit]
- **Common unit:** [state it, e.g. dollars, qualified leads, QALYs].
- **Incommensurable / unpriced:** [any outcome whose value resists the common scale - name it, do not force a fake number].

## Rollback (fold back, right to left)

Show the arithmetic so it can be checked.

- **Chance node [name]:** EV = p1 x v1 + p2 x v2 + ... = [..]
- **Chance node [name]:** EV = ... = [..]
- **Choice node [name]:** keep best branch -> [branch], EV [..]; prune [the rest].
- **Per-option EV:** A = [..]; B = [..]; C = [..].

## Recommendation

- **Chosen:** [option] - EV [..].
- **Path that produces it:** [the surviving branch, node by node].

## What-flips-it (sensitivity)

- **Most fragile input:** [the single probability or value the recommendation hinges on].
- **Flip threshold:** if [that input] moves past [value], the recommendation switches to [other option]. [How far the current estimate sits from that threshold.]

## Ruin / risk flag

- **Ruin check:** [does any branch carry a small probability of an intolerable, non-recoverable one-shot loss? If yes, name it and state that raw EV is the wrong criterion here - risk of ruin or a risk-averse utility governs.]
- **Risk attitude:** [if the decider's risk aversion is a real preference, surface it rather than overriding it with the risk-neutral EV. If none applies, say "risk-neutral EV is appropriate here."]
