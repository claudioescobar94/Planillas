import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function ProduccionPage() {
  const location = useLocation();
  // Si la ruta es exactamente /produccion, mostramos los cuadros
  const isRootProduccion = location.pathname === '/produccion';

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Área de Producción</h2>
      {isRootProduccion && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="secado" className="bg-white rounded shadow p-8 min-h-[220px] flex flex-col items-center hover:bg-green-50 transition cursor-pointer">
            <h3 className="text-xl font-bold mb-4">Secado</h3>
            <p>Contenido de la sección Secado.</p>
          </Link>
          <Link to="lsi" className="bg-white rounded shadow p-8 min-h-[220px] flex flex-col items-center hover:bg-green-50 transition cursor-pointer">
            <h3 className="text-xl font-bold mb-4">LSI</h3>
            <p>Contenido de la sección LSI.</p>
          </Link>
          <Link to="lp" className="bg-white rounded shadow p-8 min-h-[220px] flex flex-col items-center hover:bg-green-50 transition cursor-pointer">
            <h3 className="text-xl font-bold mb-4">LP</h3>
            <p>Contenido de la sección LP.</p>
          </Link>
        </div>
      )}
      <Outlet />
    </div>
  );
}