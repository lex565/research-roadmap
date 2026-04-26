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
  buildAICourseSection();
  buildRoadmapTimeline();
  initScrollReveal();
  initHero();
  initAutoPlay();
  // initPDFDownload(); // Disabled temporarily — investigating animation issues
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
  // Profile photo — swap in real photo if available, fall back to initials
  const photoArea = document.querySelector('.profile-photo-placeholder');
  if (photoArea) {
    const img = new Image();
    img.onload = () => {
      photoArea.innerHTML = '';
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      img.alt = 'Tanaka Alex Mbendana';
      photoArea.style.padding = '0';
      photoArea.appendChild(img);
    };
    img.src = 'images/profile.jpg';
  }

  // Beihang logo — replace plain text university with logo
  const uniEl = document.querySelector('.profile-uni');
  if (uniEl) {
    uniEl.innerHTML = `
      <img src="images/beihang-logo.png" alt="Beihang University"
           style="height:28px;object-fit:contain;vertical-align:middle;margin-right:8px;filter:drop-shadow(0 0 4px rgba(255,255,255,0.3));">
      Beihang University, Hangzhou · 2025 – 2027
    `;
  }

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

  // Research overview — describe the study, don't list findings
  const abstractEl = document.getElementById('research-abstract-text');
  if (abstractEl) abstractEl.textContent = RESEARCH.abstract.replace(/\s+/g, ' ').trim();

  const dataChips = document.getElementById('data-chips');
  if (dataChips) {
    dataChips.innerHTML = RESEARCH.keyData.map(d => `<div class="data-chip">${d}</div>`).join('');
  }

  // AI story — replaces the key-findings list
  const findingsEl = document.getElementById('key-findings-list');
  if (findingsEl) {
    findingsEl.innerHTML = `
      <div class="ai-story-text reveal">
        <p>
          Long before AI became a course topic at Beihang, it was already part of how I worked.
          I had been using ChatGPT since 2023 — not as a shortcut, but as a thinking partner.
          When I couldn't articulate a concept clearly, I'd argue it out with the model until
          the logic held. When a method felt shaky, I'd describe it to ChatGPT and let the
          holes surface through the questions it asked back.
        </p>
        <p>
          The most important thing AI ever did for my research was the diagnosis. I asked
          ChatGPT to evaluate me — not to reassure me, but to find what was structurally wrong.
          It came back with 28 identified patterns across six categories. At the centre of
          all of them was perfectionism: the habit of optimising for being right rather than
          being attack-resistant. That single insight, surfaced through an AI-assisted
          self-assessment, changed how I approach every piece of work since.
        </p>
        <p>
          Claude Code entered the workflow at the manuscript stage. It built the entire
          Python processing pipeline — TROPOSIF extraction, footprint masking, CHIRPS
          integration, statistical testing, figure generation. Six scripts. Every figure
          in the paper came from code we wrote together in this city, describing a geography
          10,000 km away.
        </p>
        <p>
          For the second manuscript and beyond, AI is not a tool I turn to when I am stuck.
          It is a permanent part of the research architecture — from hypothesis stress-testing
          to SAR integration pipelines to writing iteration. The question is not whether to
          use AI in scientific research. The question is how to use it rigorously enough that
          it sharpens rather than softens the work.
        </p>
        <p style="color:var(--accent-gold);font-style:italic;margin-top:1rem">
          "The goal is not to let AI think for you. The goal is to let it
          show you where your thinking breaks down."
        </p>
      </div>
    `;
  }
}

// ── Weaknesses ──
function buildWeaknessesSection() {
  const catContainer = document.getElementById('weakness-categories');
  if (catContainer) {
    catContainer.innerHTML = `
      <div class="weakness-paragraph reveal">
        <p>
          Perfectionism is the theme that runs through everything. At its worst, it disguises
          itself as discipline. In practice, it is a fear of exposure. I delay showing work
          not because it genuinely needs more polish, but because I already know where the
          gaps are and I do not want anyone else to find them before I close them myself.
          A structured self-assessment conducted with ChatGPT surfaced this as the root cause
          behind 28 distinct patterns across six categories of weakness.
        </p>
        <p>
          The downstream effects are predictable once you see them clearly. I would build
          conceptual frameworks before the core results were stable. I would over-iterate
          internally instead of exposing drafts early to external critique. I would allow
          spatial scale inconsistencies to persist in the analysis because committing to one
          scale felt like closing a door I might need later. All of these are perfectionism
          in disguise — a reluctance to make the work vulnerable before it is "ready", even
          though readiness is precisely what external feedback produces.
        </p>
        <p>
          The remaining weaknesses, including causality overreach, weak separation of claim
          types, and precision loss under complexity, are secondary. They matter, and they
          are being addressed, but they are not the engine. The engine is the same impulse
          to optimise for being right rather than being attack-resistant. The Scientific
          Writing course at Beihang made this worse before it made it better: learning exactly
          what a rigorous paper looks like raised the internal bar to a height I could not yet
          reach, which caused more delay. The cure turned out to be the same as the diagnosis:
          expose the work earlier, let it be broken deliberately, and iterate with external
          feedback rather than internal perfection.
        </p>
        <p style="color:var(--accent-gold);font-style:italic">
          The question is not "Is this good enough?" It is "Can this survive peer review?"
          Those two questions produce completely different papers.
        </p>
      </div>
    `;
  }

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
      period: 'The Beginning',
      event: 'Mutare, Zimbabwe — where it starts',
      detail: 'A city at the foot of the Chimanimani mountains. A bachelor\'s degree. One published paper on change detection techniques in developing countries. That paper was not just an academic exercise. It was proof that a rigorous question, asked carefully, can produce something that holds. It became the driver for everything that followed.',
      future: false
    },
    {
      period: 'September 2025',
      event: 'Arrival — Beihang University, Hangzhou',
      detail: 'Ten thousand kilometres from home. Seven courses in the first semester. A research idea barely a sentence long. The move from Mutare to Hangzhou was not just geographic. It was a shift in what was possible to ask about the world and what tools existed to answer it.',
      future: false
    },
    {
      period: 'October – December 2025',
      event: 'The question takes shape',
      detail: 'SIF selected as the primary variable. Not NDVI — SIF. Solar Induced Fluorescence from the TROPOMI sensor, which measures whether vegetation is still photosynthesising, not just whether it is still standing. Southern Africa. Cyclones Idai, Chalane, Freddy. Three storms. One framework built across three iterations before it was defensible.',
      future: false
    },
    {
      period: 'February 2026',
      event: 'Semester 2 — everything running at once',
      detail: 'Five courses alongside an active manuscript. Scientific Writing. AI and Large Models. Intelligent Processing of Remote Sensing Images. The HyPlant team project. Weekly supervisor meetings. The schedule was not comfortable. That was exactly the point.',
      future: false
    },
    {
      period: 'February – April 2026',
      event: 'The analysis',
      detail: 'A six-script Python pipeline built with Claude Code: TROPOSIF extraction, footprint masking, CHIRPS rainfall integration, ecoregion stratification, statistical testing, figure generation. The SIF signal drop during Idai\'s landfall — visible at the 1-degree footprint scale, invisible at country level — anchored the entire spatial aggregation argument.',
      future: false
    },
    {
      period: 'April 2026',
      event: 'Four Methods revisions',
      detail: 'Not because the Methods were wrong. Because defensible and technically correct are two different things at publication level. Prof. Feng\'s feedback: "You are reporting a relationship. You are not explaining why it exists at this scale." Four revisions later, the notation is stable, the statistical framework is formalised, and the limitation section actively constrains the conclusions rather than merely listing them.',
      future: false
    },
    {
      period: 'April – July 2026',
      event: 'Making it attack-resistant',
      detail: 'The manuscript is not being finished. It is being hardened. Results complete. Discussion drafted. Every claim has a level: observation, association, or mechanism. Nothing overreaches. The paper will be submitted when it can survive peer review, not when it feels perfect.',
      future: true
    },
    {
      period: 'July 2026',
      event: 'Journal submission — International Journal of Applied Earth Observation',
      detail: 'The first peer-reviewed output of the MSc. The paper that started as a question in Mutare and was built in Hangzhou. Solar Induced Fluorescence as a Diagnostic of Tropical Cyclone Impacts on Vegetation in Southern Africa. Submitted when it is ready. Not before.',
      future: true
    },
    {
      period: 'September 2026',
      event: 'The second manuscript begins',
      detail: 'Spatial-temporal modelling of SIF recovery trajectories post-cyclone. Sentinel-1 SAR integration for structural damage co-analysis. The full SWIO cyclone basin, 2000 to 2024. The first paper asks what impact looks like in SIF. The second asks how long recovery takes and what predicts it.',
      future: true
    },
    {
      period: '2027',
      event: 'MSc completion and the road ahead',
      detail: 'Two peer-reviewed publications. A thesis spanning SIF methodology, cyclone vegetation response, and recovery modelling across Southern African ecoregions. And a clear intention: to become a pioneer in the use of satellite-derived physiological signals for ecological disturbance science in the Global South. The field is young. The data exists. The gap is real. And there is no reason it cannot be filled by someone from Mutare, Zimbabwe.',
      future: true
    }
  ];

  el.innerHTML = events.map((ev, i) => `
    <div class="timeline-item reveal">
      <div class="timeline-dot${ev.future ? ' future' : ''}"></div>
      <div class="timeline-card">
        <div class="timeline-period">${ev.period}</div>
        ${ev.future ? '<div class="future-badge">Upcoming</div>' : ''}
        <div class="timeline-event">${ev.event}</div>
        <div class="timeline-detail">${ev.detail}</div>
      </div>
    </div>
  `).join('') + `
    <div class="timeline-closing reveal">
      <p>I cannot be Albert Einstein.</p>
      <p>But I can be <strong>Tanaka Alex Mbendana</strong> of my generation.</p>
    </div>
  `;
}

// ── AI Course Section ──
function buildAICourseSection() {
  const nodesEl = document.getElementById('ai-course-nodes');
  if (!nodesEl) return;

  const sessions = [
    { num: '01', title: 'Signal Processing', detail: 'FFT · Nyquist · Butterworth · Bearing Fault Detection', highlight: false },
    { num: '02', title: 'Feature Extraction', detail: 'Time-domain features · Statistical descriptors', highlight: false },
    { num: '03', title: 'Classical ML', detail: 'Decision trees · SVM · k-NN', highlight: false },
    { num: '04', title: 'Ensemble Methods', detail: 'Random Forest · Gradient Boosting', highlight: false },
    { num: '05', title: 'Neural Networks', detail: 'MLP · Backpropagation · Activation functions', highlight: false },
    { num: '06', title: 'CNNs', detail: 'Convolutional layers · Feature maps · Pooling', highlight: false },
    { num: '07', title: 'RNNs & LSTMs', detail: 'Sequence modelling · Temporal dependencies', highlight: false },
    { num: '08', title: 'RAG', detail: 'Retrieval Augmented Generation · Embedding search · LLM grounding', highlight: true },
    { num: '09', title: 'Large Language Models', detail: 'Transformer architecture · Attention · Fine-tuning', highlight: false },
    { num: '10', title: 'Transfer Learning', detail: 'Domain adaptation · MMD loss · CLIMATE_XFER', highlight: true },
  ];

  nodesEl.innerHTML = sessions.map(s => `
    <div class="course-node${s.highlight ? ' course-node-highlight' : ''}">
      <div class="course-node-num">${s.num}</div>
      <div class="course-node-title">${s.title}</div>
      <div class="course-node-detail">${s.detail}</div>
    </div>
  `).join('');
}

// ── PDF Download ──
function initPDFDownload() {
  const downloadBtn = document.getElementById('download-pdf-btn');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', () => {
    downloadBtn.disabled = true;
    downloadBtn.textContent = '⏳ Generating PDF...';

    // Clone the main content (excluding nav, controls, interactive elements)
    const element = document.body.cloneNode(true);

    // Remove interactive elements and backgrounds that don't export well
    const toRemove = element.querySelectorAll(
      '#journey-player, #globe-bg, #globe-overlay, #autoplay-progress-bar, #autoplay-stop-btn, #pdf-download'
    );
    toRemove.forEach(el => el.remove());

    // Hide map backgrounds in cloned version
    const globeBg = element.querySelector('[data-globe]');
    if (globeBg) {
      const clonedSections = element.querySelectorAll('[data-globe]');
      clonedSections.forEach(s => {
        s.style.backgroundColor = '#0F172A';
        s.style.backgroundImage = 'none';
      });
    }

    const opt = {
      margin: 10,
      filename: 'Tanaka_Mbendana_AI_System_Map.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      pagebreak: { avoid: '.skill-card, .growth-card, .professional-card, .ai-takeaway-card' }
    };

    window.html2pdf().set(opt).from(element).save().then(() => {
      downloadBtn.disabled = false;
      downloadBtn.textContent = '↓ Download PDF (Assignment Ready)';
    }).catch(err => {
      console.error('PDF generation failed:', err);
      downloadBtn.disabled = false;
      downloadBtn.textContent = '↓ Download PDF (Assignment Ready)';
      alert('PDF generation failed. Please try again.');
    });
  });
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

  // All build functions run synchronously before this — all .reveal elements exist now.
  // Defer observation to idle time so it doesn't compete with first paint.
  const scheduleObserve = window.requestIdleCallback
    ? cb => window.requestIdleCallback(cb, { timeout: 500 })
    : cb => setTimeout(cb, 0);

  scheduleObserve(() => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  });
}
