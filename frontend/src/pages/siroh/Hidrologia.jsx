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
import {
  CARD,
  CARD_SUB,
  CARD_TITLE,
  CUENCA_BTN,
  CUENCA_BTN_ACTIVE,
  CUENCA_BTN_IDLE,
  CUENCA_DETAIL,
  CUENCA_DETAIL_BODY,
  CUENCA_DETAIL_TITLE,
  CUENCAS_GRID,
  CUENCAS_LIST,
  CUENCAS_TITLE,
} from "./styles";
import { CUENCAS } from "./options";

const Hidrologia = () => {
  const [selected, setSelected] = useState(null);
  const cuenca = CUENCAS.find((c) => c.id === selected);

  return (
    <div className={CARD}>
      <h2 className={CARD_TITLE}>Inventario y Caracterización Macro de Cuencas</h2>
      <div className={CARD_SUB}>
        Repositorio de expedientes digitales de las subcuencas del municipio
      </div>

      <div className={CUENCAS_GRID}>
        <div className={CUENCAS_LIST}>
          <h3 className={CUENCAS_TITLE}>Subcuencas Disponibles</h3>
          {CUENCAS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c.id)}
              className={`${CUENCA_BTN} ${
                selected === c.id ? CUENCA_BTN_ACTIVE : CUENCA_BTN_IDLE
              }`}
            >
              {c.nombre}
            </button>
          ))}
        </div>

        <div className={CUENCA_DETAIL}>
          <h3 className={CUENCA_DETAIL_TITLE}>
            {cuenca ? cuenca.nombre : "Selecciona una subcuenca para abrir el expediente"}
          </h3>
          <div className={CUENCA_DETAIL_BODY}>
            {cuenca ? (
              /* TODO(backend): expediente completo de la subcuenca
                 (lo cargaba el JS original, inexistente en el repo). */
              "Expediente sin datos disponibles — pendiente de conexión con el backend."
            ) : (
              "Haz clic en el panel izquierdo para consultar las variables de drenaje, coeficientes de escorrentía calculados y las principales vulnerabilidades registradas por el IMGRAD."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hidrologia;
