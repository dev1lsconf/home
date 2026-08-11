/**
 * scroll-timeline.ts — the cinematic spine.
 *
 * 11 keyframes map scroll progress (0..1) to camera position / lookAt / fov.
 * Scene components are laid out along these coordinates:
 *
 *   ServerRoom:  origin area (0,0,0), racks in two rows along z
 *   DataCables:  corridor curving from (0,1.5,-6) down to (0,2,-28)
 *   NetworkGraph: centered at (0, 2, -38), radius ~12
 *   Laptop:      at (0, 1.2, -56), facing +z
 */

import { store, type SectionId } from "./store";

export interface CamKey {
  section: SectionId;
  /** progress range [start, end] this keyframe governs */
  at: [number, number];
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
}

export const TIMELINE: readonly CamKey[] = [
  { section: "intro",      at: [0.0, 0.06],  pos: [0, 1.7, 9],       look: [0, 1.3, -2],    fov: 55 },
  { section: "server",     at: [0.06, 0.15], pos: [0.5, 1.5, 1.8],   look: [0.95, 1.35, -1], fov: 45 },
  { section: "cables",     at: [0.15, 0.28], pos: [0.3, 2.0, -8],    look: [0, 1.8, -18],    fov: 62 },
  { section: "network",    at: [0.28, 0.42], pos: [0, 6.8, -22],     look: [0, 2, -38],      fov: 58 },
  { section: "skills",     at: [0.42, 0.52], pos: [0, 3.4, -30],     look: [0, 2, -38],      fov: 50 },
  { section: "services",   at: [0.52, 0.60], pos: [0, 2.4, -44],     look: [0, 1.6, -56],    fov: 52 },
  { section: "experience", at: [0.60, 0.68], pos: [0, 1.75, -52.2],  look: [0, 1.7, -56],    fov: 50 },
  { section: "projects",   at: [0.68, 0.78], pos: [-2.4, 2.1, -50],  look: [0.6, 1.6, -55],  fov: 50 },
  { section: "method",     at: [0.78, 0.85], pos: [2.4, 2.1, -50],   look: [-0.6, 1.6, -55], fov: 50 },
  { section: "contact",    at: [0.85, 0.94], pos: [0, 2.6, -47],     look: [0, 1.6, -56],    fov: 55 },
  { section: "final",      at: [0.94, 1.0],  pos: [0, 3.4, -36],     look: [0, 1.4, -56],    fov: 62 },
] as const;

/** Which section owns this progress value. */
export function sectionAt(p: number): SectionId {
  const clamped = Math.min(1, Math.max(0, p));
  for (const k of TIMELINE) {
    if (clamped >= k.at[0] && clamped <= k.at[1]) return k.section;
  }
  return clamped < 0.5 ? TIMELINE[0].section : TIMELINE[TIMELINE.length - 1].section;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** smoothstep easing for buttery camera transitions */
function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

/**
 * Sample interpolated camera values for a progress value.
 * Blends across keyframe boundaries so motion is continuous
 * (the "movie" feel — no hard cuts).
 */
export function sampleCam(p: number): {
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
} {
  const clamped = Math.min(1, Math.max(0, p));

  // find current + next keyframe
  let i = 0;
  for (; i < TIMELINE.length - 1; i++) {
    if (clamped <= TIMELINE[i].at[1]) break;
  }
  const a = TIMELINE[i];
  const b = TIMELINE[Math.min(i + 1, TIMELINE.length - 1)];

  // local t through the blend zone between a and b
  const span = Math.max(0.0001, b.at[0] - a.at[0] + (a.at[1] - a.at[0]) * 0.5);
  const raw = (clamped - a.at[0]) / span;
  const t = smooth(Math.min(1, Math.max(0, raw)));

  return {
    pos: [
      lerp(a.pos[0], b.pos[0], t),
      lerp(a.pos[1], b.pos[1], t),
      lerp(a.pos[2], b.pos[2], t),
    ],
    look: [
      lerp(a.look[0], b.look[0], t),
      lerp(a.look[1], b.look[1], t),
      lerp(a.look[2], b.look[2], t),
    ],
    fov: lerp(a.fov, b.fov, t),
  };
}

/**
 * Scroll the window to the section. Uses the sentinel element placement
 * computed at runtime (document height x section midpoint).
 */
export function scrollToSection(section: SectionId) {
  const key = TIMELINE.find((k) => k.section === section);
  if (!key || typeof window === "undefined") return;
  const mid = (key.at[0] + key.at[1]) / 2;
  const doc = document.documentElement;
  const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
  window.scrollTo({ top: mid * scrollable, behavior: store.reducedMotion ? "auto" : "smooth" });
}
