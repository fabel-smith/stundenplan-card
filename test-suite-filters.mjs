import assert from 'node:assert/strict';
import { suiteExcludedCourses, suiteFilterInfo } from './src/suite-filters.js';

const courses = [{ id: '10', label: 'FSJ / 3c (Kurs 10)' }, { id: '11', label: 'Schwimmen / Gruppe A' }];
const state = { state: 'Plan verfuegbar', attributes: { provider: 'schulmanager',
  meta: { source_interface: 'get_schedule', excluded_courses: courses } } };
const hass = { states: { 'sensor.suite': state, 'sensor.other': { state: 'ok', attributes: {} } } };
const cfg = { source_type: 'entity', source_entity: 'sensor.suite', week_mode: 'off' };
assert.deepEqual(suiteExcludedCourses(hass, cfg), courses);
assert.deepEqual(suiteExcludedCourses(hass, { ...cfg, source_entity_integration: 'sensor.other' }), []);
assert.deepEqual(suiteExcludedCourses(hass, { ...cfg, source_type: 'sensor', source_entity_legacy: 'sensor.suite' }), courses);
for (const source_type of ['manual', 'json']) assert.deepEqual(suiteExcludedCourses(hass, { ...cfg, source_type }), []);
assert.deepEqual(suiteExcludedCourses(hass, { ...cfg, week_mode: 'kw_parity', source_entity_b: 'sensor.other' }, 'B'), []);
assert.deepEqual(suiteExcludedCourses(hass, { ...cfg, week_mode: 'kw_parity', source_entity_a: 'sensor.other' }, 'A'), []);
for (const value of ['unavailable', 'unknown']) {
  assert.deepEqual(suiteExcludedCourses({ states: { 'sensor.suite': { ...state, state: value } } }, cfg), []);
}
const before = JSON.stringify(hass);
suiteExcludedCourses(hass, cfg);
assert.equal(JSON.stringify(hass), before);
state.attributes.meta.excluded_courses = [null, {}, { id: '99' }, { id: '99', label: 'Duplicate' }];
assert.deepEqual(suiteExcludedCourses(hass, cfg), [{ id: '99', label: 'Kurs 99' }]);
state.attributes.meta.excluded_courses = 'invalid';
assert.deepEqual(suiteExcludedCourses(hass, cfg), []);
assert.deepEqual(suiteFilterInfo(hass, cfg), { courses: null });
state.attributes.meta.excluded_courses = [];
assert.deepEqual(suiteFilterInfo(hass, cfg), { courses: [] });
assert.equal(suiteFilterInfo(hass, { ...cfg, source_type: 'manual' }), null);
console.log('Suite filter metadata: source isolation, A/B, missing data and read-only behavior passed.');
