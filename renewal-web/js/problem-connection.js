// Reveal Problem on entry after the bridge hands off the white screen.
(() => {
 const section=document.querySelector('#problem.problem-connection-story');
 if(!section)return;
 const bridge=document.querySelector('.hero-bridge-scroll');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 section.classList.add('motion-ready');
 function paint(){
  const top=section.getBoundingClientRect().top;
  if(bridge?.dataset.problemReady==='false'&&!reduced.matches){
   section.classList.remove('is-visible','story-skip-intro');
   return;
  }
  if(top<innerHeight&&!section.classList.contains('is-visible')){
   section.classList.toggle('story-skip-intro',reduced.matches||top < -8);
   section.classList.add('is-visible');
  }
 }
 const observer=new IntersectionObserver(paint,{threshold:0.01});
 observer.observe(section);
 addEventListener('bridge-handoff',paint);
 addEventListener('pageshow',paint);
 paint();
})();

// One scroll clock drives three staggered color ramps.
(() => {
 const section=document.querySelector('.editorial-connection');
 if(!section)return;
 const stage=section.querySelector('.declaration-stage');
 const lines=[...stage.querySelectorAll('span')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0;
 function paint(){
  frame=0;
  const distance=Math.max(1,section.offsetHeight-stage.offsetHeight);
  const progress=-section.getBoundingClientRect().top/distance;
  lines.forEach((line,index)=>{
   const phase=reduced.matches?1:Math.max(0,Math.min(1,(progress-index*.29)/.42));
   const ink=Math.round(217-194*phase*phase*(3-2*phase));
   line.style.setProperty('--declaration-ink','rgb('+ink+' '+ink+' '+ink+')');
  });
 }
 function queue(){if(!frame)frame=requestAnimationFrame(paint);}
 addEventListener('scroll',queue,{passive:true});
 addEventListener('resize',queue);
 reduced.addEventListener('change',queue);
 paint();
})();
