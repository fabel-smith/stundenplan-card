import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const { validateEntry, collectEntries, applyDatedEntries, pendingNotes } =
  await import(pathToFileURL(process.argv[2]).href);
const external = JSON.parse(readFileSync(0, 'utf8'));
external.forEach(entry => assert.equal(validateEntry(entry), ''));
const entity = 'sensor.stundenplan_kalendertermine';
const local = { date: '2026-10-23', match: 'period', text: 'Local note', periods: ['1'] };
const config = { dated_entries_entity: entity, dated_entries_attribute: 'entries', dated_entries: [local] };
const collected = collectEntries(config, { states: { [entity]: { state: '1', attributes: { entries: external } } } });
assert.deepEqual(collected.warnings, []);
assert.equal(collected.entries.length, 2);
const date = new Date(2026, 9, 22, 12);
for (const subject of ['Mathe', 'Deutsch', '']) {
  const applied = applyDatedEntries(subject, { time: '3.' }, 0, date, collected.entries);
  assert.equal(applied.text, subject);
  assert.equal(applied.notes[0].text, 'Mathearbeit');
}
assert.equal(applyDatedEntries('M', { time: '4.' }, 0, date, collected.entries).notes.length, 1);
assert.equal(applyDatedEntries('M', { time: '2.' }, 0, date, collected.entries).notes.length, 0);
assert.equal(applyDatedEntries('M', { time: '3.', break: true }, 0, date, collected.entries).notes.length, 0);
assert.equal(applyDatedEntries('M', { time: '3.' }, 0, new Date(2026, 9, 23, 12), collected.entries).notes.length, 0);
assert.equal(pendingNotes(collected.entries, new Set(), '2026-10-15').length, 2);
const offline = collectEntries(config, { states: { [entity]: { state: 'unavailable' } } });
assert.equal(offline.entries.length, 1);
assert.equal(offline.entries[0].text, 'Local note');
assert.equal(offline.warnings.length, 1);
