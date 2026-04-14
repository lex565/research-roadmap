// ============================================================
// Interactive Journey Map
// Node-based academic map — click any node to open that scene
// ============================================================
import { SCENES } from './data.js';
import { openPlayer } from './player.js';

const NODE_ICONS = ['🏠', '📚', '💡', '🌍', '⚡', '🔧', '✍️', '🤝', '📊', '🚀'];

export function buildJourneyMap(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const mapDiv = container.querySelector('.map-container');
  if (!mapDiv) return;

  // Build node grid
  const nodesDiv = document.createElement('div');
  nodesDiv.className = 'map-nodes';

  SCENES.forEach((scene, i) => {
    const node = document.createElement('div');
    node.className = 'map-node reveal';
    node.setAttribute('data-scene', i);
    node.setAttribute('title', scene.title);
    node.style.animationDelay = `${i * 0.08}s`;

    node.innerHTML = `
      <div class="node-orb" style="color:${scene.palette.accent}; border-color:${scene.palette.accent}; background:${_hexToRgba(scene.palette.accent, 0.08)}">
        <span class="node-pulse" style="color:${scene.palette.accent}"></span>
        <span>${NODE_ICONS[i]}</span>
      </div>
      <div class="node-num">${String(i + 1).padStart(2,'0')}</div>
      <div class="node-label">${scene.title}</div>
    `;

    node.addEventListener('click', () => openPlayer(i));
    node.addEventListener('mouseenter', () => _showTooltip(node, scene));
    node.addEventListener('mouseleave', _hideTooltip);

    nodesDiv.appendChild(node);
  });

  // SVG connector lines (dashed path between nodes)
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.classList.add('connector-svg');
  svgEl.setAttribute('aria-hidden', 'true');

  mapDiv.appendChild(svgEl);
  mapDiv.appendChild(nodesDiv);

  // Draw connectors after layout
  requestAnimationFrame(() => _drawConnectors(svgEl, nodesDiv));

  // Tooltip element
  const tooltip = document.createElement('div');
  tooltip.id = 'map-tooltip';
  tooltip.style.cssText = `
    position:fixed; z-index:200; pointer-events:none;
    background:rgba(10,15,30,0.95); border:1px solid rgba(255,255,255,0.12);
    border-radius:12px; padding:12px 16px; max-width:260px;
    font-size:0.8rem; line-height:1.5; color:#F8FAFC;
    backdrop-filter:blur(12px); opacity:0;
    transition:opacity 0.2s ease; transform:translateY(-8px);
  `;
  document.body.appendChild(tooltip);
}

function _showTooltip(node, scene) {
  const tooltip = document.getElementById('map-tooltip');
  const rect = node.getBoundingClientRect();

  tooltip.innerHTML = `
    <div style="font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:${scene.palette.accent};margin-bottom:4px">
      Scene ${scene.id} · ${scene.subtitle}
    </div>
    <div style="font-weight:600;margin-bottom:6px">${scene.title}</div>
    <div style="color:#94A3B8;font-size:0.75rem">${scene.milestone}</div>
    <div style="margin-top:8px;font-size:0.72rem;color:#64748B">Click to open this chapter</div>
  `;

  const x = rect.left + rect.width / 2;
  const y = rect.top - 12;
  tooltip.style.left = `${Math.min(x - 130, window.innerWidth - 280)}px`;
  tooltip.style.top  = `${y - tooltip.offsetHeight - 8}px`;
  tooltip.style.opacity = '1';
  tooltip.style.transform = 'translateY(0)';
}

function _hideTooltip() {
  const tooltip = document.getElementById('map-tooltip');
  if (tooltip) { tooltip.style.opacity = '0'; tooltip.style.transform = 'translateY(-8px)'; }
}

function _drawConnectors(svg, nodesDiv) {
  const nodes = nodesDiv.querySelectorAll('.map-node');
  if (nodes.length < 2) return;

  const containerRect = nodesDiv.getBoundingClientRect();

  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i].getBoundingClientRect();
    const b = nodes[i + 1].getBoundingClientRect();

    const x1 = a.left + a.width / 2  - containerRect.left;
    const y1 = a.top  + a.height / 2 - containerRect.top;
    const x2 = b.left + b.width / 2  - containerRect.left;
    const y2 = b.top  + b.height / 2 - containerRect.top;

    const scene = SCENES[i];
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', scene.palette.accent);
    line.setAttribute('stroke-width', '1');
    line.setAttribute('stroke-dasharray', '4 6');
    line.setAttribute('stroke-opacity', '0.25');
    svg.appendChild(line);
  }
}

function _hexToRgba(hex, alpha) {
  const h = hex.replace('#','');
  const r = parseInt(h.substring(0,2),16);
  const g = parseInt(h.substring(2,4),16);
  const b = parseInt(h.substring(4,6),16);
  return `rgba(${r},${g},${b},${alpha})`;
}
