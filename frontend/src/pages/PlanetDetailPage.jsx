import React, { useEffect, useState, Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Bounds } from '@react-three/drei'

function Model({ src }) {
  const { scene } = useGLTF(src, true)
  return <primitive object={scene} />
}

const nameMap = {
  Mercurio: 'mercury',
  Venus:     'venus',
  Tierra:    'earth',
  Marte:     'mars',
  Júpiter:   'jupiter',
  Saturno:   'saturn',
  Urano:     'uranus',
  Neptuno:   'neptune',
}

export default function PlanetDetailPage() {
  const { id } = useParams()
  const [planet, setPlanet]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [cards, setCards]     = useState(['', '', ''])

  useEffect(() => {
    const token = localStorage.getItem('token')

    axios.get(`/api/planetas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setPlanet(res.data)
        return res.data.nombre
      })
      .then(nombreEsp => {
        const idApi = nameMap[nombreEsp] || nombreEsp.toLowerCase()
        return axios.get(`https://api.le-systeme-solaire.net/rest/bodies/${idApi}`)
      })
      .then(res => {
        const d = res.data
        const masa      = `Masa: ${d.mass.massValue}×10^${d.mass.massExponent} kg`
        const radioYdens = `Radio medio: ${d.meanRadius} km — Densidad: ${d.density} g/cm³`
        const gravedad  = `Gravedad superficial: ${d.gravity} m/s² — Día sideral: ${d.sideralRotation.toFixed(2)} h`
        setCards([masa, radioYdens, gravedad])
      })
      .catch(err => {
        console.error(err)
        setCards([
          'No se han podido cargar los datos físicos.',
          '',
          ''
        ])
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center text-gray-200">
        Cargando…
      </div>
    )
  }
  if (!planet) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center text-red-400">
        Planeta no encontrado
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-black text-gray-100">
      <Header />

      <main className="flex-grow flex flex-col items-center px-4 py-8 space-y-6">
        <div className="w-full max-w-4xl flex justify-between items-center">
          <Link
            to="/map"
            className="px-4 py-2 border border-white rounded hover:bg-white/10 transition"
          >
            ← Volver
          </Link>
          <h1 className="text-4xl font-bold">{planet.nombre}</h1>
        </div>

        <div className="w-full max-w-4xl h-[60vh] bg-gray-900 rounded-lg overflow-hidden">
          <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.7} />
              <hemisphereLight skyColor="white" groundColor="gray" intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <Bounds fit clip margin={1.2}>
                <group rotation={[-0.3, 0, 0]}>
                  <Model src={planet.modelo_3d} />
                </group>
              </Bounds>
              <OrbitControls
                enablePan={false}
                enableZoom
                autoRotate
                autoRotateSpeed={0.3}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* ——— TRES CAJAS CON DATOS DE “le-systeme-solaire.net” ——— */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((txt, i) => (
            <div
              key={i}
              className="bg-gray-800 p-6 rounded-lg shadow-inner leading-relaxed text-gray-200"
            >
              {txt}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Preload de modelos glTF
useGLTF.preload('/uploads/models/Mercury.glb')
useGLTF.preload('/uploads/models/Venus.glb')
useGLTF.preload('/uploads/models/Earth.glb')
useGLTF.preload('/uploads/models/Marte.glb')
useGLTF.preload('/uploads/models/Jupiter.glb')
useGLTF.preload('/uploads/models/Saturn.glb')
useGLTF.preload('/uploads/models/Uranus.glb')
useGLTF.preload('/uploads/models/Neptune.glb')
