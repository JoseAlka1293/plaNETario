import React, { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logo from '../../public/imgs/Logotipo.png'

export default function Header() {
  const [nombre, setNombre] = useState(null)
  const [open, setOpen]     = useState(false)
  const navigate            = useNavigate()
  const menuRef             = useRef()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('No autorizado')
        return res.json()
      })
      .then(data => setNombre(data.nombre))
      .catch(() => {
        localStorage.removeItem('token')
        navigate('/', { replace: true })
      })
  }, [navigate])

  useEffect(() => {
    const handler = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/', { replace: true })
  }

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-gray-200 hover:bg-gray-700 hover:text-white'
    }`

  return (
    <header className="bg-gray-700 text-gray-100 px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex-shrink-0 hover:opacity-90">
          <img
            src={logo}
            alt="plaNETario"
            className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto"
          />
        </Link>

        <nav className="md:flex space-x-2 lg:space-x-4">
          <NavLink to="/home" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/map" className={linkClass}>
            Mapa 3D
          </NavLink>
          <NavLink to="/demo" className={linkClass}>
            Demo
          </NavLink>
        </nav>

        <div className="md:flex items-center space-x-4">
          {nombre ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(o => !o)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-700 focus:outline-none"
              >
                <span className="text-sm font-medium">{nombre}</span>
                <svg
                  className={`h-4 w-4 transform transition-transform ${
                    open ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-30 bg-gray-800 rounded-md shadow-lg z-20">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}
