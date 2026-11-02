// Optional Suite view metadata. Never infer roles from room/teacher spelling.
export function normalizeCellDetails(value) {
  const result = {};
  const detail = value => {
    if (!value || typeof value.text !== 'string' || !value.text.trim() ||
        typeof value.subject !== 'string' || !value.subject.trim() ||
        !['rooms', 'teachers', 'notes'].every(key => Array.isArray(value[key]) &&
          value[key].every(item => typeof item === 'string'))) return null;
    return { text: value.text, subject: value.subject,
      rooms: [...value.rooms], teachers: [...value.teachers], notes: [...value.notes] };
  };
  for (const day of ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']) {
    if (!Array.isArray(value?.[day])) continue;
    result[day] = value[day].flatMap(item => {
      const parsed = detail(item);
      if (!parsed) return [];
      const original = detail(item.original);
      return [{ ...parsed, ...(original ? { original } : {}) }];
    });
  }
  return result;
}

export function findCellDetails(text, details) {
  const key = value => value.replace(/\r/g, '').split('\n').map(line => line.trim()).filter(Boolean).join('\n');
  const matches = details.filter(detail => key(detail.text) === key(text));
  if (matches.length !== 1) return null;
  return matches[0];
}
