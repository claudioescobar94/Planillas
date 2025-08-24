import ParadaPlanilla from './ParadaPlanilla';

export default function ParadaModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50 p-6 overflow-y-auto">
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-7xl relative mt-8 text-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-600"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-6">Registro de Parada de Producción</h2>

        <ParadaPlanilla />
      </div>
    </div>
  );
}
