// frontend/src/components/Loader3D.jsx
import React, { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

/**
 * Componente que carga y rota el modelo 3D.
 * src: ruta pública en /models/RocketWithMoon.glb
 */
function RocketWithMoon() {
  const { scene } = useGLTF('/models/RocketWithMoon.glb', true)
  useFrame((_, delta) => {
    scene.rotation.y += delta * 0.2
    scene.rotation.x += delta * 0.05
  })
  return <primitive object={scene} scale={1.5} />
}

export default function Loader3D() {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-stone-500
      "
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="w-screen h-screen"
      >
        {/* Iluminación mejorada */}
        <ambientLight intensity={1} />
        <hemisphereLight skyColor="#ffffff" groundColor="#444444" intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.0} />
        <directionalLight position={[-10, -5, -10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <RocketWithMoon />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Preload para acelerar la carga
useGLTF.preload('/models/RocketWithMoon.glb')
