const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');

module.exports = async (browser, url) => {
  const page = await browser.newPage({viewport:{width:1000,height:900}});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    await page.goto(url);
    await page.evaluate(async () => {
      await customElements.whenDefined('stundenplan-card');
      window.currentLesson = 'E (ge\u00e4ndert)\n204\nNEW\nWorkbook';
      window.comparison = {Fr:[{current:currentLesson,original:'M\n101\nOLD'}]};
      window.changeRows = [
        {time:'1.',start:'08:00',end:'08:45',Fr:currentLesson,subject_changes:comparison},
        {time:'2.',start:'08:50',end:'09:35',Fr:'BIO (ge\u00e4ndert)\n205\nABC'},
      ];
      window.showChange = async (patch = {}, rows = changeRows) => {
        const card = document.createElement('stundenplan-card');
        card.setConfig({type:'custom:stundenplan-card',title:'Fachwechsel im Vergleich',source_type:'sensor',
          source_entity:'sensor.change',source_attribute:'rows_table',days:['Fr'],
          highlight_today:false,highlight_current:false,...patch});
        card.hass = {states:{'sensor.change':{state:'ok',attributes:{rows_table:rows,
          meta:{days:['20261030'],week_start:'20261026'}}}}};
        document.querySelector('#editor').replaceChildren(card);window.changeCard = card;
        await card.updateComplete;await card.updateComplete;
        return card;
      };
    });
    for (const width of [320,440]) for (const display_mode of ['default','compact']) {
      const result = await page.evaluate(async ({width,display_mode}) => {
        document.querySelector('#editor').style.width=width+'px';
        const card=await showChange({display_mode});
        const pair=card.shadowRoot.querySelector('.subjectChange');
        return {pairs:card.shadowRoot.querySelectorAll('.subjectChange').length,
          left:pair.children[0].textContent,right:pair.children[1].textContent,
          leftX:pair.children[0].getBoundingClientRect().x,rightX:pair.children[1].getBoundingClientRect().x,
          overflow:pair.scrollWidth>pair.clientWidth+1,rows:card.shadowRoot.querySelectorAll('tbody tr').length};
      },{width,display_mode});
      assert.equal(result.pairs,1);assert.equal(result.rows,2);
      assert.match(result.left,/Bisher[\s\S]*M[\s\S]*101/);
      assert.match(result.right,/Jetzt[\s\S]*E[\s\S]*Workbook/);
      assert(result.leftX<result.rightX);assert.equal(result.overflow,false);
    }
    for(const [hidden,expected] of [['M',1],['E (ge\u00e4ndert)',0]]) {
      const count=await page.evaluate(async hidden => {
        const card=await showChange({hidden_subjects:[hidden]});
        return card.shadowRoot.querySelectorAll('.subjectChange').length;
      },hidden);
      assert.equal(count,expected,'Filter uses current subject only');
    }
    const guards=await page.evaluate(async () => {
      const read=async pairs => {
        const card=await showChange({},[{...changeRows[0],subject_changes:{Fr:pairs}}]);
        return card.shadowRoot.querySelectorAll('.subjectChange').length;
      };
      return [await read([{current:'wrong',original:'M'}]),
        await read([comparison.Fr[0],comparison.Fr[0]]),await read([{current:42,original:'M'}])];
    });
    assert.deepEqual(guards,[0,0,0]);
    for(const same of [false,true]) {
      const result=await page.evaluate(async same => {
        const rows=[changeRows[0],{...changeRows[0],time:'2.',start:'08:50',end:'09:35',
          subject_changes:{Fr:[{...comparison.Fr[0],original:same?comparison.Fr[0].original:'D'}]}}];
        const card=await showChange({merge_double_lessons:true},rows);
        return {span:card.shadowRoot.querySelector('tbody td:not(.time)').rowSpan,
          pairs:card.shadowRoot.querySelectorAll('.subjectChange').length};
      },same);
      assert.deepEqual(result,{span:same?2:1,pairs:same?1:2});
    }
    const safe=await page.evaluate(async () => {
      const original='<img src=x onerror="window.injected=true">';
      const card=await showChange({},[{...changeRows[0],subject_changes:{Fr:[{...comparison.Fr[0],original}]}}]);
      return {text:card.shadowRoot.querySelector('.subjectChangeOriginal').textContent,
        image:!!card.shadowRoot.querySelector('img'),injected:!!window.injected};
    });
    assert.match(safe.text,/<img/);assert.equal(safe.image,false);assert.equal(safe.injected,false);
    const parallel=await page.evaluate(async () => {
      const card=await showChange({},[{...changeRows[0],Fr:currentLesson+'\n\nKu\n209\nDEF'}]);
      return {pairs:card.shadowRoot.querySelectorAll('.subjectChange').length,
        text:card.shadowRoot.querySelector('tbody td:not(.time)').textContent};
    });
    assert.equal(parallel.pairs,1);assert.match(parallel.text,/Ku/);
    const multiroom=await page.evaluate(async () => {
      const text='E (ge\u00e4ndert)\nEDV1\nEDV2\nNEW\nWorkbook\nPlease bring a pen';
      const card=await showChange({},[{...changeRows[0],Fr:text,
        subject_changes:{Fr:[{current:text,original:'M\n101\nOLD'}]}}]);
      return card.shadowRoot.querySelector('.subjectChange').textContent;
    });
    for(const text of ['EDV1','EDV2','Workbook','Please bring a pen']) assert(multiroom.includes(text));
    for (const parallel of [false, true]) {
      const result = await page.evaluate(async parallel => {
        const text = 'Ph (ge\u00e4ndert)\nEDV1\nEDV2\nABC\nDEF\nWorkbook';
        const card = await showChange({}, [{...changeRows[0],
          Fr: text + (parallel ? '\n\nPh\n209\nXYZ' : ''), subject_changes: {}}]);
        return {text: card.shadowRoot.querySelector('tbody td:not(.time)').textContent,
          changes: card.shadowRoot.querySelectorAll('.subjectChange').length,
          courses: card.shadowRoot.querySelectorAll('tbody .fach').length};
      }, parallel);
      for (const detail of ['EDV1', 'EDV2', 'ABC', 'DEF', 'Workbook']) assert(result.text.includes(detail));
      assert.equal(result.changes, 0, 'Room-only changes stay compact');
      assert.equal(result.courses, parallel ? 2 : 1, 'Multiple rooms are not separate courses');
    }
    const manual=await page.evaluate(async () => {
      const card=await showChange({source_type:'manual',days:['Mo','Di','Mi','Do','Fr'],
        rows:[{time:'1.',cells:['','','','',currentLesson],subject_changes:comparison}]});
      return card.shadowRoot.querySelectorAll('.subjectChange').length;
    });
    assert.equal(manual,1);
    if(process.env.EDITOR_SCREENSHOT_DIR) {
      fs.mkdirSync(process.env.EDITOR_SCREENSHOT_DIR,{recursive:true});
      await page.evaluate(()=>showChange());
      await page.locator('#editor').screenshot({path:path.join(process.env.EDITOR_SCREENSHOT_DIR,'subject-change.png')});
    }
    assert.deepEqual(errors,[]);
    console.log('Subject changes passed: left/right comparison, filters, room-only, merge boundaries, parallel lessons, narrow layouts and safe text.');
  } finally { await page.close(); }
};
