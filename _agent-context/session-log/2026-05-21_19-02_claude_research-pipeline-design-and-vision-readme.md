---
date: 2026-05-21T19:02:00-0700
repo: https://github.com/product-on-purpose/thinking-framework-skills
branch: main
summary: Designed the per-framework research pipeline and tracking model; wrote the vision and library README.
files-changed:
  - README.md
  - .gitignore
  - _agent-context/session-log/2026-05-21_19-02_claude_research-pipeline-design-and-vision-readme.md
session-type: planning
model: claude opus 4.7
model-settings: effort max; explanatory output style
agent: claude-code
status: completed
decisions-count: 9
---

# Session: research-pipeline design and vision README

## Summary

Worked through how to document, organize, and execute the per-framework research that turns each thinking method into an evidence-graded skill. Landed on a self-executing build pipeline (research-as-a-skill producing an Evidence Dossier that is the single source of truth, GitHub Projects as an auto-maintained cockpit, a three-zone document lifecycle) after correcting an early over-reliance on `pm-skills`' un-operationalized process. Shipped a comprehensive vision and library README (committed and pushed) and recorded durable feedback in memory. Several design forks remain open before a spec can be written.

## Work Completed

- Invoked the brainstorming skill; explored the greenfield repo and the `_LOCAL/initial-discovery` research (three LLMs across five dimensions plus Claude-Opus meta-analyses).
- Reframed the problem: the portfolio and architecture research is already done; the real need is per-framework build research, and the `skill.meta.yml` sidecar schema is effectively the research contract.
- Expanded the four research-scope options and proposed a meta-level research foundation: Evidence Dossier as single source of truth, the 7-tier evidence model, tiered rigor, per-method plus portfolio-synthesis layers, two storage homes, and research as the first pipeline stage.
- Investigated `pm-skills`' `docs/internal` tracking apparatus, then recalibrated after the user clarified it is aspirational, not operationalized.
- Diagnosed the user's execution failure modes (manual upkeep kills systems; no obvious next action) and captured two added requirements (a GUI cockpit; a working/discovery/collab/archive/backup document lifecycle).
- Settled the tracking cockpit on GitHub Projects and presented a consolidated, minimal, self-executing design.
- Decoupled `jp-skill-builder` from the authoring stage at the user's instruction; clarified that the decoupling is conceptual (not literal disabling) and where it gets recorded.
- Read the Triple-Set 2 landscape meta-analysis and wrote a comprehensive vision plus library README using progressive disclosure.
- Added `.gitignore` (`_LOCAL/`, `.memsearch/`), committed and pushed README plus `.gitignore` (commit `27ea0b5`).
- Confirmed the repo is private.
- Wrote two memory entries (feedback: minimal self-executing process; project: pm-skills operational gap).

## Decisions Made

1. **Evidence Dossier as single source of truth (architectural).** Each method gets one dossier; the `SKILL.md`, the sidecar, references, and evals all derive from it, which prevents drift. The dossier is anchored to the sidecar schema, so the schema doubles as the research contract that defines "research complete."
2. **Research is a purpose-built, repo-native skill and the first pipeline stage (significant).** This follows the user's instinct to make research a skill, turning execution into invoking a skill rather than relying on human discipline.
3. **Tiered rigor (significant).** Deep cross-LLM review for flagship, contested, and trademarked methods; a standard single pass for the rest of the MVP; light triage for the backlog. Avoids the uniform-rigor token-cost trap.
4. **Tracking cockpit = GitHub Projects (significant, user choice).** Keeps the board next to issues, PRs, and code; Claude maintains the fields via `gh` as a side effect of the pipeline; a work-in-progress limit of one plus a per-item checklist answers "no next action."
5. **Three-zone document lifecycle, repo and git based (significant).** Scratch in gitignored `_LOCAL/`, working and collab docs in `docs/internal/`, canonical product in `skills/` plus `docs/research/`. Promotion is a skill output, archiving is git history, and git is the backup.
6. **Do not clone `pm-skills` as a template (significant correction).** Its `docs/internal` process is aspirational, not operationalized; treat it as a source of ideas only and bias hard toward minimal, self-executing process the user will actually run.
7. **Decouple `jp-skill-builder`; authoring is repo-native (significant, user instruction).** Conceptual decoupling, not disabling. To be recorded in memory (done), and later in the repo's `CLAUDE.md`/`AGENTS.md` plus the spec. Default scope: only `jp-skill-builder` is out; `jp-ai-review` judged by fit.
8. **README framed as aspirational and proposed, with evidence honesty (minor).** The evidence-grading honesty is the differentiator. Avoided baking in `jp-skill-builder` or any specific cross-LLM tool; `pm-skills` referenced only as a sibling.
9. **Repo stays private; gitignore `_LOCAL/` and `.memsearch/` (minor).** Raw research is not exposed; files were staged by name to avoid sweeping scratch into the commit.

## Files Changed

- `README.md` - full rewrite: vision, the categorized framework catalog (11 cognitive-operation families), alternative categorization models, the meta-skills pipeline, and the proposed frontmatter taxonomy. Committed and pushed (`27ea0b5`).
- `.gitignore` - new file: ignores `_LOCAL/`, `.memsearch/`, and OS cruft. Committed and pushed (`27ea0b5`).
- `_agent-context/session-log/2026-05-21_19-02_claude_research-pipeline-design-and-vision-readme.md` - this log. Committed this session at the user's request.
- Out of repo: two memory files under `C:\Users\jpris\.claude\projects\...\memory\` (`feedback_minimal-self-executing-process.md`, `project_pm-skills-operational-gap.md`) plus the `MEMORY.md` index.

## Verification

- [x] README written as valid markdown and passed the no-em-dash PreToolUse hook on write.
- [x] `git push` succeeded (`2ebfd59..27ea0b5 main -> main`); working tree clean and in sync with `origin/main`.
- [x] Repo visibility confirmed `PRIVATE` via `gh repo view`.
- [ ] README content NOT yet reviewed by the user (catalog, MVP shortlist, family names, brand name all unconfirmed).
- [ ] No skills, schema, GitHub Project, or pipeline built yet. This session was design and documentation only.
- [~] Assumed: the candidate catalog (~90 methods) faithfully reflects the discovery docs. It was drawn from the Triple-Set 2 meta-analysis and the research prompts, not exhaustively cross-checked against every raw landscape file.

## Outstanding Issues

Open decisions (none blocking, all needed before a spec):

- **ID scheme:** `S/R/M/D` (default) vs reuse `pm-skills`' `F/M/D`.
- **Decoupling scope:** only `jp-skill-builder` out (default) vs all of `jp-library` (including `jp-ai-review` for the deep tier).
- **Repo layout:** start integrated like `pm-skills` (default) vs the separated overlay/plugin build pipeline.
- **`_LOCAL` backup:** leave gitignored (current) vs track `_LOCAL/initial-discovery` (recommended now that the repo is private) vs relocate to `docs/internal/research/`.
- **README review:** MVP shortlist, methods to add or cut, family names, and whether to lock the working brand name `thinking-tools`.
- No design spec is written yet; brainstorming reached a consolidated design but not a committed spec.

## What's Next

1. Settle the four open forks (ID scheme, decoupling scope, layout, `_LOCAL` backup). Quick calls that unblock everything else.
2. Decide whether to write the consolidated design as a committed spec before building.
3. Build the v0 baseline: create the GitHub Project (fields plus Board, Table, and a "Now" view), the `research-method` skill, and the Evidence Dossier template, then run one method (for example Premortem) end to end to a shipped skill.
4. User-review the README and adjust the catalog, MVP shortlist, family names, and brand.
5. Record the `jp-skill-builder` decoupling in the repo's `CLAUDE.md`/`AGENTS.md` when the repo is scaffolded.

## Continuation Prompt

```
Resume work on the thinking-framework-skills repo (private, github.com/product-on-purpose/thinking-framework-skills, branch main). It is the sibling "thinking-tools" library: evidence-graded thinking-method skills for AI agents and the humans who work with them. The vision and candidate-catalog README is written and pushed (commit 27ea0b5). Discovery research lives in _LOCAL/initial-discovery (gitignored): five research dimensions across ChatGPT, Claude Opus, and Gemini plus Claude-Opus meta-analyses. Triple-Set 2 (landscape: catalog, taxonomy, 7-tier evidence model) and Triple-Set 4 (portfolio: the ~12-skill MVP) are the key syntheses.

The agreed design (not yet a committed spec): a self-executing build pipeline where each thinking method gets one Evidence Dossier that is the single source of truth, keyed to a skill.meta.yml sidecar schema and a 7-tier S/M/P/V/A/C/X evidence model; the SKILL.md, sidecar, references, and evals all derive from the dossier. Pipeline stages: ideate -> research-method (purpose-built, repo-native; the deep tier adds a structured cross-LLM adversarial review) -> author-skill (repo-native, NOT jp-skill-builder) -> eval-skill -> release-skill -> improve-skill. Tracking cockpit = a GitHub Project that Claude maintains via gh as a side effect (fields: Status, Type, Family, Tier, Priority; views: Board, Table, and a work-in-progress-1 "Now" view). Documents use three zones: gitignored _LOCAL scratch, committed docs/internal working and collab, committed skills/ plus docs/research product; git is the backup.

Hard constraints: do NOT use or be influenced by jp-skill-builder (authoring is repo-native). Do NOT treat pm-skills as a template to clone (its docs/internal process is aspirational, not operationalized); bias to the minimal, self-executing process the user will actually run. No em-dashes or en-dashes anywhere.

First action: ask the user to settle four open forks, then proceed. (1) Effort ID scheme: S/R/M/D vs F/M/D. (2) Decoupling scope: only jp-skill-builder vs all of jp-library. (3) Repo layout: integrated like pm-skills vs separated overlay/plugin. (4) _LOCAL backup: leave gitignored vs track _LOCAL/initial-discovery (recommended, since the repo is private). Then either write the consolidated design as a committed spec, or jump to the v0 baseline: create the GitHub Project, build the research-method skill plus the Evidence Dossier template, and run Premortem end to end as the first shipped skill. Also pending: user review of the README (MVP shortlist, methods to add or cut, family names, whether to lock the "thinking-tools" brand).
```
