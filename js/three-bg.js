// ============================================================
// Three.js background — DISABLED
//
// Mapbox GL JS runs its own WebGL context. Running a second
// WebGL context (Three.js) simultaneously causes GPU contention
// that manifests as lag and twitching — especially on mid-range
// hardware. Mapbox fog (star-intensity: 0.8) already provides
// the space/starfield atmosphere.
//
// The player scene themes are handled via .player-bg CSS
// background colour directly (see player.js goToScene).
// ============================================================

export function initThreeBackground() { /* no-op */ }
export function setTheme()            { /* no-op */ }
export function destroyThreeBackground() { /* no-op */ }
