#!/usr/bin/env node
// score-output.mjs - aggregate an OUTPUT eval run (the per-skill judge results from
// output.workflow.mjs) into a scorecard: per-skill and overall output-check pass rate,
// plus every failed check with the judge's reason. See scripts/eval/README.md.
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
