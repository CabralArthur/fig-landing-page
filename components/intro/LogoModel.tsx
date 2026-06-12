"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";

interface LogoModelProps {
  exiting: boolean;
}

function enhanceMetallicMaterials(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    materials.forEach((material) => {
      if (
        material instanceof THREE.MeshStandardMaterial ||
        material instanceof THREE.MeshPhysicalMaterial
      ) {
        material.metalness = Math.max(material.metalness, 0.88);
        material.roughness = Math.min(material.roughness, 0.32);
        material.envMapIntensity = 1.15;
        material.emissive = new THREE.Color("#000000");
        material.emissiveIntensity = 0;
        material.needsUpdate = true;
      }
    });
  });
}

export function LogoModel({ exiting }: LogoModelProps) {
  const groupRef = useRef<Group>(null);
  const entrance = useRef(0);
  const { scene } = useGLTF("/animation/logo-fig.glb", true);
  const [modelScale, setModelScale] = useState(1.4);

  useEffect(() => {
    const updateScale = () => {
      setModelScale(window.innerWidth < 768 ? 1.05 : 1.5);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const model = useMemo(() => {
    const cloned = scene.clone(true);
    enhanceMetallicMaterials(cloned);
    return cloned;
  }, [scene]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (!exiting) {
      entrance.current = Math.min(entrance.current + delta * 1.4, 1);
    }

    const eased = 1 - Math.pow(1 - entrance.current, 3);
    const exitTarget = window.innerWidth < 768 ? 1.8 : 2.4;
    const targetScale = exiting ? exitTarget : eased;
    const current = group.scale.x;
    const nextScale = THREE.MathUtils.lerp(
      current,
      targetScale,
      exiting ? delta * 4 : 1
    );
    group.scale.setScalar(Math.max(nextScale, 0.001));

    group.rotation.y += delta * (exiting ? 1.2 : 0.4);
    group.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.06;
    group.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.08;
  });

  return (
    <group ref={groupRef} scale={0.001}>
      <Center scale={modelScale}>
        <primitive object={model} />
      </Center>
    </group>
  );
}

useGLTF.preload("/animation/logo-fig.glb", true);
