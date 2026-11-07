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
 // The black scene is cut into the same four columns as the white panels; each column lifts up and away
 // (scene included) while the white panel underneath follows its lower edge.
 const scene=region.querySelector('.cinematic-bridge');
 const lift=document.createElement('div');lift.className='bridge-lift';lift.setAttribute('aria-hidden','true');
 scene.after(lift);
 const columns=[[0,16.6666667],[16.6666667,50],[50,83.3333333],[83.3333333,100]];
 let liftCols=[];
 function buildLift(){
  lift.replaceChildren();
  liftCols=columns.map(([l,r])=>{
   const c=scene.cloneNode(true);c.removeAttribute('aria-label');c.classList.add('bridge-lift__col');
   c.style.clipPath='inset(0 '+(100-r)+'% 0 '+l+'%)';lift.appendChild(c);return c;
  });
 }
 const liftEase=v=>{v=clamp(v);return v<.5?4*v*v*v:1-Math.pow(-2*v+2,3)/2;};
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
  // left to right, each column a beat after its neighbour, all moving at once (overlapping)
  const lifting=active&&whiteProgress>0&&whiteProgress<1;
  if(lifting&&!liftCols.length)buildLift();
  if(!lifting&&liftCols.length){lift.replaceChildren();liftCols=[];}
  scene.style.visibility=lifting?'hidden':'';
  whitePanels.forEach((panel,i)=>{
   const t=liftEase((whiteProgress-i*.12)/.64);
   panel.style.transform='translate3d(0,'+(100*(1-t))+'%,0)';
   if(liftCols[i])liftCols[i].style.transform='translate3d(0,'+(-100*t)+'%,0)';
  });
  // Sticky's lower edge and Problem's top coincide exactly, with no scroll jump.
  const done=!active||travelled>=base+distance-.01;
  const title=parts[1];
  const settledTitle=problem.querySelector('.editorial-title');
  const problemScroll=Math.max(0,-problem.getBoundingClientRect().top);
  const partnerFill=done?clamp(problemScroll/(height*.42)):0;
  problem.style.setProperty('--partner-fill',partnerFill*100+'%');
  if(partnerFillActive!==(partnerFill>0)){
   partnerFillActive=partnerFill>0;
   dispatchEvent(new CustomEvent('partner-fill-active',{detail:{active:partnerFillActive}}));
  }
  const preview=active&&whiteProgress>0&&!done;
  problem.classList.toggle('title-in',done);
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

