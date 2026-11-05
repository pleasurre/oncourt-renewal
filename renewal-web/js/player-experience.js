const section = document.querySelector('.player-experience');
const stage = section.querySelector('.player-experience__stage');
const cards = [...stage.querySelectorAll('.player-card')];
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const clamp = x => Math.min(1, Math.max(0, x));
const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
let renderer, scene, camera, player, frame;

// All panels share this cylinder, helical path and scroll-owned conveyor position.
const state = { travel:-.25, fade:1 };
const belt = { radius:2.2, spacing:.22, sweep:Math.PI * 2, rise:14, center:2.4 };
const panels = [];
let timeline, trigger;
function pathState(q, compact=false) {
  const angle = Math.PI * 40 / 180 - (compact ? 0 : .65) + (q - .5) * belt.sweep;
  return { angle, y:belt.center + (.5 - q) * belt.rise };
}
function paint() {
  frame = 0;
  if (!renderer || !section.classList.contains('is-interactive')) return;
  const { width, height } = stage.getBoundingClientRect();
  const compact = width < 760;
  const azimuth = Math.PI * 40 / 180;
  const radius = compact ? Math.max(8.8,4.3/camera.aspect) : 7.2;
  const playerScale = compact ? 1.05 : 1.6;
  player.scale.setScalar(playerScale);
  player.position.y = belt.center * (1 - playerScale);
  camera.position.set(Math.sin(azimuth) * radius, 3.35, Math.cos(azimuth) * radius);
  camera.lookAt(0, belt.center, 0);
  camera.updateMatrixWorld();
  player.rotation.y = Math.max(0,state.travel) * belt.sweep * .225;
  panels.forEach((panel,index) => {
    const q = state.travel - index * belt.spacing;
    const position = pathState(q,compact);
    panel.position.y = position.y;
    panel.rotation.y = position.angle;
    panel.visible = q > -.15 && q < 1.15;
    const front = Math.max(0,Math.cos(position.angle - azimuth));
    const focus = 1 - ease(Math.abs(q - .5) / .12);
    panel.material.color.setScalar(.32 + .68 * Math.max(focus,Math.pow(front,2)));
    // Same coordinate system and depth buffer as the central player.
    const readable = q > .45 && q < .55;
    cards[index].setAttribute('aria-hidden',String(!readable));
  });
  renderer.domElement.style.opacity = String(state.fade);
  stage.style.setProperty('--pattern-opacity',String(state.fade));
  if (state.fade > 0 && !document.hidden) renderer.render(scene,camera);
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
  trigger?.kill();
  timeline?.kill();
  const active = renderer && !motion.matches;
  section.classList.toggle('is-interactive', Boolean(active));
  if (renderer) renderer.domElement.hidden = !active;
  panels.forEach(panel => { panel.visible = false; });
  cards.forEach(card => {
    card.hidden = Boolean(active);
    card.removeAttribute('aria-hidden');
    card.removeAttribute('style');
  });
  if (active) {
    state.travel = -.25;
    state.fade = 1;
    timeline = window.gsap.timeline({paused:true,onUpdate:queue});
    timeline.to(state,{travel:-.25,duration:.55,ease:'none'});
    for (let i=0;i<cards.length;i++) {
      timeline.to(state,{travel:.5+i*belt.spacing,duration:i===0?.65:.48,ease:'none'});
      timeline.to(state,{travel:.5+i*belt.spacing,duration:.28,ease:'none'});
    }
    timeline.to(state,{travel:1.25+5*belt.spacing,duration:.7,ease:'none'})
      .to(state,{travel:1.25+5*belt.spacing,duration:.25,ease:'none'})
      .to(state,{fade:0,duration:.4,ease:'none'});
    trigger = window.ScrollTrigger.create({
      trigger:section, start:'top top', end:() => '+=' + stage.clientHeight * 5.6,
      animation:timeline, scrub:true, invalidateOnRefresh:true
    });
    resize();
  }
}

async function initialize() {
  try {
    const [T, G, S] = await Promise.all([
      import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js'),
      import('https://cdn.jsdelivr.net/npm/gsap@3.13.0/+esm'),
      import('https://cdn.jsdelivr.net/npm/gsap@3.13.0/ScrollTrigger/+esm')
    ]);
    window.gsap = G.gsap;
    window.ScrollTrigger = S.ScrollTrigger;
    window.gsap.registerPlugin(window.ScrollTrigger);
    renderer = new T.WebGLRenderer({ alpha:true, antialias:true });
    renderer.localClippingEnabled = true;
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
    const stone = new T.MeshStandardMaterial({ color:0xe4e6df, roughness:.95, clippingPlanes:[new T.Plane(new T.Vector3(0,1,0),-1.52)] });
    const accent = new T.MeshStandardMaterial({ color:0xbcc3b9, roughness:1, clippingPlanes:[new T.Plane(new T.Vector3(0,1,0),-1.52)] });
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
    // Scale the existing proxy around its upper-body center, ready for an asset swap.
    player.scale.setScalar(1.6);
    player.position.y = belt.center * (1 - 1.6);
    for (const material of [stone,accent]) material.clippingPlanes[0].constant = -1.0;
    await document.fonts.ready;
    const geometry = new T.PlaneGeometry(1,2.1,48,8);
    const vertices = geometry.attributes.position;
    const uv = geometry.attributes.uv;
    const angularWidth = .88;
    for (let i=0;i<vertices.count;i++) {
      const angle = (uv.getX(i)-.5)*angularWidth;
      vertices.setXYZ(i, Math.sin(angle)*belt.radius, vertices.getY(i),
        Math.cos(angle)*belt.radius);
    }
    geometry.computeVertexNormals();
    cards.forEach((card,index) => {
      const canvas = document.createElement('canvas');
      canvas.width=768;canvas.height=840;
      const ctx=canvas.getContext('2d');
      ctx.fillStyle='#101d18';ctx.beginPath();ctx.roundRect(0,0,768,840,38);ctx.fill();
      ctx.save();ctx.clip();
      ctx.fillStyle='#26372e';ctx.fillRect(24,24,720,480);
      ctx.strokeStyle='#56665c';ctx.lineWidth=2;ctx.strokeRect(24,24,720,480);
      ctx.fillStyle='#b2beb4';ctx.textAlign='center';ctx.font='600 30px Manrope,sans-serif';
      ctx.fillText('IMAGE '+String(index+1).padStart(2,'0'),384,270);
      ctx.textAlign='left';ctx.fillStyle='#D1EB72';ctx.font='500 24px Manrope,sans-serif';
      ctx.fillText(String(index+1).padStart(2,'0')+' / 06',32,550);
      ctx.fillStyle='#fff';ctx.font='800 49px Manrope,sans-serif';
      ctx.fillText(card.querySelector('strong').textContent,32,618);
      ctx.font='500 29px Pretendard,sans-serif';ctx.fillStyle='#d5ded6';
      let line='',y=682;
      for(const char of card.querySelector('p').textContent) {
        if(ctx.measureText(line+char).width>690){ctx.fillText(line,32,y);line='';y+=43;}
        line+=char;
      }
      ctx.fillText(line,32,y);
      ctx.restore();
      const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
      const material=new T.MeshBasicMaterial({map:texture,side:T.DoubleSide,alphaTest:.1});
      const panel=new T.Mesh(geometry,material);
      scene.add(panel);panels.push(panel);
    });
    renderer.domElement.addEventListener('webglcontextlost', event => {
      event.preventDefault();
      section.classList.remove('is-interactive');
      renderer.domElement.hidden = true;
      trigger?.kill();
      timeline?.kill();
      cards.forEach(card => { card.hidden=false; card.removeAttribute('style'); card.removeAttribute('aria-hidden'); });
    });
    renderer.domElement.addEventListener('webglcontextrestored', activate);
    motion.addEventListener('change', activate);
    document.addEventListener('visibilitychange', queue);
    new ResizeObserver(() => { resize(); trigger?.refresh(); }).observe(stage);
    activate();
  } catch (error) {
    section.classList.remove('is-interactive');
    console.warn('ONCOURT player wireframe unavailable', error);
    renderer?.domElement.remove();
    cards.forEach(card => { card.hidden=false; });
  }
}

const observer = new IntersectionObserver(entries => {
  if (!entries.some(entry => entry.isIntersecting)) return;
  observer.disconnect();
  initialize();
}, { rootMargin:'800px' });
observer.observe(section);
