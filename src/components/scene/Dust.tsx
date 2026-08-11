"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { store } from "@/lib/store";

/** deterministic rng for stable particles across re-renders */
function makeRng(seedBase: number) {
  let s = seedBase >>> 0;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

/**
 * Dust — ambient floating particles around the whole journey path.
 * Count is preset-driven (3000 / 1000 / 300). One draw call.
 * Positions regenerated via `key` prop when quality changes.
 */
export default function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const rng = makeRng(7);
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rng() - 0.5) * 14;
      positions[i * 3 + 1] = rng() * 6;
      positions[i * 3 + 2] = 6 - rng() * 64; // spread along journey z
      speeds[i] = 0.2 + rng() * 0.8;
    }
    return { positions, speeds };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const geo = ref.current.geometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const t = clock.getElapsedTime();
    // gentle drift — cheap, no allocation
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i);
      const next = y + Math.sin(t * speeds[i] + i) * 0.0012;
      pos.setY(i, next > 6 ? 0.1 : next);
    }
    pos.needsUpdate = true;
    // fade dust out in the laptop sections to keep the hero clean
    const p = store.progress;
    const fade = p > 0.6 && p < 0.95 ? 0.35 : 1;
    (ref.current.material as THREE.PointsMaterial).opacity = 0.55 * fade;
  });

  return (
    <points ref={ref} key={count}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#8fd8ff"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
