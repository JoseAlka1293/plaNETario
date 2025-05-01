// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage  from './pages/LandingPage';
import Home         from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Map3DPage    from './pages/Map3DPage';  

function App() {
  return (

      <Routes>
        {/* Pública */}
        <Route path="/" element={<LandingPage />} />

        {/* Protegida */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Mapa 3D */}
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <Map3DPage />
            </ProtectedRoute>
          }
        />
      </Routes>

  );
}

export default App;
