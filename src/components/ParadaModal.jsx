import ParadaForm from './ParadaForm';

export default function ParadaModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50 p-4 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative mt-8">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-600"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Registro de Parada de Producción</h2>
        <ParadaForm />
      </div>
    </div>
  );
}
