// Keep the existing header contrast and Hero/black-bridge choreography.
const header=document.querySelector('.site-header');
const bridgeRegion=document.querySelector('.hero-bridge-scroll');
const darkBands=[...document.querySelectorAll('#brand-message,.player-experience,#oncourt-features,#beyond')];
function updateHeaderContrast(){
 if(!header||!bridgeRegion)return;
 const y=header.offsetHeight/2;
 const bridgeEnd=document.querySelector('#problem').getBoundingClientRect().top;
 const dock=document.querySelector('.problem-nav-dock');
 if(dock){
  dock.style.setProperty('--problem-nav-height',header.offsetHeight+'px');
  const top=dock.getBoundingClientRect().top;
  const docking=bridgeEnd<=0&&top>0;
  header.classList.toggle('is-problem-docked',docking);
  if(docking)header.style.setProperty('--problem-nav-top',top+'px');
  const hiding=top>0&&bridgeEnd<=0&&top>=innerHeight;
  header.classList.toggle('is-problem-nav-hidden',hiding);
  header.inert=hiding;
 }
 const dark=bridgeRegion.dataset.whiteTransition==='true'||bridgeEnd>y&&bridgeRegion.dataset.headerLight!=='true'||darkBands.some(el=>{
  const bounds=el.getBoundingClientRect();return bounds.top<=y&&bounds.bottom>y;
 });
 header.classList.toggle('header-on-light',!dark);
}
addEventListener('scroll',updateHeaderContrast,{passive:true});
addEventListener('resize',updateHeaderContrast);updateHeaderContrast();

(() => {
 const region=document.querySelector('.hero-bridge-scroll');
 const stage=region?.querySelector('.hero-bridge-stage');
 const problem=document.querySelector('#problem');
 if(!stage||!problem)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const curtains=[...region.querySelectorAll('.bridge-curtains i')];
 const whitePanels=[...region.querySelectorAll('.bridge-white-panels i')];
 const art=region.querySelector('.bridge-art');
 const copy=region.querySelector('.bridge-copy');
 const whiteLayer=region.querySelector('.bridge-white-panels');
 const racketFace=region.querySelector('[data-phase="frame"] ellipse');
 const parts=[...copy.children];
 const groups=['frame','throat','handle','vertical','horizontal'].map(name=>[...region.querySelectorAll('[data-phase="'+name+'"] path,[data-phase="'+name+'"] ellipse')].map(path=>{
  const length=path.getTotalLength();path.style.strokeDasharray=length;path.style.strokeDashoffset=length;return {path,length};
 }));
 const clamp=v=>Math.max(0,Math.min(1,v));
 const ease=v=>{v=clamp(v);return v*v*(3-2*v);};
 // Cubic-bezier(.25,.46,.45,.94), evaluated from the same scroll clock.
 function panelEase(t){
  t=clamp(t);let lo=0,hi=1,u=t;
  for(let n=0;n<12;n++){u=(lo+hi)/2;const x=3*(1-u)*(1-u)*u*.25+3*(1-u)*u*u*.45+u*u*u;if(x<t)lo=u;else hi=u;}
  return t===0?0:t===1?1:3*(1-u)*(1-u)*u*.46+3*(1-u)*u*u*.94+u*u*u;
 }
 let queued=false,ready,titleSpacer,partnerFillActive;
 function handoff(done){
  problem.classList.toggle('bridge-awaiting',!done);
  problem.inert=!done;
  region.dataset.problemReady=done?'true':'false';
  if(ready!==done){ready=done;dispatchEvent(new Event('bridge-handoff'));}
 }
 function paint(){
  queued=false;
  const active=whitePanels.length===4&&!reduced.matches;
  region.classList.toggle('bridge-transition-ready',active);
  const height=stage.offsetHeight;
  const distance=active?height*Number(getComputedStyle(region).getPropertyValue('--bridge-white-distance')):0;
  const base=Math.max(1,region.offsetHeight-height-distance);
  const travelled=-region.getBoundingClientRect().top;
  const progress=reduced.matches?1:clamp(travelled/base);
  // the racket starts drawing as the black curtains close: no empty black stretch in between
  curtains.forEach((panel,i)=>{panel.style.transform='scaleX('+ease((progress-i*.015)/.2)+')';});
  art.style.opacity=progress>=.17?'1':'0';
  groups.forEach((group,i)=>{const t=ease((progress-(.17+i*.07))/.09);group.forEach(({path,length})=>path.style.strokeDashoffset=length*(1-t));});
  parts.forEach((part,i)=>{const t=ease((progress-(.5+i*.03))/.08);part.style.opacity=t;part.style.transform='translateY('+(12*(1-t))+'px)';});
  copy.style.top=(63-13*ease((progress-.66)/.14))+'%';
  if(reduced.matches){art.style.opacity='1';copy.style.top='50%';}
  const whiteProgress=active?clamp((travelled-base)/distance):1;
  // white opens from the sweet spot of the racket like a ball being struck, and fills the screen
  const sb=stage.getBoundingClientRect(),fb=racketFace.getBoundingClientRect();
  const cx=fb.left+fb.width/2-sb.left,cy=fb.top+fb.height/2-sb.top;
  const reach=Math.hypot(Math.max(cx,sb.width-cx),Math.max(cy,sb.height-cy))+2;
  const radius=active?reach*panelEase(whiteProgress/.8):0;
  if(whiteLayer)whiteLayer.style.clipPath='circle('+radius.toFixed(1)+'px at '+cx.toFixed(1)+'px '+cy.toFixed(1)+'px)';
  // Sticky's lower edge and Problem's top coincide exactly, with no scroll jump.
  const done=!active||travelled>=base+distance-.01;
  const title=parts[1];
  const settledTitle=problem.querySelector('.editorial-title');
  const problemScroll=Math.max(0,-problem.getBoundingClientRect().top);
  const partnerFill=done?clamp(problemScroll/(height*.25)):0;
  problem.style.setProperty('--partner-fill',partnerFill*100+'%');
  if(partnerFillActive!==(partnerFill>0)){
   partnerFillActive=partnerFill>0;
   dispatchEvent(new CustomEvent('partner-fill-active',{detail:{active:partnerFillActive}}));
  }
  const preview=active&&whiteProgress>0&&!done;
  if(preview){
   const outro=ease(whiteProgress/.28);
   parts[0].style.opacity=1-outro;
   parts[0].style.transform='translateY('+12*outro+'px)';
   if(!title.classList.contains('is-flying')){
    const from=title.getBoundingClientRect().top-stage.getBoundingClientRect().top;
    title.style.setProperty('--flight-start',from+'px');
    title.style.setProperty('--flight-size',getComputedStyle(title).fontSize);
    titleSpacer=title.cloneNode(true);
    titleSpacer.setAttribute('aria-hidden','true');
    titleSpacer.style.visibility='hidden';
    title.before(titleSpacer);
    title.classList.add('is-flying');
    stage.append(title);
   }
   const target=settledTitle.getBoundingClientRect().top-problem.getBoundingClientRect().top;
   title.style.setProperty('--flight-end',target+'px');
   title.style.setProperty('--flight-progress',ease(whiteProgress));
  }else if(title.classList.contains('is-flying')){
   title.classList.remove('is-flying');
   titleSpacer.replaceWith(title);
   titleSpacer=null;
  }
  region.dataset.whiteTransition=String(active&&whiteProgress>0&&!done);
  if(preview){
   // the dark header shows only outside the white circle
   const bounds=header.getBoundingClientRect();
   const hx=cx-(bounds.left-sb.left),hy=cy-(bounds.top-sb.top),w=bounds.width,h=bounds.height,r=radius;
   header.style.clipPath=r>0?'path(evenodd,"M0 0H'+w+'V'+h+'H0Z M'+(hx-r)+' '+hy+'a'+r+' '+r+' 0 1 0 '+(2*r)+' 0a'+r+' '+r+' 0 1 0 '+(-2*r)+' 0Z")':'';
  }else{
   header.style.clipPath='';
  }
  {const hb=header.getBoundingClientRect(),hx=cx-(hb.left-sb.left),hy=cy-(hb.top-sb.top);
   const far=Math.max(Math.hypot(hx,hy),Math.hypot(hb.width-hx,hy),Math.hypot(hx,hb.height-hy),Math.hypot(hb.width-hx,hb.height-hy));
   region.dataset.headerLight=String(active&&radius>=far);}
  updateHeaderContrast();
  title.style.visibility=active&&done?'hidden':'';
  handoff(done);
 }
 function queue(){if(!queued){queued=true;requestAnimationFrame(paint);}}
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});
 addEventListener('pageshow',paint);reduced.addEventListener('change',paint);
 paint();
})();

