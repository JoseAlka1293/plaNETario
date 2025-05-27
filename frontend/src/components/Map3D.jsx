import React from 'react'

export default function Map3D() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Galería 3D de Planetas
      </h1>
      <div className="grid gap-6
                      grid-cols-1
                      sm:grid-cols-2
                      md:grid-cols-3
                      lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-48 bg-gray-800 bg-opacity-50 rounded-lg flex items-center justify-center text-gray-400"
          >
            Modelo {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
