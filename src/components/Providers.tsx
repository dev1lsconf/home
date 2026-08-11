"use client";
import { useEffect } from "react";
import { setQuality } from "@/lib/store";
import { detectQuality, probeWebGL, probeMobile } from "@/lib/quality";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollRig } from "@/hooks/useScrollRig";

/**
 * Providers — client-side environment wiring:
 * quality detection (with ?q= override), reduced-motion, scroll rig.
 */
export default function Providers() {
  useReducedMotion();
  useScrollRig();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const webgl = probeWebGL();
    const q = detectQuality(
      {
        webgl,
        mobile: probeMobile(),
        deviceMemory: (navigator as Navigator & { deviceMemory?: number }).deviceMemory,
        cores: navigator.hardwareConcurrency,
      },
      params.get("q"),
    );
    setQuality(q);
    console.info(`[scene] quality preset: ${q}`);
  }, []);

  return null;
}
