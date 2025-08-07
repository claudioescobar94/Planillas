import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import SeguridadPage from './pages/SeguridadPage';
import ProduccionPage from './pages/ProduccionPage';
import HomePage from './pages/HomePage';
import SecadoPage from './pages/produccion/SecadoPage';
import LSIPage from './pages/produccion/LSIPage';
import LPPage from './pages/produccion/LPPage';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Encabezado formal */}
        <header className="bg-white shadow mb-8">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Planillas</h1>
            {/* Botón hamburguesa para móviles */}
            <button
              className="md:hidden text-3xl"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              ☰
            </button>
            {/* Navegación */}
            <nav
              className={`flex-col md:flex-row md:flex gap-6 text-gray-700 font-medium absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow md:shadow-none transition-all duration-300 z-10 ${
                menuOpen ? 'flex pb-8' : 'hidden md:flex'
              }`}
            >
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `hover:text-blue-600 transition px-3 py-1 rounded ${isActive ? 'bg-gray-200 shadow' : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Inicio
              </NavLink>
              <NavLink
                to="/seguridad"
                className={({ isActive }) =>
                  `hover:text-blue-600 transition px-3 py-1 rounded ${isActive ? 'bg-gray-200 shadow' : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Seguridad
              </NavLink>
              <NavLink
                to="/produccion"
                className={({ isActive }) =>
                  `hover:text-blue-600 transition px-3 py-1 rounded ${isActive ? 'bg-gray-200 shadow' : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Producción
              </NavLink>
            </nav>
          </div>
        </header>

        {/* Contenido de las páginas */}
        <main className="container mx-auto px-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/seguridad" element={<SeguridadPage />} />
          <Route path="/produccion" element={<ProduccionPage />}>
            <Route path="secado" element={<SecadoPage />} />
            <Route path="lsi" element={<LSIPage />} />
            <Route path="lp" element={<LPPage />} />
          </Route>
        </Routes>
        </main>
      </div>
    </Router>
  );
}