import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const FloatingCube = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const RotatingTorus = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial
        color="hsl(221.2, 83.2%, 53.3%)"
        metalness={0.8}
        roughness={0.2}
        emissive="hsl(221.2, 83.2%, 53.3%)"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <FloatingCube position={[-2, 1, 0]} />
      <FloatingCube position={[2, -1, -1]} />
      <RotatingTorus position={[0, 0, -2]} />
      
    </>
  );
};

const ThreeDHeroScene = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 0, 5],
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeDHeroScene;