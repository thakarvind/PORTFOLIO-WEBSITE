/* OG dragon wrap — section #nameform (2nd after hero).
   Fire dragon enters from right, sweeps in, loops ~1.25 turns around
   THAK ARAVIND, parks head top-left as a flickering fire ring.
   Pure canvas 2D, no assets/deps. Pauses offscreen. */
(function () {
  var sec = document.getElementById('nameform');
  var cv = document.getElementById('dragonWrap');
  var title = document.getElementById('nameformTitle');
  if (!sec || !cv || !title) return;
  var ctx = cv.getContext('2d');
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { title.classList.add('og-lit'); return; }

  var W = 0, H = 0, DPR = 1, parts = [], raf = 0, playing = false, visible = false;
  var t0 = 0, DUR = 3400, HOLD = true;
  // ponytail: O(n) particle cap, no pooling framework — fixed array is enough
  var MAX = innerWidth < 860 ? 260 : 420;

  function size() {
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = sec.clientWidth; H = sec.clientHeight;
    cv.width = W * DPR; cv.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  // Title ellipse in canvas coords (recomputed each play — responsive safe)
  function ring() {
    var r = title.getBoundingClientRect(), s = sec.getBoundingClientRect();
    var cx = r.left - s.left + r.width / 2, cy = r.top - s.top + r.height / 2;
    return { cx: cx, cy: cy, rx: r.width / 2 + 46, ry: r.height / 2 + 52 };
  }

  // Head path: p in [0,1]. 0→.32 enter from right edge, .32→1 wrap 1.25 loops.
  function headPos(p, R) {
    if (p < 0.32) {
      var k = p / 0.32, e = 1 - Math.pow(1 - k, 3);
      return { x: W + 60 + (R.cx + R.rx - (W + 60)) * e, y: H * 0.30 + (R.cy - R.ry - H * 0.30) * e, a: e };
    }
    var k2 = (p - 0.32) / 0.68, ang = -Math.PI / 2 + k2 * Math.PI * 2 * 1.25;
    return {
      x: R.cx + Math.cos(ang) * R.rx, y: R.cy + Math.sin(ang) * R.ry,
      a: Math.atan2(Math.cos(ang) * R.ry, -Math.sin(ang) * R.rx), k: k2
    };
  }

  function spawn(x, y, big) {
    if (parts.length > MAX) parts.shift();
    parts.push({
      x: x, y: y,
      vx: (Math.random() - .5) * 1.4, vy: (Math.random() - .5) * 1.4 - .6,
      r: (big ? 2.2 : 1.2) + Math.random() * (big ? 3.4 : 2.4),
      life: 1, decay: .008 + Math.random() * .016,
      hot: Math.random() < .3
    });
  }

  function drawHead(x, y, a) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(a || 0);
    ctx.globalCompositeOperation = 'lighter';
    var g = ctx.createRadialGradient(0, 0, 0, 0, 0, 16);
    g.addColorStop(0, 'rgba(255,240,214,.95)');
    g.addColorStop(.35, 'rgba(255,150,60,.8)');
    g.addColorStop(1, 'rgba(255,60,20,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 16, 0, 7); ctx.fill();
    // flame mane: 3 flickering spikes behind head
    ctx.fillStyle = 'rgba(255,110,30,.85)';
    for (var i = 0; i < 3; i++) {
      var f = 10 + Math.random() * 10;
      ctx.beginPath();
      ctx.moveTo(-6, -5 + i * 5); ctx.lineTo(-6 - f, -2 + i * 5); ctx.lineTo(-6, 1 + i * 5);
      ctx.fill();
    }
    ctx.restore();
  }

  function frame(now) {
    if (!playing) return;
    if (!visible || document.hidden) { raf = requestAnimationFrame(frame); t0 += 16.7; return; }
    var p = Math.min((now - t0) / DUR, 1);
    var R = ring(), hp = headPos(p, R);
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    // trail: dense at head while travelling, sparse upkeep on hold
    var n = p < 1 ? 7 : 2;
    for (var i = 0; i < n; i++) spawn(hp.x, hp.y, p < 1);

    // ring memory: stamp fading embers along travelled arc so the loop persists
    if (p > 0.32) {
      var k = (p - 0.32) / 0.68, steps = Math.floor(k * 90);
      for (var s = 0; s < 2; s++) {
        var kk = Math.max(0, (steps - s * 3) / 90);
        var ang = -Math.PI / 2 + kk * Math.PI * 2 * 1.25;
        spawn(R.cx + Math.cos(ang) * R.rx, R.cy + Math.sin(ang) * R.ry, false);
      }
    }

    for (var j = parts.length - 1; j >= 0; j--) {
      var q = parts[j];
      q.life -= q.decay; q.x += q.vx; q.y += q.vy;
      if (q.life <= 0) { parts.splice(j, 1); continue; }
      var tw = .6 + .4 * Math.sin(now * .02 + q.x);
      ctx.globalAlpha = q.life * tw;
      ctx.fillStyle = q.hot ? '255,236,200' : (Math.random() < .5 ? '255,122,24' : '255,70,30');
      ctx.beginPath(); ctx.arc(q.x, q.y, q.r * q.life + .4, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (p < 1) drawHead(hp.x, hp.y, hp.a);
    else if (HOLD) {
      // parked: head top-left of title, tail glow underneath (OG frames 055-060)
      var ang2 = -Math.PI / 2 + Math.PI * 2 * 1.25;
      drawHead(R.cx + Math.cos(ang2) * R.rx, R.cy + Math.sin(ang2) * R.ry, 2.6);
    }
    if (p > 0.55) title.classList.add('og-lit');
    raf = requestAnimationFrame(frame);
  }

  function play() {
    cancelAnimationFrame(raf);
    parts.length = 0; title.classList.remove('og-lit');
    size(); t0 = performance.now(); playing = true;
    raf = requestAnimationFrame(frame);
  }

  new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      visible = en.isIntersecting;
      if (visible && !playing) play();
    });
  }, { threshold: 0.35 }).observe(sec);

  addEventListener('resize', function () { if (playing) size(); }, { passive: true });
})();
