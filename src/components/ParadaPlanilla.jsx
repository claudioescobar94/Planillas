import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ConfirmDialog from "./ConfirmDialog";

const STORAGE_KEY = "paradas_planilla_v1";

const ejemplos = [
  { id: crypto.randomUUID(), fecha: "2025-08-20", horaInicio: "08:00", horaFin: "09:15", equipo: "Compresor A",    causa: "Falla en válvula",                       acciones: "Reemplazo de válvula y test",              responsable: "Juan Pérez",  guardado: true,  editando: false, validado: true  },
  { id: crypto.randomUUID(), fecha: "2025-08-21", horaInicio: "22:30", horaFin: "00:10", equipo: "Bomba 2",        causa: "Sobrecalentamiento",                     acciones: "Revisión eléctrica / cambio de fusible",   responsable: "María López", guardado: true,  editando: false, validado: false },
  { id: crypto.randomUUID(), fecha: "2025-08-22", horaInicio: "10:30", horaFin: "11:10", equipo: "Cinta",          causa: "Atasco mecánico",                        acciones: "Limpieza y ajuste de rodillos",            responsable: "Carlos Díaz", guardado: false, editando: true,  validado: false },
];

const cols = [
  { key: "fecha",        label: "Fecha",        type: "date" },
  { key: "horaInicio",   label: "Inicio",       type: "time" },
  { key: "horaFin",      label: "Fin",          type: "time" },
  { key: "equipo",       label: "Equipo" },
  { key: "causa",        label: "Causa",        type: "textarea" },
  { key: "acciones",     label: "Acciones",     type: "textarea" },
  { key: "responsable",  label: "Responsable" },
];

function filaNueva() {
  return {
    id: crypto.randomUUID(),
    fecha: "", horaInicio: "", horaFin: "",
    equipo: "", causa: "", acciones: "", responsable: "",
    guardado: false,     // filas nuevas empiezan en edición
    editando: true,
    validado: false,
  };
}

// Duración (min) con soporte cruce de medianoche
function calcularDuracionMin(fecha, hi, hf) {
  if (!fecha || !hi || !hf) return "";
  try {
    const start = new Date(`${fecha}T${hi}`);
    let end = new Date(`${fecha}T${hf}`);
    if (end < start) end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
    const diffMin = Math.round((end - start) / 60000);
    return diffMin >= 0 ? diffMin : "";
  } catch {
    return "";
  }
}

export default function ParadaPlanilla() {
  const [rows, setRows] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : ejemplos;
  });
  const [confirmId, setConfirmId] = useState(null); // <-- para el pop-up de confirmación

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  }, [rows]);

  const addRow   = () => setRows((p) => [...p, filaNueva()]);
  const delRow   = (id) => setRows((p) => p.filter((r) => r.id !== id));

  // Si la fila está validada, no se edita. Si está guardada pero NO editando, tampoco.
  const setCell = (id, key, val) =>
    setRows((p) =>
      p.map((r) =>
        r.id !== id
          ? r
          : r.validado
          ? r
          : r.guardado && !r.editando
          ? r // bloqueada hasta apretar "Editar"
          : { ...r, [key]: val }
      )
    );

  const editar = (id) =>
    setRows((p) => p.map((r) => (r.id === id ? { ...r, editando: true, guardado: false } : r)));

  const guardar = (id) =>
    setRows((p) => p.map((r) => (r.id === id ? { ...r, guardado: true, editando: false } : r)));

  const validar = (id) =>
    setRows((p) => p.map((r) => (r.id === id ? { ...r, validado: true } : r)));

  const puedeCompletar = (r) =>
    ["fecha", "horaInicio", "horaFin", "equipo", "responsable"].every(
      (k) => (r[k] || "").toString().trim() !== ""
    );

  const exportarPDF = () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    doc.setFontSize(14);
    doc.text("Planilla de Paradas", 40, 36);

    const cuerpo = rows.map((r) => [
      r.fecha || "",
      r.horaInicio || "",
      r.horaFin || "",
      r.equipo || "",
      r.causa || "",
      r.acciones || "",
      r.responsable || "",
      calcularDuracionMin(r.fecha, r.horaInicio, r.horaFin) || "",
      r.validado ? "Validado" : r.guardado ? "Guardado" : "Pendiente",
    ]);

    autoTable(doc, {
      startY: 56,
      head: [["Fecha", "Inicio", "Fin", "Equipo", "Causa", "Acciones", "Responsable", "Duración (min)", "Estado"]],
      body: cuerpo,
      styles: { fontSize: 9, cellPadding: 6, overflow: "linebreak" },
      headStyles: { fillColor: [30, 64, 175], textColor: 255 },
      margin: { top: 56, bottom: 40, left: 40, right: 40 },
    });

    doc.save("planilla_paradas.pdf");
  };

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white text-lg font-semibold">Planilla de Paradas</h3>
        <div className="flex gap-2">
          <button
            onClick={addRow}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded"
          >
            + Agregar fila
          </button>
          <button
            onClick={exportarPDF}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded"
          >
            Exportar PDF
          </button>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="min-w-[1150px] w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="bg-white/10 text-slate-200">
              {cols.map((c) => (
                <th key={c.key} className="text-left px-3 py-2 border-b border-white/10">
                  {c.label}
                </th>
              ))}
              <th className="text-left px-3 py-2 border-b border-white/10">Duración (min)</th>
              <th className="text-left px-3 py-2 border-b border-white/10">Estado</th>
              <th className="text-left px-3 py-2 border-b border-white/10">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => {
              const dur = calcularDuracionMin(r.fecha, r.horaInicio, r.horaFin);
              const readOnly = r.validado || (r.guardado && !r.editando);
              return (
                <tr key={r.id} className="odd:bg-white/0 even:bg-white/[0.03]">
                  {cols.map((c) => (
                    <td key={c.key} className="px-3 py-2 border-b border-white/10">
                      {readOnly ? (
                        <span className="text-white/90 break-words">
                          {(r[c.key] ?? "").toString() || "—"}
                        </span>
                      ) : c.type === "textarea" ? (
                        <textarea
                          rows={2}
                          className="w-full bg-white/5 text-white/90 border border-white/10 rounded p-1 text-sm"
                          value={r[c.key] || ""}
                          onChange={(e) => setCell(r.id, c.key, e.target.value)}
                        />
                      ) : (
                        <input
                          type={c.type || "text"}
                          className="w-full bg-white/5 text-white/90 border border-white/10 rounded p-1 text-sm"
                          value={r[c.key] || ""}
                          onChange={(e) => setCell(r.id, c.key, e.target.value)}
                        />
                      )}
                    </td>
                  ))}

                  <td className="px-3 py-2 border-b border-white/10 text-white/90">
                    {dur !== "" ? dur : "—"}
                  </td>

                  <td className="px-3 py-2 border-b border-white/10">
                    {r.validado ? (
                      <span className="text-green-400 font-semibold">✅ Validado</span>
                    ) : r.guardado ? (
                      r.editando ? (
                        <span className="text-orange-300 font-semibold">Editando</span>
                      ) : (
                        <span className="text-yellow-400 font-semibold">Guardado</span>
                      )
                    ) : (
                      <span className="text-gray-400">Pendiente</span>
                    )}
                  </td>

                  <td className="px-3 py-2 border-b border-white/10">
                    <div className="flex gap-2 flex-wrap">
                      {/* Guardado y no editando → Editar y (si cumple) Validar */}
                      {!r.validado && r.guardado && !r.editando && (
                        <>
                          <button
                            onClick={() => editar(r.id)}
                            className="px-3 py-1 text-xs rounded bg-yellow-600 hover:bg-yellow-700 text-white"
                            title="Editar fila"
                          >
                            Editar
                          </button>
                          {puedeCompletar(r) && (
                            <button
                              onClick={() => validar(r.id)}
                              className="px-3 py-1 text-xs rounded bg-green-600 hover:bg-green-700 text-white"
                              title="Validar fila"
                            >
                              Validar
                            </button>
                          )}
                        </>
                      )}

                      {/* Editando o nueva → Guardar */}
                      {!r.validado && (!r.guardado || r.editando) && (
                        <button
                          onClick={() => guardar(r.id)}
                          disabled={!puedeCompletar(r)}
                          className={`px-3 py-1 text-xs rounded text-white ${
                            puedeCompletar(r)
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "bg-gray-600 cursor-not-allowed opacity-60"
                          }`}
                          title={puedeCompletar(r) ? "Guardar fila" : "Complete los campos requeridos"}
                        >
                          Guardar
                        </button>
                      )}

                      {/* Borrar (oculto solo si está validado) */}
                      {!r.validado && (
                        <button
                          onClick={() => setConfirmId(r.id)}
                          className="px-2 py-1 text-xs rounded bg-red-600 hover:bg-red-700 text-white"
                          title="Borrar fila"
                        >
                          Borrar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-xs text-white/60">
        *Flujo: Editar → Guardar → (opcional Editar nuevamente) → Guardar → Validar.  
        Requeridos: Fecha, Inicio, Fin, Equipo, Responsable. Duración se calcula automáticamente.
      </div>

      {/* Modal de confirmación de borrado */}
      <ConfirmDialog
        open={!!confirmId}
        title="Confirmar borrado"
        message="¿Seguro que querés borrar esta fila? Esta acción no se puede deshacer."
        onCancel={() => setConfirmId(null)}
        onConfirm={() => {
          delRow(confirmId);
          setConfirmId(null);
        }}
      />
    </div>
  );
}
