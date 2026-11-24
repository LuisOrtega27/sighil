/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/DemarcacionModal.jsx
   Modal con los mismos 3 catalogos en cascada de SirohForm.jsx:
   cuenca -> subcuenca -> parroquia. Genera el prefijo de #ficha_n y se lo
   entrega al formulario destino mediante onApply(prefix).
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

import { useEffect, useMemo, useState } from "react";

import { getCuencas, getParroquias, getSubcuencas } from "../../api/catalogos";

/* id cuenca - codigo subcuenca - id parroquia - abreviatura - */
const buildFichaPrefix = (cuencas, subcuencas, parroquias, cId, sId, pId) => {
  const cuenca = cuencas.find((item) => String(item.id) === String(cId));
  const subcuenca = subcuencas.find((item) => String(item.id) === String(sId));
  const parroquia = parroquias.find((item) => String(item.id) === String(pId));
  if (!cuenca || !subcuenca || !parroquia) return "";

  const twoDigits = (value) => String(value).padStart(2, "0");
  const abreviatura = String(subcuenca.abreviatura ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 3);

  return `${twoDigits(cuenca.id)}-${twoDigits(subcuenca.codigo)}-${twoDigits(
    parroquia.id
  )}-${abreviatura}-`;
};

const DemarcacionModal = ({ onClose, onApply, currentFicha = "" }) => {
  const [cuencas, setCuencas] = useState([]);
  const [subcuencas, setSubcuencas] = useState([]);
  const [parroquias, setParroquias] = useState([]);
  const [cuencaId, setCuencaId] = useState("");
  const [subcuencaId, setSubcuencaId] = useState("");
  const [parroquiaId, setParroquiaId] = useState("");
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState(false);

  /* 2 peticiones iniciales en paralelo, igual que en SirohForm. */
  useEffect(() => {
    let cancelled = false;

    const loadCatalogos = async () => {
      try {
        const [cuencasData, parroquiasData] = await Promise.all([
          getCuencas(),
          getParroquias(),
        ]);
        if (!cancelled) {
          setCuencas(cuencasData);
          setParroquias(parroquiasData);
        }
      } catch {
        if (!cancelled) setCatalogError(true);
      } finally {
        if (!cancelled) setCatalogLoading(false);
      }
    };

    loadCatalogos();
    return () => {
      cancelled = true;
    };
  }, []);

  /* Tercera peticion, dependiente de la cuenca elegida. */
  useEffect(() => {
    if (!cuencaId) return;

    let cancelled = false;

    const loadSubcuencas = async () => {
      try {
        const data = await getSubcuencas(cuencaId);
        if (!cancelled) setSubcuencas(data);
      } catch {
        if (!cancelled) setCatalogError(true);
      }
    };

    loadSubcuencas();
    return () => {
      cancelled = true;
    };
  }, [cuencaId]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const fichaPrefix = useMemo(
    () =>
      buildFichaPrefix(
        cuencas,
        subcuencas,
        parroquias,
        cuencaId,
        subcuencaId,
        parroquiaId
      ),
    [cuencas, subcuencas, parroquias, cuencaId, subcuencaId, parroquiaId]
  );

  const handleCuencaChange = (event) => {
    setCuencaId(event.target.value);
    setSubcuencaId("");
    setParroquiaId("");
    setSubcuencas([]);
  };

  const handleSubcuencaChange = (event) => {
    setSubcuencaId(event.target.value);
    setParroquiaId("");
  };

  const handleParroquiaChange = (event) => {
    setParroquiaId(event.target.value);
  };

  const handleBackdrop = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-950/70 p-4"
      onMouseDown={handleBackdrop}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="demarcacion-modal-title"
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-line bg-primary px-5 py-3 text-white">
          <h2 id="demarcacion-modal-title" className="text-sm font-bold">
            Seleccionar demarcación
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-lg px-3 py-1.5 text-lg leading-none transition hover:bg-white/10"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label htmlFor="filter-cuenca" className="mb-1 text-[10.5px] font-bold uppercase text-[#475569]">
              ----Cuenca----
            </label>
            <select
              id="filter-cuenca"
              className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none"
              value={cuencaId}
              onChange={handleCuencaChange}
            >
              <option value="">----Cuenca----</option>
              {cuencas.map((cuenca) => (
                <option key={cuenca.id} value={cuenca.id}>
                  {cuenca.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-sub-cuenca" className="mb-1 text-[10.5px] font-bold uppercase text-[#475569]">
              ----Sub Cuenca----
            </label>
            <select
              id="filter-sub-cuenca"
              className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none"
              value={subcuencaId}
              onChange={handleSubcuencaChange}
              disabled={!cuencaId}
            >
              <option value="">----Sub Cuenca----</option>
              {subcuencas.map((subcuenca) => (
                <option key={subcuenca.id} value={subcuenca.id}>
                  {subcuenca.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-parroquia" className="mb-1 text-[10.5px] font-bold uppercase text-[#475569]">
              ----Parroquia----
            </label>
            <select
              id="filter-parroquia"
              className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none"
              value={parroquiaId}
              onChange={handleParroquiaChange}
              disabled={!subcuencaId}
            >
              <option value="">----Parroquia----</option>
              {parroquias.map((parroquia) => (
                <option key={parroquia.id} value={parroquia.id}>
                  {parroquia.nombre}
                </option>
              ))}
            </select>
          </div>

          {(catalogLoading || catalogError) && (
            <p className="text-[10px] text-slate-500">
              {catalogError
                ? "Sin datos — pendiente de conexión con el backend."
                : "Cargando catálogos…"}
            </p>
          )}

          <div>
            <label htmlFor="demarcacion-ficha-preview" className="mb-1 text-[10.5px] font-bold uppercase text-[#475569]">
              FICHA Nº
            </label>
            <input
              type="text"
              id="demarcacion-ficha-preview"
              className="rounded border border-line bg-white px-2.5 py-[7px] text-[12.5px] outline-none"
              readOnly
              value={fichaPrefix || currentFicha}
            />
            {fichaPrefix && (
              <p className="mt-1 text-[10px] text-slate-500">
                Solo puede editar los últimos 2 dígitos en el formulario.
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-line px-5 py-4">
          <button type="button" onClick={onClose} className="cursor-pointer rounded border-none text-xs font-bold uppercase text-white transition-colors bg-secondary px-5 py-2.5 hover:bg-primary">
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onApply(fichaPrefix)}
            disabled={!fichaPrefix}
            className={`cursor-pointer rounded border-none text-xs font-bold uppercase text-white transition-colors bg-primary px-5 py-2.5 disabled:opacity-50`}
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemarcacionModal;
