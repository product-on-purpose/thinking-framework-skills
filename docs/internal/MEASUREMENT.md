# Measurement and feedback loop

The site measures *coverage* through CI (counts, links, example coverage). This doc covers the other half: whether the docs actually work *for readers*. The point of the loop is to let the next content wave be prioritized by what readers struggle with, not by guesswork (the content-plan premortem's third risk).

## 1. Analytics (aggregate behavior)

GA4 is wired but off by default. `site/astro.config.mjs` injects the gtag snippet only when `PUBLIC_GA_ID` is non-empty, and the deploy workflow passes it from a repository variable. So:

- **To enable:** set the `PUBLIC_GA_ID` repository **variable** (Settings -> Secrets and variables -> Actions -> Variables) to a GA4 measurement id (`G-XXXXXXXXXX`). The next deploy picks it up.
- **Privacy:** unset = no tracking at all. Local builds, PR builds, and forks never emit it (it is only passed in `deploy-pages.yml`). A consent banner is a follow-up if the audience needs one.
- **What to watch:** entry pages, the Showcase and the eval page (`start/does-this-work`) traffic, and where readers drop off. Low non-referral traffic is the signal that the bottleneck is *acquisition*, not conversion.

## 2. The "Was this page helpful?" widget (direct signal)

`site/src/components/SiteFooter.astro` renders a Yes/No widget on every page. No backend:

- On a click it fires a GA4 `page_feedback` event with `{ helpful: 'yes' | 'no', page }` (only when analytics is on), so you get a per-page helpfulness rate.
- It always offers a pre-filled GitHub issue ("Tell us more") for detail, so it works even with analytics off.
- In GA4, build an exploration on the `page_feedback` event by `page` to find the lowest-rated pages.

## 3. Issues and misroutes as content signal

- GitHub issues labelled `docs` (including the ones the widget opens) feed the next wave's backlog.
- A failed trigger-eval case is a docs/disambiguation signal, not only a routing one: if the catalog routes the wrong framework for a situation, the fix is often a clearer description or a "When NOT to use" line, which is content.

## 4. Re-run the behavioral evals on a cadence

The numbers on `start/does-this-work` are the first full run (47-skill catalog, 2026-06-10). The harness (`scripts/eval/`) is reproducible and runs without an API key. Re-run after catalog changes and refresh the page, so the trust numbers stay live rather than frozen. A full-catalog (56-skill) re-run is the natural next measurement.

## 5. How to read the loop

| Signal | Reading | Action |
|---|---|---|
| Traffic arrives, Showcase/eval pages bounce | conversion problem | improve those pages; build Track B / more examples |
| Almost no non-referral traffic | acquisition problem | distribution, `llms.txt` for agent discovery, sharing - not more pages |
| A page is consistently rated "no" | that page is unclear | rewrite it; check its links and examples |
| A framework keeps getting mis-routed | its description/anti-triggers are unclear | tighten the skill's frontmatter and re-run the trigger eval |

Without this loop, every later content wave is a guess. With it, the build order follows the data.
