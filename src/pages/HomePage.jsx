import React from 'react';
import KpiLotoChart from '../components/KpiLotoChart';
import KpiParadasChart from '../components/KpiParadasChart';
import KpiMaquinasChart from '../components/KpiMaquinasChart';

export default function HomePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Resumen General</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white rounded shadow p-4 flex-1 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 text-center">🛠️ LOTO realizados este mes</h3>
          <KpiLotoChart />
        </div>
        <div className="bg-white rounded shadow p-4 flex-1 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 text-center">⏱️ Horas de parada acumuladas</h3>
          <KpiParadasChart />
        </div>
        <div className="bg-white rounded shadow p-4 flex-1 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 text-center">🏭 Máquina más afectada</h3>
          <KpiMaquinasChart />
        </div>
      </div>
    </div>
  );
}
