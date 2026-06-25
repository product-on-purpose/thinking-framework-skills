// eval-results-lib.mjs - pure checks over docs/internal/eval-results/. Two scopes
// (review M3): (1) PAIRING over every .md/.json (schema-agnostic, so the older
// advisor-routing files pass); (2) SHAPE/contract ONLY over .json that carry a
// `generated` eval-kind field (auto-excludes advisor-routing, whose schema differs).

const REQUIRED_TOTALS = {
  'TRIGGER eval': ['triggerTop1Pct', 'falseFires'],
  'OUTPUT eval': ['passPct', 'failedChecks'],
};

export function checkEvalResults(entries) {
  const problems = [];
  const byBase = new Map();
  for (const e of entries) {
    const m = e.name.match(/^(.*)\.(md|json)$/i);
    if (!m) continue;
    const base = m[1];
    const ext = m[2].toLowerCase();
    const rec = byBase.get(base) || {};
    rec[ext] = e;
    byBase.set(base, rec);
  }
  for (const [base, rec] of [...byBase].sort((a, b) => a[0].localeCompare(b[0]))) {
    if (rec.md && !rec.json) problems.push(`${base}.md has no matching .json sibling`);
    if (rec.json && !rec.md) problems.push(`${base}.json has no matching .md sibling`);
    if (rec.json) {
      const p = rec.json.parsed;
      if (p == null || typeof p !== 'object') { problems.push(`${base}.json does not parse as JSON`); continue; }
      const required = REQUIRED_TOTALS[p.generated]; // only eval scorecards have `generated`
      if (required) {
        for (const k of required) {
          if (!p.totals || !(k in p.totals)) problems.push(`${base}.json (${p.generated}) missing totals.${k}`);
        }
      }
    }
  }
  return problems;
}
