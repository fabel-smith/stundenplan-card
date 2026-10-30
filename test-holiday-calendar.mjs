import assert from 'node:assert/strict';
import { holidayEntries, holidayRange, holidaysOnDate, holidayPeriod, HolidaySource } from './src/holiday-calendar.js';

const day = value => new Date(`${value}T12:00:00`);
const event = (summary = 'Herbstferien', start = '2026-10-26', end = '2026-11-01') =>
  ({ summary, start: { date: start }, end: { date: end } });
const range = holidayRange([day('2026-10-30'), day('2026-10-26')]);
assert.equal(range.first, '2026-10-26');
assert.equal(range.last, '2026-10-31');
const parsed = holidayEntries([event(), event(' herbstferien '), event('Elternabend'), event('Ferienbetreuung'),
  event('Ferien beginnen bald'), event('Keine Herbstferien'), event('Allerheiligen'), null], range);
assert.equal(parsed.entries.length, 1);
assert.equal(parsed.ignored, 0, 'Ordinary school events are expected, not errors');
assert.equal(holidaysOnDate(parsed.entries, day('2026-10-31')).length, 1);
assert.equal(holidaysOnDate(parsed.entries, day('2026-11-01')).length, 0, 'All-day end is exclusive');
assert.equal(holidaysOnDate(parsed.entries, day('2026-10-25')).length, 0);
assert.equal(holidaysOnDate(parsed.entries, null).length, 0);
assert.equal(holidayPeriod(parsed.entries[0]), '26.10.2026 – 31.10.2026');
assert.equal(holidayPeriod({start:'2026-10-25',end:'2026-10-26'}), '25.10.2026');
assert.equal(holidayPeriod({start:'2026-03-28',end:'2026-03-30'}), '28.03.2026 – 29.03.2026');
assert.equal(holidayPeriod({start:'2026-12-24',end:'2027-01-07'}), '24.12.2026 – 06.01.2027');
assert.equal(holidayEntries([event()], holidayRange([day('2026-10-28')])).entries.length, 1, 'Ongoing holidays overlap query');
assert.equal(holidayEntries([event()], holidayRange([day('2026-11-01')])).entries.length, 0);
assert.equal(holidayEntries([event()], holidayRange([day('2026-10-25')])).entries.length, 0);
assert.equal(holidayEntries([event('Beweglicher Ferientag','2026-10-26','2026-10-27')], range).entries.length, 1);
assert.equal(holidayEntries([event('Herbstferien BW')], range).entries.length, 0);
assert.equal(holidayEntries([event('Herbstferien BW')], range, 'Herbstferien BW').entries.length, 1);
assert.equal(holidayEntries([event('Herbstferien','2026-02-30'), event('Herbstferien','2026-10-26','2026-10-26'),
  event('Herbstferien','2026-10-26','2026-10-25'),
  {summary:'Herbstferien',start:{dateTime:'2026-10-26T10:00:00'},end:{dateTime:'2026-10-26T11:00:00'}}], range).ignored, 4);
assert.throws(() => holidayEntries({}, range));
for (const date of ['2026-10-25','2026-03-29']) {
  const value = holidayRange([day(date)]);
  assert.equal(new Date(value.start).getHours(), 0);
  assert.equal(new Date(value.end).getHours(), 0);
  assert.equal(value.first, date);
}

let calls = [], resolveOld;
const now = day('2026-10-25'), dates = [day('2026-10-26'),day('2026-10-30')];
const hass = {states:{'calendar.school':{state:'off'},'calendar.other':{state:'on'}},callApi:async(method,url)=>{
  calls.push([method,url]); return [event(),event('Elternabend')];
}};
const source = new HolidaySource(() => {});
await source.update(hass, '', dates, [], now);
assert.equal(calls.length, 0, 'Disabled by default, no requests');
await source.update(hass, 'calendar.school', dates, [], now);
assert.equal(source.entries.length, 1);
assert.equal(source.warnings.length, 0);
assert.equal(calls[0][0], 'GET');
assert.equal(new URL(calls[0][1], 'http://test').searchParams.get('start'), range.start);
await source.update(hass, 'calendar.school', dates, [], now);
assert.equal(calls.length, 1);
await source.update(hass, 'calendar.school', dates, [], new Date(+now+300000));
assert.equal(calls.length, 2);
await source.update(hass, 'calendar.school', [day('2026-11-02')], [], now);
assert.equal(source.entries.length, 0, 'Week navigation clears old holidays');
assert.equal(calls.length, 3);
await source.update(hass, 'calendar.school', dates, ['Elternabend'], now);
assert.equal(source.entries.length, 2, 'Explicit custom titles refresh the request');
await source.update(hass, 'calendar.school', dates, [], now);
assert.equal(source.entries.length, 1, 'Removing a custom title removes its marking');
const pending = source.update({...hass,callApi:()=>new Promise(resolve=>{resolveOld=resolve;})}, 'calendar.other', dates, [], now);
await source.update(hass, 'calendar.school', dates, [], now);
resolveOld([event('Sommerferien')]); await pending;
assert.equal(source.entries[0].title, 'Herbstferien', 'Late requests cannot overwrite selection');
await source.update({...hass,connected:false}, 'calendar.school', dates, [], now);
assert.equal(source.entries.length, 0);
assert(source.warnings[0].includes('Ferienkalender nicht verfügbar'));
await source.update(hass, 'calendar.school', dates, [], now);
assert.equal(source.entries.length, 1);
await source.update({...hass,callApi:async()=>{throw new Error('offline');}}, 'calendar.other', dates, [], now);
assert.equal(source.entries.length, 0);
assert(source.warnings[0].includes('nicht geladen'));
await source.update(hass, 'calendar.other', dates, [], new Date(+now+60000));
assert.equal(source.entries.length, 1);
await source.update(hass, '', dates, [], now);
assert.equal(source.entries.length, 0);
assert.equal(source.warnings.length, 0);
console.log('Holiday dates, strict matching, DST, exclusive end, navigation, refresh and recovery passed.');
