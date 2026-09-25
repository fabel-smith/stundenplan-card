// Browser regression checks for the actual bundle; HA controls are lightweight test doubles.
// Set PLAYWRIGHT_MODULE and BROWSER_EXECUTABLE when using an external runtime.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
body { margin:0; background:#111; font:14px sans-serif; color:#eee;
--primary-text-color:#eee;--primary-color:#03a9f4;--card-background-color:#1c1c1c;
--secondary-background-color:#292929;--divider-color:#444; }
#editor { width:440px; } ha-card {display:block;}
</style></head><body><div id="editor"></div><script>
class Input extends HTMLElement {
 constructor(){super();this.attachShadow({mode:'open'});}
 connectedCallback(){this.shadowRoot.innerHTML='<style>:host{display:block}label{display:block;font:12px sans-serif;background:#333;padding:8px}input{box-sizing:border-box;width:100%;min-width:0;background:transparent;color:white;border:0;font:14px sans-serif;height:30px}</style><label>'+this.getAttribute('label')+'<input></label>';this.shadowRoot.querySelector('input').value=this.value||'';}
}
class Form extends HTMLElement {
 constructor(){super();this.attachShadow({mode:'open'});}
 connectedCallback(){const s=this.schema[0];const label=this.computeLabel(s);this.shadowRoot.innerHTML='<style>:host{display:block}label{display:block;font:12px sans-serif;background:#333;padding:8px}select{box-sizing:border-box;width:100%;min-width:0;background:#333;color:white;border:0;height:30px}</style><label>'+label+'<select>'+s.selector.select.options.map(x=>'<option value="'+x.value+'">'+x.label+'</option>').join('')+'</select></label>';const select=this.shadowRoot.querySelector('select');select.value=String(this.data[s.name]);select.onchange=()=>this.dispatchEvent(new CustomEvent('value-changed',{detail:{value:{...this.data,[s.name]:select.value}},bubbles:true,composed:true}));}
}
class Switch extends HTMLElement {
 constructor(){super();this.attachShadow({mode:'open'});}
 connectedCallback(){this.shadowRoot.innerHTML='<style>input{accent-color:#03a9f4;width:32px;height:24px}</style><input type="checkbox">';const input=this.shadowRoot.querySelector('input');input.checked=this.checked;input.onchange=()=>{this.checked=input.checked;this.dispatchEvent(new Event('change',{bubbles:true,composed:true}));};}
}
customElements.define('ha-input',Input);customElements.define('ha-form',Form);customElements.define('ha-switch',Switch);
class HaCard extends HTMLElement {
 constructor(){super();this.attachShadow({mode:'open'}).innerHTML='<style>:host{background:var(--ha-card-background,var(--card-background-color,white));border-color:var(--ha-card-border-color,var(--divider-color,#e0e0e0));}</style><slot></slot>';}
}
customElements.define('ha-card',HaCard);
</script><script type="module" src="/bundle.js"></script></body></html>`;
(async()=>{
 const baselineRef=process.env.BASELINE_REF || 'v3.4.1';
 const previousBundle=execFileSync('git',['show',baselineRef+':dist/stundenplan-card.js'],{cwd:__dirname,maxBuffer:1024*1024});
 const server=http.createServer((req,res)=>{
   res.setHeader('Content-Type',req.url.endsWith('.js')?'text/javascript':'text/html');
   res.end(req.url==='/bundle.js'?fs.readFileSync(path.join(__dirname,'dist/stundenplan-card.js')):
     req.url==='/old.js'?previousBundle:req.url==='/old.html'?html.replace('/bundle.js','/old.js'):html);
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;
 try {
  browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE});
  const page=await browser.newPage({viewport:{width:1100,height:950}});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:'+server.address().port);
  await page.evaluate(async()=>{
   await customElements.whenDefined('stundenplan-card-editor');
   const editor=document.createElement('stundenplan-card-editor');window.editor=editor;
   editor.setConfig({type:'custom:stundenplan-card',source_type:'manual',view_mode:'rolling',rolling_week_only:true,days_ahead:4,
    rows:[{time:'1.',start:'08:00',end:'08:45',cells:['D','E','M','Sp','D']}],rows_b:[{time:'1.',cells:['M']}],
    highlight_current_text:true,highlight_current_time_text:true});
   editor._open={general:true,rolling:true,typography:true,appearance:true,colors:true,highlights:true,sources:true,manual:true};
   editor._showCellStyles=true;
   document.querySelector('#editor').append(editor);await editor.updateComplete;
  });
  assert.equal(await page.getByText('Auf Kalenderwoche begrenzen',{exact:true}).count(),1);
  const rollingSection=page.locator('.section').filter({has:page.locator('.sectionTitle').getByText('Rolling',{exact:true})});
  const generalSection=page.locator('.section').filter({has:page.locator('.sectionTitle').getByText('Allgemein',{exact:true})});
  assert.equal(await generalSection.getByText('Auf Kalenderwoche begrenzen',{exact:true}).count(),0);
  assert.equal(await generalSection.locator('ha-input[label="Zusätzliche Tage im Voraus"]').count(),0);
  await page.evaluate(()=>{window.originalRollingConfig=JSON.parse(JSON.stringify(editor._config));window.accordionChanges=0;
    editor.addEventListener('config-changed',()=>window.accordionChanges++);});
  await rollingSection.locator('.sectionHead').click();
  assert.equal(await rollingSection.locator('.sectionBody').count(),0);
  assert.equal(await generalSection.locator('.sectionBody').count(),1);
  await rollingSection.locator('.sectionHead').click();
  assert.equal(await page.evaluate(()=>window.accordionChanges),0,'Accordion toggles must not change card configuration');
  await rollingSection.locator('ha-input[label="Zusätzliche Tage im Voraus"]').evaluate(el=>{
    el.value='6';el.dispatchEvent(new Event('input',{bubbles:true}));
  });
  await rollingSection.locator('select').selectOption('fixed_time');
  await rollingSection.locator('ha-input[label="Umschaltzeit (HH:MM)"]').evaluate(el=>{
    el.value='16:00';el.dispatchEvent(new Event('input',{bubbles:true}));
  });
  assert.deepEqual(await page.evaluate(()=>[editor._config.days_ahead,editor._config.rolling_switch_mode,editor._config.rolling_switch_time]),[6,'fixed_time','16:00']);
  await generalSection.locator('ha-form').filter({has:page.locator('option[value="rolling"]')}).locator('select').selectOption('week');
  assert.equal(await page.locator('.sectionTitle').getByText('Rolling',{exact:true}).count(),0);
  await generalSection.locator('ha-form').filter({has:page.locator('option[value="rolling"]')}).locator('select').selectOption('rolling');
  assert.equal(await rollingSection.locator('ha-input[label="Umschaltzeit (HH:MM)"]').getAttribute('label'),'Umschaltzeit (HH:MM)');
  assert.deepEqual(await page.evaluate(()=>[editor._config.days_ahead,editor._config.rolling_switch_mode,editor._config.rolling_switch_time,editor._config.rolling_week_only]),[6,'fixed_time','16:00',true]);
  assert.equal(await page.evaluate(()=>document.createElement('stundenplan-card-editor')._open.rolling),false);
  await page.evaluate(async()=>{editor.setConfig(window.originalRollingConfig);await editor.updateComplete;});
  console.log('Rolling accordion passed: independent section, no settings in General, collapsed by default, edits and values preserved across view switches.');
  await page.getByRole('button',{name:'Heute-Spalte: Rot',exact:true}).click();
  assert.equal(await page.evaluate(()=>editor._config.highlight_today_color),'rgba(244, 67, 54, 0.12)');
  await page.getByRole('slider',{name:'Heute-Spalte: Transparenz',exact:true}).fill('50');
  assert.equal(await page.evaluate(()=>editor._config.highlight_today_color),'rgba(244, 67, 54, 0.5)');
  await page.evaluate(async()=>{editor.setSourceType('entity');await editor.updateComplete;});
  assert.equal(await page.getByText('Manueller Stundenplan',{exact:true}).count(),0);
  assert.equal(await page.evaluate(()=>editor._config.rows[0].cells[0]),'D');
  assert.equal(await page.evaluate(()=>editor._config.rows_b[0].cells[0]),'M');
  const output=process.env.EDITOR_SCREENSHOT_DIR;
  if(output)fs.mkdirSync(output,{recursive:true});
  for(const width of [440,320]){
   await page.evaluate(width=>document.querySelector('#editor').style.width=width+'px',width);
   const overflow=await page.evaluate(()=>{
    const root=editor.shadowRoot;const bounds=editor.getBoundingClientRect();
    return [...root.querySelectorAll('.section,.grid2,ha-input,ha-form,.optRow,.colorPicker')]
      .filter(el=>el.getBoundingClientRect().width && el.getBoundingClientRect().right>bounds.right+1)
      .map(el=>el.className||el.tagName);
   });
   assert.deepEqual(overflow,[], 'Editor overflow at '+width+'px');
   if(output){
    await page.locator('#editor').screenshot({path:path.join(output,'editor-'+width+'.png')});
    await page.locator('.section').filter({has:page.getByText('Schrift & Abstände',{exact:true})})
      .screenshot({path:path.join(output,'typography-'+width+'.png')});
    await page.locator('.section').filter({has:page.getByText('Hintergründe & Linien',{exact:true})})
      .screenshot({path:path.join(output,'backgrounds-'+width+'.png')});
   }
  }
  await page.evaluate(async()=>{editor.setSourceType('manual');editor._rowOpen={0:true};await editor.updateComplete;});
  assert.equal(await page.getByText('Manueller Stundenplan',{exact:true}).count(),1);
  await page.locator('details.rowPanel').evaluate(el=>el.open=true);
  await page.getByRole('button',{name:'Hintergrund: Blau',exact:true}).first().click();
  assert.equal(await page.evaluate(()=>editor._config.rows[0].cell_styles[0].bg),'rgba(3, 169, 244, 0.18)');
  assert.equal(await page.evaluate(()=>editor._config.rows_b[0].cells[0]),'M');
  await page.evaluate(async()=>{editor.setSourceType('sensor');editor.setSourceEntity('sensor.example');await editor.updateComplete;});
  assert.equal(await page.evaluate(()=>editor._config.source_type),'sensor');
  assert.equal(await page.getByText('Manueller Stundenplan',{exact:true}).count(),0);
  assert.deepEqual(errors,[]);
  const oldPage=await browser.newPage();
  const newPage=await browser.newPage();
  newPage.on('pageerror',error=>errors.push(error.message));
  for(const testPage of [oldPage,newPage]) await testPage.addInitScript(()=>{
    const RealDate=Date; window.Date=class extends RealDate {
      constructor(...args){super(...(args.length?args:['2026-09-24T09:00:00']));}
      static now(){return new RealDate('2026-09-24T09:00:00').getTime();}
    };
  });
  await oldPage.goto('http://127.0.0.1:'+server.address().port+'/old.html');
  await newPage.goto('http://127.0.0.1:'+server.address().port);
  const renderSnapshot=async(testPage,config)=>testPage.evaluate(async config=>{
    await customElements.whenDefined('stundenplan-card');
    document.querySelector('#editor').replaceChildren();
    const card=document.createElement('stundenplan-card');
    card.setConfig(config);document.querySelector('#editor').append(card);await card.updateComplete;
    return [...card.shadowRoot.querySelectorAll('th,td')].map(cell=>{
      const rect=cell.getBoundingClientRect();const style=getComputedStyle(cell);
      return {text:cell.textContent.trim(),rowspan:cell.rowSpan,width:rect.width,height:rect.height,color:style.color,background:style.backgroundColor};
    });
  },config);
  const base={type:'custom:stundenplan-card',source_type:'manual',days:['Mo','Di','Mi','Do','Fr'],
    rows:[{time:'1.',start:'08:30',end:'09:15',cells:['D','E','M','Sp','D'],cell_styles:[null,null,null,{bg:'#f44336',bg_alpha:0.2}]},
      {break:true,time:'09:15-09:30',label:'Pause'},{time:'2.',start:'09:30',end:'10:15',cells:['E','D','Sp','M','E']}],
    highlight_current_text:true,highlight_current_text_color:'#ffaa00'};
  for(const view_mode of ['week','rolling']) for(const equal_column_widths of [false,true]) for(const display_mode of ['default','compact']) {
    const config={...base,view_mode,days_ahead:0,equal_column_widths,display_mode,title_font_size:24};
    assert.deepEqual(await renderSnapshot(newPage,config),await renderSnapshot(oldPage,config),'Existing card changed: '+JSON.stringify({view_mode,equal_column_widths,display_mode}));
  }
  const setupPreview=async config=>newPage.evaluate(async config=>{
    document.querySelector('#editor').replaceChildren();
    document.querySelector('hui-dialog-edit-card')?.remove();
    const dialog=document.createElement('hui-dialog-edit-card');
    const root=dialog.attachShadow({mode:'open'});document.body.append(dialog);
    const formHost=document.createElement('div');root.append(formHost);
    const formRoot=formHost.attachShadow({mode:'open'});
    const previewHost=document.createElement('div');root.append(previewHost);
    const previewRoot=previewHost.attachShadow({mode:'open'});
    const editor=document.createElement('stundenplan-card-editor');
    editor.setConfig(config);formRoot.append(editor);
    const card=document.createElement('stundenplan-card');
    card.setConfig(config);previewRoot.append(card);
    window.previewFixture={editor,card,dialog,changes:0};
    editor.addEventListener('config-changed',()=>previewFixture.changes++);
    await editor.updateComplete;await card.updateComplete;
  },config);
  const previewConfig={...base,trim_empty_rows:true,merge_double_lessons:true,
    rows:[{time:'1.',cells:['D','E','M','Sp','D']},
      {time:'2.',cells:['D','E','M','Sp','D']},
      {break:true,time:'09:15-09:30',label:'Pause'},
      {time:'3.',cells:['E','D','Sp','M','']},
      {time:'4.',cells:['','','','','']}]};
  for(const action of ['toggle_view','popup_week','none']) {
    await setupPreview({...previewConfig,tap_action:{action}});
    const preview=newPage.locator('hui-dialog-edit-card stundenplan-card');
    // Click the lower half of a merged Thursday lesson: edit row 2, not row 1.
    await preview.locator('tbody tr').nth(0).locator('td').nth(4).click({position:{x:10,y:40}});
    assert.deepEqual(await newPage.evaluate(()=>({
      open:previewFixture.editor._rowOpen,
      value:previewFixture.editor.shadowRoot.activeElement?.value,
      day:[...previewFixture.editor.shadowRoot.querySelectorAll('.rowPanel')[1].querySelectorAll('.lessonArea')]
        .indexOf(previewFixture.editor.shadowRoot.activeElement),
      mode:previewFixture.card._uiViewMode,popup:previewFixture.card._uiPopupOpen,
      changes:previewFixture.changes
    })),{open:{1:true},value:'Sp',day:3,mode:null,popup:false,changes:0});
    // Also select an empty Friday cell after a pause with the time column hidden.
    await setupPreview({...previewConfig,show_time_column:false,tap_action:{action}});
    await preview.locator('tbody tr').nth(3).locator('td').nth(4).click();
    assert.deepEqual(await newPage.evaluate(()=>({open:previewFixture.editor._rowOpen,
      value:previewFixture.editor.shadowRoot.activeElement?.value,
      mode:previewFixture.card._uiViewMode,popup:previewFixture.card._uiPopupOpen})),
      {open:{3:true},value:'',mode:null,popup:false});
    await preview.locator('tbody tr').nth(2).locator('td').click();
    assert.equal(await newPage.evaluate(()=>previewFixture.editor._rowOpen[2]),true);
  }
  await setupPreview({...base,view_mode:'rolling',days_ahead:2,week_mode:'kw_parity',week_a_is_even_kw:true,
    tap_action:{action:'toggle_view'},
    rows:[{break:true,time:'07:00-07:05',label:'Nur A'},
      {time:'1.',cells:['A-Mo','A-Di','A-Mi','A-Do','A-Fr']}],
    rows_b:[{time:'1.',cells:['B-Mo','B-Di','B-Mi','B-Do','B-Fr']}]});
  const rollingPreview=newPage.locator('hui-dialog-edit-card stundenplan-card');
  await rollingPreview.locator('tbody tr').first().locator('td').nth(1).click();
  assert.equal(await newPage.evaluate(()=>previewFixture.editor._manualWeek),'B');
  assert.equal(await newPage.evaluate(()=>previewFixture.editor.shadowRoot.activeElement?.value),'B-Do');
  // Next Monday belongs to A, whose source index differs from the displayed row index.
  await rollingPreview.locator('tbody tr').first().locator('td').nth(3).click();
  assert.deepEqual(await newPage.evaluate(()=>({week:previewFixture.editor._manualWeek,
    open:Object.keys(previewFixture.editor._rowOpen).filter(key=>previewFixture.editor._rowOpen[key]),
    value:previewFixture.editor.shadowRoot.activeElement?.value})),
    {week:'A',open:['1'],value:'A-Mo'});
  await newPage.evaluate(()=>{
    const input=previewFixture.editor.shadowRoot.activeElement;
    input.value='Edited A-Mo';input.dispatchEvent(new Event('input',{bubbles:true}));
  });
  assert.deepEqual(await newPage.evaluate(()=>({a:previewFixture.editor._config.rows[1].cells[0],
    b:previewFixture.editor._config.rows_b[0].cells[0]})),{a:'Edited A-Mo',b:'B-Mo'});
  // A dashboard card must not control an open editor; its tap actions still work.
  for(const action of ['toggle_view','popup_week']) {
    await newPage.evaluate(async ({base,action})=>{
      const card=document.createElement('stundenplan-card');
      card.setConfig({...base,tap_action:{action}});
      document.querySelector('#editor').replaceChildren(card);window.dashboardCard=card;
      await card.updateComplete;
    },{base,action});
    await newPage.locator('#editor stundenplan-card tbody td').nth(1).click();
    assert.equal(await newPage.evaluate(action=>action==='toggle_view'
      ? dashboardCard._uiViewMode==='rolling' : dashboardCard._uiPopupOpen,action),true);
    assert.equal(await newPage.evaluate(()=>previewFixture.editor._config.rows[1].cells[0]),'Edited A-Mo');
  }
  await newPage.locator('#editor stundenplan-card .popupCard tbody td').nth(1).click();
  assert.equal(await newPage.evaluate(()=>dashboardCard._uiPopupOpen),false);
  // Removing the editor must detach its dialog listener.
  await newPage.evaluate(()=>previewFixture.editor.remove());
  await rollingPreview.locator('tbody tr').first().locator('td').nth(1).click();
  assert.equal(await newPage.evaluate(()=>previewFixture.editor._manualWeek),'A');
  await setupPreview({...base,tap_action:{action:'popup_week'}});
  // Ignore another config in the same dialog, rather than opening a wrong cell.
  await newPage.evaluate(async()=>{
    previewFixture.editor.setConfig({...previewFixture.editor._config,title:'Other card'});
    await previewFixture.editor.updateComplete;
  });
  await rollingPreview.locator('tbody tr').first().locator('td').nth(1).click();
  assert.equal(await newPage.evaluate(()=>previewFixture.editor._open.manual),false);
  assert.equal(await newPage.evaluate(()=>previewFixture.card._uiPopupOpen),false);
  await setupPreview({...base,source_type:'sensor',source_entity:'sensor.test',source_entity_legacy:'sensor.test',source_attribute:'plan',tap_action:{action:'toggle_view'}});
  await newPage.evaluate(async()=>{
    previewFixture.card.hass={states:{'sensor.test':{state:'ok',attributes:{plan:[{time:'1.',cells:['Sensor lesson']}]}}}};
    await previewFixture.card.updateComplete;await previewFixture.card.updateComplete;
  });
  await rollingPreview.locator('tbody tr').first().locator('td').nth(1).click();
  assert.equal(await newPage.evaluate(()=>previewFixture.editor._open.manual),false);
  assert.equal(await newPage.evaluate(()=>previewFixture.card._uiViewMode),null);
  // Typography: actual rendered sizes in both layouts, including merged and tall rows.
  const typographyBase={...base,equal_column_widths:true,merge_double_lessons:true,
    rows:[{time:'1.',start:'08:00',end:'08:45',cells:['Mathe\nMUL\n126','Deutsch']},
      {time:'2.',start:'08:45',end:'09:30',cells:['Mathe\nMUL\n126','Deutsch']},
      {break:true,time:'09:30-09:45',label:'Pause'},
      {time:'3.',start:'09:45',end:'10:30',cells:['Mathe\nMUL\n126\n'+Array.from({length:12},(_,i)=>'Aufgaben '+i).join('\n')]}]};
  const typographySnapshot=()=>newPage.evaluate(()=>{
    const card=document.querySelector('#editor stundenplan-card');
    const root=card.shadowRoot;
    const size=selector=>{
      const element=root.querySelector(selector);
      if(!element)throw new Error('Missing typography element '+selector+': '+root.querySelector('tbody')?.innerText);
      return getComputedStyle(element).fontSize;
    };
    return {subject:size('.fach'),plain:size('.cellText'),time:size('.timeSt'),clock:size('.timeHm'),
      header:size('th'),details:size('.lehrer'),note:size('.note'),title:size('.title'),
      rows:[...root.querySelectorAll('tbody tr')].map(row=>row.getBoundingClientRect().height),
      span:root.querySelector('td[rowspan="2"]')?.rowSpan};
  });
  for(const display_mode of ['default','compact']) {
    await renderSnapshot(newPage,{...typographyBase,display_mode,title_font_size:22,
      font_size_subject:24,font_size_time:18,font_size_header:20,font_size_details:16,row_height:72,font_size_title_compact:26});
    let sizes=await typographySnapshot();
    assert.deepEqual({subject:sizes.subject,plain:sizes.plain,time:sizes.time,clock:sizes.clock,
      header:sizes.header,details:sizes.details,note:sizes.note,title:sizes.title,span:sizes.span},
      {subject:'24px',plain:'24px',time:'18px',clock:'18px',header:'20px',details:'16px',note:'16px',
        title:display_mode==='compact'?'26px':'22px',span:2});
    assert(sizes.rows[0]>=72 && sizes.rows[1]>=72,'Minimum row height with merged cells');
    assert(sizes.rows[2]<72,'Pause should not receive lesson minimum height');
    assert(sizes.rows[3]>72,'Long content should grow beyond the minimum');
    await renderSnapshot(newPage,{...typographyBase,display_mode,tap_action:{action:'popup_week'}});
    await newPage.evaluate(()=>{
      const card=document.querySelector('#editor stundenplan-card');
      for(const [name,value] of Object.entries({'subject':23,'time':17,'header':19,'details':15,'title-compact':25}))
        card.style.setProperty('--stundenplan-font-size-'+name,value+'px');
      card.style.setProperty('--stundenplan-row-height','80px');
    });
    sizes=await typographySnapshot();
    assert.equal(sizes.subject,'23px');assert.equal(sizes.plain,'23px');assert.equal(sizes.time,'17px');
    assert.equal(sizes.header,'19px');assert.equal(sizes.details,'15px');assert(sizes.rows[0]>=80);
    if(display_mode==='compact')assert.equal(sizes.title,'25px');
    // Explicit card settings override inherited CSS; clearing restores inheritance.
    await newPage.evaluate(async()=>{
      const card=document.querySelector('#editor stundenplan-card');
      card.setConfig({...card.config,font_size_subject:30});await card.updateComplete;
    });
    assert.equal((await typographySnapshot()).subject,'30px');
    await newPage.evaluate(async()=>{
      const card=document.querySelector('#editor stundenplan-card');
      card.setConfig({...card.config,font_size_subject:''});await card.updateComplete;
    });
    assert.equal((await typographySnapshot()).subject,'23px');
    await newPage.locator('#editor stundenplan-card tbody .fach').first().click();
    assert.equal(await newPage.locator('#editor stundenplan-card .popupCard .fach').first()
      .evaluate(el=>getComputedStyle(el).fontSize),'23px');
  }
  await newPage.evaluate(()=>document.querySelector('hui-dialog-edit-card')?.remove());
  await setupPreview({...base,view_mode:'week'});
  await newPage.evaluate(async()=>{
    previewFixture.editor._open={typography:true};previewFixture.editor.requestUpdate();
    await previewFixture.editor.updateComplete;
    previewFixture.editor.addEventListener('config-changed',event=>previewFixture.card.setConfig(event.detail.config));
  });
  const subjectInput=newPage.locator('hui-dialog-edit-card stundenplan-card-editor ha-input[label="Fächer (px)"]');
  const changeSize=async value=>subjectInput.evaluate((input,value)=>{
    input.value=value;input.dispatchEvent(new Event('change',{bubbles:true,composed:true}));
  },value);
  await changeSize('28');
  assert.equal(await newPage.locator('hui-dialog-edit-card stundenplan-card .cellText').first()
    .evaluate(el=>getComputedStyle(el).fontSize),'28px');
  // Persist through editor reload and source changes.
  await newPage.evaluate(async()=>{
    const editor=previewFixture.editor;editor.setConfig(JSON.parse(JSON.stringify(editor._config)));
    editor.setSourceType('sensor');editor.setSourceType('manual');await editor.updateComplete;
  });
  assert.equal(await newPage.evaluate(()=>previewFixture.editor._config.font_size_subject),28);
  await changeSize('');
  assert.equal(await newPage.evaluate(()=>Object.hasOwn(previewFixture.editor._config,'font_size_subject')),false);
  await changeSize('32');
  await newPage.getByRole('button',{name:'Größen zurücksetzen',exact:true}).click();
  assert.equal(await newPage.evaluate(()=>Object.hasOwn(previewFixture.editor._config,'font_size_subject')),false);
  assert.equal(await newPage.evaluate(()=>previewFixture.editor._config.title_font_size),20);
  await newPage.evaluate(async()=>{
    const card=previewFixture.card;
    card.setConfig({...card.config,font_size_subject:'bad',font_size_time:null,font_size_header:false,
      font_size_details:-5,row_height:9999,font_size_title_compact:'24'});await card.updateComplete;
  });
  assert.deepEqual(await newPage.evaluate(()=>({
    invalid:['font_size_subject','font_size_time','font_size_header','font_size_details'].filter(key=>Object.hasOwn(previewFixture.card.config,key)),
    height:previewFixture.card.config.row_height,title:previewFixture.card.config.font_size_title_compact
  })),{invalid:[],height:240,title:24});
  assert.deepEqual(errors,[]);
  // Background layers: no stacking on rows/table, inherited CSS, explicit config and cell overrides.
  const backgroundSnapshot=()=>newPage.evaluate(()=>{
    const root=document.querySelector('#editor stundenplan-card').shadowRoot;
    const css=selector=>getComputedStyle(root.querySelector(selector));
    return {card:css('ha-card').backgroundColor,header:css('th').backgroundColor,
      row:css('tbody td').backgroundColor,pause:css('.break td').backgroundColor,
      line:css('tbody td').borderTopColor,cellLine:css('td[rowspan]').borderTopColor,
      highlight:css('td.today').boxShadow,custom:css('td.today').backgroundColor,
      tr:css('tbody tr').backgroundColor,table:css('table').backgroundColor};
  });
  for(const display_mode of ['default','compact']) {
    const cfg={...base,display_mode,view_mode:'week',tap_action:{action:'popup_week'}};
    await renderSnapshot(oldPage,cfg);await renderSnapshot(newPage,cfg);
    for(const selector of ['ha-card','th','.break td','tbody td']) {
      const background=p=>p.locator('#editor stundenplan-card').evaluate((card,selector)=>getComputedStyle(card.shadowRoot.querySelector(selector)).backgroundColor,selector);
      assert.equal(await background(newPage),await background(oldPage),'Default background changed: '+selector);
    }
    const defaults=await backgroundSnapshot();
    await newPage.evaluate(()=>{
      const host=document.querySelector('#editor stundenplan-card');
      for(const name of ['card-background','header-background','row-background','divider-color'])
        host.style.setProperty('--stundenplan-'+name,'transparent');
    });
    let bg=await backgroundSnapshot();
    for(const key of ['card','header','row','pause','line','cellLine']) assert.equal(bg[key],'rgba(0, 0, 0, 0)',key);
    assert.equal(bg.custom,defaults.custom);assert.equal(bg.highlight,defaults.highlight);
    await newPage.evaluate(async()=>{
      const card=document.querySelector('#editor stundenplan-card');
      card.setConfig({...card.config,card_background:'rgba(10, 20, 30, 0.3)',header_background:'#11223380',
        row_background:'rgba(40, 50, 60, 0.2)',divider_color:'rgba(70, 80, 90, 0.4)'});await card.updateComplete;
    });
    bg=await backgroundSnapshot();
    assert.equal(bg.card,'rgba(10, 20, 30, 0.3)');assert.equal(bg.header,'rgba(17, 34, 51, 0.5)');
    assert.equal(bg.row,'rgba(40, 50, 60, 0.2)');assert.equal(bg.pause,bg.row);
    assert.equal(bg.line,'rgba(70, 80, 90, 0.4)');assert.equal(bg.cellLine,bg.line);
    assert.equal(bg.tr,'rgba(0, 0, 0, 0)');assert.equal(bg.table,bg.tr);
    assert.equal(bg.custom,defaults.custom);assert.equal(bg.highlight,defaults.highlight);
    await newPage.locator('#editor stundenplan-card tbody td').first().click();
    assert.equal(await newPage.locator('#editor stundenplan-card .popupCard').evaluate(el=>getComputedStyle(el).backgroundColor),bg.card);
    await newPage.evaluate(async()=>{
      const card=document.querySelector('#editor stundenplan-card');
      card.setConfig({...card.config,card_background:'',header_background:null,row_background:'bad color',divider_color:'red;opacity:0'});
      await card.updateComplete;
    });
    bg=await backgroundSnapshot();assert.equal(bg.card,'rgba(0, 0, 0, 0)');assert.equal(bg.line,bg.card);
    assert.deepEqual(await newPage.evaluate(()=>['card_background','header_background','row_background','divider_color']
      .filter(key=>Object.hasOwn(document.querySelector('#editor stundenplan-card').config,key))),[]);
  }
  // Standard HA variables and light themes keep working when no explicit override is set.
  await renderSnapshot(newPage,base);
  await newPage.evaluate(()=>{
    const host=document.querySelector('#editor stundenplan-card');
    for(const key of ['--ha-card-background','--card-background-color','--secondary-background-color']) host.style.setProperty(key,'transparent');
  });
  let legacyBackground=await backgroundSnapshot();
  assert.equal(legacyBackground.card,'rgba(0, 0, 0, 0)');assert.equal(legacyBackground.header,legacyBackground.card);
  for(const testPage of [oldPage,newPage]) {
    await renderSnapshot(testPage,base);
    await testPage.evaluate(()=>{
      const host=document.querySelector('#editor stundenplan-card');
      host.style.setProperty('--card-background-color','#ffffff');
      host.style.setProperty('--secondary-background-color','#eeeeee');
    });
  }
  legacyBackground=await backgroundSnapshot();
  assert.equal(legacyBackground.card,'rgb(255, 255, 255)');assert.equal(legacyBackground.header,'rgb(238, 238, 238)');
  await renderSnapshot(newPage,{...typographyBase,merge_double_lessons:true,row_background:'rgba(1, 2, 3, 0.25)'});
  assert.equal(await newPage.locator('#editor stundenplan-card td[rowspan="2"]').first()
    .evaluate(el=>getComputedStyle(el).backgroundColor),'rgba(1, 2, 3, 0.25)');
  // JSON/Suite sources use the same styling and retain their own cell colors/borders.
  for(const source_type of ['sensor','entity']) {
    await renderSnapshot(newPage,{...base,source_type,source_entity:'sensor.child_woche',source_entity_legacy:'sensor.child_woche',source_entity_integration:'sensor.child_woche',source_attribute:'rows_table',
      card_background:'transparent',header_background:'transparent',row_background:'rgba(1, 2, 3, 0.25)',divider_color:'transparent'});
    await newPage.evaluate(async()=>{
      const card=document.querySelector('#editor stundenplan-card');
      card.hass={states:{'sensor.child_woche':{state:'ok',attributes:{rows_table:[
        {time:'1.',cells:['Mathe'],cell_styles:[{bg:'rgba(255, 0, 0, 0.5)',border:'2px solid rgb(0, 255, 0)'}]},
        {break:true,time:'09:15-09:30',label:'Pause'}]}}}};
      await card.updateComplete;await card.updateComplete;
    });
    assert.equal(await newPage.locator('#editor stundenplan-card td[rowspan]').first().evaluate(el=>getComputedStyle(el).backgroundColor),'rgba(255, 0, 0, 0.5)');
    assert.equal(await newPage.locator('#editor stundenplan-card td[rowspan]').first().evaluate(el=>getComputedStyle(el).borderTopColor),'rgb(0, 255, 0)');
  }
  await setupPreview({...base,card_background:'transparent'});
  await newPage.evaluate(async()=>{
    const editor=previewFixture.editor;editor._open={appearance:true};editor.requestUpdate();await editor.updateComplete;
    editor.addEventListener('config-changed',event=>previewFixture.card.setConfig(event.detail.config));
  });
  assert.equal(await newPage.getByRole('slider',{name:'Kartenhintergrund: Transparenz',exact:true}).inputValue(),'100');
  await newPage.getByRole('button',{name:'Kartenhintergrund: Blau',exact:true}).click();
  await newPage.getByRole('slider',{name:'Kartenhintergrund: Transparenz',exact:true}).fill('65');
  assert.equal(await newPage.evaluate(()=>previewFixture.editor._config.card_background),'rgba(3, 169, 244, 0.35)');
  await newPage.evaluate(async()=>{
    const editor=previewFixture.editor;editor.setConfig(JSON.parse(JSON.stringify(editor._config)));
    editor.setSourceType('entity');editor.setSourceType('sensor');editor.setSourceType('manual');await editor.updateComplete;
  });
  assert.equal(await newPage.evaluate(()=>previewFixture.editor._config.card_background),'rgba(3, 169, 244, 0.35)');
  await newPage.locator('fieldset').filter({has:newPage.locator('legend').getByText('Kartenhintergrund',{exact:true})})
    .getByRole('button',{name:'Zurücksetzen',exact:true}).click();
  assert.equal(await newPage.evaluate(()=>Object.hasOwn(previewFixture.editor._config,'card_background')),false);
  const headerConfig={...base,source_type:'entity',source_entity:'sensor.demo',
    source_entity_integration:'sensor.demo',week_offset_entity:'number.demo_offset',
    week_mode:'off',title:'Demo',title_font_size:22,font_size_title_compact:18};
  const headerSnapshot=async(config,offset=0,popup=false)=>newPage.evaluate(async({config,offset,popup})=>{
    document.querySelector('hui-dialog-edit-card')?.remove();
    document.querySelector('#editor').replaceChildren();
    const card=document.createElement('stundenplan-card');card.setConfig(config);
    card.hass={states:{'sensor.demo':{state:'ok',attributes:{plan:config.rows}},
      'number.demo_offset':{state:String(offset),attributes:{}}}};
    document.querySelector('#editor').append(card);
    await card.updateComplete;await card.updateComplete;
    if(popup){card._uiPopupOpen=true;card.requestUpdate();await card.updateComplete;}
    const root=popup?card.shadowRoot.querySelector('.popupCard'):card.shadowRoot.querySelector('ha-card');
    const header=root.querySelector('.headerRow'),tableWrapper=root.querySelector('.card');
    return {buttons:root.querySelectorAll('.offsetInline .btnMini').length,header:!!header,
      gap:header?parseFloat(getComputedStyle(header).paddingBottom)+parseFloat(getComputedStyle(tableWrapper).paddingTop):null,
      top:root.querySelector('table').getBoundingClientRect().top-root.getBoundingClientRect().top,
      titleSize:root.querySelector('.title')?getComputedStyle(root.querySelector('.title')).fontSize:null,
      days:[...root.querySelectorAll('thead th:not(.time)')].map(el=>el.textContent.trim()),
      offsetEntity:card.config.week_offset_entity,
      configuredGap:card.config.header_table_gap??null};
  },{config,offset,popup});
  for(const display_mode of ['default','compact']) {
    const config={...headerConfig,display_mode};
    const normal=await headerSnapshot(config);
    assert.equal(normal.buttons,2);
    assert.equal(normal.gap,display_mode==='compact'?12:20);
    assert.equal(normal.titleSize,display_mode==='compact'?'18px':'22px');
    for(const header_table_gap of [0,4,24]) {
      const custom=await headerSnapshot({...config,header_table_gap});
      assert.equal(custom.gap,header_table_gap);
      assert.equal(custom.top-normal.top,header_table_gap-normal.gap);
    }
    const hidden=await headerSnapshot({...config,show_week_navigation:false});
    assert.equal(hidden.buttons,0);
    assert.equal(hidden.offsetEntity,'number.demo_offset');
    for(const offset of [0,1]) {
      const shown=await headerSnapshot({...config,view_mode:'rolling',days_ahead:0},offset);
      const hidden=await headerSnapshot({...config,view_mode:'rolling',days_ahead:0,show_week_navigation:false},offset);
      assert.deepEqual(hidden.days,shown.days,'Hiding navigation must not change the selected rolling week');
    }
    const noHeader={...config,show_title:false,show_week_navigation:false};
    assert.equal((await headerSnapshot(noHeader)).header,false);
    assert.equal((await headerSnapshot({...noHeader,header_table_gap:24})).top,(await headerSnapshot(noHeader)).top);
    const popup=await headerSnapshot({...config,header_table_gap:4,show_week_navigation:false},0,true);
    assert.equal(popup.buttons,0);
    assert.equal(popup.gap,4);
    assert.equal(popup.titleSize,'22px');
  }
  for(const invalid of ['',null,-1,'not-a-number',true]) {
    assert.equal((await headerSnapshot({...headerConfig,header_table_gap:invalid})).configuredGap,null);
  }
  assert.equal((await headerSnapshot({...headerConfig,header_table_gap:100})).configuredGap,64);
  await setupPreview({...headerConfig,header_table_gap:4});
  await newPage.evaluate(async()=>{
    const editor=previewFixture.editor;editor._open={general:true,typography:true};editor.requestUpdate();await editor.updateComplete;
  });
  const navigation=newPage.locator('.toggleRow').filter({has:newPage.getByText('Wochennavigation anzeigen',{exact:true})}).locator('ha-switch');
  await navigation.locator('input').uncheck();
  const gapInput=newPage.locator('ha-input[label="Abstand Kopfzeile / Tabelle (px)"]');
  await gapInput.evaluate(el=>{el.value='0';el.dispatchEvent(new Event('change',{bubbles:true}));});
  assert.equal(await newPage.evaluate(()=>previewFixture.editor._config.header_table_gap),0);
  await newPage.evaluate(async()=>{const editor=previewFixture.editor;editor.setConfig(JSON.parse(JSON.stringify(editor._config)));await editor.updateComplete;});
  assert.equal(await newPage.evaluate(()=>previewFixture.editor._config.show_week_navigation),false);
  assert.equal(await newPage.evaluate(()=>previewFixture.editor._config.header_table_gap),0);
  await gapInput.evaluate(el=>{el.value='';el.dispatchEvent(new Event('change',{bubbles:true}));});
  assert.equal(await newPage.evaluate(()=>Object.hasOwn(previewFixture.editor._config,'header_table_gap')),false);
  await gapInput.evaluate(el=>{el.value='8';el.dispatchEvent(new Event('change',{bubbles:true}));});
  await newPage.getByRole('button',{name:'Größen zurücksetzen',exact:true}).click();
  assert.equal(await newPage.evaluate(()=>Object.hasOwn(previewFixture.editor._config,'header_table_gap')),false);
  assert.equal(await newPage.evaluate(()=>previewFixture.editor._config.show_week_navigation),false);
  console.log('Header controls passed: navigation visibility preserves offsets/rolling; optional gap supports zero, reset, hidden headers and popup; title sizes remain independent.');
  const repeatedDayPage=await browser.newPage();
  repeatedDayPage.on('pageerror',error=>errors.push(error.message));
  await repeatedDayPage.addInitScript(()=>{
    const RealDate=Date;
    window.testNow='2026-09-25T09:10:00';
    window.Date=class extends RealDate {
      constructor(...args){super(...(args.length?args:[window.testNow]));}
      static now(){return new RealDate(window.testNow).getTime();}
    };
  });
  await repeatedDayPage.goto('http://127.0.0.1:'+server.address().port);
  for(const source_type of ['manual','sensor','entity']) for(const merge_double_lessons of [false,true]) {
    for(const now of ['2026-09-25T09:10:00','2026-09-25T10:05:00']) {
      const result=await repeatedDayPage.evaluate(async({source_type,merge_double_lessons,now})=>{
        await customElements.whenDefined('stundenplan-card');
        window.testNow=now;
        const rows=[
          {time:'1.',start:'09:00',end:'09:45',cells:['D','E','M','Sp','Kunst']},
          {time:'2.',start:'09:45',end:'10:30',cells:['D','E','M','Sp','Kunst']}
        ];
        const config={type:'custom:stundenplan-card',source_type,rows,
          source_entity:'sensor.demo',source_entity_integration:'sensor.demo',source_entity_legacy:'sensor.demo',
          view_mode:'rolling',days_ahead:6,rolling_week_only:false,
          days:['Mo','Di','Mi','Do','Fr'],merge_double_lessons,show_header_date:false,
          highlight_today:true,highlight_current:true,highlight_current_text:true,
          highlight_current_text_color:'#03a9f4',highlight_current_time_text:true,
          highlight_current_time_text_color:'#03a9f4'};
        document.querySelector('#editor').replaceChildren();
        const card=document.createElement('stundenplan-card');
        card.setConfig(config);
        card.hass={states:{'sensor.demo':{state:'ok',attributes:{plan:rows}}}};
        document.querySelector('#editor').append(card);
        await card.updateComplete;await card.updateComplete;
        const root=card.shadowRoot;
        const activeIndex=merge_double_lessons||now.includes('09:10')?0:1;
        const cells=[...root.querySelectorAll('tbody tr')[activeIndex].querySelectorAll('td')];
        if(cells.length!==8) throw new Error(JSON.stringify({source_type,merge_double_lessons,now,
          rows:[...root.querySelectorAll('tbody tr')].map(row=>row.textContent.trim()),cellCount:cells.length}));
        return {headers:[...root.querySelectorAll('thead th:not(.time)')].map(el=>el.textContent.trim()),
          highlightedHeaders:[...root.querySelectorAll('thead th.today')].map(el=>el.textContent.trim()),
          today:cells[1].classList.contains('today'),future:cells[6].classList.contains('today'),
          todayColor:getComputedStyle(cells[1]).color,futureColor:getComputedStyle(cells[6]).color,
          todaySpan:cells[1].rowSpan,futureSpan:cells[6].rowSpan};
      },{source_type,merge_double_lessons,now});
      assert.deepEqual(result.headers,['Fr','Mo','Di','Mi','Do','Fr','Mo']);
      assert.deepEqual(result.highlightedHeaders,['Fr']);
      assert.equal(result.today,true);
      assert.equal(result.future,false,'Future Friday must not receive the today class');
      assert.equal(result.todayColor,'rgb(3, 169, 244)');
      assert.notEqual(result.futureColor,'rgb(3, 169, 244)','Current lesson must only be highlighted on the actual date');
      assert.equal(result.todaySpan,merge_double_lessons?2:1);
      assert.equal(result.futureSpan,merge_double_lessons?2:1);
    }
  }
  await repeatedDayPage.close();
  assert.deepEqual(errors,[]);
  console.log('Repeated rolling weekdays passed: only the actual Friday is highlighted, for manual/JSON/Suite and both halves of merged lessons.');
  console.log('Backgrounds passed: defaults, transparency, CSS inheritance, config precedence, cell styles, popup, JSON/Suite and editor reset/persistence.');
  console.log('Preview clicks passed: tap actions, merged rows, empty cells, pauses, A/B rolling, source edits and dashboard isolation.');
  console.log('Browser checks passed: color/opacity persistence, source switching, retained A/B data, editor widths 320/440px.');
  console.log('Typography passed: normal/compact sizes, CSS inheritance, row growth, merged cells, popup and editor persistence/reset.');
  console.log('Existing card rendering matches '+baselineRef+' in eight weekly/rolling/column-layout/density combinations.');
 } finally { if(browser)await browser.close();await new Promise(resolve=>server.close(resolve)); }
})().catch(error=>{console.error(error);process.exitCode=1;});
