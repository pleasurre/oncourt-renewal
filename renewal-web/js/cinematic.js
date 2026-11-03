// Header contrast for the static Hero → Problem flow.
const header=document.querySelector('.site-header');
const hero=document.querySelector('#hero');
function updateHeaderContrast(){
 if(header&&hero)header.classList.toggle('header-on-light',hero.getBoundingClientRect().bottom<=header.offsetHeight);
}
addEventListener('scroll',updateHeaderContrast,{passive:true});
addEventListener('resize',updateHeaderContrast);
updateHeaderContrast();

// Eight downward curtains: each starts when the previous has filled 10%.
(() => {
 if(!hero)return;
 const stage=hero.querySelector('.court-hero-stage');
 if(!stage)return;
 const curtains=document.createElement('div');
 curtains.className='hero-scroll-curtains';
 curtains.setAttribute('aria-hidden','true');
 const panels=Array.from({length:8},()=>{
  const panel=document.createElement('i');
  curtains.appendChild(panel);
  return panel;
 });
 stage.appendChild(curtains);
 hero.classList.add('hero-curtain-enabled');
 let frame=0,drag=null;
 const clamp=value=>Math.max(0,Math.min(1,value));
 function render(){
  frame=0;
  const distance=Math.max(1,hero.offsetHeight-stage.offsetHeight);
  const progress=clamp(-hero.getBoundingClientRect().top/distance);
  const travel=progress*(1+(panels.length-1)*.1);
  panels.forEach((panel,index)=>{
   panel.style.transform='scaleY('+clamp(travel-index*.1)+')';
  });
  hero.dataset.curtainProgress=progress.toFixed(4);
 }
 function request(){if(!frame)frame=requestAnimationFrame(render);}
 addEventListener('scroll',request,{passive:true});
 addEventListener('resize',request);
 new ResizeObserver(request).observe(stage);
 // Touch retains native scrolling. Mouse dragging downward advances the curtains.
 stage.addEventListener('pointerdown',event=>{
  if(event.pointerType!=='mouse'||event.button!==0||event.target.closest('a,button,input,select,textarea'))return;
  drag={id:event.pointerId,y:event.clientY,scroll:scrollY};
  stage.setPointerCapture(event.pointerId);
  stage.classList.add('is-curtain-dragging');
  event.preventDefault();
 });
 stage.addEventListener('pointermove',event=>{
  if(!drag||event.pointerId!==drag.id)return;
  window.scrollTo({top:Math.max(0,drag.scroll+(event.clientY-drag.y)*1.6),behavior:'instant'});
 });
 function release(event){
  if(!drag||event.pointerId!==drag.id)return;
  drag=null;
  stage.classList.remove('is-curtain-dragging');
  if(stage.hasPointerCapture(event.pointerId))stage.releasePointerCapture(event.pointerId);
 }
 stage.addEventListener('pointerup',release);
 stage.addEventListener('pointercancel',release);
 stage.addEventListener('lostpointercapture',release);
 render();
})();
