/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   useSirohForm.js
   Logica compartida por los dos formularios SIROH (SirohForm.jsx y
   SirohRawForm.jsx): guardado en dos pasos, patron de ficha, coordenadas
   del mapa y reinicio. Solo difieren en los catalogos/estados propios de
   cada vista, que se entregan mediante resetExtras().
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

import { useCallback, useState } from "react";
import { createInspeccion, updateInspeccion } from "../../api/siroh";

export const useSirohForm = ({ refs, resetExtras }) => {
  const { form: formRef, cod: codRef, east: eastRef, north: northRef, ficha: fichaRef } = refs;

  const [mapOpen, setMapOpen] = useState(false);
  const [mapInitial, setMapInitial] = useState({ e: "", n: "" });
  const [fichaPrefix, setFichaPrefix] = useState("");
  const [inspeccionId, setInspeccionId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  const construirPayload = () => {
    const formData = new FormData(formRef.current);
    const payload = {};

    for (const [name, valor] of formData.entries()) {
      /* cod_n lo asigna el backend; los selects de catalogo no tienen name
         y por eso FormData ya los ignora. */
      if (name === "cod_n") continue;
      const value =
        typeof valor === "string" && valor.trim() === "" ? null : valor;
      payload[name] = Array.isArray(value) ? value.join(",") : value;
    }

    return payload;
  };

  /* El prefijo generado no se puede borrar: solo se aceptan 2 digitos finales. */
  const handleFichaChange = (event) => {
    if (!fichaPrefix) return;

    const raw = event.target.value;
    const suffix = raw.startsWith(fichaPrefix)
      ? raw.slice(fichaPrefix.length)
      : "";
    const digits = suffix.replace(/\D/g, "").slice(0, 2);
    const next = `${fichaPrefix}${digits}`;

    if (fichaRef.current) fichaRef.current.value = next;
  };

  /* Los inputs se dejan no controlados para conservar pattern/required y la
     validacion nativa; el mapa solo escribe directamente sus values. */
  const handleMapSelect = useCallback(({ e, n }) => {
    if (eastRef.current) eastRef.current.value = e;
    if (northRef.current) northRef.current.value = n;
  }, [eastRef, northRef]);

  const handleMapClose = useCallback(() => setMapOpen(false), []);

  const handleMapOpen = useCallback(() => {
    /* Se capturan los values actuales para que el modal marque el punto
       ya registrado en la ficha (si ambos campos son validos). */
    setMapInitial({
      e: eastRef.current?.value ?? "",
      n: northRef.current?.value ?? "",
    });
    setMapOpen(true);
  }, [eastRef, northRef]);

  const resetEstado = () => {
    setMapInitial({ e: "", n: "" });
    setFichaPrefix("");
    setInspeccionId(null);

    if (fichaRef.current) fichaRef.current.value = "";
    if (codRef.current) codRef.current.value = "";

    resetExtras?.();
  };

  const limpiarFormulario = () => {
    formRef.current?.reset();
    resetEstado();
  };

  const handleReset = () => {
    /* El navegador ya limpia los values; aqui solo se reinicia el estado. */
    resetEstado();
    setSaveMessage(null);
  };

  const handleCrearRegistro = async () => {
    if (creating || inspeccionId) return;

    setCreating(true);
    setSaveMessage(null);

    try {
      const registro = await createInspeccion();
      if (codRef.current) codRef.current.value = registro.cod_n;
      setInspeccionId(registro.id);
      setSaveMessage({
        tipo: "ok",
        texto: `Registro creado con código ${registro.cod_n}.`,
      });
    } catch {
      setSaveMessage({
        tipo: "error",
        texto: "No se pudo crear el registro. Intente nuevamente.",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inspeccionId || submitting) return;

    setSubmitting(true);
    setSaveMessage(null);

    try {
      // TODO(backend): confirmar mapeo definitivo de campos y tabla destino.
      await updateInspeccion(inspeccionId, construirPayload());
      limpiarFormulario();
      setSaveMessage({
        tipo: "ok",
        texto: "Inspección registrada correctamente.",
      });
    } catch {
      setSaveMessage({
        tipo: "error",
        texto: "No se pudo guardar la inspección. Intente nuevamente.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    // estado
    mapOpen,
    mapInitial,
    fichaPrefix,
    setFichaPrefix,
    inspeccionId,
    creating,
    submitting,
    saveMessage,
    setSaveMessage,
    // handlers
    construirPayload,
    handleFichaChange,
    handleMapSelect,
    handleMapClose,
    handleMapOpen,
    handleCrearRegistro,
    handleSubmit,
    handleReset,
    limpiarFormulario,
  };
};
