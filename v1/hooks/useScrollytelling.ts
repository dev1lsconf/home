import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollytelling = () => {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {

      // ──────────────────────────────────────────────
      // FONDO PARALLAX
      //    Las capas .parallax-layer se mueven a
      //    diferente velocidad según su índice.
      // ──────────────────────────────────────────────

      const bgLayers = scope.querySelectorAll<HTMLElement>('.parallax-layer');
      bgLayers.forEach((layer, i) => {
        const speed = 0.08 + (i * 0.06);
        ScrollTrigger.create({
          trigger: scope,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            const y = self.progress * 200 * speed;
            gsap.set(layer, { y: -y });
          },
        });
      });

      // ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈
      // CALIBRACIÓN:
      //   Parallax layers → speed 0.08 + (index * 0.06)
      // ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈

    }, scope);

    return () => {
      ctx.revert();
    };
  }, []);

  return scopeRef;
};

export default useScrollytelling;
