"use client";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { store } from "@/lib/store";
import { sampleCam } from "@/lib/scroll-timeline";

const lookTarget = new THREE.Vector3();
const posTarget = new THREE.Vector3();

/**
 * CameraRig — THE camera. Reads store.progress every frame, samples the
 * cinematic timeline, and smooth-damps toward the target. The damping is
 * what kills any "jumps": the camera always glides, never teleports.
 * Does nothing in reduced-motion mode (sections crossfade statically).
 */
export default function CameraRig() {
  const fovRef = {
    current: 55,
  };

  useFrame(({ camera }, delta) => {
    if (store.reducedMotion) return;
    const { pos, look, fov } = sampleCam(store.progress);
    posTarget.set(pos[0], pos[1], pos[2]);
    lookTarget.set(look[0], look[1], look[2]);

    // frame-rate independent damping (lambda ~4 = buttery, keeps up with scroll)
    const k = 1 - Math.exp(-4 * Math.min(delta, 0.05));
    camera.position.lerp(posTarget, k);
    camera.lookAt(lookTarget);

    const persp = camera as THREE.PerspectiveCamera;
    fovRef.current += (fov - fovRef.current) * k;
    if (Math.abs(persp.fov - fovRef.current) > 0.01) {
      persp.fov = fovRef.current;
      persp.updateProjectionMatrix();
    }
  });
  return null;
}
