"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";

const EXPLODE_DISTANCE = 1.8;

function buildFaces() {
  const geometry = new THREE.IcosahedronGeometry(1.4, 0);
  const position = geometry.attributes.position;
  const faces: { geometry: THREE.BufferGeometry; direction: THREE.Vector3 }[] = [];

  for (let i = 0; i < position.count; i += 3) {
    const a = new THREE.Vector3().fromBufferAttribute(position, i);
    const b = new THREE.Vector3().fromBufferAttribute(position, i + 1);
    const c = new THREE.Vector3().fromBufferAttribute(position, i + 2);
    const direction = a.clone().add(b).add(c).divideScalar(3).normalize();

    const faceGeometry = new THREE.BufferGeometry();
    faceGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([...a.toArray(), ...b.toArray(), ...c.toArray()], 3)
    );

    faces.push({ geometry: faceGeometry, direction });
  }

  return faces;
}

function ExplodingIcosahedron() {
  const faces = useMemo(buildFaces, []);
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const progress = useRef({ t: 0 });

  useMemo(() => {
    gsap.to(progress.current, {
      t: 1,
      duration: 2.6,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      repeatDelay: 0.8,
    });
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.1;
      groupRef.current.rotation.y += delta * 0.15;
    }
    faces.forEach((face, i) => {
      const mesh = meshRefs.current[i];
      if (mesh) {
        mesh.position.copy(face.direction).multiplyScalar(progress.current.t * EXPLODE_DISTANCE);
      }
    });
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef}>
        {faces.map((face, i) => (
          <mesh
            key={i}
            ref={(el) => {
              meshRefs.current[i] = el;
            }}
            geometry={face.geometry}
          >
            <meshBasicMaterial color="#3fa796" wireframe />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={1} />
      <ExplodingIcosahedron />
    </Canvas>
  );
}
