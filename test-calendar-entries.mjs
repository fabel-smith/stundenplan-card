import assert from 'node:assert/strict';
import { calendarRange, calendarEntries, CalendarSource } from './src/calendar-entries.js';
import { collectEntries, applyDatedEntries } from './src/dated-entries.js';

const now = new Date(2026, 9, 15, 12), range = calendarRange(now);
const event = (summary = 'Mathearbeit [3,4]', date = '2026-10-15', end = '2026-10-16') =>
  ({ summary, start: { date }, end: { date: end } });
assert.equal(range.first, '2026-10-15');
assert.equal(range.last, '2026-12-14');
const parsed = calendarEntries([event(), event(' Mathearbeit [4, 3,3] '), event('Diktat [2]', '2026-10-22', '2026-10-23')], range);
assert.equal(parsed.entries.length, 2);
assert.deepEqual(parsed.entries[0].periods, ['3', '4']);
assert.equal(parsed.ignored, 0);
assert.equal(calendarEntries([null, {}, event('No period'), event('x [0]'), event('x [1.5]'),
  event('x [1]\nbad'), event('x [100]'), event('x [1]', '2026-02-30'), event('x [1]', '2026-10-15', '2026-10-17'),
  { summary: 'x [1]', start: { dateTime: '2026-10-15T09:00:00+02:00' }, end: { dateTime: '2026-10-15T10:00:00+02:00' } }
], range).ignored, 10);
assert.equal(calendarEntries([event('Old [1]', '2026-10-14', '2026-10-15'), event('Limit [1]', range.last, '2026-12-15')], range).entries.length, 0);
assert.equal(calendarEntries([event('DST [1]', '2026-10-25', '2026-10-26')], range).entries.length, 1);
assert.throws(() => calendarEntries({}, range));

let calls = [], resolveOld;
const hass = { states: { 'calendar.a': { state: 'off' }, 'calendar.b': { state: 'on' } },
  callApi: async (method, url) => { calls.push([method, url]); return [event()]; } };
const source = new CalendarSource(() => {});
await source.update(hass, 'calendar.a', now);
assert.equal(source.entries.length, 1);
assert.equal(calls[0][0], 'GET');
assert(calls[0][1].startsWith('calendars/calendar.a?'));
await source.update(hass, 'calendar.a', now);
assert.equal(calls.length, 1, 'Do not fetch for every hass update');
await source.update(hass, 'calendar.a', new Date(+now + 300000));
assert.equal(calls.length, 2);
await source.update(hass, '', now);
assert.equal(source.entries.length, 0, 'Clearing selection removes calendar notes');

const old = source.update({ ...hass, callApi: () => new Promise(resolve => { resolveOld = resolve; }) }, 'calendar.a', now);
await source.update(hass, 'calendar.b', now);
resolveOld([event('Stale [1]')]); await old;
assert.equal(source.entries[0].text, 'Mathearbeit', 'Late response cannot overwrite new selection');
await source.update({ ...hass, connected: false }, 'calendar.b', now);
assert.equal(source.entries.length, 0);
assert.equal(source.warnings.length, 1);
await source.update(hass, 'calendar.b', now);
assert.equal(source.entries.length, 1, 'Reconnect refreshes immediately');
await source.update({ ...hass, states: {} }, 'calendar.missing', now);
await source.update({ ...hass, states: {} }, 'calendar.other', now);
assert.equal(source.warnings.length, 1, 'Changing between unavailable calendars retains warning');
let failures = 0;
const failing = { ...hass, callApi: async () => { failures++; throw new Error('offline'); } };
await source.update(failing, 'calendar.a', now);
await source.update(failing, 'calendar.a', now);
assert.equal(failures, 1);
assert.equal(source.entries.length, 0);
await source.update(hass, 'calendar.a', new Date(+now + 60000));
assert.equal(source.entries.length, 1, 'Retry recovers');
const pending = source.update({ ...hass, callApi: () => new Promise(resolve => { resolveOld = resolve; }) }, 'calendar.b', now);
source.reset(); resolveOld([event()]); await pending;
assert.equal(source.entries.length, 0, 'Disconnected cards ignore pending responses');

const local = { date: '2026-10-15', match: 'period', periods: [3], text: 'Local' };
const entries = collectEntries({ dated_entries: [local, ...parsed.entries] }).entries;
assert.deepEqual(applyDatedEntries('Deutsch', { time: '3.' }, 0, now, entries).notes.map(n => n.text), ['Local', 'Mathearbeit']);
assert.equal(applyDatedEntries('Deutsch', { time: '2.' }, 0, now, entries).notes.length, 0);
console.log('Calendar parser, requests, retries, lifecycle, and note mapping passed.');
