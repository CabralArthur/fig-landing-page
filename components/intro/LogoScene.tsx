"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { LogoModel } from "./LogoModel";

interface LogoSceneProps {
  exiting: boolean;
}

function SceneLights() {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.18} />
      <spotLight
        position={[0, 8, 6]}
        intensity={2.2}
        color="#ffffff"
        angle={0.28}
        penumbra={1}
      />
      <pointLight position={[4, 2, 4]} intensity={1.1} color="#f5f0e8" />
      <pointLight position={[-4, 1, 3]} intensity={0.75} color="#e8e4dc" />
      <pointLight position={[0, 0, -3]} intensity={0.35} color="#c4b5fd" />
      <directionalLight position={[3, 5, 2]} intensity={0.55} color="#ffffff" />
    </>
  );
}

export function LogoScene({ exiting }: LogoSceneProps) {
  const [fov, setFov] = useState(42);

  useEffect(() => {
    const update = () => setFov(window.innerWidth < 768 ? 48 : 42);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <Canvas
      className="h-full w-full !bg-black"
      camera={{ position: [0, 0, 5.5], fov }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor("#000000");
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <Environment preset="studio" environmentIntensity={1.05} background={false} />
        <SceneLights />
        <LogoModel exiting={exiting} />
        <EffectComposer>
          <Bloom
            intensity={0.12}
            luminanceThreshold={0.62}
            luminanceSmoothing={0.85}
            mipmapBlur
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
