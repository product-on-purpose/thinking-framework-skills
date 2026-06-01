# Evidence Dossier: Iceberg Model

> Single source of truth for the `iceberg-model` skill. The SKILL.md, sidecar, and evals derive from this. If a claim is not here, it does not belong in the skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.iceberg-model` (installable name `tfs-iceberg-model`) |
| **Family** | systems-and-consequences |
| **Evidence tier** | **P** (systems-thinking practitioner; conceptual model, limited controlled evidence) |
| **Confidence** | Moderate that reacting to events alone misses systemic causes; the four levels are a useful lens, not a validated instrument |
| **Status** | draft (authored 2026-05-31 from the discovery corpus) |

## 1. The mechanism (what actually does the work)

The default response to a problem is to react to the **event**: the visible thing that just happened. The iceberg model resists that by moving the problem down four levels, from the tip toward the mass under the water:

1. **Event** - the single visible occurrence. ("Three enterprise accounts churned this month.")
2. **Patterns / trends** - the same kind of event seen over time. ("Enterprise churn has crept up every quarter for a year.") Asking "what has been happening?" instead of "what just happened?" is the first real move.
3. **Structures** - the relationships, policies, incentives, resource flows, and feedback loops that generate the pattern. ("Onboarding is owned by sales, who are comped on new logos, not retention, so new accounts are handed off without a success plan.") This is where leverage lives.
4. **Mental models** - the beliefs, assumptions, and shared stories that hold the structures in place and make them feel normal. ("We believe growth comes from new logos; retention is 'customer success's problem,' not ours.")

The work is done by two disciplines the bare label does not guarantee. First, **descending** all four levels rather than stopping at the event or pattern: most analysis halts before structure, which is exactly where higher-leverage interventions sit. Second, **pairing each level with the intervention it implies** and noting that event-level fixes are low-leverage and reactive while structure- and model-level fixes are higher-leverage and slower. The payoff is naming a systemic cause and a higher-leverage intervention than "react to the event."

The mechanism is what we implement. "Iceberg" is the packaging; the durable move is descending levels of causation from symptom to structure to mindset.

## 2. Lineage

- The iceberg / "levels of perspective" model is a staple of the **systems-thinking** and **organizational-learning** tradition, associated with Peter Senge's *The Fifth Discipline* (1990) and the Society for Organizational Learning, and taught widely by systems-education groups (for example, the Waters Center for Systems Thinking and Donella Meadows' work on leverage points).
- The "mental models" level draws on Senge's discipline of surfacing mental models; the "leverage" framing draws on Meadows, *Leverage Points: Places to Intervene in a System* (1999) and *Thinking in Systems* (2008).

No trademark. The iceberg model is a generic, widely taught diagram; named descriptively here, lineage cited rather than branded.

## 3. What the evidence shows, and what it does NOT show

This is the honest core. The skill must not overclaim.

**Supported (practitioner / conceptual):**
- The iceberg is an established, widely taught systems-thinking tool, valued precisely because it pushes analysis below the event level to structure and mindset, where systems thinkers locate higher-leverage interventions (Meadows on leverage points).
- The underlying claim that durable problems often recur because of structures and incentives, not one-off events, is broadly accepted in systems thinking and organizational learning, and is consistent with everyday observation of recurring failures.

**NOT shown (the caveat that keeps the skill honest):**
- There is **no strong controlled evidence** that running an iceberg analysis produces better outcomes than ordinary root-cause analysis. Its validation is qualitative, pedagogical, and case-based, not experimental.
- "Higher-leverage" is a **judgment, not a measurement.** The model does not quantify leverage or rank interventions by measured effect; it offers a lens for argument, and the structure/model levels it surfaces can be speculative.
- The model can **invite overreach**: not every event has a deep systemic cause, and forcing a four-level descent onto a genuinely one-off or single-cause problem manufactures false structure. The skill must allow stopping early and saying "this is a simple cause."

**Net grade: P.** A useful practitioner lens with limited controlled evidence. Claim that it surfaces systemic causes and candidate higher-leverage interventions that event-level reaction misses; do not claim it produces measurably better decisions or that its leverage judgments are validated.

## 4. Transferred-evidence flag (required honesty for this library)

All of the support above comes from **human** systems-thinking practice, education, and case writing. There is **no direct study** of an iceberg analysis run by, or with, an AI agent, and none of whether an agent-produced iceberg improves a human's intervention choice. The evidence is therefore **transferred from human practice, not validated for AI-augmented use.** The skill must say so. Treat the AI value as: a model defaults to reacting at the event level, so forcing the descent to patterns, structures, and mental models, and pairing each level with its leverage, is a direct counter that produces a durable artifact - benefits that do not depend on any unproven outcome claim.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**
- A problem keeps **recurring** despite event-level fixes, suggesting a structural cause.
- A symptom is being treated as a one-off when it is really the latest instance of a pattern.
- The question is "why does this keep happening, and where do we actually intervene?" rather than "what just happened?"
- There is appetite to consider structural or mindset interventions, not only quick reactive fixes.

**Fails or misleads when (poor-fit / anti-patterns):**
- **A genuinely simple, linear, single-cause problem** - one event with one obvious cause and a known fix. Forcing four levels manufactures false depth. (Anti-trigger.)
- **Mapping forward consequences** ("if we do this, then what happens next?") - that is the futures wheel, which maps *outward/forward* to effects. The iceberg maps *downward* to causes. (Near-miss anti-trigger.)
- **Auditing one person's reasoning** - how an individual climbed from data to a conclusion is the ladder of inference check. The iceberg is about *systemic levels of causation*, not one person's inference chain. (Near-miss anti-trigger.)
- **Run as ritual** - filling four labeled boxes with no honest descent and no intervention paired to each level produces a tidy diagram and no leverage. The skill must force the level-to-intervention pairing.
- **As prediction or measurement** - the leverage ranking is a judgment for argument, not a measured effect; presenting it as proven misleads.

## 6. Output artifact

The skill must emit an **iceberg**, not prose: the problem placed at the event level, then the pattern over time, then the underlying structures, then the mental models, each level paired with the candidate intervention it implies and a note on that intervention's leverage (reactive/low at the event level, higher and slower at the structure and model levels), with the highest-leverage intervention called out. A short "what is really going on, and where to intervene" summary sits above it.

## 7. Sources

1. Senge, P. (1990). *The Fifth Discipline: The Art and Practice of the Learning Organization* - systems thinking, the discipline of surfacing mental models, levels of perspective.
2. Meadows, D. (1999). *Leverage Points: Places to Intervene in a System*; and Meadows, D. (2008). *Thinking in Systems: A Primer* - structures, feedback loops, and where intervention has the most leverage.
3. Waters Center for Systems Thinking (and related systems-education materials) - the iceberg as a teaching tool for moving from events to patterns to structures to mental models.

> **Verification status:** the Senge and Meadows attributions are standard and well-attested; the specific framing of the four-level iceberg as a teaching diagram is drawn from systems-education practice and a secondary research synthesis and should be confirmed against primary curricula before any public-facing claim. Do not attach outcome-improvement or measured-leverage claims; the method's validation is qualitative and pedagogical.
