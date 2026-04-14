// ============================================================
// MAIN — app entry point
// ============================================================
import { SCENES, PROFILE, RESEARCH, WEAKNESSES, COURSES } from './data.js';
import { initThreeBackground, setTheme } from './three-bg.js';
import { initPlayer, openPlayer } from './player.js';
import { initGlobe } from './globe.js';
import { initAutoPlay } from './autoplay.js';

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  initThreeBackground('bg-canvas');
  initPlayer();
  initGlobe();
  buildProfileSection();
  buildWeaknessesSection();
  buildCoursesSection();
  buildRoadmapTimeline();
  initScrollReveal();
  initHero();
  initAutoPlay();
});

// ── Hero ──
function initHero() {
  // btn-play-journey is handled by initAutoPlay (full page auto-play)
  document.getElementById('btn-skip-to-map')?.addEventListener('click', () => {
    document.getElementById('journey-map')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// ── Profile ──
function buildProfileSection() {
  // Publication
  const pubCard = document.getElementById('pub-card');
  if (pubCard && PROFILE.publication) {
    const p = PROFILE.publication;
    pubCard.innerHTML = `
      <div class="pub-level">${p.level}</div>
      <div class="pub-title">${p.title}</div>
      <div class="pub-meta">${p.journal} · ${p.year}</div>
      <a class="pub-link" href="${p.doi}" target="_blank" rel="noopener">
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
        </svg>
        doi.org link
      </a>
    `;
  }

  // AI Tools
  const toolsGrid = document.getElementById('ai-tools-grid');
  if (toolsGrid) {
    toolsGrid.innerHTML = PROFILE.tools.map(t => `
      <div class="ai-tool-card">
        <div class="ai-tool-logo" style="background:${t.color}22; color:${t.color}; border:1px solid ${t.color}44">
          ${t.name === 'Claude Code' ? '◆' : '✦'}
        </div>
        <div class="ai-tool-name">${t.name}</div>
        <div class="ai-tool-role">${t.role}</div>
      </div>
    `).join('');
  }

  // Research overview
  const abstractEl = document.getElementById('research-abstract-text');
  if (abstractEl) abstractEl.textContent = RESEARCH.abstract.replace(/\s+/g, ' ').trim();

  const dataChips = document.getElementById('data-chips');
  if (dataChips) {
    dataChips.innerHTML = RESEARCH.keyData.map(d => `<div class="data-chip">${d}</div>`).join('');
  }

  // Key findings
  const findingsEl = document.getElementById('key-findings-list');
  if (findingsEl) {
    findingsEl.innerHTML = RESEARCH.keyFindings.map((f, i) => `
      <div class="finding-item reveal">
        <div class="finding-num">F${String(i+1).padStart(2,'0')}</div>
        <div>${f}</div>
      </div>
    `).join('');
  }
}

// ── Weaknesses ──
function buildWeaknessesSection() {
  const catContainer = document.getElementById('weakness-categories');
  if (!catContainer) return;

  catContainer.innerHTML = WEAKNESSES.categories.map(cat => `
    <div class="weakness-category reveal" style="border-color:${cat.color}22">
      <div class="weakness-cat-header" style="border-color:${cat.color}22">
        <div class="weakness-cat-icon">${cat.icon}</div>
        <div class="weakness-cat-name" style="color:${cat.color}">${cat.name}</div>
      </div>
      <div class="weakness-items">
        ${cat.items.map(item => `
          <div class="weakness-item" data-id="${item.id}">
            <div class="weakness-id">#${item.id}</div>
            <div>
              <div class="weakness-item-title">${item.title}</div>
              <div class="weakness-item-detail">${item.detail}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Toggle expand on click
  catContainer.addEventListener('click', (e) => {
    const item = e.target.closest('.weakness-item');
    if (item) item.classList.toggle('expanded');
  });

  // 5 non-negotiables
  const rulesEl = document.getElementById('five-rules-list');
  if (rulesEl) {
    rulesEl.innerHTML = WEAKNESSES.fiveNonNegotiables.map((r, i) => `
      <div class="rule-item reveal">
        <div class="rule-num">${i + 1}</div>
        <div>${r}</div>
      </div>
    `).join('');
  }
}

// ── Courses ──
function buildCoursesSection() {
  const sem1El = document.getElementById('sem1-courses');
  const sem2El = document.getElementById('sem2-courses');

  if (sem1El) {
    sem1El.innerHTML = COURSES.semester1.courses.map(c => `
      <div class="course-item">
        <div class="course-name">
          <div class="course-dot" style="background:${c.color}"></div>
          ${c.name}
        </div>
        <div class="course-relevance">${c.relevance}</div>
      </div>
    `).join('');
  }

  if (sem2El) {
    sem2El.innerHTML = COURSES.semester2.courses.map(c => `
      <div class="course-item">
        <div class="course-name">
          <div class="course-dot" style="background:${c.color}"></div>
          ${c.name}
          ${c.key ? '<span class="key-badge">key</span>' : ''}
        </div>
        <div class="course-relevance">${c.relevance}</div>
      </div>
    `).join('');
  }
}

// ── Roadmap timeline ──
function buildRoadmapTimeline() {
  const el = document.getElementById('roadmap-timeline');
  if (!el) return;

  const events = [
    {
      period: 'Sept 2025',
      event: 'MSc Programme Begins — Beihang University',
      detail: 'Enrolment, orientation, and first semester coursework. Seven courses across remote sensing, GNSS, space technology, statistics, and spatial data science.',
      future: false
    },
    {
      period: 'Oct – Dec 2025',
      event: 'Research Topic Selection & Conceptualization',
      detail: 'SIF selected as primary variable. Study area defined as Southern Africa. Cyclones Idai, Chalane, and Freddy identified as primary case studies. Framework built across three iterations.',
      future: false
    },
    {
      period: 'Feb 2026',
      event: 'Semester 2 Begins — Parallel Research Track',
      detail: 'Five courses run alongside the manuscript: Scientific Writing, AI & Large Models, IPRS, HyPlant Team Project, Chinese 2. Weekly supervisor meetings begin formally.',
      future: false
    },
    {
      period: 'Feb – Apr 2026',
      event: 'Data Analysis & Results',
      detail: 'TROPOSIF extraction pipeline built in Python (6 scripts). CHIRPS integration. BIOME classification. Key findings confirmed: SIF detects photosynthetic suppression before NDVI registers structural change.',
      future: false
    },
    {
      period: 'Apr 2026',
      event: 'Methods Section — 4 Revisions',
      detail: 'Four complete rewrites of the Methods section following supervisor (Prof. Feng) feedback. Notation stabilised. Statistical framework formalised. Scale consistency enforced.',
      future: false
    },
    {
      period: 'Apr – Jul 2026',
      event: 'Manuscript Finalisation',
      detail: 'Results section complete. Discussion drafted. Limitation section expanded to actively constrain conclusions. Figure set finalised. Pre-submission internal review.',
      future: true
    },
    {
      period: 'July 2026',
      event: 'Journal Submission — Target: IJAEO',
      detail: `Submission to the International Journal of Applied Earth Observation and Geoinformation. Paper: "${RESEARCH.shortTitle}". The manuscript will be submitted when it is attack-resistant — not when it feels perfect.`,
      future: true
    },
    {
      period: 'Sept 2026',
      event: 'Final Year Begins — Second Manuscript',
      detail: 'Second manuscript: spatial-temporal modelling of SIF recovery trajectories post-cyclone. Integration with Sentinel-1 SAR for structural damage co-analysis. Expanded dataset: all Category 3+ cyclones in the SWIO basin (2000–2024).',
      future: true
    },
    {
      period: '2027',
      event: 'MSc Completion & Thesis Defence',
      detail: 'Two peer-reviewed publications. Thesis spanning SIF methodology, cyclone vegetation response, and recovery modelling across Southern African ecoregions.',
      future: true
    }
  ];

  el.innerHTML = events.map(ev => `
    <div class="timeline-item reveal">
      <div class="timeline-dot${ev.future ? ' future' : ''}"></div>
      <div class="timeline-card">
        <div class="timeline-period">${ev.period}</div>
        ${ev.future ? '<div class="future-badge">◦ Upcoming</div>' : ''}
        <div class="timeline-event">${ev.event}</div>
        <div class="timeline-detail">${ev.detail}</div>
      </div>
    </div>
  `).join('');
}

// ── Scroll reveal ──
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // Re-observe after dynamic content builds
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, 100);

  // Re-observe when new elements are added
  const mutObs = new MutationObserver(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  });
  mutObs.observe(document.body, { childList: true, subtree: true });
}
