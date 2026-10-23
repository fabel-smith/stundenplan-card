const assert = require('node:assert/strict');

module.exports = async function(browser, url) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto(url);
    const result = await page.evaluate(async () => {
      await customElements.whenDefined('stundenplan-card');
      const now = new Date(), day = n => { const d = new Date(now); d.setDate(d.getDate() + n); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
      const card = document.createElement('stundenplan-card');
      const config = { type: 'custom:stundenplan-card', title: 'Calendar test', source_type: 'manual',
        days: ['Mo','Di','Mi','Do','Fr','Sa','So'], rows: [{time:'3.',cells:['M','M','M','M','M','M','M']}],
        calendar_entity: 'calendar.test', dated_entries: [{date:day(0),match:'period',periods:[3],text:'Local note'}] };
      const events = [{summary:'Calendar note [3]',start:{date:day(0)},end:{date:day(1)}}];
      let calls = 0;
      const hass = {states:{'calendar.test':{state:'off',attributes:{friendly_name:'Test calendar'}}},
        callApi: async () => {calls++; return events;}};
      card.setConfig(config); card.hass = hass;
      document.querySelector('#editor').replaceChildren(card);
      await card.updateComplete; await new Promise(resolve => setTimeout(resolve, 10)); await card.updateComplete;
      const loaded = card.shadowRoot.textContent;
      for(let i=0;i<5;i++){card.hass = {...hass};await card.updateComplete;}
      const count = calls;
      card.setConfig({...config,calendar_entity:''});await card.updateComplete;await card.updateComplete;
      const cleared = card.shadowRoot.textContent;
      card.setConfig(config);await card.updateComplete;await new Promise(resolve => setTimeout(resolve,10));await card.updateComplete;
      card.hass = {...hass,states:{}};await card.updateComplete;await card.updateComplete;
      const unavailable = card.shadowRoot.textContent;
      const editor = document.createElement('stundenplan-card-editor');
      editor.hass = hass; editor.setConfig(config); editor._open = {dates:true};
      document.querySelector('#editor').append(editor);await editor.updateComplete;
      let changed;
      editor.addEventListener('config-changed', event => {changed=event.detail.config;});
      const select = editor.shadowRoot.querySelector('select[aria-label="Kalender für Termine (optional)"]');
      const selected = select.value;
      select.value='';select.dispatchEvent(new Event('change',{bubbles:true}));await editor.updateComplete;
      return {loaded,cleared,unavailable,count,selected,changed};
    });
    assert(result.loaded.includes('Calendar note') && result.loaded.includes('Local note'));
    assert.equal(result.count,1);
    assert(!result.cleared.includes('Calendar note') && result.cleared.includes('Local note'));
    assert(!result.unavailable.includes('Calendar note') && result.unavailable.includes('Local note'));
    assert(result.unavailable.includes('Kalender nicht verfügbar'));
    assert.equal(result.selected,'calendar.test');
    assert.equal(result.changed.calendar_entity,'');
    assert.equal(result.changed.dated_entries[0].text,'Local note');
    if (require('node:fs').existsSync(require('node:path').join(__dirname, 'dist-calendar-test/stundenplan-card-calendar-test.js'))) {
    const isolation = await page.evaluate(async () => {
      const stable = customElements.get('stundenplan-card'), version = window.__STUNDENPLAN_CARD_VERSION;
      await import('/calendar-test.js');
      const card = document.createElement('stundenplan-card-calendar-test');
      card.setConfig({type:'custom:stundenplan-card-calendar-test',source_type:'manual',rows:[]});
      const editor = await card.constructor.getConfigElement();
      editor.setConfig({type:'custom:stundenplan-card-calendar-test',calendar_entity:'calendar.test'});
      return {unchanged:stable===customElements.get('stundenplan-card')&&version===window.__STUNDENPLAN_CARD_VERSION,
        editor:editor.localName,entity:editor._config.calendar_entity};
    });
    assert.equal(isolation.unchanged,true);
    assert.equal(isolation.editor,'stundenplan-card-calendar-test-editor');
    assert.equal(isolation.entity,'calendar.test');
    }
    assert.deepEqual(errors,[]);
    console.log('Direct calendar browser checks passed: rendering, removal, offline fallback, throttling and editor persistence.');
  } finally { await page.close(); }
};
