import assert from 'node:assert/strict';
import fs from 'node:fs';

for (const [name, size] of [['icon.png', 256], ['icon@2x.png', 512], ['icon-editor.png', 64]]) {
  const png = fs.readFileSync(`src/assets/${name}`);
  assert.equal(png.subarray(1, 4).toString(), 'PNG');
  assert.equal(png.readUInt32BE(16), size);
  assert.equal(png.readUInt32BE(20), size);
  assert.equal(png[25], 6, 'RGBA PNG keeps transparent corners');
}
const source = fs.readFileSync('src/stundenplan-card.ts', 'utf8');
assert.ok(source.includes('import cardBrandIcon from "./assets/icon-editor.png?inline"'));
assert.ok(source.includes('<img src=${cardBrandIcon} alt="" width="32" height="32">'));
const build = fs.readFileSync('dist/stundenplan-card.js', 'utf8');
assert.ok(build.includes('data:image/png;base64,'), 'Icon stays inside the distributable JS');
assert.ok(!build.includes('/local/brand'), 'No instance-specific asset URL');
console.log('Brand icons: transparent sizes, editor markup and self-contained bundle passed.');
