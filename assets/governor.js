/* PERF GOVERNOR — makes smoothness permanent on any hardware.
   Measures real frame times; ONLY while sustained jank is actually measured
   does it shed ambient effects (grain jitter -> glow/edge-drift -> sparks),
   and it steps back down automatically once the machine holds healthy frames.
   On capable hardware nothing ever changes visually. */
(function () {
  try {
    if (window.__perfGovernor) return;
    window.__perfGovernor = true;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var html = document.documentElement;
    var last = 0, acc = 0, n = 0, warm = 0, bad = 0, good = 0, stage = 0;
    var WINDOW = 50;        /* frames per measurement (~0.8s @60Hz) */
    var JANK_MS = 24;       /* avg frame time > 24ms  = under ~42fps */
    var GOOD_MS = 19;       /* avg frame time < 19ms  = over  ~52fps */
    var BAD_WINDOWS = 3;    /* ~2.4s sustained jank  -> escalate one stage */
    var GOOD_WINDOWS = 12;  /* ~10s sustained health -> de-escalate one stage */

    function apply() {
      html.classList.toggle('perf-1', stage >= 1);
      html.classList.toggle('perf-2', stage >= 2);
      if (stage >= 2) {
        if (!window.__perfSparkHold) {
          window.__perfSparkHold = true;
          window.__sparksPaused = true;          /* freezes the ember canvas */
        } else if (window.__sparksPaused === false) {
          window.__sparksPaused = true;          /* re-assert if IO resumed it */
        }
      } else if (window.__perfSparkHold) {
        window.__perfSparkHold = false;
        window.__sparksPaused = false;
        if (window.__sparksKick) window.__sparksKick();  /* resume embers */
      }
    }

    function tick(now) {
      requestAnimationFrame(tick);
      if (!last) { last = now; return; }
      var dt = now - last; last = now;
      if (dt <= 0 || dt >= 1000) { acc = 0; n = 0; return; }  /* tab was hidden */
      if (warm < 90) { warm++; return; }                      /* ~1.5s load warm-up */
      acc += dt; n++;
      if (n < WINDOW) return;
      var avg = acc / n; acc = 0; n = 0;
      if (avg > JANK_MS) { bad++; good = 0; }
      else if (avg < GOOD_MS) { good++; bad = 0; }
      else { bad = 0; good = 0; }
      if (bad >= BAD_WINDOWS && stage < 2) { stage++; bad = 0; good = 0; apply(); }
      else if (good >= GOOD_WINDOWS && stage > 0) { stage--; good = 0; bad = 0; apply(); }
      if (stage >= 2) apply();   /* keep the spark freeze asserted */
    }
    requestAnimationFrame(tick);
  } catch (err) { /* never break the site over the governor */ }
})();