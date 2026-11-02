/* Photo stays still. Only foliage runs on the browser's independent CSS clock. */
(() => {
 'use strict';
 const hero=document.querySelector('.court-hero');
 if(!hero)return;
 const header=document.querySelector('.site-header');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0,visible=true;
 function update(){
  frame=0;
  const top=0;
  hero.style.setProperty('--court-header',top+'px');
  // CSS owns responsive sizing; measure the rendered frame for scroll progress.
  const stageHeight=hero.querySelector('.court-hero-stage').clientHeight;
  const rect=hero.getBoundingClientRect();
  const progress=Math.max(0,Math.min(1,(top-rect.top)/Math.max(1,rect.height-stageHeight)));
  hero.style.setProperty('--hero-shadow-fade',reduced.matches?'1':String(1-progress*.65));
  hero.dataset.transitionProgress=progress.toFixed(3);
 }
 function request(){if(!frame)frame=requestAnimationFrame(update);}
 function pause(){hero.style.setProperty('--shadow-play-state',document.hidden||!visible?'paused':'running');}
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;pause();},{rootMargin:'100px'});
 observer.observe(hero);
 addEventListener('scroll',request,{passive:true});
 addEventListener('resize',request);
 addEventListener('load',request);
 new ResizeObserver(request).observe(header);
 document.addEventListener('visibilitychange',pause);
 reduced.addEventListener('change',request);
 update();
})();
