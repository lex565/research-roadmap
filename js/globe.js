// ============================================================
// GLOBE — Fixed full-screen background, section-aware
//
// Sections sync:
//   hero          → global rotation, Asia/Pacific
//   journey-map   → scroll-driven 5-stop flight (+ satellite at street level)
//   profile       → Southern Africa (research area)
//   weaknesses    → Zimbabwe close-up
//   courses       → Hangzhou
//   roadmap       → World view, arc route visible
// ============================================================

// ── Section views (non-journey) ────────────────────────────
const SECTION_VIEWS = {
  hero:            { lat: 20.0,    lng: 108.0,  alt: 2.5 },
  'southern-africa':{ lat: -22.0,  lng: 28.0,   alt: 0.95 },
  zimbabwe:        { lat: -19.5,   lng: 30.5,   alt: 0.55 },
  hangzhou:        { lat: 30.274,  lng: 120.155, alt: 0.55 },
  world:           { lat: 5.0,     lng: 20.0,   alt: 3.2  }
};

// ── Journey waypoints (progress 0→1 within journey section) ─
// [pct, lat, lng, alt, stopIndex (-1 = mid-flight), zoomLabel]
const WAYPOINTS = [
  [0.00,  20.0,   108.0,  2.8,  -1, 'Global View'],
  [0.07,  30.274, 120.155, 0.5,  0, 'Country Level'],
  [0.16,  30.274, 120.155, 0.022,0, 'Street Level'],
  [0.23,  10.0,   78.0,   2.6, -1, 'Global View'],
  [0.31, -17.825, 31.033, 0.48, 1, 'Country Level'],
  [0.40, -17.825, 31.033, 0.02, 1, 'Street Level'],
  [0.48, -22.0,   28.0,   0.95, 2, 'Regional View'],
  [0.55, -22.0,   28.0,   0.95, 2, 'Regional View'],
  [0.62,  5.0,    70.0,   2.6, -1, 'Global View'],
  [0.70,  30.274, 120.155, 0.5, 3, 'Country Level'],
  [0.80,  30.274, 120.155, 0.022,3,'Street Level'],
  [0.88,  15.0,   45.0,   2.4, -1, 'Global View'],
  [1.00,   5.0,   15.0,   3.5,  4, 'Global View']
];

// ── Stop content ───────────────────────────────────────────
const STOPS = [
  {
    id: 0, counter: '01 / 05', color: '#F59E0B',
    label: 'Hangzhou, China', coords: '30.274°N · 120.155°E',
    leafletZoom: 13,
    text: `This is where the work began.\n\nBeihang University International Campus. September 2025. A 10,000 km move from home — a research idea barely a sentence long, and seven courses starting the following Monday.`
  },
  {
    id: 1, counter: '02 / 05', color: '#D97706',
    label: 'Harare, Zimbabwe', coords: '17.825°S · 31.033°E',
    leafletZoom: 13,
    text: `This is home.\n\nCyclone Idai did not hit an abstract geography. It hit the Chimanimani mountains I know. Researching this from 10,000 km away carries a particular weight.\n\nThat weight is not a weakness. It is a reason.`
  },
  {
    id: 2, counter: '03 / 05', color: '#10B981',
    label: 'Southern Africa', coords: '22.0°S · 28.0°E',
    leafletZoom: null,
    text: `The study area. The cyclone belt.\n\nWhere TROPOMI's SIF signal detects photosynthetic suppression that NDVI alone cannot read. Cyclones Idai, Chalane, Freddy. Three storms. One question: what does SIF tell us that nothing else does?`
  },
  {
    id: 3, counter: '04 / 05', color: '#3B82F6',
    label: 'Hangzhou, China', coords: '30.274°N · 120.155°E',
    leafletZoom: 14,
    text: `Back here. Writing it down.\n\nFour Methods revisions. Weekly supervisor meetings. Six Python scripts — every figure in the paper built in this city, 10,000 km from the geography it describes.`
  },
  {
    id: 4, counter: '05 / 05', color: '#F0ABFC',
    label: 'What comes next?', coords: 'The World',
    leafletZoom: null,
    text: `July 2026 — journal submission.\n\nFinal year — second manuscript. SIF recovery trajectories. Sentinel-1 SAR integration. The whole SWIO cyclone basin, 2000–2024.\n\nThe road is long. The signal is real.`
  }
];

const POINTS = [
  { lat: 30.274,  lng: 120.155, label: 'Hangzhou',     color: '#F59E0B', size: 0.38 },
  { lat: -17.825, lng: 31.033,  label: 'Harare',       color: '#D97706', size: 0.38 },
  { lat: -19.0,   lng: 35.3,    label: 'Sofala',       color: '#10B981', size: 0.25 },
  { lat: -20.165, lng: 32.673,  label: 'Chimanimani',  color: '#EF4444', size: 0.25 },
  { lat: -25.747, lng: 28.187,  label: 'Johannesburg', color: '#10B981', size: 0.2  },
  { lat: 40.005,  lng: 116.333, label: 'Beijing',      color: '#94A3B8', size: 0.2  }
];

const ARCS = [
  { startLat: 30.274,  startLng: 120.155, endLat: -17.825, endLng: 31.033,  color: ['rgba(245,158,11,0.8)', 'rgba(215,119,7,0.8)']  },
  { startLat: -17.825, startLng: 31.033,  endLat: -22.0,   endLng: 28.0,    color: ['rgba(215,119,7,0.8)',  'rgba(16,185,129,0.8)'] },
  { startLat: -22.0,   startLng: 28.0,    endLat: 30.274,  endLng: 120.155, color: ['rgba(16,185,129,0.8)', 'rgba(59,130,246,0.8)'] },
  { startLat: 30.274,  startLng: 120.155, endLat: 5.0,     endLng: 15.0,    color: ['rgba(59,130,246,0.8)', 'rgba(240,171,252,0.8)'] }
];

// ── State ──────────────────────────────────────────────────
const isMobile       = window.innerWidth < 768;
let globeInstance    = null;
let leafletMap       = null;
let lastStopIndex    = -2;
let satelliteVisible = false;
let inJourney        = false;
let ticking          = false;
let currentSection   = 'hero';

// ── Init ───────────────────────────────────────────────────
export function initGlobe() {
  const globeEl = document.getElementById('globe-container');
  const satEl   = document.getElementById('satellite-container');
  if (!globeEl || !window.Globe) return;

  // Globe.gl
  globeInstance = Globe({ animateIn: true })(globeEl);
  globeInstance
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
    .showAtmosphere(!isMobile)
    .atmosphereColor('#1e3a8a')
    .atmosphereAltitude(0.15)
    .arcsData(ARCS)
    .arcColor('color')
    .arcAltitude(0.3)
    .arcStroke(isMobile ? 0.28 : 0.42)
    .arcDashLength(0.36)
    .arcDashGap(0.12)
    .arcDashAnimateTime(isMobile ? 3200 : 2200)
    .pointsData(POINTS)
    .pointColor('color')
    .pointAltitude(0.01)
    .pointRadius('size')
    .labelsData(isMobile ? [] : POINTS)
    .labelLat('lat').labelLng('lng').labelText('label')
    .labelSize(0.45)
    .labelColor(() => 'rgba(248,250,252,0.6)')
    .labelResolution(isMobile ? 2 : 3)
    .labelAltitude(0.012)
    .enablePointerInteraction(false); // disabled so globe doesn't block page scroll

  globeInstance.controls().autoRotate      = true;
  globeInstance.controls().autoRotateSpeed = isMobile ? 0.15 : 0.28;
  globeInstance.controls().enableZoom      = false;
  globeInstance.pointOfView(SECTION_VIEWS.hero, 0);

  // Leaflet satellite
  if (satEl && window.L) {
    leafletMap = L.map(satEl, {
      zoomControl: false, attributionControl: false,
      dragging: false, scrollWheelZoom: false, doubleClickZoom: false
    }).setView([30.274, 120.155], 13);

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 19 }
    ).addTo(leafletMap);

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 19, opacity: 0.55 }
    ).addTo(leafletMap);
  }

  _buildDots();
  _initIntersectionObserver();
  window.addEventListener('scroll', _onScroll, { passive: true });
}

// ── Intersection Observer — watches all data-globe sections ─
function _initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const key = entry.target.getAttribute('data-globe');
      if (!key || key === 'journey') return; // journey handled by scroll
      _flyToSection(key);
    });
  }, { threshold: 0.35 });

  document.querySelectorAll('[data-globe]').forEach(el => observer.observe(el));
}

function _flyToSection(key) {
  if (currentSection === key) return;
  currentSection = key;
  const view = SECTION_VIEWS[key];
  if (!view || !globeInstance) return;

  _hideSatellite();
  globeInstance.controls().autoRotate = (key === 'hero' || key === 'world');
  globeInstance.controls().autoRotateSpeed = 0.28;
  globeInstance.pointOfView(view, 2200);
  _updateBadge(view.alt);
}

// ── Scroll handler ─────────────────────────────────────────
function _onScroll() {
  if (!ticking) { requestAnimationFrame(_update); ticking = true; }
}

function _update() {
  ticking = false;
  const section = document.getElementById('journey-map');
  if (!section || !globeInstance) return;

  const rect        = section.getBoundingClientRect();
  const scrollStart = rect.top  <= 0;
  const scrollEnd   = rect.bottom >= window.innerHeight;
  const nowInJourney = scrollStart && scrollEnd;

  // Entering / leaving journey
  if (nowInJourney !== inJourney) {
    inJourney = nowInJourney;
    document.body.classList.toggle('in-journey', inJourney);
    document.querySelector('.globe-story-panel')?.classList.toggle('panel-visible', inJourney);
    document.querySelector('.globe-stop-dots-bar')?.classList.toggle('panel-visible', inJourney);
    if (!inJourney) {
      _hideSatellite();
      lastStopIndex = -2;
    }
  }

  if (!inJourney) return;

  // Calculate progress through journey section
  const scrollContainer = section.querySelector('.journey-scroll-container');
  if (!scrollContainer) return;
  const cRect    = scrollContainer.getBoundingClientRect();
  const total    = scrollContainer.offsetHeight - window.innerHeight;
  const scrolled = -cRect.top;
  const progress = Math.max(0, Math.min(1, scrolled / total));

  const pov = _interpolate(progress);

  // Update globe camera
  globeInstance.controls().autoRotate = false;
  globeInstance.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: pov.alt }, 160);

  // Update badge
  _updateBadge(pov.alt, pov.zoomLabel);

  // Satellite crossfade
  const STREET_THRESH = 0.06;
  if (pov.alt < STREET_THRESH && !satelliteVisible && pov.stopIndex >= 0 && STOPS[pov.stopIndex]?.leafletZoom) {
    const stop = STOPS[pov.stopIndex];
    _showSatellite(stop.lat || pov.lat, stop.lng || pov.lng, stop.leafletZoom);
  } else if (pov.alt >= STREET_THRESH + 0.02 && satelliteVisible) {
    _hideSatellite();
  }

  // Panel update when stop changes
  if (pov.stopIndex >= 0 && pov.stopIndex !== lastStopIndex) {
    lastStopIndex = pov.stopIndex;
    _updatePanel(STOPS[pov.stopIndex]);
    _updateDots(pov.stopIndex);
  }
}

// ── POV interpolation ──────────────────────────────────────
function _interpolate(p) {
  let lo = WAYPOINTS[0], hi = WAYPOINTS[WAYPOINTS.length - 1];
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    if (p >= WAYPOINTS[i][0] && p <= WAYPOINTS[i+1][0]) { lo = WAYPOINTS[i]; hi = WAYPOINTS[i+1]; break; }
  }
  const span = hi[0] - lo[0];
  const t    = span === 0 ? 0 : (p - lo[0]) / span;
  const e    = t < 0.5 ? 2*t*t : -1+(4-2*t)*t; // ease in-out
  return {
    lat: lo[1] + (hi[1]-lo[1])*e,
    lng: lo[2] + (hi[2]-lo[2])*e,
    alt: lo[3] + (hi[3]-lo[3])*e,
    stopIndex: hi[4],
    zoomLabel: hi[5]
  };
}

// ── Satellite ──────────────────────────────────────────────
function _showSatellite(lat, lng, zoom) {
  const el = document.getElementById('satellite-container');
  if (!el || !leafletMap) return;
  leafletMap.setView([lat, lng], zoom || 13, { animate: false });
  setTimeout(() => leafletMap.invalidateSize(), 50);
  el.classList.add('visible');
  satelliteVisible = true;
  const badge = document.getElementById('globe-zoom-badge');
  if (badge) { badge.textContent = 'Satellite · Street Level'; badge.style.color = '#10B981'; badge.style.borderColor = 'rgba(16,185,129,0.4)'; }
}

function _hideSatellite() {
  document.getElementById('satellite-container')?.classList.remove('visible');
  satelliteVisible = false;
}

// ── Badge ──────────────────────────────────────────────────
function _updateBadge(alt, label) {
  const badge = document.getElementById('globe-zoom-badge');
  if (!badge) return;
  badge.style.color = '#F59E0B';
  badge.style.borderColor = 'rgba(245,158,11,0.35)';
  if (label) { badge.textContent = label; return; }
  if (alt >= 2.2)      badge.textContent = 'Global View';
  else if (alt >= 0.8) badge.textContent = 'Continental';
  else if (alt >= 0.15) badge.textContent = 'Country Level';
  else                 badge.textContent = 'City Level';
}

// ── Panel ──────────────────────────────────────────────────
function _updatePanel(stop) {
  const panel   = document.getElementById('globe-story-panel');
  const locEl   = document.getElementById('globe-stop-location');
  const coordEl = document.getElementById('globe-stop-coords');
  const textEl  = document.getElementById('globe-stop-text');
  const ctrEl   = document.getElementById('globe-stop-counter');
  if (!panel) return;

  panel.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  panel.style.opacity = '0'; panel.style.transform = 'translateY(10px)';

  setTimeout(() => {
    if (ctrEl)   ctrEl.textContent   = stop.counter;
    if (locEl)   { locEl.textContent = stop.label; locEl.style.color = stop.color; }
    if (coordEl) coordEl.textContent = stop.coords;
    if (textEl)  textEl.innerHTML    = stop.text.split('\n\n').map(p => `<p>${p}</p>`).join('');
    panel.style.opacity = '1'; panel.style.transform = 'translateY(0)';
  }, 350);
}

// ── Dots ───────────────────────────────────────────────────
function _buildDots() {
  const el = document.getElementById('globe-stop-dots');
  if (!el) return;
  el.innerHTML = '';
  STOPS.forEach(s => {
    const d = document.createElement('div');
    d.className = 'globe-dot'; d.title = s.label;
    el.appendChild(d);
  });
}

function _updateDots(active) {
  document.querySelectorAll('.globe-dot').forEach((d, i) => {
    d.className = 'globe-dot';
    if (i < active)  d.classList.add('visited');
    if (i === active) d.classList.add('active');
  });
}
