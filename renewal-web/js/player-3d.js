/* ONCOURT 3D 선수 체험 — plaster serve statue, six cards on a helix, cracks -> dots -> centre line into #brand-message.
   Three.js r128 (vendor/three-r128.min.js + GLTFLoader-r128.js, globals) so the shading matches the approved preview. */
(function () {
  if (!window.THREE || !THREE.GLTFLoader || !document.getElementById('player-3d')) return;
  var MODEL_URL = 'assets/player-3d/statue.glb';
  var CARDS = [
    { k: 'CONNECT',    d: '일정과 실력에 맞는 새로운 테니스 파트너를 만나보세요.' },
    { k: 'DISCOVER',   d: '내 주변에서 열리는 경기와 새로운 플레이 기회를 발견하세요.' },
    { k: 'PLAY',       d: '새로운 만남을 실제 코트 위의 플레이로 이어가세요.' },
    { k: 'BELONG',     d: '함께하는 경기가 쌓이며 더 큰 테니스 커뮤니티로 이어집니다.' },
    { k: 'CHALLENGE',  d: '일상적인 매칭을 넘어 새로운 경기와 대회에 도전하세요.' },
    { k: 'TOURNAMENT', d: '동네 모임 경기부터 클럽 토너먼트까지, 대회 참가와 운영을 한곳에서 이어가세요.' }
  ];
  var N = CARDS.length;
  // decor cards: image only, faded, they flow past without stopping (swap in real ONCOURT photos later)
  var DECOR = [{ m: 'net' }, { m: 'ball' }, { m: 'strings' }, { m: 'court' }, { m: 'shoe' }, { m: 'lines' }];

  /* ---- tuning knobs ------------------------------------------------- */
  // One rigid helix of 12 cards (info, decor, info, decor ...) wrapped 1.5 turns round the statue.
  // Path (scrolling down): in at the TOP-LEFT edge -> round the back as the upper loop ->
  // right side -> FRONT (centre) -> left side -> round the back as the lower loop -> out at the BOTTOM-RIGHT edge.
  // The whole loop fits on one screen; the statue stands in the middle of it.
  var R = 1.0;                         // helix radius
  var CARD_W = 0.50, CARD_H = 0.38;    // ~29 deg wide on the helix
  var SLOT = 45;                       // degrees between neighbouring cards -> a ~16 deg gap between cards
  var PATH = 540;                      // degrees from entry to exit (1.5 turns)
  var TH_IN = -90;                     // entry angle: left side (x = -R); front is -360, exit is -630 (right side)
  var Y_IN = 1.60, Y_OUT = -0.92;      // front card lands at the vertical centre of the screen
  var TILT = Math.atan2((Y_IN - Y_OUT) / (PATH / 360), 2 * Math.PI * R);   // cards lean with the pitch
  var YAW0 = 0.52, TURNS = 2;          // statue: starts turned ~30deg, 2 full turns at one steady rate, ends facing front
  var CAM_ELEV = 7 * Math.PI / 180, CAM_FOV = 28;
  var VIEW_H = 1.62;                   // statue ~70% of the screen height
  var TARGET = new THREE.Vector3(0, 0.22, 0);
  var NC = 12, FRONT_AT = 270;         // path position (deg) of the front centre

  // scroll -> ring travel (degrees). Info cards stop at the front to be read; decor cards just pass.
  // weights are shares of the pinned scroll length.
  var Q0 = -40;                                    // ring starts just off screen: statue alone
  var Q_END = PATH + (NC - 1) * SLOT + 10;         // last card fully out
  var KEYS = (function () {
    var k = [{ w: 0, q: Q0 }];
    k.push({ w: 0.55, q: Q0, hold: true });        // statue-only beat
    k.push({ w: 1.6, q: FRONT_AT, ease: 'out', arrive: true });  // ring winds in, CONNECT arrives at the front -> cracks start
    for (var i = 0; i < 6; i++) {
      k.push({ w: 0.55, q: FRONT_AT + i * 2 * SLOT, hold: true });          // read
      if (i < 5) k.push({ w: 1.0, q: FRONT_AT + (i + 1) * 2 * SLOT, ease: 'inout' }); // a decor card flows past
    }
    k.push({ w: 2.0, q: Q_END, ease: 'in', gone: true });      // ring winds out at the bottom right -> statue fully cracked
    k.push({ w: 1.1, q: Q_END, hold: true, play: true });     // hold: cursor / touch plays with the points
    k.push({ w: 1.7, q: Q_END, hold: true, flow: true });     // the points run down into the centre line of the next section
    k.push({ w: 0.35, q: Q_END, hold: true, end: true });
    var tot = 0; k.forEach(function (e) { tot += e.w; });
    var acc = 0; k.forEach(function (e) { acc += e.w; e.t = acc / tot; });
    return k;
  })();
  function keyT(f) { for (var i = 0; i < KEYS.length; i++) if (KEYS[i][f]) return KEYS[i].t; return 1; }
  var CRACK_T0 = keyT('arrive');   // first card reaches the front
  var CRACK_T1 = keyT('gone');     // last card has left: fully cracked
  var SPIN_T = CRACK_T1;           // the statue turns until then and ends facing front
  function phase(f) { for (var i = 1; i < KEYS.length; i++) if (KEYS[i][f]) return [KEYS[i - 1].t, KEYS[i].t]; return [1, 1]; }
  var PH = { play: phase('play'), flow: phase('flow') };
  // while the cards go round: cracks spread (first half), then the pieces shrink into dots (second half)
  var CRK = [CRACK_T0, CRACK_T0 + 0.55 * (CRACK_T1 - CRACK_T0)], SHT = [CRACK_T0 + 0.40 * (CRACK_T1 - CRACK_T0), CRACK_T1];
  var SHAT_MAX = 0.98;   // latest piece time (0.74) + its shrink window (0.22)
  function prog(P, ph) { return Math.min(1, Math.max(0, (P - ph[0]) / (ph[1] - ph[0]))); }
  function ringAt(P) {
    for (var i = 1; i < KEYS.length; i++) {
      var a = KEYS[i - 1], b = KEYS[i];
      if (P <= b.t) {
        if (b.hold) return b.q;
        var x = (P - a.t) / (b.t - a.t);
        if (b.ease === 'out') x = 1 - Math.pow(1 - x, 2.2);
        else if (b.ease === 'in') x = Math.pow(x, 1.8);
        else x = x * x * (3 - 2 * x);
        return a.q + (b.q - a.q) * x;
      }
    }
    return KEYS[KEYS.length - 1].q;
  }

  var canvas = document.getElementById('p3d-gl');
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  document.getElementById('player-3d').classList.add('is-live');   // WebGL is up: switch from the plain list to the stage
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.88;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(CAM_FOV, 1, 0.1, 30);

  scene.add(new THREE.HemisphereLight(0xdfe9e4, 0x0b1612, 0.20));
  var key = new THREE.DirectionalLight(0xfff3e2, 1.15); key.position.set(-2.6, 2.6, 2.0); scene.add(key);
  var rim = new THREE.DirectionalLight(0xc8f04b, 1.3); rim.position.set(2.6, 1.6, -2.6); scene.add(rim);
  var fill = new THREE.DirectionalLight(0xbcd6ff, 0.16); fill.position.set(2.4, 0.2, 2.2); scene.add(fill);

  /* ---- statue (Higgsfield / Meshy image-to-3D model, cleaned for the web) ---- */
  // statue.glb: one mesh incl. racket, plinth at y = 0, raised hand at y = 1.90; the body runs down to the thighs.
  var statue = new THREE.Group();
  var S_SCALE = 1.17, HAND_TOP = 0.898, MODEL_H = 1.900;    // big hero figure; ball stays inside the top edge
  var DROP = 0.14, WAIST = 0.72;    // the screen shows raised hand -> waist; shorts and plinth stay below
  statue.scale.setScalar(S_SCALE); statue.position.y = HAND_TOP - DROP - S_SCALE * MODEL_H;
  scene.add(statue);
  // one Voronoi cell = one piece. Its break time mixes a random value with height (top pieces go first).
  // one Voronoi cell = one piece. Sine-free hash so the page script (piece split) and the shaders (crack lines) agree.
  var CELL_GLSL =
    'vec3 hc3(vec3 p3){ p3 = fract(p3 * vec3(0.1031, 0.1030, 0.0973)); p3 += dot(p3, p3.yxz + 33.33); return fract((p3.xxy + p3.yxx) * p3.zyx); }\n';
  var bodyMat = new THREE.MeshStandardMaterial({ color: 0xe2dcd2, roughness: 0.52, metalness: 0.0, side: THREE.DoubleSide });
  // cracks: 3D Voronoi cell edges in the statue's own space, spreading from the top of the model downwards
  var crackU = { uCrack: { value: 0 }, uShat: { value: 0 }, uInv: { value: new THREE.Matrix4() } };
  bodyMat.onBeforeCompile = function (sh) {
    sh.uniforms.uCrack = crackU.uCrack; sh.uniforms.uShat = crackU.uShat; sh.uniforms.uInv = crackU.uInv;
    sh.vertexShader = 'varying vec3 vLoc;\nvarying float vShat;\nuniform mat4 uInv;\nuniform float uShat;\nattribute vec3 aCtr;\nattribute vec3 aDrift;\nattribute float aCT;\n' +
      sh.vertexShader.replace('#include <begin_vertex>',
      'vec3 transformed = vec3(position);\n' +
      ' vLoc = (uInv * modelMatrix * vec4(position, 1.0)).xyz;\n' +
      ' float cs = smoothstep(aCT, aCT + 0.22, uShat); vShat = cs;\n' +
      ' transformed = aCtr + (transformed - aCtr) * (1.0 - smoothstep(0.12, 0.8, cs)) + aDrift * smoothstep(0.0, 0.45, cs);   // the piece loosens, then shrinks to a point');
    sh.fragmentShader = 'varying vec3 vLoc;\nvarying float vShat;\nuniform float uCrack;\n' + CELL_GLSL +
      'vec3 h33(vec3 p){ return hc3(p); }\n' +
      'vec2 vor(vec3 x){ vec3 n=floor(x), f=fract(x); float d1=8.0, d2=8.0;\n' +
      ' for(int k=-1;k<=1;k++) for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){ vec3 g=vec3(float(i),float(j),float(k)); vec3 r=g+h33(n+g)-f; float d=dot(r,r);\n' +
      '  if(d<d1){ d2=d1; d1=d; } else if(d<d2) d2=d; }\n return vec2(sqrt(d1), sqrt(d2)); }\n' +
      sh.fragmentShader.replace('#include <dithering_fragment>',
      '#include <dithering_fragment>\n' +
      ' if (vShat > 0.97 || h33(floor(vLoc * 95.0)).x < smoothstep(0.2, 0.85, vShat)) discard;   // a loosened piece crumbles into grains\n' +
      ' if (uCrack > 0.0) {\n' +
      '  vec3 q = vLoc * 7.0 + vec3(0.0, vLoc.y * 2.0, 0.0);\n' +
      '  vec2 v = vor(q);\n' +
      '  float front = 2.0 - uCrack * 1.5;                                // crack front, top -> bottom (model ~1.9 tall)\n' +
      '  float age = clamp((vLoc.y - front) * 2.2, 0.0, 1.0);\n' +
      '  float w = 0.013 + 0.032 * age;                                  // lines open up as they age\n' +
      '  float e = (v.y - v.x);\n' +
      '  float line = (1.0 - smoothstep(w * 0.55, w, e)) * step(0.0, vLoc.y - front);\n' +
      '  float c = line;\n' +
      '  gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.025, 0.03, 0.03), c);\n' +
      '  float glow = smoothstep(0.0, 0.25, vShat);                       // light leaks through the cracks as a piece loosens\n' +
      '  gl_FragColor.rgb += vec3(0.78, 0.94, 0.30) * c * glow * 2.0 + vec3(0.92, 1.0, 0.85) * smoothstep(0.2, 0.7, vShat) * 0.25;\n' +
      ' }');
  };
  function loadStatue(done) {
    fetch(MODEL_URL).then(function (r) { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); }).then(function (buf) {
      new THREE.GLTFLoader().parse(buf, '', onModel, onErr);
    }).catch(onErr);
    function onErr(e) { console.error('statue model', e); done(); }
    function onModel(gltf) {
      gltf.scene.traverse(function (o) {
        if (!o.isMesh) return;
        var src = o.material;
        if (src && src.map) { bodyMat.map = src.map; bodyMat.map.encoding = THREE.sRGBEncoding; bodyMat.needsUpdate = true; }  // baked cavity shading
        o.material = bodyMat;
      });
      statue.add(gltf.scene);
      // hand: the highest vertices of the model; the ball floats just above their centre
      gltf.scene.updateMatrixWorld(true);
      var pts = [], top = -1e9, v = new THREE.Vector3();
      gltf.scene.traverse(function (o) {
        if (!o.isMesh) return; var a = o.geometry.attributes.position;
        var nk = !a.normalized ? 1 : a.array instanceof Int16Array ? 32767 : a.array instanceof Int8Array ? 127 : a.array instanceof Uint16Array ? 65535 : 255;  // r128 does not denormalise
        for (var i = 0; i < a.count; i++) { v.set(a.getX(i) / nk, a.getY(i) / nk, a.getZ(i) / nk).applyMatrix4(o.matrixWorld); pts.push(v.x, v.y, v.z); if (v.y > top) top = v.y; }
      });
      var sx = 0, sz = 0, n = 0;
      for (var j = 0; j < pts.length; j += 3) if (pts[j + 1] > top - 0.10 / S_SCALE) { sx += pts[j]; sz += pts[j + 2]; n++; }
      HAND = { x: sx / n, y: top, z: sz / n };
      ball.position.set(HAND.x, HAND.y + BALL_R + 0.075 / S_SCALE, HAND.z);
      ball.userData.base = ball.position.y; ball.userData.bx = ball.position.x; ball.userData.bz = ball.position.z; ball.visible = true;
      buildDust(gltf.scene);
      buildBallDust();
      done();
    }
  }

  /* ---- tennis ball floating above the raised hand (the serve toss) ---------- */
  var HAND = null;
  var ballU = { uB: { value: 0 }, uBF: { value: 0 } }, ballDust = null;
  var ball = new THREE.Group(); statue.add(ball);           // child of the statue: follows the hand as it turns
  var BALL_R = 0.055 / S_SCALE;                             // ~5.5 cm-ish in world units
  (function () {
    var c = document.createElement('canvas'); c.width = 512; c.height = 256; var g = c.getContext('2d');
    g.fillStyle = '#c9f03c'; g.fillRect(0, 0, 512, 256);
    for (var i = 0; i < 5200; i++) {                         // felt fuzz
      g.fillStyle = Math.random() < 0.5 ? 'rgba(235,255,120,0.30)' : 'rgba(110,150,20,0.28)';
      g.fillRect(Math.random() * 512, Math.random() * 256, 1.6, 1.6);
    }
    g.strokeStyle = '#f4f7ea'; g.lineWidth = 7; g.lineCap = 'round';   // the two seam curves
    [[128, 1], [384, -1]].forEach(function (a) {
      g.beginPath();
      for (var y = 0; y <= 256; y += 8) { var x = a[0] + a[1] * Math.sin((y / 256) * Math.PI * 2) * 52; y ? g.lineTo(x, y) : g.moveTo(x, y); }
      g.stroke();
    });
    var tex = new THREE.CanvasTexture(c); tex.encoding = THREE.sRGBEncoding; tex.anisotropy = 4;
    var bm = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.95, metalness: 0, emissive: 0x3a5000, emissiveIntensity: 0.35 });
    bm.onBeforeCompile = function (sh) {           // the ball breaks up with the hand: grains drop out, the rest glows
      sh.uniforms.uB = ballU.uB;
      sh.vertexShader = 'varying vec3 vBP;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n vBP = position;');
      sh.fragmentShader = 'varying vec3 vBP;\nuniform float uB;\n' + CELL_GLSL + sh.fragmentShader.replace('#include <dithering_fragment>',
        '#include <dithering_fragment>\n' +
        ' float gr = hc3(floor(vBP * ' + (260 * S_SCALE).toFixed(1) + ') + 3.7).x;\n' +
        ' if (gr < smoothstep(0.05, 0.85, uB)) discard;\n' +
        ' gl_FragColor.rgb += vec3(0.85, 1.0, 0.45) * smoothstep(0.0, 0.5, uB) * (0.25 + 0.6 * smoothstep(0.12, 0.0, gr - smoothstep(0.05, 0.85, uB)));');
    };
    var mesh = new THREE.Mesh(new THREE.SphereGeometry(BALL_R, 40, 28), bm);
    ball.add(mesh); ball.userData.mesh = mesh;
  })();
  ball.visible = false;

  /* ---- the statue made of light: points sampled on its surface ------------- */
  // shatter: each point appears when its piece breaks away and flies out; gather: they swirl back into the pose;
  // play: the cursor pushes and swirls them; flow: they run into the centre line that the next section starts from.
  var dustU = {
    uShat: crackU.uShat, uFlow: { value: 0 }, uTime: { value: 0 }, uFade: { value: 1 },
    uSize: { value: 1 }, uMouse: { value: new THREE.Vector2(9, 9) }, uMouseK: { value: 0 }, uAspect: { value: 1 },
    uLineTop: { value: 1.5 }, uLineBot: { value: -1.2 }
  };
  var dust = null;
  // page-side copy of the shader's cell function (same hash): which piece a point belongs to
  function fr(x) { return x - Math.floor(x); }
  function hc3(x, y, z) {
    var a = fr(x * 0.1031), b = fr(y * 0.1030), c = fr(z * 0.0973);
    var d = a * (b + 33.33) + b * (a + 33.33) + c * (c + 33.33); a += d; b += d; c += d;
    return [fr((a + b) * c), fr((a + a) * b), fr((b + a) * a)];
  }
  function cellKey(x, y, z) {                     // L * 7 + (0, L.y * 2, 0), nearest jittered lattice point
    var X = x * 7, Y = y * 9, Z = z * 7, nx = Math.floor(X), ny = Math.floor(Y), nz = Math.floor(Z), fx = X - nx, fy = Y - ny, fz = Z - nz;
    var best = 1e9, k = '';
    for (var dz = -1; dz <= 1; dz++) for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) {
      var h = hc3(nx + dx, ny + dy, nz + dz), rx = dx + h[0] - fx, ry = dy + h[1] - fy, rz = dz + h[2] - fz, dd = rx * rx + ry * ry + rz * rz;
      if (dd < best) { best = dd; k = (nx + dx) + ',' + (ny + dy) + ',' + (nz + dz); }
    }
    return k;
  }
  function pieceTime(key, cy) {                    // random per piece, top pieces earlier
    var q = key.split(','), h = hc3(+q[0] + 17.0, +q[1] + 5.0, +q[2] + 11.0)[0];
    var top = Math.min(1, Math.max(0, (cy - 0.6) / 1.3));
    return 0.02 + 0.52 * h + 0.2 * (1 - top);
  }

  // the ball as dots: lime felt with the two white seam lines, born as the ball crumbles
  function buildBallDust() {
    var N = /lite/.test(location.search) ? 380 : window.innerWidth < 760 ? 800 : 1300;
    var pos = new Float32Array(N * 3), rnd = new Float32Array(N * 4), seam = new Float32Array(N);
    for (var i = 0; i < N; i++) {
      var u, v, onSeam = Math.random() < 0.2;
      if (onSeam) {                                // same curves as the ball texture
        v = Math.random(); var sg = Math.random() < 0.5 ? 1 : -1;
        u = (sg > 0 ? 0.25 : 0.75) + sg * 0.1016 * Math.sin(v * Math.PI * 2) + (Math.random() - 0.5) * 0.012;
      } else { u = Math.random(); v = Math.acos(1 - 2 * Math.random()) / Math.PI; }
      var ph = u * Math.PI * 2, th = v * Math.PI, r = BALL_R * (0.97 + Math.random() * 0.06);
      pos[i * 3] = -Math.cos(ph) * Math.sin(th) * r; pos[i * 3 + 1] = Math.cos(th) * r; pos[i * 3 + 2] = Math.sin(ph) * Math.sin(th) * r;
      rnd[i * 4] = Math.random(); rnd[i * 4 + 1] = Math.random(); rnd[i * 4 + 2] = Math.random(); rnd[i * 4 + 3] = Math.random();
      seam[i] = onSeam ? 1 : 0;
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aRnd', new THREE.BufferAttribute(rnd, 4));
    g.setAttribute('aSeam', new THREE.BufferAttribute(seam, 1));
    var U = { uB: ballU.uB, uTime: dustU.uTime, uSize: dustU.uSize, uFade: dustU.uFade, uMouse: dustU.uMouse, uMouseK: dustU.uMouseK, uAspect: dustU.uAspect, uR: { value: BALL_R }, uBF: ballU.uBF };
    var m = new THREE.ShaderMaterial({
      uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: [
        'uniform float uB, uTime, uSize, uFade, uMouseK, uAspect, uR, uBF; uniform vec2 uMouse;',
        'attribute vec4 aRnd; attribute float aSeam;',
        'varying float vA; varying vec3 vC;',
        'void main(){',
        ' float cs = smoothstep(aRnd.y * 0.55, aRnd.y * 0.55 + 0.45, uB);',
        ' float app = smoothstep(0.0, 0.5, cs), spread = smoothstep(0.2, 1.0, cs);',
        ' vec3 n = normalize(position);',
        ' vec3 q = position * mix(0.55, 1.0, spread) + n * uR * 0.35 * (1.0 - spread) * aRnd.x;',   // grains burst a little, then settle on the sphere
        ' float tt = uTime * 0.45; vec3 fp = position / uR * 1.3;',
        ' q += uR * 0.07 * spread * vec3(sin(fp.y * 1.7 + tt), sin(fp.z * 1.9 - tt * 0.8), sin(fp.x * 2.3 + tt * 1.1));',
        ' vec4 cp = projectionMatrix * modelViewMatrix * vec4(q, 1.0);',
        ' vec2 d = cp.xy / cp.w - uMouse; d.x *= uAspect;',
        ' float k = uMouseK * exp(-dot(d, d) / 0.0045);',
        ' float an = aRnd.w * 6.2832 + 0.6 * sin(uTime * 1.9 + aRnd.z * 40.0);',
        ' vec2 push = (vec2(cos(an), sin(an)) * (0.3 + 0.7 * aRnd.x) * 0.06 + normalize(d + vec2(1e-4)) * (0.035 + 0.035 * aRnd.y)) * k;',
        ' push.x /= uAspect; cp.xy += push * cp.w;',
        ' gl_Position = cp;',
        ' float rim = pow(1.0 - abs(normalize(mat3(modelViewMatrix) * n).z), 1.5);',
        ' float tw = 1.0 + 0.9 * step(0.85, aRnd.z) * pow(0.5 + 0.5 * sin(uTime * (1.2 + aRnd.w) + aRnd.y * 40.0), 6.0);',
        ' gl_PointSize = uSize * (0.6 + 0.8 * aRnd.w) / cp.w;',
        ' vA = app * (0.36 + 0.3 * aRnd.z) * (0.75 + 0.5 * rim) * tw * uFade * (1.0 - smoothstep(0.15, 0.7, uBF));',   // melts into the line as it drops
        ' vC = mix(vec3(0.80, 0.95, 0.28), vec3(0.95, 0.98, 0.90), aSeam);',
        '}'].join('\n'),
      fragmentShader: [
        'varying float vA; varying vec3 vC;',
        'void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.05, d); if (a < 0.01) discard; gl_FragColor = vec4(vC * a * vA, a * vA); }'
      ].join('\n')
    });
    ballDust = new THREE.Points(g, m); ballDust.frustumCulled = false; ballDust.visible = false; ballDust.renderOrder = 6;
    ball.userData.mesh.add(ballDust);              // spins with the ball
  }

  // un-share vertices so every piece can move on its own. Done by hand: the model's quantized,
  // interleaved attributes are not handled by r128's toNonIndexed(). Output is plain float32.
  function deindex(src) {
    var ix = src.index, n = ix ? ix.count : src.attributes.position.count, out = new THREE.BufferGeometry();
    Object.keys(src.attributes).forEach(function (name) {
      var at = src.attributes[name], sz = at.itemSize, arr = new Float32Array(n * sz), raw = at.array || (at.data && at.data.array);
      var nk = !at.normalized ? 1 : raw instanceof Int16Array ? 32767 : raw instanceof Int8Array ? 127 : raw instanceof Uint16Array ? 65535 : raw instanceof Uint8Array ? 255 : 1;
      for (var i = 0; i < n; i++) {
        var j = ix ? ix.getX(i) : i;
        arr[i * sz] = at.getX(j) / nk; if (sz > 1) arr[i * sz + 1] = at.getY(j) / nk; if (sz > 2) arr[i * sz + 2] = at.getZ(j) / nk; if (sz > 3) arr[i * sz + 3] = at.getW(j) / nk;
      }
      out.setAttribute(name, new THREE.BufferAttribute(arr, sz));
    });
    return out;
  }

  function buildDust(root) {
    var N = /lite/.test(location.search) ? 9000 : window.innerWidth < 760 ? 26000 : 46000;   // ?lite: headless previews
    statue.updateMatrixWorld(true);
    var inv = new THREE.Matrix4().copy(statue.matrixWorld).invert();
    var tris = [], areas = [], total = 0, pieces = {};
    var a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), t1 = new THREE.Vector3(), t2 = new THREE.Vector3();
    var meshes = []; root.traverse(function (o) { if (o.isMesh) meshes.push(o); });
    meshes.forEach(function (o) {
      // 1) split the mesh into pieces: every triangle joins the cell of its centre (statue space)
      var geo = deindex(o.geometry);
      var M = new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld), Mi = new THREE.Matrix4().copy(M).invert(), pa = geo.attributes.position;
      var nk = !pa.normalized ? 1 : pa.array instanceof Int16Array ? 32767 : pa.array instanceof Int8Array ? 127 : pa.array instanceof Uint16Array ? 65535 : 255;
      var nv = pa.count, OBJ = new Float32Array(nv * 3), LOC = new Float32Array(nv * 3);
      for (var i = 0; i < nv; i++) {
        a.set(pa.getX(i) / nk, pa.getY(i) / nk, pa.getZ(i) / nk); OBJ[i * 3] = a.x; OBJ[i * 3 + 1] = a.y; OBJ[i * 3 + 2] = a.z;
        a.applyMatrix4(M); LOC[i * 3] = a.x; LOC[i * 3 + 1] = a.y; LOC[i * 3 + 2] = a.z;
      }
      var keys = new Array(nv / 3), local = {};
      for (var t = 0; t < nv / 3; t++) {
        var o9 = t * 9, cx = (LOC[o9] + LOC[o9 + 3] + LOC[o9 + 6]) / 3, cy = (LOC[o9 + 1] + LOC[o9 + 4] + LOC[o9 + 7]) / 3, cz = (LOC[o9 + 2] + LOC[o9 + 5] + LOC[o9 + 8]) / 3;
        var k = cellKey(cx, cy, cz); keys[t] = k;
        var e = local[k] || (local[k] = { ox: 0, oy: 0, oz: 0, lx: 0, ly: 0, lz: 0, n: 0 });
        e.ox += (OBJ[o9] + OBJ[o9 + 3] + OBJ[o9 + 6]) / 3; e.oy += (OBJ[o9 + 1] + OBJ[o9 + 4] + OBJ[o9 + 7]) / 3; e.oz += (OBJ[o9 + 2] + OBJ[o9 + 5] + OBJ[o9 + 8]) / 3;
        e.lx += cx; e.ly += cy; e.lz += cz; e.n++;
      }
      var ctr = new Float32Array(nv * 3), drift = new Float32Array(nv * 3), ct = new Float32Array(nv), dv = new THREE.Vector3(), cv = new THREE.Vector3();
      Object.keys(local).forEach(function (k) {
        var e = local[k]; e.ox /= e.n; e.oy /= e.n; e.oz /= e.n; e.lx /= e.n; e.ly /= e.n; e.lz /= e.n;
        e.t = pieceTime(k, e.ly);
        var r = Math.hypot(e.lx, e.lz) || 1;      // loosen outward a little (statue space), expressed in mesh space
        cv.set(e.lx, e.ly, e.lz).applyMatrix4(Mi); dv.set(e.lx + e.lx / r * 0.035, e.ly + 0.01, e.lz + e.lz / r * 0.035).applyMatrix4(Mi);
        e.dx = dv.x - cv.x; e.dy = dv.y - cv.y; e.dz = dv.z - cv.z;
        pieces[k] = e;
      });
      for (var t3 = 0; t3 < nv / 3; t3++) {
        var e2 = local[keys[t3]];
        for (var v = 0; v < 3; v++) {
          var j = t3 * 3 + v;
          ctr[j * 3] = e2.ox; ctr[j * 3 + 1] = e2.oy; ctr[j * 3 + 2] = e2.oz;
          drift[j * 3] = e2.dx; drift[j * 3 + 1] = e2.dy; drift[j * 3 + 2] = e2.dz; ct[j] = e2.t;
        }
      }
      geo.setAttribute('aCtr', new THREE.BufferAttribute(ctr, 3));
      geo.setAttribute('aDrift', new THREE.BufferAttribute(drift, 3));
      geo.setAttribute('aCT', new THREE.BufferAttribute(ct, 1));
      o.geometry = geo;
      // 2) triangles for sampling the dots (visible part only)
      for (var t4 = 0; t4 < nv / 3; t4++) {
        var q9 = t4 * 9;
        a.fromArray(LOC, q9); b.fromArray(LOC, q9 + 3); c.fromArray(LOC, q9 + 6);
        if (a.y < 0.62 && b.y < 0.62 && c.y < 0.62) continue;            // below the waist never shows
        var ar = t1.subVectors(b, a).cross(t2.subVectors(c, a)).length() * 0.5;
        if (ar <= 0) continue;
        total += ar; areas.push(total); tris.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
      }
    });
    var nrm = new Float32Array(N * 3), pos = new Float32Array(N * 3), rnd = new Float32Array(N * 4), dir = new Float32Array(N * 3), pc = new Float32Array(N * 3), pt = new Float32Array(N);
    for (var kk = 0; kk < N; kk++) {
      var rr2 = Math.random() * total, lo = 0, hi = areas.length - 1;
      while (lo < hi) { var mid = (lo + hi) >> 1; if (areas[mid] < rr2) lo = mid + 1; else hi = mid; }
      var o9b = lo * 9;
      a.fromArray(tris, o9b); b.fromArray(tris, o9b + 3); c.fromArray(tris, o9b + 6);
      t1.subVectors(b, a).cross(t2.subVectors(c, a)).normalize(); nrm[kk * 3] = t1.x; nrm[kk * 3 + 1] = t1.y; nrm[kk * 3 + 2] = t1.z;
      var u = Math.random(), w = Math.random(); if (u + w > 1) { u = 1 - u; w = 1 - w; }
      for (var q = 0; q < 3; q++) pos[kk * 3 + q] = tris[o9b + q] + (tris[o9b + 3 + q] - tris[o9b + q]) * u + (tris[o9b + 6 + q] - tris[o9b + q]) * w;
      var px = pos[kk * 3], py = pos[kk * 3 + 1], pz = pos[kk * 3 + 2], key = cellKey(px, py, pz), pe = pieces[key];
      if (pe) { pc[kk * 3] = pe.lx; pc[kk * 3 + 1] = pe.ly; pc[kk * 3 + 2] = pe.lz; pt[kk] = pe.t; }
      else { pc[kk * 3] = px; pc[kk * 3 + 1] = py; pc[kk * 3 + 2] = pz; pt[kk] = pieceTime(key, py); }
      rnd[kk * 4] = Math.random(); rnd[kk * 4 + 1] = Math.random(); rnd[kk * 4 + 2] = Math.random(); rnd[kk * 4 + 3] = Math.random();
      var th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      dir[kk * 3] = Math.sin(ph) * Math.cos(th); dir[kk * 3 + 1] = Math.cos(ph); dir[kk * 3 + 2] = Math.sin(ph) * Math.sin(th);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aRnd', new THREE.BufferAttribute(rnd, 4));
    g.setAttribute('aDir', new THREE.BufferAttribute(dir, 3));
    g.setAttribute('aNrm', new THREE.BufferAttribute(nrm, 3));
    g.setAttribute('aPc', new THREE.BufferAttribute(pc, 3));
    g.setAttribute('aCT', new THREE.BufferAttribute(pt, 1));
    var m = new THREE.ShaderMaterial({
      uniforms: dustU, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: [
        'uniform float uShat, uFlow, uTime, uSize, uMouseK, uAspect, uLineTop, uLineBot, uFade;',
        'uniform vec2 uMouse;',
        'attribute vec4 aRnd; attribute vec3 aDir; attribute vec3 aPc; attribute float aCT; attribute vec3 aNrm;',
        'varying float vA; varying vec3 vC; varying float vH;',
        'void main(){',
        ' vec3 p = position;',
        ' float cs = smoothstep(aCT, aCT + 0.22, uShat);                       // same clock as the piece it belongs to',
        ' float app = smoothstep(0.35, 0.75, cs);                               // appears as the piece shrinks...',
        ' float spread = smoothstep(0.5, 1.0, cs);                              // ...and settles where the surface was',
        ' vec3 q = mix(aPc, p, spread);',
        // calm, coherent motion: neighbouring dots drift together like a slow current (no per-dot jitter)
        ' vec3 fp = p * 2.6; float tt = uTime * 0.45;',
        ' q += 0.007 * spread * vec3(sin(fp.y * 1.7 + tt + sin(fp.z * 2.1 + tt * 0.7)), sin(fp.z * 1.9 - tt * 0.8 + sin(fp.x * 1.6)), sin(fp.x * 2.3 + tt * 1.1 + sin(fp.y * 1.3)));',
        // a few dots lift off the surface, rise and fade, then start again: soft, airy outline
        ' float wisp = step(0.9, aRnd.y) * spread; float life = fract(uTime * (0.05 + 0.05 * aRnd.x) + aRnd.z * 7.0);',
        ' q += wisp * (aNrm * 0.05 + vec3(0.0, 0.11, 0.0)) * life;',
        ' vec4 w = modelMatrix * vec4(q, 1.0);',
        // flow into the centre line: slide to x = 0, then join a downward stream along it
        ' float hn = clamp((p.y - 0.6) / 1.3, 0.0, 1.0);',
        ' float fd = clamp((uFlow - (1.0 - hn) * 0.30 - aRnd.y * 0.18) / 0.52, 0.0, 1.0);',
        ' float lineY = uLineTop - fract(aRnd.y + aRnd.x * 0.37 + uTime * (0.05 + 0.07 * aRnd.z)) * (uLineTop - uLineBot);',
        ' float e1 = smoothstep(0.0, 0.55, fd), e2 = smoothstep(0.25, 1.0, fd);',
        ' w.x = mix(w.x, (aRnd.x - 0.5) * 0.006, e1); w.z = mix(w.z, (aRnd.w - 0.5) * 0.006, e1); w.y = mix(w.y, lineY, e2);',
        ' vec4 cp = projectionMatrix * viewMatrix * w;',
        // cursor: dots close to it scatter a little in their own random directions (small radius), then drift back
        ' vec2 nd = cp.xy / cp.w; vec2 d = nd - uMouse; d.x *= uAspect;',
        ' float k = uMouseK * exp(-dot(d, d) / 0.0045) * (1.0 - e1);',
        ' float an = aRnd.w * 6.2832 + 0.6 * sin(uTime * 1.9 + aRnd.z * 40.0);',
        ' vec2 rd = vec2(cos(an), sin(an)) * (0.3 + 0.7 * aRnd.x);',
        ' vec2 push = (rd * 0.06 + normalize(d + vec2(1e-4)) * (0.035 + 0.035 * aRnd.y)) * k;',
        ' push.x /= uAspect; cp.xy += push * cp.w;',
        ' gl_Position = cp;',
        // rim light: dots on the turning edges glow brighter, faces toward us sit a bit back -> reads as a lit volume
        ' vec3 nw = normalize(mat3(modelMatrix) * aNrm);',
        ' float rim = pow(1.0 - abs(nw.z), 1.5);',
        ' float lit = mix(1.0, 0.8 + 0.55 * rim, spread * (1.0 - e1));',
        ' float haze = step(aRnd.z, 0.05) * (1.0 - e1);                     // a few big faint dots = soft glow around the figure',
        ' float tw = 1.0 + 0.9 * step(0.88, aRnd.x) * pow(0.5 + 0.5 * sin(uTime * (1.2 + aRnd.w) + aRnd.y * 40.0), 6.0);   // slow sparkle',
        ' vH = haze;',
        ' gl_PointSize = uSize * (0.55 + 0.9 * aRnd.w) * (1.0 + 4.5 * haze) * (1.0 + 0.35 * k) * (1.0 - 0.45 * e2) / cp.w;',
        ' vA = app * (0.38 + 0.4 * aRnd.z) * uFade * (1.0 - 0.9 * e2) * lit * tw * mix(1.0, 0.09, haze) * (1.0 - wisp * smoothstep(0.35, 1.0, life));',
        ' vC = mix(vec3(0.86, 0.93, 0.90), vec3(0.78, 0.94, 0.30), min(1.0, step(0.86, aRnd.x) + 0.35 * k));',
        '}'].join('\n'),
      fragmentShader: [
        'varying float vA; varying vec3 vC; varying float vH;',
        'void main(){ float d = length(gl_PointCoord - 0.5); float a = mix(smoothstep(0.5, 0.05, d), pow(max(0.0, 1.0 - 2.0 * d), 2.0), vH); if (a < 0.01) discard; gl_FragColor = vec4(vC * a * vA, a * vA); }'
      ].join('\n')
    });
    dust = new THREE.Points(g, m); dust.frustumCulled = false; dust.visible = false; dust.renderOrder = 5;
    statue.add(dust);
  }

  // cursor / finger: smoothed position and a strength that eases off when it stops or leaves
  var mouse = { x: 9, y: 9, tx: 9, ty: 9, k: 0, tk: 0, t: 0 };
  function onPoint(cx, cy) {
    var r = canvas.getBoundingClientRect();
    if (cx < r.left || cx > r.right || cy < r.top || cy > r.bottom) { mouse.tk = 0; return; }
    mouse.tx = (cx - r.left) / r.width * 2 - 1; mouse.ty = -((cy - r.top) / r.height * 2 - 1);
    if (mouse.k < 0.02) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
    mouse.tk = 1; mouse.t = performance.now();
  }
  window.addEventListener('pointermove', function (e) { onPoint(e.clientX, e.clientY); }, { passive: true });
  window.addEventListener('pointerdown', function (e) { onPoint(e.clientX, e.clientY); }, { passive: true });
  window.addEventListener('touchmove', function (e) { var t = e.touches[0]; if (t) onPoint(t.clientX, t.clientY); }, { passive: true });
  document.addEventListener('pointerleave', function () { mouse.tk = 0; });

  /* ---- cards ---------------------------------------------------------- */
  var cardGeo = new THREE.CylinderGeometry(R, R, CARD_H, 44, 1, true, -CARD_W / R / 2, CARD_W / R);
  var cards = [];
  var belt = new THREE.Group(); scene.add(belt);   // the helix; narrowed on phones

  function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function wrap(ctx, text, maxW) { var lines = [], cur = ''; for (var i = 0; i < text.length; i++) { var t = cur + text[i]; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur.trim()); cur = text[i]; } else cur = t; } if (cur) lines.push(cur.trim()); return lines; }

  function makeTexture(i) {
    var W = 1280, H = 1010, c = document.createElement('canvas'); c.width = W; c.height = H;
    var x = c.getContext('2d');
    rr(x, 0, 0, W, H, 40); x.fillStyle = '#0E1D19'; x.fill();
    x.save(); rr(x, 0, 0, W, H, 40); x.clip();
    // image placeholder (swap for real photography later)
    var px = 40, py = 40, pw = W - 80, ph = 600, hue = [150, 165, 95, 172, 125, 88][i];
    var g = x.createLinearGradient(px, py, px + pw, py + ph);
    g.addColorStop(0, 'hsl(' + hue + ' 40% 13%)'); g.addColorStop(1, 'hsl(' + (hue + 14) + ' 46% 26%)');
    rr(x, px, py, pw, ph, 24); x.fillStyle = g; x.fill();
    x.save(); rr(x, px, py, pw, ph, 24); x.clip();
    x.strokeStyle = 'rgba(255,255,255,.16)'; x.lineWidth = 4;
    var ox = px + 150, oy = py + 90, ow = pw - 300, oh = ph - 180;
    x.strokeRect(ox, oy, ow, oh);
    x.beginPath(); x.moveTo(ox + ow / 2, oy); x.lineTo(ox + ow / 2, oy + oh);
    x.moveTo(ox + ow * .22, oy); x.lineTo(ox + ow * .22, oy + oh); x.moveTo(ox + ow * .78, oy); x.lineTo(ox + ow * .78, oy + oh);
    x.moveTo(ox + ow * .22, oy + oh / 2); x.lineTo(ox + ow * .78, oy + oh / 2); x.stroke();
    x.fillStyle = '#C8F04B'; x.beginPath(); x.arc(px + pw * (0.30 + i * 0.08), py + ph * (0.66 - i * 0.06), 30, 0, 7); x.fill();
    x.fillStyle = 'rgba(8,17,15,.6)'; rr(x, px + 26, py + ph - 70, 340, 46, 12); x.fill();
    x.fillStyle = '#EAF1EC'; x.font = '600 26px "Barlow Condensed", sans-serif'; x.textBaseline = 'middle';
    x.fillText('IMAGE 0' + (i + 1) + '  ·  교체 예정', px + 46, py + ph - 47);
    x.restore();
    // number + keyword on one line, copy underneath
    x.textBaseline = 'alphabetic';
    x.fillStyle = '#EAF1EC'; x.font = '700 150px "Barlow Condensed", sans-serif';
    x.fillText(CARDS[i].k, 46, 800);
    x.fillStyle = '#C8F04B'; x.font = '700 40px "Barlow Condensed", sans-serif';
    x.textAlign = 'right'; x.fillText('0' + (i + 1) + ' / 06', W - 48, 800); x.textAlign = 'left';
    x.fillStyle = '#B3C4BA'; x.font = '500 40px Pretendard, sans-serif';
    wrap(x, CARDS[i].d, W - 96).slice(0, 2).forEach(function (ln, li) { x.fillText(ln, 48, 878 + li * 58); });
    x.restore();
    var tex = new THREE.CanvasTexture(c);
    tex.encoding = THREE.sRGBEncoding; tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    return tex;
  }

  function makeDecor(i) {
    var W = 1280, H = 1010, c = document.createElement('canvas'); c.width = W; c.height = H;
    var x = c.getContext('2d'), hue = [158, 92, 140, 170, 110, 150][i];
    var g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, 'hsl(' + hue + ' 30% 18%)'); g.addColorStop(1, 'hsl(' + (hue + 18) + ' 38% 30%)');
    rr(x, 0, 0, W, H, 40); x.fillStyle = g; x.fill();
    x.save(); rr(x, 0, 0, W, H, 40); x.clip();
    x.strokeStyle = 'rgba(255,255,255,.22)'; x.lineWidth = 6; var m = DECOR[i].m;
    if (m === 'net') { for (var a = 0; a < W; a += 46) { x.beginPath(); x.moveTo(a, 300); x.lineTo(a + 60, 720); x.stroke(); } for (var b = 300; b < 740; b += 46) { x.beginPath(); x.moveTo(0, b); x.lineTo(W, b + 20); x.stroke(); } x.fillStyle = 'rgba(255,255,255,.5)'; x.fillRect(0, 280, W, 26); }
    if (m === 'ball') { x.fillStyle = '#C8F04B'; x.beginPath(); x.arc(W * .55, H * .5, 230, 0, 7); x.fill(); x.strokeStyle = 'rgba(255,255,255,.75)'; x.lineWidth = 14; x.beginPath(); x.arc(W * .55 - 250, H * .5, 260, -0.9, 0.9); x.stroke(); x.beginPath(); x.arc(W * .55 + 250, H * .5, 260, Math.PI - 0.9, Math.PI + 0.9); x.stroke(); }
    if (m === 'strings') { for (var s1 = 80; s1 < W; s1 += 52) { x.beginPath(); x.moveTo(s1, 0); x.lineTo(s1, H); x.stroke(); } for (var s2 = 60; s2 < H; s2 += 52) { x.beginPath(); x.moveTo(0, s2); x.lineTo(W, s2); x.stroke(); } }
    if (m === 'court' || m === 'lines') { x.lineWidth = 10; x.strokeStyle = 'rgba(255,255,255,.55)'; x.save(); x.translate(W / 2, H / 2); x.rotate(m === 'lines' ? -0.5 : 0.25); x.strokeRect(-420, -300, 840, 600); x.beginPath(); x.moveTo(-420, 0); x.lineTo(420, 0); x.moveTo(0, -180); x.lineTo(0, 180); x.moveTo(-420, -180); x.lineTo(420, -180); x.moveTo(-420, 180); x.lineTo(420, 180); x.stroke(); x.restore(); }
    if (m === 'shoe') { x.fillStyle = 'rgba(255,255,255,.18)'; for (var k = 0; k < 9; k++) { x.beginPath(); x.ellipse(200 + k * 110, 520 + Math.sin(k) * 60, 40, 22, 0.3, 0, 7); x.fill(); } }
    x.fillStyle = 'rgba(8,17,15,.35)'; x.fillRect(0, 0, W, H);
    x.restore();
    var tex = new THREE.CanvasTexture(c);
    tex.encoding = THREE.sRGBEncoding; tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    return tex;
  }

  function buildCards() {
    // card geometry: a slice of the cylinder, moved so its centre sits at the origin (tilt pivots there)
    cardGeo.translate(0, 0, -R);
    for (var i = 0; i < NC; i++) {
      var info = i % 2 === 0, idx = i >> 1;
      var tex = info ? makeTexture(idx) : makeDecor(idx);
      var tb = tex.clone(); tb.wrapS = THREE.RepeatWrapping; tb.repeat.x = -1; tb.offset.x = 1; tb.needsUpdate = true;
      var fm = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.FrontSide });
      var bm = new THREE.MeshBasicMaterial({ map: tb, transparent: true, side: THREE.BackSide });
      var grp = new THREE.Group(), piv = new THREE.Group();
      piv.position.z = R; piv.rotation.z = TILT;
      var f = new THREE.Mesh(cardGeo, fm), b = new THREE.Mesh(cardGeo, bm);
      f.renderOrder = 2; b.renderOrder = 1;
      piv.add(b); piv.add(f); grp.add(piv); grp.visible = false; belt.add(grp);
      cards.push({ grp: grp, piv: piv, fm: fm, bm: bm, info: info, idx: idx });
    }
  }

  /* ---- progress / animation (a pure function of one number) ---------- */
  var target = 0, cur = 0, forced = null, lastActive = -2, INTERACT = 0, TNOW = 0;
  var section = document.getElementById('player-3d'), stageEl = section.querySelector('.p3d-stage');
  var stringsEl = document.getElementById('p3d-strings'), glowEl = document.getElementById('p3d-glow'), hudEl = section.querySelector('.p3d-hud'), lineEl = document.getElementById('p3d-flowline');
  var kwEl = document.getElementById('p3d-kw'), cntEl = document.getElementById('p3d-count'), railEl = document.getElementById('p3d-rail'), hintEl = document.getElementById('p3d-hint');
  function sstep(a, b, x) { x = Math.min(1, Math.max(0, (x - a) / (b - a))); return x * x * (3 - 2 * x); }

  var D2R = Math.PI / 180;
  function apply(P) {
    var q = ringAt(P), active = -1;
    for (var i = 0; i < NC; i++) {
      var c = cards[i], u = q - i * SLOT;            // this card's position along the path, in degrees
      var show = u > -2 && u < PATH + 2;
      c.grp.visible = show;
      if (!show) continue;
      var th = (TH_IN - u) * D2R;
      c.grp.rotation.y = th;                         // th = -360 deg is the front (z = +R), -90 left, -180 back, -270 right
      c.grp.position.y = Y_IN + (Y_OUT - Y_IN) * (u / PATH);
      var front = Math.cos(th);                      // 1 = facing the viewer, -1 = behind the statue
      c.piv.rotation.z = TILT * 0.6 * (1 - 0.75 * Math.pow(Math.max(0, front), 3));   // lean with the helix, level out at the front for reading
      if (c.info) {
        c.fm.color.setScalar(0.42 + 0.58 * sstep(-0.2, 0.95, front));
        c.fm.opacity = 0.35 + 0.65 * sstep(-0.1, 0.6, front);
        c.bm.color.setScalar(0.55); c.bm.opacity = 0.32;
        if (Math.abs(u - FRONT_AT) < SLOT * 0.6) active = c.idx;
      } else {
        c.fm.color.setScalar(0.55 + 0.2 * sstep(0, 1, front)); c.fm.opacity = 0.30 - 0.20 * sstep(0.3, 1, front);   // nearly clear while crossing in front of the statue
        c.bm.color.setScalar(0.5); c.bm.opacity = 0.22;
      }
    }
    // statue: one steady turn rate for the whole sequence (like the reference), same direction as the ring,
    // ~2/3 of the cards' average speed so it never outruns them while they move.
    var st = Math.min(1, P / SPIN_T), SA = 0.72, SK = 2 / (1 + SA);   // steady turn, then a soft landing (no hard stop)
    var sp = st < SA ? SK * st : 1 - SK / (2 * (1 - SA)) * (1 - st) * (1 - st);
    // once it is light it keeps breathing: a slow sway of a few degrees, so it never freezes and stares
    var sway = sstep(0.75, 1, prog(P, SHT)) * (1 - sstep(0.2, 0.7, prog(P, PH.flow)));
    statue.rotation.y = YAW0 - sp * (TURNS * Math.PI * 2 + YAW0) + sway * (0.11 * Math.sin(TNOW * 0.42) + 0.04 * Math.sin(TNOW * 0.97 + 1.3));
    if (ball.userData.base !== undefined) {         // ball hovers over the hand, bobs and spins a little with scroll
      ball.position.y = ball.userData.base + Math.sin(P * 70) * 0.012 / S_SCALE;
      ball.userData.mesh.rotation.set(P * 9, P * 14, P * 5);
    }
    var cr = prog(P, CRK);
    crackU.uCrack.value = cr * cr * (3 - 2 * cr) * 0.35 + cr * 0.65;   // first card at the front -> about halfway
    // after the cards: shatter -> statue of light -> play -> flow into the centre line
    var sh = prog(P, SHT), fl = prog(P, PH.flow);
    crackU.uShat.value = sh * SHAT_MAX;              // pieces loosen and shrink into dots; all done as the last card leaves
    statue.children.forEach(function (o) { if (o !== ball && o !== dust) o.visible = sh < 1; });
    if (dust) {
      dust.visible = sh > 0;
      var bb = Math.min(1, Math.max(0, (sh * SHAT_MAX - 0.30) / 0.34));
      ballU.uB.value = bb;
      ball.userData.mesh.material.visible = bb < 1;
      if (ballDust) ballDust.visible = bb > 0;
      dustU.uFlow.value = fl;
      dustU.uFade.value = 1 - 0.85 * sstep(0.72, 1, fl);
    }
    INTERACT = sstep(0.85, 1, sh) * (1 - sstep(0.0, 0.35, fl));
    // the ball drops into the line and goes out
    if (ball.userData.base !== undefined && fl > 0) {
      var bf = sstep(0.0, 0.6, fl); ballU.uBF.value = bf;
      ball.position.y -= bf * 0.9 / statue.scale.x;
      ball.position.x = ball.userData.bx * (1 - bf); ball.position.z = ball.userData.bz * (1 - bf);
      ball.scale.setScalar(Math.max(0.001, 1 - bf));
    } else if (ball.userData.base !== undefined) { ballU.uBF.value = 0; ball.position.x = ball.userData.bx; ball.position.z = ball.userData.bz; ball.scale.setScalar(1); }
    // page chrome: grid, glow and HUD give way to the plain next section; its centre line fades in
    var cl = sstep(0.15, 0.85, fl);
    var bk = sstep(0.3, 1, fl);                    // stage colour settles into the brand message section below
    // deep court green on the way in, settling into the original near-black before the first card arrives,
    // then into the brand message colour as the dots flow out
    var dk = sstep(0, CRACK_T0 * 0.85, P);
    var cr0 = 20 - 12 * dk, cg0 = 49 - 32 * dk, cb0 = 38 - 23 * dk;
    stageEl.style.backgroundColor = 'rgb(' + Math.round(cr0 + (16 - cr0) * bk) + ',' + Math.round(cg0 + (23 - cg0) * bk) + ',' + Math.round(cb0 + (20 - cb0) * bk) + ')';
    stageEl.style.setProperty('--p3d-top', (1 - sstep(0, 0.05, P)).toFixed(3));
    stringsEl.style.opacity = 1 - cl; glowEl.style.opacity = 1 - cl; hudEl.style.opacity = 1 - sstep(0, 0.4, fl);
    lineEl.style.opacity = sstep(0.45, 1, fl);
    statue.updateMatrixWorld(); crackU.uInv.value.copy(statue.matrixWorld).invert();
    railEl.style.height = Math.round(P * 100) + '%';
    hintEl.style.opacity = P < 0.02 ? 1 : 0;
    if (active !== lastActive) {
      lastActive = active;
      cntEl.style.opacity = active < 0 ? 0 : 1;
      if (active >= 0) cntEl.firstChild.textContent = '0' + (active + 1);
      if (active >= 0) kwEl.textContent = CARDS[active].k;
    }
  }

  function layout() {
    var hd = document.querySelector('.site-header'); if (hd) section.style.setProperty('--p3d-header', hd.offsetHeight + 'px');
    var w = canvas.clientWidth || window.innerWidth, h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    var aspect = w / h; camera.aspect = aspect;
    var d = VIEW_H / (2 * Math.tan(CAM_FOV * Math.PI / 360));
    if (aspect < 0.9) d *= 1 + (0.9 - aspect) * 1.25;      // phones: step back so the whole statue fits across
    if (aspect < 0.9) {                                     // phones: as large as the width allows, waist on the bottom edge
      var vis = VIEW_H * (1 + (0.9 - aspect) * 1.25), s = 1.06;   // as wide as a phone allows (racket to raised hand)
      statue.scale.setScalar(s);
      statue.position.y = TARGET.y - vis / 2 - s * WAIST;
    } else {
      statue.scale.setScalar(S_SCALE);
      statue.position.y = HAND_TOP - DROP - S_SCALE * MODEL_H;
    }
    BASE_Y = statue.position.y;
    var k = aspect < 0.9 ? Math.max(0.6, 0.6 + (aspect - 0.45) * 0.9) : 1;
    belt.scale.set(k, 1, k);                                // ...and pull the helix in so side cards stay on screen
    camera.position.set(0, TARGET.y + d * Math.sin(CAM_ELEV), d * Math.cos(CAM_ELEV));
    camera.lookAt(TARGET); camera.updateProjectionMatrix();
    var visH = 2 * d * Math.tan(CAM_FOV * Math.PI / 360);
    dustU.uLineTop.value = TARGET.y + visH * 0.62; dustU.uLineBot.value = TARGET.y - visH * 0.62;
    dustU.uAspect.value = aspect;
    dustU.uSize.value = 0.016 * h * Math.min(window.devicePixelRatio || 1, 2) * (aspect < 0.9 ? 1.35 : 1);
    RISE = visH * 0.42;                                     // how far below its place the statue starts while the stage scrolls in
  }

  var last = performance.now(), inView = true, READ = function () {};
  var BASE_Y = 0, RISE = 0, ENTER = 1, ent = 1;          // entry: statue rises into place as the stage scrolls up
  function loop(now) {
    TNOW = now / 1000;
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    var tgt = forced === null ? target : forced;
    cur += (tgt - cur) * (1 - Math.exp(-dt * (forced === null ? 9 : 60)));
    if (Math.abs(tgt - cur) < 0.00005) cur = tgt;
    apply(cur);
    ent += (ENTER - ent) * (1 - Math.exp(-dt * 10));
    var eo = 1 - Math.pow(1 - Math.min(1, Math.max(0, ent)), 3);
    statue.position.y = BASE_Y - RISE * (1 - eo);
    dustU.uTime.value = now / 1000;
    if (now - mouse.t > 900) mouse.tk = 0;                       // cursor resting: let the points settle back
    mouse.x += (mouse.tx - mouse.x) * (1 - Math.exp(-dt * 10)); mouse.y += (mouse.ty - mouse.y) * (1 - Math.exp(-dt * 10));
    mouse.k += (mouse.tk * INTERACT - mouse.k) * (1 - Math.exp(-dt * (mouse.tk ? 6 : 2.2)));
    dustU.uMouse.value.set(mouse.x, mouse.y); dustU.uMouseK.value = mouse.k;
    READ();
    if (inView) renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }

  function start() {
    buildCards(); layout();
    window.addEventListener('resize', layout);
    function readScroll() {
      var r = section.getBoundingClientRect(), span = r.height - window.innerHeight;
      target = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      inView = r.bottom > -50 && r.top < window.innerHeight + 50;
      ENTER = Math.min(1, Math.max(0, 1 - r.top / window.innerHeight));
    }
    readScroll(); ent = ENTER;
    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('resize', readScroll);
    READ = readScroll;
    window.__p3dSetP = function (p) { forced = p; cur = p; };   // QA helper
    window.__p3dClearP = function () { forced = null; };
    requestAnimationFrame(loop);
  }

  var started = false;
  var statueReady = false, fontsReady = false;
  loadStatue(function () { statueReady = true; go(); });
  function go(f) { if (f) fontsReady = true; if (started || !statueReady || !fontsReady) return; started = true; start(); }
  try {
    var ff = function () { go(true); };
    Promise.all([document.fonts.load('700 100px "Barlow Condensed"'), document.fonts.load('600 30px "Barlow Condensed"'), document.fonts.load('500 30px Pretendard')]).then(ff, ff);
    setTimeout(ff, 2500);
  } catch (e) { go(true); }
})();
