// Header contrast for the static Hero → Problem flow.
const header=document.querySelector('.site-header');
const hero=document.querySelector('#hero');
function updateHeaderContrast(){
 if(header&&hero)header.classList.toggle('header-on-light',hero.getBoundingClientRect().bottom<=header.offsetHeight);
}
addEventListener('scroll',updateHeaderContrast,{passive:true});
addEventListener('resize',updateHeaderContrast);
updateHeaderContrast();


// Native sticky + scroll progress replaces the old Hero/Problem wheel interception.
(() => {
 const region=document.querySelector('.hero-bridge-scroll');
 const stage=region?.querySelector('.hero-bridge-stage');
 if(!region||!stage)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const panels=[...region.querySelectorAll('.bridge-curtains i')];
 const art=region.querySelector('.bridge-art');
 const copy=region.querySelector('.bridge-copy');
 const parts=[...copy.children];
 const groups=['frame','throat','handle','vertical','horizontal'].map(name=>[...region.querySelectorAll('[data-phase="'+name+'"] path,[data-phase="'+name+'"] ellipse')].map(path=>{const length=path.getTotalLength();path.style.strokeDasharray=length;path.style.strokeDashoffset=length;return {path,length};}));
 const clamp=v=>Math.max(0,Math.min(1,v));
 const ease=v=>{v=clamp(v);return v*v*(3-2*v);};
 let queued=false;
 function paint(){
  queued=false;
  const progress=reduced.matches?1:clamp(-region.getBoundingClientRect().top/Math.max(1,region.offsetHeight-stage.offsetHeight));
  panels.forEach((panel,i)=>{panel.style.transform='scaleX('+ease((progress-i*.012)/.16)+')';});
  art.style.opacity=progress>=.225?'1':'0';
  groups.forEach((group,i)=>{const t=ease((progress-(.24+i*.06))/.065);group.forEach(({path,length})=>path.style.strokeDashoffset=length*(1-t));});
  parts.forEach((part,i)=>{const t=ease((progress-(.585+i*.025))/.07);part.style.opacity=t;part.style.transform='translateY('+(12*(1-t))+'px)';});
  copy.style.top=(63-13*ease((progress-.72)/.1))+'%';
  if(reduced.matches){art.style.opacity='1';copy.style.top='50%';}
 }
 function queue(){if(!queued){queued=true;requestAnimationFrame(paint);}}
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});reduced.addEventListener('change',queue);paint();
})();

/* Reveal the Connection copy once, when its heading enters view. */
(() => {
 const section=document.querySelector('#connection');
 const heading=section?.querySelector('.connection-heading');
 if(!heading||!('IntersectionObserver' in window))return;
 section.classList.add('connection-fade-ready');
 const observer=new IntersectionObserver(entries=>{
  if(entries.some(entry=>entry.isIntersecting)){
   section.classList.add('connection-fade-visible');
   observer.disconnect();
  }
 },{threshold:.4});
 observer.observe(heading);
})();

