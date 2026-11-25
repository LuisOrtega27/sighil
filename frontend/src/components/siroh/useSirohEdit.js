/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   useSirohEdit.js
   Aplica una ficha existente cuando la URL trae ?edit=<cod_n>. El modal ya
   consulto el registro y lo pasa por location.state; si la URL se abre directo,
   se hace la consulta de respaldo. Al terminar limpia el query/state.
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { getInspeccion } from "../../api/siroh";

export const useSirohEdit = ({ cargarInspeccion, setSaveMessage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const editId = searchParams.get("edit");

  useEffect(() => {
    if (!editId) return undefined;

    let active = true;

    const load = async () => {
      try {
        const ficha = location.state?.ficha ?? (await getInspeccion(editId));
        if (!active) return;
        await cargarInspeccion(ficha);
      } catch {
        if (active) {
          setSaveMessage({
            tipo: "error",
            texto: "No se pudo cargar la ficha solicitada.",
          });
        }
      } finally {
        if (active) setSearchParams({}, { replace: true, state: {} });
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [editId, location.state, cargarInspeccion, setSaveMessage, setSearchParams]);

  return editId;
};
