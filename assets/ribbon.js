/* 3D silk ribbons — desktop WebGL enhancement.
   Hero: a SHORT twin-strand wrap hugging the small vertical THAK·ARAVIND
   brand (no wide ambient ribbon — the portrait stays clean). On scroll the
   wrap tightens, then lets go as the brand dissolves into particles.
   MY NAME band: horizontal REVERSE twin-wrap sweeping across the section
   while particles assemble into the title, spreading + fading toward About.
   Each canvas owns a tiny scene, paused off-screen. Lenis untouched. */
(function () {
  try {
    if (!window.THREE) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var VSH = [
      'uniform float uT;',
      'varying vec2 vUv;',
      'void main(){',
      '  vUv = uv;',
      '  vec3 p = position;',
      '  p.z += sin(uv.x * 6.2831 + uT * 0.7) * 0.34 + sin(uv.y * 5.0 - uT * 0.5 + uv.x * 3.0) * 0.26;',
      '  p.x += sin(uv.y * 3.0 + uT * 0.4) * 0.12;',
      '  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);',
      '}'
    ].join('\n');
    var FSH = [
      'uniform sampler2D uMap;',
      'uniform float uT;',
      'uniform float uOp;',
      'varying vec2 vUv;',
      'void main(){',
      '  vec2 uv = vUv + vec2(uT * 0.008, sin(uT * 0.3 + vUv.x * 4.0) * 0.01);',
      '  vec3 c = texture2D(uMap, uv).rgb;',
      '  c *= vec3(1.28, 0.84, 0.73);',
      '  float mx = smoothstep(0.0, 0.28, vUv.x) * (1.0 - smoothstep(0.72, 1.0, vUv.x));',
      '  float my = smoothstep(0.0, 0.30, vUv.y) * (1.0 - smoothstep(0.70, 1.0, vUv.y));',
      '  float a = mx * my * uOp;',
      '  gl_FragColor = vec4(c * a, a);',
      '}'
    ].join('\n');

    var tex = null;
    try {
      tex = new THREE.TextureLoader().load('assets/silk.jpg?v=1');
      if (THREE.SRGBColorSpace && tex && 'colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace;
    } catch (e) {}

    var mx = 0;
    addEventListener('mousemove', function (e) {
      try { mx = (e.clientX / innerWidth) * 2 - 1; } catch (err) {}
    }, { passive: true });

    function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
    function smooth(a, b, v) {
      var x = clamp01((v - a) / (b - a));
      return x * x * (3 - 2 * x);
    }
    /* shared scroll flow: 0 at top → 1 when MY NAME band centers on screen */
    function flowG() {
      var band = document.getElementById('nameform');
      if (!band) return 0;
      var vh = innerHeight || 1;
      var r = band.getBoundingClientRect();
      var y1 = (r.top + (window.scrollY || 0)) + r.height / 2 - vh / 2;
      return clamp01((window.scrollY || 0) / Math.max(1, y1));
    }
    function makeRenderer(canvas) {
      var r;
      try {
        r = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
      } catch (e) { return null; }
      r.setPixelRatio(Math.min(window.devicePixelRatio || 1, matchMedia('(max-width: 860px)').matches ? 1 : 1.5));
      r.setClearColor(0x000000, 0);
      return r;
    }
    function strandMesh(w, h, phase) {
      var m = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h, 64, 20),
        new THREE.ShaderMaterial({
          uniforms: { uT: { value: phase }, uMap: { value: tex }, uOp: { value: 0 } },
          transparent: true, depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexShader: VSH, fragmentShader: FSH
        })
      );
      m.rotation.x = -0.08;
      return m;
    }
    function watch(area, onVis) {
      try {
        new IntersectionObserver(function (en) {
          onVis(!!en[0].isIntersecting);
        }, { rootMargin: '100px' }).observe(area);
      } catch (e) {}
    }
    function fitTo(renderer, camera, w, h) {
      w = Math.max(2, w); h = Math.max(2, h);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    /* ---------- SHORT wrap hugging the small hero brand ----------
       Twin strands stand vertical along the brand strip; scroll twists them
       tight around the text, then everything lets go as it particle-dissolves. */
    (function wrap() {
      var canvas = document.getElementById('ribbonWrap');
      var area = document.getElementById('top');
      if (!canvas || !area) return;
      if (matchMedia('(max-width: 860px)').matches) return; /* pill layout: band wrap covers mobile */
      var renderer = makeRenderer(canvas);
      if (!renderer) return;
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
      camera.position.set(0, 0, 8);
      var A = strandMesh(6.0, 2.0, 0);
      var B = strandMesh(6.0, 2.0, 1.7);
      A.rotation.z = Math.PI / 2 + 0.06;
      B.rotation.z = Math.PI / 2 - 0.06;
      scene.add(A);
      scene.add(B);
      function size() {
        fitTo(renderer, camera, canvas.clientWidth || 150, canvas.clientHeight || 360);
      }
      size();
      addEventListener('resize', size, { passive: true });
      var visible = true, raf = 0, last = 0, t = 0, fade = 1;
      function frame(now) {
        raf = 0;
        if (document.hidden || !visible) return;
        raf = requestAnimationFrame(frame);
        var dt = Math.min(0.05, (now - (last || now)) / 1000);
        last = now;
        t += dt;
        var g = flowG();
        var twist = t * 0.5 + g * Math.PI * 3;
        var spread = 0.32 + 0.5 * smooth(0.05, 0.3, g);
        var c = Math.cos(twist), s = Math.sin(twist);
        /* hand-off: as the brand dissolves, the wrap sinks + drifts down-left
           toward the MY NAME section, carrying the silk into the next band */
        var sink = smooth(0.18, 0.5, g);
        A.position.set(c * spread - sink * 1.4, s * 0.9 - sink * 2.6, s * 0.8);
        B.position.set(-c * spread + sink * 1.4, -s * 0.9 - sink * 2.6, -s * 0.8);
        A.material.uniforms.uT.value = t;
        B.material.uniforms.uT.value = t + 1.7;
        /* steady from frame one (fade starts at 1 — no 2s ramp) */
        var op = 0.62;
        A.material.uniforms.uOp.value = op;
        B.material.uniforms.uOp.value = op;
        renderer.render(scene, camera);
      }
      function kick() { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }
      watch(area, function (v) { visible = v; if (v) kick(); });
      document.addEventListener('visibilitychange', function () {
        if (!document.hidden && visible) kick();
      });
      canvas.style.display = 'block';
      kick();
    })();

    /* ---------- MY NAME band: horizontal REVERSE wrap ----------
       Wide strands run left–right and weave over/under in the opposite
       direction while particles become the title; they spread apart and
       fade as the next section arrives. */
    (function band() {
      var canvas = document.getElementById('ribbonBand');
      var area = document.getElementById('nameform');
      var titleEl = document.getElementById('nameformTitle');
      if (!canvas || !area) return;
      var renderer = makeRenderer(canvas);
      if (!renderer) return;
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
      camera.position.set(0, 0, 8);
      var A = strandMesh(13.0, 2.1, 0);
      var B = strandMesh(13.0, 2.1, 1.7);
      A.rotation.z = -0.06;
      B.rotation.z = -0.1;
      scene.add(A);
      scene.add(B);
      function size() {
        var r = area.getBoundingClientRect();
        fitTo(renderer, camera, r.width, r.height);
      }
      size();
      addEventListener('resize', size, { passive: true });
      var visible = true, raf = 0, last = 0, t = 0, fade = 0;
      function frame(now) {
        raf = 0;
        if (document.hidden || !visible) return;
        raf = requestAnimationFrame(frame);
        var dt = Math.min(0.05, (now - (last || now)) / 1000);
        last = now;
        t += dt;
        var vh = innerHeight || 1;
        var r = area.getBoundingClientRect();
        var bp = ((vh / 2) - (r.top + r.height / 2)) / vh;
        var rh = -(t * 0.3 + bp * Math.PI * 3);
        /* narrow weave pinned tight on the letter bodies (no floating above) */
        var sep = 0.28 + open * 0.9;
        /* pin the weave ON the title: title offset within band → world units
           (visible height at z=0 is 2*8*tan(22.5°) ≈ 6.63) */
        var ty = 0;
        try {
          if (titleEl) {
            var br = area.getBoundingClientRect();
            var tr = titleEl.getBoundingClientRect();
            var frac = ((tr.top + tr.height / 2) - (br.top + br.height / 2)) / Math.max(1, br.height);
            ty = -frac * 6.63;
          }
        } catch (e) {}
        var c = Math.cos(rh), s = Math.sin(rh);
        A.position.set(s * 0.6, ty + c * sep, s * 1.0);
        B.position.set(-s * 0.6, ty - c * sep, -s * 1.0);
        A.material.uniforms.uT.value = t;
        B.material.uniforms.uT.value = t + 1.7;
        fade = Math.min(1, fade + dt * 0.5);
        /* soft + permanent: steady weave while the section is on screen */
        var op = fade * 0.62;
        A.material.uniforms.uOp.value = op;
        B.material.uniforms.uOp.value = op;
        A.rotation.y += ((mx * 0.1) - A.rotation.y) * 0.04;
        B.rotation.y += ((mx * -0.1) - B.rotation.y) * 0.04;
        renderer.render(scene, camera);
      }
      function kick() { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }
      watch(area, function (v) { visible = v; if (v) kick(); });
      document.addEventListener('visibilitychange', function () {
        if (!document.hidden && visible) kick();
      });
      canvas.style.display = 'block';
      kick();
    })();
  } catch (e) { /* decorative — never block the page */ }
})();
