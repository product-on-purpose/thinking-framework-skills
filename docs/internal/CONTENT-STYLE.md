# Content style guide

The conventions for the hand-authored narrative pages (Showcase, the operating guide, the prompt gallery, the trust pages). Generated pages follow the skill files; this governs the prose surfaces. Pair it with the [authoring loop](./AUTHORING.md) (which covers adding a skill) and the [recurring cast](./SCENARIO_PROFILES.md).

## Voice

- **Second person, plain, concrete.** Address the reader. Short sentences. Name the artifact, not the vibe ("a ranked risk register," not "clarity").
- **Show, then explain.** Lead with the worked thing; defer the methodology. The first impression should be "this produces something useful," not "there are seven evidence tiers."
- **Honest, never hyped.** Claim what the evidence supports and no more. If a method's evidence is thin, say so and link the dossier.

## The no-dash rule

No em-dashes (U+2014) or en-dashes (U+2013) anywhere. Use " - " (space hyphen space), or restructure with a comma, colon, or sentence break. Numeric ranges use plain hyphens ("2-5"). A PreToolUse hook enforces this on every write; a write containing either character is denied.

## Links

- Internal links are relative, with a trailing slash, no `.md`: `../../frameworks/think-premortem/`.
- The link guard (`scripts/check-rendered-links.mjs`) fails the build on any browser-broken internal link, so verify targets exist. Build locally (`npm --prefix site run build`) and run the guard before opening a PR.
- The advisor lives at `../../tools/think-framework-advisor/` (its old `/frameworks/` URL redirects).

## Honesty cues every page must carry

- If a page makes a quantified claim, the source is one click away (the dossier or the eval results).
- Worked examples must not overclaim beyond what the framework's dossier supports.
- A method run cold should ship its evidence caveat in the artifact (the output eval's most-dropped element).

## Page definition of done

### Showcase page
- [ ] Follows the three-part unit: **the situation** -> **the prompt** (verbatim, in the protagonist's style) -> **the output** (the full artifact, not a stub) -> why it worked -> what happened next.
- [ ] The artifact matches the skill's `references/TEMPLATE.md` format and is concrete and self-consistent.
- [ ] Uses a [cast](./SCENARIO_PROFILES.md) protagonist in their established voice (Mira casual, Daniel organized, Priya detailed/by-hand).
- [ ] Scenario is distinct from the Northwind anchor and from other pages.
- [ ] Links only to real routes; frontmatter has `title`, `description`, `sidebar.label`.

### Operating guide / gallery page
- [ ] Progressive disclosure: a reader can stop at the first tier and still have something usable.
- [ ] Real, runnable prompts in fenced blocks; no invented slugs.
- [ ] Cross-links to the Showcase and the advisor.

## When adding a new skill

If a new skill ships, it should ship at least one Showcase appearance or a sample so the example layer does not fall behind the catalog (the drift that produced the stale "31 frameworks" getting-started bug). Track-B (the pm-skills company threads) is the next wave; see the aggregated content plan in `_local/content-plan/`.
