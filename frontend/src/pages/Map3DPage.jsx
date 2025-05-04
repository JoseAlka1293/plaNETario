import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/stars.scss'

export default function Map3DPage() {
  const [planets, setPlanets]     = useState([])
  const [favMap, setFavMap]       = useState({}) 

  // 1️⃣ Al cargar, traemos planetas + favoritos
  useEffect(() => {
    const token = localStorage.getItem('token')
    async function fetchAll() {
      try {
        const [plRes, favRes] = await Promise.all([
          axios.get('/api/planetas',   { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/favoritos',   { headers: { Authorization: `Bearer ${token}` } })
        ])

        // Construimos el map: { planetaId: favoritoId }
        const map = {}
        favRes.data.forEach(f => {
          map[f.planetaId] = f.favoritoId
        })
        setFavMap(map)

        // Ordenamos: favoritos primero, luego por orden_solar
        const sorted = plRes.data
          .sort((a,b) => a.orden_solar - b.orden_solar)
          .sort((a,b) => (map[b.id] ? 1:0) - (map[a.id] ? 1:0))

        setPlanets(sorted)
      } catch(err) {
        console.error(err)
      }
    }
    fetchAll()
  }, [])

  // 2️⃣ Toggle favorito
  const toggleFavorite = async (planetaId) => {
    const token = localStorage.getItem('token')
    const favId = favMap[planetaId]

    try {
      if (favId) {
        // ya es favorito → borramos
        await axios.delete(`/api/favoritos/${favId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        // actualizamos el map local
        const { [planetaId]:_, ...newMap } = favMap
        setFavMap(newMap)
      } else {
        // no existía → creamos
        const { data } = await axios.post('/api/favoritos',
          { planeta_id: planetaId, orden: 0 },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        // data.favoritoId es el id nuevo
        setFavMap(prev => ({ ...prev, [planetaId]: data.favoritoId }))
      }

      // reordenar planets en la UI
      setPlanets(pls => {
        const sorted = [...pls]
          .sort((a,b) => a.orden_solar - b.orden_solar)
          .sort((a,b) => (!!favMap[b.id] ? 1:0) - (!!favMap[a.id] ? 1:0))
        return sorted
      })
    } catch(err) {
      console.error('Error toggling favorito:', err)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col">

      {/* fondo de estrellas */}
      <div className="stars-wrapper fixed inset-0 -z-10">
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
      </div>

      <Header />

      <main className="relative z-10 flex-grow overflow-auto px-4 py-8">
        <h1 className="text-3xl text-center font-bold mb-8 text-gray-100">
          Galería 3D de Planetas
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {planets.map(pl => (
            <div
              key={pl.id}
              className="bg-gray-800 bg-opacity-75 rounded-lg p-4 relative hover:shadow-xl transition"
            >
              {/* ⭐ botón favorito */}
              <button
                onClick={() => toggleFavorite(pl.id)}
                className={`absolute top-2 right-2 text-2xl ${
                  favMap[pl.id] ? 'text-yellow-400' : 'text-gray-600'
                }`}
              >
                {favMap[pl.id] ? '★' : '☆'}
              </button>

              <div className="h-48 mb-4 flex items-center justify-center">
                <p className="text-gray-400">Modelo {pl.orden_solar}</p>
              </div>

              <h2 className="text-xl text-center font-semibold text-gray-100">
                {pl.nombre}
              </h2>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

