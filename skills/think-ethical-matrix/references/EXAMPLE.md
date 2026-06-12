# Ethical Matrix - Worked Example

A completed run of the `ethical-matrix` skill on a real, consequential decision with a genuine moral trade-off. This is the quality bar a generated ethical matrix should meet.

> Uses the shared recurring scenario (Northwind, a B2B SaaS weighing a self-serve free-tier launch) in its ethics dimension, so examples across skills read as one coherent product. Where `think-scenario-planning` stress-tests Northwind's free-tier strategy against uncontrollable external futures, this skill takes one specific design of that free tier - train the product's models on free-tier customer data - and maps who it helps and who it burdens, on which ethical principles. See `docs/internal/AUTHORING.md`.

> This matrix maps the moral terrain; it does NOT weigh it. It is not ranked, not scored, and emits no verdict. The value is the trade-off pattern read-out, not the filled grid.

---

## Option under analysis

- **Option:** Launch Northwind's self-serve free tier with a default-on clause that lets Northwind train and improve its product models on free-tier customers' data, with an opt-out buried in settings (paid tiers are exempt by contract).

(This is one specific design of the free tier, not a choice among options. The broader "free tier versus sales-led" strategic bet is handled by `think-scenario-planning`; here we assess one ethically loaded design of the free tier.)

## Affected parties (rows)

- **Free-tier users** (individuals and small teams who adopt the free product, often without reading the terms)
- **Paying customers** (contractually exempt from training use; affected indirectly through the product they buy and the precedent it sets)
- **Northwind** (the company and its employees - revenue, model quality, reputation, legal exposure)
- **Free-tier users' own end-customers and contacts** - **voiceless**: the people whose data flows through a free-tier user's account but who never agreed to anything and are not in the room
- **Future users of the category** - **voiceless**: the people downstream who inherit whatever norm "default-on training on free data" becomes if Northwind and its competitors normalize it

(Who counts as affected was checked first: the two voiceless rows - third-party contacts and future users - were nearly left out, which is exactly the kind of omission `think-boundary-critique` guards against. They are in because the option affects them whether or not anyone represents them.)

## Principle columns

Default prima facie set, unadapted for this case:

- **Wellbeing** (beneficence and non-maleficence together - benefit and harm)
- **Autonomy** (freedom, informed consent, self-determination)
- **Fairness** (justice - distribution of benefits and burdens)

No adaptation. A future-generations column was considered (per Schroeder and Palmer, 2003) but the future-user concern is captured adequately by giving future users their own row against the standard three columns, so the column set is left standard and stated.

## The grid

| Affected party | Wellbeing | Autonomy | Fairness |
|---|---|---|---|
| **Free-tier users** | Get a capable product at no cost; bear privacy exposure and a better-trained model partly built on their data **[factual]** | Consent is technically present but degraded - default-on plus a buried opt-out is not meaningful informed choice **[contested]** | They supply the training value that improves a product paying customers are exempt from contributing - an asymmetry of who pays in data **[contested]** |
| **Paying customers** | Benefit from a faster-improving product **[factual]**; reputational risk if the data practice becomes a story **[contested]** | Unaffected on their own data (contractually exempt) **[factual]** | They are exempt while free users are not - they benefit from data they did not have to give **[contested]** |
| **Northwind** | Better models, faster growth, lower data-acquisition cost; offset by legal and reputational exposure **[factual]** | Acts within its own discretion to set terms **[factual]** | Captures most of the upside of an arrangement whose burdens fall on the least-powerful party **[contested]** |
| **Free-tier users' end-customers and contacts** *(voiceless)* | Their data is processed for training with no benefit to them and a real exposure to them **[factual]** | They gave no consent and have no opt-out - the consent chain does not reach them at all **[factual]** | They bear a burden (data use) with zero share of the benefit and zero voice - the sharpest fairness gap in the grid **[contested]** |
| **Future users of the category** *(voiceless)* | Inherit whatever the norm becomes - a worse privacy baseline if "default-on training on free data" is normalized **[contested]** | A weaker future expectation of meaningful consent across the category **[contested]** | If this becomes the standard, the burden-on-the-powerless pattern is locked in for everyone who comes after **[contested]** |

## Trade-off pattern read-out

- **Who bears the burdens, and on which principle:** the burden concentrates on the two least-powerful parties - free-tier users (on autonomy and fairness) and, most sharply, their end-customers and contacts (on fairness and autonomy, where the consent chain does not even reach). The parties with the most power (Northwind, paying customers) carry the least burden and the most benefit.
- **Where one party's benefit is paid for by another's burden:** Northwind's lower data-acquisition cost and faster model improvement (wellbeing benefit) are paid for by free-tier users' degraded autonomy and by their contacts' fairness burden. Paying customers' faster product (wellbeing benefit) is paid for by free-tier users supplying training value the paying tier is exempt from contributing (fairness burden). These are exactly the benefit-here-paid-by-burden-there crossings a stakeholders-only or principles-only view would miss.
- **The contested cells the assessment turns on:** the free-tier autonomy cell (is default-on plus a buried opt-out meaningful consent?) and the two voiceless fairness cells (is it acceptable that the parties with no voice carry the sharpest burden?). The whole judgment hangs on these contested cells - which is where deliberation should focus.
- **Voiceless parties' exposure:** the grid makes plain that the single worst-treated party is the one nobody in the room represents - free-tier users' end-customers and contacts, who get a pure burden with no benefit, no consent, and no voice. That row would not exist at all in a stakeholders-who-showed-up analysis.

## No-verdict footer

> This matrix maps the moral terrain of the default-on training option across affected parties and principles. It is **not a score, a ranking, or a recommendation**, and it emits **no verdict**. It surfaces that the burden concentrates on the least-powerful and voiceless parties and that the judgment turns on a handful of contested consent-and-fairness cells; the weighing of those cells - whether the arrangement is acceptable, and what would have to change to make it so - is left to deliberation among the people who must decide (Schroeder and Palmer, 2003: the matrix is helpful for unpacking and fact-finding but "much less helpful" for weighing).

## Evidence caveat (ships with the artifact)

> **Evidence tier: P (practitioner).** The ethical matrix has roughly twenty-five years of multi-domain application and serious methodological scrutiny, but **no controlled outcome study** exists - there is no measured evidence that using it produces better or more defensible ethical assessments, and no effect size is claimed here. All of that evidence is **human group-deliberation practice; none is on AI agents**, so this agent-produced matrix is a transferred-evidence application, not a validated one. Treat it as a trade-off-mapping aid that made the trade-offs visible and contestable - not as a measure of how ethical the option is, and not as a decision. See `evidence/dossier.md`.

---

*Note how this differs from its neighbors on the Northwind thread. The `think-scenario-planning` example builds alternative external futures and asks which free-tier moves survive all of them - a strategic-robustness read. This ethical matrix does something different: it takes one ethically loaded design of the free tier and maps its impacts on affected parties (including two who have no voice) against impartial principles, surfacing who pays for whose benefit. It deliberately refuses to score or rank the option or to issue a verdict; the deliverable is the trade-off pattern and the contested cells, which is what makes the moral terrain contestable cell by cell.*
