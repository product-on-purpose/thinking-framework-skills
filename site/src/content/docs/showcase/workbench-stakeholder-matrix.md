---
title: "Workbench maps stakeholders before approval gates"
description: An enterprise tool grids stakeholders against values before writing acceptance criteria for approval gates.
sidebar:
  label: "Workbench -> stakeholders"
---

> **Priyanka Rao**, Principal PM for Enterprise at Workbench (Series B, 200 staff, ~500 enterprise customers). The decision: how to design approval gates for Blueprints, the reusable templates that route through reviewers before they publish. Prompting style: detailed and enterprise, naming roles and accountability.

This is a complete run, prompt to artifact. Framework: [Ethical Matrix](../../frameworks/think-ethical-matrix/). For the cast and the other journeys, see the [Showcase index](../).

## The situation

Blueprints (the templates) is already shipping. The contested addition this quarter is approval gates: routing a template through reviewers before it publishes. About 30% of Workbench's customers are in regulated industries that need audit trails and change-control, and least-privilege is table stakes for them. The rest want speed. Priyanka's pod (herself, four engineers, and Dr. Elena Voss part-time on compliance) has a half-year roadmap slot, and a customer advisory board of about twelve enterprise admins is watching. Before the team writes acceptance criteria, Priyanka wants to see whose interests the gate design trades off, so the criteria encode those trade-offs deliberately rather than by accident.

## The prompt

```
/think-ethical-matrix "We're adding approval gates to Blueprints (templates that route through
reviewers before publish). Stakeholders: template authors, approvers/admins, end users who consume
published blueprints, and customer compliance/IT. Values in tension: speed of authoring, control
and auditability, autonomy of authors, and least-privilege. Map stakeholders against these values
before we write acceptance criteria, so we see whose interests the gate design trades off."
```

Detailed and enterprise: the proposal, the named stakeholder roster, the values in tension, and the explicit reason for running it now (before acceptance criteria). The framework supplies the grid, the tags, and the trade-off read-out.

## The output

> **Ethical Matrix - Approval gates on Blueprints**

> The matrix maps the moral terrain; it does NOT weigh it. It is not ranked, not scored, and emits no verdict. The value is the trade-off pattern read-out, not the filled grid.

### Option under analysis

- **Option:** Add approval gates to Blueprints so that a template must route through one or more designated reviewers (approvers/admins) and clear them before it can publish to the workspace, with the routing and sign-off captured in an audit trail.

(This is one specific proposal - gating publication on reviewer approval - not a choice among gate models. The comparison of lightweight versus strict versus configurable gate designs is a separate decision; here we map who one gating proposal helps and burdens, on which principles.)

### Affected parties (rows)

- **Template authors** (the people who build Blueprints; want to ship fast and keep autonomy)
- **Approvers / admins** (the reviewers and workspace administrators who own the gate and the sign-off)
- **End users who consume published Blueprints** (the broad population who run a published template - **voiceless** here: they are not in the design conversation but inherit whatever quality and access the gate enforces)
- **Customer compliance / IT** (Elena's counterparts at the ~500 customers, sharpest among the regulated ~30% who need audit trails and least-privilege)
- **Future workspace members and auditors** - **voiceless**: the people downstream, including external auditors, who inherit the audit record and the access norms this gate sets, and who never participated in choosing them

(Who counts as affected was checked first. The two voiceless rows - end users and future members/auditors - are easy to omit because nobody in the advisory board represents them, which is exactly the omission to guard against. They are in because the gate affects them whether or not anyone speaks for them.)

### Principle columns

The values Priyanka named map onto an adapted column set. Stated, not silent:

- **Wellbeing** (beneficence and non-maleficence together - here, speed and quality of the authoring-and-publishing experience, and the harm of a bad or unreviewed template reaching users)
- **Autonomy** (freedom, consent, self-determination - here, author autonomy to ship without a gatekeeper)
- **Fairness** (justice - distribution of the gate's benefits and burdens across the parties)
- **Control and auditability** - **adapted column. Justification:** auditability and least-privilege are not reducible to the standard three for this case; for the regulated ~30% they are the whole point of the feature, and a benefit on this column is often paid for by a burden on autonomy, so the trade-off only becomes visible if control gets its own axis. Adapted deliberately rather than folded silently into fairness.

### The grid

| Affected party | Wellbeing | Autonomy | Fairness | Control and auditability |
|---|---|---|---|---|
| **Template authors** | Lose authoring speed - a gate adds a wait and a round-trip before publish **[factual]**; gain confidence that a reviewed template will not embarrass them **[contested]** | Autonomy is directly reduced - they can no longer publish on their own judgment; a reviewer now stands between them and the workspace **[factual]** | They carry the heaviest process burden of any party so that others (compliance, end users) get assurance they do not personally need **[contested]** | They inherit a control regime they did not ask for; for a low-risk template the audit step is pure overhead to them **[contested]** |
| **Approvers / admins** | Gain a lever to keep quality up; bear a new review workload that can become a bottleneck on a small admin team **[factual]** | Their discretion expands - they decide what publishes - which is power that can be used well or to obstruct **[contested]** | They receive authority over authors' work; the fairness question is whether that authority is matched by accountability for delays they cause **[contested]** | This is their principal benefit - a defensible record of who approved what, when **[factual]** |
| **End users who consume Blueprints** *(voiceless)* | Benefit from higher-quality, reviewed templates and fewer broken or unsafe ones reaching them **[factual]** | Unaffected on their own autonomy; they consume rather than author **[factual]** | They gain assurance they did not have to pay for in process cost - the burden falls upstream on authors **[contested]** | They inherit a safer published surface without ever seeing the gate **[factual]** |
| **Customer compliance / IT** | The feature reduces their compliance risk and audit-prep effort materially **[factual]** | Largely unaffected on autonomy; the gate serves their mandate rather than constraining it **[factual]** | For the regulated ~30% this is the party the gate most serves; the fairness question is whether the other ~70% are made to pay for a control only this segment needs **[contested]** | This is the core benefit - least-privilege routing and an audit trail are exactly what their regime requires **[factual]** |
| **Future workspace members and auditors** *(voiceless)* | Inherit a more trustworthy template library, or a slower-moving one, depending on how heavy the gate is set **[contested]** | Inherit whatever default expectation of author freedom this gate normalizes across the platform **[contested]** | If the gate is set for the strictest segment and applied to all, the speed burden is locked in for everyone who comes after **[contested]** | They inherit the audit record itself - its completeness later depends entirely on choices made now **[factual]** |

### Trade-off pattern read-out

Read the grid as a pattern, not a sum. This is the payoff.

- **Who bears the burdens, and on which principle:** the burden concentrates on **template authors** - on autonomy (a reviewer now gates their work) and on wellbeing (lost authoring speed). They carry the heaviest process cost so that other parties gain assurance. **Approvers/admins** carry a secondary burden: a review workload that can become a bottleneck.
- **Where one party's benefit is paid for by another's burden:** customer compliance/IT's control-and-auditability benefit and end users' wellbeing benefit (reviewed, safer templates) are both paid for by template authors' lost autonomy and speed. That is the central crossing - the gate moves cost upstream to authors and assurance downstream to consumers and compliance. A second crossing: the regulated ~30% get a control they need; if the same gate is imposed on all, the ~70% who want speed pay for a benefit they do not use.
- **The contested cells the assessment turns on:** the author-autonomy-and-fairness cells (is it acceptable to make every author route through a gate for a risk only some templates carry?) and the compliance-fairness cell (should the whole customer base bear the strictest segment's control cost?). The whole judgment hangs on these - which is where deliberation, and the acceptance criteria, should focus.
- **Voiceless parties' exposure:** the grid makes plain that the two parties with no one in the room - end users and future members/auditors - mostly *benefit* (safer templates, a complete audit trail), but their benefit depends entirely on choices the present parties make now; a gate set too light to satisfy compliance, or so heavy authors route around it, fails the voiceless rows silently because nobody is there to object.

### No-verdict footer

> This matrix maps the moral terrain of adding approval gates to Blueprints across affected parties and principles. It is **not a score, a ranking, or a recommendation**, and it emits **no verdict**. It surfaces that the cost concentrates on authors' autonomy and speed while assurance flows to compliance and end users, and that the judgment turns on whether the strictest segment's control needs should set the gate for everyone; the weighing of those cells - what the gate should require, and for whom - is left to deliberation among the people who must decide (Schroeder and Palmer, 2003: the matrix is helpful for unpacking and fact-finding but "much less helpful" for weighing).

### Evidence caveat (ships with the artifact)

> **Evidence tier: P (practitioner).** The ethical matrix has roughly twenty-five years of multi-domain application and serious methodological scrutiny, but **no controlled outcome study** exists - there is no measured evidence that using it produces better or more defensible ethical assessments, and no effect size is claimed here. All of that evidence is **human group-deliberation practice; none is on AI agents**, so this agent-produced matrix is a transferred-evidence application, not a validated one. Treat it as a trade-off-mapping aid that made the trade-offs visible and contestable - not as a measure of how ethical the gate design is, and not as a decision. See `evidence/dossier.md`.

## Why this prompt worked

It named one concrete **option** (gating publication on reviewer approval), gave an explicit **stakeholder roster** including the parties who consume but do not author, and named the **values in tension** - which mapped cleanly onto principle columns, with control-and-auditability earning its own adapted axis. Critically, Priyanka asked for the grid **before** writing acceptance criteria, which is the right order: the matrix is a terrain map, not a verdict, so its job is to make the trade-offs visible while the design is still open. Naming the values up front let the framework do the thing it does best - hold both axes at once so the author-versus-compliance trade-off could not slide out of view.

## The handoff to pm-skills

The filled grid feeds pm-skills' `discover-stakeholder-summary` - the decision layer hands the delivery layer a stakeholder picture that already names who gains and who pays, not just who exists. And the matrix's contested cells become explicit constraints in pm-skills' `deliver-acceptance-criteria`: the author-autonomy burden and the regulated-segment-versus-everyone fairness tension cross the boundary as design constraints the criteria must honor (for example, that a low-risk template should not pay the strictest segment's process cost), so the trade-offs the matrix surfaced get encoded deliberately rather than discovered late.

## Next in the thread

Next in Workbench's thread: with the stakeholders mapped, Priyanka structures the open question of whether enterprises will actually adopt gated Blueprints. See [Workbench structures the adoption question](../workbench-issue-tree-adoption/).
