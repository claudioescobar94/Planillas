import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import SeguridadPage from "./pages/SeguridadPage";
import ProduccionPage from "./pages/ProduccionPage";
import HomePage from "./pages/HomePage";
import SecadoPage from "./pages/produccion/SecadoPage";
import LSIPage from "./pages/produccion/LSIPage";
import LPPage from "./pages/produccion/LPPage";

// --- NAV PRINCIPAL ---
function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  // base de los links
  const tabBase =
    "px-4 h-14 -mb-px flex items-center text-sm font-semibold transition " +
    "text-gray-300 border-b-2 border-transparent hover:text-white";
  const activeTab = "text-white border-blue-500"; // azul visible en v2/v3

  return (
    <header className="bg-[#0f172a] text-gray-200 shadow-sm">
      <div className="container mx-auto px-6">
        {/* fila 1: marca + tabs principales */}
        <div className="flex items-center justify-between h-14">
          <h1 className="text-lg font-bold">Planillas</h1>

          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            ☰
          </button>

          {/* nav en la misma ubicación que antes */}
          <nav
            className={`${
              menuOpen ? "flex" : "hidden md:flex"
            } absolute md:static top-14 left-0 w-full md:w-auto bg-[#0f172a] md:bg-transparent flex-col md:flex-row z-10`}
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) => `${tabBase} ${isActive ? activeTab : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Inicio
            </NavLink>

            <NavLink
              to="/seguridad"
              className={({ isActive }) => `${tabBase} ${isActive ? activeTab : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Seguridad
            </NavLink>

            <NavLink
              to="/produccion"
              end={false} // activo también en subrutas
              className={({ isActive }) => `${tabBase} ${isActive ? activeTab : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Producción
            </NavLink>
          </nav>
        </div>

        {/* fila 2: sub-tabs cuando estás en Producción */}
        <SubNavProduccion />
      </div>
    </header>
  );
}


// --- SUB NAV DE PRODUCCIÓN ---
function SubNavProduccion() {
  const location = useLocation();
  const dentroProduccion = location.pathname.startsWith("/produccion");
  if (!dentroProduccion) return null;

  const subTabBase =
    "inline-flex items-center h-12 -mb-px px-1 text-sm font-semibold " +
    "text-slate-300 border-b-2 border-transparent hover:text-white";
  const subTabActive = "text-white border-blue-500"; // <- blue-500

  return (
    <div className="mt-1 border-b border-slate-800">
      <nav className="flex gap-10">
        <NavLink
          to="/produccion/secado"
          className={({ isActive }) => `${subTabBase} ${isActive ? subTabActive : ""}`}
        >
          Secado
        </NavLink>

        <NavLink
          to="/produccion/lsi"
          className={({ isActive }) => `${subTabBase} ${isActive ? subTabActive : ""}`}
        >
          LSI
        </NavLink>

        <NavLink
          to="/produccion/lp"
          className={({ isActive }) => `${subTabBase} ${isActive ? subTabActive : ""}`}
        >
          LP
        </NavLink>
      </nav>
    </div>
  );
}


// --- APP ---
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0b1220]">
        <TopNav />

        <main className="container mx-auto px-6 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/seguridad" element={<SeguridadPage />} />
            <Route path="/produccion" element={<LayoutProduccion />}>
              <Route index element={<ProduccionPage />} />
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

// Layout simple para /produccion
function LayoutProduccion() {
  return <Outlet />;
}
