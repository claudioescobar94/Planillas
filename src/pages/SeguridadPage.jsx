import React, { useState } from 'react';
import LotoModal from '../components/LotoModal';

export default function SeguridadPage() {
  const [showLotoModal, setShowLotoModal] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">Seguridad</h2>
        <button
        onClick={() => setShowLotoModal(true)}
        className="bg-blue-400 text-white px-8 py-8 rounded hover:bg-blue-700 text-2xl font-bold shadow-lg transition flex items-center gap-3"
        >
        <span role="img" aria-label="candado">🔒</span>
        Planilla LOTO
        </button>
      {showLotoModal && <LotoModal onClose={() => setShowLotoModal(false)} />}
    </div>
  );
}