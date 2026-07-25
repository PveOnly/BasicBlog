// This game intentionally has no dependency on the blog or games catalog.
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

const canvas = document.querySelector("#game-canvas");
const scoreElement = document.querySelector("#score");
const bestScoreElement = document.querySelector("#best-score");
const finalScoreElement = document.querySelector("#final-score");
const loadingMessage = document.querySelector("#loading-message");
const startOverlay = document.querySelector("#start-overlay");
const pauseOverlay = document.querySelector("#pause-overlay");
const gameOverOverlay = document.querySelector("#game-over-overlay");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");
const resumeButton = document.querySelector("#resume-button");
const pauseButton = document.querySelector("#pause-button");

const LANES = [-3.2, 0, 3.2];
const PLAYER_Z = 4;
const SPAWN_Z = -66;
const DESPAWN_Z = 12;
const STORAGE_KEY = "signal-run-best";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x08100f);
scene.fog = new THREE.FogExp2(0x08100f, 0.023);

const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 140);
configureCamera();

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

scene.add(new THREE.HemisphereLight(0xb7ffe2, 0x0b1010, 1.5));
const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
keyLight.position.set(-4, 10, 8);
scene.add(keyLight);

const world = new THREE.Group();
scene.add(world);

const trackSegments = [];
const activeObjects = [];
const clock = new THREE.Clock();

let player;
let targetLane = 1;
let gameState = "ready";
let score = 0;
let speed = 18;
let spawnTimer = 0;
let elapsed = 0;
let touchStartX = null;
let bestScore = Number.parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);

bestScoreElement.textContent = formatScore(bestScore);
pauseButton.disabled = true;

function createTrack() {
  const trackMaterial = new THREE.MeshStandardMaterial({
    color: 0x111c1a,
    roughness: 0.72,
    metalness: 0.18,
  });
  const edgeMaterial = new THREE.MeshBasicMaterial({ color: 0x52bf99 });
  const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x334d46 });

  for (let index = 0; index < 10; index += 1) {
    const segment = new THREE.Group();
    const deck = new THREE.Mesh(new THREE.BoxGeometry(10.8, 0.2, 7.8), trackMaterial);
    deck.position.y = -0.45;
    segment.add(deck);

    for (const x of [-5.28, 5.28]) {
      const edge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 7.4), edgeMaterial);
      edge.position.set(x, -0.3, 0);
      segment.add(edge);
    }

    for (const x of [-1.6, 1.6]) {
      const marker = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.025, 4.7), markerMaterial);
      marker.position.set(x, -0.3, 0);
      segment.add(marker);
    }

    segment.position.z = 7 - index * 7.7;
    world.add(segment);
    trackSegments.push(segment);
  }
}

function createPlayer() {
  const ship = new THREE.Group();
  const hullMaterial = new THREE.MeshStandardMaterial({
    color: 0xdff7ed,
    roughness: 0.28,
    metalness: 0.52,
  });
  const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x13201e,
    roughness: 0.45,
    metalness: 0.3,
  });
  const signalMaterial = new THREE.MeshBasicMaterial({ color: 0x71e2b8 });

  const hull = new THREE.Mesh(new THREE.ConeGeometry(0.55, 2.4, 6), hullMaterial);
  hull.rotation.x = -Math.PI / 2;
  hull.position.z = -0.15;
  ship.add(hull);

  const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.36, 18, 10), darkMaterial);
  cockpit.scale.set(0.8, 0.55, 1.25);
  cockpit.position.set(0, 0.32, 0.15);
  ship.add(cockpit);

  const wings = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.12, 0.85), hullMaterial);
  wings.position.z = 0.45;
  ship.add(wings);

  for (const x of [-0.42, 0.42]) {
    const engine = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.22, 0.55, 12), darkMaterial);
    engine.rotation.x = Math.PI / 2;
    engine.position.set(x, -0.05, 0.85);
    ship.add(engine);

    const glow = new THREE.Mesh(new THREE.CircleGeometry(0.13, 16), signalMaterial);
    glow.position.set(x, -0.05, 1.135);
    glow.rotation.y = Math.PI;
    ship.add(glow);
  }

  ship.position.set(LANES[targetLane], 0.45, PLAYER_Z);
  ship.scale.setScalar(0.92);
  world.add(ship);
  return ship;
}

function createBackdrop() {
  const stars = new Float32Array(600 * 3);
  for (let index = 0; index < stars.length; index += 3) {
    stars[index] = THREE.MathUtils.randFloatSpread(80);
    stars[index + 1] = THREE.MathUtils.randFloat(2, 32);
    stars[index + 2] = THREE.MathUtils.randFloat(-105, 10);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(stars, 3));
  const material = new THREE.PointsMaterial({
    color: 0xc8f9e7,
    size: 0.12,
    transparent: true,
    opacity: 0.72,
    sizeAttenuation: true,
  });
  scene.add(new THREE.Points(geometry, material));

  const moon = new THREE.Mesh(
    new THREE.IcosahedronGeometry(6, 2),
    new THREE.MeshStandardMaterial({
      color: 0x213b36,
      roughness: 0.95,
      emissive: 0x0c1614,
    }),
  );
  moon.position.set(-25, 16, -72);
  scene.add(moon);
}

function createBarrier(lane, z) {
  const group = new THREE.Group();
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x2b1716,
    emissive: 0x571913,
    emissiveIntensity: 1.4,
    roughness: 0.42,
    metalness: 0.4,
  });
  const warningMaterial = new THREE.MeshBasicMaterial({ color: 0xff6b5e });

  const block = new THREE.Mesh(new THREE.BoxGeometry(2.25, 2.15, 0.7), frameMaterial);
  block.position.y = 0.75;
  group.add(block);

  for (const x of [-0.7, 0, 0.7]) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.7, 0.04), warningMaterial);
    stripe.rotation.z = -0.42;
    stripe.position.set(x, 0.75, 0.38);
    group.add(stripe);
  }

  group.position.set(LANES[lane], 0, z);
  group.userData = { type: "barrier", checked: false };
  world.add(group);
  activeObjects.push(group);
}

function createEnergyCore(lane, z) {
  const group = new THREE.Group();
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.53, 0.12, 10, 28),
    new THREE.MeshStandardMaterial({
      color: 0x71e2b8,
      emissive: 0x2b9c76,
      emissiveIntensity: 2.2,
      roughness: 0.25,
      metalness: 0.35,
    }),
  );
  const core = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.26),
    new THREE.MeshBasicMaterial({ color: 0xd8fff0 }),
  );
  group.add(ring, core);
  group.position.set(LANES[lane], 0.75, z);
  group.userData = { type: "energy", checked: false };
  world.add(group);
  activeObjects.push(group);
}

function spawnRow() {
  const barrierLane = Math.floor(Math.random() * LANES.length);
  createBarrier(barrierLane, SPAWN_Z);

  const safeLanes = [0, 1, 2].filter((lane) => lane !== barrierLane);
  const coreLane = safeLanes[Math.floor(Math.random() * safeLanes.length)];
  createEnergyCore(coreLane, SPAWN_Z - 1.5);

  if (Math.random() > 0.62) {
    createEnergyCore(safeLanes.find((lane) => lane !== coreLane), SPAWN_Z - 5.5);
  }
}

function clearActiveObjects() {
  for (const object of activeObjects) {
    world.remove(object);
    disposeObject(object);
  }
  activeObjects.length = 0;
}

function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) child.material.dispose();
  });
}

function move(direction) {
  if (gameState !== "running") return;
  targetLane = THREE.MathUtils.clamp(targetLane + direction, 0, LANES.length - 1);
}

function startGame() {
  clearActiveObjects();
  targetLane = 1;
  player.position.set(LANES[targetLane], 0.45, PLAYER_Z);
  player.rotation.set(0, 0, 0);
  score = 0;
  speed = 18;
  spawnTimer = 0.4;
  elapsed = 0;
  scoreElement.textContent = formatScore(score);
  gameState = "running";
  document.body.classList.add("game-is-running");
  setOverlay(startOverlay, false);
  setOverlay(pauseOverlay, false);
  setOverlay(gameOverOverlay, false);
  pauseButton.disabled = false;
  pauseButton.querySelector("span").textContent = "\u2161";
  pauseButton.setAttribute("aria-label", "Pause game");
  clock.start();
}

function togglePause(forceResume = false) {
  if (gameState === "ready" || gameState === "over") return;

  if (gameState === "paused" || forceResume) {
    gameState = "running";
    document.body.classList.add("game-is-running");
    setOverlay(pauseOverlay, false);
    pauseButton.querySelector("span").textContent = "\u2161";
    pauseButton.setAttribute("aria-label", "Pause game");
    clock.start();
    return;
  }

  gameState = "paused";
  document.body.classList.remove("game-is-running");
  setOverlay(pauseOverlay, true);
  pauseButton.querySelector("span").textContent = "\u25b6";
  pauseButton.setAttribute("aria-label", "Resume game");
}

function endGame() {
  gameState = "over";
  document.body.classList.remove("game-is-running");
  const roundedScore = Math.floor(score);
  finalScoreElement.textContent = roundedScore.toLocaleString();
  pauseButton.disabled = true;

  if (roundedScore > bestScore) {
    bestScore = roundedScore;
    localStorage.setItem(STORAGE_KEY, String(bestScore));
    bestScoreElement.textContent = formatScore(bestScore);
  }

  setOverlay(gameOverOverlay, true);
}

function setOverlay(element, visible) {
  element.classList.toggle("is-visible", visible);
  element.setAttribute("aria-hidden", String(!visible));
}

function formatScore(value) {
  return Math.floor(value).toString().padStart(5, "0");
}

function updateGame(delta) {
  elapsed += delta;
  speed = Math.min(34, 18 + elapsed * 0.32);
  score += delta * speed * 2.2;
  scoreElement.textContent = formatScore(score);

  const desiredX = LANES[targetLane];
  player.position.x = THREE.MathUtils.damp(player.position.x, desiredX, 10, delta);
  player.position.y = 0.47 + Math.sin(elapsed * 6) * 0.06;
  player.rotation.z = THREE.MathUtils.damp(
    player.rotation.z,
    (player.position.x - desiredX) * 0.18,
    8,
    delta,
  );

  for (const segment of trackSegments) {
    segment.position.z += speed * delta;
    if (segment.position.z > 14.7) segment.position.z -= 77;
  }

  spawnTimer -= delta;
  if (spawnTimer <= 0) {
    spawnRow();
    spawnTimer = Math.max(0.72, 1.12 - elapsed * 0.004);
  }

  for (let index = activeObjects.length - 1; index >= 0; index -= 1) {
    const object = activeObjects[index];
    object.position.z += speed * delta;

    if (object.userData.type === "energy") {
      object.rotation.y += delta * 2.6;
      object.rotation.z += delta * 1.2;
    }

    const nearPlayer = Math.abs(object.position.z - PLAYER_Z) < 1.05;
    const sameLane = Math.abs(object.position.x - player.position.x) < 1.05;

    if (!object.userData.checked && nearPlayer && sameLane) {
      object.userData.checked = true;
      if (object.userData.type === "barrier") {
        endGame();
        return;
      }

      score += 125;
      object.visible = false;
    }

    if (object.position.z > DESPAWN_Z) {
      world.remove(object);
      activeObjects.splice(index, 1);
      disposeObject(object);
    }
  }
}

function animate() {
  const delta = Math.min(clock.getDelta(), 0.05);

  if (gameState === "running") {
    updateGame(delta);
  } else {
    player.position.y = 0.47 + Math.sin(performance.now() * 0.0025) * 0.06;
    player.rotation.y = Math.sin(performance.now() * 0.0008) * 0.08;
  }

  renderer.render(scene, camera);
}

function configureCamera() {
  const portrait = window.innerWidth / window.innerHeight < 0.72;
  camera.fov = portrait ? 82 : 58;
  camera.position.set(0, portrait ? 7.2 : 6.2, portrait ? 15 : 12);
  camera.lookAt(0, 0.4, portrait ? -10 : -12);
  camera.updateProjectionMatrix();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  configureCamera();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
}

createTrack();
createBackdrop();
player = createPlayer();
renderer.setAnimationLoop(animate);
loadingMessage.classList.add("is-hidden");

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
resumeButton.addEventListener("click", () => togglePause(true));
pauseButton.addEventListener("click", () => togglePause());
document.querySelector("#move-left").addEventListener("pointerdown", () => move(-1));
document.querySelector("#move-right").addEventListener("pointerdown", () => move(1));

window.addEventListener("keydown", (event) => {
  if (["ArrowLeft", "ArrowRight", "Space"].includes(event.code)) event.preventDefault();

  if (event.code === "ArrowLeft" || event.code === "KeyA") move(-1);
  if (event.code === "ArrowRight" || event.code === "KeyD") move(1);
  if (event.code === "KeyP" || event.code === "Escape") togglePause();
  if (event.code === "Space" && (gameState === "ready" || gameState === "over")) startGame();
  if (event.code === "Space" && gameState === "paused") togglePause(true);
});

canvas.addEventListener("pointerdown", (event) => {
  touchStartX = event.clientX;
});

canvas.addEventListener("pointerup", (event) => {
  if (touchStartX === null) return;
  const distance = event.clientX - touchStartX;
  if (Math.abs(distance) > 30) move(distance > 0 ? 1 : -1);
  touchStartX = null;
});

window.addEventListener("blur", () => {
  if (gameState === "running") togglePause();
});
window.addEventListener("resize", onResize);
