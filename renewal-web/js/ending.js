// Reveal gallery media without changing their geometry or moving them.
(() => {
 const gallery=document.querySelector('.problem-reserve');
 const problem=document.querySelector('#problem');
 const primary=document.querySelector('#problem-media-primary');
 const secondary=document.querySelector('#problem-media-secondary');
 if(!gallery||!problem||!primary||!secondary)return;
 if(!('IntersectionObserver' in window))return;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 gallery.classList.add('problem-gallery-motion');
 function primaryState(active){primary.classList.toggle('is-revealed',active||motion.matches);}
 addEventListener('partner-fill-active',event=>primaryState(event.detail.active));
 function sync(){primaryState(parseFloat(getComputedStyle(problem).getPropertyValue('--partner-fill'))>0);}
 const observer=new IntersectionObserver(entries=>{
  if(entries.some(entry=>entry.isIntersecting)){
   secondary.classList.add('is-revealed');
   observer.disconnect();
  }
 },{rootMargin:'0px 0px -8% 0px',threshold:0});
 observer.observe(secondary);
 motion.addEventListener('change',sync);
 sync();
})();

(() => {
 const section=document.querySelector('#download');
 if(!section)return;
 const layer=section.querySelector('.ending-strings');
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const ns='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(ns,'svg');
 svg.setAttribute('aria-hidden','true');
 layer.append(svg);
 const horizontal=[],vertical=[];
 let width=0,height=0,frame=0,started=false,startTime=null;
 function draw(amplitude=0){
  horizontal.forEach(({path,y,sign})=>{
   path.setAttribute('d',`M0 ${y} Q${width/2} ${y+amplitude*sign} ${width} ${y}`);
  });
  vertical.forEach(({path,x,sign})=>{
   path.setAttribute('d',`M${x} 0 Q${x+amplitude*sign} ${height/2} ${x} ${height}`);
  });
 }
 function build(){
  width=section.clientWidth;height=section.clientHeight;
  svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
  svg.replaceChildren();horizontal.length=0;vertical.length=0;
  // 32 × 35 mm-like spacing and alternating over/under ties suggest racket strings.
  for(let y=12,row=0;y<height;y+=35,row++){
   const path=document.createElementNS(ns,'path');path.setAttribute('class','ending-strings__tile');
   svg.append(path);horizontal.push({path,y,sign:row%2?1:-1});
  }
  for(let x=12,col=0;x<width;x+=32,col++){
   const path=document.createElementNS(ns,'path');path.setAttribute('class','ending-strings__tile');
   svg.append(path);vertical.push({path,x,sign:col%2?1:-1});
  }
  const ties=document.createElementNS(ns,'path');
  const commands=[];
  for(let row=0,y=12;y<height;y+=35,row++)
   for(let col=0,x=12;x<width;x+=32,col++)
    commands.push((row+col)%2?`M${x} ${y-2}v4`:`M${x-2} ${y}h4`);
  ties.setAttribute('d',commands.join(' '));ties.setAttribute('class','ending-strings__over');svg.append(ties);
  draw();
 }
 function tick(time){
  if(startTime===null)startTime=time;
  const progress=Math.min(1,(time-startTime)/800);
  // Only the string paths flex. Endpoints and CTA layout remain fixed.
  draw(progress===1?0:2.6*Math.sin(progress*Math.PI*6)*Math.pow(1-progress,2));
  if(progress<1&&!motion.matches)frame=requestAnimationFrame(tick);
  else {frame=0;draw();}
 }
 const observer=new IntersectionObserver(entries=>{
  if(started||!entries.some(entry=>entry.isIntersecting))return;
  started=true;observer.disconnect();
  if(!motion.matches)frame=requestAnimationFrame(tick);
 },{threshold:.22});
 new ResizeObserver(build).observe(section);
 motion.addEventListener('change',()=>{
  if(motion.matches){cancelAnimationFrame(frame);frame=0;draw();}
 });
 build();observer.observe(section);
})();
