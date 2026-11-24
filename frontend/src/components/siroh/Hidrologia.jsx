/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/Hidrologia.jsx
   Seccion "Inventario y Caracterizacion Macro de Cuencas" (antes:
   #page-hidrologia de siroh.html).
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Notas de migracion:
   - verCuenca() (js/… inexistente en el repo) se reimplementa con estado:
     al elegir una subcuenca se muestra su nombre y el detalle queda
     "sin datos" hasta contar con backend (decision de migracion).
   - El original dejaba la primera subcuenca (Macarao) siempre resaltada
     con background --light-blue en duro; aqui el resaltado lo controla el
     estado de seleccion. */

import { useState } from "react";
import { INSTITUTION } from "../../config/institution";
import { CUENCAS } from "./options";

const Hidrologia = () => {
  const [selected, setSelected] = useState(null);
  const cuenca = CUENCAS.find((c) => c.id === selected);

  return (
    <div className="mb-6 rounded-lg border-t-4 border-secondary bg-white p-[30px] shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
      <h2 className="mb-1 text-xl font-bold uppercase text-primary">Inventario y Caracterización Macro de Cuencas</h2>
      <div className="mb-6 text-[12.5px] font-semibold uppercase tracking-[0.5px] text-[#64748b]">
        Repositorio de expedientes digitales de las subcuencas del municipio
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-5">
        <div className="border-r border-line pr-[15px]">
          <h3 className="mb-2.5 text-xs font-bold uppercase text-primary">Subcuencas Disponibles</h3>
          {CUENCAS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c.id)}
              className={`mb-1.5 w-full cursor-pointer rounded px-2.5 py-2.5 text-left text-[13px] font-bold transition-colors ${
                selected === c.id ? "bg-lightblue" : "bg-[#f1f5f9] hover:bg-lightblue"
              }`}
            >
              {c.nombre}
            </button>
          ))}
        </div>

        <div className="rounded-md border border-line bg-[#fafafa] p-5">
          <h3 className="text-base font-bold text-primary">
            {cuenca ? cuenca.nombre : "Selecciona una subcuenca para abrir el expediente"}
          </h3>
          <div className="mt-3.5 text-[13px] leading-[1.5] text-[#475569]">
            {cuenca ? (
              /* TODO(backend): expediente completo de la subcuenca
                 (lo cargaba el JS original, inexistente en el repo). */
              "Expediente sin datos disponibles — pendiente de conexión con el backend."
            ) : (
              `Haz clic en el panel izquierdo para consultar las variables de drenaje, coeficientes de escorrentía calculados y las principales vulnerabilidades registradas por el ${INSTITUTION.organismoSigla}.`
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hidrologia;
