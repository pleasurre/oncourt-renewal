// ONCOURT in numbers: panels fold to the left one after another while the section is pinned.
(() => {
 const section = document.querySelector('.stats-strip');
 if (!section) return;
 const row = section.querySelector('.stats-strip__row');
 const panels = [...row.querySelectorAll('.stat')];
 const nums = panels.map(p => p.querySelector('.stat__n'));
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const n = panels.length;
 const clamp = x => Math.max(0, Math.min(1, x));
 const ramp = (t, a, b) => { const x = clamp((t - a) / (b - a)); return x * x * (3 - 2 * x); };
 let frame = 0, counted = false;

 function paint() {
  frame = 0;
  if (section.classList.contains('is-static')) return;
  const W = row.clientWidth, phone = W < 560;
  const closed = phone ? 46 : Math.max(112, Math.min(140, W * 0.09));
  const minOpen = phone ? W * 0.74 : W * 0.37;
  const r = section.getBoundingClientRect();
  const t = clamp(-r.top / Math.max(1, r.height - innerHeight));
  // panel i folds between its own two scroll points; the last one never folds
  const k = panels.map((_, i) => i === n - 1 ? 0 : ramp(t, 0.10 + i * 0.25, 0.30 + i * 0.25));
  const K = k.reduce((a, b) => a + b, 0);
  const open = Math.max(minOpen, (W - closed * K) / (n - K));
  row.style.setProperty('--stat-open', open.toFixed(1) + 'px');
  panels.forEach((p, i) => {
   p.style.width = (closed * k[i] + open * (1 - k[i])).toFixed(1) + 'px';
   p.querySelector('.stat__body').style.opacity = (1 - ramp(k[i], 0, 0.45)).toFixed(3);
   p.querySelector('.stat__num').style.opacity = (1 - ramp(k[i], 0.55, 1)).toFixed(3);
   p.querySelector('.stat__label').style.opacity = phone ? (1 - ramp(k[i], 0.35, 0.75)).toFixed(3) : '';   // too narrow for the word on phones: icon only
  });
 }
 function queue() { if (!frame) frame = requestAnimationFrame(paint); }

 // figures count up once, the first time the row comes into view
 function countUp() {
  if (counted) return; counted = true;
  const start = performance.now(), dur = 1400;
  const targets = nums.map(el => +el.dataset.to);
  const fmt = v => Math.round(v).toLocaleString('ko-KR');
  (function tick(now) {
   const x = clamp((now - start) / dur), e = 1 - Math.pow(1 - x, 3);
   nums.forEach((el, i) => { el.textContent = fmt(targets[i] * e); });
   if (x < 1) requestAnimationFrame(tick);
  })(start);
 }

 function setMode() {
  section.classList.toggle('is-static', reduced.matches);
  panels.forEach(p => { p.style.width = ''; p.querySelectorAll('.stat__body,.stat__num,.stat__label').forEach(el => { el.style.opacity = ''; }); });
  queue();
 }
 if ('IntersectionObserver' in window && !reduced.matches) {
  nums.forEach(el => { el.textContent = '0'; });
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { countUp(); io.disconnect(); } }, { threshold: 0.35 });
  io.observe(row);
 }
 addEventListener('scroll', queue, { passive: true });
 addEventListener('resize', queue);
 reduced.addEventListener('change', setMode);
 setMode();
})();
