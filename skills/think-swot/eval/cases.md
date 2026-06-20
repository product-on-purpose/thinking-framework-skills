# Eval cases: think-swot

> Trigger and output evaluation, derived from `SKILL.md` and `evidence/dossier.md`. think-swot is a contested lens: explicit-request-only, caveat-first. It should fire only when SWOT is asked for by name, never as the default move for a generic strategy prompt.

## Should trigger

- "Run a SWOT analysis on our plan to launch a free tier."
- "Can you do a SWOT for our expansion into the EU market?"
- "I need a SWOT (strengths, weaknesses, opportunities, threats) for this product line."
- "Give me a SWOT grid for acquiring the smaller competitor, and turn it into options."
- "My boss wants a SWOT on the reorg. Build one but tell me where it's weak."
- "Do a TOWS matrix from a SWOT of our current go-to-market."

## Should NOT trigger (wrong tool / near-miss)

- "Help me think through whether to launch a free tier." (generic strategy; the dominant move is decomposition, route to think-issue-tree, not a SWOT)
- "What could go wrong if we expand into the EU?" (risk surfacing; route to think-red-team-light)
- "Map out the possible futures for our market over the next three years." (divergent external futures; route to think-scenario-planning)
- "Decompose our situation into a clean tree of sub-questions." (route to think-issue-tree)
- "Compare these three vendors on cost, risk, and fit." (option scoring; route to think-decision-option-review)
- "Summarize the strengths and weaknesses listed in this doc into a table." (summarization, not analysis)

## Output checks (a good output must)

- [ ] Leads with the evidence caveat (Hill and Westbrook 1997, bare SWOT "did not constitute analysis") before the grid; does not overclaim SWOT's value.
- [ ] Cap each box at three to five load-bearing items, not a long dump.
- [ ] Tag every factor `[evidence]` or `[assumption]`.
- [ ] Mark the one or two priority items per box.
- [ ] Produce a TOWS matching step (S-O, S-T, W-O, W-T) with named strategic options, the real payload.
- [ ] Invent no quantified claim about SWOT's effectiveness.

## Value vs unaided baseline

Asked for "a SWOT," a strong model produces exactly the artifact the field study condemned: a long, undifferentiated four-box list with no prioritization, no evidence tagging, and no path to a decision. This skill refuses that default. It leads with the deficiency, prunes each box to the load-bearing few, separates evidence from assumption, and runs the TOWS matching step that turns the lists into named options, so an explicitly-requested SWOT becomes an honest, decision-useful artifact instead of a dump presented as analysis.
