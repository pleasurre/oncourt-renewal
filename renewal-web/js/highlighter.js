// 코트는 잡았는데: draw the lime highlighter (photo frame, then the title underline) once, when the photo comes into view.
(() => {
 // inner parallax: the photo slides up inside its frame while the frame crosses the screen
 const media = document.querySelector('.problem-detail-reserve__media');
 if (media && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let queued = false;
  const pan = () => {
   queued = false;
   const r = media.getBoundingClientRect();
   const t = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2 + r.height / 2)));
   media.style.setProperty('--pan', (t * r.height * 0.11).toFixed(1) + 'px');
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(pan); } }, { passive: true });
  addEventListener('resize', pan); pan();
 }
})();
(() => {
 const section = document.querySelector('.problem-detail-reserve');
 const frame = section && section.querySelector('.hl-frame');
 if (!frame || !('IntersectionObserver' in window)) return;
 section.classList.add('hl-ready');
 const io = new IntersectionObserver(entries => {
  if (entries.some(e => e.isIntersecting)) { section.classList.add('is-drawn'); io.disconnect(); }
 }, { threshold: 0.5 });
 io.observe(frame);
})();
