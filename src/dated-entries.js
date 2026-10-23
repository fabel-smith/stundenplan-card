// Display-only additions. Dates are local calendar dates, never UTC timestamps.
export function dateKey(value) {
  if (!(value instanceof Date) || !Number.isFinite(value.getTime())) return '';
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
}

export function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  return year >= 1900 && dateKey(new Date(year, month - 1, day, 12)) === value;
}

export function entryList(value) {
  if (typeof value === 'string') {
    try { value = JSON.parse(value); } catch { return null; }
  }
  return Array.isArray(value) ? value : null;
}

const key = value => String(value ?? '').trim().replace(/\s+/g, ' ').toLocaleLowerCase('de');
const singleLine = value => typeof value === 'string' && value.trim() && !/[\r\n]/.test(value);
const noteColor = value => typeof value === 'string' && !/[;{}]/.test(value) ? value.trim() : '';
const list = value => Array.isArray(value) ? value : typeof value === 'string' ? value.split(/[,;\n]/).map(x => x.trim()).filter(Boolean) : [];
export const periodKey = value => {
  const text = key(value);
  const numberedTime = text.match(/^(\d+)\.\s*\d{1,2}:\d{2}(?::\d{2})?\s*[-\u2013\u2014]\s*\d{1,2}:\d{2}(?::\d{2})?$/);
  return numberedTime ? numberedTime[1] : text.replace(/\.$/, '');
};

export const isPeriodNote = entry => (entry?.action ?? 'note') === 'note' && entry?.match === 'period';

export function entrySummary(entry, today = dateKey(new Date())) {
  const dates = [...new Set(list(entry?.dates ?? entry?.date).filter(validDate))].sort();
  const format = date => date.split('-').reverse().join('.');
  const next = dates.find(date => date >= today);
  const periods = list(entry?.periods).map(periodKey);
  const when = !dates.length ? 'Datum noch auswählen' : dates.length === 1 ? format(dates[0])
    : `${dates.length} Termine · ${next ? `nächster: ${format(next)} · ` : ''}letzter: ${format(dates.at(-1))}`;
  return {
    title: typeof entry?.text === 'string' && entry.text.trim() || 'Neuer Termin',
    detail: `${when}${periods.length ? ` · ${periods.join(', ')}${periods.length === 1 ? '. Stunde' : '. Stunden'}` : ''}${entry?.enabled === false ? ' · inaktiv' : ''}`
  };
}

// Unrepresented date/period notes remain visible even beyond provider coverage.
export function pendingNotes(entries, represented, today = dateKey(new Date())) {
  const result = new Map();
  for (const entry of entries.filter(isPeriodNote)) for (const date of entry.dates) {
    if (date < today) continue;
    const periods = entry.periods.filter(period => !represented.has(`${date}/${period}`));
    if (!periods.length) continue;
    const note = { date, periods, text: entry.text, color: entry.color, background: entry.background };
    result.set(JSON.stringify(note), note);
  }
  return [...result.values()].sort((a, b) => a.date.localeCompare(b.date) || a.periods[0].localeCompare(b.periods[0], 'de', { numeric: true }));
}

export function validateEntry(entry) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return 'Eintrag muss ein Objekt sein.';
  if (entry.enabled === false) return '';
  const dates = list(entry.dates ?? entry.date);
  if (!dates.length || !dates.every(validDate)) return 'Bitte gültige Termine als JJJJ-MM-TT angeben.';
  if (entry.match != null && !['period', 'subject'].includes(entry.match)) return 'Unbekannte Terminzuordnung.';
  if (!isPeriodNote(entry) && !singleLine(entry.subject)) return 'Bitte das Fach für die Zuordnung angeben (eine Zeile).';
  if (!['note', 'replace'].includes(entry.action ?? 'note')) return 'Unbekannte Aktion.';
  if (!singleLine(entry.text)) return 'Bitte einen Hinweis oder neuen Fachnamen angeben (eine Zeile).';
  if (entry.periods != null && !Array.isArray(entry.periods) && typeof entry.periods !== 'string') return 'Stunden bitte als Liste angeben.';
  if (!list(entry.periods).every(x => (typeof x === 'string' || typeof x === 'number') && singleLine(String(x)))) return 'Ungültige Stundenbezeichnung.';
  if (isPeriodNote(entry) && !list(entry.periods).length) return 'Bitte mindestens eine Unterrichtsstunde angeben, z. B. 1 oder 2.';
  return '';
}

export function collectEntries(config, hass) {
  const local = entryList(config.dated_entries) ?? [];
  const warnings = [];
  let external = [];
  if (config.dated_entries_entity) {
    const state = hass?.states?.[config.dated_entries_entity];
    if (!state || ['unavailable', 'unknown'].includes(state.state)) {
      warnings.push('Terminquelle nicht verfügbar; externe Termine werden nicht angewendet.');
    } else {
      const parsed = entryList(state.attributes?.[config.dated_entries_attribute || 'entries']);
      if (parsed) external = parsed;
      else warnings.push('Terminquelle enthält keine gültige Liste im gewählten Attribut.');
    }
  }
  let invalid = 0;
  const entries = [...local, ...external].flatMap(entry => {
    if (validateEntry(entry)) { invalid++; return []; }
    if (entry.enabled === false) return [];
    return [{ dates: list(entry.dates ?? entry.date), subject: key(entry.subject),
      periods: [...new Set(list(entry.periods).map(periodKey))], match: isPeriodNote(entry) ? 'period' : 'subject', action: entry.action ?? 'note', text: entry.text.trim(),
      color: noteColor(entry.color), background: noteColor(entry.background) }];
  });
  if (invalid) warnings.push(`${invalid} unvollständige oder ungültige Termine werden nicht angewendet.`);
  return { entries, warnings };
}

// Invalid/incomplete entries stay visible so they can still be corrected.
export function isPastEntry(entry, today = dateKey(new Date())) {
  if (!validDate(today) || validateEntry({ ...entry, enabled: true })) return false;
  const dates = list(entry?.dates ?? entry?.date);
  return dates.length > 0 && dates.every(date => date < today);
}

export function applyDatedEntries(text, row, dayIndex, date, entries) {
  const result = { text: String(text ?? ''), notes: [] };
  const dateValue = dateKey(date);
  if (!dateValue || row?.break || !entries.length) return result;
  const period = periodKey(row?.cell_times?.[dayIndex]?.time || row?.time);
  const notes = new Map();
  const addNote = note => notes.set(JSON.stringify(note), note);
  const asNote = entry => ({ text: entry.text,
    ...(entry.color ? { color: entry.color } : {}), ...(entry.background ? { background: entry.background } : {}) });
  for (const entry of entries) if (isPeriodNote(entry) && entry.dates.includes(dateValue) && entry.periods.includes(period)) addNote(asNote(entry));
  result.text = result.text.split(/\r?\n\s*\r?\n/).map(block => {
    const lines = block.split(/\r?\n/);
    const subject = key(lines[0]);
    if (!subject || /^[-\u2013\u2014]+$/.test(subject)) return block;
    const matches = entries.filter(entry => !isPeriodNote(entry) && entry.dates.includes(dateValue) && entry.subject === subject &&
      (!entry.periods.length || entry.periods.includes(period)));
    if (!matches.length) return block;
    // Never replace visible cancellation/substitution information from a provider.
    const changed = /entfällt|fällt\s+aus|ausfall|abgesagt|cancel(?:led|ed)|vertretung|ersatz|verlegt|\bstatt\b|geändert/i.test(block);
    const replacements = [...new Set(matches.filter(entry => entry.action === 'replace').map(entry => entry.text))];
    if (!changed && replacements.length === 1) lines[0] = replacements[0];
    if (!changed && replacements.length > 1) addNote({ text: 'Widersprüchliche Fachwechsel: Original bleibt.' });
    for (const entry of matches) if (entry.action === 'note') addNote({ text: entry.text,
      ...(entry.color ? { color: entry.color } : {}), ...(entry.background ? { background: entry.background } : {}) });
    return lines.join('\n');
  }).join('\n\n');
  result.notes = [...notes.values()];
  return result;
}
