# Recipe: stress-test-decision (marquee)

**Job:** pressure-test a consequential, hard-to-reverse decision before committing.

**Use when:** a real choice is about to be made and the cost of being wrong is high. This is the library's flagship chain.

## Chain

1. **`think-decision-option-review`** (`skills/think-decision-option-review/SKILL.md`)
   - Compare the options against weighted criteria; recommend one.
   - Carry forward: the **recommended option** and what would flip it.
2. **`think-what-would-have-to-be-true`** (`skills/think-what-would-have-to-be-true/SKILL.md`)
   - Convert the recommended option into the conditions that must hold; name the killer conditions.
   - Carry forward: the **killer conditions** (load-bearing + uncertain).
3. **`think-premortem`** (`skills/think-premortem/SKILL.md`)
   - Assume the chosen plan has failed; surface causes, mitigations, tripwires, kill criteria.
   - Carry forward: the **top risks with tripwires and kill criteria**.
4. **`think-reference-class-forecasting`** (`skills/think-reference-class-forecasting/SKILL.md`)
   - Sanity-check the cost/time/success estimate against the base rates of comparable past cases.
   - Carry forward: the **outside-view estimate range**.

**Optional adds** (when stakes justify the tokens): insert **`think-red-team-light`** after step 2 to steelman the opposition, and/or **`think-futures-wheel`** after step 3 to map second- and third-order effects.

## Composite artifact

A decision brief: the recommended option, the conditions it depends on, its top risks with pre-decided responses, and an honest outside-view estimate - enough to commit with eyes open, or to decide not to.

## Token discipline

This is the longest chain; compression matters most here. Pass only each step's compressed artifact (recommendation -> killer conditions -> risk register -> estimate range), never the full working text. The audit named unbounded chains like this as the main operational risk.
