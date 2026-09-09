/* Card sheen — cursor spotlight position for .a-box/.cert/.xp-row sheen layers.
   Desktop pointer only. Writes --mx/--my (rAF-throttled); CSS does the glow.
   No layout work, no transforms touched (tilt.js owns those). */
(function () {
  try {
    if (!matchMedia('(pointer: fine)').matches) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var raf = 0, pending = null;
    document.addEventListener('pointermove', function (e) {
      var card = (e.target && e.target.closest)
        ? e.target.closest('.a-box,.cert,.xp-row')
        : null;
      if (!card) return;
      var r = card.getBoundingClientRect();
      pending = { el: card, x: e.clientX - r.left, y: e.clientY - r.top };
      if (!raf) raf = requestAnimationFrame(function () {
        raf = 0;
        if (pending) {
          pending.el.style.setProperty('--mx', pending.x.toFixed(1) + 'px');
          pending.el.style.setProperty('--my', pending.y.toFixed(1) + 'px');
          pending = null;
        }
      });
    }, { passive: true });
  } catch (e) { /* decorative — never block the page */ }
})();
