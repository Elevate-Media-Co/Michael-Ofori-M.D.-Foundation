(() => {
"use strict";
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const header=$("#siteHeader"), progress=$("#readProgress"), rail=$(".chapter-rail");
$("#copyrightYear").textContent=new Date().getFullYear();
let motionDisabled=reduced;
const motionControl=$("#motionControl");
function applyMotion(){document.body.classList.toggle("no-motion",motionDisabled);motionControl.setAttribute("aria-pressed",String(motionDisabled));motionControl.setAttribute("aria-label",motionDisabled?"Resume decorative motion":"Pause decorative motion");$(".motion-label").textContent=motionDisabled?"Motion off":"Motion on";$(".pause-icon").textContent=motionDisabled?"▶":"Ⅱ";}
motionControl.addEventListener("click",()=>{motionDisabled=!motionDisabled;applyMotion();});
applyMotion();
const mobile=$("#mobileNav"), toggle=$("#menuToggle");
function closeMenu(){mobile.hidden=true;toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open menu");}
toggle.addEventListener("click",()=>{mobile.hidden=!mobile.hidden;toggle.setAttribute("aria-expanded",String(!mobile.hidden));toggle.setAttribute("aria-label",mobile.hidden?"Open menu":"Close menu");});
$$(".mobile-nav a").forEach(a=>a.addEventListener("click",closeMenu));
function updateScroll(){const d=document.documentElement;progress.style.width=(100*d.scrollTop/Math.max(1,d.scrollHeight-d.clientHeight))+"%";header.classList.toggle("scrolled",window.scrollY>24);}
window.addEventListener("scroll",updateScroll,{passive:true});updateScroll();
if("IntersectionObserver" in window){
const revealer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");revealer.unobserve(e.target);}}),{threshold:.09});
$$(".reveal").forEach(el=>revealer.observe(el));
const chapters=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const light=e.target.dataset.theme==="light";header.classList.toggle("light-header",light);rail.classList.toggle("rail-dark",light);const id=e.target.id;const anchor=["top","mission","focus","journey","giving"].includes(id)?id:(id==="horizon"?"journey":"giving");$$(".rail-item").forEach(r=>r.classList.toggle("is-active",r.dataset.rail===anchor));}})},{rootMargin:"-32% 0px -42% 0px",threshold:0});
$$("[data-theme]").forEach(el=>chapters.observe(el));
}else{$$(".reveal").forEach(el=>el.classList.add("visible"));}
const focuses={
clinics:{number:"01 / 04",kicker:"THE PLACES CARE BEGINS",title:"Stronger clinics.<br>Healthier communities.",description:"Our primary intention is to help smaller clinics in rural settings access adequate medical supplies and resources.",image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=85",kind:"clinic"},
equipment:{number:"02 / 04",kicker:"MEDICAL SUPPLIES AND ESSENTIAL EQUIPMENT",title:"The right tools.<br>More potential for care.",description:"We aspire to expand access to essential equipment and supplies for underserved communities and their care providers.",image:"https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1800&q=85",kind:"clinic"},
grants:{number:"03 / 04",kicker:"OPPORTUNITY FOR FUTURE CAREGIVERS",title:"Talent deserves<br>an opportunity.",description:"The foundation aims to explore medical grants for underprivileged students seeking pathways to healthcare education.",image:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1800&q=85",kind:"student"},
education:{number:"04 / 04",kicker:"MEDICAL AND DENTAL EDUCATION",title:"Opening doors<br>to tomorrow.",description:"Support for aspiring medical or dental students may be considered on a case-by-case basis, subject to confirmed eligibility and available programs.",image:"https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1800&q=85",kind:"student"}};
let activeFocus="clinics";
$$("[data-focus]").forEach(btn=>btn.addEventListener("click",()=>{
activeFocus=btn.dataset.focus;const d=focuses[activeFocus];
$$("[data-focus]").forEach(b=>{const selected=b===btn;b.classList.toggle("active",selected);b.setAttribute("aria-pressed",String(selected));});
const img=$("#focusImage");img.style.opacity=".32";
const temp=new Image();temp.onload=()=>{if(activeFocus===btn.dataset.focus){img.src=d.image;img.style.opacity="1";}};temp.onerror=()=>{img.style.opacity="1";};temp.src=d.image;
$("#focusCount").textContent=d.number;$("#focusEyebrow").textContent=d.kicker;$("#focusTitle").innerHTML=d.title;$("#focusText").textContent=d.description;
}));
let frequency="once",amount=50;
const total=$("#giftTotal"),custom=$("#customAmount");
function renderGift(){total.textContent="$"+Math.round(amount).toLocaleString("en-US");$("#giftSummary").textContent=frequency==="monthly"?"YOUR MONTHLY PREVIEW":"YOUR ONE-TIME PREVIEW";}
$$("[data-frequency]").forEach(btn=>btn.addEventListener("click",()=>{frequency=btn.dataset.frequency;$$("[data-frequency]").forEach(b=>{b.classList.toggle("selected",b===btn);b.setAttribute("aria-pressed",String(b===btn));});renderGift();}));
$$("[data-amount]").forEach(btn=>btn.addEventListener("click",()=>{amount=Number(btn.dataset.amount);custom.value="";$$("[data-amount]").forEach(b=>{b.classList.toggle("selected",b===btn);b.setAttribute("aria-pressed",String(b===btn));});renderGift();}));
custom.addEventListener("input",()=>{const n=Number(custom.value);if(custom.value!==""&&Number.isFinite(n)&&n>=1&&n<=100000){amount=n;$$("[data-amount]").forEach(b=>{b.classList.remove("selected");b.setAttribute("aria-pressed","false");});renderGift();}});
const modal=$("#modal"),dialog=$("#modal .dialog"),modalClose=$("#modalClose"),dialogContent=$("#dialogContent"),heading=$("#dialogHeading"),description=$("#dialogDescription");let lastFocus=null;
function openModal(kind){
lastFocus=document.activeElement;dialogContent.replaceChildren();
const isGift=kind==="gift";const titles={vision:"A mission shaped by possibility.",clinic:"Rural clinic resource enquiry",student:"Medical and dental education enquiry",partnership:"Let's explore a partnership.",gift:"Your giving preview"};
const descriptions={vision:"The Michael Ofori M.D. Foundation seeks to support underserved communities through medical resources, education and compassionate charitable initiatives. Verified founder stories, program results and professional photography can be added after approval.",clinic:"This illustrates how small rural clinics could introduce their resource needs. No official applications or eligibility decisions are currently available.",student:"This is an example of a student interest pathway. Grant guidelines and eligibility have not yet been confirmed.",partnership:"A proposed contact experience for organizations and supporters who want to discuss collaboration.",gift:"Your selections are summarized below. No payment will be initiated."};
$("#dialogOverline").textContent="MICHAEL OFORI M.D. FOUNDATION / INTERACTIVE DEMO";
heading.textContent=titles[kind]||titles.partnership;description.textContent=descriptions[kind]||descriptions.partnership;
if(isGift){const summary=document.createElement("p");summary.className="gift-modal-summary";summary.style.cssText="font-size:18px;font-weight:800;color:#17233b";summary.textContent="$"+Math.round(amount).toLocaleString("en-US")+" · "+(frequency==="monthly"?"Monthly":"One-time")+" · "+$("#givingFocus").value;dialogContent.append(summary);}
else if(kind!=="vision"){
const form=document.createElement("form");form.innerHTML='<label for="previewName">Full name</label><input id="previewName" name="name" autocomplete="name" maxlength="80" required><label for="previewEmail">Email address</label><input id="previewEmail" type="email" name="email" autocomplete="email" maxlength="130" required><label for="previewMessage">Briefly describe your interest</label><textarea id="previewMessage" name="message" maxlength="900" required></textarea><button class="button button-dark" type="submit">Review enquiry preview ↗</button>';
form.addEventListener("submit",e=>{e.preventDefault();const name=$("#previewName").value.trim();dialogContent.replaceChildren();const note=document.createElement("p");note.textContent="Thank you, "+name+". This is only a preview: your enquiry has not been sent or saved.";dialogContent.append(note);});
dialogContent.append(form);
}
modal.hidden=false;document.body.style.overflow="hidden";modalClose.focus();
}
function closeModal(){if(modal.hidden)return;modal.hidden=true;document.body.style.overflow="";lastFocus?.focus?.();}
modalClose.addEventListener("click",closeModal);modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
document.addEventListener("keydown",e=>{if(modal.hidden)return;if(e.key==="Escape"){closeModal();return;}if(e.key==="Tab"){const focusables=Array.from(dialog.querySelectorAll('button:not([disabled]),input,textarea,select,a[href]')).filter(el=>el.getClientRects().length);const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
$$("[data-modal]").forEach(btn=>btn.addEventListener("click",()=>openModal(btn.dataset.modal)));
$("#focusEnquire").addEventListener("click",()=>openModal(focuses[activeFocus].kind));
const toast=$("#toast");let timer;function showToast(s){toast.textContent=s;toast.classList.add("show");clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove("show"),3000);}
$("#reviewGift").addEventListener("click",()=>{const value=custom.value.trim();if(value!==""&&(!Number.isFinite(Number(value))||Number(value)<1||Number(value)>100000)){showToast("Enter an amount from $1 to $100,000.");custom.focus();return;}openModal("gift");});
})();
