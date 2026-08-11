/**
 * store.ts — external scroll/scene state store.
 *
 * Kept OUTSIDE React: updated every scroll-frame, read every render-frame.
 * React only subscribes to discrete changes (active section, quality).
 */

export type Quality = "high" | "medium" | "low" | "fallback";

export type SectionId =
  | "intro"
  | "server"
  | "cables"
  | "network"
  | "skills"
  | "services"
  | "experience"
  | "projects"
  | "method"
  | "contact"
  | "final";

export interface SceneState {
  /** 0..1 global scroll progress along the whole journey */
  progress: number;
  section: SectionId;
  quality: Quality;
  reducedMotion: boolean;
  /** true once WebGL canvas has confirmed it can render */
  webgl: boolean;
}

export const store: SceneState = {
  progress: 0,
  section: "intro",
  quality: "high",
  reducedMotion: false,
  webgl: true,
};

type Listener = (s: SceneState) => void;
const listeners = new Set<Listener>();

export function subscribe(cb: Listener): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function emit() {
  listeners.forEach((cb) => cb(store));
}

export function setProgress(p: number) {
  const clamped = Math.min(1, Math.max(0, p));
  if (clamped !== store.progress) {
    store.progress = clamped;
    emit();
  }
}

export function setQuality(q: Quality) {
  if (store.quality !== q) {
    store.quality = q;
    emit();
  }
}

export function setReducedMotion(b: boolean) {
  if (store.reducedMotion !== b) {
    store.reducedMotion = b;
    emit();
  }
}

export function setSection(s: SectionId) {
  if (store.section !== s) {
    store.section = s;
    emit();
  }
}

export function setWebGL(ok: boolean) {
  if (store.webgl !== ok) {
    store.webgl = ok;
    if (!ok) store.quality = "fallback";
    emit();
  }
}
