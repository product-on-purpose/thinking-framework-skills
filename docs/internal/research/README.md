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
- [`documentation-and-site-plan.md`](documentation-and-site-plan.md) - the original docs/site planning record.
