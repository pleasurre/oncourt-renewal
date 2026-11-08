// 코트는 잡았는데: draw the lime highlighter (photo frame, then the title underline) once, when the photo comes into view.
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
