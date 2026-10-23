import assert from 'node:assert/strict';
import { parseTimeRange, timeLabelParts } from './src/time-label.js';
import { periodKey } from './src/dated-entries.js';

for (const dash of ['-', '\u2013', '\u2014']) {
  for (const seconds of ['', ':00']) {
    const label = `1. 07:45${seconds} ${dash} 08:30${seconds}`;
    assert.deepEqual(parseTimeRange(label), { start: '07:45', end: '08:30' });
    assert.deepEqual(timeLabelParts(label), { label: '1.', range: '07:45\u201308:30' });
    assert.equal(periodKey(label), '1');
  }
}
assert.deepEqual(timeLabelParts('MP', '13:20:00', '14:05:00'), {label:'MP',range:'13:20\u201314:05'});
assert.deepEqual(timeLabelParts('09:20:00 - 09:40:00'), {label:'09:20\u201309:40',range:''});
assert.deepEqual(timeLabelParts('Projektarbeit'), {label:'Projektarbeit',range:''});
assert.deepEqual(parseTimeRange('27:45:00 - 28:30:00'), {});
assert.deepEqual(parseTimeRange('07:45:99 - 08:30:00'), {});
console.log('Time labels passed: seconds, separators, periods, breaks and invalid clocks.');
