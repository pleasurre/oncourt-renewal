import * as THREE from '../vendor/three.module.js';
// All phase boundaries are normalized; no wheel/touch interception or autonomous playback.
const CONFIG={stopTime:7.5,scrollScreens:7,curtainEnd:.16,filmStart:.20,filmEnd:.65,darkStart:.68,darkEnd:.74,meshEnd:.80,fallEnd:.94,entryEnd:.975};
const story=document.querySelector('#cinematic-story'),stage=story.querySelector('.cinematic-stage'),hero=story.querySelector('#hero'),problem=story.querySelector('#problem'),hole=story.querySelector('#tennis-ball-pocket'),header=document.querySelector('.site-header');
const film=story.querySelector('.cinema-film'),video=story.querySelector('video'),freeze=story.querySelector('.cinema-freeze'),reference=story.querySelector('.cinema-ball-reference'),host=story.querySelector('.cinema-webgl'),curtains=[...story.querySelectorAll('.cinema-curtains i')];
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),range=(p,a,b)=>clamp((p-a)/(b-a)),smooth=x=>x*x*(3-2*x),mix=(a,b,t)=>a+(b-a)*t;
addEventListener('error',e=>{story.dataset.runtimeError=e.message;});
let renderer,mesh,scene,camera,trigger,progress=0,desired=0,raf=0,disposed=false,ready=false;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function headerColor(light){header.classList.toggle('header-on-light',light);}
function simpleHeader(){headerColor(problem.getBoundingClientRect().top<=header.offsetHeight);}
function requestTime(time){desired=Math.round(clamp(time,0,CONFIG.stopTime)*24)/24;if(video.readyState>=2&&!video.seeking&&Math.abs(video.currentTime-desired)>.018)video.currentTime=desired;}
video.addEventListener('seeked',()=>{if(!disposed&&Math.abs(video.currentTime-desired)>.018)requestTime(desired);});
video.addEventListener('loadeddata',()=>{ready=true;requestTime(desired);draw(progress);});
video.addEventListener('error',()=>{story.dataset.videoError='true';});
async function setupMesh(){
 try{
  renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;host.append(renderer.domElement);
  scene=new THREE.Scene();camera=new THREE.OrthographicCamera(0,innerWidth,0,innerHeight,.1,2000);camera.position.z=1000;
  const loader=new THREE.TextureLoader();const [map,bump]=await Promise.all([loader.loadAsync('assets/cinematic/ball-uv.png'),loader.loadAsync('assets/cinematic/felt-bump.png')]);
  map.colorSpace=THREE.SRGBColorSpace;
  // The source face carries its real seam and illumination. The unseen back is estimated.
  const material=new THREE.MeshStandardMaterial({map,bumpMap:bump,bumpScale:.0015,roughness:1,metalness:0,transparent:true,opacity:0});
  mesh=new THREE.Mesh(new THREE.SphereGeometry(1,64,48),material);scene.add(mesh);scene.add(new THREE.AmbientLight(0xffffff,Math.PI));
  story.dataset.renderer='three-webgl';resize();draw(progress);
 }catch(error){story.dataset.renderer='reference-image-fallback';host.hidden=true;renderer?.dispose();renderer=null;}
}
function resize(){if(renderer){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);camera.right=w;camera.bottom=h;camera.updateProjectionMatrix();}draw(progress);}
function draw(p){
 if(disposed||!document.documentElement.classList.contains('cinematic-ready'))return;
 progress=p;const w=stage.clientWidth,h=stage.clientHeight;
 for(let i=0;i<6;i++){const v=smooth(range(p,i*.014,CONFIG.curtainEnd-(5-i)*.014));curtains[i].style.transform=`scaleX(${v})`;}
 hero.style.opacity=p>=CONFIG.curtainEnd?'0':'1';
 const reveal=smooth(range(p,.17,CONFIG.filmStart)),dark=smooth(range(p,CONFIG.darkStart,CONFIG.darkEnd));
 film.style.opacity=String(reveal*(1-dark));film.style.visibility=p<.16?'hidden':'visible';
 const frozen=p>=CONFIG.filmEnd;freeze.style.opacity=frozen?'1':'0';video.style.opacity=frozen?'0':'1';
 if(!frozen){video.style.visibility=ready?'visible':'hidden';requestTime(range(p,CONFIG.filmStart,CONFIG.filmEnd)*CONFIG.stopTime);}else requestTime(CONFIG.stopTime);
 const light=smooth(range(p,.83,.94));stage.style.backgroundColor=`rgb(${Math.round(mix(5,255,light))},${Math.round(mix(7,255,light))},${Math.round(mix(6,255,light))})`;
 story.querySelector('.cinema-curtains').style.opacity=String(1-light);
 problem.style.opacity=String(light);problem.style.background='transparent';
 // Keep the real hole below the incoming ball; lift the section only after it has swallowed it.
 const settle=smooth(range(p,CONFIG.entryEnd,1));problem.style.transform=`translateY(${h*.45*(1-settle)}px)`;
 const text=smooth(range(p,.978,1));problem.querySelector('h2').style.opacity=String(text);problem.querySelector('.problem-description').style.opacity=String(text);
 const scale=Math.min(w/1920,h/1080),x0=(w-1920*scale)/2+936*scale,y0=(h-1080*scale)/2+459*scale,d0=218*scale;
 const r=hole.getBoundingClientRect(),sr=stage.getBoundingClientRect(),tx=r.left-sr.left+r.width/2,ty=r.top-sr.top+r.height/2;
 const fall=range(p,CONFIG.meshEnd,CONFIG.fallEnd),ease=fall*fall,entry=range(p,CONFIG.fallEnd,CONFIG.entryEnd);
 const landingDiameter=Math.min(d0*.68,r.width*.8);
 const x=mix(x0,tx,smooth(fall)),y=mix(y0,ty-landingDiameter*.32,ease)+entry*(r.height+landingDiameter*.25),d=mix(d0,landingDiameter,fall)*Math.pow(1-entry,1.2);
 const handoff=smooth(range(p,CONFIG.darkEnd,CONFIG.meshEnd)),isolated=p>=CONFIG.darkStart&&p<CONFIG.entryEnd;
 Object.assign(reference.style,{left:(x-d/2)+'px',top:(y-d/2)+'px',width:d+'px',height:d+'px',opacity:String(isolated?(renderer?1-handoff:1):0)});
 // Clip the sphere's lower half behind the actual hole's front rim during entry.
 const rim=r.bottom-sr.top-2;reference.style.clipPath=entry>0?`inset(0 0 ${Math.max(0,y+d/2-rim)}px 0)`:'none';host.style.clipPath=entry>0?`inset(0 0 ${Math.max(0,h-rim)}px 0)`:'none';
 if(mesh&&renderer){mesh.visible=isolated&&handoff>0&&d>.1;mesh.position.set(x,y,0);mesh.scale.setScalar(d/2);mesh.rotation.set(fall*.5,fall*1.15,fall*.7);mesh.material.opacity=handoff;renderer.render(scene,camera);}
 headerColor(p>.88);story.dataset.phase=p<.16?'curtains':p<.65?'film':p<.74?'isolate':p<.8?'handoff':p<.94?'fall':p<.975?'hole':'problem';story.dataset.progress=p.toFixed(4);
}
function createTrigger(){
 trigger=ScrollTrigger.create({id:'oncourt-cinematic',trigger:story,pin:stage,start:'top top',end:()=>'+='+Math.round(innerHeight*CONFIG.scrollScreens),scrub:true,invalidateOnRefresh:true,onUpdate:self=>draw(self.progress),onRefresh:self=>{resize();draw(self.progress);}});
}
function start(){
 if(reduced.matches||!window.gsap||!window.ScrollTrigger){simpleHeader();return;}
 document.documentElement.classList.add('cinematic-ready');gsap.registerPlugin(ScrollTrigger);
 createTrigger();
 setupMesh();draw(trigger.progress);document.fonts.ready.then(()=>ScrollTrigger.refresh());
}
function cleanup(){trigger?.kill(true);document.documentElement.classList.remove('cinematic-ready');problem.removeAttribute('style');hero.removeAttribute('style');problem.querySelector('h2').style.opacity='';problem.querySelector('.problem-description').style.opacity='';if(renderer){mesh?.geometry.dispose();mesh?.material.map?.dispose();mesh?.material.bumpMap?.dispose();mesh?.material.dispose();renderer.dispose();renderer.domElement.remove();renderer=null;mesh=null;}simpleHeader();}
reduced.addEventListener('change',()=>{cleanup();start();});
let resizeTimer;
addEventListener('resize',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(resize);clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(!trigger||disposed)return;const currentY=scrollY;trigger.kill(true);stage.removeAttribute('style');ScrollTrigger.clearScrollMemory();createTrigger();scrollTo({top:currentY,behavior:'instant'});ScrollTrigger.update(true);draw(trigger.progress);},350);});
addEventListener('scroll',()=>{if(trigger){ScrollTrigger.update(true);}if(!trigger||scrollY>trigger.end)simpleHeader();},{passive:true});
addEventListener('pagehide',()=>{disposed=true;cleanup();});
document.querySelectorAll('a[href="#hero"]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();scrollTo({top:story.offsetTop,behavior:reduced.matches?'instant':'smooth'});}));
start();
// Exposes configuration/progress read-only for QA without creating a second timeline.
window.ONCOURT_CINEMATIC={config:CONFIG,get progress(){return progress;},get stopFrame(){return 180;}};
