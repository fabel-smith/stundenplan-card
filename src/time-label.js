// Match complete clocks, never the minutes/seconds inside a longer timestamp.
const rangePattern = /(?<![\d:])((?:[01]?\d|2[0-3]):[0-5]\d)(?::[0-5]\d)?\s*[-\u2013\u2014]\s*((?:[01]?\d|2[0-3]):[0-5]\d)(?::[0-5]\d)?(?![\d:])/;
const clock = value => String(value ?? '').trim().replace(/^((?:[01]?\d|2[0-3]):[0-5]\d):[0-5]\d$/, '$1');

export function parseTimeRange(value) {
  const match = String(value ?? '').match(rangePattern);
  return match ? { start: match[1], end: match[2] } : {};
}

export function timeLabelParts(value, start, end) {
  const text = String(value ?? '').trim();
  const match = text.match(rangePattern);
  if (match) {
    const label = (text.slice(0, match.index) + text.slice(match.index + match[0].length)).trim();
    const range = `${match[1]}\u2013${match[2]}`;
    return label ? { label, range } : { label: /\d:\d{2}:\d{2}/.test(match[0]) ? range : text, range: '' };
  }
  return { label: text, range: start && end ? `${clock(start)}\u2013${clock(end)}` : '' };
}
