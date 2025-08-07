import { useState } from 'react';

export default function ParadaForm() {
  const [data, setData] = useState({
    fecha: '',
    horaInicio: '',
    horaFin: '',
    sector: '',
    equipo: '',
    causa: '',
    acciones: '',
    responsable: '',
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Parada registrada:', data);
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="text-green-600 font-semibold text-center p-4">
        ✅ Parada registrada correctamente
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        ['fecha', 'Fecha', 'date'],
        ['horaInicio', 'Hora de inicio', 'time'],
        ['horaFin', 'Hora de fin', 'time'],
        ['sector', 'Sector'],
        ['equipo', 'Equipo afectado'],
        ['causa', 'Causa de la parada'],
        ['acciones', 'Acciones tomadas'],
        ['responsable', 'Responsable'],
      ].map(([name, label, type = 'text']) => (
        <div key={name}>
          <label className="block font-medium">{label}</label>
          <input
            type={type}
            name={name}
            value={data[name]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
      ))}

      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}
