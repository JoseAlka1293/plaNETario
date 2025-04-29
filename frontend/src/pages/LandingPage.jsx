import { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

function LandingPage() {
  const [formularioActual, setFormularioActual] = useState('register');
  const [isFading, setIsFading] = useState(false);

  const alternarFormulario = () => {
    setIsFading(true); // Empieza el fade out
    setTimeout(() => {
      setFormularioActual((prev) => (prev === 'register' ? 'login' : 'register'));
      setIsFading(false); // Empieza el fade in después de cambiar
    }, 300); // Duración del fade-out (300ms)
  };

  return (
    <div
      className="min-h-screen w-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/imgs/fondo-landing.png')" }}
    >
      <div
        className={`w-full max-w-[400px] transition-opacity duration-500 ease-in-out ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {formularioActual === 'register' ? (
          <RegisterForm onSwitch={alternarFormulario} />
        ) : (
          <LoginForm onSwitch={alternarFormulario} />
        )}
      </div>
    </div>
  );
}

export default LandingPage;

