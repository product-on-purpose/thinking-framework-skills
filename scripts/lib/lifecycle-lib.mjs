// =============================================================================
// lifecycle-lib.mjs - the lifecycle-metadata truth rules (SPEC-01), as a pure lib.
//
// what-it-is:   the rules that decide whether a skill's skill.meta.yml tells the truth
//               about that skill's lifecycle and measurement state.
// what-it-does: given one sidecar's text, returns a list of problem strings (empty = clean).
// why:          this library's brand is honest, machine-readable metadata. A shipped skill
//               whose sidecar says "draft" is the library making a false statement about
//               itself, and that is the one defect class it cannot afford. Keeping the rules
//               in a pure lib means the guard can be unit-tested without a real tree, which
//               is what check-registry.mjs cannot do for its other sections.
// used-by:      scripts/check-registry.mjs (gate layer 3, section 9); tests/lifecycle-lib.test.mjs
//
// The two fields mean different things, and conflating them is what went wrong:
//   identity.status   = the SKILL's lifecycle. Shipped implies active.
//                       The draft-ness of the sidecar SCHEMA is a schema property; it lives
//                       in a comment, not in this field.
//   identity.maturity = the MEASUREMENT state. Both eval stamps at measured-* implies
//                       "measured". A shipped-but-unmeasured skill honestly stays "alpha",
//                       which is how the four meta-skills correctly describe themselves today.
// =============================================================================

/** Lifecycle values a skill that ships on disk may legitimately carry. */
export const SHIPPED_STATUSES = new Set(['active', 'deprecated', 'archived']);

/** Values that mean "this is not shipped yet" and are therefore false for a shipped skill. */
export const PRE_SHIP_STATUSES = new Set(['draft', 'experimental']);

const firstMatch = (text, re) => {
  const m = text.match(re);
  return m ? m[1] : undefined;
};

/**
 * Read the lifecycle-relevant fields out of a sidecar without a YAML parser.
 *
 * The `^[ \t]+status:` anchor cannot match `trigger_eval_status:` or `output_eval_status:`,
 * because after the leading whitespace those lines begin with `trigger_`/`output_`. That is
 * the same anchoring property scripts/eval/stamp-meta.mjs relies on.
 */
export function readLifecycle(sidecarText) {
  const text = String(sidecarText ?? '');
  return {
    status: firstMatch(text, /^[ \t]+status:[ \t]*(\S+)/m),
    maturity: firstMatch(text, /^[ \t]+maturity:[ \t]*(\S+)/m),
    triggerEval: firstMatch(text, /^[ \t]+trigger_eval_status:[ \t]*(\S+)/m),
    outputEval: firstMatch(text, /^[ \t]+output_eval_status:[ \t]*(\S+)/m),
  };
}

const isMeasured = (stamp) => typeof stamp === 'string' && stamp.startsWith('measured-');

/**
 * Check one shipped skill's sidecar for lifecycle-metadata truth.
 *
 * @param {string} dir         the skill directory name, e.g. "think-premortem" (for messages)
 * @param {string} sidecarText the raw contents of skills/<dir>/skill.meta.yml
 * @returns {string[]} problems, each already prefixed "lifecycle: "
 */
export function checkLifecycle(dir, sidecarText) {
  const problems = [];
  const where = `skills/${dir}/skill.meta.yml`;
  const { status, maturity, triggerEval, outputEval } = readLifecycle(sidecarText);

  if (status === undefined) {
    problems.push(`lifecycle: ${where} has no identity.status.`);
  } else if (!SHIPPED_STATUSES.has(status)) {
    const hint = PRE_SHIP_STATUSES.has(status)
      ? ' The skill ships, so it is not a draft; the sidecar SCHEMA being provisional belongs in a comment, not here.'
      : '';
    problems.push(
      `lifecycle: ${where} identity.status is "${status}" but the skill ships. ` +
      `Set status: active (or deprecated/archived).${hint}`,
    );
  }

  if (maturity === undefined) {
    problems.push(`lifecycle: ${where} has no identity.maturity.`);
  } else if (isMeasured(triggerEval) && isMeasured(outputEval) && maturity !== 'measured') {
    problems.push(
      `lifecycle: ${where} identity.maturity is "${maturity}" but both eval stamps are measured ` +
      `(trigger ${triggerEval}, output ${outputEval}). Set maturity: measured.`,
    );
  }

  return problems;
}
