#!/usr/bin/env node
// score-output.mjs - aggregate an OUTPUT eval run (the per-skill judge results from
// output.workflow.mjs) into a scorecard: per-skill and overall output-check pass rate,
// plus every failed check with the judge's reason. See scripts/eval/README.md.
//
// Usage: node scripts/eval/score-output.mjs <results.json>
//   results.json: { results:[{skill, artifactChars, perCheck:[{check,pass,reason}], passed, total}] }

import { readFileSync } from 'node:fs';

const file = process.argv[2];
if (!file) { console.error('Usage: node scripts/eval/score-output.mjs <results.json>'); process.exit(2); }
const data = JSON.parse(readFileSync(file, 'utf8'));
const results = (data.results || data).slice().sort((a, b) => a.skill.localeCompare(b.skill));

const tPassed = results.reduce((a, r) => a + r.passed, 0);
const tTotal = results.reduce((a, r) => a + r.total, 0);
const perfect = results.filter((r) => r.passed === r.total).length;
const pct = (n, d) => d ? (100 * n / d).toFixed(0) + '%' : 'n/a';

let md = `# Output eval scorecard\n\n`;
md += `Skills evaluated: ${results.length}. Output checks: ${tTotal}.\n\n`;
md += `**Overall: ${pct(tPassed, tTotal)} of checks passed** (${tPassed}/${tTotal}). Skills passing every check: ${perfect}/${results.length}.\n\n`;
md += `| Skill | checks passed | artifact chars |\n|---|---|---|\n`;
for (const r of results) md += `| ${r.skill} | ${pct(r.passed, r.total)} (${r.passed}/${r.total}) | ${r.artifactChars ?? '?'} |\n`;

const fails = results.flatMap((r) => (r.perCheck || []).filter((c) => !c.pass).map((c) => ({ skill: r.skill, ...c })));
md += `\n## Failed checks (${fails.length})\n\n`;
if (!fails.length) md += `_None. Every artifact satisfied every one of its skill's output checks._\n`;
for (const r of results) {
  const fs = (r.perCheck || []).filter((c) => !c.pass);
  if (!fs.length) continue;
  md += `**${r.skill}** (${r.passed}/${r.total})\n`;
  for (const c of fs) md += `- FAIL: "${c.check.slice(0, 90)}" - ${c.reason}\n`;
  md += `\n`;
}

const json = {
  generated: 'OUTPUT eval', skills: results.length,
  totals: { checks: tTotal, passed: tPassed, passPct: tTotal ? +(100 * tPassed / tTotal).toFixed(1) : null, perfectSkills: perfect, failedChecks: fails.length },
  perSkill: Object.fromEntries(results.map((r) => [r.skill, { passed: r.passed, total: r.total, fails: (r.perCheck || []).filter((c) => !c.pass).map((c) => c.check) }])),
};

process.stdout.write(md);
process.stderr.write('[json] ' + JSON.stringify(json.totals) + '\n');
import('node:fs').then(({ writeFileSync }) => writeFileSync(file.replace(/results.*\.json$|\.json$/, 'output-scorecard.json'), JSON.stringify(json, null, 2)));
