import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/stars.scss'

const nameMap = {
  Mercurio: 'mercury',
  Venus:    'venus',
  Tierra:   'earth',
  Marte:    'mars',
  Júpiter:  'jupiter',
  Saturno:  'saturn',
  Urano:    'uranus',
  Neptuno:  'neptune',
}

export default function DemoPage() {
  const [planets, setPlanets] = useState([])
  const [wiki,    setWiki]    = useState({})
  const [idx,     setIdx]     = useState(0)
  const current   = planets[idx] || {}

  // 1) Carga de planetas
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get('/api/planetas', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPlanets(res.data))
      .catch(console.error)
  }, [])

  // 2) Carga de datos externos
  useEffect(() => {
    if (!current.nombre) return
    const idApi = nameMap[current.nombre] || current.nombre.toLowerCase()
    axios
      .get(`https://api.le-systeme-solaire.net/rest/bodies/${idApi}`)
      .then(res => {
        const d = res.data
        setWiki({
          masa:       `${d.mass.massValue}×10^${d.mass.massExponent} kg`,
          radio:      `${d.meanRadius} km`,
          gravedad:   `${d.gravity} m/s²`,
          diaSideral: `${d.sideralRotation.toFixed(1)} h`,
        })
      })
      .catch(console.error)
  }, [current])

  const prev = () => setIdx(i => (i - 1 + planets.length) % planets.length)
  const next = () => setIdx(i => (i + 1) % planets.length)

  if (!planets.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Cargando demo…
      </div>
    )
  }

  return (
    <div className="stars-wrapper relative flex flex-col min-h-screen bg-black text-gray-100">
      {/*
         Capas de estrellas absolutas. 
         pointer-events-none para no bloquear el scroll.
      */}
      <div id="stars"  className="fixed inset-0 -z-10 pointer-events-none" />
      <div id="stars2" className="fixed inset-0 -z-10 pointer-events-none" />
      <div id="stars3" className="fixed inset-0 -z-10 pointer-events-none" />

      <Header />

      {/*
        El main crece y puede hacer scroll vertical
      */}
      <main className="relative z-10 flex-grow overflow-y-auto px-4 py-8 space-y-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center">
          {current.nombre}
        </h1>

        {/* Imagen principal */}
        <div className="w-full max-w-lg aspect-video bg-gray-900/50 rounded-xl overflow-hidden shadow-2xl mx-auto">
          <img
            src={current.imagen_web}
            alt={current.nombre}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Datos extraídos */}
        <div className="w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ['Masa',     wiki.masa],
            ['Radio',    wiki.radio],
            ['Gravedad', wiki.gravedad],
            ['Rotación', wiki.diaSideral]
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-gray-800/60 p-6 rounded-xl shadow-lg backdrop-blur-sm transform transition hover:scale-105"
            >
              <h3 className="text-lg font-semibold mb-2">{label}</h3>
              <p className="text-base">{value || '—'}</p>
            </div>
          ))}
        </div>

        {/* Navegación lateral responsive */}
        <div className="flex items-center justify-center space-x-4 w-full max-w-4xl mx-auto">
          {/* Flechas sólo en móvil */}
          <button
            onClick={prev}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-lg text-white transition-transform hover:scale-110 md:hidden"
            aria-label="Anterior"
          >
            ◀
          </button>

          {/* Contenedor de miniaturas */}
          <div className="flex flex-wrap justify-center gap-5 overflow-x-auto md:overflow-visible py-2 scrollbar-thin scrollbar-thumb-indigo-500">
            {planets.map((pl, i) => (
              <div
                key={pl.id}
                onClick={() => setIdx(i)}
                className={`
                  relative flex-shrink-0 w-24 h-24 md:w-28 md:h-28
                  bg-gray-900/50 rounded-lg overflow-hidden
                  cursor-pointer transition-all duration-300
                  ${i === idx
                    ? 'scale-110 border-4 border-indigo-400 shadow-2xl ring-2 ring-indigo-300 animate-pulse'
                    : 'scale-90 border-2 border-transparent hover:scale-100 hover:shadow-lg'}
                `}
              >
                <img
                  src={pl.imagen_web}
                  alt={pl.nombre}
                  className="w-full h-full object-contain"
                />
                {i === idx && (
                  <div className="absolute inset-0 ring-4 ring-indigo-400 rounded-lg pointer-events-none" />
                )}
              </div>
            ))}
          </div>

          {/* Flechas sólo en móvil */}
          <button
            onClick={next}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-lg text-white transition-transform hover:scale-110 md:hidden"
            aria-label="Siguiente"
          >
            ▶
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
