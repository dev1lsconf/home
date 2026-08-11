/**
 * quality.ts — device capability detection → render preset.
 * The "3D never fails" contract: degrade, never break.
 */

import type { Quality } from "./store";

export interface Caps {
  webgl: boolean;
  mobile?: boolean;
  deviceMemory?: number;
  cores?: number;
}

export function detectQuality(caps: Caps, force?: string | null): Quality {
  if (force === "low" || force === "medium" || force === "high" || force === "fallback") {
    return force;
  }
  if (!caps.webgl) return "fallback";
  if (caps.mobile) return "low";
  const mem = caps.deviceMemory ?? 0;
  const cores = caps.cores ?? 0;
  if (mem >= 8 && cores >= 6) return "high";
  return "medium";
}

/** Real WebGL support probe — client-side only. */
export function probeWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      c.getContext("webgl2") ||
      c.getContext("webgl") ||
      c.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function probeMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

/** Numeric quality tier for auto-downgrade: 3 → 2 → 1 → 0 */
export function qualityTier(q: Quality): number {
  switch (q) {
    case "high": return 3;
    case "medium": return 2;
    case "low": return 1;
    case "fallback": return 0;
  }
}

export function qualityFromTier(t: number): Quality {
  if (t >= 3) return "high";
  if (t === 2) return "medium";
  if (t === 1) return "low";
  return "fallback";
}

/** Per-preset render parameters. */
export const PRESETS = {
  high:    { dpr: [1, 2] as [number, number], particles: 3000, bloom: true,  frameloop: "always" as const, racks: 16, nodeDetail: true },
  medium:  { dpr: [1, 1.5] as [number, number], particles: 1000, bloom: true,  frameloop: "always" as const, racks: 12, nodeDetail: true },
  low:     { dpr: [1, 1] as [number, number], particles: 300,  bloom: false, frameloop: "demand" as const, racks: 8,  nodeDetail: false },
  fallback:{ dpr: [1, 1] as [number, number], particles: 0,    bloom: false, frameloop: "demand" as const, racks: 0,  nodeDetail: false },
} as const;

export type { Quality } from "./store";
export type Preset = (typeof PRESETS)[Quality];
