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
import {
  BTN_PRIMARY,
  CARD,
  CARD_SUB,
  CARD_TITLE,
  INPUT,
  PRINT_PREVIEW,
  TABLE,
  TH,
} from "./styles";
import { EmptyRow, Field, FormRow, SectionTitle, TabBtn } from "./helpers";

const Morfometria = () => {
  const [tab, setTab] = useState("mo-carga");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO(backend): guardarMorfometria() del original (js/ ausente).
    alert("Parámetros morfométricos procesados (pendiente de conexión con el backend).");
  };

  return (
    <div className={CARD}>
      <h2 className={CARD_TITLE}>Estudios de Parámetros de Forma y Relieve</h2>
      <div className={CARD_SUB}>
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
                className={INPUT}
              />
            </Field>
            <Field label="Área de la Cuenca (A) [km²]">
              <input type="number" step="0.01" id="mo-area" required className={INPUT} />
            </Field>
            <Field label="Perímetro de Cuenca (P) [km]">
              <input type="number" step="0.01" id="mo-perimetro" required className={INPUT} />
            </Field>
          </FormRow>

          <FormRow>
            <Field label="Longitud Cauce Principal (L) [km]">
              <input type="number" step="0.01" id="mo-long" required className={INPUT} />
            </Field>
            <Field label="Cota Máxima (Hmax) [msnm]">
              <input type="number" id="mo-cmax" required className={INPUT} />
            </Field>
            <Field label="Cota Mínima (Hmin) [msnm]">
              <input type="number" id="mo-cmin" required className={INPUT} />
            </Field>
          </FormRow>

          <div className="mt-[15px] text-right">
            <button type="submit" className={BTN_PRIMARY}>
              ⚡ Procesar Parámetros y Almacenar
            </button>
          </div>
        </form>
      </div>

      <div id="view-mo-banco" className={tab === "mo-banco" ? "" : "hidden"}>
        <h3 className="mb-2.5 text-[13px] font-bold uppercase text-primary">
          Catálogo de Estudios Guardados
        </h3>
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={TH}>Cuerpo de Agua</th>
              <th className={TH}>Área (km²)</th>
              <th className={TH}>Gravelius (Kc)</th>
              <th className={TH}>Pendiente (λ)</th>
              <th className={TH}>Acciones Técnicas</th>
            </tr>
          </thead>
          <tbody id="tabla-morfometria-cuerpo">
            {/* TODO(backend): estudios guardados (JS original ausente). */}
            <EmptyRow colSpan={5}>
              Sin datos registrados — pendiente de conexión con el backend.
            </EmptyRow>
          </tbody>
        </table>
        <div id="print-area" className={PRINT_PREVIEW} />
      </div>
    </div>
  );
};

export default Morfometria;
