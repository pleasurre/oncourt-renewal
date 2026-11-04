// Keep the existing header contrast and Hero/black-bridge choreography.
const header=document.querySelector('.site-header');
const hero=document.querySelector('#hero');
function updateHeaderContrast(){
 if(header&&hero)header.classList.toggle('header-on-light',hero.getBoundingClientRect().bottom<=header.offsetHeight);
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
 let queued=false,ready;
 function handoff(done){
  // Opacity on the whole section also hides descendants with explicit visibility.
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
  handoff(!active||travelled>=base+distance-.01);
 }
 function queue(){if(!queued){queued=true;requestAnimationFrame(paint);}}
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});
 addEventListener('pageshow',paint);reduced.addEventListener('change',paint);
 paint();
})();
