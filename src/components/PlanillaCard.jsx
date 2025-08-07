export default function PlanillaCard({ titulo, descripcion, onClick, disabled }) {
  return (
    <div
      className={`bg-white shadow p-4 rounded cursor-pointer ${disabled ? 'text-gray-400' : 'hover:bg-blue-50'}`}
      onClick={disabled ? undefined : onClick}
    >
      <h2 className="font-semibold text-lg">{titulo}</h2>
      <p className="text-sm">{descripcion}</p>
    </div>
  );
}
