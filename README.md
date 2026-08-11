# Eric Batista — Cinematic 3D Portfolio

An interactive, scroll-driven portfolio experience. The camera travels from a dark datacenter (server racks, flickering LEDs, spinning fans), through data cables carrying packets, into a global network graph, and lands on a laptop whose screen lights up with the portfolio content. Built to tell the story: **idea → code → infrastructure → user**.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + TypeScript strict
- **Three.js** + @react-three/fiber + @react-three/drei + @react-three/postprocessing
- **GSAP** ScrollTrigger (global scroll progress drives the camera timeline)
- **Tailwind CSS 4** + CSS custom tokens
- **Zustand** (tiny external store for scroll/section state)

## Design principles

- **One fixed 3D canvas** behind everything; content lives in semantic HTML overlays (SSR'd, accessible, SEO-friendly even without WebGL).
- **Cinematic camera rig**: 11-keyframe timeline interpolated in `useFrame` with exponential damping — feels like a movie, not a page with scroll animations.
- **Quality presets** (`high` / `medium` / `low` / `fallback`) auto-detected from device; an FPS watchdog auto-degrades. Without WebGL, a 2D cinematic fallback (CSS/SVG) renders instead.
- **Reduced motion** supported: overlays stack statically without camera travel.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

Quality override for testing: `?q=low` | `?q=medium` | `?q=high` | `?q=fallback`

## Tests

```bash
npm test         # vitest + jsdom, 21 tests
npm run build    # production build
```

## History

The previous version of this portfolio (Astro/Vite stack) lives outside this repo at `~/Documents/v1/`. It is intentionally not part of this project or deployment.

---

© 2026 Eric Batista — Developer · Web · AI · Infrastructure
