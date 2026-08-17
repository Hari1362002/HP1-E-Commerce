/* HP Jewellery — WebGL ring viewer.
   Builds a solitaire (band + faceted brilliant-cut stone + prongs) and lights it
   with an image-based environment so the gold actually reflects something.

   Any failure here is non-fatal: the stage keeps its <img> fallback because we
   only add `.is-live` once a frame has genuinely rendered. */

import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

var BASE_Y = -0.16;   // drops the ring so the stone sits near the optical centre
var TILT = -0.17;     // resting three-quarter tilt, in radians

/* --------------------------------------------------------------- parts -- */

function goldMaterial(tint) {
  return new THREE.MeshStandardMaterial({
    color: tint,
    metalness: 1,
    roughness: 0.17,
    envMapIntensity: 2.1,
  });
}

/* A brilliant cut is a table + crown + girdle + pavilion. Building it from
   three low-segment solids with flat shading gives real facets that catch the
   environment, which a smooth sphere never would. */
function buildStone(cheap) {
  var g = new THREE.Group();
  var SEG = 16;

  var mat = cheap
    ? new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.02,
        transparent: true,
        opacity: 0.62,
        envMapIntensity: 4.2,
        clearcoat: 1,
        flatShading: true,
      })
    : new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.015,
        transmission: 1,
        thickness: 0.62,
        ior: 2.42,
        specularIntensity: 1,
        envMapIntensity: 3.2,
        flatShading: true,
      });

  var crown = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.29, 0.11, SEG), mat);
  crown.position.y = 0.115;

  var girdle = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.285, 0.028, SEG), mat);
  girdle.position.y = 0.046;

  var pavilion = new THREE.Mesh(new THREE.CylinderGeometry(0.285, 0.012, 0.30, SEG), mat);
  pavilion.position.y = -0.118;

  g.add(crown, girdle, pavilion);
  return g;
}

function buildSolitaire(cheap) {
  var ring = new THREE.Group();
  var gold = goldMaterial(0xdcae55);

  // Band — a torus sits in the XY plane by default, which is exactly the
  // "ring standing up, facing you" view a jeweller would photograph.
  var band = new THREE.Mesh(new THREE.TorusGeometry(1, 0.115, 40, 220), gold);
  ring.add(band);

  // Shoulders taper up toward the setting
  var basket = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.13, 0.16, 20), gold);
  basket.position.y = 1.02;
  ring.add(basket);

  var stone = buildStone(cheap);
  stone.position.y = 1.2;
  ring.add(stone);

  // Four prongs pinching the girdle
  var prongGeo = new THREE.CapsuleGeometry(0.028, 0.2, 4, 10);
  for (var i = 0; i < 4; i++) {
    var a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    var prong = new THREE.Mesh(prongGeo, gold);
    prong.position.set(Math.cos(a) * 0.25, 1.2, Math.sin(a) * 0.25);
    prong.rotation.z = -Math.cos(a) * 0.32;
    prong.rotation.x = Math.sin(a) * 0.32;
    ring.add(prong);
  }

  return ring;
}

/* A plain companion band, threaded through the first one at an angle. */
function buildBand() {
  var mat = goldMaterial(0xc98f43);
  mat.roughness = 0.24;
  var band = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.095, 32, 180), mat);
  band.rotation.set(0.5, 0.68, 0.28);
  band.position.set(0.46, -0.5, 0.08);
  return band;
}

/* --------------------------------------------------------------- scene -- */

function mount(canvas) {
  var stage = canvas.closest("[data-stage]") || canvas.parentElement;
  var wantsPair = canvas.getAttribute("data-ring") === "pair";
  var cheap = window.innerWidth < 760;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch (err) {
    return false; // No WebGL — the caller swaps in the still image.
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  if ("transmissionResolutionScale" in renderer) {
    renderer.transmissionResolutionScale = cheap ? 0.4 : 0.75;
  }

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.3, 7);

  // Image-based lighting: the whole reason the gold reads as metal
  var pmrem = new THREE.PMREMGenerator(renderer);
  var envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;

  // A warm key and a cool rim keep the silhouette legible against the green
  var key = new THREE.DirectionalLight(0xfff2d6, 2.6);
  key.position.set(3.2, 4.2, 4);
  scene.add(key);

  var rim = new THREE.DirectionalLight(0x9fd8c0, 1.5);
  rim.position.set(-4, 1.5, -3.5);
  scene.add(rim);

  var fill = new THREE.PointLight(0xffd9a0, 18, 14, 2);
  fill.position.set(-1.6, -1.8, 2.6);
  scene.add(fill);

  var pivot = new THREE.Group();
  scene.add(pivot);

  var jewel = new THREE.Group();
  jewel.add(buildSolitaire(cheap));
  if (wantsPair) jewel.add(buildBand());
  jewel.position.y = BASE_Y;
  pivot.add(jewel);

  // A few degrees of downward tilt reads as a three-quarter view rather than
  // a flat elevation, and keeps the stone's crown facets in the light.
  pivot.rotation.x = TILT;

  /* ------------------------------------------------------------ sizing -- */

  function resize() {
    var w = stage.clientWidth || canvas.clientWidth;
    var h = stage.clientHeight || canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Pull the camera back on narrow screens so the ring never clips
    camera.position.z = w < 520 ? 8 : 7;
    camera.updateProjectionMatrix();
  }
  resize();
  if ("ResizeObserver" in window) {
    new ResizeObserver(resize).observe(stage);
  } else {
    window.addEventListener("resize", resize);
  }

  /* ----------------------------------------------------------- pointer -- */

  var targetX = 0, targetY = 0;       // desired tilt
  var curX = 0, curY = 0;             // eased tilt
  var spin = 0;                       // drag-accumulated spin
  var spinVel = 0;
  var dragging = false;
  var lastX = 0;

  stage.addEventListener("pointermove", function (e) {
    if (dragging) return;
    var r = stage.getBoundingClientRect();
    targetX = ((e.clientY - r.top) / r.height - 0.5) * 0.5;
    targetY = ((e.clientX - r.left) / r.width - 0.5) * 0.9;
  });
  stage.addEventListener("pointerleave", function () { targetX = 0; targetY = 0; });

  canvas.addEventListener("pointerdown", function (e) {
    dragging = true;
    lastX = e.clientX;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    spinVel = (e.clientX - lastX) * 0.006;
    spin += spinVel;
    lastX = e.clientX;
  });
  var endDrag = function () { dragging = false; };
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);

  /* ------------------------------------------------------------- frame -- */

  var visible = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
    }, { threshold: 0.01 }).observe(stage);
  }

  var painted = false;
  var start = performance.now();

  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;

    var t = (performance.now() - start) / 1000;

    if (!dragging) {
      spinVel *= 0.94;
      spin += spinVel;
      if (!reduced) spin += 0.0032;   // idle turntable
    }

    curX += (targetX - curX) * 0.06;
    curY += (targetY - curY) * 0.06;

    pivot.rotation.y = spin + curY;
    pivot.rotation.x = TILT + curX;
    jewel.position.y = BASE_Y + (reduced ? 0 : Math.sin(t * 0.9) * 0.07);

    renderer.render(scene, camera);

    if (!painted) {
      painted = true;
      stage.classList.add("is-live");
    }
  }
  frame();
  return true;
}

/* ---------------------------------------------------------------- boot -- */

/* On the product page the 3D pane is shown first. If WebGL never comes up we
   would be left staring at an empty box, so fall back to the photo pane. */
function showPhotoInstead(canvas) {
  var scope = canvas.closest(".pdp__stage");
  if (!scope) return;
  scope.querySelectorAll("[data-pane]").forEach(function (p) {
    p.classList.toggle("is-active", p.getAttribute("data-pane") === "photo");
  });
  scope.querySelectorAll("[data-mode]").forEach(function (b) {
    b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === "photo"));
    if (b.getAttribute("data-mode") === "3d") b.disabled = true;
  });
}

document.querySelectorAll("canvas[data-ring]").forEach(function (c) {
  try {
    if (!mount(c)) showPhotoInstead(c);
  } catch (err) {
    // Leave the poster image in place rather than showing an empty box
    showPhotoInstead(c);
    if (window.console) console.warn("Ring viewer unavailable:", err);
  }
});
