// 코트에 나가기 전에 (FAQ): one answer open at a time; rows draw in on first view.
(() => {
 const section = document.querySelector('.faq');
 if (!section) return;
 const items = [...section.querySelectorAll('.faq__item')];
 function setOpen(item, open) {
  item.classList.toggle('is-open', open);
  const btn = item.querySelector('.faq__btn');
  btn.setAttribute('aria-expanded', String(open));
  item.querySelector('.faq__panel').setAttribute('aria-hidden', String(!open));
 }
 items.forEach((item, i) => {
  item.style.setProperty('--i', i);
  setOpen(item, item.classList.contains('is-open'));
  item.querySelector('.faq__btn').addEventListener('click', () => {
   const open = !item.classList.contains('is-open');
   items.forEach(other => { if (other !== item) setOpen(other, false); });
   setOpen(item, open);
  });
 });
 // the string background sits at half strength above the final CTA and full strength around it
 const surface = section.closest('.ending-flow'), cta = document.getElementById('download');
 function markCta() { if (surface && cta) surface.style.setProperty('--cta-top', cta.offsetTop + 'px'); }
 markCta(); addEventListener('resize', markCta); addEventListener('load', markCta);
 if (!('IntersectionObserver' in window)) return;
 section.classList.add('is-ready');
 const io = new IntersectionObserver(entries => {
  if (entries.some(e => e.isIntersecting)) { section.classList.add('is-in'); io.disconnect(); }
 }, { threshold: 0.18 });
 io.observe(section.querySelector('.faq__list'));
})();
