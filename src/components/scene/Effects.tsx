"use client";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

/**
 * Effects — post-processing tuned for the dark/tech look.
 * Only mounted on high/medium presets (low keeps it clean & fast).
 */
export default function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.55}
        luminanceThreshold={0.72}
        luminanceSmoothing={0.18}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.22} darkness={0.78} />
    </EffectComposer>
  );
}
