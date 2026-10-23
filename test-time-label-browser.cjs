const assert = require('node:assert/strict');

module.exports = async (browser, url) => {
  const page = await browser.newPage();
  try {
    await page.goto(url);
    await page.evaluate(async () => {
      await customElements.whenDefined('stundenplan-card');
      window.timeCard = document.createElement('stundenplan-card');
      document.querySelector('#editor').replaceChildren(timeCard);
      window.timeRows = [{time:'1. 07:45:00 - 08:30:00',Mo:'M'},
        {time:'2. 08:35:00 - 09:20:00',Mo:'D'},
        {break:true,time:'09:20:00 - 09:40:00',label:'Pause'}];
      timeCard.hass = {states:{'sensor.time_test':{state:'ok',attributes:{rows_table:timeRows}}}};
    });
    for (const width of [320, 440]) for (const compact of [true,false]) {
      await page.setViewportSize({width,height:850});
      const result = await page.evaluate(async compact => {
        timeCard.setConfig({type:'custom:stundenplan-card',source_type:'sensor',
          source_entity:'sensor.time_test',source_attribute:'rows_table',source_time_key:'time',
          days:['Mo'],compact,highlight_today:false,highlight_current:false});
        await timeCard.updateComplete;await timeCard.updateComplete;
        const root=timeCard.shadowRoot;
        return {labels:[...root.querySelectorAll('.timeSt')].map(el=>el.textContent),
          clocks:[...root.querySelectorAll('.timeHm')].map(el=>el.textContent),
          pause:root.querySelector('tr.break .time').textContent,
          overflow:[...root.querySelectorAll('td.time')].some(el=>el.scrollWidth>el.clientWidth+1),
          range:timeCard.buildRowsFromArray(timeCard.config,timeRows)[0],
          original:timeRows[0].time};
      },compact);
      assert.deepEqual(result.labels,['1.','2.']);
      assert.deepEqual(result.clocks,['07:45\u201308:30','08:35\u201309:20']);
      assert.equal(result.pause,'09:20\u201309:40');
      assert.equal(result.overflow,false,`Time column overflow at ${width}, compact=${compact}`);
      assert.equal(result.range.start,'07:45');assert.equal(result.range.end,'08:30');
      assert.equal(result.original,'1. 07:45:00 - 08:30:00');
    }
    console.log('Schulmanager times passed: split label/range, seconds, narrow columns and unmodified source.');
  } finally { await page.close(); }
};
