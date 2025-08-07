import React, { useState } from 'react';
import ParadaModal from '../../components/ParadaModal';

export default function LSIPage() {
  const [showParadaModal, setShowParadaModal] = useState(false);

  return (
    <div className="bg-white rounded shadow p-8 min-h-[300px] flex flex-col items-center">
      <h3 className="text-4xl font-bold mb-4">LSI</h3>
      <div className="flex justify-center w-full mt-8">
        <button
          onClick={() => setShowParadaModal(true)}
          className="bg-blue-800 text-white px-6 py-4 rounded hover:bg-blue-900 text-xl font-bold shadow-lg transition flex items-center gap-3"
        >
          <span role="img" aria-label="parada">⏱️</span>
          Planilla de Paradas
        </button>
      </div>
      {showParadaModal && (
        <ParadaModal area="LSI" onClose={() => setShowParadaModal(false)} />
      )}
    </div>
  );
}