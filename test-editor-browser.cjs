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
</script><script type="module" src="/bundle.js"></script></body></html>`;
(async()=>{
 const previousBundle=execFileSync('git',['show','v3.3.3:dist/stundenplan-card.js'],{cwd:__dirname,maxBuffer:1024*1024});
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
   editor._open={general:true,colors:true,highlights:true,sources:true,manual:true};
   editor._showCellStyles=true;
   document.querySelector('#editor').append(editor);await editor.updateComplete;
  });
  assert.equal(await page.getByText('Auf Kalenderwoche begrenzen',{exact:true}).count(),1);
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
   if(output)await page.locator('#editor').screenshot({path:path.join(output,'editor-'+width+'.png')});
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
  for(const view_mode of ['week','rolling']) for(const equal_column_widths of [false,true]) {
    const config={...base,view_mode,days_ahead:0,equal_column_widths};
    assert.deepEqual(await renderSnapshot(newPage,config),await renderSnapshot(oldPage,config),'Existing card changed: '+JSON.stringify({view_mode,equal_column_widths}));
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
  assert.deepEqual(errors,[]);
  console.log('Preview clicks passed: tap actions, merged rows, empty cells, pauses, A/B rolling, source edits and dashboard isolation.');
  console.log('Browser checks passed: color/opacity persistence, source switching, retained A/B data, editor widths 320/440px.');
  console.log('Existing card rendering matches v3.3.3 in four weekly/rolling/column-layout combinations.');
 } finally { if(browser)await browser.close();await new Promise(resolve=>server.close(resolve)); }
})().catch(error=>{console.error(error);process.exitCode=1;});
