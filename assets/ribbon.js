/* 3D silk ribbons — desktop WebGL enhancement.
   Hero: single ribbon drifting behind FUTURE.
   Nameform band: TWIN strands helixing around the vertical title like DNA —
   scroll scrubs the twist (wrap tight mid-band, spread + fade as the next
   section arrives = "opens into the other section").
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
      '  c *= vec3(1.2, 0.82, 0.72);',
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

    function makeRenderer(canvas) {
      var r;
      try {
        r = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
      } catch (e) { return null; }
      r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
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

    /* ---------- hero: single ribbon left of FUTURE ---------- */
    (function hero() {
      var canvas = document.getElementById('ribbon');
      var area = document.getElementById('top');
      if (!canvas || !area) return;
      var renderer = makeRenderer(canvas);
      if (!renderer) return;
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
      camera.position.set(0, 0, 8);
      var mesh = strandMesh(10.5, 5.2, 0);
      mesh.position.set(-1.1, 0.1, 0);
      mesh.rotation.z = 0.06;
      scene.add(mesh);
      function size() {
        var r = area.getBoundingClientRect();
        var w = Math.max(2, r.width), h = Math.max(2, r.height);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
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
        mesh.material.uniforms.uT.value = t;
        fade = Math.min(1, fade + dt * 0.5);
        mesh.material.uniforms.uOp.value = fade * 0.85;
        mesh.rotation.y += ((mx * 0.18) - mesh.rotation.y) * 0.04;
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

    /* ---------- nameform: DNA double helix around the vertical title ----------
       bp: band-center vs viewport-center (-0.5 entering … +0.5 leaving).
       helix twist = idle drift + scroll-driven turns; strands cross in front /
       behind via z (additive glow flares at crossings = weave read).
       Near exit the strands spread wide and fade = opens into next section. */
    (function dna() {
      var canvas = document.getElementById('ribbonBand');
      var area = document.getElementById('nameform');
      if (!canvas || !area) return;
      var renderer = makeRenderer(canvas);
      if (!renderer) return;
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
      camera.position.set(0, 0, 8);
      var A = strandMesh(8.5, 3.0, 0);
      var B = strandMesh(8.5, 3.0, 1.7);
      A.rotation.z = 0.05;
      B.rotation.z = -0.05;
      scene.add(A);
      scene.add(B);
      function size() {
        var r = area.getBoundingClientRect();
        var w = Math.max(2, r.width), h = Math.max(2, r.height);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      size();
      addEventListener('resize', size, { passive: true });
      function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
      function smooth(a, b, v) {
        var x = clamp01((v - a) / (b - a));
        return x * x * (3 - 2 * x);
      }
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
        var helix = t * 0.35 + bp * Math.PI * 4;
        var open = smooth(0.16, 0.5, bp);
        var spread = 0.55 + open * 2.7;
        var c = Math.cos(helix), s = Math.sin(helix);
        A.position.set(c * spread, Math.sin(helix * 0.5) * 0.35, s * 1.1);
        B.position.set(-c * spread, -Math.sin(helix * 0.5) * 0.35, -s * 1.1);
        A.material.uniforms.uT.value = t;
        B.material.uniforms.uT.value = t + 1.7;
        fade = Math.min(1, fade + dt * 0.5);
        var env = smooth(-0.55, -0.15, bp) * (1 - smooth(0.3, 0.55, bp));
        var op = fade * 0.55 * env;
        A.material.uniforms.uOp.value = op;
        B.material.uniforms.uOp.value = op;
        A.rotation.y += ((mx * 0.12) - A.rotation.y) * 0.04;
        B.rotation.y += ((mx * -0.12) - B.rotation.y) * 0.04;
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
