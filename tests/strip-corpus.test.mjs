import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// The A/B control arms (scripts/eval/strip-corpus.mjs). The 2026-10-17 decision needs an arm that
// strips anti_triggers ALONE, so --fields must strip exactly the named subset and nothing else.

const SCRIPT = 'scripts/eval/strip-corpus.mjs';
const SOURCE = JSON.parse(readFileSync('skills/think-framework-advisor/references/recommendable.json', 'utf8'));

function run(args) {
  const dir = mkdtempSync(join(tmpdir(), 'strip-corpus-'));
  const out = join(dir, 'arm.json');
  const r = spawnSync('node', [SCRIPT, out, ...args], { encoding: 'utf8' });
  const arm = r.status === 0 ? JSON.parse(readFileSync(out, 'utf8')) : null;
  rmSync(dir, { recursive: true, force: true });
  return { status: r.status, arm, stderr: r.stderr };
}

test('the default arm strips all three enrichment fields', () => {
  const { status, arm } = run([]);
  assert.equal(status, 0);
  for (const e of arm.skills) {
    for (const f of ['anti_triggers', 'not_use', 'overlaps']) assert.ok(!(f in e), `${e.name} still has ${f}`);
  }
});

test('--fields anti_triggers strips anti_triggers alone and keeps every other field byte-identical', () => {
  const { status, arm } = run(['--fields', 'anti_triggers']);
  assert.equal(status, 0);
  assert.equal(arm.skills.length, SOURCE.skills.length);
  arm.skills.forEach((e, i) => {
    const src = SOURCE.skills[i];
    assert.ok(!('anti_triggers' in e), `${e.name} still has anti_triggers`);
    for (const k of Object.keys(src).filter((k) => k !== 'anti_triggers')) {
      assert.deepEqual(e[k], src[k], `${e.name}.${k} changed`);
    }
  });
  assert.match(arm.$note, /except that anti_triggers are removed/);
});

test('--fields refuses a field outside the experiment', () => {
  const { status, stderr } = run(['--fields', 'description']);
  assert.equal(status, 2);
  assert.match(stderr, /--fields must name one or more of/);
});
