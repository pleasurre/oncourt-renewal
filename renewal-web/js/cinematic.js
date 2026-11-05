// Keep the existing header contrast and Hero/black-bridge choreography.
const header=document.querySelector('.site-header');
const bridgeRegion=document.querySelector('.hero-bridge-scroll');
const darkBands=[...document.querySelectorAll('#rally-marquee,#brand-message,#oncourt-features,#beyond')];
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
 let queued=false,ready,titleSpacer;
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
  curtains.forEach((panel,i)=>{panel.style.transform='scaleX('+ease((progress-i*.012)/.16)+')';});
  art.style.opacity=progress>=.225?'1':'0';
  groups.forEach((group,i)=>{const t=ease((progress-(.24+i*.06))/.065);group.forEach(({path,length})=>path.style.strokeDashoffset=length*(1-t));});
  parts.forEach((part,i)=>{const t=ease((progress-(.585+i*.025))/.07);part.style.opacity=t;part.style.transform='translateY('+(12*(1-t))+'px)';});
  copy.style.top=(63-13*ease((progress-.72)/.1))+'%';
  if(reduced.matches){art.style.opacity='1';copy.style.top='50%';}
  const whiteProgress=active?clamp((travelled-base)/distance):1;
  whitePanels.forEach((panel,i)=>{
   const t=panelEase((whiteProgress-i*.1)/.7);
   panel.style.transform='translate3d(0,'+(100*(1-t))+'%,0)';
  });
  // Sticky's lower edge and Problem's top coincide exactly, with no scroll jump.
  const done=!active||travelled>=base+distance-.01;
  const title=parts[1];
  const settledTitle=problem.querySelector('.editorial-title');
  const problemScroll=Math.max(0,-problem.getBoundingClientRect().top);
  const partnerFill=done?clamp(problemScroll/(height*.25)):0;
  problem.style.setProperty('--partner-fill',partnerFill*100+'%');
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
   const bounds=header.getBoundingClientRect();
   const panels=whitePanels.map(panel=>panel.getBoundingClientRect());
   const lowerEdge=panels.flatMap((panel,i)=>{
    const left=i===0?0:panel.left-bounds.left;
    const right=i===panels.length-1?bounds.width:panels[i+1].left-bounds.left;
    const y=Math.max(0,Math.min(bounds.height,panel.top-bounds.top));
    return [left+'px '+y+'px',right+'px '+y+'px'];
   });
   header.style.clipPath='polygon('+['0 0','100% 0',...lowerEdge.reverse()].join(',')+')';
  }else{
   header.style.clipPath='';
  }
  region.dataset.headerLight=String(active&&whitePanels.every(panel=>panel.getBoundingClientRect().top<=header.offsetHeight/2));
  updateHeaderContrast();
  title.style.visibility=active&&done?'hidden':'';
  handoff(done);
 }
 function queue(){if(!queued){queued=true;requestAnimationFrame(paint);}}
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});
 addEventListener('pageshow',paint);reduced.addEventListener('change',paint);
 paint();
})();

