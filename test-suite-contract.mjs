// Test the actual card readers against both old and new provider payloads.
import fs from 'node:fs';
import assert from 'node:assert/strict';

const code = fs.readFileSync(new URL('./src/stundenplan-card.ts', import.meta.url), 'utf8');
function method(name, next, deps = {}) {
  const start = code.indexOf(`  ${name}(`);
  assert(start >= 0);
  const end = code.indexOf(`  ${next}(`, start);
  assert(end > start);
  return Function(...Object.keys(deps), 'return ({' + code.slice(start, end).trim() + '});')(...Object.values(deps))[name];
}
const build = method('buildRowsFromArray', 'getRowsFromEntity', {
  mt: () => ({}), De: x => x,
});
const read = method('getRowsFromEntity', 'async loadJsonRows');
const config = {days:['Mo','Di','Mi','Do','Fr'],source_time_key:'time'};
const row = {time:'1.',start:'07:45',end:'08:30',cells:['D','M','SU','Veranstaltung','Entfällt: D']};
const table = {time:'1.',start:'07:45',end:'08:30',...Object.fromEntries(config.days.map((d,i)=>[d,row.cells[i]]))};
assert.deepEqual(build(config,[row]), build(config,[table]));
const obj = {buildRowsFromArray:build,readEntityJson:(_,attr)=>attr==='rows_table'?[table]:null};
assert.deepEqual(read.call(obj,config,'sensor.child_woche','rows_table'),build(config,[row]));
const fallback = {buildRowsFromArray:build,readEntityJson:(_,attr)=>attr==='rows'?[row]:null};
assert.deepEqual(read.call(fallback,config,'sensor.child_woche','rows_table'),build(config,[row]));
assert.equal(build(config,[]),null);
assert.deepEqual(build(config,[{break:true,label:'Pause'}]),[{break:true,time:'',label:'Pause'}]);
assert(code.includes('Stundenplan Suite (Integration)'));
assert(code.includes('attributes?.week_offset_entity || je(sid)'));
console.log('Card contract: 7 assertions passed (actual source methods).');
