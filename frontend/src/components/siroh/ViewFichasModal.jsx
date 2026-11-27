/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/ViewFichasModal.jsx
   Modal del boton "Ver fichas" del submenu SIROH. Busca registros anteriores
   por cod_n, ficha_n o fecha_transcripcion (combinados con OR) y muestra
   todas las columnas de la ficha en una tabla con scroll horizontal.
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

import { useEffect, useMemo, useState } from "react";

import { searchInspecciones } from "../../api/siroh";

const EMPTY_FILTERS = { cod_n: "", ficha_n: "", fecha: "" };

const inputCls = "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-sub focus:ring-1 focus:ring-sub"
const thCls = "whitespace-nowrap border-b border-slate-300 px-2.5 py-2 text-left text-[10px] font-bold uppercase tracking-wide text-slate-600"
const tdCls = "whitespace-nowrap border-b border-slate-100 px-2.5 py-2 text-[11px] text-slate-700"

const formatCell = (column, value) => {
  if (value === null || value === undefined || value === "") return "—";
  if (column === "cod_n") return String(value).padStart(6, "0");
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return value.slice(0, 10);
  }
  return String(value);
};

const ViewFichasModal = ({ onClose, onOpen }) => {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, loading]);

  const handleBackdrop = (event) => {
    if (event.target === event.currentTarget && !loading) onClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value.trim() !== "")
      );
      const rows = await searchInspecciones(activeFilters);
      setResults(Array.isArray(rows) ? rows : []);
      setSearched(true);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ?? "No se pudo realizar la búsqueda. Intente nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFilters(EMPTY_FILTERS);
    setResults([]);
    setSearched(false);
    setError("");
  };

  /* Las columnas se derivan de la primera fila: el backend devuelve SELECT *. */
  const columns = useMemo(
    () => (results.length ? Object.keys(results[0]) : []),
    [results]
  );

  return (
    <div
      className="fixed inset-0 z-2000 flex items-center justify-center bg-slate-950/70 p-4"
      onMouseDown={handleBackdrop}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="view-fichas-modal-title"
        className="flex max-h-[92vh] w-full max-w-6xl flex-col rounded-xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="view-fichas-modal-title" className="text-base font-bold text-slate-900">
              Ver fichas
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Busca registros anteriores por número (cod_n), código (ficha_n) o fecha de transcripción. Los filtros se combinan con OR.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Cerrar"
            className="rounded-lg px-2 py-1 text-lg leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-60"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-5 grid gap-3 sm:grid-cols-[1fr_2fr_1fr_auto_auto] sm:items-end"
        >
          <label className="flex flex-col text-xs font-semibold text-slate-600">
            Número (cod_n)
            <input
              name="cod_n"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="Ej. 9 o 000009"
              value={filters.cod_n}
              onChange={handleChange}
              className={inputCls}
            />
          </label>

          <label className="flex flex-col text-xs font-semibold text-slate-600">
            Código (ficha_n)
            <input
              name="ficha_n"
              type="text"
              autoComplete="off"
              placeholder="Ej. 01-02-03-ABC-04"
              value={filters.ficha_n}
              onChange={handleChange}
              className={inputCls}
            />
          </label>

          <label className="flex flex-col text-xs font-semibold text-slate-600">
            Fecha (fecha_transcripcion)
            <input
              name="fecha"
              type="date"
              value={filters.fecha}
              onChange={handleChange}
              className={inputCls}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Buscando…" : "Buscar"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-60"
          >
            Limpiar
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-3 rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-red-700">
            {error}
          </p>
        )}

        <div className="mt-5 min-h-0 flex-1 overflow-auto rounded-lg border border-slate-200">
          {loading ? (
            <p className="p-8 text-center text-sm text-slate-500">Buscando registros…</p>
          ) : !searched ? (
            <p className="p-8 text-center text-sm text-slate-500">
              Ingresa un filtro y pulsa Buscar para ver los registros.
            </p>
          ) : results.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">
              No hay coincidencias con los filtros aplicados.
            </p>
          ) : (
            <table className="w-max border-collapse">
              <thead className="sticky top-0 bg-slate-100">
                <tr>
                  <th className={`${thCls} sticky left-0 z-10 bg-slate-100`}>Acción</th>
                  {columns.map((column) => (
                    <th key={column} className={thCls}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr key={row.cod_n} className="border-b border-slate-100">
                    <td className={`${tdCls} sticky left-0 z-10 bg-white`}>
                      <button
                        type="button"
                        onClick={() => onOpen(row)}
                        className="rounded border border-primary px-2 py-1 text-[10px] font-bold text-primary transition hover:bg-primary hover:text-white"
                      >
                        Abrir
                      </button>
                    </td>
                    {columns.map((column) => (
                      <td key={column} className={tdCls}>
                        {formatCell(column, row[column])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {searched && results.length > 0 && (
          <p className="mt-3 text-[11px] text-slate-400">
            {results.length} registro(s) — desplázate horizontalmente para ver todos los campos.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewFichasModal;
