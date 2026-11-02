import { subjectColorKey } from "./subject-colors.js";

export function normalizeSubjectAliases(rules) {
  const bySubject = new Map();
  for (const rule of Array.isArray(rules) ? rules : []) {
    const subject = typeof rule?.subject === "string" ? rule.subject.trim() : "";
    const name = typeof rule?.name === "string" ? rule.name.trim() : "";
    if (subject && name && !/[\r\n]/.test(subject + name))
      bySubject.set(subjectColorKey(subject), {subject, name});
  }
  return [...bySubject.values()];
}

export function displaySubject(label, rules) {
  if (!label || !rules?.length) return label;
  // Keep the Suite's cancellation/change text and Schulmanager's status markers.
  const [, prefix, subject, suffix] = /^(Entfällt:\s*)?(.+?)((?:\s*\(geändert\)|\s*[❌🔁🚪📝⚠✗↔]\uFE0F?)*)$/iu.exec(label) ?? [];
  if (!subject) return label;
  const match = rules.find(rule => subjectColorKey(rule.subject) === subjectColorKey(subject));
  return match ? (prefix || "") + match.name + suffix : label;
}
