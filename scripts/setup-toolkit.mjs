#!/usr/bin/env node
// =============================================================================
// setup-toolkit.mjs - one command to make `npm run check` work on a fresh clone.
//
// what-it-is:   the first-run setup step: it puts the conformance validators on disk at exactly
//               the commit CI grades against.
// what-it-does: reads the pinned toolkit ref out of .github/workflows/ci.yml, clones (or fetches
//               an existing) .agent-skills-toolkit at that SHA, runs `npm ci` inside it, and
//               prints the path, the SHA and the next command.
// why:          `check.mjs` runs the Standard's validators rather than holding a copy, so the gate
//               does not work on a fresh clone until a second repo is present at the right commit.
//               That was a documented two-clone ritual a contributor had to find in prose, and
//               getting it subtly wrong - grading against a sibling checkout ahead of the pin -
//               reports whole check families CI does not, which reads as "this repo is broken".
//               The pin is never re-typed here: it is parsed from ci.yml, so setup cannot drift.
// used-by:      npm run setup; docs/contributing.md; docs/conformance.md; the not-found hint in
//               scripts/check.mjs
//
// Node built-ins only, to keep the repo's property that every script in scripts/ runs on a bare
// Node install with no `npm install` first - which matters most for the script whose entire job
// is to run BEFORE anything is installed.
//
// Refuses rather than clobbers: if .agent-skills-toolkit exists but is not a checkout of the
// expected remote, it stops and says so. Deleting or rewriting an unknown directory inside
// someone's repo is not a setup step's decision to make.
// =============================================================================

import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parsePinnedRef, CI_FILE, TOOLKIT_REPO } from './lib/toolkit-pin-lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const DEST = resolve(ROOT, '.agent-skills-toolkit');
const REMOTE = `https://github.com/${TOOLKIT_REPO}.git`;

function run(cmd, argv, opts = {}) {
  const r = spawnSync(cmd, argv, { stdio: 'inherit', encoding: 'utf8', ...opts });
  if (r.error) fail(`could not run \`${cmd}\`: ${r.error.message}`);
  if (r.status !== 0) fail(`\`${cmd} ${argv.join(' ')}\` exited ${r.status}.`);
  return r;
}

function capture(cmd, argv, opts = {}) {
  const r = spawnSync(cmd, argv, { encoding: 'utf8', ...opts });
  return r.status === 0 ? String(r.stdout).trim() : null;
}

function fail(msg) {
  console.error(`setup-toolkit: ${msg}`);
  process.exit(1);
}

// --- 1. the pin, from the one file that decides it -----------------------------------

const ciPath = resolve(ROOT, CI_FILE);
if (!existsSync(ciPath)) fail(`${CI_FILE} not found. Run this from the repo root.`);

let pin;
try {
  pin = parsePinnedRef(readFileSync(ciPath, 'utf8'));
} catch (err) {
  fail(err.message);
}
console.log(`Pinned validator ref (from ${CI_FILE}): ${pin.ref}`);

// --- 2. clone, or fetch what is already there ----------------------------------------

if (existsSync(DEST)) {
  // Never clobber a directory we did not create. The only safe existing state is a checkout of
  // the expected remote; anything else is someone else's directory that happens to share a name.
  if (!existsSync(resolve(DEST, '.git'))) {
    fail(`${DEST} exists but is not a git checkout. Move or remove it, then re-run.`);
  }
  const origin = capture('git', ['-C', DEST, 'remote', 'get-url', 'origin']);
  if (!origin || !origin.replace(/\.git$/, '').endsWith(TOOLKIT_REPO)) {
    fail(
      `${DEST} is a git checkout of "${origin || 'an unknown remote'}", not ${TOOLKIT_REPO}.\n` +
      '  Refusing to touch it. Move or remove that directory, then re-run.',
    );
  }
  console.log(`Found an existing toolkit checkout at ${DEST}; fetching the pinned ref.`);
  run('git', ['-C', DEST, 'fetch', '--quiet', 'origin', pin.ref]);
  run('git', ['-C', DEST, 'checkout', '--quiet', pin.ref]);
} else {
  console.log(`Cloning ${TOOLKIT_REPO} into ${DEST} (gitignored).`);
  run('git', ['clone', '--quiet', REMOTE, DEST]);
  run('git', ['-C', DEST, 'checkout', '--quiet', pin.ref]);
}

// Verify rather than assume: a fetch/checkout pair can succeed and still leave HEAD elsewhere if
// the ref resolved to something unexpected.
const head = capture('git', ['-C', DEST, 'rev-parse', 'HEAD']);
if (head !== pin.ref) {
  fail(`checked out HEAD is ${head || 'unknown'}, but ${CI_FILE} pins ${pin.ref}.`);
}

// --- 3. the validators need their own dependencies -----------------------------------

if (!existsSync(resolve(DEST, 'package-lock.json'))) {
  fail(`${DEST} has no package-lock.json at ${pin.ref}; cannot install reproducibly.`);
}
console.log('Installing the toolkit\'s dependencies (npm ci)...');
run('npm', ['ci', '--silent'], { cwd: DEST, shell: process.platform === 'win32' });

// --- 4. say what happened and what is next -------------------------------------------

console.log('');
console.log('Toolkit ready.');
console.log(`  path : ${DEST}`);
console.log(`  ref  : ${pin.ref}  (the ref CI grades against, from ${CI_FILE})`);
console.log('');
console.log('Next: npm run check');
