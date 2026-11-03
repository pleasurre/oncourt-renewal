// Header contrast for the static Hero → Problem flow.
const header=document.querySelector('.site-header');
const hero=document.querySelector('#hero');
function updateHeaderContrast(){
 if(header&&hero)header.classList.toggle('header-on-light',hero.getBoundingClientRect().bottom<=header.offsetHeight);
}
addEventListener('scroll',updateHeaderContrast,{passive:true});
addEventListener('resize',updateHeaderContrast);
updateHeaderContrast();

// Advance from the Hero to Problem after four deliberate downward-scroll gestures.
(() => {
 const hero=document.querySelector('#hero');
 const problem=document.querySelector('#problem');
 if(!hero||!problem)return;
 const requiredGestures=4;
 let gestures=0;
 let lastWheelGesture=null;
 let pointerStartY=null;
 let touchStartY=null;
 let advancing=false;

 const atHeroStart=()=>!advancing&&window.scrollY<=4&&hero.getBoundingClientRect().top>=-2;
 const advance=()=>{
  if(advancing)return;
  advancing=true;
  problem.scrollIntoView({behavior:'smooth',block:'start'});
 };
 const registerGesture=()=>{
  if(!atHeroStart())return;
  gestures+=1;
  if(gestures>=requiredGestures)advance();
 };

 hero.addEventListener('wheel',event=>{
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
  if(touchStartY===null||event.touches.length!==1||!atHeroStart())return;
  if(touchStartY-event.touches[0].clientY>8)event.preventDefault();
 },{passive:false});
 hero.addEventListener('touchend',event=>{
  if(touchStartY!==null&&event.changedTouches.length===1&&touchStartY-event.changedTouches[0].clientY>=48)registerGesture();
  touchStartY=null;
 },{passive:true});
 hero.addEventListener('touchcancel',()=>{touchStartY=null;},{passive:true});
})();
