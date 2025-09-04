import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei';

const AnimatedSphere = ({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) => (
  <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </mesh>
  </Float>
);

const Scene = () => {
  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      <ambientLight intensity={1} />
      <directionalLight position={[3, 2, 1]} />
      <AnimatedSphere position={[0, 0, 0]} color="hsl(222.2, 84%, 4.9%)" scale={0.8} />
      <AnimatedSphere position={[-4, -2, -1]} color="hsl(221.2, 83.2%, 53.3%)" scale={0.6} />
      <AnimatedSphere position={[5, 2, -2]} color="hsl(212.7, 26.8%, 83.9%)" scale={0.4} />
      <AnimatedSphere position={[-1, 3, -2]} color="hsl(221.2, 83.2%, 53.3%)" scale={0.3} />
      <AnimatedSphere position={[3, -1, 1]} color="hsl(210, 20%, 98%)" scale={0.5} />
    </>
  );
};

const ThreeDBackground = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 0, 6],
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

export default ThreeDBackground;