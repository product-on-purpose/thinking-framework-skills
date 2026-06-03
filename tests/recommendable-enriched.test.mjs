import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Regression guard for the SP1 advisor corpus enrichment: the generated recommendable.json must
// carry the negative-routing-signal fields (anti_triggers / not_use / overlaps) for every
// recommendable skill, derived from each skill's eval/cases.md (Should NOT trigger) and SKILL.md
// (When NOT to Use). Complements the drift --check (which proves the committed file matches the
// generator). Reads the committed corpus the advisor actually consumes.

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CORPUS = path.join(REPO_ROOT, "skills/think-framework-advisor/references/recommendable.json");

const data = JSON.parse(readFileSync(CORPUS, "utf8"));

test("every recommendable skill carries the enrichment fields", () => {
  assert.ok(data.skills.length >= 34, `expected >= 34 skills, got ${data.skills.length}`);
  for (const s of data.skills) {
    assert.ok(Array.isArray(s.anti_triggers) && s.anti_triggers.length >= 1, `${s.name}: anti_triggers`);
    assert.ok(Array.isArray(s.not_use) && s.not_use.length >= 1, `${s.name}: not_use`);
    assert.ok(Array.isArray(s.overlaps), `${s.name}: overlaps must be an array`);
  }
});

test("think-premortem enrichment reflects its authored negative signal", () => {
  const p = data.skills.find((s) => s.name === "think-premortem");
  assert.ok(p, "think-premortem present in corpus");
  assert.ok(p.anti_triggers.some((t) => /postmortem/i.test(t)), "anti_triggers mention postmortem");
  assert.ok(p.not_use.some((t) => /postmortem/i.test(t)), "not_use mentions postmortem");
});
