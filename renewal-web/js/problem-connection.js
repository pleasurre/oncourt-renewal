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
  const viewport = document.documentElement.clientHeight;
  const progress = (viewport * .45 - section.getBoundingClientRect().top) / Math.max(1, viewport * .63);
  lines.forEach((line,index)=>{
   const phase=reduced.matches?1:Math.max(0,Math.min(1,(progress-index*.29)/.42));
   const blend=phase*phase*(3-2*phase);
   const ink=Math.round(217-194*blend);
   line.querySelector('.declaration-brand')?.style.setProperty('--brand-progress',(blend*100)+'%');
   line.style.setProperty('--declaration-ink','rgb('+ink+' '+ink+' '+ink+')');
  });
 }
 function queue(){if(!frame)frame=requestAnimationFrame(paint);}
 addEventListener('scroll',queue,{passive:true});
 addEventListener('resize',queue);
 reduced.addEventListener('change',queue);
 paint();
})();
