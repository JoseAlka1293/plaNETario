import { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

function LandingPage() {
  const [formularioActual, setFormularioActual] = useState('register');

  const alternarFormulario = () => {
    setFormularioActual((prev) => (prev === 'register' ? 'login' : 'register'));
  };

  return (
<div
  style={{
    backgroundImage: "url('/imgs/fondo-landing.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}
>
  <div style={{ width: "100%", maxWidth: "400px" }}>
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

