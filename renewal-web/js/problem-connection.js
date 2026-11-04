// Hold at Problem for its entrance and the downward copy transition.
(() => {
 const section=document.querySelector('#problem');
 if(!section)return;
 const bridge=document.querySelector('.hero-bridge-scroll');
 const title=section.querySelector('#problem-title');
 const copy=section.querySelector('.problem-description');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let state='before',previous=scrollY,timer=0,holding=false;
 section.classList.add('motion-ready');
 function release(){
  clearTimeout(timer);
  if(!holding)return;
  holding=false;
  document.documentElement.classList.remove('problem-scroll-hold');
  dispatchEvent(new CustomEvent('problem-scroll-hold',{detail:null}));
 }
 function hold(position,ms,next){
  holding=true;
  scrollTo({top:position,behavior:'instant'});
  dispatchEvent(new CustomEvent('problem-scroll-hold',{detail:position}));
  document.documentElement.classList.add('problem-scroll-hold');
  previous=scrollY;
  timer=setTimeout(()=>{state=next;release();},ms);
 }
 function paint(){
  if(holding)return;
  const y=scrollY;
  const top=section.getBoundingClientRect().top;
  const start=y+top;
  const movingDown=y>previous;
  previous=y;
  if(reduced.matches||location.hash==='#problem'&&state==='before'&&top < -8){
   state='done';
   section.classList.add('is-visible','story-skip-intro');
   return;
  }
  if(top>2){
   if(state!=='before'){
    state='before';
    section.classList.remove('is-visible','problem-copy-exiting','story-skip-intro');
   }
   return;
  }
  if(bridge?.dataset.problemReady==='false')return;
  if(state==='before'&&top < -innerHeight&& !movingDown){
   state='done';
   section.classList.add('is-visible','story-skip-intro');
   return;
  }
  if(state==='before'){
   state='entering';
   section.classList.add('is-visible');
   hold(start,1800,'reading');
  }else if(state==='reading'&&movingDown&&y>start+8){
   state='exiting';
   section.style.setProperty('--problem-copy-rise',(title.getBoundingClientRect().top-copy.getBoundingClientRect().top)+'px');
   section.classList.add('problem-copy-exiting');
   hold(start,650,'done');
  }
 }
 addEventListener('scroll',paint,{passive:true});
 addEventListener('bridge-handoff',paint);
 addEventListener('pagehide',release);
 addEventListener('keydown',event=>{
  if(event.key==='Escape'&&holding){state='done';release();}
 });
 reduced.addEventListener('change',()=>{
  if(reduced.matches)release();
  paint();
 });
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
