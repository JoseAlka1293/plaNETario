// frontend/src/components/PlanetViewer.jsx
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Bounds } from '@react-three/drei'
import { DoubleSide } from 'three'

function Model({ src }) {
  const { scene } = useGLTF(src, true)
  return <primitive object={scene} />
}

export default function PlanetViewer({ src }) {
  const lower = src.toLowerCase()
  const isSaturn = lower.includes('saturn')

  return (
    <div className="h-48 w-full rounded-lg overflow-hidden bg-gray-800">
      <Canvas
        camera={{ position: [0, 3, 8], fov: 50 }}
        className="bg-transparent"
      >
        <Suspense fallback={null}>
          {/* Iluminación un poco más potente */}
          <ambientLight intensity={0.3} />
          <hemisphereLight skyColor="white" groundColor="gray" intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          {/* Ajusta automáticamente la cámara al contenido */}
          <Bounds fit clip margin={1}>
            {/* Inclina todo el grupo hacia abajo (-X) */}
            <group rotation={[-0.3, 0, 0]}>
              <Model src={src} />
            </group>
          </Bounds>

          <OrbitControls
            enablePan={false}
            enableZoom
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}    // no permite girar demasiado arriba
            maxPolarAngle={Math.PI / 2}    // no permite girar por debajo del horizonte
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Pre-carga modelos para que vayan más rápido
useGLTF.preload('/uploads/models/Mercury.glb')
useGLTF.preload('/uploads/models/Venus.glb')
useGLTF.preload('/uploads/models/Earth.glb')
useGLTF.preload('/uploads/models/Marte.glb')
useGLTF.preload('/uploads/models/Jupiter.glb')
useGLTF.preload('/uploads/models/Saturn.glb')
useGLTF.preload('/uploads/models/Uranus.glb')
useGLTF.preload('/uploads/models/Neptune.glb')
