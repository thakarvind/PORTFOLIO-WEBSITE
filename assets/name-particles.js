/* THAK ARAVIND particle scatter -> reform.
   While scrolling away from the hero, the vertical brand shatters into tiny
   white micro-particles that rain down into the #nameform band and assemble
   into the big THAK ARAVIND title (orange T). Fully scroll-scrubbed: p=0 at
   top, p=1 when the band settles near viewport center — scrolling back up
   reverses everything. Reduced-motion / no-canvas -> static band title. */
(function () {
  try {
    var brand = document.querySelector('.hero-brand');
    var title = document.getElementById('nameformTitle');
    var band = document.getElementById('nameform');
    var canvas = document.getElementById('brandParticles');
    if (!brand || !title || !band) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !canvas || !canvas.getContext) {
      band.classList.add('np-static');
      return;
    }
    var ctx = canvas.getContext('2d');
    if (!ctx) { band.classList.add('np-static'); return; }

    /* split brand into per-char spans (keeps link + interpunct intact) */
    var chars = [];
    (function split() {
      var nodes = [].slice.call(brand.childNodes), i, n;
      brand.textContent = '';
      nodes.forEach(function (nd) {
        var txt = nd.textContent || '';
        for (i = 0; i < txt.length; i++) {
          n = document.createElement('span');
          n.className = 'bc' + (nd.nodeName === 'EM' ? ' bcdot' : '');
          n.textContent = txt[i];
          brand.appendChild(n);
          chars.push(n);
        }
      });
    })();
    if (!chars.length) { band.classList.add('np-static'); return; }

    var MOBILE = matchMedia('(max-width: 860px)').matches;
    var PER = MOBILE ? 7 : 14;
    var parts = [];
    chars.forEach(function (c, ci) {
      for (var k = 0; k < PER; k++) {
        parts.push({
          ci: ci, f: (ci + 0.5) / chars.length,
          jx: (Math.random() - 0.5) * 26, jy: (Math.random() - 0.5) * 34,
          ox: (Math.random() - 0.5) * 22, oy: (Math.random() - 0.5) * 18,
          s: 1.4 + Math.random() * 2.2,
          delay: ci * 0.012 + Math.random() * 0.05
        });
      }
    });

    /* document-space launch cache: the brand scrolls off-screen fast, so
       frozen launch points keep particles visible travelling down-screen */
    var startCache = [];
    function snapStarts() {
      var sc = window.scrollY || 0;
      startCache = chars.map(function (c) {
        var r = c.getBoundingClientRect();
        return [r.left + r.width / 2, r.top + sc + r.height / 2];
      });
    }
    snapStarts();

    var DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    function size() {
      canvas.width = Math.round(innerWidth * DPR);
      canvas.height = Math.round(innerHeight * DPR);
    }
    size();
    addEventListener('resize', function () { size(); snapStarts(); kick(); }, { passive: true });

    function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
    function smooth(a, b, v) {
      var t = clamp01((v - a) / (b - a));
      return t * t * (3 - 2 * t);
    }
    function easeIO(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

    var ticking = false, lastP = -1;
    /* shared scroll flow with the ribbon wrap: 0 at top → 1 when MY NAME centers */
    function flowG() {
      var vh = innerHeight || 1;
      var r = band.getBoundingClientRect();
      var y1 = (r.top + (window.scrollY || 0)) + r.height / 2 - vh / 2;
      return clamp01((window.scrollY || 0) / Math.max(1, y1));
    }
    function frame() {
      ticking = false;
      var vh = innerHeight || 1;
      var p = flowG();
      if (p === lastP && (p === 0 || p === 1)) { paint(p); return; }
      lastP = p;
      if (p < 0.03) snapStarts();
      paint(p);
    }
    function paint(p) {
      /* FIX: vh was referenced here but only existed in frame()'s scope —
         paint() threw a ReferenceError EVERY call and the outer try/catch
         swallowed it, so the red particles never rendered at all. */
      var vh = innerHeight || 1;
      /* 1) hero brand wraps + shatters early on scroll.
         PERF: values cached — style written ONLY on change; transform/opacity
         only (compositor). The old per-frame blur() filter on the title
         re-rastered the whole text every scroll tick = the text glitch. */
      var cp = smooth(0.06, 0.28, p);
      var bO = (1 - cp).toFixed(3), bS = (1 - 0.35 * cp).toFixed(3);
      for (var i = 0; i < chars.length; i++) {
        var ch = chars[i];
        if (ch.__o !== bO) { ch.__o = bO; ch.style.opacity = bO; }
        var bT = 'scale(' + bS + ')';
        if (ch.__t !== bT) { ch.__t = bT; ch.style.transform = bT; }
      }
      /* 2) band title assembles late — opacity + translateY only, no filter */
      var tp = smooth(0.5, 0.92, p);
      var tO = tp.toFixed(3);
      if (title.__o !== tO) { title.__o = tO; title.style.opacity = tO; }
      var tT = tp >= 1 ? '' : 'translateY(' + ((1 - tp) * 40).toFixed(1) + 'px)';
      if (title.__t !== tT) { title.__t = tT; title.style.transform = tT; }
      var on = tp > 0.02;
      if (band.__on !== on) { band.__on = on; band.classList.toggle('np-on', on); }

      /* 3) particles fly mid-scroll */
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, innerWidth, vh);
      if (p <= 0 || p >= 1) return;
      var fadeAll = 1 - smooth(0.82, 1, p);
      if (fadeAll <= 0) return;
      var trect = title.getBoundingClientRect();
      var i2, pt, pp, sx, sy, ex, ey, e, a;
      var sc = window.scrollY || 0;
      var centers = startCache.map(function (s) { return [s[0], s[1] - sc]; });
      for (i2 = 0; i2 < parts.length; i2++) {
        pt = parts[i2];
        pp = clamp01((p - pt.delay) / 0.6);
        if (pp <= 0 || pp >= 1) continue;
        sx = centers[pt.ci][0] + pt.ox;
        sy = centers[pt.ci][1] + pt.oy;
        if (trect.height > trect.width * 1.4) {
          /* vertical tategaki column: chars land in order down the column */
          ex = trect.left + trect.width / 2 + pt.jx * 0.5;
          ey = trect.top + pt.f * trect.height + pt.jy;
        } else {
          ex = trect.left + pt.f * trect.width + pt.jx;
          ey = trect.top + trect.height * 0.52 + pt.jy;
        }
        e = easeIO(pp);
        /* RED-SILK burst: disperse outward mid-flight, gather into the name */
        var sw = Math.sin(pp * Math.PI);
        var gx = sx + (ex - sx) * e + pt.ox * 5 * sw;
        var gy = sy + (ey - sy) * e + 170 * sw + pt.oy * 5 * sw;
        a = Math.min(1, pp * 6) * (1 - pp) * 1.7 * fadeAll;
        if (a <= 0.01) continue;
        ctx.globalAlpha = Math.min(1, a);
        var REDSILK = ['#ff3b22', '#ff6a3d', '#ff8a5c', '#ffd9c9'];
        ctx.fillStyle = (pt.ci % 5 === 0) ? '#ffd9c9' : REDSILK[pt.ci % 4];
        var streak = pt.s * (1 + pp * 7);
        ctx.fillRect(gx - pt.s / 2, gy - streak / 2, pt.s, streak);
      }
      ctx.globalAlpha = 1;
    }
    function kick() {
      if (!ticking) { ticking = true; requestAnimationFrame(frame); }
    }
    addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', kick, { passive: true });
    addEventListener('load', kick);
    frame();
  } catch (e) { /* decorative — never block the page */ }
})();
