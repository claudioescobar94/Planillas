import { useState } from 'react';

export default function LotoForm() {
  const [formData, setFormData] = useState({
    maquina: '',
    fecha: '',
    hora: '',
    responsable: '',
    sector: '',
    fuentesIdentificadas: false,
    equipoApagado: false,
    fuentesBloqueadas: false,
    dispositivosAplicados: false,
    tarjetaColocada: false,
    verificacionAislamiento: false,
    personalNotificado: false,
    eppAdecuado: false,
    responsableVerificacion: '',
    observaciones: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario LOTO enviado:', formData);
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="text-green-600 font-semibold text-center p-4">
        ✅ Formulario enviado correctamente
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

        <div>
            <label className="block font-medium">Máquina o equipo</label>
            <select
                name="maquina"
                value={formData.maquina}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            >
                <option value="">Seleccione una opción</option>
                <option value="A.41.01">P.41.01 - Bomba centrífuga</option>
                <option value="VP.41.03.03">VP.41.03.03 - Válvula neumática</option>
                <option value="F.41.29">F.41.29 - Decantador nuevo</option>
                <option value="S.47.05">S.47.05 - Separadora</option>
                <option value="P.41.04.01">P.41.04.01 - Estirilizador 04</option>
            </select>
        </div>


      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-medium">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block font-medium">Hora</label>
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-medium">Responsable LOTO</label>
          <input
            type="text"
            name="responsable"
            value={formData.responsable}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block font-medium">Sector</label>
          <input
            type="text"
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      <hr className="my-2" />

      {[
        ['fuentesIdentificadas', '¿Se identificaron todas las fuentes de energía?'],
        ['equipoApagado', '¿Se apagó el equipo correctamente?'],
        ['fuentesBloqueadas', '¿Se bloquearon todas las fuentes de energía?'],
        ['dispositivosAplicados', '¿Se aplicaron dispositivos de bloqueo físicos?'],
        ['tarjetaColocada', '¿Se colocó tarjeta de advertencia con nombre y firma?'],
        ['verificacionAislamiento', '¿Se verificó el aislamiento antes de intervenir?'],
        ['personalNotificado', '¿Fue notificado el personal involucrado?'],
        ['eppAdecuado', '¿Se dispone de EPP adecuado?'],
      ].map(([name, label]) => (
        <div key={name} className="flex items-center">
          <input
            type="checkbox"
            name={name}
            checked={formData[name]}
            onChange={handleChange}
            className="mr-2"
          />
          <label>{label}</label>
        </div>
      ))}

      <div>
        <label className="block font-medium">Responsable de la verificación</label>
        <input
          type="text"
          name="responsableVerificacion"
          value={formData.responsableVerificacion}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Observaciones</label>
        <textarea
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        ></textarea>
      </div>

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
