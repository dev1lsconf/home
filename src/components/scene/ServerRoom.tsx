"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { store } from "@/lib/store";

const RACK_W = 0.72, RACK_H = 2.3, RACK_D = 1.0, AISLE = 2.3;

interface RackInfo {
  x: number;
  z: number;
  face: 1 | -1; // which way the front faces (toward corridor)
}

/**
 * ServerRoom — a dense datacenter corridor: two long aisles of instanced
 * racks, LED matrix flickering on every front panel, spinning ceiling fans,
 * and a hero rack that reads as "the active machine" via a status bezel +
 * blinking activity LEDs + a soft spot — never a flat glowing slab.
 */
export default function ServerRoom({ racks }: { racks: number }) {
  const ledMeshRef = useRef<THREE.InstancedMesh>(null);
  const heroSpotRef = useRef<THREE.SpotLight>(null);
  const heroLedRef = useRef<THREE.InstancedMesh>(null);
  const heroStatusRef = useRef<THREE.Mesh>(null);
  const fanRef = useRef<THREE.Group>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const ledColor = useMemo(() => new THREE.Color(), []);

  // two aisles of racks forming a corridor the camera walks down (-z)
  const rackList = useMemo<RackInfo[]>(() => {
    const list: RackInfo[] = [];
    const perSide = Math.max(4, Math.floor(racks / 2));
    for (let i = 0; i < perSide; i++) {
      const z = 4 - i * (RACK_D + 0.35);
      list.push({ x: -AISLE / 2 - RACK_W / 2, z, face: 1 });
      list.push({ x: AISLE / 2 + RACK_W / 2, z, face: -1 });
    }
    return list;
  }, [racks]);

  // hero rack: front-right, second from entrance
  const HERO_I = 3;
  const hero = rackList[HERO_I] ?? rackList[0];

  // 10 LEDs per rack on the front face — dense enough to read as a server bank
  const ledOffsets = useMemo(() => {
    const arr: { x: number; y: number; z: number; face: 1 | -1; seed: number; hue: number }[] = [];
    for (let r = 0; r < rackList.length; r++) {
      const rk = rackList[r];
      const fx = rk.x + rk.face * (RACK_W / 2 + 0.014);
      for (let i = 0; i < 10; i++) {
        arr.push({
          x: fx,
          y: 0.45 + Math.floor(i / 5) * 1.35,
          z: rk.z - 0.32 + (i % 5) * 0.16,
          face: rk.face,
          seed: Math.random() * 100,
          hue: Math.random() < 0.78 ? 0.52 : 0.72,
        });
      }
    }
    return arr;
  }, [rackList]);

  // hero activity LEDs (faster blink, brighter)
  const heroLeds = useMemo(() => {
    if (!hero) return [];
    const fx = hero.x + hero.face * (RACK_W / 2 + 0.02);
    return Array.from({ length: 14 }, (_, i) => ({
      x: fx,
      y: 0.5 + (i % 7) * 0.24,
      z: hero.z - 0.3 + Math.floor(i / 7) * 0.5,
      seed: Math.random() * 100,
    }));
  }, [hero]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = store.progress;
    const heroOn = p > 0.05 && p < 0.22;

    // rack LEDs flicker
    if (ledMeshRef.current && Math.floor(t * 20) % 3 === 0) {
      for (let i = 0; i < ledOffsets.length; i++) {
        const led = ledOffsets[i];
        const flick = Math.sin(t * 3 + led.seed) > 0.1 ? 1 : 0.22;
        ledColor.setHSL(led.hue, 0.9, 0.42 * flick);
        ledMeshRef.current.setColorAt(i, ledColor);
      }
      ledMeshRef.current.instanceColor!.needsUpdate = true;
    }

    // fans spin
    if (fanRef.current) {
      fanRef.current.children.forEach((f, i) => {
        f.rotation.y = t * (4 + i * 0.7);
      });
    }

    // hero status strip (small horizontal cyan bar — like a powered server status line)
    if (heroStatusRef.current) {
      const m = heroStatusRef.current.material as THREE.MeshBasicMaterial;
      const target = heroOn ? 1 : 0.06;
      m.opacity += (target - m.opacity) * 0.09;
    }
    // hero spot light pools onto the corridor floor
    if (heroSpotRef.current) {
      heroSpotRef.current.intensity += ((heroOn ? 5 : 0.4) - heroSpotRef.current.intensity) * 0.08;
    }
    // hero activity LEDs blink when active
    if (heroLedRef.current) {
      const mat = heroLedRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity += ((heroOn ? 1 : 0.25) - mat.opacity) * 0.1;
      if (Math.floor(t * 20) % 2 === 0) {
        for (let i = 0; i < heroLeds.length; i++) {
          const led = heroLeds[i];
          const blink = heroOn ? (Math.sin(t * 7 + led.seed) > -0.2 ? 1 : 0.05) : 0.3;
          ledColor.setHSL(0.52, 1, 0.6 * blink);
          heroLedRef.current.setColorAt(i, ledColor);
        }
        heroLedRef.current.instanceColor!.needsUpdate = true;
      }
    }
  });

  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -6]}>
        <planeGeometry args={[14, 44]} />
        <meshStandardMaterial color="#07090d" metalness={0.85} roughness={0.35} />
      </mesh>
      {/* ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.3, -6]}>
        <planeGeometry args={[14, 44]} />
        <meshStandardMaterial color="#04060a" />
      </mesh>
      {/* end wall */}
      <mesh position={[0, 1.65, -17.5]}>
        <planeGeometry args={[14, 3.3]} />
        <meshStandardMaterial color="#050810" metalness={0.6} roughness={0.6} />
      </mesh>

      {/* rack bodies */}
      <instancedMesh
        ref={(m) => {
          if (m) {
            rackList.forEach((r, i) => {
              dummy.position.set(r.x, RACK_H / 2, r.z);
              dummy.rotation.set(0, 0, 0);
              dummy.updateMatrix();
              m.setMatrixAt(i, dummy.matrix);
            });
            m.instanceMatrix.needsUpdate = true;
          }
        }}
        args={[undefined, undefined, rackList.length]}
        key={rackList.length}
      >
        <boxGeometry args={[RACK_W, RACK_H, RACK_D]} />
        <meshStandardMaterial color="#11151d" metalness={0.72} roughness={0.38} />
      </instancedMesh>

      {/* rack front panels (give the rows definition) */}
      <instancedMesh
        ref={(m) => {
          if (m) {
            rackList.forEach((r, i) => {
              dummy.position.set(r.x + r.face * (RACK_W / 2 + 0.005), RACK_H / 2, r.z);
              dummy.rotation.set(0, r.face > 0 ? Math.PI / 2 : -Math.PI / 2, 0);
              dummy.updateMatrix();
              m.setMatrixAt(i, dummy.matrix);
            });
            m.instanceMatrix.needsUpdate = true;
          }
        }}
        args={[undefined, undefined, rackList.length]}
        key={`fp-${rackList.length}`}
      >
        <planeGeometry args={[RACK_D * 0.92, RACK_H * 0.9]} />
        <meshStandardMaterial color="#161c26" metalness={0.6} roughness={0.5} />
      </instancedMesh>

      {/* rack LEDs */}
      <instancedMesh
        ref={(m) => {
          if (m) {
            ledOffsets.forEach((led, i) => {
              dummy.position.set(led.x, led.y, led.z);
              dummy.rotation.set(0, led.face > 0 ? Math.PI / 2 : -Math.PI / 2, 0);
              dummy.updateMatrix();
              m.setMatrixAt(i, dummy.matrix);
              m.setColorAt(i, ledColor.setHSL(led.hue, 0.9, 0.4));
            });
            m.instanceMatrix.needsUpdate = true;
            if (m.instanceColor) m.instanceColor.needsUpdate = true;
            ledMeshRef.current = m;
          }
        }}
        args={[undefined, undefined, ledOffsets.length]}
        key={`led-${ledOffsets.length}`}
      >
        <planeGeometry args={[0.066, 0.066]} />
        <meshBasicMaterial toneMapped={false} side={THREE.DoubleSide} transparent />
      </instancedMesh>

      {/* HERO rack — distinguished by detail, not by a big glow */}
      {hero && (
        <group position={[hero.x, 0, hero.z]}>
          <mesh position={[0, RACK_H / 2, 0]}>
            <boxGeometry args={[RACK_W, RACK_H, RACK_D]} />
            <meshStandardMaterial color="#181f2b" metalness={0.78} roughness={0.28} />
          </mesh>
          <mesh
            position={[hero.face * (RACK_W / 2 + 0.012), RACK_H / 2, 0]}
            rotation={[0, hero.face > 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
          >
            <planeGeometry args={[RACK_D * 0.9, RACK_H * 0.9]} />
            <meshStandardMaterial color="#1c2433" metalness={0.7} roughness={0.35} />
          </mesh>
          {/* horizontal status strip (thin cyan line — like a server "on" bar) */}
          <mesh
            ref={heroStatusRef}
            position={[hero.face * (RACK_W / 2 + 0.03), RACK_H * 0.79, 0]}
            rotation={[0, hero.face > 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
          >
            <planeGeometry args={[RACK_D * 0.7, 0.035]} />
            <meshBasicMaterial color="#52e6ff" transparent opacity={0.06} toneMapped={false} />
          </mesh>
          {/* activity LEDs on hero front */}
          <instancedMesh
            ref={(m) => {
              if (m) {
                heroLeds.forEach((led, i) => {
                  dummy.position.set(led.x, led.y, led.z);
                  dummy.rotation.set(0, hero.face > 0 ? Math.PI / 2 : -Math.PI / 2, 0);
                  dummy.updateMatrix();
                  m.setMatrixAt(i, dummy.matrix);
                  m.setColorAt(i, ledColor.setHSL(0.52, 1, 0.18));
                });
                m.instanceMatrix.needsUpdate = true;
                if (m.instanceColor) m.instanceColor.needsUpdate = true;
                heroLedRef.current = m;
              }
            }}
            args={[undefined, undefined, heroLeds.length]}
            key={`hero-led-${heroLeds.length}`}
          >
            <planeGeometry args={[0.045, 0.045]} />
            <meshBasicMaterial toneMapped={false} side={THREE.DoubleSide} transparent opacity={0.25} />
          </instancedMesh>
          {/* pool of light onto the floor in front of the hero */}
          <spotLight
            ref={heroSpotRef}
            position={[hero.x + hero.face * 1.4, 2.6, hero.z + 0.4]}
            angle={0.55}
            penumbra={0.8}
            intensity={0.4}
            color="#9fe9ff"
            target-position={[hero.x + hero.face * 0.9, 0, hero.z]}
            distance={7}
            decay={2}
          />
        </group>
      )}

      {/* ceiling fans */}
      <group ref={fanRef} position={[0, 3.15, -4]}>
        {[-1, -5, -9, -13].map((z, i) => (
          <group key={i} position={[0, 0, z]}>
            <mesh>
              <boxGeometry args={[1.6, 0.05, 0.14]} />
              <meshStandardMaterial color="#1a2028" metalness={0.8} roughness={0.35} />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[1.6, 0.05, 0.14]} />
              <meshStandardMaterial color="#1a2028" metalness={0.8} roughness={0.35} />
            </mesh>
          </group>
        ))}
      </group>

      {/* corridor lighting */}
      <ambientLight intensity={0.26} color="#8fa8c4" />
      <spotLight position={[0, 3.1, 4]} angle={0.6} penumbra={0.9} intensity={4.5} color="#cfeaff" target-position={[0, 0, -2]} />
      <pointLight position={[-1.4, 2.4, -5]} intensity={1.5} color="#8b6bff" distance={8} decay={2} />
      <pointLight position={[1.4, 2.4, -8]} intensity={1.5} color="#52e6ff" distance={8} decay={2} />
      <pointLight position={[0, 2.8, -12]} intensity={1.8} color="#bfe9ff" distance={10} decay={2} />
    </group>
  );
}
