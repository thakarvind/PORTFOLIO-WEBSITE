/* Scroll-reactive connectors — CPU-light, compositor-safe.
   Sets --cg (connector glow 0..1). Transform/opacity-adjacent only
   (scale property), so Lenis smoothness is untouched.
   JITTER FIX (2026-09-13): edge-word scroll drift disabled entirely.
   The stroked (-webkit-text-stroke) .edge-word text re-rasters on every
   fractional transform change, so ANY scroll-linked motion (the old --ew
   var, and the velocity drift in site.js) made panel text shimmer/shake
   while scrolling. Edge words are now rock-static (pure CSS position). */
(function () {
  try {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var links = [].slice.call(document.querySelectorAll('.gold-link'));
    if (!links.length) return;

    var ticking = false;
    function update() {
      ticking = false;
      var vh = innerHeight || 1, vc = vh / 2, i, r, c;
      for (i = 0; i < links.length; i++) {
        var el = links[i];
        r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        c = r.top + r.height / 2;
        var v = (1 - Math.min(1, Math.abs(c - vc) / (vh * 0.75))).toFixed(3);
        if (el.__cg !== v) { el.__cg = v; el.style.setProperty('--cg', v); }
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
