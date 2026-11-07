// One scroll clock drives three staggered color ramps.
(() => {
 const section=document.querySelector('.editorial-connection');
 if(!section)return;
 const stage=section.querySelector('.declaration-stage');
 const lines=[...stage.querySelectorAll('h2 span')];
 const sub=stage.querySelector('.declaration-sub');
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
   line.style.setProperty('--declaration-ink','rgb('+ink+' '+ink+' '+ink+')');
  });
  // the supporting copy follows once both main lines have filled in
  if(sub){const s=reduced.matches?1:Math.max(0,Math.min(1,(progress-.55)/.35));sub.style.setProperty('--sub-progress',(s*s*(3-2*s)).toFixed(3));}
 }
 function queue(){if(!frame)frame=requestAnimationFrame(paint);}
 addEventListener('scroll',queue,{passive:true});
 addEventListener('resize',queue);
 reduced.addEventListener('change',queue);
 paint();
})();
