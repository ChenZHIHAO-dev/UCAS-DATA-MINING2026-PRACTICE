/* Theme is applied before CSS paints; reading controls are attached after the app. */
(() => {
  'use strict';
  const root=document.documentElement, themeKey='ucas-dm-color-theme';
  const systemTheme=window.matchMedia('(prefers-color-scheme: dark)');
  let preference=null;
  try{const saved=localStorage.getItem(themeKey);if(saved==='dark'||saved==='light')preference=saved}catch{}

  function applyTheme(theme,announce=false){
    root.dataset.theme=theme;
    const dark=theme==='dark',label=dark?'浅色':'深色';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#252526':'#eef4ef');
    const button=document.getElementById('themeToggle');
    if(button){button.setAttribute('aria-label',`切换为${label}模式`);button.title=`切换为${label}模式`;document.getElementById('themeLabel').textContent=label}
    if(announce)document.getElementById('themeStatus').textContent=`已切换为${dark?'深色':'浅色'}模式`;
  }
  applyTheme(preference||(systemTheme.matches?'dark':'light'));
  systemTheme.addEventListener('change',event=>{if(!preference)applyTheme(event.matches?'dark':'light')});
  window.addEventListener('storage',event=>{
    if(event.key!==themeKey&&event.key!==null)return;
    preference=event.newValue==='dark'||event.newValue==='light'?event.newValue:null;
    applyTheme(preference||(systemTheme.matches?'dark':'light'));
  });

  document.addEventListener('DOMContentLoaded',()=>{
    const header=document.getElementById('siteHeader'),content=document.getElementById('headerContent');
    const peek=document.getElementById('navPeek'),close=document.getElementById('navCollapse');
    const mobile=window.matchMedia('(max-width: 760px)'),motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const idleDelay=1200;
    let timer=0,lastY=window.scrollY,keyboardInput=false,pointerInside=false;

    applyTheme(root.dataset.theme);
    document.getElementById('themeToggle').addEventListener('click',()=>{
      preference=root.dataset.theme==='dark'?'light':'dark';
      applyTheme(preference,true);
      try{localStorage.setItem(themeKey,preference)}catch{}
      scheduleHide();
    });
    document.getElementById('jumpToQuestions').addEventListener('click',()=>{
      const target=document.getElementById('caseLabel')||document.querySelector('.category-grid')||document.getElementById('main');
      show();
      target.scrollIntoView({block:'start',behavior:motion.matches?'auto':'smooth'});
      if(keyboardInput){const control=document.querySelector('.case-tab.active')||target.querySelector('a');control?.focus({preventScroll:true})}
      scheduleHide();
    });

    function protectedInteraction(){
      const focused=document.activeElement;
      return pointerInside||(content.contains(focused)&&(keyboardInput||focused.matches('select,input,textarea,[contenteditable="true"]')));
    }
    function setCollapsed(collapsed,force=false){
      collapsed=mobile.matches&&collapsed;
      if(collapsed&&!force&&protectedInteraction())return;
      if(collapsed&&content.contains(document.activeElement))document.activeElement.blur();
      header.classList.toggle('is-collapsed',collapsed);
      content.inert=collapsed;
      content.setAttribute('aria-hidden',String(collapsed));
      peek.setAttribute('aria-expanded',String(!collapsed));
    }
    function scheduleHide(delay=idleDelay){
      clearTimeout(timer);
      // At the beginning of a page the full navigation remains discoverable.
      if(!mobile.matches||window.scrollY<24)return;
      timer=setTimeout(()=>setCollapsed(true),delay);
    }
    function show(delay=idleDelay){setCollapsed(false);scheduleHide(delay)}
    function measure(){root.style.setProperty('--header-height',`${Math.ceil(content.getBoundingClientRect().height)}px`)}
    function layout(){
      clearTimeout(timer);lastY=window.scrollY;measure();setCollapsed(false);
      header.classList.toggle('is-scrolled',lastY>4);
      scheduleHide();
    }

    window.addEventListener('scroll',()=>{
      const y=window.scrollY;
      if(Math.abs(y-lastY)<.5)return;
      lastY=y;header.classList.toggle('is-scrolled',y>4);
      if(mobile.matches)show();
    },{passive:true});
    mobile.addEventListener('change',layout);
    new ResizeObserver(measure).observe(content);
    window.addEventListener('pageshow',layout);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)clearTimeout(timer);else scheduleHide()});

    peek.addEventListener('click',()=>{
      show(2400);
      if(keyboardInput)document.getElementById('mobileView').focus({preventScroll:true});
      else peek.blur();
    });
    function collapseManually(){
      clearTimeout(timer);setCollapsed(true,true);
      if(keyboardInput)requestAnimationFrame(()=>{if(header.classList.contains('is-collapsed'))peek.focus({preventScroll:true})});
    }
    close.addEventListener('click',collapseManually);
    document.addEventListener('keydown',event=>{
      if(!['Shift','Control','Alt','Meta'].includes(event.key))keyboardInput=true;
      if(event.key==='Escape'&&mobile.matches&&content.contains(document.activeElement)&&document.activeElement.tagName!=='SELECT'){
        event.preventDefault();collapseManually();
      }
    },true);
    document.addEventListener('pointerdown',event=>{
      keyboardInput=false;pointerInside=content.contains(event.target);
      if(pointerInside)show();
      else{if(content.contains(document.activeElement))document.activeElement.blur();scheduleHide()}
    },{passive:true});
    const release=()=>{pointerInside=false;scheduleHide()};
    document.addEventListener('pointerup',release,{passive:true});
    document.addEventListener('pointercancel',release,{passive:true});
    content.addEventListener('focusin',()=>{setCollapsed(false);clearTimeout(timer)});
    content.addEventListener('focusout',()=>scheduleHide());
    document.getElementById('mobileView').addEventListener('change',event=>{
      if(mobile.matches&&!keyboardInput)event.target.blur();
      scheduleHide();
    });
    layout();
  },{once:true});
})();
