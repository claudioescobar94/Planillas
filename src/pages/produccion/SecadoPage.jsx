import React, { useState } from "react";
import ParadaModal from "../../components/ParadaModal";

export default function SecadoPage() {
  const [showParadaModal, setShowParadaModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 p-8 rounded-xl">
      {/* Título */}
      <h3 className="text-white text-2xl font-bold mb-8">
        Paradas
      </h3>

      {/* Contenedor de tarjetas alineadas a la izquierda */}
      <div className="flex gap-5">
        {/* Card 1 - abre tu modal */}
        <button
          onClick={() => setShowParadaModal(true)}
          className="bg-gray-800/80 hover:bg-gray-800 text-white rounded-xl w-64 h-40
                     shadow-md transition-all duration-150 border border-gray-700
                     flex flex-col items-center justify-center group text-left"
        >
          {/* Ícono */}
          <div className="mb-3 opacity-60 group-hover:opacity-90 transition">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-gray-300"
            >
              <path d="M10.09 15.59L11.5 17L3.41 25.09C2.63 25.88 1.37 25.88 0.59 25.09C-0.2 24.31 -0.2 23.05 0.59 22.27L8.68 14.18L7.27 12.77C5.91 11.41 5.91 9.09 7.27 7.73C8.64 6.36 10.96 6.36 12.32 7.73L20.41 15.82C21.19 16.61 21.19 17.87 20.41 18.65C19.63 19.44 18.37 19.44 17.59 18.65L10.09 11.15C9.5 10.56 9.5 9.58 10.09 8.99C10.68 8.4 11.66 8.4 12.25 8.99L19.75 16.49C21.48 18.22 21.48 21.02 19.75 22.75C18.02 24.48 15.22 24.48 13.49 22.75L5.4 14.66L10.09 15.59Z" />
            </svg>
          </div>
          <p className="text-center text-sm leading-tight px-4">
            Parada de máquina
          </p>
        </button>

        {/* Card 2 */}
        <div
          className="bg-gray-800/80 text-white rounded-xl w-64 h-40 shadow-md
                     border border-gray-700 flex flex-col items-center justify-center"
        >
          {/* Ícono */}
          <div className="mb-3 opacity-60 text-3xl">👤</div>
          <p className="text-center text-sm leading-tight px-6">
            Parada por ....
          </p>
        </div>
      </div>

      {/* Modal */}
      {showParadaModal && (
        <ParadaModal area="Secado" onClose={() => setShowParadaModal(false)} />
      )}
    </div>
  );
}
