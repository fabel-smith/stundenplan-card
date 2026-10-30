import { dateKey, validDate } from './dated-entries.js';
import { CalendarSource } from './calendar-entries.js';

export const holidayTitles = [
  'Ferien', 'Schulferien', 'Herbstferien', 'Winterferien', 'Weihnachtsferien',
  'Osterferien', 'Pfingstferien', 'Sommerferien', 'Faschingsferien',
  'Fastnachtsferien', 'Frühjahrsferien', 'Beweglicher Ferientag', 'Bewegliche Ferientage'
];
const titleKey = value => value.trim().replace(/\s+/g, ' ').toLocaleLowerCase('de');
export function normalizeHolidayTitles(value) {
  const titles = Array.isArray(value) ? value : typeof value === 'string' ? value.split('\n') : [];
  return [...new Set(titles.filter(item => typeof item === 'string' && item.trim() &&
    item.length <= 200 && !/[\r\n]/.test(item.trim())).map(titleKey))].sort();
}

export function holidayRange(dates, now = new Date()) {
  const keys = dates.map(dateKey).filter(Boolean).sort();
  const first = keys[0] || dateKey(now), last = keys.at(-1) || first;
  const start = new Date(`${first}T00:00:00`), end = new Date(`${last}T00:00:00`);
  end.setDate(end.getDate() + 1);
  return { start: start.toISOString(), end: end.toISOString(), first, last: dateKey(end) };
}

export function holidayEntries(events, range, extraTitles = []) {
  if (!Array.isArray(events)) throw new Error('Invalid holiday calendar response');
  const accepted = new Set([...holidayTitles.map(titleKey), ...normalizeHolidayTitles(extraTitles)]);
  const entries = new Map();
  let ignored = 0;
  for (const event of events) {
    const title = typeof event?.summary === 'string' ? event.summary.trim() : '';
    // Mixed school calendars contain appointments too. Never infer holidays from substrings or descriptions.
    if (!accepted.has(titleKey(title))) continue;
    const start = event?.start?.date, end = event?.end?.date;
    if (!validDate(start) || !validDate(end) || start >= end || event.start.dateTime || event.end.dateTime) {
      ignored++;
      continue;
    }
    if (start >= range.last || end <= range.first) continue;
    const entry = { title, start, end };
    entries.set(`${titleKey(title)}|${start}|${end}`, entry);
  }
  return { entries: [...entries.values()].sort((a, b) => a.start.localeCompare(b.start) || a.title.localeCompare(b.title)), ignored };
}

export function holidaysOnDate(entries, date) {
  const key = dateKey(date);
  return key ? entries.filter(entry => entry.start <= key && key < entry.end) : [];
}

export function holidayPeriod(entry) {
  // HA all-day end dates are exclusive. Calendar arithmetic also handles DST changes.
  const end = new Date(`${entry.end}T12:00:00`);
  end.setDate(end.getDate() - 1);
  const format = value => value.split('-').reverse().join('.');
  const last = dateKey(end);
  return entry.start === last ? format(last) : `${format(entry.start)} – ${format(last)}`;
}

export class HolidaySource extends CalendarSource {
  constructor(changed) {
    super(changed, {
      messages: {
        unavailable: 'Ferienkalender nicht verfügbar; Ferien können nicht geprüft werden.',
        failed: 'Ferienkalender konnte nicht geladen werden. Erneuter Versuch in einer Minute.',
        ignored: count => `${count} Ferieneinträge ohne gültigen ganztägigen Zeitraum übersprungen.`
      }
    });
    this.titlesKey = '';
  }
  async update(hass, entity, dates, extraTitles = [], now = new Date()) {
    const titles = normalizeHolidayTitles(extraTitles), key = JSON.stringify(titles);
    if (key !== this.titlesKey) { this.reset(); this.titlesKey = key; }
    this.parse = (events, range) => holidayEntries(events, range, titles);
    return super.update(hass, entity, now, holidayRange(dates, now));
  }
}
