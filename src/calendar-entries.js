import { dateKey, validDate, periodKey } from './dated-entries.js';

function calendarPeriods(value) {
  const parts = value.split(',').map(part => part.trim());
  // Keep the numeric protocol strict; named rows must start with a letter.
  if (!parts.every(part => /^[1-9][0-9]?$/.test(part) ||
      /^[\p{L}][\p{L}\p{M}\p{N} _./&()+-]{0,63}$/u.test(part))) return null;
  return [...new Set(parts.map(periodKey))].sort((a, b) => a.localeCompare(b, 'de', { numeric: true }));
}

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
    const match = /^([^\r\n]+?)[ \t]*\[([^\[\]\r\n]+)\]$/.exec(title);
    const periods = match ? calendarPeriods(match[2]) : null;
    if (!validDate(start) || !validDate(end) || event.start.dateTime || event.end.dateTime ||
        Date.parse(end) - Date.parse(start) !== 86400000 || !match || !periods || !match[1].trim()) {
      ignored++;
      continue;
    }
    if (start < range.first || start >= range.last) continue;
    const entry = { date: start, match: 'period', action: 'note', text: match[1].trim(),
      periods };
    entries.set(JSON.stringify(entry), entry);
  }
  return { entries: [...entries.values()].sort((a, b) => a.date.localeCompare(b.date)), ignored };
}

// Each card owns its requests. A late response must never overwrite another calendar.
export class CalendarSource {
  constructor(changed, options = {}) {
    this.changed = changed;
    this.parse = options.parse ?? calendarEntries;
    this.messages = options.messages ?? {
      unavailable: 'Kalender nicht verfügbar; Kalendertermine werden nicht angezeigt.',
      failed: 'Kalender konnte nicht geladen werden. Erneuter Versuch in einer Minute; manuelle Termine bleiben erhalten.',
      ignored: count => `${count} ${count === 1 ? 'Kalendertermin' : 'Kalendertermine'} ohne unterstützte Tages-/Stundenangabe übersprungen.`
    };
    this.entries = [];
    this.ignored = 0;
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
    this.ignored = 0;
    this.warnings = [];
  }
  displayWarnings(includeSkipped) {
    return includeSkipped && this.ignored
      ? [...this.warnings, this.messages.ignored(this.ignored)] : this.warnings;
  }
  async update(hass, entity, now = new Date(), range = calendarRange(now)) {
    const key = entity ? `${entity}|${range.first}|${range.last}` : '';
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
        this.warnings = [this.messages.unavailable];
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
      const result = this.parse(events, range);
      this.entries = result.entries;
      this.ignored = result.ignored;
      this.warnings = [];
      this.next = now.getTime() + 5 * 60000;
    } catch {
      if (generation !== this.generation) return;
      this.entries = [];
      this.ignored = 0;
      this.warnings = [this.messages.failed];
      this.next = now.getTime() + 60000;
    } finally {
      clearTimeout(timeout);
      if (generation === this.generation) { this.pending = false; this.changed(); }
    }
  }
}
