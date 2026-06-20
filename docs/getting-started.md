# Getting started

This is a library of **63 thinking frameworks rebuilt as skills** an AI agent can run, and that humans can follow by hand. Each one takes a messy situation and produces a concrete artifact: a ranked risk register, a weighted option matrix, an argument map, an honest base-rate estimate.

This page gets you installed and running one skill. For the full tutorial and the interactive chooser, go to the live docs (linked at the bottom).

## Install

Pick one path.

**Claude Code plugin (marketplace):**

```
/plugin marketplace add product-on-purpose/agent-plugins
/plugin install thinking-framework-skills@product-on-purpose
```

**Any agent (skills CLI):**

```
npx skills add product-on-purpose/thinking-framework-skills
```

**Clone the repo:**

```
git clone https://github.com/product-on-purpose/thinking-framework-skills.git
```

Skills install with a `think-` prefix (for example, `think-premortem`).

## Run your first skill

In Claude Code, run a premortem on a real decision you are about to commit to:

```
/think-premortem "we're about to launch X next week"
```

You get a ranked **risk register**: for each top risk, a leading signal, a mitigation, an owner, and a kill criterion. That artifact, not a feeling of caution, is the point.

Each skill is two things: a **procedure** the agent executes, and a **saveable artifact** it produces. You do not need an agent. Every skill is a numbered procedure you can run by hand with a pen and the template on its page. The agent just makes the mechanism cheap to run and enforces the structure.

## Where to go next

Do not know which framework you need? Start with the **Framework Advisor**: describe your situation in plain language and it returns a short Thinking Plan naming the one or two frameworks worth running, in order.

- Full getting-started tutorial: https://thinking-framework-skills.productonpurpose.com/start/getting-started/
- Interactive chooser: https://thinking-framework-skills.productonpurpose.com/explore/chooser/
- Framework Advisor (the front door): https://thinking-framework-skills.productonpurpose.com/tools/think-framework-advisor/

To author or grade a skill, see [the authoring guide](./internal/AUTHORING.md). The skills themselves live in [`../skills/`](../skills/) and are the source of truth; the docs site is a generated view.
