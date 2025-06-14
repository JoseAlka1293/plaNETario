import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import RegisterForm from '../components/RegisterForm'
import LoginForm    from '../components/LoginForm'
import DarkModeToggle from '../components/DarkModeToggle'
import '../styles/stars.scss'

export default function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/home', { replace: true })
    }
  }, [navigate])

  const [formularioActual, setFormularioActual] = useState('register')
  const [isFading, setIsFading]               = useState(false)
  const [darkMode, setDarkMode]               = useState(true)

  const alternarFormulario = () => {
    setIsFading(true)
    setTimeout(() => {
      setFormularioActual(prev => (prev === 'register' ? 'login' : 'register'))
      setIsFading(false)
    }, 300)
  }

  return (
    <div className="relative min-h-screen w-screen flex justify-center items-center overflow-hidden">
      <header className="absolute top-4 right-4 z-20">
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
      </header>

      <div className="stars-wrapper">
        <div id="stars"/>
        <div id="stars2"/>
        <div id="stars3"/>
      </div>

      <div
        className={`relative z-10 w-full max-w-[400px] transition-opacity duration-500 ease-in-out ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {formularioActual === 'register' ? (
          <RegisterForm onSwitch={alternarFormulario} darkMode={darkMode}/>
        ) : (
          <LoginForm onSwitch={alternarFormulario} darkMode={darkMode}/>
        )}
      </div>
    </div>
  )
}
