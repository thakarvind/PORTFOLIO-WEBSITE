/* Silk orbital motion — scroll-driven, compositor-only.
   Each .silk layer slides + rotates as it passes through the viewport (alternating
   direction = orbit feel); the hero silk spirals away as you scroll off it.
   PERF: one passive scroll listener -> rAF-gated updates. Zero work when idle.
   Transforms only (no repaints). Replaces the CSS keyframe drift on .silk-hero
   (CSS animations override inline transforms, so it is switched off here). */
(function () {
  try {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var els = [].slice.call(document.querySelectorAll(".silk-hero, .silk-ribbon"));
    if (!els.length) return;
    var hero = document.querySelector(".silk-hero");
    if (hero) hero.style.animation = "none";

    var ticking = false;
    function update() {
      ticking = false;
      var vh = innerHeight;
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var r = el.getBoundingClientRect();
        if (r.bottom < -120 || r.top > vh + 120) continue; /* off-screen: skip */
        var p = ((r.top + r.height / 2) / (vh + r.height)) * 2 - 1; /* -1..1 */
        if (el === hero) {
          /* hero: spiral away as it scrolls off (0 -> 1) */
          var sy = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
          el.style.transform = "translate3d(" + (sy * 4).toFixed(2) + "%," + (sy * 7).toFixed(2) + "%,0) rotate(" + (sy * -2.5).toFixed(2) + "deg)";
        } else {
          /* ribbons: orbit past — alternating direction per ribbon */
          var dir = (i % 2 ? -1 : 1);
          el.style.transform = "perspective(900px) translate3d(" + (dir * p * -7).toFixed(2) + "%,0,0) rotate(" + (dir * p * -3).toFixed(2) + "deg)";
        }
      }
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    update();
  } catch (err) { /* decorative — never block the page */ }
})();
