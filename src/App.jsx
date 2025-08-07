import { useState } from 'react';
import PlanillaCard from './components/PlanillaCard';
import LotoModal from './components/LotoModal';
import ParadaModal from './components/ParadaModal'

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [showParadaModal, setShowParadaModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Planillas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PlanillaCard
          titulo="LOTO"
          descripcion="Procedimiento de seguridad en intervenciones"
          onClick={() => setShowModal(true)}
        />

        <PlanillaCard
          titulo="Parada de Producción"
          descripcion="Registro de tiempos muertos y causas"
          onClick={() => setShowParadaModal(true)}
        />

        <PlanillaCard
          titulo="Otra planilla"
          descripcion="Próximamente..."
          disabled
        />
      </div>

      {showModal && <LotoModal onClose={() => setShowModal(false)} />}
      {showParadaModal && <ParadaModal onClose={() => setShowParadaModal(false)} />}
    </div>
  );
}
