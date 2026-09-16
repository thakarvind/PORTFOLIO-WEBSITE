/* OG dragon wrap — section #nameform (2nd after hero).
   Real fire-dragon PNG (assets/dragon.png) flies in from the right,
   loops once around THAK ARAVIND, parks top-left of the name.
   Canvas underneath lays the fire trail; title flips to OG solid red.
   No deps. Pauses offscreen. */
(function () {
  var sec = document.getElementById('nameform');
  var cv = document.getElementById('dragonWrap');
  var fly = document.getElementById('dragonFly');
  var title = document.getElementById('nameformTitle');
  if (!sec || !cv || !fly || !title) return;
  var ctx = cv.getContext('2d');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    title.classList.add('og-lit'); fly.style.display = 'none'; return;
  }

  var W = 0, H = 0, parts = [], raf = 0, playing = false, visible = false;
  var t0 = 0, DUR = 3800, px = 0, py = 0;
  // ponytail: fixed particle cap, no pooling framework
  var MAX = innerWidth < 860 ? 260 : 420;

  function size() {
    var DPR = Math.min(devicePixelRatio || 1, 2);
    W = sec.clientWidth; H = sec.clientHeight;
    cv.width = W * DPR; cv.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function ring() {
    var r = title.getBoundingClientRect(), s = sec.getBoundingClientRect();
    var cx = r.left - s.left + r.width / 2, cy = r.top - s.top + r.height / 2;
    return { cx: cx, cy: cy, rx: r.width / 2 + 60, ry: r.height / 2 + 70 };
  }

  // Dragon center path. 0→.3 enter from right, .3→.8 one loop, .8→1 park top-left.
  function pathPos(p, R) {
    if (p < 0.3) {
      var k = p / 0.3, e = 1 - Math.pow(1 - k, 3);
      return { x: W + 160 + (R.cx + R.rx * 0.9 - (W + 160)) * e, y: H * 0.32 + (R.cy - R.ry - H * 0.32) * e, face: -1, bank: -8 * (1 - e) };
    }
    if (p < 0.8) {
      var k2 = (p - 0.3) / 0.5, ang = -Math.PI / 2 + k2 * Math.PI * 2;
      var dx = -Math.sin(ang) * R.rx, dy = Math.cos(ang) * R.ry;
      return { x: R.cx + Math.cos(ang) * R.rx, y: R.cy + Math.sin(ang) * R.ry, face: dx >= 0 ? 1 : -1, bank: Math.atan2(dy, Math.abs(dx)) * 57.3 * 0.35 };
    }
    var ang2 = Math.PI * 1.5; // parked: top-left of name, head over the "T"
    return {
      x: R.cx - R.rx * 0.72, y: R.cy - R.ry * 0.95,
      face: 1, bank: -6, park: true, a: ang2
    };
  }

  function spawn(x, y) {
    if (parts.length > MAX) parts.shift();
    parts.push({
      x: x, y: y,
      vx: (Math.random() - .5) * 1.6, vy: (Math.random() - .5) * 1.6 - .7,
      r: 1.2 + Math.random() * 2.6, life: 1,
      decay: .008 + Math.random() * .016, hot: Math.random() < .3
    });
  }

  function place(p, R, now) {
    var d = pathPos(p, R), dw = fly.offsetWidth || 220, dh = fly.offsetHeight || 207;
    if (d.park) { // gentle hover bob while perched (OG hold frames)
      d.y += Math.sin(now * 0.0022) * 7;
      d.bank = -6 + Math.sin(now * 0.0018) * 3;
    }
    px = d.x; py = d.y;
    fly.style.opacity = p < 0.02 ? p / 0.02 : 1;
    fly.style.transform = 'translate(' + (d.x - dw / 2) + 'px,' + (d.y - dh / 2) + 'px)' +
      ' rotate(' + d.bank + 'deg) scaleX(' + d.face + ')';
    return d;
  }

  function frame(now) {
    if (!playing) return;
    if (!visible || document.hidden) { raf = requestAnimationFrame(frame); t0 += 16.7; return; }
    var p = Math.min((now - t0) / DUR, 1);
    var R = ring(), d = place(p, R, now);
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    // fire trail from the tail (behind flight direction) + ring upkeep on hold
    var n = p < 1 ? 6 : 2, tx = px - d.face * 60, ty = py + 20;
    for (var i = 0; i < n; i++) spawn(tx + (Math.random() - .5) * 30, ty + (Math.random() - .5) * 30);
    if (p > 0.3) {
      var k = Math.min((p - 0.3) / 0.5, 1), steps = Math.floor(k * 80);
      for (var s = 0; s < 2; s++) {
        var ang = -Math.PI / 2 + Math.max(0, (steps - s * 3) / 80) * Math.PI * 2;
        spawn(R.cx + Math.cos(ang) * R.rx, R.cy + Math.sin(ang) * R.ry);
      }
    }

    for (var j = parts.length - 1; j >= 0; j--) {
      var q = parts[j];
      q.life -= q.decay; q.x += q.vx; q.y += q.vy;
      if (q.life <= 0) { parts.splice(j, 1); continue; }
      ctx.globalAlpha = q.life * (.6 + .4 * Math.sin(now * .02 + q.x));
      ctx.fillStyle = q.hot ? '255,236,200' : '255,110,28';
      ctx.beginPath(); ctx.arc(q.x, q.y, q.r * q.life + .4, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (p > 0.55) title.classList.add('og-lit');
    raf = requestAnimationFrame(frame);
  }

  function play() {
    cancelAnimationFrame(raf);
    parts.length = 0; title.classList.remove('og-lit');
    size(); t0 = performance.now(); playing = true;
    raf = requestAnimationFrame(frame);
  }

  // wait for dragon PNG so offsetWidth measures right on first play
  if (!fly.complete) fly.addEventListener('load', function () { if (visible && !playing) play(); });
  new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      visible = en.isIntersecting;
      if (visible && !playing) play();
    });
  }, { threshold: 0.35 }).observe(sec);

  addEventListener('resize', function () { if (playing) size(); }, { passive: true });
})();
