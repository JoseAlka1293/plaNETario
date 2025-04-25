import { useState } from 'react';

function RegisterForm({ onSwitch }) {
  const [formData, setFormData] = useState({ nombre: '', email: '', contraseña: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Registro exitoso. Ya puedes iniciar sesión.');
        onSwitch(); // Cambia al formulario de login
      } else {
        alert(data.mensaje || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
      alert('Error de red o servidor.');
    }
  };

  return (
    <div className="form-container fade-in">
      <h2 className="form-title">Registrarse</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Nombre</label>
          <input
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Introduce tu nombre"
            required
          />
        </div>
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
          <input type="checkbox" required />
          <span>Acepto los términos y condiciones</span>
        </div>
        <button type="submit" className="btn">Enviar</button>
        <p className="switch-text">
          ¿Ya tienes cuenta?
          <button type="button" onClick={onSwitch} className="link">Login</button>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;