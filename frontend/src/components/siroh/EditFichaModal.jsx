/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/EditFichaModal.jsx
   Modal del boton "Editar ficha" del sidebar (y del formulario plano).
   Pide el cod_n de la fila, valida que exista en el backend y entrega la
   ficha completa al componente que abrira el formulario en modo edicion.
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

import { useEffect, useState } from "react";

import { getInspeccion } from "../../api/siroh";

const EditFichaModal = ({ onClose, onLoaded }) => {
  const [id, setId] = useState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const raw = id.trim();
    if (!/^\d+$/.test(raw) || Number(raw) <= 0) {
      setError("Introduce un ID numérico válido (por ejemplo 9 o 000009).");
      return;
    }

    setLoading(true);
    try {
      const ficha = await getInspeccion(raw);
      onLoaded(ficha);
    } catch (requestError) {
      setError(
        requestError.response?.status === 404
          ? "No existe una ficha con ese ID."
          : "No se pudo consultar la ficha. Intente nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-2000 flex items-center justify-center bg-slate-950/70 p-4"
      onMouseDown={handleBackdrop}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-ficha-modal-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
      >
        <h2 id="edit-ficha-modal-title" className="text-base font-bold text-slate-900">
          Editar ficha
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          Introduce el ID de la fila que deseas cargar. Puedes escribirlo con o sin ceros a la izquierda.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-5">
          <label htmlFor="edit-ficha-id" className="flex flex-col text-xs font-semibold text-slate-600">
            ID de la ficha (cod_n)
            <input
              id="edit-ficha-id"
              name="edit-ficha-id"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              autoFocus
              placeholder="Ej. 9 o 000009"
              value={id}
              onChange={(event) => {
                setId(event.target.value);
                setError("");
              }}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-sub focus:ring-1 focus:ring-sub"
            />
          </label>

          {error && (
            <p role="alert" className="mt-2 text-xs font-medium text-red-600">
              {error}
            </p>
          )}

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-60"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Consultando…" : "Cargar ficha"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFichaModal;
