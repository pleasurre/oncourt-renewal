const bridge = document.querySelector('.hero-bridge-scroll');
const accent = bridge?.querySelector('.bridge-accent');
const balls = bridge?.querySelector('.bridge-balls');

if (balls && accent) {
  const sync = () => {
    balls.classList.toggle('is-running', !document.hidden &&
      accent.style.opacity === '1' &&
      bridge.dataset.whiteTransition !== 'true' &&
      bridge.dataset.problemReady !== 'true');
  };
  const observer = new MutationObserver(sync);
  observer.observe(accent, { attributes: true, attributeFilter: ['style'] });
  observer.observe(bridge, {
    attributes: true,
    attributeFilter: ['data-white-transition', 'data-problem-ready']
  });
  document.addEventListener('visibilitychange', sync);
  sync();
}
