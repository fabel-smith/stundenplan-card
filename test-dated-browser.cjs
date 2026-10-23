const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

module.exports = async function testDatedEntries(browser, url) {
  const page = await browser.newPage({viewport:{width:1000,height:950}});
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(()=>{
    const RealDate=Date;
    window.Date=class extends RealDate {
      constructor(...args){super(...(args.length?args:['2026-10-16T08:40:00']));}
      static now(){return new RealDate('2026-10-16T08:40:00').getTime();}
    };
  });
  try {
    await page.goto(url);
    await page.evaluate(async()=>{
      await customElements.whenDefined('stundenplan-card');
      window.rules=[
        {dates:['2026-10-16','2026-11-06'],subject:'BSC',action:'replace',text:'Schwimmen',periods:['1','2']},
        {date:'2026-10-23',subject:'BSC',action:'replace',text:'Sport',periods:[1,2]},
        {date:'2026-10-16',subject:'BSC',text:'Schwimmsachen mitbringen'},
      ];
      window.rows=[
        {time:'1.',start:'07:45',end:'08:30',cells:['D','D','D','D',"BSC\nSH3\n'Kit"]},
        {time:'2.',start:'08:35',end:'09:20',cells:['D','D','D','D',"BSC\nSH3\n'Kit"]},
        {break:true,time:'09:20-09:40',label:'Pause'},
        {time:'3.',start:'09:40',end:'10:25',cells:['M','M','M','M','M']},
      ];
      window.makeCard=async(source_type,patch={})=>{
        const card=document.createElement('stundenplan-card');
        const cfg={type:'custom:stundenplan-card',source_type,rows,days:['Mo','Di','Mi','Do','Fr'],
          source_entity:'sensor.demo',source_attribute:'rows_table',source_time_key:'time',json_url:'/fixture',
          merge_double_lessons:true,dated_entries:rules,view_mode:'rolling',days_ahead:6,show_header_date:true,...patch};
        if(source_type==='json'){card._jsonRows=rows;card._jsonStatus='loaded';card._jsonUrlLast=cfg.json_url;}
        card.setConfig(cfg);
        card.hass={states:{'sensor.demo':{state:'ok',attributes:{rows_table:rows,
          meta:{days:['20261012','20261013','20261014','20261015','20261016']}}}}};
        document.querySelector('#editor').replaceChildren(card);window.card=card;
        await card.updateComplete;await card.updateComplete;
        return card;
      };
    });
    for(const source of ['manual','sensor','entity','json']) {
      const result=await page.evaluate(async source=>{
        const original=JSON.stringify(rows);
        const card=await makeCard(source);
        const cells=[...card.shadowRoot.querySelectorAll('tbody tr:first-child td:not(.time)')];
        const today=cells[0],future=cells[5];
        const rolling={today:today.textContent,future:future.textContent,todaySpan:today.rowSpan,futureSpan:future.rowSpan,
          noteCount:today.querySelectorAll('.datedNote').length,futureNoteCount:future.querySelectorAll('.datedNote').length,
          unchanged:original===JSON.stringify(rows)};
        card.setConfig({...card.config,view_mode:'week'});await card.updateComplete;
        rolling.week=card.shadowRoot.querySelector('tbody tr:first-child td:last-child').textContent;
        card._uiPopupOpen=true;card.requestUpdate();await card.updateComplete;
        rolling.popup=card.shadowRoot.querySelector('.popupCard').textContent;
        return rolling;
      },source);
      assert(result.today.includes('Schwimmen')&&result.today.includes("'Kit")&&result.today.includes('SH3'),source);
      assert(result.future.includes('Sport')&&!result.future.includes('Schwimmen'),source);
      assert.equal(result.todaySpan,2);assert.equal(result.futureSpan,2);
      assert.equal(result.noteCount,1);assert.equal(result.futureNoteCount,0);
      assert.equal(result.unchanged,true);
      assert(result.week.includes('Schwimmen'));assert(result.popup.includes('Schwimmen'));
      await page.evaluate(async()=>{card.closeWeekPopup();await card.updateComplete;});
      const dashboard=page.locator('stundenplan-card').first();
      await dashboard.locator('tbody td:not(.time)').first().hover();
      assert.equal(await dashboard.locator('td[title], .datedNote[title]').count(),0,'No editor tooltips on the dashboard');
    }
    const edges=await page.evaluate(async()=>{
      const card=await makeCard('manual',{view_mode:'week'});
      const texts=()=>[...card.shadowRoot.querySelectorAll('tbody tr:not(.break)')].map(tr=>tr.lastElementChild.textContent);
      const values={};
      card.setConfig({...card.config,dated_entries:[...rules,{date:'2026-10-16',subject:'BSC',text:'Nur zweite Stunde',periods:[2]}]});
      await card.updateComplete;
      values.split=[...card.shadowRoot.querySelectorAll('tbody tr:first-child td')].at(-1).rowSpan;
      values.second=texts()[1];
      card.setConfig({...card.config,hidden_subjects:['Schwimmen','M'],view_mode:'rolling',days_ahead:0});
      await card.updateComplete;
      values.empty=card.shadowRoot.querySelector('tbody').textContent;
      values.end=card.getLastLessonEnd(card.config,new Date(2026,9,16));
      card.setConfig({...card.config,hidden_subjects:[],dated_entries:rules,
        rows:[{...rows[0],cells:['','','','','BSC\nEntfällt']},{...rows[1],cells:['','','','','BSC\nVertretung']} ]});
      await card.updateComplete;
      values.cancel=texts();
      card.setConfig({...card.config,rows,dated_entries:rules,hidden_subjects:['Schwimmen'],free_only_column_highlight:true,
        highlight_current:true,highlight_current_time_text:true,highlight_current_time_text_color:'#ff0000'});
      await card.updateComplete;
      values.filteredTime=card.shadowRoot.querySelectorAll('tbody tr')[1].querySelector('.time').getAttribute('style');
      card.setConfig({...card.config,rows,dated_entries:[...rules,{date:'2026-10-16',subject:'BSC',action:'replace',text:'Sport'}]});
      await card.updateComplete;values.conflict=texts()[0];
      card.setConfig({...card.config,dated_entries:[{date:'2026-10-16',subject:'BSC',text:'<img src=x onerror=alert(1)>'}]});
      await card.updateComplete;
      values.htmlText=card.shadowRoot.querySelector('.datedNote').textContent;
      values.images=card.shadowRoot.querySelectorAll('img').length;
      // Manual A/B must match the source for the actual date before applying a rule.
      card.setConfig({...card.config,view_mode:'rolling',days_ahead:6,dated_entries:rules,week_mode:'kw_parity',week_a_is_even_kw:true,
        rows_b:rows.map(row=>row.break?row:{...row,cells:row.cells.map(()=> 'Kunst')})});
      await card.updateComplete;
      values.ab=card.shadowRoot.querySelector('tbody tr:first-child').lastElementChild.previousElementSibling.textContent;
      return values;
    });
    assert.equal(edges.split,1);assert(edges.second.includes('Nur zweite Stunde'));
    assert(edges.empty.includes('Keine Einträge nach Filterung'));assert.equal(edges.end,'');
    assert(edges.cancel.every(text=>text.includes('BSC')&&!text.includes('Schwimmen\n')));
    assert(!edges.filteredTime.includes('color:#ff0000')&&!edges.filteredTime.includes('box-shadow'));
    assert(edges.conflict.includes('BSC')&&edges.conflict.includes('Widersprüchliche'));
    assert.equal(edges.images,0);assert.equal(edges.htmlText,'<img src=x onerror=alert(1)>');
    assert(edges.ab.includes('Kunst')&&!edges.ab.includes('Sport'));
    const noteColors=await page.evaluate(async()=>{
      const note={date:'2026-10-16',subject:'BSC',text:'Diktat',color:'#212121',background:'rgba(255, 235, 59, 0.5)'};
      const card=await makeCard('entity',{view_mode:'week',dated_entries:[note,note]});
      const read=()=>{
        const el=card.shadowRoot.querySelector('.datedNote');
        return {color:getComputedStyle(el).color,background:getComputedStyle(el).backgroundColor,
          style:el.getAttribute('style'),parentStyle:el.parentElement.getAttribute('style'),
          count:el.parentElement.querySelectorAll('.datedNote').length,span:el.parentElement.rowSpan};
      };
      const styled=read();
      card.setConfig({...card.config,dated_entries:[{...note,periods:[1]},{...note,periods:[2],background:'#f44336'}]});
      await card.updateComplete;const split=read();
      card.setConfig({...card.config,dated_entries:[{...note,color:'red;position:fixed',background:'url(https://invalid.example/x)'}]});
      await card.updateComplete;const unsafe=read();
      card.setConfig({...card.config,dated_entries:[],dated_entries_entity:'sensor.events'});
      card.hass={states:{...card.hass.states,'sensor.events':{state:'ok',attributes:{entries:[{...note,color:'transparent',background:'#12345680'}]}}}};
      await card.updateComplete;await card.updateComplete;const external=read();
      card.setConfig({...card.config,dated_entries_entity:'',dated_entries:[{...note,color:'',background:''}]});
      await card.updateComplete;const reset=read();
      return {styled,split,unsafe,external,reset};
    });
    assert.equal(noteColors.styled.color,'rgb(33, 33, 33)');
    assert.equal(noteColors.styled.background,'rgba(255, 235, 59, 0.5)');
    assert.equal(noteColors.styled.count,1);assert.equal(noteColors.styled.span,2);
    assert(!noteColors.styled.parentStyle.includes('255, 235, 59'));
    assert.equal(noteColors.split.span,1);
    assert.equal(noteColors.unsafe.style,'');assert.equal(noteColors.reset.style,'');
    assert.equal(noteColors.external.color,'rgba(0, 0, 0, 0)');
    assert.match(noteColors.external.background,/^rgba\(18, 52, 86, 0\.5(?:02)?\)$/);
    const live=await page.evaluate(async()=>{
      const card=await makeCard('entity',{view_mode:'week',dated_entries:[],dated_entries_entity:'sensor.events'});
      const states=card.hass.states;
      const capture=()=>({text:card.shadowRoot.querySelector('tbody').textContent,warnings:card.shadowRoot.querySelectorAll('.datedWarning').length});
      const results=[capture()];
      for(const [state,entries] of [['ok',rules],['ok',[]],['unavailable',rules],['ok','broken'],['ok',JSON.stringify(rules)]]) {
        card.hass={states:{...states,'sensor.events':{state,attributes:{entries}}}};
        await card.updateComplete;await card.updateComplete;results.push(capture());
      }
      // Sensor meta dates, not today's calendar week, control a browsed source week.
      card.hass={states:{...card.hass.states,'sensor.demo':{state:'ok',attributes:{rows_table:rows,
        meta:{days:['20261019','20261020','20261021','20261022','20261023']}}}}};
      await card.updateComplete;await card.updateComplete;results.push(capture());
      return results;
    });
    assert.equal(live[0].warnings,1);assert(!live[0].text.includes('Schwimmen'));
    assert(live[1].text.includes('Schwimmen'));assert.equal(live[1].warnings,0);
    assert(!live[2].text.includes('Schwimmen'));assert.equal(live[2].warnings,0);
    assert(!live[3].text.includes('Schwimmen'));assert.equal(live[3].warnings,1);
    assert.equal(live[4].warnings,1);assert(live[5].text.includes('Schwimmen'));
    assert(live[6].text.includes('Sport')&&!live[6].text.includes('Schwimmen'));

    const boundary=await page.evaluate(async()=>{
      const card=await makeCard('entity',{view_mode:'week',dated_entries:[{date:'2027-01-01',subject:'BSC',text:'Neujahrshinweis'}]});
      card.hass={states:{'sensor.demo':{state:'ok',attributes:{rows_table:rows,
        meta:{days:['20261228','20261229','20261230','20261231','20270101']}}}}};
      await card.updateComplete;await card.updateComplete;
      return card.shadowRoot.querySelector('tbody').textContent;
    });
    assert(boundary.includes('Neujahrshinweis'));

    // Date/period notes survive missing subjects, trimming and limited coverage.
    for (const source of ['manual','sensor','entity','json']) {
      const slots=await page.evaluate(async source=>{
        const cfg={view_mode:'week',trim_empty_rows:true,hidden_subjects:['M'],dated_entries:[
          {date:'2026-10-16',match:'period',periods:[3],text:'Arbeit ohne Fach'},
          {date:'2026-10-23',match:'period',periods:[2],text:'Zukünftige Arbeit'},
          {date:'2026-10-15',match:'period',periods:[2],text:'Vergangene Arbeit'}]};
        const card=await makeCard(source,cfg);
        const originalEntries=JSON.stringify(card.config.dated_entries);
        const hiddenByDefault=!card.shadowRoot.querySelector('.upcomingNotes');
        card.setConfig({...card.config,show_upcoming_notes:true});await card.updateComplete;
        const result={cell:card.shadowRoot.querySelector('tbody').textContent,
          hiddenByDefault,
          pending:card.shadowRoot.querySelector('.upcomingNotes')?.textContent};
        card.setConfig({...card.config,show_upcoming_notes:false});await card.updateComplete;
        result.hiddenWhenOff=!card.shadowRoot.querySelector('.upcomingNotes');
        result.cellWhenOff=card.shadowRoot.querySelector('tbody').textContent;
        result.entriesUnchanged=originalEntries===JSON.stringify(card.config.dated_entries);
        card.setConfig({...card.config,view_mode:'rolling',show_upcoming_notes:true});await card.updateComplete;
        result.rolling=card.shadowRoot.querySelector('tbody').textContent;
        result.pendingRolling=card.shadowRoot.querySelector('.upcomingNotes')?.textContent||'';
        return result;
      },source);
      assert(slots.cell.includes('Arbeit ohne Fach'),source);
      assert(slots.hiddenByDefault&&slots.hiddenWhenOff&&slots.entriesUnchanged,source);
      assert(slots.cellWhenOff.includes('Arbeit ohne Fach'),source);
      assert(slots.pending.includes('Zukünftige Arbeit')&&slots.pending.includes('23.10.2026'),source);
      assert(slots.pending.includes('Anstehende Termine'),source);
      assert(!slots.pending.includes('Noch nicht geladener Unterricht'),source);
      assert(!slots.pending.includes('Vergangene Arbeit'),source);
      assert(slots.rolling.includes('Zukünftige Arbeit'),source);
      assert(!slots.pendingRolling.includes('Zukünftige Arbeit'),source);
    }

    await page.evaluate(async()=>{
      window.editor=document.createElement('stundenplan-card-editor');
      editor.setConfig({type:'custom:stundenplan-card',source_type:'entity',source_entity:'sensor.demo'});
      editor._open={dates:true,replacements:true};
      document.querySelector('#editor').replaceChildren(editor);await editor.updateComplete;
      editor.addEventListener('config-changed',event=>window.savedDates=JSON.parse(JSON.stringify(event.detail.config)));
    });
    const section=page.locator('[data-section="dates"]');
    const replacements=page.locator('[data-section="replacements"]');
    const toggleState=await section.getByText('Anstehende Termine unter der Tabelle anzeigen',{exact:true}).evaluate(el=>el.parentElement.querySelector('ha-switch').checked);
    assert.equal(toggleState,false);
    await section.getByText('Anstehende Termine unter der Tabelle anzeigen',{exact:true}).evaluate(el=>{
      const toggle=el.parentElement.querySelector('ha-switch');toggle.checked=true;toggle.dispatchEvent(new Event('change',{bubbles:true}));
    });
    assert.equal(await page.evaluate(()=>editor._config.show_upcoming_notes),true);
    await page.evaluate(async()=>{editor.setConfig(JSON.parse(JSON.stringify(editor._config)));await editor.updateComplete;});
    assert.equal(await section.getByText('Anstehende Termine unter der Tabelle anzeigen',{exact:true}).evaluate(el=>el.parentElement.querySelector('ha-switch').checked),true);
    assert((await section.textContent()).includes('Klicke auf „+ Termin hinzufügen“ oder auf ein Fach in der Vorschau'));
    assert((await replacements.textContent()).includes('Wähle die Tage'));
    await section.getByRole('button',{name:'+ Termin hinzufügen',exact:true}).click();
    for(let click=0;click<3;click++) {
      await replacements.getByRole('button',{name:'+ Abweichung hinzufügen',exact:true}).click();
    }
    assert.equal(await replacements.locator('.datedEntry').count(),1,'Reuse the replacement draft');
    assert.equal(await section.locator('.datedEntry').count(),1,'Keep the independent note draft');
    assert.deepEqual(await page.evaluate(()=>editor._config.dated_entries??[]),[]);
    await replacements.getByRole('button',{name:'Entwurf verwerfen',exact:true}).click();
    assert.equal(await replacements.locator('.datedEntry').count(),0);
    assert.equal(await section.locator('.datedEntry').count(),1);
    await section.getByRole('button',{name:'Entwurf verwerfen',exact:true}).click();
    await replacements.getByRole('button',{name:'+ Abweichung hinzufügen',exact:true}).click();
    let entry=replacements.locator('.datedEntry').first();
    assert.equal(await entry.getByLabel('Aktion',{exact:true}).count(),0);
    assert.equal(await section.locator('.datedEntry').count(),0);
    await entry.getByLabel('Ursprüngliches Fach',{exact:true}).fill('BSC');
    await entry.getByLabel('Neuer Fachname',{exact:true}).fill('Schwimmen');
    await entry.getByLabel('Stunden (optional)',{exact:true}).fill('1, 2');
    await entry.getByLabel('Datum auswählen',{exact:true}).fill('2026-10-16');
    assert.deepEqual(await page.evaluate(()=>editor._config.dated_entries??[]),[],'Incomplete replacement must not be saved');
    await entry.getByRole('button',{name:'Datum hinzufügen',exact:true}).click();
    await entry.getByLabel('Datum auswählen',{exact:true}).fill('2026-11-06');
    await entry.getByRole('button',{name:'Datum hinzufügen',exact:true}).click();
    const saved=await page.evaluate(()=>window.savedDates);
    assert.deepEqual(saved.dated_entries,[{action:'replace',subject:'BSC',text:'Schwimmen',dates:['2026-10-16','2026-11-06'],periods:'1, 2'}]);
    assert.equal(await entry.locator('.datedColors').count(),0);
    await section.getByRole('button',{name:'+ Termin hinzufügen',exact:true}).click();
    entry=section.locator('.datedEntry').first();
    assert.equal(await entry.getByLabel('Ursprüngliches Fach',{exact:true}).count(),0);
    await entry.getByLabel('Unterrichtsstunden',{exact:true}).fill('1, 2');
    await entry.getByLabel('Termin / Hinweis',{exact:true}).fill('Diktat');
    await entry.getByLabel('Termine (JJJJ-MM-TT, mit Komma getrennt)',{exact:true}).fill('2026-10-16');
    await entry.getByLabel('Termine (JJJJ-MM-TT, mit Komma getrennt)',{exact:true}).press('Tab');
    await page.waitForFunction(()=>editor._config.dated_entries.length===2);
    await entry.getByText('Hinweisfarben (optional)',{exact:true}).click();
    await entry.getByRole('button',{name:'Hinweis: Hintergrund: Gelb',exact:true}).click();
    await entry.getByRole('button',{name:'Hinweis: Text: Dunkel',exact:true}).click();
    await entry.getByRole('slider',{name:'Hinweis: Hintergrund: Transparenz',exact:true}).fill('50');
    const coloredConfig=await page.evaluate(()=>window.savedDates);
    assert.equal(coloredConfig.dated_entries[1].background,'rgba(255, 235, 59, 0.5)');
    assert.equal(coloredConfig.dated_entries[1].color,'rgba(33, 33, 33, 1)');
    assert.deepEqual(coloredConfig.dated_entries[0],saved.dated_entries[0]);
    assert.equal(coloredConfig.dated_entries[1].action,'note');
    assert.equal(await entry.evaluate(el=>el.open),true);
    for(const width of [320,440]) for(const light of [false,true]) {
      await page.evaluate(({width,light})=>{
        document.querySelector('#editor').style.width=width+'px';
        editor.style.setProperty('--primary-text-color',light?'#202020':'#eeeeee');
        editor.style.setProperty('--card-background-color',light?'#ffffff':'#1c1c1c');
        editor.style.setProperty('--secondary-background-color',light?'#eeeeee':'#292929');
        editor.style.setProperty('--divider-color',light?'#cccccc':'#444444');
      },{width,light});
      assert.equal(await section.evaluate(section=>{
        const bounds=section.getBoundingClientRect();
        return [...section.querySelectorAll('input,select,textarea,button')].filter(el=>el.getBoundingClientRect().width>0).every(el=>{
          const box=el.getBoundingClientRect();return box.right<=bounds.right+1&&box.left>=bounds.left-1;
        });
      }),true,'Dated editor must fit '+width+'px');
      assert.equal(await entry.locator('.opacityControl').first().evaluate(el=>getComputedStyle(el).display),'flex');
      assert.equal(await entry.locator(':scope > summary .datedRemove').evaluate(el=>{
        const button=el.getBoundingClientRect(),text=el.parentElement.querySelector('.datedMeta').getBoundingClientRect();
        return button.width>=40&&button.height>=40&&text.right<=button.left;
      }),true,'Remove button must not overlap the date summary');
      assert(await entry.locator('input[type="color"]').first().evaluate(el=>el.getBoundingClientRect().width<=40));
      if(process.env.EDITOR_SCREENSHOT_DIR){
        fs.mkdirSync(process.env.EDITOR_SCREENSHOT_DIR,{recursive:true});
        await section.screenshot({path:path.join(process.env.EDITOR_SCREENSHOT_DIR,`dated-${width}-${light?'light':'dark'}.png`)});
      }
    }
    await page.evaluate(async()=>{editor.setConfig(window.savedDates);await editor.updateComplete;});
    assert.deepEqual(await page.evaluate(()=>editor._config.dated_entries),coloredConfig.dated_entries);
    await entry.getByRole('group',{name:'Hinweis: Hintergrund',exact:true}).getByRole('button',{name:'Zurücksetzen',exact:true}).click();
    assert.equal(await page.evaluate(()=>editor._config.dated_entries[1].background),'');
    assert.equal(await page.evaluate(()=>editor._config.dated_entries[1].color),'rgba(33, 33, 33, 1)');
    await entry.getByRole('group',{name:'Hinweis: Text',exact:true}).getByRole('button',{name:'Zurücksetzen',exact:true}).click();
    assert.equal(await page.evaluate(()=>editor._config.dated_entries[1].color),'');
    // Deleting the filtered note must not delete the replacement at index zero.
    assert.equal(await entry.locator('.datedFields > button').filter({hasText:'Eintrag entfernen'}).count(),0);
    await entry.locator(':scope > summary').click();
    assert.equal(await entry.evaluate(el=>el.open),false);
    const removeNote=entry.locator(':scope > summary').getByRole('button',{name:'Eintrag entfernen',exact:true});
    assert.equal(await removeNote.isVisible(),true);
    assert.equal(await removeNote.getAttribute('title'),'Diktat entfernen');
    await removeNote.press('Enter');
    assert.deepEqual(await page.evaluate(()=>editor._config.dated_entries),saved.dated_entries);
    await page.evaluate(async saved=>{editor.setConfig(saved);await editor.updateComplete;},saved);
    entry=replacements.locator('.datedEntry').first();
    await entry.locator('summary').click();
    assert.deepEqual(await page.evaluate(()=>editor._config.dated_entries),saved.dated_entries);
    // Hide the advanced source controls without losing existing YAML settings.
    await page.evaluate(async()=>{
      editor.setConfig({...editor._config,dated_entries_entity:'sensor.events',dated_entries_attribute:'school_events'});
      await editor.updateComplete;
    });
    assert.equal(await section.locator('.datedSource').count(),0);
    assert.equal(await section.getByText('Zusätzliche Terminquelle (optional)',{exact:true}).count(),0);
    assert.equal(await section.getByLabel('Termin-Sensor',{exact:true}).count(),0);
    await entry.getByLabel('Aktiv',{exact:true}).uncheck();
    assert.equal(await page.evaluate(()=>editor._config.dated_entries[0].enabled),false);
    assert.deepEqual(await page.evaluate(()=>({entity:editor._config.dated_entries_entity,attribute:editor._config.dated_entries_attribute})),
      {entity:'sensor.events',attribute:'school_events'});
    await entry.getByRole('button',{name:'Eintrag entfernen',exact:true}).click();
    assert.equal(await replacements.locator('.datedEntry').count(),0);
    // Old notes without action stay in the note section; accordion state is independent.
    await page.evaluate(async()=>{
      editor.setConfig({type:'custom:stundenplan-card',dated_entries:[
        {date:'2026-10-16',subject:'D',text:'Diktat'},
        {date:'2026-10-16',subject:'BSC',text:'Schwimmen',action:'replace'}]});
      await editor.updateComplete;
    });
    assert.equal(await section.locator('.datedEntry').count(),1);
    assert.equal(await replacements.locator('.datedEntry').count(),1);
    await section.locator('.sectionHead').click();
    assert.equal(await section.locator('.sectionHead').getAttribute('aria-expanded'),'false');
    assert.equal(await replacements.locator('.sectionHead').getAttribute('aria-expanded'),'true');
    const historyConfig=await page.evaluate(async()=>{
      editor._open={dates:true,replacements:true};
      const config={type:'custom:stundenplan-card',dated_entries:[
        {date:'2026-10-15',subject:'D',text:'Altes Diktat',color:'#ff0000'},
        {date:'2026-10-15',subject:'BSC',text:'Schwimmen',action:'replace'},
        {date:'2026-10-16',subject:'D',text:'Heute'},
        {dates:['2026-10-01','2026-10-23'],subject:'D',text:'Mehrere Termine'},
        {dates:['2026-10-01','invalid'],subject:'D',text:'Korrigieren'}]};
      editor.setConfig(config);await editor.updateComplete;
      return JSON.parse(JSON.stringify(editor._config));
    });
    const history=section.locator('.pastDatedEntries');
    assert.equal(await history.evaluate(el=>el.open),false);
    assert.equal(await replacements.locator('.pastDatedEntries').evaluate(el=>el.open),false);
    assert.equal(await history.locator('.datedEntry').count(),1);
    assert.equal(await section.locator('.sectionBody > .datedEntry').count(),3);
    assert.deepEqual(await page.evaluate(()=>editor._config),historyConfig);
    await history.locator(':scope > summary').click();
    const oldNote=history.locator('.datedEntry');
    await oldNote.locator('summary').first().click();
    assert.equal(await oldNote.getByText('Leer lassen = alle Stunden des gewählten Fachs. Für einzelne Unterrichtsstunden z. B. 1, 2 eintragen.',{exact:true}).isVisible(),true);
    await oldNote.getByLabel('Termine (JJJJ-MM-TT, mit Komma getrennt)',{exact:true}).fill('2026-10-23');
    await oldNote.getByLabel('Termine (JJJJ-MM-TT, mit Komma getrennt)',{exact:true}).press('Tab');
    assert.equal(await history.count(),0);
    assert.equal(await section.locator('.sectionBody > .datedEntry').count(),4);
    assert.equal(await page.evaluate(()=>editor._config.dated_entries[0].color),'#ff0000');
    assert.deepEqual(await page.evaluate(()=>editor._config.dated_entries.slice(1)),historyConfig.dated_entries.slice(1));
    const oldReplacement=replacements.locator('.pastDatedEntries');
    await oldReplacement.locator(':scope > summary').click();
    await oldReplacement.locator('.datedEntry > summary').click();
    await oldReplacement.getByRole('button',{name:'Eintrag entfernen',exact:true}).click();
    assert.equal(await page.evaluate(()=>editor._config.dated_entries.length),4);
    assert.equal(await page.evaluate(()=>editor._config.dated_entries[0].text),'Altes Diktat');
    assert.equal(await page.evaluate(()=>editor._config.dated_entries.some(entry=>entry.action==='replace')),false);
    // Midnight refresh changes only the view, never stored configuration.
    const rollover=await page.evaluate(async()=>{
      editor.setConfig({type:'custom:stundenplan-card',dated_entries:[{date:'2026-10-16',subject:'D',text:'Heute'}]});
      await editor.updateComplete;
      const before=JSON.stringify(editor._config),OriginalDate=window.Date;
      let events=0;const listener=()=>events++;
      editor.addEventListener('config-changed',listener);
      const timerActive=editor._datedDayTimer!==undefined;
      window.Date=class extends OriginalDate { constructor(...args){super(...(args.length?args:['2026-10-17T00:00:01']));} };
      try { editor.refreshDatedDay();await editor.updateComplete; }
      finally { window.Date=OriginalDate; }
      const past=editor.shadowRoot.querySelector('[data-section="dates"] .pastDatedEntries');
      const result={timerActive,archived:!!past,closed:!past?.open,unchanged:before===JSON.stringify(editor._config),events};
      editor.removeEventListener('config-changed',listener);
      editor.remove();result.timerCleared=editor._datedDayTimer===undefined;
      document.querySelector('#editor').append(editor);await editor.updateComplete;
      result.reconnected=editor._datedDayTimer!==undefined;
      return result;
    });
    assert.deepEqual(rollover,{timerActive:true,archived:true,closed:true,unchanged:true,events:0,timerCleared:true,reconnected:true});
    // Explicit legacy conversion preserves text, dates and colors, but removes subject matching.
    await page.evaluate(async()=>{
      editor.setConfig({type:'custom:stundenplan-card',dated_entries:[{date:'2026-10-16',subject:'D',text:'Diktat',periods:[2],color:'#ff0000'}]});
      editor._datedOpen=0;editor._open={dates:true};await editor.updateComplete;
    });
    await section.getByText('Bisherige Fachzuordnung: D',{exact:true}).click();
    await section.getByRole('button',{name:'Auf Datum und Stunde umstellen',exact:true}).click();
    assert.deepEqual(await page.evaluate(()=>editor._config.dated_entries[0]),
      {date:'2026-10-16',match:'period',text:'Diktat',periods:[2],color:'#ff0000'});
    assert.equal(await section.getByLabel('Ursprüngliches Fach',{exact:true}).count(),0);
    assert.match(await section.locator('.datedEntry > summary').innerText(),/Diktat\s+16\.10\.2026 · 2\. Stunde/);

    // Real pointer clicks through the preview event path, not direct helper calls.
    for (const source of ['manual','entity','sensor','json']) {
      await page.evaluate(async source=>{
        const card=await makeCard(source,{view_mode:'week',dated_entries:[],tap_action:{action:'toggle_view'}});
        document.querySelector('hui-dialog-edit-card')?.remove();
        const dialog=document.createElement('hui-dialog-edit-card');
        dialog.style.cssText='display:flex;width:960px;gap:20px';
        const root=dialog.attachShadow({mode:'open'});
        const editor=document.createElement('stundenplan-card-editor');editor.style.cssText='display:block;width:440px';
        card.style.cssText='display:block;width:440px';editor.setConfig(card.config);editor._open={dates:true};
        root.append(editor,card);document.body.append(dialog);
        editor.addEventListener('config-changed',event=>{clickFixture.changes++;card.setConfig(event.detail.config);});
        window.clickFixture={card,editor,dialog,changes:0};await editor.updateComplete;await card.updateComplete;
      },source);
      const preview=page.locator('hui-dialog-edit-card stundenplan-card');
      // Friday's merged first/second lessons: choose the lower physical row.
      const merged=preview.locator('tbody tr').first().locator('td').last();
      await merged.hover();
      assert.equal(await merged.getAttribute('title'),'Termin oder Hinweis hinzufügen');
      assert.equal(await page.evaluate(()=>clickFixture.changes),0,'Hover must not change config');
      if(source==='manual') {
        await page.evaluate(async()=>{clickFixture.editor._open.dates=false;clickFixture.editor.requestUpdate();await clickFixture.editor.updateComplete;});
        await preview.locator('th').first().hover();
        await merged.hover();
        assert.equal(await merged.getAttribute('title'),'Fach bearbeiten');
        await page.evaluate(async()=>{clickFixture.editor._open.dates=true;clickFixture.editor.requestUpdate();await clickFixture.editor.updateComplete;});
        await preview.locator('th').first().hover();
        await merged.hover();
        assert.equal(await merged.getAttribute('title'),'Termin oder Hinweis hinzufügen');
      }
      assert.equal(await preview.locator('tr.break td[title]').count(),0);
      const secondTime=preview.locator('tbody tr').nth(1).locator('td.time');
      await merged.scrollIntoViewIfNeeded();
      const rect=await merged.boundingBox(), lower=await secondTime.boundingBox();
      await page.mouse.click(rect.x+rect.width/2,lower.y+lower.height/2);
      const draft=await page.evaluate(()=>clickFixture.editor._datedDraftEntry);
      assert.deepEqual(draft,{action:'note',match:'period',text:'',dates:['2026-10-16'],periods:['2']},source);
      // Further clicks move the untouched draft rather than accumulating empty notes.
      for (const column of [3,2,1]) {
        await preview.locator('tbody tr').first().locator('td:not(.time)').nth(column).click();
        assert.equal(await page.evaluate(()=>clickFixture.editor._config.dated_entries.length),0,source);
        assert.equal(await page.evaluate(()=>clickFixture.changes),0,source);
      }
      // Simulate Home Assistant feeding the current config back to the editor.
      await page.evaluate(async()=>{const e=clickFixture.editor;e.setConfig(JSON.parse(JSON.stringify(e._config)));await e.updateComplete;});
      await merged.scrollIntoViewIfNeeded();
      const again=await merged.boundingBox(), againLower=await secondTime.boundingBox();
      await page.mouse.click(again.x+again.width/2,againLower.y+againLower.height/2);
      assert.deepEqual(await page.evaluate(()=>clickFixture.editor._config.dated_entries),[],source);
      assert.deepEqual(await page.evaluate(()=>clickFixture.editor._datedDraftEntry),draft,source);
      assert.equal(await page.locator('hui-dialog-edit-card stundenplan-card-editor [data-entry-index="-1"]').count(),1);
      assert.equal(await preview.locator('.datedWarning').count(),0);
      const persisted=await page.evaluate(async()=>{
        const editor=clickFixture.editor;
        editor.setValue('title','Changed while drafting');
        const saved=JSON.parse(JSON.stringify(editor._config));
        const reopened=document.createElement('stundenplan-card-editor');reopened.setConfig(saved);
        return {savedEntries:saved.dated_entries,reopenedEntries:reopened._config.dated_entries,hasDraft:!!reopened._datedDraftEntry};
      });
      assert.deepEqual(persisted,{savedEntries:[],reopenedEntries:[],hasDraft:false});
      assert.equal(await page.evaluate(()=>clickFixture.card._uiViewMode),null);
      const noteEditor=page.locator('hui-dialog-edit-card stundenplan-card-editor');
      await noteEditor.getByLabel('Termin / Hinweis',{exact:true}).fill('Klassenarbeit');
      await noteEditor.getByLabel('Termin / Hinweis',{exact:true}).press('Tab');
      assert.equal(await preview.locator('tbody .datedNote').count(),1);
      assert.equal(await preview.locator('tbody .datedNote').getAttribute('title'),'Hinweis bearbeiten');
      assert.equal(await preview.locator('tbody tr').nth(1).locator('.datedNote').innerText(),'Klassenarbeit');
      // Clicking an existing note edits it, with no config mutation or duplicate.
      const savedBeforeNoteClick=await page.evaluate(()=>JSON.stringify(clickFixture.editor._config));
      await preview.getByRole('button',{name:'Klassenarbeit',exact:true}).click();
      assert.equal(await page.evaluate(()=>JSON.stringify(clickFixture.editor._config)),savedBeforeNoteClick);
      assert.equal(await page.evaluate(()=>clickFixture.editor._datedOpen),0);
      await preview.getByRole('button',{name:'Klassenarbeit',exact:true}).press('Enter');
      assert.equal(await page.evaluate(()=>clickFixture.editor._config.dated_entries.length),1);
      const before=await page.evaluate(()=>JSON.stringify(clickFixture.editor._config));
      await preview.getByText('Pause',{exact:true}).click();
      assert.equal(await page.evaluate(()=>JSON.stringify(clickFixture.editor._config)),before);
      await preview.locator('tbody tr').first().locator('td:not(.time)').nth(3).click();
      assert.equal(await page.evaluate(()=>clickFixture.editor._config.dated_entries.length),1,source);
      assert.equal(await page.evaluate(()=>clickFixture.editor._config.dated_entries[0].text),'Klassenarbeit');
      // A partially configured (colored) draft must also be preserved.
      await page.evaluate(async()=>{const e=clickFixture.editor;e.updateDatedEntry(-1,{color:'#ff0000'});await e.updateComplete;await clickFixture.card.updateComplete;});
      await preview.locator('tbody tr').first().locator('td:not(.time)').nth(2).click();
      assert.equal(await page.evaluate(()=>clickFixture.editor._config.dated_entries.length),1,source);
      assert.equal(await page.evaluate(()=>clickFixture.editor._datedDraftEntry.color),'#ff0000');
      await noteEditor.getByRole('button',{name:'Entwurf verwerfen',exact:true}).click();
      assert.equal(await page.evaluate(()=>clickFixture.editor._datedDraftEntry),null);
      await page.evaluate(async()=>{
        const {card,editor}=clickFixture;
        const config={...editor._config,view_mode:'rolling',dated_entries:[],week_mode:'kw_parity',week_a_parity:'even',rows_b:rows};
        editor.setConfig(config);card.setConfig(config);await editor.updateComplete;await card.updateComplete;
      });
      await preview.locator('tbody tr').first().locator('td:not(.time)').nth(5).click();
      assert.deepEqual(await page.evaluate(()=>clickFixture.editor._datedDraftEntry.dates),['2026-10-23'],source);
      assert.equal(await page.evaluate(()=>clickFixture.editor._datedDraftEntry.match),'period');
      await page.evaluate(async()=>{
        const {card,editor}=clickFixture;
        const config={...editor._config,view_mode:'week',show_upcoming_notes:true,dated_entries:[
          {date:'2026-10-16',subject:'BSC',text:'Alter Hinweis'},
          {date:'2026-10-23',match:'period',periods:[2],text:'Spätere Arbeit'},
          {date:'2026-10-12',match:'period',periods:[3],text:'Alter Termin'}],dated_entries_entity:'sensor.events'};
        editor.setConfig(config);card.setConfig(config);
        card.hass={states:{...card.hass.states,'sensor.events':{state:'ok',attributes:{entries:[{date:'2026-10-16',subject:'BSC',text:'Externer Hinweis'}]}}}};
        await editor.updateComplete;await card.updateComplete;await card.updateComplete;
      });
      const existingNotes=await page.evaluate(()=>JSON.stringify(clickFixture.editor._config.dated_entries));
      await preview.getByRole('button',{name:'Alter Hinweis',exact:true}).first().click();
      assert.equal(await page.evaluate(()=>clickFixture.editor._datedOpen),0);
      await preview.getByRole('button',{name:/Spätere Arbeit/}).click();
      assert.equal(await page.evaluate(()=>clickFixture.editor._datedOpen),1);
      await preview.getByRole('button',{name:'Alter Termin',exact:true}).click();
      assert.equal(await page.evaluate(()=>clickFixture.editor._datedOpen),2);
      assert.equal(await noteEditor.locator('.pastDatedEntries').evaluate(el=>el.open),true);
      await preview.getByRole('button',{name:'Externer Hinweis',exact:true}).first().click();
      assert.equal(await page.evaluate(()=>clickFixture.editor._datedReadOnly),true);
      assert.equal(await page.evaluate(()=>JSON.stringify(clickFixture.editor._config.dated_entries)),existingNotes);
      await page.evaluate(()=>clickFixture.dialog.remove());
    }
    assert.deepEqual(errors,[]);
    console.log('Dated browser checks passed: four sources, rolling/week/popup, A/B, merges, filters, cancellation markers, conflicts, escaping, live external source and editor roundtrip/320px/440px.');
  } finally { await page.close(); }
};
