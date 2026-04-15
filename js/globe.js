// ============================================================
// GLOBE — Mapbox GL JS v3
//
// Performance rules:
//   - Zero setPaintProperty calls after load (no dasharray animation)
//   - Auto-rotation capped at 20fps
//   - IntersectionObserver bypassed during autoplay (no competing easeTo)
//   - Single WebGL context (Three.js disabled)
//
// Buildings:  rise zoom 13 → 18  (slow, dramatic)
// Scroll cam: easeTo(300ms, linear) — smooth glide
// Arcs:       static line-gradient (no JS animation)
// ============================================================

const TOKEN = 'pk.eyJ1IjoidGFuYWthYWxleCIsImEiOiJjbW56cDVucGowZjE0Mm9wbTR4NmZtcGZhIn0.ovxKoSGBzdEiCxdZo-BvFw';

// ── Section camera views ───────────────────────────────────
const SECTION_VIEWS = {
  hero:              { center: [108.0,    20.0],   zoom: 1.8,  pitch: 45, bearing: 0  },
  'southern-africa': { center: [28.0,    -22.0],   zoom: 4.8,  pitch: 35, bearing: 0  },
  zimbabwe:          { center: [32.67,   -18.97],  zoom: 6.5,  pitch: 52, bearing: 10 },
  hangzhou:          { center: [120.155,  30.274], zoom: 6.5,  pitch: 30, bearing: 0  },
  world:             { center: [15.0,     5.0],    zoom: 1.5,  pitch: 20, bearing: 0  }
};

// ── Journey waypoints ──────────────────────────────────────
// [progress, lng, lat, zoom, pitch, bearing, stopIndex, label]
// Extra mid-points between country→street slow the zoom-in so the
// building rise is gradual and readable
const WAYPOINTS = [
  [0.00,  108.0,    20.0,    1.8,  45,   0,  -1, 'Global View'  ],
  [0.07,  120.155,  30.274,  7.0,  30,   0,   0, 'Country Level'],
  [0.16,  120.155,  30.274, 15.5,  62,  10,   0, 'Street Level' ], // direct dive — no hover
  [0.23,   78.0,    10.0,    1.8,  35,  15,  -1, 'Global View'  ],
  [0.31,   31.5,   -18.2,    7.0,  30,   0,   1, 'Country Level'],
  [0.40,   32.67,  -18.97,  15.5,  65,  10,   1, 'Street Level' ], // direct dive — Mutare
  [0.48,   28.0,   -22.0,    5.0,  40,   0,   2, 'Regional View'],
  [0.55,   28.0,   -22.0,    5.0,  40,   5,   2, 'Regional View'],
  [0.62,   70.0,    5.0,     1.8,  30,  15,  -1, 'Global View'  ],
  [0.70,  120.155,  30.274,  7.0,  30,   0,   3, 'Country Level'],
  [0.80,  120.155,  30.274, 15.5,  62,  20,   3, 'Street Level' ], // direct dive — return
  [0.88,   45.0,   15.0,     1.8,  30,  25,  -1, 'Global View'  ],
  [1.00,   15.0,    5.0,     1.5,  20,   0,   4, 'Global View'  ],
];

// ── Journey stop panels ────────────────────────────────────
const STOPS = [
  {
    id: 0, counter: '01 / 05', color: '#F59E0B',
    label: 'Hangzhou, China', coords: '30.274°N · 120.155°E',
    text: `This is where the work began.\n\nBeihang University, Hangzhou. September 2025. A 10,000 km move from Mutare, Zimbabwe — a research idea barely a sentence long, and seven courses starting the following Monday.\n\nI had already published one paper at bachelor's level. That paper was the seed. This city is where it grew.`
  },
  {
    id: 1, counter: '02 / 05', color: '#D97706',
    label: 'Mutare, Zimbabwe', coords: '18.97°S · 32.67°E',
    text: `This is home.\n\nMutare sits at the foot of the Chimanimani mountains — the same range Cyclone Idai swept through in March 2019. Every time I open the TROPOMI data and see the SIF signal collapse over Sofala Province, I am not just looking at pixels.\n\nI am looking at a place I know. That weight is not a weakness. It is the reason this research exists.`
  },
  {
    id: 2, counter: '03 / 05', color: '#10B981',
    label: 'Southern Africa', coords: '22.0°S · 28.0°E',
    text: `The study area. The cyclone belt.\n\nCyclones Idai, Chalane, Freddy. Three storms across six years. Where TROPOMI's SIF signal detects photosynthetic suppression weeks before NDVI registers any structural change.\n\nOne question drives all of it: what does SIF tell us that no other index can?`
  },
  {
    id: 3, counter: '04 / 05', color: '#3B82F6',
    label: 'Hangzhou, China', coords: '30.274°N · 120.155°E',
    text: `Back here. Writing it down.\n\nFour complete Methods revisions. Weekly supervisor meetings with Prof. Feng. Six Python scripts that built every figure in the paper — all of it done in this city, 10,000 km from the geography it describes.\n\nThe manuscript is not finished. It is being made attack-resistant. There is a difference.`
  },
  {
    id: 4, counter: '05 / 05', color: '#F0ABFC',
    label: 'What comes next', coords: 'July 2026 and beyond',
    text: `Journal submission: July 2026.\n\nSecond manuscript in the final year: SIF recovery trajectories, Sentinel-1 SAR integration, the full SWIO cyclone basin 2000 to 2024.\n\nI came from Mutare with a question. I am building the answer here, one revision at a time.\n\nI cannot be Albert Einstein. But I can be Tanaka Alex Mbendana of my generation.`
  }
];

// ── Arcs [lng, lat] ────────────────────────────────────────
const ARC_DEFS = [
  { from: [120.155,  30.274], to: [32.67,  -18.97],  color: '#F59E0B' },
  { from: [32.67,   -18.97],  to: [28.0,   -22.0],   color: '#D97706' },
  { from: [28.0,    -22.0],   to: [120.155, 30.274], color: '#10B981' },
  { from: [120.155,  30.274], to: [15.0,    5.0],    color: '#3B82F6' },
];

// ── Points [lng, lat] ──────────────────────────────────────
const POINT_DEFS = [
  { center: [120.155, 30.274], label: 'Hangzhou',    color: '#F59E0B', radius: 6 },
  { center: [32.67,  -18.97],  label: 'Mutare',      color: '#D97706', radius: 6 },
  { center: [35.3,   -19.0],   label: 'Sofala',      color: '#10B981', radius: 4 },
  { center: [32.673, -20.165], label: 'Chimanimani', color: '#EF4444', radius: 4 },
  { center: [28.187, -25.747], label: 'Joburg',      color: '#10B981', radius: 3 },
  { center: [116.333, 40.005], label: 'Beijing',     color: '#94A3B8', radius: 3 }
];

// ── State ──────────────────────────────────────────────────
let map            = null;
let autoRotating   = true;
let autoRotBearing = 0;
let rotRaf         = null;
let rotLastTs      = 0;
let inJourney      = false;
let lastStopIndex  = -2;
let ticking        = false;
let currentSection = 'hero';
let autoplayMode   = false;   // true while autoplay is running — skip IntersectionObserver

// ── Public: called by autoplay.js ─────────────────────────
export function setAutoplayMode(active) {
  autoplayMode = active;
  if (!active) currentSection = '';
}

// Slow 40° orbit during street-level dwells — keeps the map alive visually.
// durationMs should match the dwell time minus ~500ms lead-out.
export function startOrbit(durationMs) {
  if (!map) return;
  map.easeTo({
    bearing:  map.getBearing() + 40,
    duration: durationMs,
    easing:   t => t,
    essential: true
  });
}

export function stopOrbit() {
  if (map) map.stop();
}

// ── Great circle path ──────────────────────────────────────
function greatCircle(from, to, steps = 64) {
  const r = d => d * Math.PI / 180;
  const [ln1, lt1] = [r(from[0]), r(from[1])];
  const [ln2, lt2] = [r(to[0]),   r(to[1])];
  const d = 2 * Math.asin(Math.sqrt(
    Math.pow(Math.sin((lt2 - lt1) / 2), 2) +
    Math.cos(lt1) * Math.cos(lt2) * Math.pow(Math.sin((ln2 - ln1) / 2), 2)
  ));
  if (d < 0.0001) return [from, to];
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const A = Math.sin((1 - t) * d) / Math.sin(d);
    const B = Math.sin(t * d) / Math.sin(d);
    const x = A * Math.cos(lt1) * Math.cos(ln1) + B * Math.cos(lt2) * Math.cos(ln2);
    const y = A * Math.cos(lt1) * Math.sin(ln1) + B * Math.cos(lt2) * Math.sin(ln2);
    const z = A * Math.sin(lt1) + B * Math.sin(lt2);
    pts.push([
      Math.atan2(y, x) * 180 / Math.PI,
      Math.atan2(z, Math.sqrt(x * x + y * y)) * 180 / Math.PI
    ]);
  }
  return pts;
}

// ── Init ───────────────────────────────────────────────────
export function initGlobe() {
  const container = document.getElementById('globe-container');
  if (!container || !window.mapboxgl) return;

  mapboxgl.accessToken = TOKEN;

  map = new mapboxgl.Map({
    container:                'globe-container',
    style:                    'mapbox://styles/mapbox/dark-v11',
    projection:               'globe',
    center:                   [108.0, 20.0],
    zoom:                     1.8,
    pitch:                    45,
    bearing:                  0,
    interactive:              false,
    attributionControl:       false,
    logoPosition:             'bottom-right',
    antialias:                false,   // halves GPU fill cost — big win for background map
    fadeDuration:             0,        // tiles appear instantly — no fade-in delay
    preserveDrawingBuffer:    false,
    trackResize:              true,
    optimizeForTerrain:       false,
    maxTileCacheSize:         200,     // larger cache prevents re-fetching tiles during journey
    localIdeographFontFamily: 'sans-serif' // skip downloading CJK font glyph files
  });

  map.on('load', () => {
    _addFog();
    _add3DBuildings();
    _addArcs();
    _addPoints();
    _buildDots();
    _initIntersectionObserver();
    window.addEventListener('scroll', _onScroll, { passive: true });
    _startAutoRotation();
  });
}

// ── Fog ────────────────────────────────────────────────────
function _addFog() {
  map.setFog({
    color:            'rgba(4, 8, 16, 0.9)',
    'high-color':     '#1a2d5a',
    'horizon-blend':  0.03,
    'space-color':    '#010305',
    'star-intensity': 0.82
  });
}

// ── 3D Buildings — cinematic rise zoom 11 → 15.5 ──────────
// Rise window ends exactly at street-level target zoom (15.5)
// so buildings are FULLY risen the moment the camera lands.
// Wide start (zoom 11) = slow, visible rise during the whole dive.
function _add3DBuildings() {
  const RISE_START = 11;
  const RISE_END   = 15.5;

  // Warm-lit building colours: emerge from near-black and brighten as they rise
  const colorExpr = [
    'interpolate', ['linear'], ['zoom'],
    RISE_START,     '#0d1520',
    13,             '#1e3050',
    14,             '#2d4a78',
    RISE_END,       '#3d6096'
  ];
  const heightExpr = ['interpolate', ['linear'], ['zoom'],
    RISE_START, 0,
    RISE_END,   ['get', 'height']
  ];
  const baseExpr = ['interpolate', ['linear'], ['zoom'],
    RISE_START, 0,
    RISE_END,   ['get', 'min_height']
  ];
  // Opacity ramps quickly — buildings become visible as soon as they poke up
  const opacityExpr = ['interpolate', ['linear'], ['zoom'],
    RISE_START,       0,
    RISE_START + 0.8, 0.5,
    13.5,             0.82,
    RISE_END,         0.96
  ];

  if (map.getLayer('building-extrusion')) {
    map.setPaintProperty('building-extrusion', 'fill-extrusion-color',   colorExpr);
    map.setPaintProperty('building-extrusion', 'fill-extrusion-height',  heightExpr);
    map.setPaintProperty('building-extrusion', 'fill-extrusion-base',    baseExpr);
    map.setPaintProperty('building-extrusion', 'fill-extrusion-opacity', opacityExpr);
    return;
  }

  if (map.getLayer('building')) map.removeLayer('building');

  map.addLayer({
    id:             '3d-buildings',
    source:         'composite',
    'source-layer': 'building',
    filter:         ['==', 'extrude', 'true'],
    type:           'fill-extrusion',
    minzoom:        RISE_START,
    paint: {
      'fill-extrusion-color':   colorExpr,
      'fill-extrusion-height':  heightExpr,
      'fill-extrusion-base':    baseExpr,
      'fill-extrusion-opacity': opacityExpr
    }
  });
}

// ── Arcs — static line-gradient (zero JS animation cost) ──
// line-gradient draws a color fade along each arc without any
// setPaintProperty calls after load.
function _addArcs() {
  ARC_DEFS.forEach((arc, i) => {
    const coords = greatCircle(arc.from, arc.to, 72);

    // lineMetrics:true is required for line-gradient
    map.addSource(`arc-${i}`, {
      type:        'geojson',
      lineMetrics: true,
      data: { type: 'Feature', geometry: { type: 'LineString', coordinates: coords } }
    });

    // Dim trail
    map.addLayer({
      id: `arc-trail-${i}`, type: 'line', source: `arc-${i}`,
      paint: {
        'line-color': arc.color,
        'line-width': 1.0,
        'line-opacity': 0.18
      }
    });

    // Bright gradient line — no JS needed, fully GPU-driven
    map.addLayer({
      id: `arc-grad-${i}`, type: 'line', source: `arc-${i}`,
      paint: {
        'line-width': 2.0,
        'line-gradient': [
          'interpolate', ['linear'], ['line-progress'],
          0,   'rgba(255,255,255,0.0)',
          0.1, arc.color,
          0.5, arc.color,
          0.9, arc.color,
          1,   'rgba(255,255,255,0.0)'
        ]
      }
    });
  });
}

// ── Points ─────────────────────────────────────────────────
function _addPoints() {
  const features = POINT_DEFS.map(p => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: p.center },
    properties: { label: p.label, color: p.color, radius: p.radius }
  }));

  map.addSource('pts', {
    type: 'geojson',
    data: { type: 'FeatureCollection', features }
  });

  map.addLayer({ id: 'pts-glow', type: 'circle', source: 'pts',
    paint: {
      'circle-radius':  ['*', ['get', 'radius'], 3.2],
      'circle-color':   ['get', 'color'],
      'circle-opacity': 0.12,
      'circle-blur':    1.0
    }
  });

  map.addLayer({ id: 'pts-core', type: 'circle', source: 'pts',
    paint: {
      'circle-radius':       ['get', 'radius'],
      'circle-color':        ['get', 'color'],
      'circle-opacity':      0.92,
      'circle-stroke-width': 1,
      'circle-stroke-color': 'rgba(255,255,255,0.35)'
    }
  });

  if (window.innerWidth >= 768) {
    map.addLayer({ id: 'pts-labels', type: 'symbol', source: 'pts',
      layout: {
        'text-field':         ['get', 'label'],
        'text-font':          ['DIN Pro Medium', 'Arial Unicode MS Regular'],
        'text-size':          11,
        'text-offset':        [0, 1.8],
        'text-anchor':        'top',
        'text-allow-overlap': false
      },
      paint: {
        'text-color':      'rgba(248,250,252,0.65)',
        'text-halo-color': 'rgba(0,0,0,0.55)',
        'text-halo-width': 1.2
      }
    });
  }
}

// ── Auto-rotation — capped at 20fps ───────────────────────
function _startAutoRotation() {
  autoRotating = true;
  function tick(ts) {
    if (!autoRotating) return;
    rotRaf = requestAnimationFrame(tick);
    if (ts - rotLastTs < 50) return; // 50ms = 20fps cap
    rotLastTs = ts;
    autoRotBearing = (autoRotBearing + 0.12) % 360;
    map.setBearing(autoRotBearing);
  }
  rotRaf = requestAnimationFrame(tick);
}

function _stopAutoRotation() {
  autoRotating = false;
  if (rotRaf) { cancelAnimationFrame(rotRaf); rotRaf = null; }
}

// ── First symbol layer helper ──────────────────────────────
function _firstSymbolLayer() {
  for (const layer of map.getStyle().layers) {
    if (layer.type === 'symbol') return layer.id;
  }
  return undefined;
}

// ── IntersectionObserver — section-aware camera ────────────
function _initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (autoplayMode) return;           // autoplay drives scroll — don't interfere
      const key = entry.target.getAttribute('data-globe');
      if (!key || key === 'journey') return;
      _flyToSection(key);
    });
  }, { threshold: 0.35 });

  document.querySelectorAll('[data-globe]').forEach(el => observer.observe(el));
}

function _flyToSection(key) {
  if (currentSection === key || !map) return;
  currentSection = key;
  const view = SECTION_VIEWS[key];
  if (!view) return;

  if (key === 'hero' || key === 'world') {
    _startAutoRotation();
  } else {
    _stopAutoRotation();
  }

  map.easeTo({
    ...view,
    duration: 1800,
    easing:   t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  });
  _updateBadge(view.zoom);
}

// ── Scroll ─────────────────────────────────────────────────
function _onScroll() {
  if (!ticking) { requestAnimationFrame(_update); ticking = true; }
}

function _update() {
  ticking = false;
  const section = document.getElementById('journey-map');
  if (!section || !map) return;

  const rect         = section.getBoundingClientRect();
  const nowInJourney = rect.top <= 0 && rect.bottom >= window.innerHeight;

  if (nowInJourney !== inJourney) {
    inJourney = nowInJourney;
    document.body.classList.toggle('in-journey', inJourney);
    document.querySelector('.globe-story-panel')?.classList.toggle('panel-visible', inJourney);
    document.querySelector('.globe-stop-dots-bar')?.classList.toggle('panel-visible', inJourney);
    if (inJourney) _stopAutoRotation();
    else lastStopIndex = -2;
  }

  if (!inJourney) return;

  const sc       = section.querySelector('.journey-scroll-container');
  if (!sc) return;
  const total    = sc.offsetHeight - window.innerHeight;
  const progress = Math.max(0, Math.min(1, -sc.getBoundingClientRect().top / total));
  const pov      = _interpolate(progress);

  // Smooth glide — each easeTo cancels the previous, camera follows scroll
  map.easeTo({
    center:    [pov.lng, pov.lat],
    zoom:      pov.zoom,
    pitch:     pov.pitch,
    bearing:   pov.bearing,
    duration:  300,
    easing:    t => t,
    essential: true
  });

  _updateBadge(pov.zoom, pov.zoomLabel);

  if (pov.stopIndex >= 0 && pov.stopIndex !== lastStopIndex) {
    lastStopIndex = pov.stopIndex;
    _updatePanel(STOPS[pov.stopIndex]);
    _updateDots(pov.stopIndex);
  }
}

// ── Camera interpolation ───────────────────────────────────
function _interpolate(p) {
  let lo = WAYPOINTS[0], hi = WAYPOINTS[WAYPOINTS.length - 1];
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    if (p >= WAYPOINTS[i][0] && p <= WAYPOINTS[i + 1][0]) {
      lo = WAYPOINTS[i]; hi = WAYPOINTS[i + 1]; break;
    }
  }
  const span = hi[0] - lo[0];
  const t    = span === 0 ? 0 : (p - lo[0]) / span;
  const e    = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  return {
    lng:       lo[1] + (hi[1] - lo[1]) * e,
    lat:       lo[2] + (hi[2] - lo[2]) * e,
    zoom:      lo[3] + (hi[3] - lo[3]) * e,
    pitch:     lo[4] + (hi[4] - lo[4]) * e,
    bearing:   lo[5] + (hi[5] - lo[5]) * e,
    stopIndex: hi[6],
    zoomLabel: hi[7]
  };
}

// ── Badge ──────────────────────────────────────────────────
function _updateBadge(zoom, label) {
  const badge = document.getElementById('globe-zoom-badge');
  if (!badge) return;
  badge.style.color       = '#F59E0B';
  badge.style.borderColor = 'rgba(245,158,11,0.35)';
  if (label) { badge.textContent = label; return; }
  if (zoom <= 2)       badge.textContent = 'Global View';
  else if (zoom <= 5)  badge.textContent = 'Continental';
  else if (zoom <= 9)  badge.textContent = 'Country Level';
  else                 badge.textContent = 'Street Level';
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
  panel.style.opacity    = '0';
  panel.style.transform  = 'translateY(10px)';

  setTimeout(() => {
    if (ctrEl)   ctrEl.textContent  = stop.counter;
    if (locEl)   { locEl.textContent = stop.label; locEl.style.color = stop.color; }
    if (coordEl) coordEl.textContent = stop.coords;
    if (textEl)  textEl.innerHTML   = stop.text.split('\n\n').map(p => `<p>${p}</p>`).join('');
    panel.style.opacity   = '1';
    panel.style.transform = 'translateY(0)';
  }, 340);
}

// ── Dots ───────────────────────────────────────────────────
function _buildDots() {
  const el = document.getElementById('globe-stop-dots');
  if (!el) return;
  el.innerHTML = '';
  STOPS.forEach(s => {
    const d = document.createElement('div');
    d.className = 'globe-dot';
    d.title     = s.label;
    el.appendChild(d);
  });
}

function _updateDots(active) {
  document.querySelectorAll('.globe-dot').forEach((d, i) => {
    d.className = 'globe-dot';
    if (i < active)   d.classList.add('visited');
    if (i === active) d.classList.add('active');
  });
}
