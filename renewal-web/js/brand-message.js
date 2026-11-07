const message = document.querySelector('.brand-message');
if (message) {
  const copy = message.querySelector('.brand-message__copy');
  const lines = [...copy.querySelectorAll('.brand-message__line')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = value => Math.max(0, Math.min(1, value));
  let geometry, frame;

  function measure() {
    geometry = lines.map(line => {
      const ink = line.querySelector('.brand-message__ink');
      const range = document.createRange();
      range.selectNodeContents(line.firstElementChild);
      const box = line.firstElementChild.getBoundingClientRect();
      const rows = [...range.getClientRects()].map(rect => ({
        left: rect.left - box.left,
        width: rect.width,
        bottom: rect.bottom - box.top
      }));
      return { ink, rows, width: rows.reduce((sum, row) => sum + row.width, 0) };
    });
    queue();
  }

  function paint() {
    frame = 0;
    message.classList.toggle('is-revealing', !reduced.matches);
    if (reduced.matches) { message.style.removeProperty('--sub-progress'); return; }
    const { top, height } = copy.getBoundingClientRect();
    const start = innerHeight * .92 - height;
    const end = innerHeight * .12;
    const progress = clamp((start - top) / Math.max(1, start - end) / .7);
    const steps = lines.length + 1;
    geometry.forEach(({ ink, rows, width }, index) => {
      const fill = clamp(progress * steps - index);
      if (fill === 0 || fill === 1 || !rows.length) {
        ink.style.clipPath = fill === 1 ? 'none' : 'inset(0 100% 0 0)';
        return;
      }
      let remaining = fill * width;
      let y = 0;
      const points = ['0 0'];
      for (const row of rows) {
        if (remaining >= row.width) {
          remaining -= row.width;
          y = row.bottom;
          continue;
        }
        const x = row.left + remaining;
        points.push(`100% 0, 100% ${y}px, ${x}px ${y}px, ${x}px ${row.bottom}px, 0 ${row.bottom}px`);
        break;
      }
      ink.style.clipPath = 'polygon(' + points.join(', ') + ')';
    });
    const last = clamp(progress * steps - lines.length);
    message.style.setProperty('--underline-offset', 1 - last);
    message.style.setProperty('--sub-progress', last);
  }

  function queue() {
    if (!frame) frame = requestAnimationFrame(paint);
  }
  new ResizeObserver(measure).observe(copy);
  document.fonts.ready.then(measure);
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', measure);
  reduced.addEventListener('change', queue);
  measure();
}
