import assert from 'node:assert/strict';
import fs from 'node:fs';
import { transformSync } from 'esbuild';
import { normalizeCellDetails, findCellDetails } from './src/cell-details.js';
import { displaySubject, normalizeSubjectAliases } from './src/subject-aliases.js';
import { collectEntries, applyDatedEntries } from './src/dated-entries.js';

const code = fs.readFileSync('src/stundenplan-card.ts', 'utf8');
const start = code.indexOf('  parseCellTriplet(');
const end = code.indexOf('  renderCardLayout(', start);
const js = transformSync('const methods = {' + code.slice(start, end)
  .replace(/\n  renderCell\(/, ',\n  renderCell(') + '};', { loader: 'ts' }).code;
const d = (parts, ...values) => parts.reduce((out, part, i) =>
  out + part + (Array.isArray(values[i]) ? values[i].join('') : values[i] ?? ''), '');
const methods = Function('d', 'yt', 'subjectColorStyle', 'findCellDetails', 'mergedCellTextKey', 'displaySubject',
  js + 'return methods;')(d, x => !x.trim(), () => '', findCellDetails, x => x.trim(), displaySubject);
methods.filterCellText = x => x;
const detail = (subject, rooms, teachers, notes = []) => ({
  text: [subject, ...rooms, ...teachers, ...notes].join('\n'), subject, rooms, teachers, notes,
});
const render = (item, changes = []) => methods.renderCell(item.text, {}, false, '', changes, [item]);
const plain = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
for (const room of ['R11a', 'Werk', 'EDV2', 'K6', 'C OG 3 - 3c']) {
  const item = detail('Ku', [room], ['Gu']);
  assert.equal(plain(render(item)), `Ku Gu ${room}`);
  assert.ok(render(item).includes(`<div class="raum">${room}</div>`));
}
for (const [rooms, teachers] of [[[], ['Gu']], [['Werk'], []], [[], []], [['Werk', 'R11a'], ['Gu', 'Br']]]) {
  const item = detail('Ku', rooms, teachers, ['Material mitbringen']);
  assert.equal(plain(render(item)), ['Ku', ...teachers, ...rooms, 'Material mitbringen'].join(' '));
}
const a = detail('Ku', ['Werk'], ['Gu']);
const b = detail('Ev', ['R11a'], ['SB']);
assert.equal(plain(methods.renderCell(`${a.text}\n\n${b.text}`, {}, false, '', [], [a, b])), 'Ku Gu Werk Ev SB R11a');
// Hidden courses must not return via metadata.
assert.equal(plain(methods.renderCell(b.text, {}, false, '', [], [a, b])), 'Ev SB R11a');
const changed = { ...b, original: a };
assert.equal(plain(render(changed, [{current:b.text, original:a.text}])), 'Bisher Ku Gu Werk Jetzt Ev SB R11a');
assert.equal(findCellDetails(a.text, [a, a]), null);
assert.equal(findCellDetails('Wrong\nText', [a]), null);
assert.deepEqual(normalizeCellDetails({Mo:[a, null, {text:1}], Bad:[a]}), {Mo:[a]});
assert.deepEqual(normalizeCellDetails({Mo:[{...a, teachers:'Gu'}]}), {Mo:[]});
const normalized = normalizeCellDetails({Mo:[changed]});
normalized.Mo[0].rooms.push('other');
assert.deepEqual(b.rooms, ['R11a']);
assert.deepEqual(normalized.Mo[0].original, a);
assert.equal(plain(methods.renderCell('D\nK6\nRe', {})), 'D Re K6');
const datedStart = code.indexOf('  getDatedCellDetails(');
const datedEnd = code.indexOf('\n  }', datedStart) + 4;
const dated = Function('applyDatedEntries', 'return ({' + code.slice(datedStart, datedEnd) + '}).getDatedCellDetails;')(applyDatedEntries);
const rules = collectEntries({dated_entries:[{subject:'Ku', action:'replace', text:'Sport', dates:['2026-11-02']}]}).entries;
const renamed = dated({days:['Mo']}, {time:'1.',cell_details:{Mo:[a]}}, 0, new Date(2026,10,2,12), rules)[0];
assert.equal(plain(render(renamed)), 'Sport Gu Werk');
assert.equal(a.subject, 'Ku');
const aliases = normalizeSubjectAliases([{subject:' BSS ',name:'Sport'}, {subject:'B',name:''}]);
const config = {subject_aliases:aliases};
const sport = detail('BSS', ['BSS'], ['BSS'], ['BSS']);
assert.equal(plain(methods.renderCell(sport.text, config, false, '', [], [sport])), 'Sport BSS BSS BSS');
for (const [original, display] of [['BSS','Sport'], ['bss','Sport'], ['BSS2','BSS2'],
  ['Entfällt: BSS','Entfällt: Sport'], ['BSS (geändert)','Sport (geändert)'], ['BSS ⚠','Sport ⚠']])
  assert.equal(plain(methods.renderCell(original, config)), display);
assert.equal(plain(methods.renderCell('BSS\n\nBSC',config)), 'Sport BSC');
console.log('Structured cell details: named rooms, multiple/missing roles, parallel courses, changes, validation and legacy fallback passed.');
