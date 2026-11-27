/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   useSirohForm.js
   Logica compartida por los dos formularios SIROH (SirohForm.jsx y
   SirohRawForm.jsx): guardado en dos pasos, patron de ficha, coordenadas
   del mapa, carga de una ficha existente y reinicio. Solo difieren en los
   catalogos/estados propios de cada vista, entregados mediante
   resetExtras() / onCargar().
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

import { useCallback, useState } from "react";
import { createInspeccion, updateInspeccion } from "../../api/siroh";

/* La BD guarda estos campos, pero no son editables desde los controles del form. */
const CAMPOS_INTERNOS = new Set([
    "id",
    "user_id",
    "cod_n",
    "ficha_n",
    "modification",
    "created_at",
    "updated_at",
]);

const texto = (valor) => (valor === null || valor === undefined ? "" : String(valor));

/* La BD tiene fechas ISO y legacy en M/D/YYYY (mes/dia/anio, p. ej.
   3/25/2025 = 25 de marzo de 2025); input[type=date] solo acepta ISO. */
const normalizarFecha = (valor) => {
    const contenido = texto(valor);
    if (!contenido) return "";
    if (/^\d{4}-\d{2}-\d{2}/.test(contenido)) return contenido.slice(0, 10);

    const partes = contenido.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
    if (!partes) return "";

    const [, mes, dia, anio] = partes;
    const mesNum = Number(mes);
    const diaNum = Number(dia);
    const anioNum = Number(anio);
    const fecha = new Date(Date.UTC(anioNum, mesNum - 1, diaNum));

    /* Descarta valores como 13/25/2025 o 2/30/2025 en lugar de escribir
       una fecha invalida en el control y provocar un error del navegador. */
    if (
        fecha.getUTCFullYear() !== anioNum ||
        fecha.getUTCMonth() !== mesNum - 1 ||
        fecha.getUTCDate() !== diaNum
    ) return "";

    return `${anio}-${String(mesNum).padStart(2, "0")}-${String(diaNum).padStart(2, "0")}`;
};

/* Los inputs son no controlados: se escribe directo en el DOM para conservar
   pattern/required y groups de radio/checkbox. */
const aplicarValor = (control, valor, grupal) => {
    if (control.type === "hidden") return;

    const contenido = texto(valor);

    if (control.type === "radio") {
        if (grupal) control.checked = control.value === contenido;
        return;
    }

    if (control.type === "checkbox") {
        const valores = contenido.split(",").map((item) => item.trim()).filter(Boolean);
        control.checked =
            contenido === "1" ||
            contenido.toLowerCase() === "true" ||
            valores.includes(control.value);
        return;
    }

    control.value =
      control.type === "date" ? normalizarFecha(contenido) : contenido;
};

const escribirCampo = (campo, valor) => {
    if (!campo) return;

    /* RadioNodeList / HTMLCollection: varios controles comparten el name. */
    if (typeof campo.length === "number" && !campo.nodeType) {
        Array.from(campo).forEach((control) => aplicarValor(control, valor, true));
        return;
    }

    aplicarValor(campo, valor, false);
};

export const useSirohForm = ({ refs, resetExtras, onCargar }) => {
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

  /* Carga una fila existente devuelta por GET /inspecciones/:id. El payload
     se escribe por name; los catalogos dependientes los resuelve la vista
     mediante onCargar (SirohForm necesita sincronizar cuenca/subcuenca). */
  const cargarInspeccion = useCallback(async (ficha) => {
    if (!ficha) return;

    const form = formRef.current;
    if (form) {
      Object.entries(ficha).forEach(([name, value]) => {
        if (CAMPOS_INTERNOS.has(name)) return;
        escribirCampo(form.elements.namedItem(name), value);
      });
    }

    const codigo = Number(ficha.cod_n);
    if (codRef.current) codRef.current.value = String(codigo).padStart(6, "0");
    setInspeccionId(codigo);

    const fichaValor = texto(ficha.ficha_n);
    if (fichaRef.current) fichaRef.current.value = fichaValor;
    setFichaPrefix(fichaValor.replace(/\d{2}$/, ""));

    setMapInitial({ e: texto(ficha.coor_utm__e), n: texto(ficha.coor_utm__n) });
    setSaveMessage({
      tipo: "ok",
      texto: `Ficha ${String(codigo).padStart(6, "0")} cargada correctamente.`,
    });

    await onCargar?.(ficha);
  }, [formRef, codRef, fichaRef, onCargar]);

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
    cargarInspeccion,
    handleSubmit,
    handleReset,
    limpiarFormulario,
  };
};
