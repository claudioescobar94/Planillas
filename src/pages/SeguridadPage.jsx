import React, { useState } from "react";
import LotoModal from "../components/LotoModal";

export default function SeguridadPage() {
  const [showLotoModal, setShowLotoModal] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6 text-white">Loto</h2>

      {/* Card estilo Fiori */}
      <div className="flex gap-6 mb-10">
        <button
          onClick={() => setShowLotoModal(true)}
          className="bg-gray-800/80 hover:bg-gray-800 text-white rounded-xl w-64 h-40
                     shadow-md transition-all duration-150 border border-gray-700
                     flex flex-col items-center justify-center"
        >
          <div className="mb-3 text-3xl opacity-70">🔒</div>
          <p className="text-sm text-center">Planilla</p>
        </button>
      </div>

      {/* Sección Permisos */}
      <h3 className="text-xl font-semibold mb-6 text-white">Permisos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Bloque 1 */}
        <div className="bg-gray-800/80 text-white rounded-xl h-40 shadow-md border border-gray-700 flex flex-col items-center justify-center">
          <div className="mb-3 text-3xl opacity-70">📋</div>
          <p className="text-sm text-center">Permiso 1</p>
        </div>

        {/* Bloque 2 */}
        <div className="bg-gray-800/80 text-white rounded-xl h-40 shadow-md border border-gray-700 flex flex-col items-center justify-center">
          <div className="mb-3 text-3xl opacity-70">📋</div>
          <p className="text-sm text-center">Permiso 2</p>
        </div>

        {/* Bloque 3 */}
        <div className="bg-gray-800/80 text-white rounded-xl h-40 shadow-md border border-gray-700 flex flex-col items-center justify-center">
          <div className="mb-3 text-3xl opacity-70">📋</div>
          <p className="text-sm text-center">Permiso 3</p>
        </div>

        {/* Bloque 4 */}
        <div className="bg-gray-800/80 text-white rounded-xl h-40 shadow-md border border-gray-700 flex flex-col items-center justify-center">
          <div className="mb-3 text-3xl opacity-70">📋</div>
          <p className="text-sm text-center">Permiso 4</p>
        </div>
      </div>

      {/* Modal */}
      {showLotoModal && <LotoModal onClose={() => setShowLotoModal(false)} />}
    </div>
  );
}
