#!/usr/bin/env node
// =============================================================================
// resolve-dispatch-checks.mjs - decide the one output check a model must not decide.
//
// what-it-is:   the deterministic half of the dispatch output eval: it settles the "the proposed
//               registry entry is schema-valid" check by actually running the validator.
// what-it-does: reads the dispatch workflow's results JSON, runs the proposed entry through
//               scripts/check-proposed-entry.mjs as a real subprocess, splices that pass/fail back
//               into the per-check list at its ORIGINAL position (recovered from the cases file so
//               the order is authoritative, not reconstructed), recomputes passed/total, and writes
//               the standard {results:[{skill,perCheck,passed,total}]} shape finalize.mjs consumes.
// why:          one of the research engine's own output checks is "emit a proposed registry entry
//               that passes scripts/check-proposed-entry.mjs". That is a decidable fact, and the
//               producer is instructed to self-validate until it passes - so asking a model judge
//               to grade it would be grading the producer's claim about itself against a check
//               whose whole point is that a machine can settle it. Running the named validator is
//               both cheaper and less corruptible, and it keeps the scorecard's number honest:
//               every check is either model-judged or machine-decided, and the scorecard says which.
// used-by:      run by hand after scripts/eval/dispatch-output.workflow.mjs; its output feeds
//               scripts/eval/finalize.mjs --output. The order-sensitive merge lives in the pure
//               scripts/lib/dispatch-checks-lib.mjs, tested by tests/dispatch-checks-lib.test.mjs
//
// Usage:
//   node scripts/eval/resolve-dispatch-checks.mjs <workflow-results.json> <cases.json> [--out <file>]
//
// Shells out to check-proposed-entry.mjs rather than importing validateEntry, deliberately: the
// check names that script, so that script is what must pass. If it ever grows logic beyond the
// shared lib, this inherits it for free instead of silently diverging.
// =============================================================================

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { spliceChecks } from '../lib/dispatch-checks-lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..', '..'); // scripts/eval/ -> repo root
const VALIDATOR = resolve(ROOT, 'scripts', 'check-proposed-entry.mjs');
const MARKER = 'check-proposed-entry';

const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
};
const positional = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--out');

if (positional.length < 2) {
  console.error('Usage: node scripts/eval/resolve-dispatch-checks.mjs <workflow-results.json> <cases.json> [--out <file>]');
  process.exit(2);
}

const [resultsPath, casesPath] = positional;
const outPath = flag('--out');

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));

const wf = readJson(resultsPath);
const cases = readJson(casesPath);

/**
 * Run the named validator on one proposed entry. Returns {pass, reason}.
 *
 * A missing entry is a FAIL, not a skip: the check asks for an entry to be emitted, so emitting
 * nothing fails it. Failing open here would let a producer satisfy the check by omission.
 */
function validateProposedEntry(entry) {
  if (entry == null || typeof entry !== 'object' || Array.isArray(entry)) {
    return { pass: false, reason: 'no proposed registry entry was emitted (the check requires one), or it was not a JSON object.' };
  }
  const dir = mkdtempSync(join(tmpdir(), 'tfs-dispatch-entry-'));
  const file = join(dir, 'entry.json');
  try {
    writeFileSync(file, JSON.stringify(entry, null, 2), 'utf8');
    const r = spawnSync('node', [VALIDATOR, file], { cwd: ROOT, encoding: 'utf8' });
    const out = `${r.stdout || ''}${r.stderr || ''}`.trim().replace(/\s+/g, ' ');
    if (r.status === 0) {
      return { pass: true, reason: `check-proposed-entry.mjs exited 0: ${out.slice(0, 300)}` };
    }
    return { pass: false, reason: `check-proposed-entry.mjs exited ${r.status}: ${out.slice(0, 400)}` };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const out = [];
for (const res of wf.results || []) {
  const kase = (cases.cases || []).find((c) => c.skill === res.skill);
  if (!kase) {
    console.error(`resolve-dispatch-checks: no case in ${casesPath} for skill "${res.skill}"`);
    process.exit(1);
  }
  // The model was handed only the non-deterministic checks, in order. spliceChecks walks the
  // ORIGINAL checklist and takes each grade from the right source, throwing rather than merging
  // on any mismatch - an off-by-one here would attribute a grade to the wrong check while the
  // totals still looked correct. The entry is validated once, lazily, when its check comes up.
  let merged;
  try {
    merged = spliceChecks(
      kase.checks,
      res.perCheck || [],
      (c) => c.includes(MARKER),
      () => validateProposedEntry(res.proposedEntry),
    );
  } catch (err) {
    console.error(`resolve-dispatch-checks (${res.skill}): ${err.message}`);
    process.exit(1);
  }

  const { perCheck, passed, decidedByValidator, decidedByJudge } = merged;
  out.push({
    skill: res.skill,
    artifactChars: res.artifactChars,
    perCheck,
    passed,
    total: perCheck.length,
  });

  console.log(`${res.skill}: ${passed}/${perCheck.length} checks passed (${decidedByValidator} decided by the validator, ${decidedByJudge} by the judge).`);
  for (const c of perCheck) {
    if (!c.pass) console.log(`  FAIL [${c.decidedBy}] ${c.check.slice(0, 90)}...\n         ${c.reason.slice(0, 200)}`);
  }
}

const payload = {
  evaluated: out.length,
  of: (wf.results || []).length,
  results: out,
  provenance: { ...(wf.provenance || {}), deterministicChecks: `resolved by ${VALIDATOR.replace(ROOT, '.')}` },
};

if (outPath) {
  writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`\nWrote ${outPath} - feed it to: node scripts/eval/finalize.mjs <YYYY-MM-DD> --output ${outPath}`);
} else {
  console.log(`\n${JSON.stringify(payload, null, 2)}`);
}
