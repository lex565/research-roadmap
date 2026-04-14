// ============================================================
// AUTO-PLAY — scrolls the whole page, globe syncs automatically
// Journey section waypoints are hit by precise scroll positions
// ============================================================

let playing   = false;
let stopped   = false;
let rafId     = null;

// Journey waypoints: [progress 0-1, dwell ms after arriving]
const JOURNEY_STEPS = [
  [0.00, 2000],  // global — Asia from space
  [0.07, 4000],  // Hangzhou — country level
  [0.16, 5000],  // Hangzhou — street level (satellite fades in)
  [0.23, 1800],  // pull back over Indian Ocean
  [0.31, 4000],  // Zimbabwe — country level
  [0.40, 5500],  // Harare — street level (satellite fades in)
  [0.48, 5000],  // Southern Africa — regional / cyclone belt
  [0.62, 1800],  // pull back
  [0.70, 4000],  // Hangzhou return — country
  [0.80, 5000],  // Hangzhou return — street (satellite fades in)
  [0.88, 1800],  // pull back
  [1.00, 4000],  // World view — "What comes next?"
];

// Sections after journey: [selector, dwell ms]
const POST_SECTIONS = [
  ['#profile',   5000],
  ['#weaknesses',6000],
  ['#courses',   4500],
  ['#roadmap',   6500],
];

// ── Init ──────────────────────────────────────────────────
export function initAutoPlay() {
  document.getElementById('btn-play-journey')
    ?.addEventListener('click', startAutoPlay);

  document.getElementById('autoplay-stop-btn')
    ?.addEventListener('click', stopAutoPlay);
}

// ── Start ─────────────────────────────────────────────────
async function startAutoPlay() {
  if (playing) return;
  playing = true;
  stopped = false;

  _showStopBtn(true);
  _setProgress(0);

  // 1. Jump to top instantly
  window.scrollTo(0, 0);
  await _wait(600);

  // 2. Hero — let globe spin
  if (stopped) return _cleanup();
  _setProgress(0.03);
  await _wait(2500);

  // 3. Scroll to journey section intro
  if (stopped) return _cleanup();
  const journeySection = document.getElementById('journey-map');
  const journeyTop = _absTop(journeySection);
  await _scrollTo(journeyTop, 1400);
  await _wait(800);

  // 4. Drive through journey waypoints
  const container = journeySection.querySelector('.journey-scroll-container');
  const containerTop = _absTop(container);
  const containerScrollable = container.offsetHeight - window.innerHeight;

  const journeyProgressPerStep = 0.45 / JOURNEY_STEPS.length; // journey = 45% of total progress
  for (let i = 0; i < JOURNEY_STEPS.length; i++) {
    if (stopped) return _cleanup();
    const [pct, dwell] = JOURNEY_STEPS[i];
    const targetY = containerTop + pct * containerScrollable;
    await _scrollTo(targetY, 2400);
    _setProgress(0.05 + (i + 1) * journeyProgressPerStep);
    await _wait(dwell);
  }

  // 5. Drive through post-journey sections
  const postProgressPerStep = 0.45 / POST_SECTIONS.length;
  for (let i = 0; i < POST_SECTIONS.length; i++) {
    if (stopped) return _cleanup();
    const [sel, dwell] = POST_SECTIONS[i];
    const el = document.querySelector(sel);
    if (!el) continue;
    await _scrollTo(_absTop(el), 1800);
    _setProgress(0.5 + (i + 1) * postProgressPerStep);
    await _wait(dwell);
  }

  // 6. Scroll to very bottom
  if (!stopped) {
    await _scrollTo(document.body.scrollHeight, 2000);
    _setProgress(1);
    await _wait(2000);
  }

  _cleanup();
}

// ── Stop ──────────────────────────────────────────────────
export function stopAutoPlay() {
  stopped = true;
  cancelAnimationFrame(rafId);
  _cleanup();
}

function _cleanup() {
  playing = false;
  stopped = false;
  _showStopBtn(false);
  setTimeout(() => _setProgress(0), 800);
}

// ── Smooth scroll to absolute Y ───────────────────────────
function _scrollTo(targetY, duration) {
  return new Promise(resolve => {
    const startY    = window.scrollY;
    const distance  = targetY - startY;
    const startTime = performance.now();

    function step(now) {
      if (stopped) { resolve(); return; }
      const elapsed = now - startTime;
      const t       = Math.min(elapsed / duration, 1);
      const ease    = t < 0.5 ? 2*t*t : -1 + (4-2*t)*t;
      window.scrollTo(0, startY + distance * ease);
      if (t < 1) rafId = requestAnimationFrame(step);
      else resolve();
    }
    rafId = requestAnimationFrame(step);
  });
}

// ── Helpers ───────────────────────────────────────────────
function _wait(ms) {
  return new Promise(resolve => {
    if (stopped) { resolve(); return; }
    const id = setTimeout(resolve, ms);
    // Poll for stop
    const check = setInterval(() => { if (stopped) { clearTimeout(id); clearInterval(check); resolve(); } }, 50);
    setTimeout(() => clearInterval(check), ms + 100);
  });
}

function _absTop(el) {
  return el.getBoundingClientRect().top + window.scrollY;
}

function _setProgress(pct) {
  const bar = document.getElementById('autoplay-progress-fill');
  if (bar) bar.style.width = `${Math.min(pct * 100, 100)}%`;
}

function _showStopBtn(show) {
  const btn = document.getElementById('autoplay-stop-btn');
  if (btn) btn.classList.toggle('visible', show);
  const bar = document.getElementById('autoplay-progress-bar');
  if (bar) bar.classList.toggle('visible', show);
  // Dim play button while playing
  const playBtn = document.getElementById('btn-play-journey');
  if (playBtn) playBtn.style.opacity = show ? '0.45' : '1';
}
