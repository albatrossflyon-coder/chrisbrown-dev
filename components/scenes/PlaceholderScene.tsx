"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function RotatingCube({ color }: { color: string }) {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.4;
      ref.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

export default function PlaceholderScene({ color = "#8a9099" }: { color?: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <ambientLight intensity={1} />
      <RotatingCube color={color} />
    </Canvas>
  );
}
