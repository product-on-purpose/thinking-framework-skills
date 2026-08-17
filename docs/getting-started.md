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

### After cloning, what next?

A clone is not an install. Pick the one that matches what you came for:

| You want to... | Do this |
|---|---|
| **Use** the skills in Claude Code | Ignore the clone and use the marketplace path above; it is the supported install |
| **Read** a skill or run one by hand | Open `skills/think-<name>/SKILL.md` for the procedure and `references/TEMPLATE.md` for the artifact. No tooling needed |
| **Point another agent at it** | `npx skills add product-on-purpose/thinking-framework-skills`, or read `AGENTS.md` at the repo root |
| **Contribute** a change | You need the conformance gate. See [contributing](./contributing.md), and [troubleshooting](./troubleshooting.md) when it fails |

## Run your first skill

In Claude Code, run a premortem on a real decision you are about to commit to:

```
/think-premortem "we're about to launch X next week"
```

You get a ranked **risk register**: for each top risk, a leading signal, a mitigation, an owner, and a kill criterion. That artifact, not a feeling of caution, is the point.

**What success looks like.** So you can tell a good run from a vague one, here is the shape of a real result (truncated from the [full worked example](../skills/think-premortem/references/EXAMPLE.md)):

> **Decision:** Launch a self-serve free tier in 6 weeks to accelerate top-of-funnel growth.
> **Horizon:** 6 months after launch. **Reversibility:** one-way door in practice.
>
> | # | Cause of failure | Likelihood | Impact | Leading signal / tripwire | Mitigation | Owner | Kill criterion |
> |---|---|---|---|---|---|---|---|
> | 1 | Free tier cannibalizes paid: customers downgrade rather than convert | H | H | Net new paid MRR growth slows in the first 4 weeks while free sign-ups rise | Gate the top 3 value features behind paid; instrument the free-to-paid funnel before launch | PM (Growth) | Paid net-new MRR drops below the pre-launch trend for 2 consecutive weeks |
> | 2 | Support and infra cost from unqualified free users exceeds plan | H | M | Support tickets per 100 free users above threshold by week 2 | Hard usage caps; self-serve onboarding; a cost-per-free-user budget set before launch | Eng lead | Cost per free user exceeds 1.5x model for 3 weeks with no path to fix |

If your output is an essay about risk rather than a table like this, ask for the artifact by name, and see [troubleshooting](./troubleshooting.md).

Each skill is two things: a **procedure** the agent executes, and a **saveable artifact** it produces. You do not need an agent. Every skill is a numbered procedure you can run by hand with a pen and the template on its page. The agent just makes the mechanism cheap to run and enforces the structure.

## Where to go next

Do not know which framework you need? Start with the **Framework Advisor**: describe your situation in plain language and it returns a short Thinking Plan naming the one or two frameworks worth running, in order.

- Full getting-started tutorial: https://thinking-framework-skills.productonpurpose.com/start/getting-started/
- Interactive chooser: https://thinking-framework-skills.productonpurpose.com/explore/chooser/
- Framework Advisor (the front door): https://thinking-framework-skills.productonpurpose.com/tools/think-framework-advisor/

To author or grade a skill, see [the authoring guide](./internal/AUTHORING.md). The skills themselves live in [`../skills/`](../skills/) and are the source of truth; the docs site is a generated view.
