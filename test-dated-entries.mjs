import assert from 'node:assert/strict';
import { dateKey, validDate, validateEntry, collectEntries, applyDatedEntries, isPastEntry, entrySummary, pendingNotes } from './src/dated-entries.js';

const friday = new Date(2026, 9, 16, 12);
const nextFriday = new Date(2026, 9, 23, 12);
const rule = { dates: ['2026-10-16', '2026-11-06'], subject: 'BSC', action: 'replace', text: 'Schwimmen', periods: ['1', '2'] };
const rules = entries => collectEntries({ dated_entries: entries }).entries;
assert.equal(isPastEntry(rule, '2026-11-07'),true);
assert.equal(isPastEntry(rule, '2026-11-06'),false);
assert.equal(isPastEntry(rule, '2026-10-17'),false);
assert.equal(isPastEntry({...rule,dates:'2026-10-01, 2026-10-15'},'2026-10-16'),true);
assert.equal(isPastEntry({...rule,dates:undefined,date:'2026-10-15'},'2026-10-16'),true);
assert.equal(isPastEntry({...rule,enabled:false},'2026-11-07'),true);
for (const patch of [{dates:[]},{dates:['2026-10-01','invalid']},{subject:''},{text:''}]) {
  assert.equal(isPastEntry({...rule,...patch},'2026-11-07'),false);
}
for (const bad of [null,undefined,{},[]]) assert.equal(isPastEntry(bad,'2026-11-07'),false);
assert.equal(isPastEntry({...rule,dates:['2026-12-31']},'2027-01-01'),true);
assert.equal(isPastEntry({...rule,dates:['2026-10-25']},'2026-10-25'),false);
assert.equal(isPastEntry(rule,'invalid'),false);
const apply = (text, entries = [rule], row = { time: '1.' }, date = friday) => applyDatedEntries(text, row, 4, date, rules(entries));
const slotNote = {date:'2026-10-16',match:'period',action:'note',periods:[1],text:'Diktat'};
assert.equal(validateEntry(slotNote),'');
assert(validateEntry({...slotNote,periods:[]}));
assert(validateEntry({...slotNote,match:'invalid'}));
assert(validateEntry({...slotNote,action:'replace'}));
for (const value of ['', 'M', 'D\nRaum 1', '-']) assert.deepEqual(apply(value,[slotNote]).notes,[{text:'Diktat'}]);
assert.deepEqual(apply('D',[slotNote],{time:'2.'}).notes,[]);
assert.deepEqual(apply('D',[slotNote],{time:'1.',break:true}).notes,[]);
assert.deepEqual(apply('D',[slotNote],{time:'1.'},nextFriday).notes,[]);
assert.equal(isPastEntry(slotNote,'2026-10-17'),true);
assert.equal(isPastEntry(slotNote,'2026-10-16'),false);
assert.equal(entrySummary(slotNote,'2026-10-13').title,'Diktat');
assert.equal(entrySummary(slotNote,'2026-10-13').detail,'16.10.2026 · 1. Stunde');
assert.equal(entrySummary({...slotNote,dates:['2026-11-06','2026-10-16','2026-10-16','2026-10-09']},'2026-10-13').detail,
  '3 Termine · nächster: 16.10.2026 · letzter: 06.11.2026 · 1. Stunde');
assert.equal(pendingNotes(rules([slotNote]),new Set(),'2026-10-13').length,1);
assert.equal(pendingNotes(rules([slotNote]),new Set(['2026-10-16/1']),'2026-10-13').length,0);
assert.equal(pendingNotes(rules([slotNote]),new Set(),'2026-10-17').length,0);
assert.deepEqual(pendingNotes(rules([{...slotNote,periods:[1,2]}]),new Set(['2026-10-16/1']),'2026-10-13')[0].periods,['2']);
assert.equal(dateKey(friday), '2026-10-16');
for (const value of ['2026-02-30','2026-02-29','2026-13-01','2026-00-01','2026-01-00','20261016','2026-10-16T00:00:00Z',null,20261016]) assert.equal(validDate(value), false);
assert.equal(validDate('2028-02-29'), true);
assert.equal(validDate('2027-01-01'), true);
assert.equal(validateEntry(rule), '');
for (const patch of [{ dates: [] }, {dates:['2026-10-16','invalid']}, { subject:'' }, { subject:'BSC\nRoom' },
  {text:''}, {text:'Schwimmen\nRoom'}, {action:'delete'}, {periods:{}}, {periods:[{}]}]) assert(validateEntry({...rule,...patch}));
assert.equal(collectEntries({dated_entries:[null,{},rule]}).entries.length,1);
assert.equal(collectEntries({dated_entries:[{...rule,enabled:false}]}).entries.length,0);
const text = "BSC\nSH3\n'Kit";
assert.deepEqual(apply(text), {text:"Schwimmen\nSH3\n'Kit",notes:[]});
assert.equal(apply(text,[rule],{time:'2.'}).text,"Schwimmen\nSH3\n'Kit");
assert.equal(apply(text,[rule],{time:'1. 07:45 - 08:30'}).text,"Schwimmen\nSH3\n'Kit");
assert.equal(apply(text,[rule],{time:'07:45 - 08:30'}).text,text);
assert.equal(apply(text,[rule],{time:'3.'}).text,text);
assert.equal(apply(text,[rule],{time:'3.',cell_times:[null,null,null,null,{time:'1.'}]}).text,"Schwimmen\nSH3\n'Kit");
assert.equal(apply(text,[rule],{time:'1.'},nextFriday).text,text);
assert.equal(apply(text,[rule],{time:'1.'},new Date(2027,9,16,12)).text,text);
assert.equal(apply(text,[rule],{break:true,time:'1.'}).text,text);
assert.equal(apply('',[rule]).text,'');
for (const placeholder of ['-','---','\u2013','\u2014']) assert.deepEqual(apply(placeholder,[{...rule,subject:placeholder}]),{text:placeholder,notes:[]});
assert.equal(apply(text+'\nWerkstatt').text,"Schwimmen\nSH3\n'Kit\nWerkstatt");
assert.equal(apply('BSC2\nBSC',[rule]).text,'BSC2\nBSC');
assert.equal(apply('Mathe\nBSC',[rule]).text,'Mathe\nBSC');
assert.equal(apply('  bsc  \nSH3',[rule]).text,'Schwimmen\nSH3');
for (const marker of ['Entfällt','fällt aus','Ausfall','abgesagt','cancelled','canceled','Vertretung','Ersatz','verlegt','statt Sport','geändert']) {
  const original = text+'\n'+marker;
  assert.equal(apply(original).text, original, marker);
}
const note = { date:'2026-10-16', subject:'BSC', text:'Schwimmsachen mitbringen' };
assert.deepEqual(apply(text,[rule,note,note]),{text:"Schwimmen\nSH3\n'Kit",notes:[{text:'Schwimmsachen mitbringen'}]});
assert.deepEqual(apply(text,[rule,{...rule,text:'Sport'}]),{text,notes:[{text:'Widersprüchliche Fachwechsel: Original bleibt.'}]});
const coloredNote = {...note, color:'#212121', background:'rgba(255, 235, 59, 0.5)'};
assert.deepEqual(apply(text,[coloredNote,coloredNote]).notes,[{text:note.text,color:coloredNote.color,background:coloredNote.background}]);
assert.equal(apply(text,[coloredNote,{...coloredNote,color:'#ffffff'}]).notes.length,2);
assert.deepEqual(apply(text,[{...note,color:'red;position:fixed',background:{}}]).notes,[{text:note.text}]);
assert.equal(apply(text,[{...rule,color:'red'}]).notes.length,0);
assert.deepEqual(apply(text,[rule,rule]),{text:"Schwimmen\nSH3\n'Kit",notes:[]});
const afterHoliday = new Date(2026,10,6,12);
assert.equal(apply(text,[rule],{time:'1.'},afterHoliday).text,"Schwimmen\nSH3\n'Kit");
assert.equal(apply(text,[rule],{time:'1.'},new Date(2026,9,30,12)).text,text);
const snapshot=JSON.stringify(rule), row={time:'1.',start:'07:45',end:'08:30',cells:['','','','',text],cell_styles:[null,null,null,null,{color:'red'}]};
const rowSnapshot=JSON.stringify(row);
apply(text,[rule],row);
assert.equal(JSON.stringify(rule),snapshot);assert.equal(JSON.stringify(row),rowSnapshot);
assert.equal(apply(text+'\n\nMathe\nR2',[rule]).text,"Schwimmen\nSH3\n'Kit\n\nMathe\nR2");
const config={dated_entries:[rule],dated_entries_entity:'sensor.termine',dated_entries_attribute:'events'};
const states={'sensor.termine':{state:'ok',attributes:{events:JSON.stringify([note])}}};
assert.equal(collectEntries(config,{states}).entries.length,2);
assert.deepEqual(collectEntries(config,{states}).warnings,[]);
for (const state of [undefined,{state:'unavailable',attributes:{events:[note]}},{state:'unknown',attributes:{events:[note]}},
  {state:'ok',attributes:{}},{state:'ok',attributes:{events:'invalid'}},{state:'ok',attributes:{events:'{}'}}]) {
  const result=collectEntries(config,{states:{'sensor.termine':state}});
  assert.equal(result.entries.length,1);assert.equal(result.warnings.length,1);
}
assert.equal(collectEntries({...config,dated_entries_attribute:'entries'}, {states:{'sensor.termine':{state:'ok',attributes:{entries:[note]}}}}).entries.length,2);
console.log('Dated entries passed: local dates, validation, exact subjects/periods, notes, replacements, conflicts, holidays, cancellation markers, source failures and immutability.');
