"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { store } from "@/lib/store";

const PACKET_COUNT = 26;

/**
 * DataCables — luminous fibre strands carrying packets from the server
 * room, through a corridor, into the network graph. Visible from the
 * server section onward (fade-managed).
 */
export default function DataCables({ detail }: { detail: "high" | "low" }) {
  const group = useRef<THREE.Group>(null);
  const packetsRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { curves, tubeGeos } = useMemo(() => {
    const start = new THREE.Vector3(1.35, 1.5, -1.2); // hero server
    const defs = [
      [new THREE.Vector3(0.4, 2.2, -7), new THREE.Vector3(0.9, 1.4, -16), new THREE.Vector3(0, 2.6, -26)],
      [new THREE.Vector3(-0.6, 1.2, -8), new THREE.Vector3(-1.0, 2.8, -18), new THREE.Vector3(1.5, 3.4, -27)],
      [new THREE.Vector3(0.2, 0.7, -9), new THREE.Vector3(0.4, 3.0, -17), new THREE.Vector3(-1.2, 1.8, -25)],
    ];
    const segs = detail === "high" ? 120 : 60;
    const curves = defs.map(
      (pts) => new THREE.CatmullRomCurve3([start.clone(), ...pts, new THREE.Vector3(0, 2, -38)]),
    );
    const tubeGeos = curves.map((c) => new THREE.TubeGeometry(c, segs, 0.02, detail === "high" ? 8 : 5, false));
    return { curves, tubeGeos };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail]);

  // dispose tube geometries on unmount
  useMemo(() => () => tubeGeos.forEach((g) => g.dispose()), [tubeGeos]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      // fade with scene relevance
      const p = store.progress;
      const visible = p > 0.04;
      group.current.visible = visible;
      const target = p > 0.04 ? 1 : 0;
      group.current.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.Material | undefined;
        if (m && "opacity" in m) {
          (m as THREE.MeshBasicMaterial).opacity += (target - (m as THREE.MeshBasicMaterial).opacity) * 0.05;
        }
      });
    }
    if (packetsRef.current) {
      for (let i = 0; i < PACKET_COUNT; i++) {
        const curve = curves[i % curves.length];
        const speed = 0.055 + (i % 5) * 0.012;
        const u = (t * speed + i * 0.037) % 1;
        const pt = curve.getPointAt(u);
        dummy.position.copy(pt);
        const s = 0.55 + 0.45 * Math.sin(t * 2 + i);
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        packetsRef.current.setMatrixAt(i, dummy.matrix);
      }
      packetsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group} visible={false}>
      {tubeGeos.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshBasicMaterial
            color={i % 2 === 0 ? "#52e6ff" : "#8b6bff"}
            transparent
            opacity={0.35}
            toneMapped={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
      <instancedMesh ref={packetsRef} args={[undefined, undefined, PACKET_COUNT]} key={PACKET_COUNT}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="#9ff3ff" toneMapped={false} transparent opacity={0.95} blending={THREE.AdditiveBlending} />
      </instancedMesh>
    </group>
  );
}
