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
