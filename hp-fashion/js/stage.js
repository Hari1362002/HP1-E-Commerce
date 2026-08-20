/* HP Fashion — the WebGL dress form on the landing page.

   A tailor's mannequin turned on a lathe: one profile curve gives the whole
   torso, and a walnut post and base stand it up. It idles on a slow turntable
   and leans a few degrees toward the pointer.

   Every failure path here is silent. The stage only gets `.is-live` once a
   frame has actually rendered, so until then the still photograph underneath
   is what people see. */

import * as THREE from "./vendor/three.module.min.js";

var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var coarse = window.matchMedia("(pointer: coarse)").matches;

/* ------------------------------------------------------------------ parts */

/* Half of a dress form, read bottom to top: hip, waist, bust, shoulder, neck.
   These are control points only — the spline below resamples them, because a
   lathe run straight off this list facets visibly down the silhouette. */
var PROFILE = [
  [0.000, -0.860], [0.145, -0.845], [0.208, -0.790], [0.252, -0.670],
  [0.276, -0.520], [0.281, -0.380], [0.262, -0.220], [0.228, -0.060],
  [0.208,  0.080], [0.216,  0.200], [0.252,  0.350], [0.288,  0.500],
  [0.298,  0.610], [0.291,  0.730], [0.276,  0.850], [0.286,  0.940],
  [0.250,  1.030], [0.172,  1.100], [0.108,  1.140], [0.094,  1.200],
  [0.058,  1.216], [0.000,  1.222]
];

function silhouette(samples) {
  var curve = new THREE.SplineCurve(
    PROFILE.map(function (p) { return new THREE.Vector2(p[0], p[1]); })
  );
  return curve.getPoints(samples).map(function (v) {
    return new THREE.Vector2(Math.max(v.x, 0), v.y);   // never cross the axis
  });
}

export function buildForm(segments) {
  var group = new THREE.Group();

  var linen = new THREE.MeshStandardMaterial({
    color: 0xf1e4d4, roughness: 0.92, metalness: 0.0
  });
  var walnut = new THREE.MeshStandardMaterial({
    color: 0x4a3527, roughness: 0.42, metalness: 0.35
  });

  var line = silhouette(segments < 48 ? 80 : 130);

  var torso = new THREE.Mesh(new THREE.LatheGeometry(line, segments), linen);

  // The orange marking tape a real form is set up with, run down the front.
  var tape = new THREE.Mesh(
    new THREE.LatheGeometry(
      line.map(function (v) { return new THREE.Vector2(v.x * 1.006, v.y); }),
      5, -0.035, 0.07
    ),
    new THREE.MeshStandardMaterial({ color: 0xe2661c, roughness: 0.6, side: THREE.DoubleSide })
  );

  var collar = new THREE.Mesh(new THREE.TorusGeometry(0.112, 0.019, 10, segments), walnut);
  collar.position.y = 1.135;
  collar.rotation.x = Math.PI / 2;

  var knob = new THREE.Mesh(new THREE.SphereGeometry(0.062, segments, 14), walnut);
  knob.position.y = 1.30;

  var neckPin = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.12, 12), walnut);
  neckPin.position.y = 1.24;

  var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.115, 0.055, segments), walnut);
  cap.position.y = -0.875;

  var post = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.048, 0.58, segments), walnut);
  post.position.y = -1.17;

  var foot = new THREE.Mesh(new THREE.CylinderGeometry(0.40, 0.46, 0.05, segments), walnut);
  foot.position.y = -1.47;

  group.add(torso, tape, collar, knob, neckPin, cap, post, foot);
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
  mesh.position.y = -1.50;
  mesh.scale.set(0.95, 0.55, 1);
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
  camera.position.set(0, -0.06, 6.6);

  var form = buildForm(coarse ? 40 : 64);
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
    camera.position.z = w / h < 0.95 ? 7.9 : 6.6;
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
