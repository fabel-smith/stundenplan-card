// Match subject labels only, never room, teacher or note lines.
export function subjectColorKey(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ").toLocaleLowerCase("de");
}

function safeColor(value) {
  const color = typeof value === "string" ? value.trim() : "";
  return color && !/[;{}<>]/.test(color) && !/url\s*\(/i.test(color) &&
    globalThis.CSS?.supports("color", color) ? color : "";
}

export function normalizeSubjectColors(value) {
  if (!Array.isArray(value)) return [];
  return value.filter(item => item && typeof item === "object").map(item => ({
    subject: typeof item.subject === "string" ? item.subject.trim() : "",
    background: safeColor(item.background),
    color: safeColor(item.color),
  }));
}

export function subjectColor(text, rules) {
  const label = String(text ?? "").trim().split(/\r?\n/, 1)[0];
  // Ignore known upstream status markers, but retain groups and original-subject
  // annotations: ambiguous labels must not silently match a different subject.
  const clean = label.replace(/(?:\s*[❌🔁🚪📝⚠✗↔]\uFE0F?)+$/u, "").trim();
  const exact = rules?.find(rule => rule.subject && subjectColorKey(rule.subject) === subjectColorKey(label));
  return exact ?? rules?.find(rule => rule.subject && subjectColorKey(rule.subject) === subjectColorKey(clean)) ?? null;
}

export function subjectColorStyle(text, rules) {
  const rule = subjectColor(text, rules);
  return (rule?.background ? `background:${rule.background};` : "") +
    (rule?.color ? `color:${rule.color};` : "");
}
