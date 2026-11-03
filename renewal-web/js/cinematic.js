// Header contrast for the static Hero → Problem flow.
const header=document.querySelector('.site-header');
const hero=document.querySelector('#hero');
function updateHeaderContrast(){
 if(header&&hero)header.classList.toggle('header-on-light',hero.getBoundingClientRect().bottom<=header.offsetHeight);
}
addEventListener('scroll',updateHeaderContrast,{passive:true});
addEventListener('resize',updateHeaderContrast);
updateHeaderContrast();

// One-gesture Hero ↔ Problem vertical transitions.
(() => {
 const hero=document.querySelector('#hero');
 const problem=document.querySelector('#problem');
 if(!hero||!problem)return;
 let moving=false;
 let releasedAt=0;
 let startY=null;
 let origin=null;
 const near=section=>Math.abs(section.getBoundingClientRect().top)<=6;
 const destination=delta=>{
  if(delta>0&&near(hero))return problem;
  if(delta<0&&near(problem))return hero;
  return null;
 };
 const transition=target=>{
  if(moving||performance.now()<releasedAt)return;
  moving=true;
  const from=window.scrollY;
  const to=target.getBoundingClientRect().top+from;
  const root=document.documentElement;
  const previous=root.style.scrollBehavior;
  root.style.scrollBehavior='auto';
  const duration=matchMedia('(prefers-reduced-motion: reduce)').matches?0:1100;
  const began=performance.now();
  const frame=now=>{
   const p=duration?Math.min(1,(now-began)/duration):1;
   const eased=p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;
   window.scrollTo(0,from+(to-from)*eased);
   if(p<1){requestAnimationFrame(frame);return;}
   root.style.scrollBehavior=previous;
   moving=false;
   releasedAt=performance.now()+250;
  };
  requestAnimationFrame(frame);
 };
 window.addEventListener('wheel',event=>{
  if(moving||performance.now()<releasedAt){event.preventDefault();return;}
  if(Math.abs(event.deltaY)<=Math.abs(event.deltaX)||!event.deltaY)return;
  const target=destination(event.deltaY);
  if(target){event.preventDefault();transition(target);}
 },{passive:false});

 for(const section of [hero,problem]){
  section.addEventListener('pointerdown',event=>{
   if(event.pointerType==='mouse'&&!event.target.closest('a,button,input')){
    startY=event.clientY;origin=section;
   }
  });
  section.addEventListener('pointerup',event=>{
   if(origin===section&&startY!==null){
    const delta=startY-event.clientY;
    const target=destination(delta);
    if(Math.abs(delta)>=48&&target)transition(target);
   }
   startY=null;origin=null;
  });
  section.addEventListener('pointercancel',()=>{startY=null;origin=null;});
  let touchY=null;
  section.addEventListener('touchstart',event=>{
   touchY=event.touches.length===1?event.touches[0].clientY:null;
  },{passive:true});
  section.addEventListener('touchmove',event=>{
   if(moving){event.preventDefault();return;}
   if(touchY===null||event.touches.length!==1)return;
   const delta=touchY-event.touches[0].clientY;
   if(Math.abs(delta)>8&&destination(delta))event.preventDefault();
  },{passive:false});
  section.addEventListener('touchend',event=>{
   if(touchY!==null&&event.changedTouches.length===1){
    const delta=touchY-event.changedTouches[0].clientY;
    const target=destination(delta);
    if(Math.abs(delta)>=48&&target)transition(target);
   }
   touchY=null;
  },{passive:true});
  section.addEventListener('touchcancel',()=>{touchY=null;},{passive:true});
 }
})();
