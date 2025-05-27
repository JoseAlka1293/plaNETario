import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Decodificamos el payload del JWT para obtener el rol
  let role = null;
  try {
    const payload = token.split('.')[1];
    role = JSON.parse(atob(payload)).rol;
  } catch {
    // token invalido
    return <Navigate to="/" replace />;
  }

  // Si pedimos un rol específico y no coincide...
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
