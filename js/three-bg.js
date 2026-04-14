// ============================================================
// Three.js particle background engine
// One shared canvas, scene swaps via setTheme(config)
// ============================================================

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';

let renderer, scene, camera, particles, animId;
let currentTheme = null;
let clock;

const THEMES = {
  default:       { color: 0xF59E0B, count: 2000, speed: 0.15, size: 0.025, bg: '#040810' },
  dawn:          { color: 0xF59E0B, count: 1800, speed: 0.25, size: 0.03,  bg: '#0f1923' },
  night:         { color: 0x3B82F6, count: 2500, speed: 0.12, size: 0.018, bg: '#0a0f1e' },
  'green-glow':  { color: 0x10B981, count: 2200, speed: 0.3,  size: 0.022, bg: '#021a0f' },
  'warm-amber':  { color: 0xD97706, count: 1200, speed: 0.1,  size: 0.035, bg: '#1a0f02' },
  storm:         { color: 0x8B5CF6, count: 3500, speed: 0.55, size: 0.015, bg: '#0f0a1a' },
  blueprint:     { color: 0x06B6D4, count: 2800, speed: 0.28, size: 0.02,  bg: '#021020' },
  sunrise:       { color: 0xEC4899, count: 2000, speed: 0.22, size: 0.025, bg: '#1a0820' },
  professional:  { color: 0x60A5FA, count: 1600, speed: 0.15, size: 0.022, bg: '#0a1520' },
  data:          { color: 0x22C55E, count: 2400, speed: 0.35, size: 0.018, bg: '#0f1a0a' },
  horizon:       { color: 0xF0ABFC, count: 2000, speed: 0.2,  size: 0.025, bg: '#020f1a' }
};

export function initThreeBackground(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  clock = new THREE.Clock();
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 3;

  _buildParticles(THEMES.default);
  _animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

export function setTheme(slug) {
  const cfg = THEMES[slug] || THEMES.default;
  if (currentTheme === slug) return;
  currentTheme = slug;
  _rebuildParticles(cfg);
}

function _buildParticles(cfg) {
  if (particles) {
    scene.remove(particles);
    particles.geometry.dispose();
    particles.material.dispose();
  }

  const geometry = new THREE.BufferGeometry();
  const count = cfg.count;
  const positions = new Float32Array(count * 3);
  const randoms    = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    randoms[i] = Math.random();
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aRandom',  new THREE.BufferAttribute(randoms, 1));

  const material = new THREE.PointsMaterial({
    color: cfg.color,
    size: cfg.size,
    transparent: true,
    opacity: 0.75,
    sizeAttenuation: true,
    depthWrite: false
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);
  particles.userData = { speed: cfg.speed };
}

function _rebuildParticles(cfg) {
  // Fade out → rebuild → fade in via opacity tween
  const mat = particles?.material;
  if (mat) {
    let t = 0;
    const fadeOut = setInterval(() => {
      t += 0.08;
      mat.opacity = Math.max(0, 0.75 - t);
      if (mat.opacity <= 0) {
        clearInterval(fadeOut);
        _buildParticles(cfg);
        const newMat = particles.material;
        newMat.opacity = 0;
        let t2 = 0;
        const fadeIn = setInterval(() => {
          t2 += 0.05;
          newMat.opacity = Math.min(0.75, t2);
          if (newMat.opacity >= 0.75) clearInterval(fadeIn);
        }, 16);
      }
    }, 16);
  } else {
    _buildParticles(cfg);
  }
}

function _animate() {
  animId = requestAnimationFrame(_animate);
  const elapsed = clock.getElapsedTime();

  if (particles) {
    const speed = particles.userData.speed || 0.15;
    particles.rotation.y = elapsed * speed * 0.08;
    particles.rotation.x = elapsed * speed * 0.05;

    // Subtle breathing
    const scale = 1 + Math.sin(elapsed * 0.5) * 0.015;
    particles.scale.setScalar(scale);
  }

  renderer.render(scene, camera);
}

export function destroyThreeBackground() {
  cancelAnimationFrame(animId);
  if (particles) { scene.remove(particles); particles.geometry.dispose(); particles.material.dispose(); }
  renderer?.dispose();
}
