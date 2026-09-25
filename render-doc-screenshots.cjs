// Capture the real card with fictional data. HA controls below are visual test doubles.
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const html = `<!doctype html><html lang="de"><meta charset="utf-8"><style>
*{box-sizing:border-box}body{margin:0;padding:12px;background:#111;color:#eee;font:14px sans-serif;
--primary-text-color:#eee;--secondary-text-color:#aaa;--primary-color:#03a9f4;
--card-background-color:#1c1c1c;--secondary-background-color:#292929;--divider-color:#444}
#capture{width:500px}#editor-view{display:none;width:940px;background:#1c1c1c;padding:20px;border-radius:18px}
header{font-size:20px;font-weight:bold;margin-bottom:24px}small{display:block;color:#aaa;margin-top:14px;font-size:11px}
.columns{display:grid;grid-template-columns:420px 1fr;gap:20px}.preview{background:#111;padding:12px;border-radius:8px}
</style><div id="capture"></div><div id="editor-view"><header>Stundenplan-Karte anpassen</header>
<div class="columns"><div id="editor"></div><div class="preview" id="preview"></div></div>
<small>Fiktive Beispieldaten. Lokale Browser-Vorschau mit vereinfachten Home-Assistant-Bedienelementen.</small></div>
<script>
class Input extends HTMLElement {
 constructor(){super();this.attachShadow({mode:'open'});}
 connectedCallback(){this.shadowRoot.innerHTML='<style>:host{display:block}label{display:block;color:#aaa;font:11px sans-serif;background:#333;padding:8px;border-radius:4px 4px 0 0}input{box-sizing:border-box;width:100%;min-width:0;background:transparent;color:white;border:0;border-bottom:1px solid #aaa;font:14px sans-serif;height:30px}</style><label><span></span><input></label>';this.shadowRoot.querySelector('span').textContent=this.getAttribute('label')||'';this.shadowRoot.querySelector('input').value=this.value||'';}
}
class Form extends HTMLElement {
 constructor(){super();this.attachShadow({mode:'open'});}
 connectedCallback(){const s=this.schema[0];this.shadowRoot.innerHTML='<style>:host{display:block}label{display:block;color:#aaa;font:11px sans-serif;background:#333;padding:8px}select{box-sizing:border-box;width:100%;min-width:0;background:#333;color:white;border:0;height:30px;font:14px sans-serif}</style><label><span></span><select></select></label>';this.shadowRoot.querySelector('span').textContent=this.computeLabel(s);const select=this.shadowRoot.querySelector('select');for(const x of s.selector.select.options){const o=document.createElement('option');o.value=x.value;o.textContent=x.label;select.append(o);}select.value=String(this.data[s.name]);}
}
class Switch extends HTMLElement {
 constructor(){super();this.attachShadow({mode:'open'});}
 connectedCallback(){this.shadowRoot.innerHTML='<style>:host{display:inline-flex;padding:5px}span{width:42px;height:22px;border:1px solid #888;border-radius:14px;display:block;position:relative;background:#333}span.on{border-color:#03a9f4;background:#024d64}i{position:absolute;background:#999;width:16px;height:16px;border-radius:50%;top:2px;left:2px}.on i{left:22px;background:#03a9f4}</style><span><i></i></span>';this.shadowRoot.querySelector('span').classList.toggle('on',!!this.checked);}
}
class HaCard extends HTMLElement {
 constructor(){super();this.attachShadow({mode:'open'}).innerHTML='<style>:host{display:block;border:1px solid var(--divider-color);border-radius:14px;background:var(--ha-card-background,var(--card-background-color));}</style><slot></slot>';}
}
customElements.define('ha-input',Input);customElements.define('ha-form',Form);
customElements.define('ha-switch',Switch);customElements.define('ha-card',HaCard);
</script><script type="module" src="/bundle.js"></script></html>`;

(async () => {
 const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', req.url === '/bundle.js' ? 'text/javascript' : 'text/html');
  res.end(req.url === '/bundle.js' ? fs.readFileSync(path.join(__dirname, 'dist/stundenplan-card.js')) : html);
 });
 await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
 let browser;
 try {
  browser = await chromium.launch({headless:true, executablePath:process.env.BROWSER_EXECUTABLE});
  const page = await browser.newPage({viewport:{width:1000,height:1800},deviceScaleFactor:1});
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.addInitScript(() => {
   const RealDate = Date;
   window.Date = class extends RealDate {
    constructor(...args){super(...(args.length ? args : ['2026-09-24T09:00:00']));}
    static now(){return new RealDate('2026-09-24T09:00:00').getTime();}
   };
  });
  await page.goto('http://127.0.0.1:' + server.address().port);
  await page.evaluate(async () => {
   await customElements.whenDefined('stundenplan-card');
   await customElements.whenDefined('stundenplan-card-editor');
   const lesson = (time,start,end,cells) => ({time,start,end,cells});
   const rows = [
    lesson('1.','08:00','08:45',['D','E','M','D','Kunst']),
    lesson('2.','08:50','09:35',['M','D','E','M','Kunst']),
    {break:true,time:'09:35-09:55',label:'Pause'},
    lesson('3.','09:55','10:40',['E','Sp','D','E','M']),
    lesson('4.','10:40','11:25',['E','Sp','D','E','M']),
    {break:true,time:'11:25-11:45',label:'Pause'},
    lesson('5.','11:45','12:30',['Kunst','M','Musik','Sp','D']),
    lesson('6.','12:35','13:20',['Kunst','M','Musik','Sp','D'])
   ];
   const base = {type:'custom:stundenplan-card',title:'Stundenplan - Beispielklasse',source_type:'manual',
    days:['Mo','Di','Mi','Do','Fr'],rows,show_header_date:false,display_mode:'compact',
    highlight_today:true,highlight_current:true,highlight_current_text:true,highlight_current_time_text:true,
    highlight_today_color:'rgba(255,255,255,0.04)',highlight_current_color:'rgba(255,255,255,0.08)',
    highlight_current_text_color:'#03a9f4',highlight_current_time_text_color:'#03a9f4',
    equal_column_widths:true,merge_double_lessons:true,trim_empty_rows:true};
   const week = document.createElement('stundenplan-card');
   week.setConfig({...base,view_mode:'week'});document.querySelector('#capture').append(week);
   const rolling = {...base,view_mode:'rolling',days_ahead:1,rolling_week_only:true,
    rows:rows.map(row => row.break ? row : {...row,cells:row.cells.map(x => x+'\\nLehrkraft A\\nRaum A'.replaceAll('\\n','\n'))})};
   const editor = document.createElement('stundenplan-card-editor');editor.setConfig(rolling);
   editor._open={general:false,typography:false,appearance:false,colors:true,highlights:true,sources:false,manual:false};
   document.querySelector('#editor').append(editor);
   const preview=document.createElement('stundenplan-card');preview.setConfig(rolling);
   document.querySelector('#preview').append(preview);
   await Promise.all([week.updateComplete,editor.updateComplete,preview.updateComplete]);
  });
  const output=path.join(__dirname,'docs/screenshots');fs.mkdirSync(output,{recursive:true});
  await page.locator('#capture').screenshot({path:path.join(output,'week.png')});
  await page.evaluate(() => {document.querySelector('#capture').style.display='none';document.querySelector('#editor-view').style.display='block';});
  await page.locator('#editor-view').screenshot({path:path.join(output,'editor.png')});
  await page.locator('#editor-view').screenshot({path:path.join(__dirname,'screenshot.png')});
  if(errors.length) throw new Error(errors.join('\n'));
  console.log('Generated three documentation screenshots with fictional data only.');
 } finally {
  if(browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
 }
})().catch(error => {console.error(error);process.exitCode=1;});
