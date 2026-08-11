"use client";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { store } from "@/lib/store";

const POS = new THREE.Vector3(0, 1.55, -56);

/**
 * Laptop — the destination. Big, centered, readable from a distance:
 * silver-anodized body (catches the room lights), black bezel, lit screen
 * with procedural UI, glowing brand dot on the lid, on a pedestal with a
 * cyan ring. Contrast is deliberate: the machine reads as LIGHT on DARK.
 */
export default function Laptop() {
  const screenMat = useRef<THREE.MeshStandardMaterial>(null);
  const rootGroup = useRef<THREE.Group>(null);
  const screenGlow = useRef<THREE.PointLight>(null);
  const keyLightRef = useRef<THREE.SpotLight>(null);
  const lidRef = useRef<THREE.Group>(null);
  const floatRef = useRef<THREE.Group>(null);
  const brandMat = useRef<THREE.MeshStandardMaterial>(null);

  const screenTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 320;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#081018";
    ctx.fillRect(0, 0, 512, 320);
    ctx.fillStyle = "#0e1620";
    ctx.fillRect(0, 0, 512, 26);
    ctx.fillStyle = "#52e6ff";
    ctx.beginPath(); ctx.arc(16, 13, 4, 0, 7); ctx.fill();
    ctx.fillStyle = "#8b6bff";
    ctx.beginPath(); ctx.arc(30, 13, 4, 0, 7); ctx.fill();
    ctx.fillStyle = "#e8f4ff";
    ctx.fillRect(40, 60, 280, 24);
    ctx.fillStyle = "#52e6ff";
    ctx.fillRect(40, 94, 190, 8);
    ctx.fillStyle = "#22303f";
    [120, 134, 148, 162].forEach((y, i) => ctx.fillRect(40, y, 432 - i * 40, 7));
    ctx.fillStyle = "#0c1420";
    ctx.fillRect(40, 192, 432, 94);
    ctx.strokeStyle = "#52e6ff44";
    ctx.strokeRect(40, 192, 432, 94);
    ctx.strokeStyle = "#52e6ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= 20; i++) {
      const x = 52 + (i / 20) * 408;
      const y = 246 - Math.sin(i * 1.1) * 26 - Math.cos(i * 0.7) * 10;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = "#52e6ff22";
    [52, 140, 240].forEach((x) => ctx.fillRect(x, 254, 74, 20));
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useEffect(() => () => screenTexture?.dispose(), [screenTexture]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = store.progress;
    // final section: the machine sinks away and then HIDEs completely
    const gone = p > 0.945;
    if (rootGroup.current) {
      if (gone && rootGroup.current.position.y < POS.y - 4.5) {
        rootGroup.current.visible = false;
      } else if (!gone) {
        rootGroup.current.visible = true;
      }
      const targetY = gone ? POS.y - 6 : POS.y;
      rootGroup.current.position.y += (targetY - rootGroup.current.position.y) * 0.12;
    }
    if (lidRef.current) {
      const targetRot = p > 0.5 ? -0.26 : -1.5;
      lidRef.current.rotation.x += (targetRot - lidRef.current.rotation.x) * 0.06;
    }
    const lit = p > 0.54;
    if (screenMat.current) {
      const target = gone ? 0.02 : lit ? 2.2 : 0.03;
      screenMat.current.emissiveIntensity += (target - screenMat.current.emissiveIntensity) * 0.06;
    }
    if (screenGlow.current) {
      const target = gone ? 0 : lit ? 7 : 0;
      screenGlow.current.intensity += (target - screenGlow.current.intensity) * 0.06;
    }
    if (brandMat.current) {
      // brand dot gently pulses — until the final fade
      const pulse = 0.8 + Math.sin(t * 1.6) * 0.35;
      brandMat.current.emissiveIntensity += (((gone ? 0 : pulse)) - brandMat.current.emissiveIntensity) * 0.06;
    }
    if (keyLightRef.current) {
      keyLightRef.current.intensity += (((gone ? 0 : 3)) - keyLightRef.current.intensity) * 0.05;
    }
    if (floatRef.current) {
      floatRef.current.position.y = Math.sin(t * 0.8) * 0.03;
    }
  });

  return (
    <group ref={rootGroup} position={POS}>
      {/* pedestal */}
      <mesh position={[0, -1.1, 0]}>
        <cylinderGeometry args={[1.35, 1.55, 0.12, 40]} />
        <meshStandardMaterial color="#0b0e14" metalness={0.85} roughness={0.28} />
      </mesh>
      {/* cyan accent ring on pedestal */}
      <mesh position={[0, -1.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.1, 1.24, 40]} />
        <meshBasicMaterial color="#52e6ff" transparent opacity={0.6} toneMapped={false} />
      </mesh>

      {/* floating machine */}
      <group ref={floatRef}>
        {/* SILVER body — light anodized aluminum, reads against the dark scene */}
        <RoundedBox args={[2.2, 0.1, 1.45]} radius={0.04}>
          <meshStandardMaterial color="#c9d2dc" metalness={0.9} roughness={0.32} />
        </RoundedBox>
        {/* black keyboard deck inset */}
        <mesh position={[0, 0.052, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.9, 0.95]} />
          <meshStandardMaterial color="#0d1117" metalness={0.6} roughness={0.55} />
        </mesh>

        {/* lid */}
        <group ref={lidRef} position={[0, 0.048, -0.72]} rotation={[-1.5, 0, 0]}>
          <group position={[0, 0, 0.75]}>
            {/* silver lid back */}
            <RoundedBox args={[2.2, 1.46, 0.07]} radius={0.04}>
              <meshStandardMaterial color="#c9d2dc" metalness={0.9} roughness={0.32} />
            </RoundedBox>
            {/* brand dot on lid back (glowing, visible when closed) */}
            <mesh position={[0, 0, -0.04]} rotation={[0, Math.PI, 0]}>
              <circleGeometry args={[0.11, 24]} />
              <meshStandardMaterial
                ref={brandMat}
                color="#52e6ff"
                emissive="#52e6ff"
                emissiveIntensity={1}
                toneMapped={false}
              />
            </mesh>
            {/* black bezel (front) */}
            <mesh position={[0, 0, 0.04]}>
              <planeGeometry args={[2.02, 1.32]} />
              <meshStandardMaterial color="#05070b" metalness={0.4} roughness={0.6} />
            </mesh>
            {/* cyan edge accent around bezel */}
            <mesh position={[0, 0, 0.041]}>
              <planeGeometry args={[1.95, 1.25]} />
              <meshBasicMaterial color="#52e6ff" transparent opacity={0.35} toneMapped={false} />
            </mesh>
            {/* screen (inset inside the cyan edge) */}
            <mesh position={[0, 0, 0.05]}>
              <planeGeometry args={[1.86, 1.17]} />
              <meshStandardMaterial
                ref={screenMat}
                color="#04070c"
                emissive="#ffffff"
                emissiveMap={screenTexture ?? undefined}
                map={screenTexture ?? undefined}
                emissiveIntensity={0.03}
                toneMapped={false}
              />
            </mesh>
          </group>
        </group>
      </group>

      {/* lighting: rim accents + top key so silver catches light */}
      <pointLight ref={screenGlow} position={[0, 0.4, 1.2]} color="#cfeaff" intensity={0} distance={5.5} decay={2} />
      <pointLight position={[-2.5, 1.4, -1]} color="#9470ff" intensity={2.4} distance={7} decay={2} />
      <pointLight position={[2.5, 0.9, -1]} color="#4fd8ff" intensity={2.2} distance={7} decay={2} />
      <spotLight ref={keyLightRef} position={[0, 4.2, 2.5]} angle={0.5} penumbra={0.8} intensity={3.2} color="#ffffff" target-position={[0, 1.3, 0]} distance={10} decay={2} />
    </group>
  );
}
