// Line the string tile on every .string-bg section up with the page origin, so the grid runs on unbroken from
// one section to the next (and into the player stage's light layer, see js/player-3d.js).
(() => {
 const els = [...document.querySelectorAll('.string-bg')];
 if (!els.length) return;
 const mod = (v, m) => ((v % m) + m) % m;
 function align() {
  els.forEach(el => {
   const r = el.getBoundingClientRect();
   el.style.setProperty('--sx', mod(-(r.left + scrollX), 64).toFixed(1) + 'px');
   el.style.setProperty('--sy', mod(-(r.top + scrollY), 70).toFixed(1) + 'px');
  });
 }
 align();
 addEventListener('load', align); addEventListener('resize', align);
 if (document.fonts && document.fonts.ready) document.fonts.ready.then(align);
 if ('ResizeObserver' in window) new ResizeObserver(align).observe(document.body);
})();
