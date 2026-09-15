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

// Which sidecar field a scorecard kind stamps. TRIGGER and SKILL-SELECTION are different
// instruments against different corpora, but both measure triggering and both stamp the same
// field, so the newest of EITHER is what a sidecar's trigger date should reflect.
const STAMP_FIELD_FOR = {
  'OUTPUT eval': 'output_eval_status',
  'TRIGGER eval': 'trigger_eval_status',
  'SKILL-SELECTION eval': 'trigger_eval_status',
};

// Did the stamps a scorecard implies actually land on the sidecars?
//
// The hole this closes was hit live on 2026-09-13: a run reported `on 0 skill(s) (skipped 0)`,
// wrote its scorecard, and exited 0, leaving a scorecard dated that day beside 67 sidecars still
// claiming an older measurement date. The pairing and shape checks above saw nothing wrong,
// correctly - the scorecard was perfectly well-formed. What was wrong is that the sidecars never
// moved, which is a different assertion, and nothing made it. #139 guarded the two commit paths
// at the source; this guards the RESULT, so a third path (or a hand-edited sidecar) cannot
// reintroduce it.
//
// The naive rule - "every scorecard's date matches its skills' sidecars" - is WRONG and would red
// the gate on committed history: a sidecar carries ONE date per field, so an older run is
// legitimately superseded by a newer one. The rule that actually holds (measured across all 134
// slug x field pairs in the committed directory before being encoded here) is:
//
//     a sidecar's <field> must equal the date of the NEWEST scorecard of that field's kind
//     whose perSkill includes that skill.
//
// `readSidecar(slug)` returns the sidecar text, or null when there is no such skill directory -
// the referential checks in check-registry.mjs own that case, so it is skipped rather than
// double-reported here.
export function checkStampsLanded(entries, readSidecar) {
  const newest = {}; // field -> slug -> { date, file }
  for (const e of entries || []) {
    const parsed = e && e.parsed;
    if (!parsed || !parsed.perSkill || typeof parsed.perSkill !== 'object') continue;
    const field = STAMP_FIELD_FOR[parsed.generated];
    if (!field) continue; // advisor-routing files and anything without a known kind
    const date = (String(e.name).match(/^(\d{4}-\d{2}-\d{2})/) || [])[1];
    if (!date) continue;
    newest[field] = newest[field] || {};
    for (const slug of Object.keys(parsed.perSkill)) {
      const cur = newest[field][slug];
      if (!cur || date > cur.date) newest[field][slug] = { date, file: e.name };
    }
  }

  const problems = [];
  for (const field of Object.keys(newest).sort()) {
    for (const slug of Object.keys(newest[field]).sort()) {
      const { date, file } = newest[field][slug];
      const text = readSidecar(slug);
      if (text == null) continue;
      const m = String(text).match(new RegExp(`^\\s*${field}:\\s*(\\S+)`, 'm'));
      const got = m ? m[1] : '(absent)';
      if (got === `measured-${date}`) continue;
      problems.push(
        `${file} is the newest ${field} scorecard covering "${slug}", but ` +
        `skills/think-${slug}/skill.meta.yml reads ${field}: ${got} (expected measured-${date}). ` +
        `The scorecard claims a measurement the sidecar does not carry - most likely a stamping ` +
        `step that silently stamped nothing.`,
      );
    }
  }
  return problems;
}

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
