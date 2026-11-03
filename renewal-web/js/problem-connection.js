// Entry animation owns inner text; scrub owns only the outer copy layers.
(() => {
 const section=document.querySelector('#problem.problem-connection-story');
 if(!section)return;
 const stage=section.querySelector('.story-stage');
 const question=section.querySelector('.story-question');
 const answer=section.querySelector('.story-answer');
 const body=question.querySelector('.problem-description');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let introduced=false,complete=false,queued=false,timer=0;
 const clamp=v=>Math.max(0,Math.min(1,v));
 const ease=v=>{v=clamp(v);return v*v*(3-2*v);};
 section.classList.add('story-ready','motion-ready');
 function finish(){complete=true;queue();}
 body.addEventListener('animationend',event=>{if(event.animationName==='copy-reveal')finish();});
 function intro(skip){
  introduced=true;complete=skip;
  section.classList.toggle('story-skip-intro',skip);
  section.classList.add('is-visible');
  clearTimeout(timer);if(!skip)timer=setTimeout(finish,1750);
 }
 function paint(){
  queued=false;
  const rect=section.getBoundingClientRect();
  const vh=stage.offsetHeight;
  if(reduced.matches){
   if(!introduced)intro(true);
   question.style.opacity='1';answer.style.opacity='1';question.style.visibility='visible';answer.style.visibility='visible';
   question.style.transform='none';answer.style.transform='none';
   question.removeAttribute('aria-hidden');answer.removeAttribute('aria-hidden');return;
  }
  if(rect.top>=innerHeight){
   if(introduced){introduced=false;complete=false;clearTimeout(timer);section.classList.remove('is-visible','story-skip-intro');}
  }else if(!introduced&&rect.top<=innerHeight*.23){intro(false);}
  const style=getComputedStyle(section);
  const lead=parseFloat(style.getPropertyValue('--story-lead'))*vh;
  const distance=parseFloat(style.getPropertyValue('--story-cross'))*vh;
  const raw=clamp((-rect.top-lead)/distance);
  const progress=complete?raw:0;
  const out=ease((progress-.2)/.4);
  const incoming=ease((progress-.4)/.5);
  question.style.visibility=out>=1?'hidden':'visible';
  answer.style.visibility=incoming<=0?'hidden':'visible';
  question.style.opacity=1-out;
  question.style.transform='translateY('+(-16*out)+'px)';
  answer.style.opacity=incoming;
  answer.style.transform='translateY('+(16*(1-incoming))+'px)';
  question.setAttribute('aria-hidden',out>=.99?'true':'false');
  answer.setAttribute('aria-hidden',incoming<=.01?'true':'false');
 }
 function queue(){if(!queued){queued=true;requestAnimationFrame(paint);}}
 // Restored deep scroll starts at its matching scene without flashing the intro.
 if(section.getBoundingClientRect().top < -8)intro(true);
 addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});
 addEventListener('pageshow',queue);reduced.addEventListener('change',queue);paint();
})();
