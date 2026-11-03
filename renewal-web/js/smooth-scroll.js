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
})();
