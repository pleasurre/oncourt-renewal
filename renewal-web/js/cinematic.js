// Header contrast for the static Hero → Problem flow.
const header=document.querySelector('.site-header');
const hero=document.querySelector('#hero');
function updateHeaderContrast(){
 if(header&&hero)header.classList.toggle('header-on-light',hero.getBoundingClientRect().bottom<=header.offsetHeight);
}
addEventListener('scroll',updateHeaderContrast,{passive:true});
addEventListener('resize',updateHeaderContrast);
updateHeaderContrast();


(() => {
 if(!hero)return;
 const stage=hero.querySelector('.court-hero-stage');
 if(!stage)return;
 const layer=document.createElement('div');
 layer.className='hero-shutters';layer.setAttribute('aria-hidden','true');
 const panels=Array.from({length:6},(_,i)=>{
  const panel=document.createElement('i');panel.style.left=(i*100/6)+'%';layer.appendChild(panel);return panel;
 });
 stage.appendChild(layer);hero.classList.add('hero-shutters-ready');
 let frame=0;
 function render(){
  frame=0;
  const p=Math.max(0,Math.min(1,-hero.getBoundingClientRect().top/Math.max(1,hero.offsetHeight-stage.offsetHeight)));
  panels.forEach(panel=>panel.style.transform='scaleX('+p+')');
 }
 function request(){if(!frame)frame=requestAnimationFrame(render);}
 addEventListener('scroll',request,{passive:true});
 addEventListener('resize',request);
 new ResizeObserver(request).observe(stage);
 render();
})();
