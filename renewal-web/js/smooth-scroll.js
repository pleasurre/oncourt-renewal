// Keep native scrolling if the optional enhancement cannot load.
(() => {
  if (typeof Lenis === 'undefined') return;
  const lenis = new Lenis({
    autoRaf: true,
    lerp: 0.10,
    smoothWheel: true,
    wheelMultiplier: 1,
    syncTouch: false,
    anchors: { offset: -80 }
  });
  addEventListener("problem-scroll-hold",({detail})=>{
    if(detail===null){lenis.start();return;}
    lenis.scrollTo(detail,{immediate:true,force:true});
    lenis.stop();
  });
})();
