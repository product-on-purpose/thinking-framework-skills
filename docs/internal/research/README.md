# Research

This is where the library's evidentiary foundation is referenced. The raw discovery corpus itself is **deliberately not committed here.**

## Where the discovery corpus lives

The original discovery research (three LLMs across five dimensions: validation, landscape, architecture, portfolio, naming, plus the Claude-Opus meta-analyses, ~106k words) lives in two private places:

- **Working tree:** gitignored at `_local/initial-discovery/`.
- **Backup (offsite, with history):** branch `backup/discovery-corpus-2026-05-31` on the private origin.

## Why it is not committed to `main`

The earlier plan (fork 4 of the 2026-05-28 decision sheet) was to relocate the corpus into this committed folder, on the reasoning that the repo was permanently private and "gitignored means no backup." Both premises have since changed:

1. **The repo is heading public** (the marketplace listing requires it). Committing the corpus to `main` would publish ~106k words of candid competitive and strategic analysis into public git history, which is hard to reverse.
2. **The "no backup" problem is already solved** by the `backup/discovery-corpus-2026-05-31` branch.

So the corpus stays private. Per-skill evidence is carried forward where it belongs: each skill's `evidence/dossier.md` cites its sources and grades them honestly. The raw multi-LLM research is internal scaffolding, not something the public catalog needs.

## If you later decide the research should be public

Move the specific files you want to publish into this folder deliberately (after a fresh secret scan), rather than committing the whole corpus. Anything committed here becomes part of public history once the repo is public.

## Committed research syntheses in this folder

- [`framework-catalog.md`](framework-catalog.md) - the generated master catalog (tables regenerated from `frameworks/registry.mjs`; hand-authored preamble).
- [`2026-06-11-wave3-external-research.md`](2026-06-11-wave3-external-research.md) - wave-3 external deep-research provenance, dedup against the registry, the 14 admissions + 13th family, and the non-admitted leads. Raw platform outputs stay gitignored at `_local/ingest/`.
- [`2026-10-19-wave4-external-research.md`](2026-10-19-wave4-external-research.md) - the wave-4 synthesis: the three runs compared, the dedup against the registry, the first-hand source checks, and the decisions (3 build candidates, 2 documentation candidates and 9 folds). Raw platform outputs stay gitignored at `_local/research/2026-10-19_2.35-wave4/`.
- [`2026-10-17-wave4-research-brief.md`](2026-10-17-wave4-research-brief.md) - the brief pasted into each deep-research tool for wave 4. It is committed because the wave-3 brief lived only in `_local/` and was lost; it had to be rebuilt from the wave-3 synthesis.
- [`documentation-and-site-plan.md`](documentation-and-site-plan.md) - the original docs/site planning record.

## Running an external research wave

A wave asks several deep-research tools, such as Claude, ChatGPT and Gemini, to find thinking methods the library has not yet evaluated. Two maintainer tools prepare it. Neither one is a gate layer, and both write only to the gitignored `_local/`.

1. **Check the existing sources first.** Run `npm run research:doi-sweep` (`scripts/sweep-crossref.mjs`). It asks CrossRef about every DOI the dossiers and the registry cite, and it reports retractions, corrections and broken DOI references. It needs the network and takes a few minutes. It sends a generic User-Agent and no contact address, and it must stay that way. Each finding becomes a dated decision item in [`../backlog.md`](../backlog.md) after a first-hand check; nothing edits a dossier from the report. `node scripts/sweep-crossref.mjs --doi <doi>` looks up a single DOI.
2. **Generate the dedup appendix.** Run `npm run research:appendix` (`scripts/research-appendix.mjs`). It lists every evaluated method from `frameworks/registry.mjs` by family, with its aliases and its disposition, and each fold names its target. It writes `_local/ingest/<YYYY-MM-DD>_dedup-appendix.md` unless `--out <file>` names another path; wave 4's copy was named `2026-10-17_wave4_dedup-appendix.md`. The aliases matter: wave 3's tools proposed methods the library already held under another name. The public `evaluated.json` carries no aliases, so it cannot stand in for the appendix.
3. **Write or update the brief,** and commit it here as `YYYY-MM-DD-waveN-research-brief.md`. Paste the brief and then the appendix into each tool, as one message.
4. **Save each tool's output** as `_local/ingest/YYYY-MM-DD_waveN_<platform>.md`. The raw outputs stay local, for the reasons the sections above give.
5. **Synthesize.** Admission follows the wave-3 record: a lead needs agreement from two or more runs and a clean dedup against the registry, and the maintainer decides each admission. An admitted method enters the registry as a candidate, and the `think-research-framework` engine then vets it. The synthesis is committed here, as the wave-3 file is.
