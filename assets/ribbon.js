/* 3D silk ribbons — desktop WebGL enhancement.
   Silk-textured wave planes drift behind the hero title AND behind the big
   THAK ARAVIND nameform band (each canvas gets its own tiny scene, paused
   off-screen). Boots only if THREE loaded; loader gates desktop + pointer.
   Lenis + smoothness untouched (own rAF loops). */
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

    /* canvasId, areaId, plane w/h, mesh offset, peak opacity, phase offset */
    function boot(canvasId, areaId, o) {
      var canvas = document.getElementById(canvasId);
      var area = document.getElementById(areaId);
      if (!canvas || !area) return;

      var renderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
      } catch (e) { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
      camera.position.set(0, 0, 8);

      var uniforms = { uT: { value: o.phase || 0 }, uMap: { value: tex }, uOp: { value: 0 } };
      var mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(o.w, o.h, 72, 28),
        new THREE.ShaderMaterial({
          uniforms: uniforms, transparent: true,
          depthWrite: false, blending: THREE.AdditiveBlending,
          vertexShader: VSH, fragmentShader: FSH
        })
      );
      mesh.position.set(o.px || 0, o.py || 0, 0);
      mesh.rotation.z = o.rz || 0;
      mesh.rotation.x = -0.08;
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

      var visible = true, raf = 0, last = 0, t = o.phase || 0, fade = 0;
      function frame(now) {
        raf = 0;
        if (document.hidden || !visible) return;
        raf = requestAnimationFrame(frame);
        var dt = Math.min(0.05, (now - (last || now)) / 1000);
        last = now;
        t += dt;
        uniforms.uT.value = t;
        fade = Math.min(1, fade + dt * 0.5);
        uniforms.uOp.value = fade * o.op;
        mesh.rotation.y += ((mx * 0.18) - mesh.rotation.y) * 0.04;
        renderer.render(scene, camera);
      }
      function kick() { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }
      try {
        new IntersectionObserver(function (en) {
          visible = !!en[0].isIntersecting;
          if (visible) kick();
        }, { rootMargin: '100px' }).observe(area);
      } catch (e) {}
      document.addEventListener('visibilitychange', function () {
        if (!document.hidden && visible) kick();
      });
      canvas.style.display = 'block';
      kick();
    }

    /* hero: ribbon sits left behind FUTURE; band: wide, centered, subtler */
    boot('ribbon', 'top', { w: 10.5, h: 5.2, px: -1.1, py: 0.1, rz: 0.06, op: 0.85, phase: 0 });
    boot('ribbonBand', 'nameform', { w: 12.5, h: 4.2, px: 0, py: 0, rz: -0.04, op: 0.5, phase: 2.3 });
  } catch (e) { /* decorative — never block the page */ }
})();
