(function () {
  if (!window.THREE) return;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var links = Array.prototype.slice.call(document.querySelectorAll(".gold-link"));
  if (!links.length) return;

  /* PERF: small decorative canvases don't need full-res backing stores.
     Cap at 1.5x and skip MSAA on high-DPI screens (visually identical, ~50% GPU) */
  var RAW_DPR = window.devicePixelRatio || 1;
  var DPR = Math.min(RAW_DPR, 1.1);
  var USE_AA = RAW_DPR < 1.5;

  var HEIGHT = 6.4, MAX_R = 2.6;
  function radiusAt(t, pinch) {
    var wave = Math.pow(Math.abs(Math.cos(t * Math.PI)), 1.6);
    return pinch + (MAX_R - pinch) * wave;
  }
  function buildProfile(pinch) {
    var pts = [], steps = 32, i;
    for (i = 0; i <= steps; i++) {
      var t = i / steps;
      pts.push(new THREE.Vector2(Math.max(radiusAt(t, pinch), 0.15), -HEIGHT / 2 + t * HEIGHT));
    }
    return pts;
  }

  var mx = 0, my = 0;
  window.addEventListener("mousemove", function (e) {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  var items = [];
  links.forEach(function (el) {
    try {
      var renderer = new THREE.WebGLRenderer({ antialias: USE_AA, alpha: true });
      renderer.setPixelRatio(DPR);
      renderer.setSize(160, 240, false);
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);
      el.classList.add("webgl-on");
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(38, 160 / 240, 0.1, 100);
      camera.position.set(0, 0, 13);
      scene.add(new THREE.AmbientLight(0x1a1d2e, 0.6));
      var key = new THREE.PointLight(0xff7a45, 45, 30, 2); key.position.set(4, 6, 6); scene.add(key);
      var rim = new THREE.PointLight(0x3a5aff, 20, 30, 2); rim.position.set(-6, -4, -4); scene.add(rim);
      var fill = new THREE.PointLight(0xffffff, 4, 20, 2); fill.position.set(0, 2, 8); scene.add(fill);
      var mesh = new THREE.Mesh(
        new THREE.LatheGeometry(buildProfile(0.4), 48),
        new THREE.MeshStandardMaterial({ color: 0xdfe3ea, metalness: 1, roughness: 0.1, emissive: 0x2a1208, emissiveIntensity: 0.2, side: THREE.DoubleSide })
      );
      scene.add(mesh);
      var item = { el: el, mesh: mesh, scene: scene, camera: camera, renderer: renderer, key: key, visible: false, rx: 0 };
      el.__goldItem = item;
      items.push(item);
    } catch (err) { /* frosted glass fallback stays */ }
  });
  if (!items.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var it = en.target.__goldItem;
      if (it && it.visible !== en.isIntersecting) {
        it.visible = en.isIntersecting;
        visCount += en.isIntersecting ? 1 : -1;
      }
        });
    /* PERF: 120Hz fix — if a gold-link just scrolled into view, wake the 3D render loop
       up again. The loop auto-halts below when nothing is on screen (see frame()). */
    if (visCount > 0) kickFrame();
  }, { rootMargin: "120px" });
  items.forEach(function (it) { io.observe(it.el); });

  var clock = new THREE.Clock();
  var visCount = 0;
  var lastF = 0;
    var running = false;
  function frame() {
    if (document.hidden || !visCount || document.documentElement.classList.contains("is-scrolling")) { running = false; if(!document.hidden && visCount && document.documentElement.classList.contains("is-scrolling")) setTimeout(function(){ if(!document.hidden && visCount && !document.documentElement.classList.contains("is-scrolling")) kickFrame(); }, 220); return; }
    var now = performance.now();
    var __ival2 = (window.__isRecord?8:6);
    if (now - lastF < __ival2) { requestAnimationFrame(frame); return; }
    running = true;
    requestAnimationFrame(frame);
    var pn = now;
    var DS = Math.min((pn - (lastF || pn)) / 16.667, 3) || 1;
    lastF = pn;
           var t = clock.getElapsedTime();
    var s = Math.sin(t * 0.8);
    items.forEach(function (it) {
      if (!it.visible) return;
      /* Cursor-reactive: yaw follows mouse X, pitch follows mouse Y (eased),
         and the key light glints toward the pointer. Rides the existing loop
         (which only runs while a gold-link is on screen) — zero added cost. */
      it.mesh.rotation.y = t * 0.25 + mx * 0.42;
      it.rx += ((my * 0.22) - it.rx) * (1 - Math.pow(0.96, DS));
      it.mesh.rotation.x = it.rx;
      it.key.position.x = 4 + mx * 2.5;
      it.key.position.y = 6 - my * 2.5;
      it.key.intensity = 40 + s * 6;
      it.renderer.render(it.scene, it.camera);
    });
    }
  /* Restart the 3D loop when a gold-link scrolls back into view (see IntersectionObserver) */
  function kickFrame() { if (!running) { running = true; requestAnimationFrame(frame); } }
  if (reduced) {
    items.forEach(function (it) { it.renderer.render(it.scene, it.camera); });
  } else {
        kickFrame();
  }
  document.addEventListener("visibilitychange", function(){ if(!document.hidden && visCount>0) kickFrame(); });
})();
