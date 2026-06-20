import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lintMermaidBlocks } from '../scripts/lib/mermaid-lint.mjs';

test('valid graph block passes', () => {
  assert.deepEqual(lintMermaidBlocks('```mermaid\ngraph LR\n  A-->B\n```'), []);
});
test('init-directive then graph passes (directive line skipped)', () => {
  const md = '```mermaid\n%%{init: {"theme":"base"}}%%\ngraph TD\n  A-->B\n```';
  assert.deepEqual(lintMermaidBlocks(md), []);
});
test('timeline and sequenceDiagram pass', () => {
  assert.deepEqual(lintMermaidBlocks('```mermaid\ntimeline\n  title X\n```'), []);
  assert.deepEqual(lintMermaidBlocks('```mermaid\nsequenceDiagram\n  A->>B: hi\n```'), []);
});
test('unrecognized type is flagged', () => {
  const f = lintMermaidBlocks('```mermaid\ngrph LR\n  A-->B\n```');
  assert.equal(f.length, 1);
  assert.match(f[0].message, /unrecognized mermaid diagram type "grph"/);
});
test('empty block is flagged', () => {
  const f = lintMermaidBlocks('```mermaid\n\n```');
  assert.equal(f.length, 1);
  assert.match(f[0].message, /empty/);
});
test('unclosed fence is flagged', () => {
  const f = lintMermaidBlocks('```mermaid\ngraph LR\n  A-->B\n');
  assert.equal(f.length, 1);
  assert.match(f[0].message, /unclosed/);
});
test('non-mermaid fenced code is ignored', () => {
  assert.deepEqual(lintMermaidBlocks('```js\nconst x = 1;\n```'), []);
});
