// =============================================================================
// fingerprint-lib.mjs - content fingerprints for eval cases, and the run provenance built on them.
//
// what-it-is:   the pure functions that say WHICH case set and WHICH model produced a scorecard
//               (roadmap C2-1, SPEC-03).
// what-it-does: fingerprints a skill's eval/cases.md (sha256 of LF-normalized text, first 12 hex),
//               folds the per-skill fingerprints into one run fingerprint, resolves the run's model
//               from the sources that name it, and renders the one-line provenance header a
//               scorecard's .md carries.
// why:          a scorecard that records only a date can be re-measured but not reproduced. When the
//               model behind a published figure changes, or a skill's cases are edited after it was
//               measured, the figure moves and nothing says why. Recording the model and a case
//               fingerprint in every scorecard is what lets a later run be compared like for like.
// used-by:      scripts/eval/finalize.mjs (buildArtifacts, CLI); scripts/eval/score-selection.mjs;
//               scripts/eval/check-eval-freshness.mjs; tests/fingerprint-lib.test.mjs
//
// LF normalization matters here specifically: this repo is edited on Windows and CI runs on Linux,
// and an unnormalized hash of the same file would differ between the two checkouts.
// =============================================================================

import { createHash } from 'node:crypto';

export const MODEL_TIERS = ['haiku', 'sonnet', 'opus', 'fable'];

/** sha256 of LF-normalized text, first 12 hex characters. */
export function casesFingerprint(text) {
  return createHash('sha256').update(String(text).replace(/\r\n?/g, '\n'), 'utf8').digest('hex').slice(0, 12);
}

/**
 * One fingerprint per measured skill, keyed by bare slug, sorted. `readCases(slug)` returns the text
 * of skills/think-<slug>/eval/cases.md, or null when there is none (recorded as null, not skipped,
 * so a missing file is visible in the scorecard rather than silently absent).
 */
export function skillCasesFingerprints(slugs, readCases) {
  const out = {};
  for (const slug of [...new Set(slugs)].sort()) {
    const text = readCases(slug);
    out[slug] = text == null ? null : casesFingerprint(text);
  }
  return out;
}

/** The run's single fingerprint: a hash over the sorted per-skill fingerprints. */
export function combinedFingerprint(perSkill) {
  const lines = Object.keys(perSkill).sort().map((s) => `${s} ${perSkill[s] ?? 'missing'}`);
  return casesFingerprint(lines.join('\n'));
}

/**
 * Resolve the model a run measured. `model` is the resolved model ID the operator names
 * (e.g. claude-opus-5-5); the tier comes from the run output the workflow returned, with an
 * explicit tier as the fallback for output that predates the workflows recording it. Throws with
 * an operator-readable message on anything ambiguous, because a guessed model is worse than none.
 */
export function resolveRunModel({ model, tierSources }) {
  if (!model) throw new Error('--model <id> is required: the resolved model ID the run measured (e.g. claude-opus-5-5).');
  const tiers = [...new Set((tierSources || []).filter(Boolean))];
  if (tiers.length === 0) {
    throw new Error('no model tier: the run output carries no modelTier (it predates C2-1), so pass --model-tier <haiku|sonnet|opus|fable>.');
  }
  if (tiers.length > 1) {
    throw new Error(`the run's sources name different model tiers (${tiers.join(', ')}); finalize each run separately.`);
  }
  const [modelTier] = tiers;
  if (!MODEL_TIERS.includes(modelTier)) throw new Error(`unknown model tier "${modelTier}"; expected one of ${MODEL_TIERS.join(', ')}.`);
  if (!String(model).toLowerCase().includes(modelTier)) {
    throw new Error(`--model "${model}" does not name the tier the run used ("${modelTier}"); check which model actually ran.`);
  }
  return { model, modelTier };
}

/** The provenance a scorecard records for a run, given the slugs it scored. */
export function runProvenance({ model, modelTier, readCases }, slugs) {
  const skillCasesSha = skillCasesFingerprints(slugs, readCases);
  return { model, modelTier, casesSha: combinedFingerprint(skillCasesSha), skillCasesSha };
}

/** Insert the one-line provenance header directly under a scorecard's H1 title. */
export function withRunLine(md, date, prov) {
  const n = Object.keys(prov.skillCasesSha || {}).length;
  const whose = n === 1 ? "1 skill's" : `${n} skills'`;
  const line = `Run: ${date} | model: \`${prov.model}\` (tier \`${prov.modelTier}\`) | cases: \`${prov.casesSha}\` (fingerprint of ${whose} eval/cases.md)`;
  const i = md.indexOf('\n\n');
  return i === -1 ? `${md}\n\n${line}\n` : `${md.slice(0, i)}\n\n${line}${md.slice(i)}`;
}
