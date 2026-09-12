#!/usr/bin/env node
// =============================================================================
// score-output.mjs - CLI: score one OUTPUT eval run into a scorecard.
//
// what-it-is:   the ad-hoc CLI wrapper around scoreOutput, for inspecting a run before
//               committing it.
// what-it-does: reads the per-skill judge results (produced by output.workflow.mjs),
//               prints the markdown scorecard to stdout and the totals to stderr, and
//               writes the companion .json to a scratch sibling of the input file.
// why:          lets an operator eyeball a run's pass rate and every failed check with the
//               judge's reason, without going through finalize.mjs, the canonical commit
//               path (writes both artifacts straight into docs/internal/eval-results/ and
//               stamps skill.meta.yml); this CLI predates finalize and is kept only for
//               that ad-hoc inspection.
// used-by:      run by hand per scripts/eval/README.md; not imported by other scripts.
// =============================================================================
//
// Usage: node scripts/eval/score-output.mjs <results.json>
//   results.json: { results:[{skill, artifactChars, perCheck:[{check,pass,reason}], passed, total}] }

import { readFileSync, writeFileSync } from 'node:fs';
import { scoreOutput } from './score-lib.mjs';

const file = process.argv[2];
if (!file) { console.error('Usage: node scripts/eval/score-output.mjs <results.json>'); process.exit(2); }
const data = JSON.parse(readFileSync(file, 'utf8'));
const { md, json } = scoreOutput(data);
process.stdout.write(md);
process.stderr.write('[json] ' + JSON.stringify(json.totals) + '\n');
writeFileSync(file.replace(/results.*\.json$|\.json$/, 'output-scorecard.json'), JSON.stringify(json, null, 2));
