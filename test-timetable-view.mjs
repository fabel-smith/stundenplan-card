import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TimetableView, weekendOffset, weekKey, rowKey } from './src/timetable-view.js';
import { dateKey } from './src/dated-entries.js';

const saturday = new Date(2026, 9, 31, 12);
const sunday = new Date(2026, 10, 1, 12);
assert.equal(weekendOffset('saturday', saturday), 1);
assert.equal(weekendOffset('sunday', saturday), 0);
assert.equal(weekendOffset('sunday', sunday), 1);
assert.equal(weekendOffset('off', sunday), 0);
assert.equal(weekendOffset('saturday', new Date(2026, 10, 2)), 0);
assert.equal(weekKey(new Date(2027, 0, 1, 12)), '2026-12-28');
assert.equal(weekKey(new Date(2026, 9, 25, 12)), '2026-10-19');
const dates = [new Date(2026, 10, 2, 12)];
const response = { weeks: { '2026-11-02': [{ time: '1.', Mo: 'Math' }] },
  loaded_days: ['2026-11-02'], requested_days: ['2026-11-02'] };
const state = { state: 'ok', last_updated: '1' };
const calls = [];
const hass = { states: { 'sensor.week': state }, callWS: async args => {
  calls.push(args); return { response };
} };
let changes = 0;
const view = new TimetableView(() => changes++);
await view.update(hass, 'sensor.week', dates, saturday);
assert.equal(view.data, response);
assert.equal(calls[0].service, 'get_view');
assert.equal(calls[0].return_response, true);
await view.update(hass, 'sensor.week', dates, saturday);
assert.equal(calls.length, 1);
assert.ok(changes);

// A late response from a previous source/view must never restore old rows.
let resolve;
hass.callWS = () => new Promise(done => { resolve = done; });
state.last_updated = '2';
const pending = view.update(hass, 'sensor.week', dates, saturday);
assert.equal(view.data, null);
state.state = 'unavailable';
await view.update(hass, 'sensor.week', dates, saturday);
resolve({ response });
await pending;
assert.equal(view.data, null);
state.state = 'ok';
hass.callWS = async () => ({ response: { ...response, requested_days: ['2026-10-26'] } });
await view.update(hass, 'sensor.week', dates, saturday);
assert.equal(view.data, null);
assert.ok(view.error);

// Exercise the real date-to-row selection instead of a duplicate algorithm.
const source = readFileSync(new URL('./src/stundenplan-card.ts', import.meta.url), 'utf8');
function method(name) {
  const start = source.indexOf(`  ${name}(`);
  assert.ok(start >= 0, name);
  const end = source.indexOf('\n  }', start) + 4;
  return Function('weekKey', 'rowKey', 'dateKey', 'weekendOffset',
    `return ({${source.slice(start, end).trim()}}).${name}`)(weekKey, rowKey, dateKey, weekendOffset);
}
const row = { time: '1.', start: '08:00', end: '08:45', cells: ['Old'] };
const next = { ...row, cells: ['Next'] };
const card = { hasTimetableView: () => true,
  buildRowsFromArray: (_c, rows) => rows,
  _timetable: { data: { weeks: { '2026-11-02': [next] }, loaded_days: ['2026-11-02'] } } };
const select = method('getManualRowForDate');
assert.deepEqual(select.call(card, {}, row, 0, dates[0]), next);
assert.deepEqual(select.call(card, {}, row, 0, new Date(2026, 10, 9, 12)).cells, []);
assert.equal(row.cells[0], 'Old');
assert.equal(method('autoWeekend').call({getWeekOffsetValue: () => -1}, {weekend_switch: 'saturday'}), 0);
const requests = [];
const rollingCard = { config: { view_mode: 'rolling' }, isConnected: true,
  hasTimetableView: () => true, getWeekOffsetValue: () => 0,
  timetableEntity: () => 'sensor.week', getHolidayDates: () => dates,
  mondayOfWeek: date => new Date(`${weekKey(date)}T12:00:00`),
  _timetable: { update: (_h, _e, requested) => requests.push(requested.map(dateKey)) } };
method('syncTimetable').call(rollingCard);
rollingCard.getHolidayDates = () => [new Date(2026, 10, 9, 12)];
method('syncTimetable').call(rollingCard);
assert.deepEqual(requests[0], requests[1], 'Last-lesson rollover must not oscillate the fetch range');
assert.equal(requests[0].length, 21);
console.log('Timetable view: weekend, date isolation, missing data, response races and read-only requests passed.');
