import { dateKey } from './dated-entries.js';

export function weekKey(date) {
  const monday = new Date(date);
  monday.setDate(monday.getDate() - ((monday.getDay() || 7) - 1));
  return dateKey(monday);
}

export function weekendOffset(mode, date = new Date()) {
  const day = date.getDay() || 7;
  return mode === 'saturday' && day >= 6 || mode === 'sunday' && day === 7 ? 1 : 0;
}

export function rowKey(row) {
  return JSON.stringify([!!row.break, row.time ?? '', row.start ?? '', row.end ?? '']);
}

// Each card owns its view. No writes to the shared Suite number entity.
export class TimetableView {
  constructor(changed) {
    this.changed = changed;
    this.reset();
  }
  reset() {
    this.generation = (this.generation ?? 0) + 1;
    this.key = ''; this.pending = false; this.next = 0; this.data = null; this.error = '';
  }
  async update(hass, entity, dates, now = new Date()) {
    const state = hass?.states?.[entity];
    const requested = [...new Set(dates.filter(Boolean).map(dateKey))].sort();
    const key = `${entity}|${requested.join(',')}|${state?.last_updated ?? ''}`;
    if (key !== this.key) { this.reset(); this.key = key; this.changed(); }
    if (!state || ['unknown', 'unavailable'].includes(state.state) || hass.connected === false) {
      if (this.data || this.pending) { this.reset(); this.key = key; this.changed(); }
      return;
    }
    if (!requested.length || this.pending || now.getTime() < this.next) return;
    const generation = this.generation;
    this.pending = true;
    let timer;
    try {
      const result = await Promise.race([
        hass.callWS({ type: 'call_service', domain: 'stundenplan24_week', service: 'get_view',
          service_data: { entity_id: entity, dates: requested }, return_response: true }),
        new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Timeout')), 15000); })
      ]);
      if (generation !== this.generation) return;
      const data = result?.response;
      if (!data || !data.weeks || typeof data.weeks !== 'object' || Array.isArray(data.weeks) || !Array.isArray(data.loaded_days) ||
          JSON.stringify(data.requested_days) !== JSON.stringify(requested) ||
          Object.values(data.weeks).some(rows => !Array.isArray(rows))) throw new Error('Invalid view');
      this.data = data; this.error = ''; this.next = now.getTime() + 60000;
    } catch {
      if (generation !== this.generation) return;
      this.data = null; this.error = 'Stundenplan für diese Ansicht konnte nicht geladen werden.';
      this.next = now.getTime() + 60000;
    } finally {
      clearTimeout(timer);
      if (generation === this.generation) { this.pending = false; this.changed(); }
    }
  }
}
