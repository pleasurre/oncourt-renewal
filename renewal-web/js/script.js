'use strict';
document.documentElement.classList.add('js');
// Native anchors; static bilingual copy remains readable without language swaps.
if('IntersectionObserver'in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}},{threshold:.08});document.querySelectorAll('.section>.container').forEach(el=>{el.classList.add('reveal');observer.observe(el);});}

// Hide on downward scroll and reveal on upward scroll without layout shifts.
(() => {
 const header=document.querySelector('.site-header');
 if(!header)return;
 let anchor=Math.max(0,scrollY),pending=false;
 function update(){
  pending=false;
  const y=Math.max(0,scrollY),delta=y-anchor;
  const menuOpen=header.querySelector('.menu-toggle')?.getAttribute('aria-expanded')==='true';
  if(y<24||menuOpen||header.contains(document.activeElement)){
   header.classList.remove('is-scroll-hidden');anchor=y;return;
  }
  if(Math.abs(delta)<8)return;
  header.classList.toggle('is-scroll-hidden',delta>0&&y>header.offsetHeight);
  anchor=y;
 }
 addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update);}},{passive:true});
 header.addEventListener('focusin',()=>header.classList.remove('is-scroll-hidden'));
 header.addEventListener('click',()=>{if(header.querySelector('.menu-toggle')?.getAttribute('aria-expanded')==='true')header.classList.remove('is-scroll-hidden');});
})();

// Keep CSS's seamless track, varying playback speed without restarting its phase.
(() => {
 const band=document.querySelector('.rally-marquee');
 const track=band?.querySelector('.rally-marquee__track');
 if(!track)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let animation=null,raf=0,lastY=scrollY,lastAt=performance.now(),speed=1,boost=0;
 function tick(now){
  const dt=Math.min(64,Math.max(0,now-lastAt));lastAt=now;
  const y=scrollY;
  const velocity=Math.abs(y-lastY)/Math.max(dt,1)*1000;lastY=y;
  boost=Math.max(Math.min(velocity/450,7),boost*Math.exp(-dt/180));
  const target=1+boost;
  speed+=(target-speed)*(1-Math.exp(-dt/100));
  animation?.updatePlaybackRate(speed);
  raf=requestAnimationFrame(tick);
 }
 function sync(){
  cancelAnimationFrame(raf);animation=track.getAnimations()[0]||null;
  if(reduced.matches){if(animation)animation.updatePlaybackRate(1);return;}
  lastAt=performance.now();lastY=scrollY;speed=1;boost=0;
  raf=requestAnimationFrame(tick);
 }
 reduced.addEventListener('change',sync);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else sync();});
 addEventListener('pagehide',()=>cancelAnimationFrame(raf));
 requestAnimationFrame(sync);
})();


// Preload Hero clips and reveal each only after its first frame is ready.
(() => {
 const first=document.querySelector('#hero .court-hero-video');
 const button=document.querySelector('#hero .court-hero-playback');
 if(!first)return;
 const playlist=[
  'media/result-8da97a2f-3cf5-4931-b38f-9716395e2a40.mp4', // Hard
  'media/ONCOURT-grass-court-camera-adjusted.mp4', // Grass
  'media/result-2411f9ad-0c65-40ce-8322-da0cb6df6773.mp4', // Clay
  'media/result-c63482d2-7f01-477f-985d-babcd2272dc6.mp4' // Indoor
 ];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let active=0,pending=-1,ticket=0,wantsPlayback=!reduced.matches,fade=null;
 first.parentElement.style.isolation='isolate';
 const videos=playlist.map((src,index)=>{
  const clip=index===0?first:document.createElement('video');
  clip.className=first.className;
  clip.muted=true;clip.defaultMuted=true;clip.playsInline=true;
  clip.autoplay=false;clip.loop=false;clip.preload='auto';
  clip.setAttribute('aria-hidden','true');clip.tabIndex=-1;
  clip.removeAttribute('poster');
  Object.assign(clip.style,{position:'absolute',inset:'0',opacity:index===0?'1':'0',zIndex:index===0?'1':'0',pointerEvents:'none'});
  if(index!==0)first.parentElement.appendChild(clip);
  clip.src=src;
  clip.load();
  return clip;
 });
 function syncButton(){
  if(!button)return;
  const label=wantsPlayback?'일시정지':'재생';
  button.textContent=label;
  button.setAttribute('aria-label','배경 영상 '+label);
 }
 function stop(){
  wantsPlayback=false;
  ticket++;
  if(pending!==-1){videos[pending].pause();videos[pending].currentTime=0;pending=-1;}
  videos.forEach(clip=>clip.pause());
  if(fade)fade.pause();
  syncButton();
 }
 function reveal(next,token){
  if(token!==ticket||!wantsPlayback||pending!==next)return;
  if(fade){fade.finish();fade=null;}
  const outgoing=videos[active],incoming=videos[next];
  outgoing.style.zIndex='0';
  incoming.style.zIndex='1';
  incoming.style.opacity='1';
  active=next;pending=-1;
  const finish=()=>{
   outgoing.pause();outgoing.style.opacity='0';outgoing.currentTime=0;
   fade=null;
  };
  if(!reduced.matches&&incoming.animate){
   fade=incoming.animate([{opacity:0},{opacity:1}],{duration:180,easing:'linear'});
   fade.onfinish=finish;
  }else finish();
  syncButton();
 }
 async function nextClip(){
  if(!wantsPlayback||pending!==-1)return;
  const next=(active+1)%videos.length,clip=videos[next],token=++ticket;
  pending=next;
  try{
   await clip.play();
   if(token!==ticket||!wantsPlayback)return;
   // Keep the outgoing frame visible while the next clip decodes.
   if(clip.requestVideoFrameCallback)clip.requestVideoFrameCallback(()=>reveal(next,token));
   else requestAnimationFrame(()=>requestAnimationFrame(()=>reveal(next,token)));
  }catch(error){
   if(token===ticket)stop();
  }
 }
 function resume(){
  wantsPlayback=true;
  if(fade)fade.play();
  if(videos[active].ended)nextClip();
  else videos[active].play().catch(stop);
  syncButton();
 }
 videos.forEach((clip,index)=>{
  clip.addEventListener('ended',()=>{if(index===active)nextClip();});
  clip.addEventListener('error',stop);
 });
 button?.addEventListener('click',()=>{if(wantsPlayback)stop();else resume();});
 reduced.addEventListener('change',()=>{if(reduced.matches)stop();else resume();});
 if(wantsPlayback)resume();else syncButton();
})();

