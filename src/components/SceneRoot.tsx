"use client";
import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { subscribe, store, setQuality, setWebGL } from "@/lib/store";
import { PRESETS, qualityFromTier, qualityTier, type Quality } from "@/lib/quality";
import CameraRig from "./scene/CameraRig";
import ServerRoom from "./scene/ServerRoom";
import Dust from "./scene/Dust";
import DataCables from "./scene/DataCables";
import NetworkGraph from "./scene/NetworkGraph";
import Laptop from "./scene/Laptop";
import Effects from "./scene/Effects";
import SceneFallback from "./SceneFallback";

/* ---------- error boundary: any GL crash → 2D cinematic mode ---------- */
class GLBoundary extends Component<
  { onCrash: () => void; children: ReactNode },
  { crashed: boolean }
> {
  state = { crashed: false };
  static getDerivedStateFromError() {
    return { crashed: true };
  }
  componentDidCatch(err: unknown) {
    console.error("[scene] WebGL crashed, switching to 2D mode:", err);
    this.props.onCrash();
  }
  render() {
    return this.state.crashed ? null : this.props.children;
  }
}

/* ---------- demand-mode safety net (kept for future 'demand' fallbacks) ---------- */
function DemandDriver() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(
    () =>
      subscribe(() => {
        invalidate();
      }),
    [invalidate],
  );
  return null;
}

/* ---------- FPS watchdog: only downgrade if really sustained ---------- */
function FPSWatchdog() {
  const frames = useRef(0);
  const started = useRef(0);
  const warmed = useRef(false);

  useFrame(() => {
    if (warmed.current) {
      frames.current++;
      return;
    }
    frames.current++;
    const now = performance.now();
    if (started.current === 0) started.current = now;
    const elapsed = now - started.current;
    if (elapsed < 5000) return; // longer warmup (first paints lie)
    warmed.current = true;
    const fps = (frames.current / elapsed) * 1000;
    // only downgrade if we're clearly below 20fps, never jump straight to fallback
    if (fps < 20) {
      const tier = qualityTier(store.quality);
      // never drop to "fallback" automatically — fallback needs no WebGL
      const next = tier <= 2 ? "medium" : "low";
      if (next !== store.quality) {
        console.info(`[scene] low fps (${fps.toFixed(0)}) → downgrading to ${next}`);
        setQuality(next);
      }
    }
  });
  return null;
}

function SceneWorld({ quality }: { quality: Quality }) {
  const preset = PRESETS[quality];
  return (
    <>
      <fog attach="fog" args={["#05060a", 8, 46]} />
      <DemandDriver />
      <CameraRig />
      <FPSWatchdog />
      <ServerRoom racks={preset.racks} />
      <Dust count={preset.particles} />
      <DataCables detail={quality === "high" ? "high" : "low"} />
      <NetworkGraph labels={preset.nodeDetail} />
      <Laptop />
      {preset.bloom && <Effects />}
      {/* scene-level base light so nothing ever renders pitch black */}
      <ambientLight intensity={0.38} color="#a8c4e0" />
      <directionalLight position={[4, 8, 6]} intensity={0.6} color="#cfe5ff" />
    </>
  );
}

/**
 * SceneRoot — owns the fixed full-screen scene layer.
 * fallback/reduced-motion quality → 2D cinematic mode instead of canvas.
 */
export default function SceneRoot() {
  const [quality, setQ] = useState<Quality>(store.quality);
  const [crashed, setCrashed] = useState(false);

  useEffect(() => subscribe((s) => setQ(s.quality)), []);

  // Fallback mode when WebGL dies or quality is fallback — content stays up.
  if (crashed || quality === "fallback") {
    return <SceneFallback />;
  }

  const preset = PRESETS[quality];

  return (
    <div className="scene-layer" aria-hidden="true" key={quality}>
      <GLBoundary
        onCrash={() => {
          setWebGL(false);
          setCrashed(true);
        }}
      >
        <Canvas
          dpr={preset.dpr as unknown as number | [number, number]}
          frameloop={preset.frameloop}
          resize={{ scroll: false, debounce: { scroll: 50, resize: 100 } }}
          gl={{
            antialias: quality !== "low",
            powerPreference: "high-performance",
            alpha: false,
            stencil: false,
          }}
          camera={{ position: [0, 1.6, 7], fov: 55, near: 0.1, far: 90 }}
          onCreated={({ gl }) => {
            gl.setClearColor("#05060a");
            // context lost → degrade instead of white screen
            gl.domElement.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              setWebGL(false);
              setCrashed(true);
            });
          }}
        >
          <Suspense fallback={null}>
            <SceneWorld quality={quality} />
          </Suspense>
        </Canvas>
      </GLBoundary>
    </div>
  );
}
