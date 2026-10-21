(function(){
  const path=location.pathname;
  const current=path.includes('/preview-1')?1:path.includes('/preview-2')?2:path.includes('/preview-3')?3:path.includes('/preview-4')?4:0;
  if(!current)return;
  const dock=document.createElement('nav');dock.id='concept-dock';dock.setAttribute('aria-label','Switch website design previews');
  dock.innerHTML=`<a class="dock-home" href="/" aria-label="All concepts"><span class="dock-logo">◈</span> Concepts</a><span class="dock-sep" aria-hidden="true"></span><a href="/preview-1/" class="dock-link ${current===1?'active':''}" ${current===1?'aria-current="page"':''}>Preview 1</a><a href="/preview-2/" class="dock-link ${current===2?'active':''}" ${current===2?'aria-current="page"':''}>Preview 2</a><a href="/preview-3/" class="dock-link ${current===3?'active':''}" ${current===3?'aria-current="page"':''} >Preview 3</a><a href="/preview-4/" class="dock-link ${current===4?'active':''}" ${current===4?'aria-current="page"':''}>Preview 4</a>`;
  document.body.appendChild(dock);
})();


(function(){
const current = (location.pathname.match(/\/preview-(\d)/)||[])[1];
if(!current)return;
const root=document.createElement("div");root.id="foundation-quick-tools";
root.innerHTML='<button type="button" id="toolsToggle" aria-expanded="false" aria-controls="toolsPanel" aria-label="Open quick tools">✦ <span>Tools</span></button><div id="toolsPanel" hidden><div class="tools-title">QUICK ACCESS <button type="button" id="toolsClose" aria-label="Close tools">×</button></div><label for="toolsSearch">FIND ON THIS PAGE</label><input id="toolsSearch" placeholder="Search visible text..." type="search" autocomplete="off"><div id="toolsResults" aria-live="polite"></div><div class="tools-row"><button type="button" id="toolsSmaller" aria-label="Decrease text size">A−</button><button type="button" id="toolsReset" aria-label="Reset text size">Reset text</button><button type="button" id="toolsLarger" aria-label="Increase text size">A+</button></div><div class="tools-row"><button type="button" id="toolsMotion">Pause motion</button><button type="button" id="toolsLink">Copy link</button></div><div class="tools-links"><a href="#giving">Giving</a><a href="#connect">Get involved</a><a href="/">All concepts ↗</a></div><p>Client concept preview · Enquiries and donations are not submitted.</p></div>';
document.body.appendChild(root);
const toggle=root.querySelector("#toolsToggle"),panel=root.querySelector("#toolsPanel");
const open=(value)=>{panel.hidden=!value;toggle.setAttribute("aria-expanded",String(value));if(value)root.querySelector("#toolsSearch").focus()};
toggle.addEventListener("click",()=>open(panel.hidden));
root.querySelector("#toolsClose").addEventListener("click",()=>open(false));
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden)open(false)});
let scale=1;
const updateScale=()=>document.documentElement.style.setProperty("--concept-font-scale",String(scale));
root.querySelector("#toolsLarger").addEventListener("click",()=>{scale=Math.min(1.25,+(scale+.05).toFixed(2));updateScale()});
root.querySelector("#toolsSmaller").addEventListener("click",()=>{scale=Math.max(.9,+(scale-.05).toFixed(2));updateScale()});
root.querySelector("#toolsReset").addEventListener("click",()=>{scale=1;updateScale()});
let motion=false;
root.querySelector("#toolsMotion").addEventListener("click",e=>{motion=!motion;document.documentElement.classList.toggle("foundation-pause-motion",motion);e.currentTarget.textContent=motion?"Resume motion":"Pause motion"});
root.querySelector("#toolsLink").addEventListener("click",async e=>{try{await navigator.clipboard.writeText(location.href);e.currentTarget.textContent="Copied ✓"}catch{e.currentTarget.textContent="Use browser Share"}});
const result=root.querySelector("#toolsResults");
root.querySelector("#toolsSearch").addEventListener("input",e=>{
const q=e.target.value.toLowerCase().trim();result.replaceChildren();if(q.length<2)return;
const targets=[...document.querySelectorAll("main h1,main h2,main h3,main p,main article h3,main button")].filter(n=>!root.contains(n)&&n.textContent.toLowerCase().includes(q)).slice(0,7);
if(!targets.length){result.textContent="No section matches.";return;}
targets.forEach((node,i)=>{const b=document.createElement("button");b.type="button";b.textContent=(node.textContent||"").trim().slice(0,65);b.addEventListener("click",()=>{open(false);node.scrollIntoView({behavior:"smooth",block:"center"});});result.appendChild(b)});
});
})();