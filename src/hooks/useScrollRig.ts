"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setProgress, setSection, store } from "@/lib/store";
import { sectionAt } from "@/lib/scroll-timeline";

/**
 * useScrollRig — converts page scroll into store.progress / store.section.
 *
 * Primary path: GSAP ScrollTrigger on the document body scroller.
 * Fallback path (reduced motion): plain scroll listener with the same math —
 * the narrative still advances, the camera just doesn't travel.
 */
export function useScrollRig() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!store.reducedMotion) {
      gsap.registerPlugin(ScrollTrigger);
      const st = ScrollTrigger.create({
        start: 0,
        end: () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight),
        onUpdate: (self) => {
          setProgress(self.progress);
          setSection(sectionAt(self.progress));
        },
      });
      // ensure measure is correct after fonts/layout settle
      const t = setTimeout(() => ScrollTrigger.refresh(), 500);
      return () => {
        clearTimeout(t);
        st.kill();
      };
    }

    // Reduced-motion path: plain scroller, no camera journey
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = window.scrollY / max;
      setProgress(p);
      setSection(sectionAt(p));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [store.reducedMotion]);
}
