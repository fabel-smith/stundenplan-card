import { dateKey, validDate } from './dated-entries.js';

export function calendarRange(now = new Date()) {
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start);
  end.setDate(end.getDate() + 60);
  return { start: start.toISOString(), end: end.toISOString(), first: dateKey(start), last: dateKey(end) };
}

export function calendarEntries(events, range) {
  if (!Array.isArray(events)) throw new Error('Invalid calendar response');
  const entries = new Map();
  let ignored = 0;
  for (const event of events) {
    const start = event?.start?.date, end = event?.end?.date;
    const title = typeof event?.summary === 'string' ? event.summary.trim() : '';
    const match = /^([^\r\n]+?)\s*\[\s*([1-9][0-9]?(?:[ \t]*,[ \t]*[1-9][0-9]?)*)[ \t]*\]$/.exec(title);
    if (!validDate(start) || !validDate(end) || event.start.dateTime || event.end.dateTime ||
        Date.parse(end) - Date.parse(start) !== 86400000 || !match || !match[1].trim()) {
      ignored++;
      continue;
    }
    if (start < range.first || start >= range.last) continue;
    const entry = { date: start, match: 'period', action: 'note', text: match[1].trim(),
      periods: [...new Set(match[2].split(',').map(period => period.trim()))].sort((a, b) => Number(a) - Number(b)) };
    entries.set(JSON.stringify(entry), entry);
  }
  return { entries: [...entries.values()].sort((a, b) => a.date.localeCompare(b.date)), ignored };
}

// Each card owns its requests. A late response must never overwrite another calendar.
export class CalendarSource {
  constructor(changed) {
    this.changed = changed;
    this.entries = [];
    this.warnings = [];
    this.generation = 0;
    this.key = '';
    this.next = 0;
  }
  reset() {
    this.generation++;
    this.key = '';
    this.pending = false;
    this.unavailable = false;
    this.next = 0;
    this.entries = [];
    this.warnings = [];
  }
  async update(hass, entity, now = new Date()) {
    const range = calendarRange(now), key = entity ? `${entity}|${range.first}` : '';
    if (key !== this.key) {
      this.reset(); this.key = key; this.changed();
    }
    if (!entity || !hass) return;
    const state = hass.states?.[entity];
    const available = /^calendar\.[a-z0-9_]+$/.test(entity) && state &&
      !['unknown', 'unavailable'].includes(state.state) && hass.connected !== false;
    if (!available) {
      if (!this.unavailable) {
        this.reset(); this.key = key; this.unavailable = true;
        this.warnings = ['Kalender nicht verfügbar; Kalendertermine werden nicht angezeigt.'];
        this.changed();
      }
      return;
    }
    if (this.unavailable) { this.unavailable = false; this.next = 0; }
    if (typeof hass.callApi !== 'function' || this.pending || now.getTime() < this.next) return;
    const generation = this.generation;
    this.pending = true;
    let timeout;
    try {
      const query = new URLSearchParams({ start: range.start, end: range.end });
      const events = await Promise.race([
        hass.callApi('GET', `calendars/${encodeURIComponent(entity)}?${query}`),
        new Promise((_, reject) => { timeout = setTimeout(() => reject(new Error('Calendar timeout')), 20000); })
      ]);
      if (generation !== this.generation) return;
      const result = calendarEntries(events, range);
      this.entries = result.entries;
      this.warnings = result.ignored ? [`${result.ignored} Kalendertermine ohne unterstützte Tages-/Stundenangabe übersprungen.`] : [];
      this.next = now.getTime() + 5 * 60000;
    } catch {
      if (generation !== this.generation) return;
      this.entries = [];
      this.warnings = ['Kalender konnte nicht geladen werden. Erneuter Versuch in einer Minute; manuelle Termine bleiben erhalten.'];
      this.next = now.getTime() + 60000;
    } finally {
      clearTimeout(timeout);
      if (generation === this.generation) { this.pending = false; this.changed(); }
    }
  }
}
