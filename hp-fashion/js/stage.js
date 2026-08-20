/* HP Fashion — the WebGL figure on the landing page.

   A standing model in a slip dress, assembled from a lathed torso, tapered
   limb segments and spheres at the joints. She idles on a slow turntable and
   leans a few degrees toward the pointer.

   Every failure path here is silent. The stage only gets `.is-live` once a
   frame has actually rendered, so until then the still photograph underneath
   is what people see. */

import * as THREE from "./vendor/three.module.min.js";

var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var coarse = window.matchMedia("(pointer: coarse)").matches;

/* ------------------------------------------------------------------ parts */

/* A standing figure, blocked in the way a life drawing is: a lathed torso for
   the curves, tapered bones for the limbs, spheres at the joints so nothing
   shows a seam. No face — this is a shop-window model, not a portrait. */

/* Torso half-profile, hip to shoulder. Lathed, then flattened on Z, because a
   person is wider across than they are deep. */
var TORSO = [
  [0.000, -0.06], [0.120, -0.035], [0.192,  0.005], [0.228,  0.075],
  [0.234,  0.150], [0.214,  0.255], [0.184,  0.360], [0.190,  0.435],
  [0.212,  0.510], [0.236,  0.585], [0.230,  0.665], [0.212,  0.740],
  [0.240,  0.800], [0.224,  0.856], [0.132,  0.878], [0.000,  0.885]
];

/* The dress: bust down to a mid-calf hem, left open at the bottom. */
var DRESS = [
  [0.243, 0.705], [0.250, 0.640], [0.222, 0.520], [0.199, 0.430],
  [0.222, 0.320], [0.252, 0.190], [0.286, 0.010], [0.330, -0.200],
  [0.378, -0.400], [0.412, -0.545], [0.421, -0.580]
];

function smooth(points, samples) {
  var curve = new THREE.SplineCurve(
    points.map(function (p) { return new THREE.Vector2(p[0], p[1]); })
  );
  return curve.getPoints(samples).map(function (p) {
    return new THREE.Vector2(Math.max(p.x, 0), p.y);
  });
}

/* A tapered cylinder laid along the line a→b: one limb segment. */
function bone(a, b, rA, rB, mat, seg) {
  var dir = new THREE.Vector3().subVectors(b, a);
  var mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(rB, rA, dir.length(), seg, 1, true), mat
  );
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0), dir.clone().normalize()
  );
  return mesh;
}

function joint(at, r, mat, seg) {
  var mesh = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.round(seg * 0.6)), mat);
  mesh.position.copy(at);
  return mesh;
}

function v(x, y, z) { return new THREE.Vector3(x, y, z || 0); }

export function buildFigure(segments) {
  var group = new THREE.Group();
  var seg = Math.max(16, Math.round(segments * 0.55));

  var skin = new THREE.MeshStandardMaterial({ color: 0xd9bda4, roughness: 0.72, metalness: 0 });
  var cloth = new THREE.MeshStandardMaterial({
    color: 0xfaf4ec, roughness: 0.94, metalness: 0, side: THREE.DoubleSide
  });
  var dark = new THREE.MeshStandardMaterial({ color: 0x2f2119, roughness: 0.55, metalness: 0.05 });
  var plinth = new THREE.MeshStandardMaterial({ color: 0x4a3527, roughness: 0.42, metalness: 0.35 });

  /* ---- torso, neck, head ---- */
  var torso = new THREE.Mesh(new THREE.LatheGeometry(smooth(TORSO, 90), segments), skin);
  torso.scale.z = 0.66;

  var neck = bone(v(0, 0.845), v(0, 0.995), 0.062, 0.052, skin, seg);

  var head = new THREE.Mesh(new THREE.SphereGeometry(0.141, segments, Math.round(segments * 0.7)), skin);
  head.position.set(0, 1.115, 0.006);
  head.scale.set(0.94, 1.2, 0.9);

  /* Hair as a slightly larger cap, stopped at the nape, plus a low bun. */
  var hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.147, segments, Math.round(segments * 0.7), 0, Math.PI * 2, 0, Math.PI * 0.5),
    dark
  );
  hair.position.set(0, 1.122, -0.006);
  hair.scale.set(0.98, 1.24, 0.97);

  var bun = new THREE.Mesh(new THREE.SphereGeometry(0.062, seg, seg), dark);
  bun.position.set(0, 1.168, -0.126);

  /* ---- arms, relaxed and a touch away from the body ---- */
  var arms = new THREE.Group();
  [-1, 1].forEach(function (side) {
    var shoulder = v(side * 0.202, 0.792);
    var elbow = v(side * 0.288, 0.408, 0.014);
    var wrist = v(side * 0.322, 0.052, 0.034);
    var hand = v(side * 0.330, -0.068, 0.040);
    arms.add(
      joint(shoulder, 0.059, skin, seg),
      bone(shoulder, elbow, 0.057, 0.045, skin, seg),
      joint(elbow, 0.045, skin, seg),
      bone(elbow, wrist, 0.044, 0.034, skin, seg),
      joint(wrist, 0.034, skin, seg),
      bone(wrist, hand, 0.033, 0.024, skin, seg)
    );
  });

  /* ---- legs, weight on one side so she is standing rather than posed ---- */
  var legs = new THREE.Group();
  [-1, 1].forEach(function (side) {
    var lean = side < 0 ? 0.022 : 0;
    var hip = v(side * 0.105, 0.055);
    var knee = v(side * (0.098 + lean), -0.505, lean * 1.6);
    var ankle = v(side * (0.096 + lean * 0.4), -1.145, lean * 2.4);
    var toe = v(side * (0.096 + lean * 0.4), -1.262, 0.105 + lean * 2.4);
    legs.add(
      bone(hip, knee, 0.110, 0.078, skin, seg),
      joint(knee, 0.078, skin, seg),
      bone(knee, ankle, 0.077, 0.052, skin, seg),
      joint(ankle, 0.052, skin, seg),
      bone(ankle, toe, 0.051, 0.036, skin, seg)
    );
  });

  /* ---- the dress ---- */
  var dress = new THREE.Mesh(new THREE.LatheGeometry(smooth(DRESS, 80), segments), cloth);
  dress.scale.z = 0.78;

  var strapL = bone(v(-0.128, 0.845, 0.040), v(-0.100, 0.698, 0.092), 0.015, 0.015, cloth, 8);
  var strapR = bone(v( 0.128, 0.845, 0.040), v( 0.100, 0.698, 0.092), 0.015, 0.015, cloth, 8);

  /* ---- the plinth she stands on ---- */
  var disc = new THREE.Mesh(new THREE.CylinderGeometry(0.40, 0.45, 0.05, segments), plinth);
  disc.position.y = -1.295;

  group.add(torso, neck, head, hair, bun, arms, legs, dress, strapL, strapR, disc);
  return group;
}

/* A blurred ellipse painted into a texture — cheaper and softer than a real
   shadow map for one object on a flat ground. */
export function buildShadow() {
  var c = document.createElement("canvas");
  c.width = c.height = 128;
  var ctx = c.getContext("2d");
  var g = ctx.createRadialGradient(64, 64, 2, 64, 64, 62);
  g.addColorStop(0, "rgba(74,53,39,.42)");
  g.addColorStop(0.55, "rgba(74,53,39,.16)");
  g.addColorStop(1, "rgba(74,53,39,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);

  var mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.9, 1.9),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false
    })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -1.325;
  mesh.scale.set(0.85, 0.5, 1);
  return mesh;
}

export function lightStage(scene) {
  scene.add(new THREE.HemisphereLight(0xfff6ec, 0xcfb79c, 0.75));

  var key = new THREE.DirectionalLight(0xfff2e2, 1.25);
  key.position.set(2.6, 3.4, 3.0);
  scene.add(key);

  var rim = new THREE.DirectionalLight(0xffa762, 0.85);
  rim.position.set(-3.0, 1.0, -2.2);
  scene.add(rim);

  var fill = new THREE.DirectionalLight(0xffffff, 0.35);
  fill.position.set(-1.6, -0.8, 2.4);
  scene.add(fill);
}

/* ------------------------------------------------------------------ stage */

function start(stage) {
  var canvas = stage.querySelector("canvas");
  if (!canvas) return;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas, alpha: true, antialias: !coarse, powerPreference: "high-performance"
    });
  } catch (e) {
    return;                       // no WebGL — the photograph stays put
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.75 : 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, -0.02, 6.0);

  var form = buildFigure(coarse ? 44 : 64);
  var pivot = new THREE.Group();
  pivot.add(form);
  scene.add(pivot, buildShadow());

  lightStage(scene);

  var live = false;

  function draw() {
    renderer.render(scene, camera);
    if (!live) { live = true; stage.classList.add("is-live"); }
  }

  function resize() {
    var box = stage.getBoundingClientRect();
    var w = Math.round(stage.clientWidth || box.width);
    var h = Math.round(stage.clientHeight || box.height);
    if (!w || !h) return;
    camera.aspect = w / h;
    // Pull back on narrow stages so the form never crops at the base.
    camera.position.z = w / h < 0.95 ? 7.1 : 6.0;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    if (live) draw();          // resizing clears the buffer; put it back now
  }
  resize();
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(stage);
  else window.addEventListener("resize", resize);

  /* Pointer lean, mouse only. On touch the canvas is inert by design so a
     swipe is always a scroll and never a drag. */
  var aimX = 0, aimY = 0, leanX = 0, leanY = 0;
  if (!coarse && !reduced) {
    window.addEventListener("pointermove", function (e) {
      aimX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      aimY = (e.clientY / window.innerHeight - 0.5) * 0.22;
    }, { passive: true });
  }

  var visible = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
    }, { rootMargin: "120px" }).observe(stage);
  }

  var spin = -0.18;
  var clock = new THREE.Clock();

  function frame() {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;

    var t = clock.getElapsedTime();
    if (!reduced) {
      spin += 0.0026;
      form.position.y = Math.sin(t * 0.75) * 0.035;
    }
    leanX += (aimX - leanX) * 0.05;
    leanY += (aimY - leanY) * 0.05;

    pivot.rotation.y = spin + leanX;
    pivot.rotation.x = leanY;
    draw();
  }

  pivot.rotation.y = spin;
  draw();          // first frame now, so the form is there the moment it is seen
  frame();

  // Fonts and images settling can change the stage box after that first draw.
  window.addEventListener("load", function () { resize(); draw(); }, { once: true });
}

var stage = document.querySelector("[data-stage]");
if (stage) start(stage);
