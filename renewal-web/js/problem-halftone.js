// Match the soft readability mask to the actual title and body glyph bounds.
(() => {
 const message=document.querySelector('#problem .problem-message');
 if(!message)return;
 const image=message.querySelector('.problem-halftone');
 if(!image)return;
 function measure(){
  const ranges=[...message.querySelectorAll('h2,.problem-description span')].flatMap(el=>{
   const range=document.createRange();range.selectNodeContents(el);
   return [...range.getClientRects()].filter(r=>r.width&&r.height);
  });
  if(!ranges.length)return;
  const width=Math.max(...ranges.map(r=>r.right))-Math.min(...ranges.map(r=>r.left));
  const height=Math.max(...ranges.map(r=>r.bottom))-Math.min(...ranges.map(r=>r.top));
  // Keep the text inside the 20%-strength center, with an elliptical feather.
  image.style.setProperty('--problem-mask-x',(width*.9+100)+'px');
  image.style.setProperty('--problem-mask-y',(height*.9+70)+'px');
 }
 const observer=new ResizeObserver(measure);
 observer.observe(message);
 document.fonts?.ready.then(measure);
 addEventListener('resize',measure,{passive:true});
 measure();
})();

// Scroll-linked reading reveal, preserving the original sentence wrappers.
(() => {
 const section=document.querySelector('#problem');
 const paragraph=section?.querySelector('.problem-description');
 if(!paragraph)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const originalColor=getComputedStyle(paragraph).color;
 const channels=originalColor.match(/[\d.]+/g)?.slice(0,3).map(Number)||[37,39,37];
 const letters=[];
 for(const sentence of [...paragraph.children]){
  const text=sentence.textContent;
  sentence.textContent='';
  for(const character of text){
   if(/\s/.test(character)){sentence.append(document.createTextNode(character));continue;}
   const glyph=document.createElement('b');
   glyph.textContent=character;
   glyph.style.font='inherit';
   glyph.style.letterSpacing='inherit';
   sentence.append(glyph);
   letters.push(glyph);
  }
 }
 let scheduled=false;
 function paint(){
  scheduled=false;
  const progress=reduced.matches?1:Math.max(0,Math.min(1,-section.getBoundingClientRect().top/(innerHeight*.28)));
  const cursor=progress*(letters.length+4);
  letters.forEach((glyph,index)=>{
   const strength=Math.max(0,Math.min(1,(cursor-index)/4));
   const rgb=channels.map(value=>Math.round(200+(value-200)*strength));
   glyph.style.color='rgb('+rgb.join(',')+')';
  });
 }
 function queue(){if(!scheduled){scheduled=true;requestAnimationFrame(paint);}}
 addEventListener('scroll',queue,{passive:true});
 addEventListener('resize',queue,{passive:true});
 reduced.addEventListener('change',queue);
 paint();
})();
