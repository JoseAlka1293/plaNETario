import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader3D from "./components/Loader3D";
import LandingPage from "./pages/LandingPage";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Map3DPage from "./pages/Map3DPage";
import AdminPage from "./pages/AdminPage";
import DemoPage from "./pages/DemoPage";
import PlanetDetailPage from "./pages/PlanetDetailPage";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader3D />;
  }

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

        {/* Detalle de planeta */}
        <Route
          path="/planeta/:id"
          element={
            <ProtectedRoute>
              <PlanetDetailPage />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Demo */}
        <Route 
          path="/demo" 
          element={
            <ProtectedRoute>
              <DemoPage />
            </ProtectedRoute>
          } 
        />

      </Routes>

  );
}
