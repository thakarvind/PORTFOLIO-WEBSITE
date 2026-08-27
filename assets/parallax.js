(function () {
  try {
    if (!matchMedia('(pointer:fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var bg = document.getElementById('heroImg');
    if (!bg) return;

    var tx = 0, ty = 0;
    var cx = 0, cy = 0;
    var raf = null;
    var last = 0;

    function tick() {
      /* frame-rate independent smoothing: identical feel at 60Hz, 144Hz and beyond */
      var pn = performance.now();
      var DS = Math.min((pn - (last || pn)) / 16.667, 3) || 1;
      last = pn;
      var k = 1 - Math.pow(0.92, DS);

      cx += (tx - cx) * k;
      cy += (ty - cy) * k;

      bg.style.setProperty('--px', (-cx * 26).toFixed(2) + 'px');
      bg.style.setProperty('--py', (-cy * 16).toFixed(2) + 'px');

      if (Math.abs(tx - cx) > 0.0008 || Math.abs(ty - cy) > 0.0008) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    }

    function wake() {
      if (raf === null) raf = requestAnimationFrame(tick);
    }

    window.addEventListener('pointermove', function (e) {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      wake();
    }, { passive: true });

    document.documentElement.addEventListener('mouseleave', function () {
      tx = 0;
      ty = 0;
      wake();
    });
  } catch (err) {
    console.error('parallax failed', err);
  }
})();
