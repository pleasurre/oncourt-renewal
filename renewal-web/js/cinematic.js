// Header contrast for the static Hero → Problem flow.
const header=document.querySelector('.site-header');
const hero=document.querySelector('#hero');
function updateHeaderContrast(){
 if(header&&hero)header.classList.toggle('header-on-light',hero.getBoundingClientRect().bottom<=header.offsetHeight);
}
addEventListener('scroll',updateHeaderContrast,{passive:true});
addEventListener('resize',updateHeaderContrast);
updateHeaderContrast();

// Advance from the Hero to Problem after two deliberate downward-scroll gestures.
(() => {
 const hero=document.querySelector('#hero');
 const problem=document.querySelector('#problem');
 if(!hero||!problem)return;
 const requiredGestures=2;
 let gestures=0;
 let lastWheelGesture=null;
 let pointerStartY=null;
 let touchStartY=null;
 let advancing=false;

 const atHeroStart=()=>!advancing&&window.scrollY<=4&&hero.getBoundingClientRect().top>=-2;
 const advance=()=>{
  if(advancing)return;
  advancing=true;
  const startY=window.scrollY;
  const targetY=problem.getBoundingClientRect().top+startY;
  const duration=matchMedia('(prefers-reduced-motion: reduce)').matches?0:1100;
  const root=document.documentElement;
  const previousBehavior=root.style.scrollBehavior;
  root.style.scrollBehavior='auto';
  const started=performance.now();
  const frame=now=>{
   const progress=duration?Math.min(1,(now-started)/duration):1;
   const eased=progress<.5?4*progress*progress*progress:1-Math.pow(-2*progress+2,3)/2;
   window.scrollTo(0,startY+(targetY-startY)*eased);
   if(progress<1){requestAnimationFrame(frame);return;}
   root.style.scrollBehavior=previousBehavior;
   advancing=false;
   gestures=0;
  };
  requestAnimationFrame(frame);
 };
 const registerGesture=()=>{
  if(!atHeroStart())return;
  gestures+=1;
  if(gestures>=requiredGestures)advance();
 };

 hero.addEventListener('wheel',event=>{
  if(advancing){event.preventDefault();return;}
  if(event.deltaY<=0||!atHeroStart())return;
  event.preventDefault();
  const now=performance.now();
  if(lastWheelGesture===null||now-lastWheelGesture>650){
   lastWheelGesture=now;
   registerGesture();
  }
 },{passive:false});

 hero.addEventListener('pointerdown',event=>{
  if(event.pointerType==='mouse'&&atHeroStart())pointerStartY=event.clientY;
 });
 hero.addEventListener('pointerup',event=>{
  if(pointerStartY!==null&&pointerStartY-event.clientY>=48)registerGesture();
  pointerStartY=null;
 });
 hero.addEventListener('pointercancel',()=>{pointerStartY=null;});

 hero.addEventListener('touchstart',event=>{
  if(event.touches.length===1&&atHeroStart())touchStartY=event.touches[0].clientY;
 },{passive:true});
 hero.addEventListener('touchmove',event=>{
  if(advancing){event.preventDefault();return;}
  if(touchStartY===null||event.touches.length!==1||!atHeroStart())return;
  if(touchStartY-event.touches[0].clientY>8)event.preventDefault();
 },{passive:false});
 hero.addEventListener('touchend',event=>{
  if(touchStartY!==null&&event.changedTouches.length===1&&touchStartY-event.changedTouches[0].clientY>=48)registerGesture();
  touchStartY=null;
 },{passive:true});
 hero.addEventListener('touchcancel',()=>{touchStartY=null;},{passive:true});
})();
