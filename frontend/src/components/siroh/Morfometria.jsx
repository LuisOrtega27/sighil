/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/Morfometria.jsx
   Seccion "Estudios de Parametros de Forma y Relieve" (antes:
   #page-morfometria de siroh.html).
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Notas de migracion:
   - switchSubTab('morfo', …) pasa a estado local (mo-carga / mo-banco).
   - guardarMorfometria() (js/… inexistente en el repo) =>
     preventDefault + alert con TODO de backend.
   - La tabla del "Banco de Morfometria" se poblaban desde ese JS:
     se deja con fila "sin datos". */

import { useState } from "react";
import { EmptyRow, TabBtn } from "./helpers";
import { Field, FormRow, SectionTitle } from "../formPrimitives";

const Morfometria = () => {
  const [tab, setTab] = useState("mo-carga");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO(backend): guardarMorfometria() del original (js/ ausente).
    alert("Parámetros morfométricos procesados (pendiente de conexión con el backend).");
  };

  return (
    <div className="mb-6 rounded-lg border-t-4 border-secondary bg-white p-[30px] shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
      <h2 className="mb-1 text-xl font-bold uppercase text-primary">Estudios de Parámetros de Forma y Relieve</h2>
      <div className="mb-6 text-[12.5px] font-semibold uppercase tracking-[0.5px] text-[#64748b]">
        Cálculo de Variables Geométricas en Cuerpos de Agua
      </div>

      <div className="flex gap-[5px] overflow-x-auto border-b-2 border-line bg-[#e2e8f0] px-[5px] pt-[5px] rounded-t-md mb-5">
        <TabBtn id="btn-mo-carga" active={tab === "mo-carga"} onClick={() => setTab("mo-carga")}>
          Módulo A) Procesamiento Secuencial
        </TabBtn>
        <TabBtn id="btn-mo-banco" active={tab === "mo-banco"} onClick={() => setTab("mo-banco")}>
          Módulo B) Banco de Morfometría
        </TabBtn>
      </div>

      <div id="view-mo-carga" className={tab === "mo-carga" ? "" : "hidden"}>
        <form id="form-morfometria" onSubmit={handleSubmit}>
          <input type="hidden" id="morfo-id" />
          <SectionTitle>Variables Iniciales del Cuerpo de Agua</SectionTitle>

          <FormRow>
            <Field label="Nombre del Cuerpo / Quebrada">
              <input
                type="text"
                id="mo-nombre"
                placeholder="Ej. Quebrada Pomosa"
                required
                className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none"
              />
            </Field>
            <Field label="Área de la Cuenca (A) [km²]">
              <input type="number" step="0.01" id="mo-area" required className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none" />
            </Field>
            <Field label="Perímetro de Cuenca (P) [km]">
              <input type="number" step="0.01" id="mo-perimetro" required className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none" />
            </Field>
          </FormRow>

          <FormRow>
            <Field label="Longitud Cauce Principal (L) [km]">
              <input type="number" step="0.01" id="mo-long" required className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none" />
            </Field>
            <Field label="Cota Máxima (Hmax) [msnm]">
              <input type="number" id="mo-cmax" required className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none" />
            </Field>
            <Field label="Cota Mínima (Hmin) [msnm]">
              <input type="number" id="mo-cmin" required className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none" />
            </Field>
          </FormRow>

          <div className="mt-[15px] text-right">
            <button type="submit" className="cursor-pointer rounded border-none text-xs font-bold uppercase text-white transition-colors bg-primary px-5 py-2.5">
              ⚡ Procesar Parámetros y Almacenar
            </button>
          </div>
        </form>
      </div>

      <div id="view-mo-banco" className={tab === "mo-banco" ? "" : "hidden"}>
        <h3 className="mb-2.5 text-[13px] font-bold uppercase text-primary">
          Catálogo de Estudios Guardados
        </h3>
        <table className="mb-[15px] mt-2.5 w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Cuerpo de Agua</th>
              <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Área (km²)</th>
              <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Gravelius (Kc)</th>
              <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Pendiente (λ)</th>
              <th className="border-b border-[#e2e8f0] bg-lightblue px-3 py-2.5 text-left text-[10.5px] font-bold uppercase text-primary">Acciones Técnicas</th>
            </tr>
          </thead>
          <tbody id="tabla-morfometria-cuerpo">
            {/* TODO(backend): estudios guardados (JS original ausente). */}
            <EmptyRow colSpan={5}>
              Sin datos registrados — pendiente de conexión con el backend.
            </EmptyRow>
          </tbody>
        </table>
        <div id="print-area" className="hidden border-2 border-black bg-white p-[30px] mt-5 font-['Courier_New',monospace]" />
      </div>
    </div>
  );
};

export default Morfometria;
