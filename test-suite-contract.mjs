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
function standalone(name, next, deps = {}) {
  const start = code.indexOf(`function ${name}(`);
  assert(start >= 0);
  const end = code.indexOf(`function ${next}(`, start);
  assert(end > start);
  return Function(...Object.keys(deps), code.slice(start, end) + `; return ${name};`)(...Object.values(deps));
}
const parseTime = value => {
  const match = String(value ?? '').match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/);
  return match ? {start: match[1], end: match[2]} : {};
};
const normalizeCellTime = standalone('normalizeCellTime', 'wt', {mt: parseTime});
const build = method('buildRowsFromArray', 'getRowsFromEntity', {
  mt: parseTime, De: x => x, normalizeCellTime,
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
assert.deepEqual(build(config,[{time:'1.',cells:['D'],cell_times:['07:45-08:30']}])[0].cell_times[0],
  {time:'07:45-08:30',start:'07:45',end:'08:30'});
const isBreak = row => row?.break === true;
const isEmpty = value => {
  const text = String(value ?? '').trim();
  return !text || text === '-' || text === '–' || text === '—';
};
const trimRows = standalone('trimTrailingEmptyRows', 'je', {ct:isBreak,yt:isEmpty});
const longRows = [{cells:['D','']},{break:true},{cells:['','M']},{cells:['','']}];
assert.deepEqual(trimRows(longRows,[0]),[longRows[0]]);
assert.deepEqual(trimRows(longRows,[0,1]),longRows.slice(0,3));
assert.deepEqual(trimRows([{cells:['D']},{cells:['---']}],[0]),[{cells:['D']},{cells:['---']}]);
const normalizeStyle = value => value && typeof value === 'object' ? value : null;
const mergeTextKey = standalone('mergedCellTextKey', 'mergedCellStyleKey');
const mergeStyleKey = standalone('mergedCellStyleKey', 'mergedCellInfo', {De:normalizeStyle});
const mergeInfo = standalone('mergedCellInfo', 'je', {ct:isBreak,yt:isEmpty,De:normalizeStyle,mergedCellTextKey:mergeTextKey,mergedCellStyleKey:mergeStyleKey});
const merged = [{cells:['D'],cell_styles:[null]},{cells:['D'],cell_styles:[null]},{break:true},{cells:['D']}];
const info = (row) => ({text:row.cells?.[0] ?? '',style:row.cell_styles?.[0] ?? null});
assert.deepEqual(mergeInfo(merged,0,info),{covered:false,span:2});
assert.deepEqual(mergeInfo(merged,1,info),{covered:true,span:0});
assert.deepEqual(mergeInfo(merged,3,info),{covered:false,span:1});
assert.deepEqual(mergeInfo([{cells:['D']},{cells:['']}],0,info),{covered:false,span:1});
assert.deepEqual(mergeInfo([{cells:['D'],cell_styles:[{color:'red'}]},{cells:['D'],cell_styles:[null]}],0,info),{covered:false,span:1});
assert.deepEqual(mergeInfo([{cells:[' E\r\nR012 '],cell_styles:[{bg_alpha:0.18}]},{cells:['E\nR012'],cell_styles:[null]}],0,info),{covered:false,span:2});
assert(code.includes('Stundenplan Suite (Integration)'));
assert(code.includes('attributes?.week_offset_entity || je(sid)'));
assert(code.includes('equal_column_widths: !1'));
assert(code.includes('table.equalColumns'));
assert(code.includes('class=${t.equal_column_widths ? "equalColumns" : ""}'));
console.log('Card contract: 21 assertions passed (actual source methods).');
