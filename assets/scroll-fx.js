/* Scroll-reactive connectors + edge words — CPU-light, compositor-safe.
   Sets --cg (connector glow 0..1) and --ew (edge-word drift -1..1) CSS vars.
   One passive scroll listener -> rAF-gated. Transform/opacity-adjacent only
   (scale + translate properties), so Lenis smoothness is untouched. */
(function () {
  try {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var links = [].slice.call(document.querySelectorAll('.gold-link'));
    var words = [].slice.call(document.querySelectorAll('.edge-word'));
    if (!links.length && !words.length) return;

    var ticking = false;
    function update() {
      ticking = false;
      var vh = innerHeight || 1, vc = vh / 2, i, r, c;
      for (i = 0; i < links.length; i++) {
        var el = links[i];
        r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        c = r.top + r.height / 2;
        el.style.setProperty('--cg', (1 - Math.min(1, Math.abs(c - vc) / (vh * 0.75))).toFixed(3));
      }
      for (i = 0; i < words.length; i++) {
        var w = words[i];
        r = w.getBoundingClientRect();
        if (r.bottom < -160 || r.top > vh + 160) continue;
        c = r.top + r.height / 2;
        w.style.setProperty('--ew', Math.max(-1, Math.min(1, (c - vc) / vh)).toFixed(3));
      }
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    addEventListener('load', onScroll);
    update();
  } catch (e) { /* decorative — never block the page */ }
})();
