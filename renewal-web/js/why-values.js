// One measured group = one 40s cycle. Resize/re-entry never restart its phase.
(() => {
 const section=document.querySelector('#why-oncourt.why-values');
 const viewport=section?.querySelector('.why-values-viewport');
 const track=viewport?.querySelector('.why-values-track');
 const original=track?.querySelector('.why-values-group');
 if(!original||!track.animate)return;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const duration=40000;
 let animation=null,stride=0,queued=false,pointer=null,lastX=0;
 function syncPause(){
  // Vertical scrolling, hover and focus never interrupt the gallery.
  const paused=document.hidden||pointer!==null;
  viewport.classList.toggle('is-dragging',pointer!==null);
  section.classList.toggle('why-values-paused',paused);
  if(animation){if(paused)animation.pause();else animation.play();}
 }
 function removeCopies(){track.querySelectorAll('[data-why-copy]').forEach(el=>el.remove());}
 function measure(){
  queued=false;
  if(motion.matches){
   animation?.cancel();animation=null;stride=0;removeCopies();
   section.classList.remove('why-values-ready','why-values-paused');syncPause();return;
  }
  section.classList.add('why-values-ready');
  const next=original.getBoundingClientRect().width;
  if(!next)return;
  // One leading group preserves the clipped predecessor at the left inset.
  const count=Math.max(3,Math.ceil(viewport.clientWidth/next)+2);
  while(track.children.length<count){
   const copy=original.cloneNode(true);copy.dataset.whyCopy='';
   copy.setAttribute('aria-hidden','true');track.append(copy);
  }
  while(track.children.length>count)track.lastElementChild.remove();
  if(!animation||Math.abs(next-stride)>.1){
   const phase=animation?(Number(animation.currentTime)||0)%duration/duration:0;
   animation?.cancel();stride=next;
   animation=track.animate([
    {transform:'translate3d('+(-stride)+'px,0,0)'},
    {transform:'translate3d('+(-2*stride)+'px,0,0)'}
   ],{duration,iterations:Infinity,easing:'linear'});
   animation.currentTime=phase*duration;
  }
  syncPause();
 }
 function queue(){if(!queued){queued=true;requestAnimationFrame(measure);}}
 viewport.addEventListener('pointerdown',event=>{
  if(event.pointerType!=='mouse'||event.button!==0||pointer!==null||!animation||!event.target.closest('.why-value-placeholder'))return;
  event.preventDefault();
  viewport.setPointerCapture(event.pointerId);
  pointer=event.pointerId;
  lastX=event.clientX;
  syncPause();
 });
 viewport.addEventListener('pointermove',event=>{
  if(event.pointerId!==pointer||!animation||!stride)return;
  const delta=event.clientX-lastX;
  lastX=event.clientX;
  const time=(Number(animation.currentTime)||0)-delta/stride*duration;
  animation.currentTime=((time%duration)+duration)%duration;
 });
 function finishDrag(event){
  if(event.pointerId!==pointer)return;
  pointer=null;
  syncPause();
 }
 for(const type of ['pointerup','pointercancel','lostpointercapture']){
  viewport.addEventListener(type,finishDrag);
 }
 const resize=new ResizeObserver(measure);resize.observe(viewport);resize.observe(original);
 document.addEventListener('visibilitychange',syncPause);
 addEventListener('pageshow',syncPause);
 motion.addEventListener('change',queue);
 document.fonts?.ready.then(queue);
 measure();
})();
