/* 
   Este componente tambien realizara una llamada 
   inicial al backend para obtener la lista de planetas    
*/

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [planetas, setPlanetas] = useState([])

  useEffect(() => {
    // Llamada al backend para obtener los planetas
    fetch("http://localhost:5000/api/planetas")
      .then((respuesta) => respuesta.json())
      .then((datos) => setPlanetas(datos))
      .catch((error) => console.error(error))
  }, [])

  return (
    <div>
      <h1>Bienvenido a plaNETario</h1>
      <nav>
        {/* Enlaces usando Link de react-router-dom */}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Registro</Link> |{" "}
        <Link to="/map">Mapa 3D</Link>
      </nav>
      <h2>Listado de Planetas</h2>
      <ul>
        {planetas && planetas.length > 0 ? (
          planetas.map((planeta) => (
            <li key={planeta.id}>{planeta.nombre}</li>
          ))
        ) : (
          <li>No hay planetas para mostrar</li>
        )}
      </ul>
    </div>
  )
}

export default Home

