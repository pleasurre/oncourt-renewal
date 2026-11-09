// WHY ONCOURT?: draw the highlighter under each card's key words once, when the card is well inside the screen.
(() => {
 const section = document.getElementById('why-oncourt');
 if (section) section.dataset.why = (location.search.match(/[?&]why=([123])/) || [, '1'])[1];
 if (!section || !('IntersectionObserver' in window)) return;
 section.classList.add('why-hl-ready');
 const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-drawn'); io.unobserve(e.target); } });
 }, { threshold: 0.6 });
 const watch = () => section.querySelectorAll('.why-value:not(.is-drawn)').forEach(el => io.observe(el));
 watch();
 // the carousel clones its cards after load; pick those up too
 new MutationObserver(watch).observe(section, { childList: true, subtree: true });
})();
