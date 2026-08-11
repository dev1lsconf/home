"use client";
import { useEffect } from "react";
import { setReducedMotion } from "@/lib/store";

/**
 * Syncs prefers-reduced-motion into the global store.
 * When active: no camera travel — sections crossfade statically.
 */
export function useReducedMotion() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
}
