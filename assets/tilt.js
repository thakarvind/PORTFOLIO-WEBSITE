/* 3D card tilt — desktop pointer only.
   PERF: zero idle cost. A rAF loop runs ONLY while a card is under the cursor and
   decays back to flat after leave; transforms are compositor-only (GPU's job).
   No CSS transitions are touched (cards animate background/box-shadow separately). */
(function () {
  try {
    if (!matchMedia("(pointer:fine)").matches) return;
    if (window.__prefer120) return; // buttery 144: disable tilt rAF
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var MAX = 5; /* max tilt in degrees — subtle, premium feel */

    var cards = document.querySelectorAll(".m-box, .a-box");
    Array.prototype.forEach.call(cards, function (el) {
      if (el.__tilt) return;
      el.__tilt = true;

      var raf = 0, active = false, tx = 0, ty = 0, cx = 0, cy = 0;

      function loop() {
        cx += (tx - cx) * 0.16;
        cy += (ty - cy) * 0.16;
        var settled = !active && Math.abs(tx - cx) < 0.05 && Math.abs(ty - cy) < 0.05;
        if (settled) {
          cx = cy = tx = ty = 0;
          el.style.transform = "";
          el.style.willChange = "";
          raf = 0;
          return;
        }
        el.style.transform = "perspective(900px) rotateX(" + cx.toFixed(3) + "deg) rotateY(" + cy.toFixed(3) + "deg)";
        raf = requestAnimationFrame(loop);
      }
      function wake() { if (!raf) raf = requestAnimationFrame(loop); }
      function onMove(e) {
        var r = el.getBoundingClientRect();
        tx = ((e.clientY - r.top) / r.height - 0.5) * -2 * MAX; /* rotateX */
        ty = ((e.clientX - r.left) / r.width - 0.5) * 2 * MAX;  /* rotateY */
        wake();
      }
      function onEnter(e) { active = true; el.style.willChange = "transform"; onMove(e); }
      function onLeave() { active = false; tx = 0; ty = 0; wake(); }

      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerleave", onLeave);
      /* Safety: if the element is removed from the DOM mid-hover, stop looping */
      el.addEventListener("DOMNodeRemoved", function () { active = false; tx = ty = 0; });
    });
  } catch (err) { /* tilt is decorative — never block the page */ }
})();
