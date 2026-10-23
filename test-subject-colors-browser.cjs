const assert = require('node:assert/strict');

module.exports = async (browser, url) => {
  const page = await browser.newPage({viewport:{width:1000,height:950}});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    const RealDate = Date;
    window.Date = class extends RealDate {
      constructor(...args) { super(...(args.length ? args : ['2026-10-16T08:00:00'])); }
      static now() { return new RealDate('2026-10-16T08:00:00').getTime(); }
    };
  });
  try {
    await page.goto(url);
    await page.evaluate(async () => {
      await customElements.whenDefined('stundenplan-card');
      window.colorRows = [
        {time:'1.',start:'07:45',end:'08:30',cells:['M\n204\nABC','D','M ❌','D\nM','M']},
        {time:'2.',start:'08:35',end:'09:20',cells:['M\n204\nABC','D','M\n204\nABC\n\nD\n205\nDEF','','M']},
        {break:true,time:'09:20-09:40',label:'Pause'}
      ];
      window.makeColorCard = async (source, patch = {}) => {
        const card = document.createElement('stundenplan-card');
        const config = {type:'custom:stundenplan-card',source_type:source,rows:colorRows,
          days:['Mo','Di','Mi','Do','Fr'],source_entity:'sensor.demo',source_attribute:'plan',
          json_url:'/fixture',highlight_today:false,highlight_current:false,
          subject_colors:[{subject:'m',background:'rgba(0, 100, 200, 0.25)',color:'#ffffff'},
            {subject:'D',background:'#ffcc00',color:'#112233'}],...patch};
        if(source==='json') {card._jsonRows=colorRows;card._jsonStatus='loaded';card._jsonUrlLast=config.json_url;}
        card.setConfig(config);
        card.hass={states:{'sensor.demo':{state:'ok',attributes:{plan:colorRows,
          meta:{days:['20261012','20261013','20261014','20261015','20261016']}}}}};
        document.querySelector('#editor').replaceChildren(card);window.colorCard=card;
        await card.updateComplete;await card.updateComplete;
        return card;
      };
    });
    for (const source of ['manual','sensor','entity','json']) {
      const result = await page.evaluate(async source => {
        const original=JSON.stringify(colorRows);
        const card=await makeColorCard(source);
        const cells=[...card.shadowRoot.querySelectorAll('tbody tr:first-child td:not(.time)')];
        const read=el=>({bg:el.style.background,color:el.style.color});
        const values={cells:cells.map(read),blocks:[...card.shadowRoot.querySelectorAll('.subjectColorBlock')].map(read),
          breakColored:!!card.shadowRoot.querySelector('tr.break [style*="100, 200"]')};
        card.setConfig({...card.config,merge_double_lessons:true});await card.updateComplete;
        values.span=card.shadowRoot.querySelector('tbody td:not(.time)').rowSpan;
        card.setConfig({...card.config,view_mode:'rolling',days_ahead:6});await card.updateComplete;
        values.rolling=card.shadowRoot.querySelector('tbody td:not(.time)').style.background;
        card._uiPopupOpen=true;card.requestUpdate();await card.updateComplete;
        values.popup=card.shadowRoot.querySelector('.popupCard tbody td:not(.time)').style.background;
        values.unchanged=original===JSON.stringify(colorRows);
        return values;
      },source);
      assert.equal(result.cells[0].bg,'rgba(0, 100, 200, 0.25)',source);
      assert.equal(result.cells[1].bg,'rgb(255, 204, 0)',source);
      assert.equal(result.cells[2].bg,result.cells[0].bg,'Status markers must retain subject color');
      assert.equal(result.cells[3].bg,result.cells[1].bg,'Teacher text must not select the rule');
      assert.deepEqual(result.blocks.map(x=>x.bg),['rgba(0, 100, 200, 0.25)','rgb(255, 204, 0)']);
      assert.equal(result.span,2);assert(result.rolling);assert(result.popup);assert(result.unchanged);
      assert.equal(result.breakColored,false);
    }
    const priorities=await page.evaluate(async()=>{
      const card=await makeColorCard('manual',{rows:[{...colorRows[0],cell_styles:[{bg:'rgb(5, 6, 7)',color:'red'}]}],
        highlight_today:true,highlight_current_text:true,highlight_current_text_color:'#00ff00'});
      const cells=[...card.shadowRoot.querySelectorAll('tbody td:not(.time)')];
      const result={manual:cells[0].style.background,manualText:cells[0].style.color,
        current:cells[4].style.color,today:getComputedStyle(cells[4]).boxShadow};
      card.setConfig({...card.config,subject_colors:[{subject:'M',background:'red;position:fixed',color:'url(https://invalid.test)'}]});await card.updateComplete;
      result.unsafe=card.shadowRoot.querySelector('tbody td:last-child').style.background;
      card.setConfig({...card.config,rows:colorRows,subject_colors:[{subject:'Sport',background:'#abcdef'}],
        dated_entries:[{date:'2026-10-16',subject:'M',action:'replace',text:'Sport',periods:[1]}]});await card.updateComplete;
      result.replacement=card.shadowRoot.querySelector('tbody td:last-child').style.background;
      return result;
    });
    assert.equal(priorities.manual,'rgb(5, 6, 7)');assert.equal(priorities.manualText,'red');
    assert.equal(priorities.current,'rgb(0, 255, 0)');assert.notEqual(priorities.today,'none');
    assert.equal(priorities.unsafe,'');assert.equal(priorities.replacement,'rgb(171, 205, 239)');
    await page.evaluate(async()=>{
      window.colorEditor=document.createElement('stundenplan-card-editor');
      colorEditor.setConfig({type:'custom:stundenplan-card',rows:colorRows});colorEditor._open={colors:true};
      document.querySelector('#editor').replaceChildren(colorEditor);await colorEditor.updateComplete;
      colorEditor.addEventListener('config-changed',event=>window.savedColorConfig=event.detail.config);
    });
    const editor=page.locator('stundenplan-card-editor');
    await editor.getByText('Farben pro Fach',{exact:true}).click();
    await editor.getByRole('button',{name:'+ Fachfarbe hinzufügen',exact:true}).click();
    await editor.getByLabel('Fach für Farbe',{exact:true}).fill('M');
    await editor.getByLabel('Fach für Farbe',{exact:true}).press('Tab');
    await editor.getByRole('button',{name:'Hintergrund: Blau',exact:true}).click();
    await editor.getByRole('button',{name:'Text: Dunkel',exact:true}).click();
    const persisted=await page.evaluate(async()=>{
      colorEditor.setSourceType('entity');await colorEditor.updateComplete;
      const config=JSON.parse(JSON.stringify(savedColorConfig));
      colorEditor.setConfig(config);await colorEditor.updateComplete;return colorEditor._config.subject_colors;
    });
    assert.equal(persisted[0].subject,'M');assert.equal(persisted[0].background,'rgba(3, 169, 244, 0.25)');
    assert.equal(persisted[0].color,'rgba(33, 33, 33, 1)');
    for (const width of [320,440]) {
      await page.evaluate(width=>document.querySelector('#editor').style.width=width+'px',width);
      assert(await editor.locator('.subjectColorRule').evaluate(el=>el.scrollWidth<=el.clientWidth+1));
    }
    await editor.getByRole('button',{name:'Fachfarbe entfernen',exact:true}).click();
    assert.equal(await page.evaluate(()=>savedColorConfig.subject_colors.length),0);
    assert.deepEqual(errors,[]);
    console.log('Subject colors passed: sources, status markers, independent groups, merges, rolling, popup, overrides, safe CSS and editor persistence.');
  } finally { await page.close(); }
};
