#!/usr/bin/env node
// =============================================================================
// finalize.mjs - the one deterministic step that turns raw eval run outputs into
// committed scorecards.
//
// what-it-is:   the canonical commit path for both the TRIGGER and OUTPUT behavioral
//               evals (and, via score-selection.mjs, the skill-selection eval too).
// what-it-does: writes BOTH the .md and the .json for each kind directly into
//               docs/internal/eval-results/ (no scratch sibling, no manual copy: the
//               file that used to get dropped is never produced as a loose
//               intermediate), then stamps each measured skill's skill.meta.yml.
// why:          a run that produces only a .md, only a .json, or writes to a scratch
//               path a human forgets to copy, is the exact failure this replaces;
//               routing every commit through one function makes the pairing
//               structurally impossible to drop (score-selection.mjs reuses
//               buildArtifacts rather than re-implementing it, for the same reason).
// used-by:      run manually per scripts/eval/README.md (`node scripts/eval/finalize.mjs
//               <date> --trigger ... --output ...`); scripts/eval/score-selection.mjs
//               (imports buildArtifacts); tests/finalize.test.mjs (imports
//               buildArtifacts, stampTargetsFromArgv).
// =============================================================================
//
// Usage:
//   node scripts/eval/finalize.mjs <YYYY-MM-DD> --model <id> [--model-tier <tier>] [--prefix <name>] \
//        [--trigger <routed.json> <cases.json>] [--output <results.json>]
// At least one of --trigger / --output is required. Explicit paths only (no auto-discovery).
// --model is the resolved model ID the run measured (e.g. claude-opus-5-5). The tier is read from
// the run output (the workflows return modelTier); --model-tier is only for output that predates it.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scoreTrigger, scoreOutput } from './score-lib.mjs';
import { stampMeta, missingStampTargets } from './stamp-meta.mjs';
import { resolveRunModel, runProvenance, withRunLine } from '../lib/fingerprint-lib.mjs';

const OUT_DIR = 'docs/internal/eval-results';
const USAGE = 'Usage: node scripts/eval/finalize.mjs <YYYY-MM-DD> --model <id> [--model-tier <tier>] [--prefix <name>] [--trigger <routed> <cases>] [--output <results>]';

// With `run` (roadmap C2-1), a scorecard also records which model and which case set produced it:
// in the .json under `provenance`, and as a `Run:` line under the .md title. Without `run` the
// output is byte-identical to what it was before, which keeps the golden tests meaningful.
function withRun(scored, run, date) {
  if (!run) return scored;
  const prov = runProvenance(run, Object.keys(scored.json.perSkill || {}));
  return {
    md: withRunLine(scored.md, date, prov),
    json: { ...scored.json, provenance: { ...(scored.json.provenance || {}), ...prov } },
  };
}

/** Reads skills/think-<slug>/eval/cases.md under `root`, or null when the skill has none. */
export function casesReader(root) {
  return (slug) => {
    const p = resolve(root, 'skills', `think-${slug}`, 'eval', 'cases.md');
    return existsSync(p) ? readFileSync(p, 'utf8') : null;
  };
}

// Which skills a finalize run may stamp, parsed from argv.
//   undefined -> the historical default (every shipped framework)
//   []        -> stamp nothing (--no-stamp)
//   [slugs]   -> exactly these (--stamp a,b,c)
// --no-stamp wins over --stamp: given both, take the safer reading.
export function stampTargetsFromArgv(argv) {
  const a = argv || [];
  if (a.includes('--no-stamp')) return [];
  const i = a.indexOf('--stamp');
  if (i === -1) return undefined;
  return String(a[i + 1] || '').split(',').map((s) => s.trim()).filter(Boolean);
}

export function buildArtifacts({ date, prefix, trigger, output, run }) {
  const base = (kind) => `${OUT_DIR}/${date}${prefix ? '-' + prefix : ''}-${kind}-eval`;
  const arts = [];
  if (trigger) {
    const { md, json } = withRun(scoreTrigger(trigger.cases, trigger.routedRaw,
      { generated: trigger.generated, title: trigger.title, provenance: trigger.provenance }), run, date);
    arts.push({ path: `${base('trigger')}.md`, content: md });
    arts.push({ path: `${base('trigger')}.json`, content: JSON.stringify(json, null, 2) + '\n' });
  }
  if (output) {
    const { md, json } = withRun(scoreOutput(output.rawResults, { provenance: output.provenance }), run, date);
    arts.push({ path: `${base('output')}.md`, content: md });
    arts.push({ path: `${base('output')}.json`, content: JSON.stringify(json, null, 2) + '\n' });
  }
  return arts;
}

// CLI main-guard: only run when invoked directly, never on import.
// Platform-aware comparison: on Windows the drive letter can differ in case between
// process.argv[1] and import.meta.url, so a strict === would silently return false.
const samePath = (a, b) => (process.platform === 'win32' ? a.toLowerCase() === b.toLowerCase() : a === b);
const invokedDirectly = !!process.argv[1] && samePath(resolve(process.argv[1]), fileURLToPath(import.meta.url));
if (invokedDirectly) {
  try {
    const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
    const argv = process.argv.slice(2);
    const date = argv[0];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) {
      console.error(USAGE);
      process.exit(2);
    }
    const flag = (name) => { const i = argv.indexOf(name); return i === -1 ? null : argv.slice(i + 1); };
    const prefix = (flag('--prefix') || [])[0];
    const readJson = (p) => JSON.parse(readFileSync(resolve(ROOT, p), 'utf8'));

    const opts = { date, prefix };
    const trig = flag('--trigger');
    if (trig) { const [routed, cases] = trig; opts.trigger = { routedRaw: readJson(routed), cases: readJson(cases).cases }; }
    const out = flag('--output');
    if (out) opts.output = { rawResults: readJson(out[0]) };
    const prov = flag('--provenance');
    if (prov && opts.output) opts.output.provenance = readJson(prov[0]);
    if (!opts.trigger && !opts.output) { console.error('finalize: supply --trigger and/or --output'); process.exit(2); }

    // Which model produced this run (roadmap C2-1). Resolved before anything is written, so a
    // scorecard can never land without saying what made it.
    try {
      const { model, modelTier } = resolveRunModel({
        model: (flag('--model') || [])[0],
        tierSources: [opts.trigger?.routedRaw?.modelTier, opts.output?.rawResults?.modelTier, (flag('--model-tier') || [])[0]],
      });
      opts.run = { model, modelTier, readCases: casesReader(ROOT) };
    } catch (err) {
      console.error(`finalize: ${err.message}\n${USAGE}`);
      process.exit(2);
    }

    // `--no-stamp` is expressed by NOT CALLING stampMeta, the same way score-selection.mjs does
    // it. Handing stampMeta [] used to mean the same thing, which is exactly what let a
    // miscomputed slug list stamp zero sidecars in silence (see its header); it now throws.
    const stampSlugs = stampTargetsFromArgv(argv);
    const noStamp = Array.isArray(stampSlugs) && stampSlugs.length === 0;

    // Resolve targets BEFORE writing. stampMeta throws on a bad list, but throwing after the
    // artifacts are on disk still leaves a committable scorecard whose stamps never landed -
    // the precise shape of the 2026-09-13 failure this ordering exists to prevent.
    if (!noStamp) {
      // `null` means the default (every shipped framework, computed from the registry, so every
      // slug resolves by construction); only an EXPLICIT list can name a directory that is not there.
      const missing = missingStampTargets(ROOT, stampSlugs ?? []);
      if (missing.length) {
        console.error(
          `finalize: ${missing.length} --stamp target(s) name no skills/think-<slug>/skill.meta.yml - ` +
          `${missing.slice(0, 8).join(', ')}${missing.length > 8 ? ', ...' : ''}. Note --stamp takes ` +
          `BARE slugs (no think- prefix). Nothing was written.`,
        );
        process.exit(2);
      }
    }

    const arts = buildArtifacts(opts);
    for (const a of arts) writeFileSync(resolve(ROOT, a.path), a.content, 'utf8');
    if (opts.trigger && !noStamp) await stampMeta(date, 'trigger', ROOT, stampSlugs);
    if (opts.output && !noStamp) await stampMeta(date, 'output', ROOT, stampSlugs);
    console.log('finalize: wrote\n  ' + arts.map((a) => a.path).join('\n  '));
  } catch (err) {
    // stampMeta throws on an empty or unresolvable target list (#139), and that is a
    // message an operator needs to READ - naming the bad slug and saying nothing was
    // written - not a stack trace they have to decode.
    console.error(`finalize: ${err && err.message ? err.message : err}`);
    process.exit(1);
  }
}
