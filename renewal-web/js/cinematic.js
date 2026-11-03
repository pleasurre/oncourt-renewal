// Header contrast for the static Hero → Problem flow.
const header=document.querySelector('.site-header');
const hero=document.querySelector('#hero');
function updateHeaderContrast(){
 if(header&&hero)header.classList.toggle('header-on-light',hero.getBoundingClientRect().bottom<=header.offsetHeight);
}
addEventListener('scroll',updateHeaderContrast,{passive:true});
addEventListener('resize',updateHeaderContrast);
updateHeaderContrast();

(() => {
 const stage=hero?.querySelector('.court-hero-stage');
 const message=document.querySelector('#problem .problem-message');
 if(!stage||!message)return;
 const slot=document.createElement('div');
 slot.className='problem-video-slot';slot.setAttribute('aria-hidden','true');
 message.prepend(slot);
 const copy=stage.querySelector('.court-hero-copy'),guides=stage.querySelector('.hero-guides');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0;
 stage.classList.add('hero-flight');
 function render(){
  frame=0;
  const hr=hero.getBoundingClientRect(),target=slot.getBoundingClientRect();
  const p=Math.max(0,Math.min(1,-hr.top/Math.max(1,hero.offsetHeight)));
  if(p>=1){
   if(stage.parentElement!==slot)slot.appendChild(stage);
   stage.classList.add('is-landed');
   Object.assign(stage.style,{left:'0px',top:'0px',width:'100%',height:'100%',borderRadius:'16px'});
  }else{
   if(stage.parentElement!==document.body)document.body.appendChild(stage);
   stage.classList.remove('is-landed');
   const t=reduced.matches?0:p*p*(3-2*p);
   Object.assign(stage.style,{left:(target.left*t)+'px',top:(target.top*t)+'px',width:(hero.clientWidth+(target.width-hero.clientWidth)*t)+'px',height:(innerHeight+(target.height-innerHeight)*t)+'px',borderRadius:(16*t)+'px'});
  }
  if(copy)copy.style.opacity=String(Math.max(0,1-p*3));
  if(guides)guides.style.opacity=String(Math.max(0,1-p*3));
  const ball=message.querySelector('.problem-halftone'),title=message.querySelector('h2'),body=message.querySelector('.problem-description');
  if(ball&&title&&body)ball.style.top=((title.offsetTop+body.offsetTop+body.offsetHeight)/2)+'px';
 }
 function request(){if(!frame)frame=requestAnimationFrame(render);}
 addEventListener('scroll',request,{passive:true});addEventListener('resize',request);
 new ResizeObserver(request).observe(slot);
 document.fonts?.ready.then(request);
 render();
})();
