const features = document.querySelector('.oncourt-features');
if (features && 'IntersectionObserver' in window && Element.prototype.animate &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    for (const {target, isIntersecting} of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      const easing = 'cubic-bezier(.22,.61,.36,1)';
      target.querySelector('.features-editorial__copy').animate(
        [{opacity:0, transform:'translateY(24px)'}, {opacity:1, transform:'none'}],
        {duration:800, easing}
      );
      target.querySelector('.features-editorial__media').animate(
        [{opacity:0, transform:'translateY(40px)'}, {opacity:1, transform:'none'}],
        {duration:1000, delay:200, easing, fill:'backwards'}
      );
    }
  }, {threshold:.12});
  features.querySelectorAll('.features-editorial__scene').forEach(scene => observer.observe(scene));
}
