# Cinematic 3D Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Eric Batista's cinematic, scroll-driven 3D portfolio where a single fixed WebGL canvas hosts a continuous camera journey (SERVER → CABLES → NETWORK → SKILLS → SERVICES → LAPTOP → ABOUT → PROJECTS → METHOD → CONTACT → FINAL) with always-present HTML content and graceful degradation.

**Architecture:** Next.js 16 App Router. One fixed R3F `<Canvas>` behind HTML DOM overlays (content is semantic/SEO/accessibility-first). A single external ("mutable ref") scroll store (progress 0..1, section, quality, reduced-motion) drives camera interpolation in `useFrame` and overlay visibility, without triggering React re-renders per frame. Quality engine (high/medium/low/fallback) decides canvas params; an ErrorBoundary + WebGL test feeds a 2D CSS/SVG cinematic fallback.

**Tech Stack:** Next.js 16 · React 19 · TS strict · Tailwind 4 (`@import "tailwindcss"`) · three 0.185 · @react-three/fiber 9 · @react-three/drei 10 · @react-three/postprocessing 3 · gsap 3.15 (+ `gsap/ScrollTrigger`, registered once, NO `@gsap/react` needed — we only need ScrollTrigger progress) · zustand (UI-only state) · vitest.

## Global Constraints

- Node v26, npm 11. Git Bash on Windows (paths use `/`, not `\`, in scripts).
- `gsap.registerPlugin(ScrollTrigger)` exactly once, inside the component using it, guarded by `typeof window !== "undefined"`.
- All scroll→3D updates go through the scroll STORE (a plain object), never React state, to avoid per-frame re-renders.
- Content lives in HTML (SSR'd) — NEVER only in canvas.
- TypeScript strict. No `any` without justification comment.
- Every scene component must `dispose()` geometries/materials on unmount (use `useEffect` cleanup).
- Typography uses `clamp()` for all display sizes.
- Commit message format: `feat(scope): ...` / `fix:` / `test:` / `chore:`.

## File Structure

```
app/
  layout.tsx  globals.css  page.tsx
  api/contact/route.ts
components/
  Providers.tsx            # 'use client': registers ScrollTrigger, mounts store-driven UI
  SceneRoot.tsx            # 'use client': quality gate + Canvas + ErrorBoundary + fallback switch
  SceneFallback.tsx        # 2D CSS/SVG cinematic fallback (documented intentional)
  Overlay.tsx              # all 10 DOM overlays + progress rail + menu + hint + aria-live
  scene/ ServerRoom.tsx DataCables.tsx NetworkGraph.tsx Laptop.tsx
         Dust.tsx Effects.tsx CameraRig.tsx (CameraRig defined inline in SceneRoot? NO -> own file)
  ui/ ProgressRail.tsx Menu.tsx ContactForm.tsx
lib/
  content.ts  scroll-timeline.ts  store.ts  quality.ts
hooks/
  useReducedMotion.ts  useScrollRig.ts
tests/ (vitest)
  content.test.ts scroll-timeline.test.ts quality.test.ts store.test.ts
    ContactForm.test.tsx route.test.ts
```

---

## Phase 1 — Foundation (content, tokens, scroll store, a11y shell)

### Task 1: Project scaffold + design tokens + content model

**Files:**
- Create: `package.json` (via create-next-app, see Step 1)
- Create: `app/globals.css`
- Create: `lib/content.ts`
- Test: `tests/content.test.ts`
- Create: `vitest.config.ts`, `tsconfig.json` tweaks

**Interfaces:**
- Produces: `content` (typed object), design tokens in globals.css (`--cyan`, `--bg`, etc.), `cn()` helper? NO — keep minimal, use template literals.

- [ ] **Step 1: Scaffold Next.js 16 + Tailwind 4 + TS + test deps**

```bash
cd ~/Documentos
npx create-next-app@latest eric-portfolio \
  --typescript --tailwind --app --eslint --src-dir false \
  --import-alias "@/*" --use-npm --turbopack --yes
cd eric-portfolio
npm i three @react-three/fiber @react-three/drei @react-three/postprocessing gsap zustand
npm i -D @types/three vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 2: Add vitest config** — create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", setupFiles: ["./tests/setup.ts"] },
});
```

Create `tests/setup.ts`:
```ts
import "@testing-library/jest-dom";
```

Add `@vitejs/plugin-react` to devDeps (Step 1 already? add now): `npm i -D @vitejs/plugin-react` and add `npm pkg set scripts.test="vitest"`.

- [ ] **Step 3: Write failing test** `tests/content.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { content } from "../lib/content";

describe("content", () => {
  it("has 4 real projects", () => {
    expect(content.projects).toHaveLength(4);
    expect(content.projects[0].name).toContain("Batista Doleo");
  });
  it("has 6 services", () => expect(content.services).toHaveLength(6));
  it("has 4 methodology steps", () => expect(content.method).toHaveLength(4));
  it("has contact links", () => {
    expect(content.contact.email).toBe("ericbatista@gmail.com");
    expect(content.contact.github).toContain("github.com");
  });
});
```

- [ ] **Step 4: Run test to verify it fails** — `npx vitest run tests/content.test.ts` → FAIL (module `../lib/content` not found).

- [ ] **Step 5: Implement** `lib/content.ts` (single source of truth, all real data from spec §6):

```ts
export const content = {
  name: "Eric Batista",
  role: "Full Stack Developer · Next.js Specialist",
  tagline: "Diseño y código donde cada píxel importa",
  location: "Barcelona",
  intro: "Developer · Web · AI · Infrastructure",
  bio: "Especialista en transformar ideas complejas en productos web rápidos, accesibles y visualmente impecables.",
  services: [
    { id: "web", title: "WEB APPS", desc: "SSG, SSR e ISR modernas." },
    { id: "uiux", title: "UI / UX ENGINEERING", desc: "Interfaces precisas y accesibles con Design Systems." },
    { id: "devops", title: "DEVOPS & LINUX", desc: "Despliegue continuo y administración de servidores." },
    { id: "backend", title: "BACKEND DEVELOPMENT", desc: "APIs robustas." },
    { id: "ai", title: "AI INTEGRATION", desc: "Gemini y OpenAI en aplicaciones." },
    { id: "perf", title: "PERFORMANCE & SEO", desc: "Lighthouse 100 y Core Web Vitals óptimos." },
  ],
  projects: [
    { id: "doleo", name: "Batista Doleo y Asociados", desc: "Sitio legal optimizado — Lighthouse 98 · 99.9% uptime.", tech: ["React", "CSS"] },
    { id: "twtxt", name: "twtxt timeline", desc: "Red social descentralizada serverless.", tech: ["JavaScript"] },
    { id: "hq", name: "0880 Headquarters", desc: "Dashboard financiero en tiempo real, 149+ activos.", tech: ["Python", "FastAPI", "Docker"] },
    { id: "robot", name: "Mr. Robot Store", desc: "E-commerce cyberpunk.", tech: ["PHP", "JSON storage"] },
  ],
  method: [
    { id: "01", title: "Descubrimiento", desc: "Análisis de requisitos y planificación." },
    { id: "02", title: "Arquitectura", desc: "Stack y diseño de sistemas escalables." },
    { id: "03", title: "Construcción", desc: "Desarrollo ágil con entregas cada 1–2 semanas." },
    { id: "04", title: "Entrega & Grow", desc: "Despliegue automatizado y optimización continua." },
  ],
  contact: {
    email: "ericbatista@gmail.com",
    site: "https://ericbatista.vercel.app/",
    github: "https://github.com/dev1lsconf",
    linkedin: "https://www.linkedin.com/in/eric-batista-6978b0118",
  },
} as const;
```

- [ ] **Step 6: Run test → PASS.**

- [ ] **Step 7: Write design tokens** `app/globals.css` (Tailwind 4 style):

```css
@import "tailwindcss";

:root {
  --bg: #05060a;
  --panel: #0b0e14;
  --ink: #e8edf4;
  --dim: #9aa6b2;
  --cyan: #52e6ff;
  --cyan-soft: rgba(82, 230, 255, 0.35);
  --violet: #8b6bff;
  --grid: rgba(120, 150, 180, 0.07);
}

html { background: var(--bg); color: var(--ink); }
body { -webkit-font-smoothing: antialiased; }

.font-hub { font-family: ui-monospace, "SF Mono", Menlo, monospace; letter-spacing: 0.08em; }
.text-display { font-size: clamp(1.75rem, 4.5vw, 3.25rem); }
.text-hud { font-size: clamp(0.62rem, 1.1vw, 0.72rem); }

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001s !important; transition-duration: 0.001s !important; }
}
```

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -q -m "chore: scaffold next16+tailwind4+test stack, design tokens, content model"
```

---

### Task 2: External scroll store + quality engine + reduced-motion

**Files:**
- Create: `lib/store.ts`, `lib/quality.ts`, `hooks/useReducedMotion.ts`
- Test: `tests/store.test.ts`, `tests/quality.test.ts`

**Interfaces:**
- Produces (consumed everywhere): 
  - `store` = `{ progress: number; section: SectionId; quality: Quality; reducedMotion: boolean }` (plain mutable object) + `subscribe(cb)` / `emit()`.
  - `detectQuality(): Quality` where `Quality = "high" | "medium" | "low" | "fallback"`.
  - `SectionId` = 11 sections (intro, server, cables, network, skills, services, experience, projects, method, contact, final).

- [ ] **Step 1: Write failing test** `tests/store.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { store, setProgress, subscribe } from "../lib/store";

describe("scroll store", () => {
  it("clamps progress 0..1 and notifies", () => {
    let seen = -1;
    const off = subscribe((s) => { seen = s.progress; });
    setProgress(1.7);
    expect(store.progress).toBe(1);
    expect(seen).toBe(1);
    setProgress(-2);
    expect(store.progress).toBe(0);
    off();
  });
});
```

- [ ] **Step 2: Run → FAIL** (module missing).

- [ ] **Step 3: Implement** `lib/store.ts`:

```ts
export type Quality = "high" | "medium" | "low" | "fallback";
export type SectionId =
  | "intro" | "server" | "cables" | "network" | "skills" | "services"
  | "experience" | "projects" | "method" | "contact" | "final";

export interface SceneState {
  progress: number;
  section: SectionId;
  quality: Quality;
  reducedMotion: boolean;
}

export const store: SceneState = {
  progress: 0,
  section: "intro",
  quality: "high",
  reducedMotion: false,
};

type Listener = (s: SceneState) => void;
const listeners = new Set<Listener>();
export function subscribe(cb: Listener) { listeners.add(cb); return () => { listeners.delete(cb); }; }
function emit() { listeners.forEach((cb) => cb(store)); }

export function setProgress(p: number) {
  store.progress = Math.min(1, Math.max(0, p));
  emit();
}
export function setQuality(q: Quality) { store.quality = q; emit(); }
export function setReducedMotion(b: boolean) { store.reducedMotion = b; emit(); }
export function setSection(s: SectionId) { if (store.section !== s) { store.section = s; emit(); } }
```

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: Write failing test** `tests/quality.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { detectQuality } from "../lib/quality";

describe("detectQuality", () => {
  it("returns fallback when no WebGL", () => {
    expect(detectQuality({ webgl: false })).toBe("fallback");
  });
  it("returns low on mobile UA", () => {
    expect(detectQuality({ webgl: true, mobile: true })).toBe("low");
  });
  it("returns high on capable desktop", () => {
    expect(detectQuality({ webgl: true, mobile: false, deviceMemory: 8, cores: 8 })).toBe("high");
  });
  it("returns medium on weak desktop", () => {
    expect(detectQuality({ webgl: true, mobile: false, deviceMemory: 4, cores: 2 })).toBe("medium");
  });
  it("force override wins", () => {
    expect(detectQuality({ webgl: true, mobile: false }, "low")).toBe("low");
  });
});
```

- [ ] **Step 6: Run → FAIL.**

- [ ] **Step 7: Implement** `lib/quality.ts`:

```ts
import type { Quality } from "./store";

export interface Caps { webgl: boolean; mobile?: boolean; deviceMemory?: number; cores?: number; }

export function detectQuality(caps: Caps, force?: string): Quality {
  if (force === "low" || force === "medium" || force === "high") return force as Quality;
  if (!caps.webgl) return "fallback";
  if (caps.mobile) return "low";
  const mem = caps.deviceMemory ?? 0, cores = caps.cores ?? 0;
  if (mem >= 8 && cores >= 6) return "high";
  return "medium";
}

/** Browser-side probe; safe to call client-only. */
export function probeWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}
```

- [ ] **Step 8: Implement** `hooks/useReducedMotion.ts`:

```ts
"use client";
import { useEffect } from "react";
import { setReducedMotion } from "@/lib/store";

export function useReducedMotion() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
}
```

- [ ] **Step 9: Run tests → PASS. Commit:**

```bash
git add -A && git commit -q -m "feat(core): reactive scroll store, quality engine, reduced-motion hook"
```

---

### Task 3: A11y & SEO shell — page, layout, Providers, Overlay skeleton

**Files:**
- Create/Modify: `app/layout.tsx`, `app/page.tsx`, `components/Providers.tsx`, `components/Overlay.tsx`

**Interfaces:**
- Produces: SSR'd semantic HTML for all 10 content sections (visible without WebGL). `Overlay` consumes `store` via `subscribe` to toggle `.is-active` classes. `Providers` mounts ScrollTrigger.

- [ ] **Step 1: Write failing a11y/SSR test** `tests/overlay.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Overlay from "../components/Overlay";

describe("Overlay SSR content", () => {
  it("renders name & all sections without WebGL", () => {
    render(<Overlay />);
    expect(screen.getByRole("heading", { level: 1, name: /eric batista/i })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: /what i build/i })).toHaveLength(1);
    expect(screen.getByText(/LET'S BUILD SOMETHING/i)).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /journey/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run → FAIL** (component missing).

- [ ] **Step 3: Implement `components/Overlay.tsx`** ('use client') — renders the 11 sections as fixed overlays; visibility toggled by subscribing to store and adding/removing `is-active` class on a wrapper with pointer-events none by default; includes **ProgressRail** and **Menu** (inline for now; they get own files in Phase 4), a skip link and an aria-live section announcer. Key pattern: NO React state per frame — subscribe once, mutate classList in callback. Pasting the full 10 sections is long; implement verbatim using `content` and this per-section pattern:

```tsx
"use client";
import { useEffect, useRef } from "react";
import { subscribe, setSection } from "@/lib/store";
import { content } from "@/lib/content";

export default function Overlay() {
  const refs = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => subscribe((s) => {
    Object.entries(refs.current).forEach(([k, el]) => {
      if (!el) return;
      const on = s.section === k;
      el.classList.toggle("is-active", on);
      el.setAttribute("aria-hidden", on ? "false" : "true");
    });
  }), []);
  // ...render sections with ref={(el)=>{refs.current.intro=el}} etc.
}
```

(Implement all 11 sections fully — don't abbreviate. H1 only in `intro`.)

Add CSS to globals for `.overlay-section{position:fixed;inset:0;display:grid;place-items:center;opacity:0;visibility:hidden;transition:opacity .5s ease,visibility .5s;pointer-events:none}` and `.overlay-section.is-active{opacity:1;visibility:visible;pointer-events:auto}`.

- [ ] **Step 4: Implement `app/layout.tsx`** (metadata, fonts via `next/font/google` — Inter + IBM Plex Mono, `metadataBase`), and **`app/page.tsx`** which SSRs `<Overlay/>` plus a reserved mount `<div id="scene-root"/>`; wrap children in `<Providers/>`.

- [ ] **Step 5: Implement `components/Providers.tsx`** ('use client'): on mount, `gsap.registerPlugin(ScrollTrigger)` guarded; run `detectQuality` with `probeWebGL()` + UA + `deviceMemory/concurrency` + URL `?q=` and call `setQuality`; mount `useReducedMotion()`.

- [ ] **Step 6: Run test → PASS. Commit:**

```bash
git add -A && git commit -q -m "feat(shell): SEO/a11y DOM shell, providers, quality detection"
```

---

## Phase 2 — WebGL backbone (the "3D never fails" contract)

### Task 4: SceneRoot + ErrorBoundary + WebGL pre-probe + SceneFallback

**Files:**
- Create: `components/SceneRoot.tsx`, `components/SceneFallback.tsx`
- Test: `tests/sceneroot.test.tsx` (jsdom: canvas probe mocked false → fallback visible)

**Interfaces:**
- Produces: `SceneRoot` mounts nothing when `quality==="fallback"` or `reducedMotion` is on (DOM shell carries the experience); renders `<Canvas>` otherwise; wraps children in a small class ErrorBoundary that, on error, replaces canvas with `<SceneFallback/>`. **SceneFallback** = luminous gradient backdrop + grid lines + animated SVG "cable traces" with traveling dashes, providing the same dark-tech mood.

- [ ] **Step 1: Write failing test** `tests/sceneroot.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SceneRoot from "../components/SceneRoot";
vi.mock("@react-three/fiber", () => ({ Canvas: () => <div data-testid="canvas" /> }));
vi.mock("../lib/quality", () => ({ probeWebGL: () => false, detectQuality: () => "fallback" }));

describe("SceneRoot fallback", () => {
  it("renders 2D fallback when WebGL is unavailable", () => {
    render(<SceneRoot />);
    expect(screen.getByTestId("scene-fallback")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement `components/SceneRoot.tsx`** ('use client'): state `webglOK` from `probeWebGL()` once in `useEffect`; if store.quality becomes fallback OR boundary error → `<SceneFallback/>`; else render `<Canvas ...><Suspense fallback={null}>{children}</Suspense></Canvas>` with props from quality: `dpr={quality==="low"?1:quality==="medium"?[1,1.5]:[1,2]}`, `frameloop={quality==="low"?"demand":"always"}`, `gl={{antialias:true,powerPreference:"high-performance"}}`.

- [ ] **Step 4: Implement `components/SceneFallback.tsx`** with `data-testid="scene-fallback"`: layered radial gradients, faint perspective grid (CSS `background-image: linear-gradient...` trick), and 3 SVG `<path>` cables with `<animate>` dashed movement, plus caption text "Modo cinematográfico — WebGL no disponible". Use only CSS/SVG (no canvas), dark palette tokens.

- [ ] **Step 5: Run → PASS. Commit:**

```bash
git add -A && git commit -q -m "feat(scene): webgl gating, error boundary, 2D cinematic fallback"
```

---

### Task 5: Scroll rig (GSAP ScrollTrigger → store) + camera timeline data

**Files:**
- Create: `hooks/useScrollRig.ts`, `lib/scroll-timeline.ts`, `components/scene/CameraRig.tsx`
- Test: `tests/scroll-timeline.test.ts`

**Interfaces:**
- Produces `TIMELINE`: array of `{ at: number[2]; pos: [x,y,z]; look: [x,y,z]; fov: number }`; helper `sectionAt(p): SectionId` and `sampleCam(p): {pos, look, fov}` doing smooth lerp between keyframes. Consumed by `CameraRig` (useFrame → set camera) and `useScrollRig` (ScrollTrigger onUpdate → setProgress + setSection by nearest keyframe center).

- [ ] **Step 1: Write failing test** `tests/scroll-timeline.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { sectionAt, TIMELINE } from "../lib/scroll-timeline";

describe("timeline", () => {
  it("has 11 keyframes ordered by start", () => {
    expect(TIMELINE).toHaveLength(11);
    for (let i = 1; i < TIMELINE.length; i++) expect(TIMELINE[i].at[0]).toBeGreaterThanOrEqual(TIMELINE[i-1].at[1]);
  });
  it("maps progress to section", () => {
    expect(sectionAt(0)).toBe("intro");
    expect(sectionAt(0.5)).toBeOneOf(["network","skills"]);
    expect(sectionAt(1)).toBe("final");
  });
});
```

(Note: `toBeOneOf` is from jest-extended — replace with `.toContain`: `expect(["network","skills"]).toContain(sectionAt(0.5))`.)

- [ ] **Step 2: Run → FAIL.**

- [ ] **Step 3: Implement `lib/scroll-timeline.ts`** with real keyframes (11 rows, `at` spans partitioning [0,1]). Example rows (refine later):
- intro [0,.06] pos [0,1.6,7] look [0,1.2,0] fov 55
- server [.06,.14] approach rack...
- cables [.14,.26] dive into corridor along tubes...
- network [.26,.40] orbit graph...
- skills [.40,.50] ...
- services [.50,.58] ...
- experience [.58,.66] front of laptop...
- projects [.66,.76] ...
- method [.76,.84] ...
- contact [.84,.93] ...
- final [.93,1] pull back.
Provide `sampleCam` (lerp+smoothstep) exporting `pos/look/fov` arrays.

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: Implement `hooks/useScrollRig.ts`** ('use client'): create a tall scroll sentinel div via page; on mount register ScrollTrigger with `start:"top top" end:"bottom bottom"`, `onUpdate(self)=>{setProgress(self.progress); setSection(sectionAt(self.progress));}`. Do nothing if `reducedMotion` (sections then show statically — Overlay still works because we set section on normal scroll listener fallback: use IntersectionObserver on overlays in Overlay.tsx in that mode; keep simple: when reducedMotion, also attach a plain scroll listener computing progress = scrollY/(docHeight-vh)).

- [ ] **Step 6: Implement `components/scene/CameraRig.tsx`**: `useFrame(({camera})=>{ const {pos,look,fov}=sampleCam(store.progress); camera.position.set(...pos); camera.lookAt(...look); if((camera as PerspectiveCamera).fov!==fov){(camera as PerspectiveCamera).fov=fov;camera.updateProjectionMatrix();}})`. Skip entirely if reducedMotion (return null).

- [ ] **Step 7: Commit:**

```bash
git add -A && git commit -q -m "feat(scroll): GSAP ScrollTrigger rig + camera timeline keyframes"
```

---

## Phase 3 — The 3D scenes (instanced, procedural, zero assets)

### Task 6: ServerRoom (racks, LEDs, fans, cables)

**Files:** Create `components/scene/ServerRoom.tsx`, `components/scene/Dust.tsx`
- Test: N/A (visual); add `tests/serverroom.test.tsx`? Hard in jsdom — skip; rely on manual + perf budget check in Task 10. (Accept as visual task: document with `data-testid` and snapshot count of instanced meshes via R3F test renderer is overkill for one-shot build. Mark as visual-only with code review checkpoint.)

**Interfaces:** `<ServerRoom quality={store.quality}/>`: instanced server racks aisle (two rows), per-rack LED billboards (instanced planes, cyan/violet emissive, randomized flicker via vertex time), a "hero" server at center front whose emissive pulses on section server; ceiling fan groups rotating; faint floor reflections via `MeshReflectorMaterial` (HIGH only). `<Dust/>` floating particles (count by quality: 3000/1000/300).

- [ ] **Step 1:** Implement ServerRoom with `Instances`/`Instance` from drei for racks; LEDs as a single `InstancedMesh` with custom shader-less approach: use `meshStandardMaterial` emissive and per-instance color set once + flicker by scaling instance rotation? Simplest robust: two instanced meshes (LED-on/LED-off) toggled by updating instance colors in `useFrame` every other frame. Keep code <250 lines, all procedural.
- [ ] **Step 2:** Dust as `Points` with `PointsMaterial` size 0.02, additive blending, gentle brownian drift in `useFrame`.
- [ ] **Step 3:** Manual verify in dev: `npm run dev` → intro shows server room with lights/fans/dust.
- [ ] **Step 4: Commit** `git add -A && git commit -q -m "feat(scene): server room racks, flickering LEDs, fans, dust"`

### Task 7: DataCables (curve tubes + traveling packets) + NetworkGraph

**Files:** Create `components/scene/DataCables.tsx`, `components/scene/NetworkGraph.tsx`

**Interfaces:**
- `<DataCables/>`: 3-5 `CatmullRomCurve3` paths rendered as `TubeGeometry` (LOW: fewer segments/radial segs); packets as small `Mesh` boxes animated along curves via `curve.getPointAt(t)` (t advanced in useFrame, staggered). Visible during cables+network+contact+final.
- `<NetworkGraph/>`: 20-30 glowing node sprites arranged on a sphere/diagonal lattice + edge lines; packets traveling edges between SERVER→DATABASE→API→CLOUD→CLIENT hub node near laptop position. Node labels via drei `Text` (troika) with mono font, only visible medium/high to save fill rate (LOW: sprites only).

- [ ] **Step 1:** Implement DataCables with memoized curves; dispose geometries on unmount.
- [ ] **Step 2:** Implement NetworkGraph; procedurally place nodes (seeded random for determinism).
- [ ] **Step 3:** Wire opacity gates: each scene group fades with ranges like cables visible p∈[.10,.85], network p∈[.22,.80] using `useFrame` setting `group.visible`/material opacity.
- [ ] **Step 4: Commit** `git ... -m "feat(scene): data cables with traveling packets, network graph"`

### Task 8: Laptop + screen activation + Effects (bloom) + Scene wiring

**Files:** Create `components/scene/Laptop.tsx`, `components/scene/Effects.tsx`; Modify `components/SceneRoot.tsx` (add children `<CameraRig/><ServerRoom/><DataCables/><NetworkGraph/><Laptop/><Effects/>`).

**Interfaces:** `<Laptop/>`: procedural laptop (beveled box + screen plane). Screen emissive intensity driven by progress (lights up at experience). On HIGH, screen uses `MeshTransmissionMaterial`? NO — too heavy; use emissive plane + subtle plane overlay as fake UI glow. `<Effects/>`: `EffectComposer` from `@react-three/postprocessing` with `Bloom` (intensity .6, luminanceThreshold .8) only when quality high/medium (medium: smaller `mipmapBlur`); LOW: skip composer.

- [ ] **Step 1:** Implement Laptop with screen emissive sync to store.progress.
- [ ] **Step 2:** Implement Effects conditional on quality.
- [ ] **Step 3:** Wire all scenes in SceneRoot inside `<Suspense>`; guarantee CameraRig only when !reducedMotion.
- [ ] **Step 4:** Manual run: full scroll journey renders; contact/final show laptop lit with cables behind.
- [ ] **Step 5: Commit** `git ... -m "feat(scene): laptop hero + bloom effects + full scene wiring"`

---

## Phase 4 — UI polish (rail, menu, form, API)

### Task 9: ProgressRail + Menu (extract to own files) 

**Files:** Create `components/ui/ProgressRail.tsx`, `components/ui/Menu.tsx`; Modify `components/Overlay.tsx` to use them.

**Interfaces:** Rail: 9 stops (SERVER, NETWORK, DATA, SKILLS, SERVICES, EXPERIENCE, PROJECTS, METHOD, CONTACT) mapping to scroll progress centers; clicking does `window.scrollTo({top: el})` with sentinel anchors (add invisible anchor divs with computed offsets in Overlay; Rail buttons are `<a href="#...">` for a11y). `aria-current` on active. Menu: hamburger → full-screen overlay with big links + socials; focus trap basics (Esc closes, returns focus).

- [ ] **Step 1:** Write failing test `tests/progressrail.test.tsx`: renders 9 links with accessible names; first has aria-current when section=intro/server.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement both components (subscribe to store for active state).
- [ ] **Step 4:** Run → PASS. Commit `git ... -m "feat(ui): progress rail with jump nav + discreet menu overlay"`

### Task 10: ContactForm + /api/contact

**Files:** Create `components/ui/ContactForm.tsx`, `app/api/contact/route.ts`; Tests `tests/contactform.test.tsx`, `tests/route.test.ts`.

**Interfaces:** Form (name/email/message) client validation + fetch POST JSON to `/api/contact`; states idle/sending/success/error announced via `aria-live="polite"`. Route validates payload (zod? NO — keep zero-dep manual validators) and returns `{ok:true}` 200 (log to console server-side), ready to swap in Resend.

- [ ] **Step 1:** Write failing tests (form: invalid email shows error; valid submit calls fetch; route: 400 on missing fields, 200 on valid via direct handler import).
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement form + route.
- [ ] **Step 4:** Run → PASS. Commit `git ... -m "feat(contact): client-validated form + /api/contact stub endpoint"`

---

## Phase 5 — Performance, mobile, resilience, docs

### Task 11: Perf/adapt & final hardening

**Files:** Modify `components/SceneRoot.tsx` (FPS watchdog: if avg fps<30 over 3s after warmup, downgrade quality one level via setQuality), `lib/quality.ts` (respect `?q=` already), `components/scene/*` (ensure all `useEffect` returns dispose), `app/page.tsx` (add sentinel anchors + reduced-motion static observer), README.md (run/test/perf notes + troubleshooting WebGL), `next.config.ts` (optimizePackageImports for drei).

- [ ] **Step 1:** FPS watchdog implementation + commit.
- [ ] **Step 2:** Dispose audit (grep for `new THREE.` inside components without dispose → fix).
- [ ] **Step 3:** `npm run build` passes; `npm run test` green; Lighthouse smoke (manual) — content visible with JS disabled? (RSC SSR → yes).
- [ ] **Step 4:** Commit `git ... -m "perf: adaptive quality watchdog, dispose audit, build hardening"` + tag `v1.0`.

---

## What this plan intentionally does NOT do (YAGNI)
- No custom GLSL shaders beyond emissive tweaks (keeps LOW preset stable and review surface small).
- No R3F test-renderer snapshot suite for scenes (visual tasks verified manually — one-shot portfolio, not library).
- No Resend wiring; stub only.
- No CV PDF download (mailto until asset exists).
