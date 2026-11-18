(() => {
  'use strict';
  const B=window.DM_BANK, main=document.getElementById('main');
  const sources=new Map(B.sources.map(s=>[s.id,s])), cats=new Map(B.categories.map(c=>[c.id,c]));
  const byId=new Map(B.questions.map(q=>[q.id,q]));
  const recalled=B.questions.filter(q=>q.reconstruction).sort((a,b)=>a.reconstruction.number-b.reconstruction.number);
  const key='ucas-dm-exam-progress', states=['待练','存疑','已掌握'];
  let progress=Object.create(null), view='overview', active='warehouse', selected=null, filter={search:'',kind:'all',progress:'all'}, toastTimer;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function mergeProgress(data){for(const [id,value] of Object.entries(data||{})){if(byId.has(id)&&states.includes(value))progress[id]=value}}
  try{mergeProgress(JSON.parse(localStorage.getItem(key)||'{}'))}catch{}
  const state=q=>progress[q.id]||'待练';
  const kinds=q=>[...new Set(q.sources.map(r=>sources.get(r.source).kind))];
  const count=c=>B.questions.filter(q=>q.category===c).length;
  const tag=k=>`<span class="tag ${k==='回忆题'?'memory':k.includes('补充')?'extra':''}">${esc(k)}</span>`;
  function toast(s){const t=document.getElementById('toast');t.textContent=s;t.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('visible'),2400)}
  function renderMath(el=main){
    if(window.renderMathInElement)window.renderMathInElement(el,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false,strict:'ignore',ignoredTags:['script','noscript','style','textarea','pre','code']});
    el.querySelectorAll('table').forEach(t=>{if(!t.parentElement.classList.contains('table-scroll')){const w=document.createElement('div');w.className='table-scroll';w.tabIndex=0;w.setAttribute('role','region');w.setAttribute('aria-label','数据表，可横向滚动');t.replaceWith(w);w.append(t)}});
    el.querySelectorAll('img').forEach(img=>{if(img.getAttribute('src')?.includes('assets/diagrams/')){img.classList.add('academic-diagram');img.loading='eager';if(!img.closest('figure')){const fig=document.createElement('figure');fig.className='diagram';img.replaceWith(fig);fig.append(img);const cap=document.createElement('figcaption');cap.textContent=img.alt+' · 点击查看矢量图';const a=document.createElement('a');a.href=img.src;a.target='_blank';a.rel='noopener';img.replaceWith(a);a.append(img);fig.append(cap)}}});
  }
  function navigation(){
    document.getElementById('tabs').innerHTML=[['overview','复习总览',B.questions.length],['recall2025','2025 完整复原',8],['practice','按题型练习',B.categories.length],['doubts','我的存疑',B.questions.filter(q=>state(q)==='存疑').length],['mastered','已掌握',B.questions.filter(q=>state(q)==='已掌握').length]].map(([id,label,n])=>`<a class="nav-item ${view===id?'active':''}" href="#view=${id}" ${view===id?'aria-current="page"':''}><span>${esc(label)}</span><span class="nav-count">${n}</span></a>`).join('');
    const done=B.questions.filter(q=>state(q)==='已掌握').length;
    document.getElementById('progressText').textContent=`已掌握 ${done} / ${B.questions.length}`;
    document.getElementById('sideProgress').style.width=`${100*done/B.questions.length}%`;
    document.getElementById('mobileView').value=view;
    document.getElementById('breadcrumb').textContent=view==='recall2025'?'2025 回忆题 · 完整练习':view==='practice'?cats.get(active).title:({overview:'复习总览',doubts:'我的存疑',mastered:'已掌握'}[view]||'复习总览');
  }
  function overview(){
    main.innerHTML=`<span class="kicker">UCAS · DATA MINING</span><h1>从原题出发，把解题步骤练清楚</h1><p class="lead">按题型选择例题，先对应翻译英文，再手算、核对步骤和答案。</p><section class="recall-entry"><div><span class="tag memory">2025 回忆题</span><h2>8 道题，已补成完整练习</h2><p>ER 图、事务表、数列和评分矩阵已补齐。每题明确“要做什么、写到哪一步”，并附逐步解答。</p><p class="fine">补配内容逐题标明；回忆原文和原件可以对照。</p></div><a class="button primary" href="#view=recall2025">进入 2025 完整复原 →</a></section><div class="stats"><div class="stat"><b>${B.questions.length}</b><span>学习题条目</span></div><div class="stat"><b>${B.categories.length}</b><span>解题类型</span></div><div class="stat"><b>4</b><span>年份 · 3 套扫描 + 1 份回忆</span></div><div class="stat"><b>6</b><span>当前与往届作业</span></div></div><div class="section-top"><h2>选择解题类型</h2><a href="题型索引.md">Markdown 索引 ↗</a></div><div class="category-grid">${B.categories.map((c,i)=>`<a class="category-card" href="#type=${c.id}"><span class="index">${String(i+1).padStart(2,'0')}</span><div><h3>${esc(c.title)}</h3><p>${count(c.id)} 个例题 · ${[...new Set(B.questions.filter(q=>q.category===c.id).flatMap(kinds))].map(esc).join(' / ')}</p></div><span aria-hidden="true">↗</span></a>`).join('')}</div><div class="section-top"><h2>原卷与回忆来源</h2><a href="原题覆盖索引.md">按原题号查找 ↗</a></div><div class="source-grid">${B.sources.slice(0,4).map(s=>`<article class="source-tile"><h3>${esc(s.title)} ${tag(s.kind)}</h3><p>${esc(s.notes)}</p><a href="${s.file}" target="_blank" rel="noopener">查看原始 PDF ↗</a></article>`).join('')}</div>`;
    renderMath();
  }
  function solutionSteps(q){
    const holder=document.createElement('div');holder.innerHTML=q.html.solution;
    const nodes=[...holder.childNodes], sections=[];let current=null;
    for(const node of nodes){
      if(node.nodeType===1&&/^H[23]$/.test(node.tagName)){current={title:node.textContent.replace(/^\d+[.、．]\s*/,''),nodes:[]};sections.push(current)}
      else{if(!current){if(node.nodeType===3&&!node.textContent.trim())continue;current={title:'推导与计算',nodes:[]};sections.push(current)}current.nodes.push(node)}
    }
    return sections.map((s,i)=>{const body=document.createElement('div');s.nodes.forEach(n=>body.append(n));return `<section class="solution-step"><h3><span class="step-number">${i+1}</span>${esc(s.title)}</h3><div class="step-body">${body.innerHTML}</div></section>`}).join('');
  }
  function card(q,open=false){
    const refs=q.sources.map(r=>`${esc(sources.get(r.source).title)} · ${esc(r.locator)}${r.page?` · p.${r.page}`:''}`).join('<br>');
    const scans=q.sources.filter(r=>sources.get(r.source).file&&r.page&&(r.source.startsWith('exam')||r.source==='memory2025')).map(r=>{const s=sources.get(r.source),base=r.source==='memory2025'?'2025-memory':s.year;return `<details class="scan"><summary>原页对照 · ${esc(s.title)} p.${r.page}</summary><figure><a href="assets/scans/${base}-${r.page}.jpg" target="_blank" rel="noopener"><img loading="lazy" src="assets/scans/${base}-${r.page}.jpg" alt="${esc(s.title)}第${r.page}页"></a><figcaption><a href="${s.file}#page=${r.page}" target="_blank" rel="noopener">打开原始 PDF ↗</a></figcaption></figure></details>`}).join('');
    const reconstruction=q.reconstruction?`<div class="scope-note"><strong>这题要完成什么</strong><span>${esc(q.reconstruction.target)}</span></div>`:'';
    return `<article class="question" id="${q.id}"><header class="q-head"><div class="q-label"><a class="q-id" href="#q=${q.id}${view==='recall2025'?'&view=recall2025':''}">${q.id}</a>${kinds(q).map(tag).join('')}${q.reconstruction?tag('完整复原练习'):tag(q.form)}</div><h2>${esc(q.title)}</h2><div class="q-meta">${refs}</div>${!q.reconstruction&&q.status!=='完整'?`<p class="status-note">${esc(q.status)}</p>`:''}${reconstruction}</header><section class="prompt"><h3 class="block-label">${q.reconstruction?'完整英文题干 · Reconstructed problem':'题干 · Original problem'}</h3><div class="original">${q.html.original}</div></section><section class="translation"><h3 class="block-label"><span class="label-number">01</span>先翻译题意与条件</h3><div>${q.html.translation}</div></section>${q.requirements?`<section class="requirements"><h3 class="block-label">逐小问作答要求 · 写到哪里</h3>${q.html.requirements}</section>`:''}<details class="solution" ${open?'open':''}><summary><span>逐步解答与最终答案</span><span class="summary-hint">展开核对</span></summary><div class="answer">${solutionSteps(q)}${q.english?`<section class="english answer-panel"><h3>English answer · 英文作答</h3>${q.html.english}</section>`:''}${q.pitfall?`<section class="mistake answer-panel"><h3>易错点与约定</h3>${q.html.pitfall}</section>`:''}${q.cost?`<section class="cost answer-panel"><h3>计算复杂度与内存</h3>${q.html.cost}</section>`:''}</div></details>${q.reconstruction?`<details class="provenance"><summary>回忆依据与本题补配内容</summary><div><p><strong>回忆保留：</strong>${esc(q.recall)}</p><p><strong>本题补配：</strong></p><ul>${q.reconstruction.supplied.map(s=>`<li>${esc(s)}</li>`).join('')}</ul><p class="fine">这套数据用于完整练习，不作为原卷原值。</p></div></details>`:''}${scans}<div class="q-foot"><a href="${q.reconstruction?'2025回忆题完整复原.md#'+q.id:'questions/'+q.category+'.md#'+q.id}">本题 Markdown ↗</a><div class="progress-buttons" aria-label="本题练习状态">${states.map(s=>`<button data-state="${s}" data-id="${q.id}" class="${state(q)===s?'selected':''}" aria-pressed="${state(q)===s}">${s}</button>`).join('')}</div></div></article>`;
  }
  function match(q){const text=[q.id,q.title,q.original,q.translation,q.solution,...q.sources.map(r=>sources.get(r.source).title+' '+sources.get(r.source).year+' '+r.locator)].join(' ').toLowerCase();return (!filter.search||text.includes(filter.search.toLowerCase()))&&(filter.kind==='all'||kinds(q).includes(filter.kind))&&(filter.progress==='all'||state(q)===filter.progress)}
  function group(){return view==='recall2025'?recalled:view==='doubts'?B.questions.filter(q=>state(q)==='存疑'):view==='mastered'?B.questions.filter(q=>state(q)==='已掌握'):B.questions.filter(q=>q.category===active)}
  function caseHash(id){return view==='practice'?`type=${active}&case=${id}`:`view=${view}&case=${id}`}
  function cases(open=false){
    const all=group(),items=all.filter(match);if(!items.some(q=>q.id===selected))selected=items[0]?.id||null;
    document.getElementById('resultCount').textContent=`${items.length} / ${all.length} 个例题`;
    document.getElementById('caseTabs').innerHTML=items.map((q,i)=>`<button class="case-tab ${selected===q.id?'active':''}" role="tab" aria-selected="${selected===q.id}" aria-controls="results" id="tab-${q.id}" data-case="${q.id}" tabindex="${selected===q.id?0:-1}"><span class="case-number">${view==='recall2025'?'Q'+q.reconstruction.number:String(i+1).padStart(2,'0')}</span><span class="case-title">${esc(q.title.replace(/^2025 · 第\d+题：/,''))}<small>${esc(q.id)} · ${esc(kinds(q).join(' / '))}</small></span><span class="case-state ${state(q)==='已掌握'?'done':state(q)==='存疑'?'doubt':''}" aria-label="${state(q)}">${state(q)==='已掌握'?'✓':state(q)==='存疑'?'?':'○'}</span></button>`).join('');
    const results=document.getElementById('results');results.setAttribute('aria-labelledby',selected?'tab-'+selected:'caseLabel');
    if(!selected){results.innerHTML='<div class="empty">这里还没有匹配的题目。可以调整筛选，或先在题目底部标记练习状态。</div>';return}
    const q=byId.get(selected),i=items.indexOf(q);
    results.innerHTML=`<div class="current-label"><span>当前例题</span><span>${i+1} / ${items.length}</span><div><button class="button" id="expand">展开答案</button><button class="button" id="collapse">收起答案</button></div></div>${card(q,open)}<nav class="question-nav" aria-label="上一题与下一题">${i?`<a class="button" href="#${caseHash(items[i-1].id)}">← 上一题</a>`:'<span></span>'}${i<items.length-1?`<a class="button" href="#${caseHash(items[i+1].id)}">下一题 →</a>`:'<span></span>'}</nav>`;
    renderMath(results);
  }
  function practice(open=false){
    const isRecall=view==='recall2025',title=isRecall?'2025 回忆题 · 完整复原练习':view==='doubts'?'我的存疑':view==='mastered'?'已掌握的题目':'按题型练习';
    main.innerHTML=`<span class="kicker">${isRecall?'2025 · RECONSTRUCTED PRACTICE':'QUESTION TYPES · WORKED EXAMPLES'}</span><h1>${title}</h1><p class="lead">${isRecall?'按回忆的 8 道题依次练习。图、数据和作答范围均已补齐；每题先翻译，再逐小问说明完成标准。':'选择题型，再选择一道例题。逐步核对计算、英文作答和资源分析。'}</p><div class="selector-panel">${view==='practice'?`<label class="selector-label" for="typeSelect">选择解题类型</label><select id="typeSelect">${B.categories.map(c=>`<option value="${c.id}" ${active===c.id?'selected':''}>${esc(c.title)} (${count(c.id)} 题)</option>`).join('')}</select>`:isRecall?'<div class="selector-heading"><strong>八道题的完整练习版</strong><a href="2025回忆题完整复原.md">阅读全文 Markdown ↗</a></div><p class="fine">题型与任务来自回忆，缺失数字与图示按相同考点补配。点击每题底部可对照回忆依据。</p>':''}<div class="filters"><input id="search" type="search" aria-label="搜索当前题组" placeholder="搜索题目、年份、算法或关键字" value="${esc(filter.search)}"><select id="kind" aria-label="筛选来源"><option value="all">全部来源</option>${[...new Set(B.questions.flatMap(kinds))].map(k=>`<option ${filter.kind===k?'selected':''}>${esc(k)}</option>`).join('')}</select><select id="progressFilter" aria-label="筛选练习进度"><option value="all">全部状态</option>${states.map(s=>`<option ${filter.progress===s?'selected':''}>${s}</option>`).join('')}</select></div><div class="selector-footer"><span id="resultCount"></span><div class="buttons"><button class="button" id="printCurrent">打印当前题</button><button class="button" id="printGroup">打印本组题</button>${view==='practice'?`<a href="questions/${active}.md" class="button">本类 Markdown ↗</a>`:''}</div></div></div><h2 class="case-label" id="caseLabel">${isRecall?'选择题号':'选择例题'}</h2><div class="case-tabs" id="caseTabs" role="tablist" aria-label="本组例题"></div><div id="results" role="tabpanel"></div>`;
    document.getElementById('search').addEventListener('input',e=>{filter.search=e.target.value;cases()});
    document.getElementById('kind').addEventListener('change',e=>{filter.kind=e.target.value;cases()});
    document.getElementById('progressFilter').addEventListener('change',e=>{filter.progress=e.target.value;cases()});
    document.getElementById('typeSelect')?.addEventListener('change',e=>{filter={search:'',kind:'all',progress:'all'};location.hash='type='+e.target.value});
    cases(open);
  }
  function route(){
    const hash=new URLSearchParams(location.hash.slice(1)),q=byId.get(hash.get('q')||hash.get('case'));
    const oldContext=view+':'+active;
    view=hash.get('view')||((hash.has('type')||q)?'practice':'overview');
    if(!['overview','practice','recall2025','doubts','mastered'].includes(view))view='overview';
    if(view==='practice')active=hash.get('type')||(q?.category)||active;if(!cats.has(active))active=B.categories[0].id;
    if(oldContext!==view+':'+active)filter={search:'',kind:'all',progress:'all'};
    selected=q?.id||null;navigation();view==='overview'?overview():practice(Boolean(hash.get('q')));window.scrollTo(0,0);
  }
  function saveProgress(){try{localStorage.setItem(key,JSON.stringify(progress));toast('练习状态已保存')}catch{toast('浏览器未允许本地保存，请导出备份')}}
  document.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.case){location.hash=caseHash(b.dataset.case);return}
    if(b.dataset.state){progress[b.dataset.id]=b.dataset.state;saveProgress();const open=!!main.querySelector('.solution[open]');navigation();cases(open);return}
    if(b.id==='expand'||b.id==='collapse')main.querySelectorAll('.solution').forEach(d=>d.open=b.id==='expand');
    if(b.id==='printCurrent'){main.querySelectorAll('.solution').forEach(d=>d.open=true);window.print()}
    if(b.id==='printGroup'){
      document.getElementById('printOnly')?.remove();const paper=document.createElement('main');paper.id='printOnly';paper.innerHTML=`<h1>${esc(document.getElementById('breadcrumb').textContent)}</h1>`+group().filter(match).map(q=>card(q,true)).join('');document.body.append(paper);renderMath(paper);document.body.classList.add('printing-group');
      Promise.all([...paper.querySelectorAll('img')].filter(i=>i.classList.contains('academic-diagram')).map(i=>i.decode().catch(()=>{}))).then(()=>window.print());
    }
    if(b.id==='backup'){const blob=new Blob([JSON.stringify({format:'ucas-dm-progress-1',progress},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='ucas-dm-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
    if(b.id==='restore')document.getElementById('restoreFile').click();
  });
  main.addEventListener('keydown',e=>{const b=e.target.closest('[data-case]');if(!b||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const buttons=[...document.querySelectorAll('[data-case]')],idx=buttons.indexOf(b),n=e.key==='Home'?0:e.key==='End'?buttons.length-1:(idx+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons.forEach(x=>x.tabIndex=-1);buttons[n].tabIndex=0;buttons[n].focus()});
  document.getElementById('mobileView').addEventListener('change',e=>{location.hash='view='+e.target.value});
  document.getElementById('restoreFile').addEventListener('change',async e=>{if(!e.target.files[0])return;try{const data=JSON.parse(await e.target.files[0].text());if(data.format!=='ucas-dm-progress-1'||!data.progress||typeof data.progress!=='object')throw Error();mergeProgress(data.progress);saveProgress();navigation();if(view==='overview')overview();else cases(!!main.querySelector('.solution[open]'));toast('进度已恢复')}catch{toast('无法读取：请选择本网页导出的进度 JSON')}e.target.value=''});
  window.addEventListener('afterprint',()=>{document.body.classList.remove('printing-group');document.getElementById('printOnly')?.remove()});
  window.addEventListener('hashchange',route);route();
})();
