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


