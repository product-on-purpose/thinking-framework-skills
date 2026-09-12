// =============================================================================
// eval-results-lib.mjs - pure checks over docs/internal/eval-results/.
//
// what-it-is:   the pure validation rules for the eval-results scorecard directory.
// what-it-does: runs two scopes (review M3) over the directory listing it is handed: (1) PAIRING -
//               every .md has a matching .json and vice versa, checked over every entry regardless
//               of schema, so the older advisor-routing files still pass; (2) SHAPE/contract -
//               only .json files that carry a `generated` eval-kind field are checked for the
//               required totals.* keys for that kind, and (for kinds introduced after
//               provenance was required) the required provenance.* keys.
// why:          a scorecard with no sibling doc (or vice versa) is an eval result nobody can find
//               the write-up for, and a scorecard missing its required totals/provenance can't be
//               trusted or reproduced later; this keeps the gate schema-agnostic so it can't red
//               committed history that predates the provenance requirement.
// used-by:      scripts/check-eval-results.mjs (run by scripts/check.mjs / npm run check);
//               tests/check-eval-results.test.mjs
// =============================================================================

const REQUIRED_TOTALS = {
  'TRIGGER eval': ['triggerTop1Pct', 'falseFires'],
  'SKILL-SELECTION eval': ['triggerTop1Pct', 'falseFires'],
  'OUTPUT eval': ['passPct', 'failedChecks'],
};

// Provenance is required only for eval kinds introduced after this repo learned that an
// unattributed number cannot be reproduced, only re-measured. The older TRIGGER/OUTPUT
// scorecards genuinely carry none, and demanding it retroactively would red the gate on
// committed history rather than improve anything.
const REQUIRED_PROVENANCE = {
  'SKILL-SELECTION eval': ['model', 'corpus'],
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
      const requiredProv = REQUIRED_PROVENANCE[p.generated];
      if (requiredProv) {
        for (const k of requiredProv) {
          if (!p.provenance || !(k in p.provenance)) problems.push(`${base}.json (${p.generated}) missing provenance.${k}`);
        }
      }
    }
  }
  return problems;
}
