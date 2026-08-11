import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useGsapAnimations = () => {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {

      // 1. ScrollTrigger: fade-up sections
      scope.querySelectorAll('[data-animate="fade-up"]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(el, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' });
          },
          once: true,
        });
      });

      // 3. ScrollTrigger: fade-left (text blocks)
      scope.querySelectorAll('[data-animate="fade-left"]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(el, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' });
          },
          once: true,
        });
      });

      // 4. ScrollTrigger: fade-right (images)
      scope.querySelectorAll('[data-animate="fade-right"]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(el, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' });
          },
          once: true,
        });
      });

      // 5. Service cards stagger
      const serviceWrap = scope.querySelector('[data-animate="service-stagger"]');
      if (serviceWrap) {
        const cards = serviceWrap.querySelectorAll('[data-animate-item]');
        ScrollTrigger.create({
          trigger: serviceWrap,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: 32, opacity: 0, scale: 0.97 },
              { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out' }
            );
          },
          once: true,
        });
      }

      // 6. Project cards stagger reveal
      const projectCards = scope.querySelectorAll('.project-card');
      if (projectCards.length) {
        ScrollTrigger.create({
          trigger: projectCards[0].parentElement,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              projectCards,
              { y: 40, opacity: 0, scale: 0.97 },
              { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
            );
          },
          once: true,
        });
      }

      // 7. Process steps stagger
      const processSteps = scope.querySelectorAll('[data-animate="process-step"]');
      if (processSteps.length) {
        ScrollTrigger.create({
          trigger: processSteps[0].parentElement,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              processSteps,
              { x: -24, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power2.out' }
            );
          },
          once: true,
        });
      }

      // 7. Testimonials fade-up
      const testimonialWrap = scope.querySelector('[data-animate="testimonial-stagger"]');
      if (testimonialWrap) {
        const items = testimonialWrap.querySelectorAll('[data-animate-item]');
        ScrollTrigger.create({
          trigger: testimonialWrap,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(items, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' });
          },
          once: true,
        });
      }

      // 8. Magnetic hover on buttons
      scope.querySelectorAll('[data-magnetic]').forEach((btn) => {
        btn.addEventListener('mousemove', (e: Event) => {
          const ev = e as MouseEvent;
          const rect = (btn as HTMLElement).getBoundingClientRect();
          const x = ev.clientX - rect.left - rect.width / 2;
          const y = ev.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.25, y: y * 0.25, scale: 1.03, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
        });
      });

      // 9. Contact cards stagger
      const contactWrap = scope.querySelector('[data-animate="contact-stagger"]');
      if (contactWrap) {
        const cards = contactWrap.querySelectorAll('[data-animate-item]');
        ScrollTrigger.create({
          trigger: contactWrap,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(cards, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' });
          },
          once: true,
        });
      }

    }, scope);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return scopeRef;
};

export default useGsapAnimations;
