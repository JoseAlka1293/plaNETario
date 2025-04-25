import { useState } from 'react';

function LoginForm({ onSwitch }) {
  const [formData, setFormData] = useState({ email: '', contraseña: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Guardar el token y los datos del usuario
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
  
        alert('Login exitoso');
        window.location.href = '/home'; // Redirigir
      } else {
        alert(data.mensaje || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error de red o servidor.');
    }
  };
  
  return (
    <div className="form-container fade-in">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Introduce tu email"
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            name="contraseña"
            type="password"
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="Introduce tu contraseña"
            required
          />
        </div>
        <div className="checkbox-row">
          <input type="checkbox" />
          <span>Guardar información</span>
        </div>
        <button type="submit" className="btn">Enviar</button>
        <p className="switch-text">
          ¿No tienes cuenta?
          <button type="button" onClick={onSwitch} className="link">Registrarse</button>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;