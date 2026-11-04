const section = document.querySelector('.player-experience');
const stage = section.querySelector('.player-experience__stage');
const cards = [...stage.querySelectorAll('.player-card')];
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const clamp = x => Math.min(1, Math.max(0, x));
const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
let renderer, scene, camera, player, frame;

function paint() {
  frame = 0;
  if (!renderer || !section.classList.contains('is-interactive')) return;
  const { width, height } = stage.getBoundingClientRect();
  const progress = clamp(-section.getBoundingClientRect().top / (section.offsetHeight - height));
  const explore = clamp((progress - .08) / .79);
  const step = explore * 6;
  const featured = Math.min(5, Math.floor(step));
  const turn = (featured + ease(step - featured)) / 6;
  player.rotation.y = turn * Math.PI * 1.25;
  const reveal = ease((progress - .08) / .04) * (1 - ease((progress - .87) / .065));
  const compact = width < 600;
  const cardScale = Math.min(1, height / 520);
  cards.forEach((card, index) => {
    const angle = (index - step + .5) * Math.PI / 3;
    const depth = Math.cos(angle);
    const focus = reveal * (1 - ease(Math.abs(index + .5 - step)));
    const x = Math.sin(angle) * width * (.25 + .1 * (1 - reveal));
    const y = (compact ? height * .28 : 0) + Math.sin(index * 2.1) * height * .085;
    const z = -180 + 120 * depth;
    const frontX = compact ? width * .19 : width * .31;
    card.style.transform = `translate(-50%,-50%) translate3d(${x + (frontX - x) * focus}px,${y}px,${z * (1 - focus)}px) rotateY(${Math.sin(angle) * 36 * (1 - focus)}deg) scale(${cardScale})`;
    card.style.zIndex = String(index === featured ? 10 : Math.round(4 + depth * 3));
    card.style.opacity = String(reveal * (.18 + .19 * (depth + 1) + focus * .44));
    card.hidden = reveal === 0;
    card.setAttribute('aria-hidden', String(!reveal || index !== featured));
  });
  renderer.render(scene, camera);
}

function queue() {
  if (!frame) frame = requestAnimationFrame(paint);
}

function resize() {
  const { clientWidth: width, clientHeight: height } = stage;
  if (!width || !height) return;
  camera.aspect = width / height;
  camera.position.set(0, 2.15, Math.max(7.4, 2.8 / camera.aspect));
  camera.lookAt(0, width < 600 ? 1.12 : 1.7, 0);
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  queue();
}

function activate() {
  const active = renderer && !motion.matches;
  section.classList.toggle('is-interactive', Boolean(active));
  if (renderer) renderer.domElement.hidden = !active;
  cards.forEach(card => { card.hidden = true; });
  if (active) resize();
}

async function initialize() {
  try {
    const T = await import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js');
    renderer = new T.WebGLRenderer({ alpha:true, antialias:true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.domElement.setAttribute('aria-hidden','true');
    stage.prepend(renderer.domElement);
    scene = new T.Scene();
    camera = new T.PerspectiveCamera(35, 1, .1, 60);
    scene.add(new T.HemisphereLight(0xffffff, 0x626762, 2));
    const key = new T.DirectionalLight(0xffffff, 2.6);
    key.position.set(-3, 7, 5);
    scene.add(key);
    player = new T.Group();
    scene.add(player);
    const stone = new T.MeshStandardMaterial({ color:0x777c77, roughness:.95 });
    const accent = new T.MeshStandardMaterial({ color:0x525852, roughness:1 });
    const sphere = new T.SphereGeometry(1, 24, 16);
    function mesh(geometry, material, x, y, z) {
      const object = new T.Mesh(geometry, material);
      object.position.set(x,y,z);
      player.add(object);
      return object;
    }
    function ellipsoid(x,y,z,a,b,c,material=stone) {
      mesh(sphere,material,x,y,z).scale.set(a,b,c);
    }
    function limb(a,b,r1,r2,material=stone) {
      const start = new T.Vector3(...a), end = new T.Vector3(...b);
      const direction = end.clone().sub(start);
      const middle = start.clone().lerp(end,.5);
      const part = mesh(new T.CylinderGeometry(r2,r1,direction.length(),16),material,middle.x,middle.y,middle.z);
      part.quaternion.setFromUnitVectors(new T.Vector3(0,1,0), direction.normalize());
    }
    ellipsoid(0,2.93,0,.23,.29,.22);
    limb([0,2.54,0],[0,2.79,0],.13,.12);
    ellipsoid(0,2.12,0,.44,.56,.24);
    ellipsoid(0,1.67,0,.34,.24,.22,accent);
    for (const side of [-1,1]) {
      const hip=[side*.20,1.65,0], knee=[side*.24,.96,.04], ankle=[side*.30,.29,-.04];
      limb(hip,knee,.17,.12);
      limb(knee,ankle,.12,.078);
      ellipsoid(side*.30,.22,.07,.105,.09,.21,accent);
      const shoulder=[side*.39,2.45,0], elbow=[side*.57,2.03,.03], hand=[side*.62,1.73,side===1?.32:.10];
      limb(shoulder,elbow,.14,.10);
      limb(elbow,hand,.10,.065);
      ellipsoid(...hand,.079,.10,.07);
    }
    limb([.55,1.55,.32],[.81,2.05,.32],.035,.035,accent);
    const racket = mesh(new T.TorusGeometry(.25,.027,10,40),accent,.94,2.30,.32);
    racket.scale.y=1.33;
    racket.rotation.z=-.38;
    for(let i=-2;i<=2;i++) {
      const offset=i*.073;
      const half=.24*Math.sqrt(1-(offset/.25)**2);
      limb([.94+offset,2.30-half,.32],[.94+offset,2.30+half,.32],.005,.005);
      limb([.94-half,2.30+offset,.32],[.94+half,2.30+offset,.32],.005,.005);
    }
    mesh(new T.CylinderGeometry(.70,.76,.14,40),accent,0,.10,0);
    renderer.domElement.addEventListener('webglcontextlost', event => {
      event.preventDefault();
      section.classList.remove('is-interactive');
      renderer.domElement.hidden = true;
      cards.forEach(card => { card.hidden=true; });
    });
    renderer.domElement.addEventListener('webglcontextrestored', activate);
    motion.addEventListener('change', activate);
    addEventListener('scroll', queue, { passive:true });
    new ResizeObserver(resize).observe(stage);
    activate();
  } catch (error) {
    console.warn('ONCOURT player wireframe unavailable', error);
    renderer?.domElement.remove();
  }
}

const observer = new IntersectionObserver(entries => {
  if (!entries.some(entry => entry.isIntersecting)) return;
  observer.disconnect();
  initialize();
}, { rootMargin:'800px' });
observer.observe(section);
