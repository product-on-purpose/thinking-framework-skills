---
name: think-qualitative-comparative-analysis
description: Handles a by-name request for QCA (Qualitative Comparative Analysis), the truth-table-and-Boolean-minimization method, honestly. At session scale the input almost never exists and the method certifies configurations from noise, so this skill does NOT build the truth table as if valid. It leads with that evidence, then routes to the evidence-based move the job actually needs (think-reference-class-forecasting for a set of comparable cases, or process tracing in prose for one case). Use only when someone asks for QCA or a truth-table minimization by name.
license: Apache-2.0
metadata:
  id: thinking-framework-skills.qualitative-comparative-analysis
  family: systems-and-consequences
  evidence-tier: "P"
  version: 0.1.0
  standard: "0.8"
  caveat-first: true
  posture: warn_redirect
  recommendation-policy: explicit_request_only
---
<!-- thinking-framework-skills | https://github.com/product-on-purpose/thinking-framework-skills | Apache-2.0 -->
# Qualitative Comparative Analysis (QCA)

QCA codes comparable cases into a truth table and uses Boolean minimization to find which combinations of conditions are necessary or sufficient for an outcome. It is a real, published research method for medium-N comparative projects, and it does not fit a single-reasoner session: the input it needs (10 to 50 deeply-known comparable cases, calibrated on shared conditions) almost never exists, and at exactly the casual scale a session can muster, the simulation literature shows it certifies configurations from noise. This skill therefore does not build the truth table as if valid. It owns the request, leads with what the controlled-simulation evidence shows, and routes you to the evidence-based move your actual job needs. The output is an honest redirect brief, not a truth table with minimized configurations.

## Before you run this: what the evidence shows

QCA is tier **P** (established research practice). It is a legitimate, peer-reviewed, software-supported method for genuine medium-N research, but there is no controlled study showing it improves an individual reasoner's judgment, and inside its own methods literature the core inferential claim is actively contested:

- Lucas and Szatrowski (2014, *Sociological Methodology* 44:1-79) ran QCA on simulated data with a known causal structure; across 70 solutions it recovered the correct causal story 3 times.
- Krogslund, Choi and Poertner (2015, *Political Analysis* 23:21-41) demonstrated parameter sensitivity in fsQCA, including random variables certified as "sufficient" - the method can manufacture confident causal-sounding output from noise.
- Baumgartner and Thiem (2020, *Sociological Methods and Research* 49:279-311) built inverse-search benchmarks and found the conservative and intermediate solution types drew false causal inferences.

The method fails three ways at session scale. The input (a real population of comparable, deeply-known cases) almost never exists for one reasoner. At exactly the accessible scale - a handful of past launches or deals, loosely coded - it manufactures false confidence, because that is the limited-diversity, casual-calibration regime the simulations condemn. And proper practice (calibration justification, robustness tests, negated-outcome analysis, within-case triangulation per Schneider and Wagemann 2010/2012) is a research program, not a session-sized move. So this skill will not hand you a truth table and a "sufficient configuration" verdict, because that artifact is exactly what the simulations condemn at the scale you can reach. It states the caveat and redirects.

## When to Use

- The user asks for QCA (or a "truth table" / "configurational comparison" / "Boolean minimization" across cases) by name, and an honest warning plus a redirect serves them better than silently building the unreliable artifact or refusing outright.

## When NOT to Use

- As a way to actually build a truth table and minimize configurations from a session-sized, loosely-coded case set (the regime where the simulations show QCA certifies noise as "sufficient").
- When the user has not named QCA: route generic "which combination of factors drives this outcome" work straight to the evidence-based skills below.
- For one case: that is within-case territory (process tracing), not cross-case minimization.

## Instructions

When asked to run QCA, follow these steps:

1. **Lead with the caveat.** State that QCA is tier P established research practice, that simulations show it certifies configurations from noise at the casual scale a session can reach (Krogslund et al. 2015; Lucas and Szatrowski 2014), and that you will not build the truth table as if valid.
2. **Name the real job.** What decision is behind the request? A base rate from a set of comparable past cases, or a causal account of one case?
3. **Check the input honestly.** Does a real population of comparable, codable, deeply-known cases exist? In a single-reasoner session it almost never does, and a loosely-coded handful is precisely the regime that manufactures false confidence.
4. **Redirect to the evidence-based move** that fits the job (see the next section). Do not produce a truth table with minimized configurations and a "sufficient" verdict.
5. **Emit the honest redirect brief** per `references/TEMPLATE.md`.

## What to do instead

Route to the shipped, better-grounded move the job actually needs:

- For a set of comparable past cases, get an outcome distribution as a base rate instead of coded configurations: `think-reference-class-forecasting`.
- For a causal account of one case, do within-case process tracing in prose: for each candidate condition, ask what evidence would be necessary or sufficient if it were the driver, and weigh the actual record against that. (Process tracing is a method, not a shipped skill here; run it by hand, not as a `think-` invocation.)

## Output Format

Use the template in `references/TEMPLATE.md`. The deliverable is the honest redirect brief (caveat, real job, input check, evidence-based move), not a truth table or minimized configurations.

## Quality Checklist

Before finalizing, verify:

- [ ] The evidence caveat leads the output (tier P; simulations certify configurations from noise at casual scale).
- [ ] Does not reproduce the discredited truth table or minimized configurations as a valid conclusion; redirects to an evidence-based alternative.
- [ ] The real decision behind the request is named.
- [ ] The input precondition is checked honestly (a real population of comparable, deeply-known cases almost never exists in a session).
- [ ] The output redirects to a specific evidence-based shipped skill (`think-reference-class-forecasting`) or to process tracing in prose for one case.
- [ ] Methodological pedigree (textbooks, software, a methods community) is not cited as if it were outcome evidence.

## Evidence

Tier **P** (established research practice: a real, peer-reviewed, software-supported comparative method, with no controlled study showing it improves an individual reasoner's judgment, and a live methodological debate over its core inferential claim). It ships as a contested lens, warn-and-redirect and explicit-request-only, so a by-name request gets an honest answer (the caveat plus the right alternative) rather than a flat refusal or the unreliable artifact at session scale. The mechanism is genuinely distinct, but distinctness cannot rescue a method whose input precondition and honesty hazard both fail in a session. Full grading: `evidence/dossier.md`.

## Examples

See `references/EXAMPLE.md` for a completed honest redirect brief.
