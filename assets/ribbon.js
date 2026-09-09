/* 3D silk ribbon behind FUTURE — desktop WebGL enhancement.
   A silk-textured plane with vertex waves drifts behind the hero title.
   Guards: boots only if THREE loaded, hero present, fine pointer, wide screen.
   Pauses off-screen / tab-hidden. Lenis + smoothness untouched (own rAF). */
(function () {
  try {
    var canvas = document.getElementById('ribbon');
    var hero = document.getElementById('top');
    if (!canvas || !hero || !window.THREE) return;

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch (e) { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.set(0, 0, 8);

    var tex = new THREE.TextureLoader().load('assets/silk.jpg?v=1');
    try { if (THREE.SRGBColorSpace && 'colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace; } catch (e) {}

    var uniforms = { uT: { value: 0 }, uMap: { value: tex }, uOp: { value: 0 } };
    var mat = new THREE.ShaderMaterial({
      uniforms: uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: [
        'uniform float uT;',
        'varying vec2 vUv;',
        'void main(){',
        '  vUv = uv;',
        '  vec3 p = position;',
        '  p.z += sin(uv.x * 6.2831 + uT * 0.7) * 0.34 + sin(uv.y * 5.0 - uT * 0.5 + uv.x * 3.0) * 0.26;',
        '  p.x += sin(uv.y * 3.0 + uT * 0.4) * 0.12;',
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);',
        '}'
      ].join('\n'),
      fragmentShader: [
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
      ].join('\n')
    });
    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(10.5, 5.2, 72, 36), mat);
    mesh.position.set(-1.1, 0.1, 0);
    mesh.rotation.z = 0.06;
    mesh.rotation.x = -0.08;
    scene.add(mesh);

    function size() {
      var r = hero.getBoundingClientRect();
      var w = Math.max(2, r.width), h = Math.max(2, r.height);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    size();
    addEventListener('resize', size, { passive: true });

    var mx = 0;
    addEventListener('mousemove', function (e) {
      try { mx = (e.clientX / innerWidth) * 2 - 1; } catch (err) {}
    }, { passive: true });

    var visible = true, raf = 0, last = 0, t = 0, fade = 0;
    function frame(now) {
      raf = 0;
      if (document.hidden || !visible) return;
      raf = requestAnimationFrame(frame);
      var dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      t += dt;
      uniforms.uT.value = t;
      fade = Math.min(1, fade + dt * 0.5);
      uniforms.uOp.value = fade * 0.85;
      mesh.rotation.y += ((mx * 0.18) - mesh.rotation.y) * 0.04;
      renderer.render(scene, camera);
    }
    function kick() { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }
    try {
      new IntersectionObserver(function (en) {
        visible = !!en[0].isIntersecting;
        if (visible) kick();
      }, { rootMargin: '100px' }).observe(hero);
    } catch (e) {}
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && visible) kick();
    });
    canvas.style.display = 'block';
    kick();
  } catch (e) { /* decorative — never block the page */ }
})();
