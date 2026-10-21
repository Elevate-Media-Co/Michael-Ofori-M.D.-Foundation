(function(){
  const path=location.pathname;
  const current=path.includes('/preview-1')?1:path.includes('/preview-2')?2:path.includes('/preview-3')?3:path.includes('/preview-4')?4:0;
  if(!current)return;
  const dock=document.createElement('nav');dock.id='concept-dock';dock.setAttribute('aria-label','Switch website design previews');
  dock.innerHTML=`<a class="dock-home" href="/" aria-label="All concepts"><span class="dock-logo">◈</span> Concepts</a><span class="dock-sep" aria-hidden="true"></span><a href="/preview-1/" class="dock-link ${current===1?'active':''}" ${current===1?'aria-current="page"':''}>Preview 1</a><a href="/preview-2/" class="dock-link ${current===2?'active':''}" ${current===2?'aria-current="page"':''}>Preview 2</a><a href="/preview-3/" class="dock-link ${current===3?'active':''}" ${current===3?'aria-current="page"':''} >Preview 3</a><a href="/preview-4/" class="dock-link ${current===4?'active':''}" ${current===4?'aria-current="page"':''}>Preview 4</a>`;
  document.body.appendChild(dock);
})();
