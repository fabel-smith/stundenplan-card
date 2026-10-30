// Read-only explanation of upstream exclusions, never a second subject filter.
export function suiteFilterInfo(hass, config, activeWeek) {
  const type = config?.source_type;
  if (type !== "entity" && type !== "sensor") return null;
  let entity = type === "entity"
    ? config.source_entity_integration || config.source_entity
    : config.source_entity_legacy || config.source_entity;
  if (config.week_mode && config.week_mode !== "off") {
    entity = (activeWeek === "A" ? config.source_entity_a :
      activeWeek === "B" ? config.source_entity_b : null) || entity;
  }
  const state = hass?.states?.[String(entity ?? "").trim()];
  if (!state || ["unavailable", "unknown"].includes(state.state)) return null;
  const attrs = state.attributes;
  const meta = attrs?.meta;
  if (attrs?.provider !== "schulmanager" || meta?.source_interface !== "get_schedule") return null;
  // Older Suite test builds identify the interface but do not publish exclusions.
  if (!Array.isArray(meta.excluded_courses)) return { courses: null };
  const seen = new Set();
  return { courses: meta.excluded_courses.flatMap(course => {
    if (!course || typeof course.id !== "string" || !course.id.trim() || seen.has(course.id)) return [];
    seen.add(course.id);
    return [{ id: course.id, label: typeof course.label === "string" && course.label.trim()
      ? course.label.trim() : `Kurs ${course.id}` }];
  }) };
}

export function suiteExcludedCourses(hass, config, activeWeek) {
  return suiteFilterInfo(hass, config, activeWeek)?.courses ?? [];
}
