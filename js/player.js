// ============================================================
// Journey Player — the animated scene-by-scene tour
// ============================================================
import { SCENES } from './data.js';
import { setTheme } from './three-bg.js';

let currentIndex = 0;
let isPlaying = false;
let typewriterTimer = null;
let autoAdvanceTimer = null;

// DOM refs (set on init)
let playerEl, bgEl, titleEl, subtitleEl, storyEl, milestoneEl,
    sceneNumEl, progressFillEl, dotsEl, prevBtn, nextBtn, playPauseBtn;

export function initPlayer() {
  playerEl     = document.getElementById('journey-player');
  bgEl         = playerEl.querySelector('.player-bg');
  titleEl      = playerEl.querySelector('.scene-title');
  subtitleEl   = playerEl.querySelector('.scene-subtitle');
  storyEl      = playerEl.querySelector('.story-text');
  milestoneEl  = playerEl.querySelector('.scene-milestone');
  sceneNumEl   = playerEl.querySelector('.scene-number');
  progressFillEl = playerEl.querySelector('.progress-fill');
  dotsEl       = playerEl.querySelector('.progress-dots');
  prevBtn      = playerEl.querySelector('#ctrl-prev');
  nextBtn      = playerEl.querySelector('#ctrl-next');
  playPauseBtn = playerEl.querySelector('#ctrl-playpause');

  // Build progress dots
  dotsEl.innerHTML = '';
  SCENES.forEach((s, i) => {
    const dot = document.createElement('button');
    dot.className = 'progress-dot';
    dot.setAttribute('aria-label', `Go to scene ${i + 1}`);
    dot.addEventListener('click', () => goToScene(i));
    dotsEl.appendChild(dot);
  });

  // Control listeners
  prevBtn.addEventListener('click', prevScene);
  nextBtn.addEventListener('click', nextScene);
  playPauseBtn.addEventListener('click', toggleAutoPlay);

  playerEl.querySelector('#ctrl-close').addEventListener('click', closePlayer);

  // Keyboard navigation
  document.addEventListener('keydown', onKeyDown);
}

export function openPlayer(startIndex = 0) {
  currentIndex = startIndex;
  playerEl.classList.add('active');
  document.body.style.overflow = 'hidden';
  goToScene(currentIndex, true);
}

export function closePlayer() {
  playerEl.classList.remove('active');
  document.body.style.overflow = '';
  clearTypewriter();
  clearAutoAdvance();
  isPlaying = false;
  updatePlayPauseBtn();
  setTheme('default');
}

function goToScene(index, immediate = false) {
  if (index < 0 || index >= SCENES.length) return;
  clearTypewriter();
  clearAutoAdvance();

  currentIndex = index;
  const scene = SCENES[index];

  // Fade out current content
  if (!immediate) {
    titleEl.classList.remove('scene-visible');
    titleEl.classList.add('scene-fade');
    storyEl.style.opacity = '0';
  }

  // Update background
  bgEl.style.background = scene.palette.bg;
  bgEl.style.transition = 'background 1.2s ease';
  setTheme(scene.theme);

  // Update progress
  const pct = ((index + 1) / SCENES.length) * 100;
  progressFillEl.style.width = `${pct}%`;

  // Update dots
  dotsEl.querySelectorAll('.progress-dot').forEach((dot, i) => {
    dot.className = 'progress-dot';
    if (i < index)  dot.classList.add('done');
    if (i === index) dot.classList.add('active');
  });

  // Update scene number
  sceneNumEl.textContent = `${String(index + 1).padStart(2, '0')} / ${String(SCENES.length).padStart(2, '0')}`;

  // Update milestone
  milestoneEl.textContent = scene.milestone;

  // Update controls
  prevBtn.disabled = (index === 0);
  nextBtn.disabled = (index === SCENES.length - 1);

  // Delay text update for transition
  const delay = immediate ? 0 : 600;
  setTimeout(() => {
    titleEl.textContent = scene.title;
    subtitleEl.textContent = scene.subtitle;
    titleEl.style.color = scene.palette.accent;
    titleEl.classList.remove('scene-fade');
    titleEl.classList.add('scene-visible');
    storyEl.style.opacity = '1';
    storyEl.style.transition = 'opacity 0.6s ease';
    startTypewriter(scene.story);
  }, delay);
}

// ── Typewriter ──
function startTypewriter(text) {
  storyEl.innerHTML = '';
  const paragraphs = text.trim().split('\n\n');
  let pIndex = 0;
  let cIndex = 0;
  let currentP = null;

  function typeNext() {
    if (pIndex >= paragraphs.length) return;

    if (!currentP) {
      currentP = document.createElement('p');
      storyEl.appendChild(currentP);
    }

    const para = paragraphs[pIndex];
    if (cIndex < para.length) {
      currentP.textContent = para.substring(0, cIndex + 1);
      cIndex++;
      const speed = para[cIndex - 1] === '\n' ? 40 : 18;
      typewriterTimer = setTimeout(typeNext, speed);
    } else {
      // End of paragraph
      pIndex++;
      cIndex = 0;
      currentP = null;
      if (pIndex < paragraphs.length) {
        typewriterTimer = setTimeout(typeNext, 300);
      }
    }
    storyEl.scrollTop = storyEl.scrollHeight;
  }

  typewriterTimer = setTimeout(typeNext, 300);
}

function clearTypewriter() {
  if (typewriterTimer) { clearTimeout(typewriterTimer); typewriterTimer = null; }
}

// ── Auto-advance ──
function startAutoAdvance() {
  clearAutoAdvance();
  // Advance every 18 seconds
  autoAdvanceTimer = setInterval(() => {
    if (currentIndex < SCENES.length - 1) {
      nextScene();
    } else {
      // End of tour — pause
      isPlaying = false;
      updatePlayPauseBtn();
      clearAutoAdvance();
    }
  }, 18000);
}

function clearAutoAdvance() {
  if (autoAdvanceTimer) { clearInterval(autoAdvanceTimer); autoAdvanceTimer = null; }
}

function toggleAutoPlay() {
  isPlaying = !isPlaying;
  updatePlayPauseBtn();
  if (isPlaying) {
    startAutoAdvance();
  } else {
    clearAutoAdvance();
  }
}

function updatePlayPauseBtn() {
  playPauseBtn.textContent = isPlaying ? '⏸ Pause' : '▶ Play';
}

function prevScene() {
  if (currentIndex > 0) goToScene(currentIndex - 1);
}

function nextScene() {
  if (currentIndex < SCENES.length - 1) goToScene(currentIndex + 1);
  else {
    // Last scene — offer to close or show roadmap
    closePlayer();
    document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });
  }
}

function onKeyDown(e) {
  if (!playerEl.classList.contains('active')) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextScene();
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prevScene();
  if (e.key === 'Escape') closePlayer();
  if (e.key === ' ') { e.preventDefault(); toggleAutoPlay(); }
}
