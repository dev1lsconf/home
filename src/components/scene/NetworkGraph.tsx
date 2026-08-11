"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { store } from "@/lib/store";

const CENTER = new THREE.Vector3(0, 2, -38);
const R = 11;

/**
 * NetworkGraph — abstract global network: glowing nodes on a tilted
 * lattice, edge lines, and packets that travel between named hub nodes
 * (SERVER → DATABASE → API → CLOUD → CLIENT). Deterministic layout.
 */
export default function NetworkGraph({ labels }: { labels: boolean }) {
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const trafficRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { nodePositions, edges, hubs } = useMemo(() => {
    // deterministic pseudo-random
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const nodes: THREE.Vector3[] = [];
    const N = labels ? 26 : 18;
    for (let i = 0; i < N; i++) {
      const theta = rand() * Math.PI * 2;
      const r = 4 + rand() * R * 0.8;
      nodes.push(
        new THREE.Vector3(
          CENTER.x + Math.cos(theta) * r,
          CENTER.y + (rand() - 0.4) * 6,
          CENTER.z + Math.sin(theta) * r * 0.7,
        ),
      );
    }
    // hubs on a clean arc facing the camera path
    const hubsArr = [
      { name: "SERVER", pos: new THREE.Vector3(-6, 4.4, CENTER.z + 3) },
      { name: "DATABASE", pos: new THREE.Vector3(-3, 0.4, CENTER.z + 5) },
      { name: "API", pos: new THREE.Vector3(0, 5.5, CENTER.z + 2) },
      { name: "CLOUD", pos: new THREE.Vector3(3.5, 3.4, CENTER.z + 4.5) },
      { name: "CLIENT", pos: new THREE.Vector3(6, 1.8, CENTER.z + 3) },
    ];
    hubsArr.forEach((h) => nodes.push(h.pos));

    // edges: connect hubs in a chain + sprinkle between random nodes
    const edges: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < hubsArr.length - 1; i++) edges.push([hubsArr[i].pos, hubsArr[i + 1].pos]);
    edges.push([hubsArr[0].pos, hubsArr[2].pos], [hubsArr[1].pos, hubsArr[3].pos], [hubsArr[4].pos, hubsArr[2].pos]);
    for (let i = 0; i < nodes.length - hubsArr.length - 1; i += 2) {
      edges.push([nodes[i], nodes[(i + 3) % (nodes.length - hubsArr.length)]]);
    }

    return { nodePositions: nodes, edges, hubs: hubsArr };
  }, [labels]);

  const lineGeo = useMemo(() => {
    const pts: number[] = [];
    edges.forEach(([a, b]) => pts.push(a.x, a.y, a.z, b.x, b.y, b.z));
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, [edges]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = store.progress;
    const active = p > 0.2 && p < 0.82;
    if (group.current) {
      group.current.visible = active;
      group.current.rotation.y = t * 0.02;
    }
    if (!active) return;

    if (nodesRef.current) {
      nodePositions.forEach((n, i) => {
        dummy.position.copy(n);
        const pulse = 0.8 + 0.35 * Math.sin(t * 1.4 + i * 1.7);
        dummy.scale.setScalar(pulse);
        dummy.updateMatrix();
        nodesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }

    // packets traveling hub chain
    if (trafficRef.current) {
      const COUNT = 14;
      for (let i = 0; i < COUNT; i++) {
        const [a, b] = edges[i % hubs.length - 1 === -1 ? 0 : i % (hubs.length - 1)];
        const u = (t * 0.12 + i * 0.11) % 1;
        dummy.position.lerpVectors(a, b, u);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        trafficRef.current.setMatrixAt(i, dummy.matrix);
      }
      trafficRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group} visible={false}>
      {/* nodes */}
      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodePositions.length]} key={nodePositions.length}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial color="#9ff3ff" toneMapped={false} />
      </instancedMesh>

      {/* edges */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#52e6ff" transparent opacity={0.16} toneMapped={false} />
      </lineSegments>

      {/* traveling packets */}
      <instancedMesh ref={trafficRef} args={[undefined, undefined, 14]} key="traffic">
        <boxGeometry args={[0.06, 0.06, 0.06]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} transparent opacity={0.9} blending={THREE.AdditiveBlending} />
      </instancedMesh>

      {/* hub labels + halos */}
      {hubs.map((h) => (
        <group key={h.name} position={h.pos}>
          <pointLight color={h.name === "CLOUD" ? "#8b6bff" : "#52e6ff"} intensity={2.2} distance={4} decay={2} />
          <mesh>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshBasicMaterial color={h.name === "CLOUD" ? "#8b6bff" : "#52e6ff"} toneMapped={false} />
          </mesh>
          {labels && (
            <Text
              position={[0, 0.42, 0]}
              fontSize={0.22}
              color="#cfefff"
              anchorX="center"
              anchorY="bottom"
              letterSpacing={0.18}
              characters="SERVERDATABASEPICOULNT"
            >
              {h.name}
            </Text>
          )}
        </group>
      ))}
    </group>
  );
}
