(function () {
  if (!window.THREE) return;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var links = Array.prototype.slice.call(document.querySelectorAll(".gold-link"));
  if (!links.length) return;

  /* PERF: small decorative canvases don't need full-res backing stores.
     Cap DPR and skip MSAA on high-DPI screens (visually identical, ~50% GPU) */
  var RAW_DPR = window.devicePixelRatio || 1;
  var DPR = Math.min(RAW_DPR, 1.1);
  var USE_AA = RAW_DPR < 1.5;
  var W = 160, H = 240;
  var BW = Math.round(W * DPR), BH = Math.round(H * DPR);

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

  var clock = new THREE.Clock();

  /* PERF: ONE scene + ONE WebGL context for the whole page.
     Every connector shows the identical shape with identical rotation and
     lighting, so the frame is rendered once per tick and blitted into each
     visible connector's own 2D canvas via drawImage (160x240, trivially cheap).
     The previous build created and disposed a WebGL context every time a
     connector scrolled in/out of view: 50-200ms of context setup at every
     section boundary, in both directions, plus GPU memory churn. That was the
     "gets stuck between sections" hitch. Output pixels are unchanged. */
  var scene, camera, mesh, key, renderer = null, rx = 0;
  try {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 0, 13);
    scene.add(new THREE.AmbientLight(0x1a1d2e, 0.6));
    key = new THREE.PointLight(0xff7a45, 45, 30, 2); key.position.set(4, 6, 6); scene.add(key);
    var rim = new THREE.PointLight(0x3a5aff, 20, 30, 2); rim.position.set(-6, -4, -4); scene.add(rim);
    var fill = new THREE.PointLight(0xffffff, 4, 20, 2); fill.position.set(0, 2, 8); scene.add(fill);
    mesh = new THREE.Mesh(
      new THREE.LatheGeometry(buildProfile(0.4), 48),
      new THREE.MeshStandardMaterial({ color: 0xdfe3ea, metalness: 1, roughness: 0.1, emissive: 0x2a1208, emissiveIntensity: 0.2, side: THREE.DoubleSide })
    );
    scene.add(mesh);
  } catch (err) { return; /* frosted glass fallback stays */ }

  function ensureRenderer() {
    if (renderer) return true;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: USE_AA, alpha: true });
      renderer.setPixelRatio(DPR);
      renderer.setSize(W, H, false);
      renderer.setClearColor(0x000000, 0);
      return true;
    } catch (err) { renderer = null; return false; }
  }

  function renderFrame() {
    var t = clock.getElapsedTime();
    /* Cursor-reactive: yaw follows mouse X, pitch follows mouse Y (eased),
       and the key light glints toward the pointer. */
    mesh.rotation.y = t * 0.25 + mx * 0.42;
    mesh.rotation.x = rx;
    key.position.x = 4 + mx * 2.5;
    key.position.y = 6 - my * 2.5;
    key.intensity = 40 + Math.sin(t * 0.8) * 6;
    renderer.render(scene, camera);
  }

  var items = [];
  links.forEach(function (el) {
    var canvas = document.createElement("canvas");
    canvas.width = BW; canvas.height = BH;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var item = { el: el, canvas: canvas, ctx: ctx, visible: false, mounted: false };
    el.__goldItem = item;
    items.push(item);
  });
  if (!items.length) return;

  function blit(it) {
    it.ctx.clearRect(0, 0, BW, BH);
    it.ctx.drawImage(renderer.domElement, 0, 0, BW, BH);
  }
  function mount(it) {
    if (it.mounted) return;
    it.mounted = true;
    it.el.appendChild(it.canvas);
    it.el.classList.add("webgl-on");
  }

  var visCount = 0;
  var running = false;
  var lastF = 0;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var it = en.target.__goldItem;
      if (!it || it.visible === en.isIntersecting) return;
      it.visible = en.isIntersecting;
      visCount += it.visible ? 1 : -1;
      if (it.visible && ensureRenderer()) {
        /* paint the first frame synchronously so the link never flashes blank/frosted */
        renderFrame();
        blit(it);
        mount(it);
      }
    });
    if (visCount < 0) visCount = 0;
    if (!reduced && visCount > 0) kickFrame();
  }, { rootMargin: "120px" });
  items.forEach(function (it) { io.observe(it.el); });

  /* No fixed-interval throttle here: skipping frames on a 16ms gate produced
     uneven pacing (judder at 60Hz, alternate frames at 120Hz). Motion is
     already dt-scaled, so rendering every rAF gives the same speed, smoothly. */
  function frame(now) {
    if (document.hidden || !visCount || !renderer) { running = false; return; }
    requestAnimationFrame(frame);
    var DS = Math.min((now - (lastF || now)) / 16.667, 3) || 1;
    lastF = now;
    rx += ((my * 0.22) - rx) * (1 - Math.pow(0.96, DS));
    renderFrame();
    for (var i = 0; i < items.length; i++) {
      if (items[i].visible && items[i].mounted) blit(items[i]);
    }
  }
  function kickFrame() { if (!running) { running = true; lastF = 0; requestAnimationFrame(frame); } }
  document.addEventListener("visibilitychange", function () { if (!document.hidden && !reduced && visCount > 0) kickFrame(); });
})();
