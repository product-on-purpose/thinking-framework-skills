import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";

// Proves the SP1 static eval-case validator (scripts/eval-cases.mjs): it passes the real repo
// (every skills/*/eval/cases.md is well-formed and name-safe), fails a fixture whose cases.md is
// missing a required section, and fails a fixture whose cases.md names a framework that does not
// exist (the mechanized "never invent a framework name" check). The validator is spawned as a
// subprocess and pointed at a throwaway skills tree via its optional root argument.

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCRIPT = path.join(REPO_ROOT, "scripts/eval-cases.mjs");

const GOOD_CASES = `# Eval cases: SKILL

## Should trigger

- "Prompt one."
- "Prompt two."
- "Prompt three."

## Should NOT trigger (wrong tool / near-miss)

- "Near miss one." (trivial)
- "Near miss two." (after the fact)
- "Near miss three." (unrelated)

## Output checks (a good output must)

- [ ] Emit the artifact.

## Value vs unaided baseline

Prose.
`;

const SKILL_MD = `---
name: NAME
---
# Skill

## When NOT to Use

- **Trivial cases.** Skip it.
`;

// spec: { skillName: { cases?: string, skill?: string } }
function makeRoot(spec) {
  const dir = mkdtempSync(path.join(os.tmpdir(), "tfs-evalcases-"));
  for (const [name, cfg] of Object.entries(spec)) {
    const skillDir = path.join(dir, "skills", name);
    mkdirSync(path.join(skillDir, "eval"), { recursive: true });
    writeFileSync(path.join(skillDir, "SKILL.md"), (cfg.skill ?? SKILL_MD).replace("NAME", name), "utf8");
    if (cfg.cases !== null) {
      writeFileSync(path.join(skillDir, "eval", "cases.md"), cfg.cases ?? GOOD_CASES, "utf8");
    }
  }
  return dir;
}

function run(root) {
  return spawnSync(process.execPath, [SCRIPT, root], { encoding: "utf8" });
}

test("PASS on a well-formed fixture skill tree", () => {
  const root = makeRoot({ "think-real": {} });
  try {
    const r = run(root);
    assert.equal(r.status, 0, `expected 0, got ${r.status}\n${r.stdout}\n${r.stderr}`);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("FAIL when a cases.md is missing a required section", () => {
  const bad = GOOD_CASES.replace("## Should NOT trigger (wrong tool / near-miss)", "## Irrelevant");
  const root = makeRoot({ "think-real": { cases: bad } });
  try {
    const r = run(root);
    assert.equal(r.status, 1, `expected 1, got ${r.status}`);
    assert.match(r.stderr + r.stdout, /should not trigger/i);
    assert.match(r.stderr + r.stdout, /think-real/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("FAIL when a cases.md names a framework that does not exist", () => {
  const bad = GOOD_CASES.replace('- "Near miss one." (trivial)', '- "Near miss one." (route to think-ghost instead)');
  const root = makeRoot({ "think-real": { cases: bad } });
  try {
    const r = run(root);
    assert.equal(r.status, 1, `expected 1, got ${r.status}`);
    assert.match(r.stderr + r.stdout, /unknown framework|think-ghost/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("PASS on the real repository (all eval/cases.md well-formed and name-safe)", () => {
  const r = run(REPO_ROOT);
  assert.equal(r.status, 0, `expected 0, got ${r.status}\n${r.stdout}\n${r.stderr}`);
});
