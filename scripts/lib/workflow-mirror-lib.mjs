// =============================================================================
// workflow-mirror-lib.mjs - the workflows half of the components mirror, as a pure lib.
//
// what-it-is:   the rule that library.json's declared workflows and the _workflows/ directory
//               describe the same set, in both directions.
// what-it-does: given the declared names and the on-disk names, returns problem strings.
// why:          a workflow on disk but undeclared ships invisibly to installers; a declared
//               workflow with no file cannot be delivered. The toolkit enforces this too
//               (agent-skills-toolkit ADR 0047, S3), but its finding is CAPPED AT WARN until a
//               consumer pins Standard 0.15 - and this repo pins 0.8. So the toolkit's version
//               will not gate here for as long as the pin holds, which could be several releases.
//               This local copy gates today. Same argument that justifies check-counts guarding
//               README surfaces the toolkit does not read.
// used-by:      scripts/check-registry.mjs (gate layer 3, section 10);
//               tests/workflow-mirror-lib.test.mjs
//
// Keeping the exclusion rule here rather than at the call site matters: it has to agree with the
// toolkit's listWorkflowFiles, which excludes README.md and `_`-prefixed control files. A drift
// between the two would make this guard disagree with the one that eventually gates.
// =============================================================================

/**
 * Is this filename a workflow, or a control file that lives alongside them?
 *
 * Mirrors the toolkit's listWorkflowFiles exclusions exactly (ADR 0047 decision point 2): a
 * folder README is documentation, and `_`-prefixed files are control files. Note the toolkit
 * deliberately goes the OTHER way for agents/ (ADR 0046), because a runtime scans that directory
 * and hiding a file there creates a phantom. Nothing scans _workflows/, so excluding a README
 * here is a naming convention rather than a concealment. The two rules look contradictory and
 * are not; if you "harmonise" them you will reintroduce one of the two bugs.
 */
export function isWorkflowFile(filename) {
  const f = String(filename || '');
  if (!f.endsWith('.md')) return false;
  if (f === 'README.md') return false;
  if (f.startsWith('_')) return false;
  return true;
}

/** Strip the .md extension to get the workflow name (the basename IS the identity, not frontmatter). */
export const workflowName = (filename) => String(filename || '').replace(/\.md$/, '');

/**
 * Check the bidirectional mirror.
 *
 * @param {string[]} declared  names from library.json components.workflows
 * @param {string[]} onDisk    names from _workflows/ (already filtered by isWorkflowFile)
 * @returns {string[]} problems, each already prefixed "workflows: "
 */
export function checkWorkflowMirror(declared, onDisk) {
  const problems = [];
  const declaredSet = new Set(declared || []);
  const onDiskSet = new Set(onDisk || []);

  for (const name of declaredSet) {
    if (!onDiskSet.has(name)) {
      problems.push(
        `workflows: library.json components.workflows declares "${name}" but _workflows/${name}.md is not on disk ` +
        '- a declared workflow with no file cannot be delivered.',
      );
    }
  }
  for (const name of onDiskSet) {
    if (!declaredSet.has(name)) {
      problems.push(
        `workflows: _workflows/${name}.md is on disk but not declared in library.json components.workflows ` +
        '- an undeclared workflow ships invisibly to installers. Add it to components.workflows.',
      );
    }
  }
  return problems;
}

/**
 * Validate the shape of each declared entry. The toolkit requires a string `name`; this repo also
 * expects the sibling shape used by skills/subagents/commands, so a half-filled entry is caught
 * here rather than surfacing later as a confusing mirror mismatch.
 */
export function checkWorkflowEntryShape(entries) {
  const problems = [];
  for (const [i, e] of (entries || []).entries()) {
    const at = `workflows: components.workflows[${i}]`;
    if (!e || typeof e !== 'object') { problems.push(`${at} is not an object.`); continue; }
    if (typeof e.name !== 'string' || !e.name) { problems.push(`${at} is missing a string "name".`); continue; }
    if (typeof e.path !== 'string' || e.path !== `_workflows/${e.name}.md`) {
      problems.push(`${at} ("${e.name}") must have path "_workflows/${e.name}.md" (got ${JSON.stringify(e.path)}).`);
    }
    if (e.status !== 'active') problems.push(`${at} ("${e.name}") must have status "active" (got ${JSON.stringify(e.status)}).`);
  }
  return problems;
}
