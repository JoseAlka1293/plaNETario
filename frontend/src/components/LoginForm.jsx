import { useState } from 'react';

function LoginForm({ onSwitch }) {
  const [formData, setFormData] = useState({ email: '', contraseña: '' });
  const [errors, setErrors] = useState({ email: '', contraseña: '' });
  const [focusedField, setFocusedField] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateEmail = (email) => {
    if (email.length < 5) return 'El email debe tener al menos 5 caracteres';
    if (!/@/.test(email)) return 'El email debe contener un símbolo @';
    return '';
  };

  const validateContrasena = (contraseña) => {
    if (contraseña.length < 5) return 'La contraseña debe tener al menos 5 caracteres';
    if (!/[A-Z]/.test(contraseña)) return 'La contraseña debe contener al menos una mayúscula';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      const errorMsg = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: errorMsg }));
    }
    if (name === 'contraseña') {
      const errorMsg = validateContrasena(value);
      setErrors((prev) => ({ ...prev, contraseña: errorMsg }));

      let strength = 0;
      if (value.length >= 5) strength += 50;
      if (/[A-Z]/.test(value)) strength += 50;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const contraseñaError = validateContrasena(formData.contraseña);

    if (emailError || contraseñaError) {
      setErrors({ email: emailError, contraseña: contraseñaError });
      return;
    }

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
        localStorage.setItem('token', data.token);
        window.location.href = '/home';
      } else {
        alert(data.mensaje || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
      alert('Error de red o servidor.');
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-lg max-w-[700px] w-[25rem] text-gray-900 animate-fadeIn">
      <h2 className="text-center mb-6 text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Input Email */}
        <div className="relative flex flex-col">
          <label
            className={`text-sm mb-1 transition-transform duration-300 ${
              focusedField === "email" ? "animate-wave" : ""
            }`}
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField("")}
            placeholder="Introduce tu email"
            required
            className="p-2 border-b-2 border-gray-300 bg-transparent text-blue-700 focus:outline-none focus:border-[#6bc4f0]"
          />

          <lord-icon
            src="https://cdn.lordicon.com/ndydpcaq.json"
            trigger="hover"
            style={{ width: "50px", height: "30px" }}
            className="absolute right-5 top-5 transition-transform duration-300 hover:scale-125"
          />
          {errors.email && (
            <div className="absolute right-[-220px] top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-xs p-2 rounded-lg shadow-lg w-48">
              {errors.email}
              <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 border-8 border-transparent border-r-red-500"></div>
            </div>
          )}
        </div>

        {/* Input Contraseña */}
        <div className="relative flex flex-col">
          <label
            className={`text-sm mb-1 transition-transform duration-300 ${
              focusedField === "contraseña" ? "animate-wave" : ""
            }`}>
            Contraseña
          </label>
          <input
            name="contraseña"
            type="password"
            value={formData.contraseña}
            onChange={handleChange}
            onFocus={() => setFocusedField("contraseña")}
            onBlur={() => setFocusedField("")}
            placeholder="Introduce tu contraseña"
            required
            className="p-2 border-b-2 border-gray-300 bg-transparent text-blue-700 focus:outline-none focus:border-[#6bc4f0]"
          />
          <lord-icon
            src="https://cdn.lordicon.com/egiwmiit.json"
            trigger="hover"
            style={{ width: "50px", height: "30px" }}
            className="absolute right-5 top-5 transition-transform duration-300 hover:scale-125"
          />
          {errors.contraseña && (
            <div className="absolute right-[-220px] top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-xs p-2 rounded-lg shadow-lg w-48">
              {errors.contraseña}
              <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 border-8 border-transparent border-r-red-500"></div>
            </div>
          )}
        </div>

        {/* Barra de fuerza de contraseña */}
        <div className="w-full bg-gray-300 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${
              passwordStrength >= 100
                ? "bg-green-500"
                : passwordStrength >= 50
                ? "bg-yellow-400"
                : "bg-red-500"
            }`}
            style={{ width: `${passwordStrength}%` }}
          ></div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 text-sm mb-5">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Guardar información</label>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="bg-white/75 text-black py-2 px-4 rounded-full font-bold hover:bg-cyan-300 transition"
        >
          Enviar
        </button>

        {/* Switch Register */}
        <p className="text-sm text-center mt-4">
          ¿No tienes cuenta?
          <button
            type="button"
            onClick={onSwitch}
            className="text-[#0f12e2] underline ml-1 hover:text-blue-700"
          >
            Registrarse
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
