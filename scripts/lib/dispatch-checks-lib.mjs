// =============================================================================
// dispatch-checks-lib.mjs - splicing machine-decided and model-judged checks into one list.
//
// what-it-is:   the pure ordering rule for the dispatch output eval: given a skill's full
//               checklist, the grades a model returned for the subset it was allowed to judge,
//               and a verdict for each check a validator settled, produce ONE per-check list in
//               the checklist's own order with every entry labelled by who decided it.
// what-it-does: walks the authoritative checklist once, taking each grade from the correct source,
//               and refuses loudly on any mismatch - a leftover grade, a missing grade, or a run
//               with nothing deterministic to resolve. It never pads, never reorders, never
//               silently drops.
// why:          the dispatch eval splits one checklist across two deciders, which creates a
//               failure mode the generic harness does not have: an off-by-one while re-merging
//               attributes a grade to the WRONG check, and the scorecard still reads as a clean
//               total. That corruption is invisible downstream - `passed/total` looks right and
//               only the per-check reasons are wrong, which is precisely the kind of defect this
//               repo's committed scorecards are supposed to be trustworthy against. So the merge
//               is a pure function with the mismatch cases tested first.
// used-by:      scripts/eval/resolve-dispatch-checks.mjs; tests/dispatch-checks-lib.test.mjs
//
// The caller owns the definition of "deterministic": it passes a predicate. This lib does not know
// or care that today's predicate matches the string `check-proposed-entry`.
// =============================================================================

/**
 * Merge model grades and validator verdicts into the checklist's own order.
 *
 * @param allChecks    the authoritative checklist, in order (from eval/cases.md via extract-output)
 * @param modelGrades  grades for the non-deterministic checks, IN THE SAME RELATIVE ORDER
 * @param isDeterministic  predicate: does this check text belong to the validator?
 * @param resolveDeterministic  (checkText) => {pass, reason}
 * @returns { perCheck, passed, total, decidedByValidator, decidedByJudge }
 * @throws on any count or ordering mismatch - never returns a partially-merged list.
 */
export function spliceChecks(allChecks, modelGrades, isDeterministic, resolveDeterministic) {
  if (!Array.isArray(allChecks) || !allChecks.length) {
    throw new Error('spliceChecks: allChecks must be a non-empty array (the checklist is authoritative; there is nothing to grade without it).');
  }
  if (!Array.isArray(modelGrades)) {
    throw new Error('spliceChecks: modelGrades must be an array.');
  }

  const expectedModel = allChecks.filter((c) => !isDeterministic(c)).length;
  if (modelGrades.length !== expectedModel) {
    throw new Error(
      `spliceChecks: the checklist has ${expectedModel} model-judged check(s) but ${modelGrades.length} grade(s) were supplied. ` +
      'Refusing to merge: a count mismatch means at least one grade would land on the wrong check.',
    );
  }

  const queue = [...modelGrades];
  const perCheck = [];
  let decidedByValidator = 0;

  for (const check of allChecks) {
    if (isDeterministic(check)) {
      const v = resolveDeterministic(check);
      if (!v || typeof v.pass !== 'boolean') {
        throw new Error(`spliceChecks: resolveDeterministic must return {pass:boolean, reason}; got ${JSON.stringify(v)} for a deterministic check.`);
      }
      perCheck.push({ check, pass: v.pass, reason: String(v.reason == null ? '' : v.reason), decidedBy: 'validator' });
      decidedByValidator++;
      continue;
    }
    const g = queue.shift();
    if (!g || typeof g.pass !== 'boolean') {
      throw new Error(`spliceChecks: a model grade is missing or malformed for check "${String(check).slice(0, 60)}...".`);
    }
    perCheck.push({ check, pass: g.pass, reason: String(g.reason == null ? '' : g.reason), decidedBy: 'judge' });
  }

  if (queue.length) {
    // Unreachable given the count guard above, kept as a belt-and-braces assertion because the
    // cost of being wrong here is a silently mis-attributed scorecard.
    throw new Error(`spliceChecks: ${queue.length} model grade(s) left over after walking the checklist.`);
  }
  if (!decidedByValidator) {
    throw new Error(
      'spliceChecks: no check matched the deterministic predicate, so nothing was machine-decided. ' +
      'A dispatch scorecard that claims a validator pass must actually have run one; fix the predicate or use the generic harness.',
    );
  }

  return {
    perCheck,
    passed: perCheck.filter((c) => c.pass).length,
    total: perCheck.length,
    decidedByValidator,
    decidedByJudge: perCheck.length - decidedByValidator,
  };
}
