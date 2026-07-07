"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const HALF = 0.7;
const LAUNCH_DISTANCE = 1.6;
const FACING_THRESHOLD = 0.82;

const FACES: { direction: THREE.Vector3; rotation: [number, number, number] }[] = [
  { direction: new THREE.Vector3(1, 0, 0), rotation: [0, Math.PI / 2, 0] },
  { direction: new THREE.Vector3(-1, 0, 0), rotation: [0, -Math.PI / 2, 0] },
  { direction: new THREE.Vector3(0, 1, 0), rotation: [-Math.PI / 2, 0, 0] },
  { direction: new THREE.Vector3(0, -1, 0), rotation: [Math.PI / 2, 0, 0] },
  { direction: new THREE.Vector3(0, 0, 1), rotation: [0, 0, 0] },
  { direction: new THREE.Vector3(0, 0, -1), rotation: [0, Math.PI, 0] },
];

function ColorCyclingCube() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const launchProgress = useRef<number[]>(FACES.map(() => 0));
  const hueRef = useRef(0);
  const colorRef = useRef(new THREE.Color());
  const emissiveRef = useRef(new THREE.Color());

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    group.rotation.x += delta * 0.4;
    group.rotation.y += delta * 0.6;

    hueRef.current = (hueRef.current + delta * 0.08) % 1;
    colorRef.current.setHSL(hueRef.current, 0.7, 0.5);
    emissiveRef.current.setHSL(hueRef.current, 0.7, 0.25);

    FACES.forEach((face, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      const worldNormal = face.direction.clone().applyQuaternion(group.quaternion);
      const facingViewer = worldNormal.z > FACING_THRESHOLD;

      launchProgress.current[i] = THREE.MathUtils.clamp(
        launchProgress.current[i] + (facingViewer ? delta * 1.6 : -delta * 1.3),
        0,
        1
      );

      mesh.position
        .copy(face.direction)
        .multiplyScalar(HALF + launchProgress.current[i] * LAUNCH_DISTANCE);

      const material = mesh.material as THREE.MeshStandardMaterial;
      material.color.copy(colorRef.current);
      material.emissive.copy(emissiveRef.current);
      material.opacity = 1 - launchProgress.current[i];
    });
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[1.43, 1.43, 1.43]} />
        <meshBasicMaterial color="#0b0d10" wireframe />
      </mesh>
      {FACES.map((face, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          position={face.direction.clone().multiplyScalar(HALF).toArray()}
          rotation={face.rotation}
        >
          <planeGeometry args={[1.4, 1.4]} />
          <meshStandardMaterial roughness={0.35} metalness={0.15} transparent side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export default function PlaceholderScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 4]} intensity={0.8} />
      <ColorCyclingCube />
    </Canvas>
  );
}
