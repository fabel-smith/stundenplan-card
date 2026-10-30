const assert = require('node:assert/strict');
const path = require('node:path');

module.exports = async (browser, url) => {
  const page = await browser.newPage({viewport:{width:1000,height:800}});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    const RealDate = Date;
    window.Date = class extends RealDate {
      constructor(...args) { super(...(args.length ? args : ['2026-10-25T12:00:00'])); }
      static now() { return new RealDate('2026-10-25T12:00:00').getTime(); }
    };
  });
  try {
    await page.goto(url);
    await page.evaluate(async () => {
      await customElements.whenDefined('stundenplan-card');
      window.holidayCalls = [];
      window.holidayConfig = {type:'custom:stundenplan-card',title:'Stundenplan - Beispielklasse',
        source_type:'manual',view_mode:'rolling',days_ahead:4,show_header_date:true,equal_column_widths:true,
        holiday_calendar_entity:'calendar.school',calendar_entity:'calendar.notes',
        rows:[{time:'1.',start:'08:00',end:'08:45',cells:['M','D','E','M','D']}],
        dated_entries:[{date:'2026-10-26',match:'period',periods:[1],text:'Lokaler Hinweis'}]};
      window.holidayHass = {states:{'calendar.school':{state:'off',attributes:{friendly_name:'Schulkalender'}},
        'calendar.notes':{state:'off',attributes:{friendly_name:'Arbeiten'}}},callApi:async(method,url)=>{
        holidayCalls.push([method,url]);
        return url.startsWith('calendars/calendar.notes?') ? [{summary:'Kalenderhinweis [1]',start:{date:'2026-10-27'},end:{date:'2026-10-28'}}] : [
          {summary:'Herbstferien',start:{date:'2026-10-26'},end:{date:'2026-11-01'}},
          {summary:'Elternabend',start:{date:'2026-10-28'},end:{date:'2026-10-29'}}];
      }};
      window.holidayCard = document.createElement('stundenplan-card');
      holidayCard.setConfig(holidayConfig); holidayCard.hass=holidayHass;
      document.querySelector('#editor').replaceChildren(holidayCard);
      window.settleHoliday = async()=>{await holidayCard.updateComplete;await new Promise(r=>setTimeout(r,10));await holidayCard.updateComplete;};
      await settleHoliday();
    });
    const initial = await page.evaluate(()=>({banner:holidayCard.shadowRoot.querySelector('.holidayBanner')?.textContent,
      marks:holidayCard.shadowRoot.querySelectorAll('.holidayDay').length,text:holidayCard.shadowRoot.textContent,
      rows:holidayCard.config.rows,calls:holidayCalls.length}));
    assert(initial.banner.includes('Herbstferien') && initial.banner.includes('31.10.2026'));
    assert(!initial.banner.includes('Elternabend'));
    assert.equal(initial.marks,5);
    assert(initial.text.includes('Lokaler Hinweis') && initial.text.includes('Kalenderhinweis'));
    assert.equal(initial.rows[0].cells[0],'M','Holiday markings never delete source lessons');
    assert.equal(initial.calls,2);
    await page.evaluate(async()=>{holidayCard.requestUpdate();await settleHoliday();});
    assert.equal(await page.evaluate(()=>holidayCalls.length),2);

    for (const width of [320,440]) for (const light of [false,true]) {
      await page.evaluate(({width,light})=>{
        document.querySelector('#editor').style.width=width+'px';
        holidayCard.style.setProperty('--primary-text-color',light?'#222':'#eee');
        holidayCard.style.color=light?'#222':'#eee';
        holidayCard.style.setProperty('--secondary-background-color',light?'#eee':'#292929');
        holidayCard.style.setProperty('--card-background-color',light?'#fff':'#1c1c1c');
      },{width,light});
      assert(await page.locator('stundenplan-card').evaluate(card=>{
        const host=card.getBoundingClientRect(),banner=card.shadowRoot.querySelector('.holidayBanner').getBoundingClientRect();
        return banner.right<=host.right+1 && banner.left>=host.left;
      }));
    }
    await page.evaluate(async()=>{
      holidayCard.setConfig({...holidayConfig,days_ahead:6});await settleHoliday();
    });
    assert.deepEqual(await page.locator('stundenplan-card th:not(.time)').evaluateAll(cells=>cells.map(cell=>!!cell.querySelector('.holidayDay'))),[true,true,true,true,true,false,false]);
    await page.evaluate(async()=>{holidayCard._uiPopupOpen=true;holidayCard.requestUpdate();await settleHoliday();});
    assert.equal(await page.locator('stundenplan-card .popupCard .holidayBanner').count(),0,'Popup uses the current week, not the rolling dates');
    assert.equal(await page.locator('stundenplan-card .holidayBanner').count(),1);
    await page.evaluate(async()=>{holidayCard._uiPopupOpen=false;holidayCard.requestUpdate();await settleHoliday();});
    await page.evaluate(async()=>{
      holidayCard.setConfig({...holidayConfig,source_type:'entity',source_entity:'sensor.week',source_attribute:'rows_table',view_mode:'week'});
      holidayCard.hass={...holidayHass,states:{...holidayHass.states,'sensor.week':{state:'ok',attributes:{rows_table:[],days:['20261026','20261027','20261028','20261029','20261030']}}}};
      await settleHoliday();
    });
    assert.equal(await page.locator('stundenplan-card .holidayDay').count(),5,'Empty provider week still shows confirmed holidays');
    assert.equal(await page.locator('stundenplan-card .nodataCell').count(),1);
    await page.evaluate(async()=>{
      holidayCard.hass={...holidayHass,states:{...holidayHass.states,'sensor.week':{state:'ok',attributes:{rows_table:[],days:['20261102','20261103','20261104','20261105','20261106']}}}};
      await settleHoliday();
    });
    assert.equal(await page.locator('stundenplan-card .holidayBanner').count(),0,'No stale holiday banner after week change');
    await page.evaluate(async()=>{
      holidayCard.hass={...holidayHass,states:{...holidayHass.states,'sensor.week':{state:'ok',attributes:{rows_table:[],days:['20261026','20261027','20261028','20261029','20261030']}}},
        callApi:async()=>[{summary:'Herbstferien',start:{date:'2026-10-28'},end:{date:'2026-10-30'}}]};
      await settleHoliday();
    });
    assert.deepEqual(await page.locator('stundenplan-card th:not(.time)').evaluateAll(cells=>cells.map(cell=>!!cell.querySelector('.holidayDay'))),[false,false,true,true,false]);
    await page.evaluate(async()=>{holidayCard.setConfig(holidayConfig);holidayCard.hass=holidayHass;await settleHoliday();});
    await page.evaluate(async()=>{holidayCard.hass={...holidayHass,states:{'calendar.notes':holidayHass.states['calendar.notes']}};await settleHoliday();});
    assert.equal(await page.locator('stundenplan-card .holidayBanner').count(),0);
    assert((await page.locator('stundenplan-card .datedWarning').allTextContents()).join(' ').includes('Ferienkalender nicht verfügbar'));
    await page.evaluate(async()=>{holidayCard.hass=holidayHass;await settleHoliday();});
    assert.equal(await page.locator('stundenplan-card .holidayBanner').count(),1);
    const saved = await page.evaluate(async()=>{
      const editor=document.createElement('stundenplan-card-editor');
      editor.hass=holidayHass;editor.setConfig(holidayConfig);editor._open={holidays:true};
      document.querySelector('#editor').append(editor);await editor.updateComplete;
      let saved;editor.addEventListener('config-changed',event=>{saved=event.detail.config;});
      const select=editor.shadowRoot.querySelector('select[aria-label="Ferienkalender (optional)"]');
      const selected=select.value;select.value='';select.dispatchEvent(new Event('change',{bubbles:true}));await editor.updateComplete;
      return {selected,saved};
    });
    assert.equal(saved.selected,'calendar.school');
    assert.equal(saved.saved.holiday_calendar_entity,'');
    assert.equal(saved.saved.calendar_entity,'calendar.notes');
    assert.equal(saved.saved.dated_entries[0].text,'Lokaler Hinweis');
    await page.getByText('Welche Einträge zählen als Ferien?',{exact:true}).click();
    await page.getByRole('textbox',{name:'Zusätzliche Ferienbezeichnungen',exact:true}).fill('Herbstferien BW\n  Freier Schultag  ');
    await page.getByRole('textbox',{name:'Zusätzliche Ferienbezeichnungen',exact:true}).blur();
    assert.deepEqual(await page.evaluate(()=>document.querySelector('stundenplan-card-editor')._config.holiday_extra_titles),['freier schultag','herbstferien bw']);
    await page.evaluate(async()=>{
      holidayCard.setConfig({...holidayConfig,holiday_calendar_entity:''});await settleHoliday();
    });
    assert.equal(await page.locator('stundenplan-card .holidayBanner').count(),0);
    assert.equal(await page.locator('stundenplan-card .holidayDay').count(),0);
    assert((await page.locator('stundenplan-card .datedNote').allTextContents()).includes('Lokaler Hinweis'));
    if(process.env.HOLIDAY_SCREENSHOT_DIR) {
      require('node:fs').mkdirSync(process.env.HOLIDAY_SCREENSHOT_DIR,{recursive:true});
      await page.evaluate(async()=>{
        document.querySelector('#editor').style.width='680px';
        holidayCard.style.color='#eee';
        holidayCard.style.setProperty('--primary-text-color','#eee');
        holidayCard.style.setProperty('--secondary-background-color','#292929');
        holidayCard.style.setProperty('--card-background-color','#1c1c1c');
        holidayCard.setConfig(holidayConfig);await settleHoliday();
        document.querySelector('stundenplan-card-editor').remove();
      });
      await page.locator('stundenplan-card').screenshot({path:path.join(process.env.HOLIDAY_SCREENSHOT_DIR,'holiday-preview.png')});
    }
    assert.deepEqual(errors,[]);
    console.log('Holiday browser checks passed: rolling dates, empty source, navigation, calendar coexistence, editor, offline and narrow layouts.');
  } finally {await page.close();}
};
