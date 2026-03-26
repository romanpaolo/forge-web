"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// ─── Hex Nut ─────────────────────────────────────────────────────────────────

function HexNut() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.06;
    }
  });

  const hexShape = useMemo(() => {
    const shape = new THREE.Shape();
    const sides = 6;
    const r = 2.4;
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 6;
      if (i === 0) shape.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
      else shape.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    shape.closePath();
    const hole = new THREE.Path();
    for (let i = 0; i < 48; i++) {
      const angle = (i / 48) * Math.PI * 2;
      if (i === 0) hole.moveTo(Math.cos(angle) * 0.95, Math.sin(angle) * 0.95);
      else hole.lineTo(Math.cos(angle) * 0.95, Math.sin(angle) * 0.95);
    }
    hole.closePath();
    shape.holes.push(hole);
    return shape;
  }, []);

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef} rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow receiveShadow>
          <extrudeGeometry args={[hexShape, { depth: 1, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.08, bevelSegments: 4 }]} />
          <meshStandardMaterial color="#5A6B80" metalness={0.95} roughness={0.08} envMapIntensity={2} />
        </mesh>
        {/* Bore ring highlights */}
        {[1.02, -0.02].map((z) => (
          <mesh key={z} position={[0, 0, z]}>
            <torusGeometry args={[0.95, 0.02, 16, 48]} />
            <meshStandardMaterial color="#CBD5E1" metalness={1} roughness={0.05} emissive="#94A3B8" emissiveIntensity={0.4} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// ─── Orbital Ring ────────────────────────────────────────────────────────────

function OrbitalRing({ radius, speed, opacity, tilt }: { radius: number; speed: number; opacity: number; tilt: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.z += delta * speed; });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.005, 16, 150]} />
      <meshBasicMaterial color="#0EA5E9" transparent opacity={opacity} />
    </mesh>
  );
}

// ─── Orbital Dot ─────────────────────────────────────────────────────────────

function OrbitalDot({ radius, speed, tilt, color = "#0EA5E9" }: { radius: number; speed: number; tilt: [number, number, number]; color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = useRef(Math.random() * Math.PI * 2);
  useFrame((_, delta) => {
    if (ref.current) {
      angle.current += delta * speed;
      ref.current.position.x = Math.cos(angle.current) * radius;
      ref.current.position.y = Math.sin(angle.current) * radius;
    }
  });
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

// ─── Scan Ring ───────────────────────────────────────────────────────────────

function ScanRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (ref.current) {
      const t = (Date.now() % 4000) / 4000;
      const scale = 1 + t * 1.8;
      ref.current.scale.set(scale, scale, 1);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.25 * (1 - t);
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2.2, 2.26, 6]} />
      <meshBasicMaterial color="#0EA5E9" transparent opacity={0.25} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ─── Data Panel (geometric, no text) ─────────────────────────────────────────
// AR-style floating panel represented as a glowing bordered rectangle

function DataPanel({ position, width, height }: { position: [number, number, number]; width: number; height: number }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(Date.now() * 0.0008 + position[0] * 2) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Panel bg */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#0A0A0F" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* Border */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(width, height)]} />
        <lineBasicMaterial color="#0EA5E9" transparent opacity={0.3} />
      </lineSegments>
      {/* Data bar lines inside */}
      {[0.15, 0, -0.15].map((y, i) => (
        <mesh key={i} position={[-width * 0.15, y, 0.001]}>
          <planeGeometry args={[width * (0.4 + i * 0.12), 0.025]} />
          <meshBasicMaterial color={i === 0 ? "#0EA5E9" : "#334155"} transparent opacity={i === 0 ? 0.6 : 0.4} />
        </mesh>
      ))}
      {/* Corner dots */}
      {[
        [-width / 2, height / 2],
        [width / 2, height / 2],
        [-width / 2, -height / 2],
        [width / 2, -height / 2],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.001]}>
          <circleGeometry args={[0.02, 8]} />
          <meshBasicMaterial color="#0EA5E9" />
        </mesh>
      ))}
      {/* Connector line to center */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, 0, 0, -position[0] * 0.5, -position[1] * 0.5, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#0EA5E9" transparent opacity={0.1} />
      </line>
    </group>
  );
}

// ─── Crosshair ───────────────────────────────────────────────────────────────

function Crosshair() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.z -= delta * 0.06; });

  return (
    <group ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      {/* Outer dashed ring */}
      <mesh>
        <ringGeometry args={[3.3, 3.33, 6]} />
        <meshBasicMaterial color="#334155" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      {/* Tick marks at hex vertices */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const inner = 3.0;
        const outer = 3.5;
        const positions = new Float32Array([
          Math.cos(angle) * inner, Math.sin(angle) * inner, 0,
          Math.cos(angle) * outer, Math.sin(angle) * outer, 0,
        ]);
        return (
          <lineSegments key={i}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="#64748B" transparent opacity={0.4} />
          </lineSegments>
        );
      })}
    </group>
  );
}

// ─── Spatial Grid ────────────────────────────────────────────────────────────

function SpatialGrid() {
  const positions = useMemo(() => {
    const pos: number[] = [];
    for (let x = -10; x <= 10; x += 1.2) {
      for (let z = -8; z <= 4; z += 1.2) {
        pos.push(x, -3.5, z);
      }
    }
    return new Float32Array(pos);
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#1E293B" size={0.035} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// ─── Particle Field ──────────────────────────────────────────────────────────

function ParticleField() {
  const positions = useMemo(() => {
    const pos = new Float32Array(250 * 3);
    for (let i = 0; i < 250; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.012; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#334155" size={0.02} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

// ─── Camera Rig ──────────────────────────────────────────────────────────────

function CameraRig() {
  const target = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x += (target.current.x - camera.position.x) * 0.015;
    camera.position.y += (target.current.y + 0.3 - camera.position.y) * 0.015;
    camera.lookAt(0, 0, 0);
  });

  // Set up listener once
  useMemo(() => {
    if (typeof window !== "undefined") {
      const handler = (e: MouseEvent) => {
        target.current.x = (e.clientX / window.innerWidth - 0.5) * 1.2;
        target.current.y = (e.clientY / window.innerHeight - 0.5) * -0.6;
      };
      window.addEventListener("mousemove", handler, { passive: true });
    }
  }, []);

  return null;
}

// ─── Scene ───────────────────────────────────────────────────────────────────

export default function HexNutScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.3, 7], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#050507"]} />

        {/* Lighting */}
        <ambientLight intensity={0.08} />
        <directionalLight position={[5, 8, 5]} intensity={0.9} color="#E2E8F0" />
        <directionalLight position={[-5, 3, -4]} intensity={0.3} color="#0EA5E9" />
        <pointLight position={[0, 0, 4]} intensity={0.5} color="#0EA5E9" distance={10} />
        <pointLight position={[2, -2, 2]} intensity={0.2} color="#14B8A6" distance={8} />

        <Environment preset="city" environmentIntensity={0.4} />

        {/* Core */}
        <HexNut />
        <ScanRing />
        <Crosshair />

        {/* Orbits */}
        <OrbitalRing radius={3.8} speed={0.2} opacity={0.2} tilt={[0.25, 0.15, 0]} />
        <OrbitalRing radius={4.5} speed={-0.1} opacity={0.12} tilt={[-0.12, 0.35, 0.08]} />
        <OrbitalRing radius={5.2} speed={0.06} opacity={0.06} tilt={[0.08, -0.25, 0.12]} />

        <OrbitalDot radius={3.8} speed={0.3} tilt={[0.25, 0.15, 0]} />
        <OrbitalDot radius={4.5} speed={-0.18} tilt={[-0.12, 0.35, 0.08]} />
        <OrbitalDot radius={5.2} speed={0.12} tilt={[0.08, -0.25, 0.12]} color="#14B8A6" />

        {/* AR data panels */}
        <DataPanel position={[4.5, 1.8, -2]} width={1.2} height={0.6} />
        <DataPanel position={[-4, 1, -1.5]} width={1.0} height={0.5} />
        <DataPanel position={[4, -1.5, -2]} width={0.9} height={0.45} />
        <DataPanel position={[-3.8, -1.8, -1]} width={1.1} height={0.55} />

        {/* Environment */}
        <ParticleField />
        <SpatialGrid />
        <CameraRig />
      </Canvas>
    </div>
  );
}
