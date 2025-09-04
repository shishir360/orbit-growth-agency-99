import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

const ServiceIcon3D = ({ icon }: { icon: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  const getGeometry = () => {
    switch (icon) {
      case 'Globe':
        return <sphereGeometry args={[0.8, 32, 32]} />;
      case 'Target':
        return <cylinderGeometry args={[0.8, 0.8, 0.3, 32]} />;
      case 'Bot':
        return <boxGeometry args={[1, 1, 1]} />;
      default:
        return <sphereGeometry args={[0.8, 32, 32]} />;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        {getGeometry()}
        <meshStandardMaterial
          color="hsl(221.2, 83.2%, 53.3%)"
          metalness={0.7}
          roughness={0.2}
          emissive="hsl(221.2, 83.2%, 53.3%)"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
};

const Scene = ({ icon }: { icon: string }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 2, 2]} intensity={1} />
      <ServiceIcon3D icon={icon} />
    </>
  );
};

const ThreeDServiceIcon = ({ icon, className = "" }: { icon: string, className?: string }) => {
  return (
    <div className={`w-full h-32 ${className}`}>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0, 3],
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene icon={icon} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeDServiceIcon;