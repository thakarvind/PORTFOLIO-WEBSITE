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
    var PER = MOBILE ? 5 : 10;
    var parts = [];
    chars.forEach(function (c, ci) {
      for (var k = 0; k < PER; k++) {
        parts.push({
          ci: ci, f: (ci + 0.5) / chars.length,
          jx: (Math.random() - 0.5) * 26, jy: (Math.random() - 0.5) * 34,
          ox: (Math.random() - 0.5) * 22, oy: (Math.random() - 0.5) * 18,
          s: 0.8 + Math.random() * 1.6,
          delay: ci * 0.012 + Math.random() * 0.05
        });
      }
    });

    var DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    function size() {
      canvas.width = Math.round(innerWidth * DPR);
      canvas.height = Math.round(innerHeight * DPR);
    }
    size();
    addEventListener('resize', size, { passive: true });

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
      paint(p);
    }
    function paint(p) {
      /* 1) hero brand wraps + shatters early on scroll */
      var cp = smooth(0.06, 0.28, p);
      for (var i = 0; i < chars.length; i++) {
        var ch = chars[i];
        ch.style.opacity = (1 - cp).toFixed(3);
        ch.style.transform = 'scale(' + (1 - 0.35 * cp).toFixed(3) + ')';
      }
      /* 2) band title assembles late */
      var tp = smooth(0.5, 0.92, p);
      title.style.opacity = tp.toFixed(3);
      title.style.filter = tp >= 1 ? '' : 'blur(' + ((1 - tp) * 16).toFixed(1) + 'px)';
      title.style.transform = tp >= 1 ? '' : 'translateY(' + ((1 - tp) * 40).toFixed(1) + 'px)';
      band.classList.toggle('np-on', tp > 0.02);

      /* 3) particles fly mid-scroll */
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, innerWidth, vh);
      if (p <= 0 || p >= 1) return;
      var fadeAll = 1 - smooth(0.82, 1, p);
      if (fadeAll <= 0) return;
      var trect = title.getBoundingClientRect();
      var i2, pt, pp, sx, sy, ex, ey, e, a;
      var centers = chars.map(function (c) {
        var r = c.getBoundingClientRect();
        return [r.left + r.width / 2, r.top + r.height / 2];
      });
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
        a = Math.min(1, pp * 5) * (1 - pp) * 1.4 * fadeAll;
        if (a <= 0.01) continue;
        ctx.globalAlpha = Math.min(1, a);
        ctx.fillStyle = (pt.ci % 5 === 0) ? '#ffc9a3' : '#ffffff';
        /* falling micro-streaks: stretch vertically mid-flight, settle to dots */
        var px = sx + (ex - sx) * e;
        var py = sy + (ey - sy) * e + Math.sin(pp * Math.PI) * 150;
        var streak = pt.s * (1 + pp * 7);
        ctx.fillRect(px - pt.s / 2, py - streak / 2, pt.s, streak);
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
