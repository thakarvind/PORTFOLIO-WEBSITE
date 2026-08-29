/* PERF GOVERNOR v2 — targets the display's NATIVE refresh rate permanently.
   1) Auto-detects the display refresh (60/120/144Hz+) and derives thresholds
      from it: stage escalation begins the moment average frame times drop
      meaningfully below native, so the compositor can hit native fps.
   2) Sheds ambient effects ONLY while sub-native performance is measured
      (grain -> glow/edge-drift -> sparks); auto-restores when native-rate
      frames are sustained again. Nothing else is ever touched.
   3) Builds the Three.js engine during idle instead of mid-scroll, so
      reaching the projects section never stutters (603KB parse moved off
      the critical path). */
(function () {
  try {
    if (window.__perfGovernorV2) return;
    window.__perfGovernorV2 = true;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var html = document.documentElement;
    var warmDts = [], WARM = 90;
    var last = 0, acc = 0, n = 0, bad = 0, good = 0, soft = 0, stage = 0;
    var GOOD_MS = 19, JANK_MS = 24;   /* replaced after refresh detection */
    var WINDOW = 50, BAD_WINDOWS = 2, GOOD_WINDOWS = 12, SOFT_WINDOWS = 8, SOFT2_WINDOWS = 20;
    var ready = false;

    /* ---- native refresh detection: 25th percentile resists load spikes ---- */
    function detect() {
      if (!warmDts.length) { GOOD_MS = 19; JANK_MS = 24; return; }
      var a = warmDts.slice().sort(function (x, y) { return x - y; });
      var refresh = Math.min(34, Math.max(5, a[Math.floor(a.length * 0.25)]));
      GOOD_MS = refresh * 1.12;   /* 60Hz -> ~18.7ms (53fps), 144Hz -> ~7.7ms (130fps) */
      JANK_MS = refresh * 1.32;   /* 60Hz -> ~22ms (45fps),  144Hz -> ~9.1ms (110fps) */
    }

    function apply() {
      html.classList.toggle('perf-1', stage >= 1);
      html.classList.toggle('perf-2', stage >= 2);
      if (stage >= 2) {
        if (!window.__perfSparkHold) { window.__perfSparkHold = true; window.__sparksPaused = true; }
        else if (window.__sparksPaused === false) { window.__sparksPaused = true; }
      } else if (window.__perfSparkHold) {
        window.__perfSparkHold = false;
        window.__sparksPaused = false;
        if (window.__sparksKick) window.__sparksKick();  /* resume embers */
      }
    }

    /* ---- idle Three.js preload: kills the mid-scroll parse stutter ---- */
    function idlePreload() {
      try {
        if (window.__threeLoaded || !window.__threeLoad) return;
        if (window.requestIdleCallback) requestIdleCallback(function () { try { window.__threeLoad(); } catch (e) {} }, { timeout: 6000 });
        else setTimeout(function () { try { window.__threeLoad(); } catch (e) {} }, 4000);
      } catch (e) {}
    }

    function tick(now) {
      requestAnimationFrame(tick);
      if (!last) { last = now; return; }
      var dt = now - last; last = now;
      if (dt <= 0 || dt >= 1000) { acc = 0; n = 0; return; }   /* tab was hidden */
      if (!ready) {
        warmDts.push(dt);
        if (warmDts.length >= WARM) { detect(); ready = true; idlePreload(); }
        return;
      }
      acc += dt; n++;
      if (n < WINDOW) return;
      var avg = acc / n; acc = 0; n = 0;
      if (avg > JANK_MS) { bad++; good = 0; soft = 0; }
      else if (avg < GOOD_MS) { good++; bad = 0; soft = 0; }
      else { soft++; bad = 0; good = 0; }   /* chronic sub-native band */
      if (bad >= BAD_WINDOWS && stage < 2) { stage++; bad = 0; good = 0; soft = 0; apply(); }
      else if (soft >= SOFT_WINDOWS && stage < 1) { stage = 1; soft = 0; apply(); }
      else if (soft >= SOFT2_WINDOWS && stage < 2) { stage = 2; soft = 0; apply(); }
      else if (good >= GOOD_WINDOWS && stage > 0) { stage--; good = 0; bad = 0; soft = 0; apply(); }
      if (stage >= 2) apply();
    }
    requestAnimationFrame(tick);
  } catch (err) { /* never break the site over the governor */ }
})();