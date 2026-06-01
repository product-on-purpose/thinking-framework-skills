# Evidence Dossier: Backcasting

> The single source of truth for the `backcasting` skill. The `SKILL.md`, the sidecar
> (`skill.meta.yml`), and the eval cases all derive from this file. If a claim is not
> here, it does not belong in the skill.

| | |
|---|---|
| **Skill** | `thinking-framework-skills.backcasting` (installable name `tfs-backcasting`) |
| **Family** | risk-and-resilience |
| **Evidence tier** | **P** (practitioner method; useful, limited controlled evidence) |
| **Confidence** | Moderate that the mechanism helps planning; low that any outcome improvement has been measured |
| **Status** | draft (first authored 2026-05-31, against discovery corpus) |

---

## 1. The mechanism (what actually does the work)

Backcasting starts from a vivid, concrete description of a **desired future state** and reasons *backward* to the milestones and preconditions that must be true for that future to exist, ending at the next concrete step that can be taken now. The load-bearing move is the **reversal of the planning direction**: instead of projecting forward from today's constraints ("given where we are, what can we do?"), it fixes the destination first and then asks, at each step, "what had to be true just before this for it to happen?"

This does three things:

1. **Decouples the goal from present constraints.** Forward planning anchors on what is currently feasible and tends to produce incremental extrapolation of the status quo. Fixing the endpoint first lets the path be derived from the goal rather than capped by today's limits, which is why backcasting is favored for transformative or long-horizon goals where the desirable end state is not reachable by extrapolation.
2. **Exposes the necessary preconditions and their order.** Working backward forces each milestone to name what must already be in place before it - the dependency, the capability, the decision, the resource. Gaps and sequencing that a forward brainstorm glosses over become visible as missing backward links.
3. **Connects an aspirational future to a concrete next action.** The chain does not stop at strategy; it terminates at the first move available now, so the vision is tied to something executable rather than left as a slogan.

The mechanism is what we implement: fix a vivid endpoint, derive the milestone chain backward, surface preconditions at each link, and land on the next concrete step. The branded workshop "backcasting" framing is packaging; the durable move is goal-first backward derivation of a path.

## 2. Lineage

- Originates in **energy and sustainability scenario planning**. Coined as "backwards-looking analysis" by Amory Lovins (1976) in soft-energy-path work, and named **backcasting** and developed methodologically by John B. Robinson (1982, 1990) as a normative alternative to predictive forecasting.
- Operationalized for organizations and sustainability transitions via **The Natural Step** framework (Holmberg & Robert, 2000), which formalized "backcasting from principles."
- Widely used in **futures studies, transition management, and strategic foresight**; appears in foresight primers and corporate strategy practice as a standard normative-planning method.

No trademark constrains the descriptive name. "Backcasting" is a generic methodological term in common use in the foresight and sustainability literatures; no attribution is required and none is claimed. We name the skill descriptively and cite the lineage here.

## 3. What the evidence shows, and what it does NOT show

This is the honest core of the dossier. The skill must not overclaim.

**What is reasonably supported (practitioner-grade):**
- Backcasting is a **well-documented, widely adopted method** in foresight, energy, and sustainability planning, with a clear methodological literature (Robinson; Dreborg 1996; The Natural Step) describing when and why it is preferred over forecasting: long horizons, transformative goals, and situations where the desirable future is not a simple extrapolation of present trends.
- Its claimed value is **procedural and qualitative**: it reframes planning around a desired endpoint, surfaces preconditions and dependencies, and resists the status-quo anchoring of forward extrapolation. Practitioners report it produces clearer milestone structure and a more explicit path than open-ended forward planning.

**What is NOT shown (the caveat that keeps the skill honest):**
- There is **no strong body of controlled studies** showing that backcasting produces *better goals, better plans, or better outcomes* than forward planning. The evidence is method description, case studies, and practitioner experience, not randomized or controlled comparison. Tier **P**, not S or M.
- Backcasting **does not validate the desired future**. If the endpoint is wrong, unrealistic, or undesirable, a clean backward path to it is a confident route to the wrong place. The method assumes the goal is worth reaching; it does not test that assumption.
- The backward chain is **a constructed plausible path, not a forecast or a guarantee**. Naming the preconditions does not make them achievable, and the real world will not follow the chain in order. Treat the path as a structured hypothesis about what would have to happen, to be revised as reality diverges.
- "Working backward improves thinking" is the kind of broad claim the foresight literature does not establish quantitatively; assume the benefit is structure and reframing, not measured decision quality.

**Net grade: P.** A useful, established practitioner method with a sound rationale and broad adoption, but limited controlled evidence of effect. The skill should claim the procedural benefits (endpoint-first reframing, surfaced preconditions, a path to a next step) and explicitly disclaim outcome improvement and goal validation.

## 4. Transferred-evidence flag (required honesty for this library)

All of the support above comes from **human practitioners** in foresight, energy, sustainability, and corporate-strategy settings. There is **no direct study** of backcasting run by, or with, an AI agent, and none of whether an AGENT-produced backcast improves a human's planning. The evidence supporting this skill is therefore **transferred from human practice, not validated for AI-augmented use.** This skill must say so. Treat the AI value as: the agent makes the method cheap to run, enforces the backward direction and the precondition-naming at every link, and produces a durable, inspectable path artifact - benefits that do not depend on any unproven outcome claim.

## 5. When it works / when it fails (drives the eval negative cases and "When NOT to Use")

**Works best when:**
- The goal is a **transformative or longer-horizon desired future** that is hard to reach by extrapolating current trends, where forward planning anchors too low.
- The desired end state can be described **vividly and concretely** (you can say what is true when you have succeeded).
- The value lies in surfacing **milestones, dependencies, and sequencing** between now and the goal, ending in a concrete next step.

**Fails or misleads when (poor-fit / anti-patterns):**
- **Near-term, simple plans** where forward planning is sufficient - backcasting's overhead buys nothing when the path is short and obvious. (Anti-trigger.)
- **The goal is unsettled or unvalidated** - backcasting assumes the endpoint; it does not choose or test it. Use a decision or option-evaluation skill first. A confident path to the wrong goal is worse than no path.
- **Imagining how the plan could fail** - that is a premortem (prospective hindsight, working back from *failure* to causes). Backcasting works back from *success* to the *path*. (Near-miss against tfs-premortem.)
- **Tracing forward consequences of a decision** - that is a futures wheel (first/second/third-order effects radiating outward). Backcasting is goal-first and backward, not consequence-first and forward.
- **Personal follow-through on an already-chosen goal** - that is WOOP (mental contrasting plus an if-then plan for one actor's intention-action gap). Backcasting builds the route to a future; it is not a personal commitment device.
- **Run as ritual** - "imagine the future, then list some steps" with the steps in forward order and no preconditions named is not backcasting; it is a forward plan wearing the label. The skill must force the backward direction and precondition-naming.

## 6. Output artifact

The skill must emit a **backcast path**, not prose: a vivid statement of the desired future state, then an ordered chain of milestones working *backward* from that future to now, each milestone naming the preconditions that had to be true before it, terminating in the **next concrete step** available today. A short summary above the chain names the future and the single most important near-term move. The artifact is the deliverable; the conversation is not.

## 7. Sources

1. Lovins, A. B. (1976). "Energy Strategy: The Road Not Taken?" *Foreign Affairs*, 55(1) - early backwards-looking energy-path analysis.
2. Robinson, J. B. (1982). "Energy backcasting: A proposed method of policy analysis." *Energy Policy*, 10(4):337-344 - names and defines backcasting.
3. Robinson, J. B. (1990). "Futures under glass: A recipe for people who hate to predict." *Futures*, 22(8):820-842 - backcasting as normative alternative to forecasting.
4. Dreborg, K. H. (1996). "Essence of backcasting." *Futures*, 28(9):813-828 - when backcasting is appropriate vs forecasting.
5. Holmberg, J., & Robert, K-H. (2000). "Backcasting from non-overlapping sustainability principles." *International Journal of Sustainable Development & World Ecology*, 7(4) - The Natural Step operationalization.

> **Verification status:** citations 1-5 are standard and well-attested references for backcasting's lineage, drawn from the discovery-corpus synthesis. The exact page numbers and the framing of each finding should be confirmed against the primary papers before they appear in any public-facing README. They are safe to use *inside this dossier* because the dossier's job is to be honest about exactly this uncertainty, and the evidence tier (P) is deliberately conservative.
