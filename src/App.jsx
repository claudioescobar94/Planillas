import { useState } from 'react';
import PlanillaCard from './components/PlanillaCard';
import LotoModal from './components/LotoModal';
import ParadaModal from './components/ParadaModal'
import KpiLotoChart from './components/KpiLotoChart'
import KpiParadasChart from './components/KpiParadasChart'
import KpiMaquinasChart from './components/KpiMaquinasChart'


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

      {/* Indicadores debajo de las planillas */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Indicadores de Seguridad y Producción</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div className="bg-white p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold text-gray-700">🛠️ LOTO realizados este mes</h3>
            <p className="text-3xl font-bold text-blue-600">12</p>
            <div className="mt-4">
              <KpiLotoChart />
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold text-gray-700">⏱️ Horas de parada acumuladas</h3>
            <p className="text-3xl font-bold text-red-600">42 hs</p>
            <div className="mt-4">
              <KpiParadasChart />
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <h3 className="text-lg font-semibold text-gray-700">🏭 Máquina más afectada</h3>
            <p className="text-2xl font-bold text-yellow-600">F.41.29</p>
            <div className="mt-4">
              <KpiMaquinasChart />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
