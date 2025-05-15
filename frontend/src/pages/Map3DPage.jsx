import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PlanetViewer from '../components/PlanetViewer'
import { Link } from 'react-router-dom'
import '../styles/stars.scss'

export default function Map3DPage() {
  const [planets, setPlanets]   = useState([])
  const [favMap, setFavMap]     = useState({})  

  // 1️⃣ Al montar, cargamos planetas y favoritos
  useEffect(() => {
    const token = localStorage.getItem('token')
    async function fetchAll() {
      try {
        const [plRes, favRes] = await Promise.all([
          axios.get('/api/planetas',   { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/favoritos',  { headers: { Authorization: `Bearer ${token}` } })
        ])

        // construimos un mapa { planetaId: favoritoId }
        const map = {}
        favRes.data.forEach(f => {
          map[f.planetaId] = f.favoritoId
        })
        setFavMap(map)

        // ordenamos: favoritos primero, luego por orden_solar
        const sorted = plRes.data
          .slice()
          .sort((a, b) => a.orden_solar - b.orden_solar)
          .sort((a, b) => (map[b.id] ? 1 : 0) - (map[a.id] ? 1 : 0))
        setPlanets(sorted)
      } catch (err) {
        console.error('Error al cargar datos:', err)
      }
    }
    fetchAll()
  }, [])

  // 2️⃣ Función para alternar favorito
  const toggleFavorite = async (planetaId) => {
    const token = localStorage.getItem('token')
    const favId = favMap[planetaId]

    try {
      if (favId) {
        // eliminar favorito existente
        await axios.delete(`/api/favoritos/${favId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const { [planetaId]:_, ...remaining } = favMap
        setFavMap(remaining)
      } else {
        // crear nuevo favorito
        const { data } = await axios.post('/api/favoritos',
          { planeta_id: planetaId, orden: 0 },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setFavMap(prev => ({ ...prev, [planetaId]: data.favoritoId }))
      }

      // reordenar planetas en UI
      setPlanets(pls => {
        return pls
          .slice()
          .sort((a, b) => a.orden_solar - b.orden_solar)
          .sort((a, b) => ((favMap[b.id] ? 1 : 0) - (favMap[a.id] ? 1 : 0)))
      })
    } catch (err) {
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
          {planets.map((pl) => (
            <div
              key={pl.id}
              className="bg-gray-800 bg-opacity-75 rounded-lg p-4 relative hover:shadow-xl transition"
            >
              {/* ⭐ botón favorito */}
              <button
                onClick={() => toggleFavorite(pl.id)}
                className={`absolute top-2 right-2 text-2xl ${
                  favMap[pl.id] ? "text-yellow-400" : "text-gray-600"
                }`}
              >
                {favMap[pl.id] ? "★" : "☆"}
              </button>
              {/* este es tu visualizador real */}

              <PlanetViewer src={pl.modelo_3d} />
              
              <Link to={`/planeta/${pl.id}`}>

                <h2 className="text-xl text-center font-semibold text-gray-100 hover:underline">
                  {pl.nombre}
                </h2>

              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
