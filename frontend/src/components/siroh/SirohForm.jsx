/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/SirohForm.jsx
   Seccion SIROH: formulario tecnico con 7 sub-pestanas horizontales
   (antes: #page-siroh de siroh.html, con su <form id="form-siroh">).
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Notas de migracion:
   - switchSubTab() (js/components/mainNav.js — inexistente en el repo)
     se reimplementa con estado + scrollTo horizontal; el scroll-snap y el
     overflow del form se mantienen via siroh.css (.siroh-form / .siroh-view).
   - El original no declaraba onsubmit (lo resolvia ese JS ausente): aqui
     se preventDefault + alert, como en Login.jsx, con TODO de backend.
   - Se conservan ids, names, patterns, datalists y textos verbatim
     (incluidos errores de tipeo del original: "Covertura", "Dimenciones",
     "Estructurares", "Construccion", etc.).
   - #map-btn: su accion vivia en js/services/google_maps_api/map.js
     (inexistente); ahora abre CoordinateMapModal (Leaflet/OSM) y escribe
     E/N en UTM. El input sigue oculto como en el original.
   - #ficha_n: los selects #filter-cuenca / #filter-sub-cuenca /
     #filter-parroquia se llenan desde /api/catalogos. El campo se genera
     como "id cuenca - codigo subcuenca - id parroquia - abreviatura - NN";
     solo los ultimos 2 digitos son editables por el usuario.
   - Guardado en dos pasos: "Nuevo registro" crea la fila en ficha_eoh y
     devuelve cod_n = LPAD(id, 6, '0'); el submit actualiza esa fila con
     los name del formulario como columnas. */

import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/* Leaflet se carga solo cuando se abre el modal (mantiene ligero el bundle inicial). */
const CoordinateMapModal = lazy(() => import("./CoordinateMapModal"));
import {
  BTN_SMALL,
  BTN_SUCCESS_BLOCK,
  CARD,
  CARD_SUB,
  CARD_TITLE,
  FICHA_HEADER,
  FORM_GROUP,
  INPUT,
  SELECT,
  TAB_CONTAINER,
  TEXTAREA,
} from "./styles";
import {
  CbGrid,
  CheckItem,
  Field,
  FormRow,
  ImgCheckItem,
  ImgRadioItem,
  RadioItem,
  SectionTitle,
  SubTitle,
  TabBtn,
} from "./helpers";
import { INSTITUTION } from "../../config/institution";
import {
  getCuencas,
  getParroquias,
  getSubcuencas,
} from "../../api/catalogos";
import {
  createInspeccion,
  updateInspeccion,
} from "../../api/siroh";
import {
  ALTERACIONES_CAUSE,
  CANALES,
  CLASIFICACION,
  COBERTURA_VEGETAL,
  CONDICION_ACTUAL,
  DANOS_ACERO,
  DANOS_CONCRETO,
  DANOS_ESTRUCTURALES,
  DANOS_FUNCIONALES,
  DANOS_VISIBLES,
  DIQUES_ABIERTOS,
  DIQUES_CERRADOS,
  DISENO_DIQUE,
  ELEMENTOS_CONSTRUCCION,
  ESTRUCTURAS_AUXILIARES,
  FACTORES_CONTAMINANTES,
  FUNCION,
  MEDIDAS,
  NIVELES_COLMATAcion,
  PARROQUIAS,
  RETIRO_CUERPO_AGUA,
  TIPO_DESCANSO,
  TIPO_DIQUE,
  TIPO_MURO,
  USOS_SUELO,
  VARIACION,
  VERTEDEROS,
  VIVIENDAS,
} from "./options";
import canalRectangular from "../../assets/imgs/canales/canales-rectangular.png";
import canalTrapezoidal from "../../assets/imgs/canales/canales-trapezoidal.png";
import canalTriangular from "../../assets/imgs/canales/canales-triangular.png";
import diqueCerrRectangular from "../../assets/imgs/diques-cerrados/diques_cerrados-rectangular.png";
import diqueCerrTrapezoidal from "../../assets/imgs/diques-cerrados/diques_cerrados-trapezoidal.png";
import diqueCerrCircular from "../../assets/imgs/diques-cerrados/diques_cerrados-circular.png";
import diqueAbrRanura from "../../assets/imgs/diques_abiertos/diques_abiertos-ranura.png";
import diqueAbrRastrillo from "../../assets/imgs/diques_abiertos/diques_abiertos-rastrillo.png";
import diqueAbrEnrejado from "../../assets/imgs/diques_abiertos/diques_abiertos-enrejado.png";
import morteroGrandes from "../../assets/imgs/morteros/mortero-grandes.png";
import morteroMedianos from "../../assets/imgs/morteros/mortero-medianos.png";
import morteroBoronilla from "../../assets/imgs/morteros/mortero-boronilla.png";
import morteroPolvo from "../../assets/imgs/morteros/mortero-polvo.png";
import mapLocationIcon from "../../assets/icons/map-location-dot.svg";

/* Mapa de imagenes para los arrays de options.js */
const IMG = {
  "canales-rectangular": canalRectangular,
  "canales-trapezoidal": canalTrapezoidal,
  "canales-triangular": canalTriangular,
  "diques_cerrados-rectangular": diqueCerrRectangular,
  "diques_cerrados-trapezoidal": diqueCerrTrapezoidal,
  "diques_cerrados-circular": diqueCerrCircular,
  "diques_abiertos-ranura": diqueAbrRanura,
  "diques_abiertos-rastrillo": diqueAbrRastrillo,
  "diques_abiertos-enrejado": diqueAbrEnrejado,
  "mortero-grandes": morteroGrandes,
  "mortero-medianos": morteroMedianos,
  "mortero-boronilla": morteroBoronilla,
  "mortero-polvo": morteroPolvo,
};

const MORTEROS = [
  { id: "meto_apli__mortero__grandes", name: "meto_apli__prueba_mortero", value: "mortero grandes", img: "mortero-grandes", alt: "Mortero Grande" },
  { id: "meto_apli__mortero__medianos", name: "meto_apli__prueba_mortero", value: "mortero medianos", img: "mortero-medianos", alt: "Mortero Mediano" },
  { id: "meto_apli__mortero__borilla", name: "meto_apli__prueba_mortero", value: "mortero borilla", img: "mortero-boronilla", alt: "Mortero Borilla (viruta)" },
  { id: "meto_apli__mortero__polvo", name: "meto_apli__prueba_mortero", value: "mortero polvo", img: "mortero-polvo", alt: "Mortero Polvo" },
];

const TABS = [
  { key: "s-id", id: "btn-s-id", label: "1. Control e Inspectores" },
  { key: "s-entorno", id: "btn-s-entorno", label: "2. Datos de Cuenca y Entorno" },
  { key: "s-tipo", id: "btn-s-tipo", label: "3. Tipo y Detalles de Obra" },
  { key: "s-Caracteristicas", id: "btn-s-Caracteristicas", label: "4. Caracteristicas de la Obra" },
  { key: "s-danos", id: "btn-s-danos", label: "5. Daños Estructurales" },
  { key: "s-metodologia", id: "btn-s-metodologia", label: "6. Metodologia Aplicada" },
  { key: "s-organizaciones", id: "btn-s-organizaciones", label: "7. Organizaciones participantes" },
];

const ORGANIZACIONES = [
  { n: 1, required: true },
  { n: 2, required: false },
  { n: 3, required: false },
];

const SirohForm = () => {
  const [activeTab, setActiveTab] = useState("s-id");
  const [mapOpen, setMapOpen] = useState(false);
  const [mapInitial, setMapInitial] = useState({ e: "", n: "" });

  /* Catalogos de la ficha: cuencas + parroquias se piden al montar;
     subcuencas depende de la cuenca elegida. */
  const [cuencas, setCuencas] = useState([]);
  const [subcuencas, setSubcuencas] = useState([]);
  const [parroquias, setParroquias] = useState([]);
  const [cuencaId, setCuencaId] = useState("");
  const [subcuencaId, setSubcuencaId] = useState("");
  const [parroquiaId, setParroquiaId] = useState("");
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState(false);
  const [fichaPrefix, setFichaPrefix] = useState("");
  const [fichaEditable, setFichaEditable] = useState(false);

  /* Guardado en dos pasos: primero se crea la fila (cod_n) y luego se
     actualizan las columnas con los name del formulario. */
  const [inspeccionId, setInspeccionId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  const formRef = useRef(null);
  const viewRefs = useRef({});
  const eastRef = useRef(null);
  const northRef = useRef(null);
  const fichaRef = useRef(null);
  const codRef = useRef(null);

  /* 2 peticiones iniciales: cuencas y parroquias (catalogo independiente). */
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

  const setFichaValue = (prefix) => {
    setFichaPrefix(prefix);
    setFichaEditable(Boolean(prefix));
    if (fichaRef.current) fichaRef.current.value = prefix;
  };

  /* id de cuenca - codigo de subcuenca - id de parroquia - abreviatura - NN */
  const buildFichaPrefix = (cId, sId, pId) => {
    const cuenca = cuencas.find((item) => String(item.id) === String(cId));
    const subcuenca = subcuencas.find((item) => String(item.id) === String(sId));
    const parroquia = parroquias.find(
      (item) => String(item.id) === String(pId)
    );
    if (!cuenca || !subcuenca || !parroquia) return "";

    const twoDigits = (value) => String(value).padStart(2, "0");
    const abreviatura = String(subcuenca.abreviatura ?? "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 3);

    return `${twoDigits(cuenca.id)}-${twoDigits(subcuenca.codigo)}-${twoDigits(parroquia.id)}-${abreviatura}-`;
  };

  const handleCuencaChange = (event) => {
    const value = event.target.value;
    setCuencaId(value);
    setSubcuencaId("");
    setParroquiaId("");
    setSubcuencas([]);
    setFichaValue("");
  };

  const handleSubcuencaChange = (event) => {
    setSubcuencaId(event.target.value);
    setParroquiaId("");
    setFichaValue("");
  };

  const handleParroquiaChange = (event) => {
    const value = event.target.value;
    setParroquiaId(value);
    const prefix = buildFichaPrefix(cuencaId, subcuencaId, value);
    setFichaValue(prefix);
    if (prefix && fichaRef.current) fichaRef.current.focus();
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

  const limpiarFormulario = () => {
    formRef.current?.reset();
    setCuencaId("");
    setSubcuencaId("");
    setParroquiaId("");
    setSubcuencas([]);
    setFichaPrefix("");
    setFichaEditable(false);
    setMapInitial({ e: "", n: "" });
    setInspeccionId(null);

    if (fichaRef.current) fichaRef.current.value = "";
    if (codRef.current) codRef.current.value = "";
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

  /* Los inputs se dejan no controlados para conservar pattern/required y la
     validacion nativa del formulario original; el mapa solo escribe sus values. */
  const handleMapSelect = useCallback(({ e, n }) => {
    if (eastRef.current) eastRef.current.value = e;
    if (northRef.current) northRef.current.value = n;
  }, []);
  const handleMapClose = useCallback(() => setMapOpen(false), []);
  const handleMapOpen = useCallback(() => {
    /* Se capturan los values actuales para que el modal marque el punto
       ya registrado en la ficha (si ambos campos son validos). */
    setMapInitial({
      e: eastRef.current?.value ?? "",
      n: northRef.current?.value ?? "",
    });
    setMapOpen(true);
  }, []);

  const goToTab = (key) => {
    setActiveTab(key);
    const view = viewRefs.current[key];
    if (view && formRef.current) {
      formRef.current.scrollTo({ left: view.offsetLeft, behavior: "smooth" });
    }
  };

  // Ref compartido: cada vista se registra por su id (view-s-<clave>),
  // evitando invocar funciones que tocan refs durante el render.
  const setViewRef = (el) => {
    if (el) viewRefs.current[el.id.replace("view-", "")] = el;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inspeccionId || submitting) return;

    setSubmitting(true);
    setSaveMessage(null);

    try {
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

  return (
    <div className={CARD}>
      <div className={FICHA_HEADER}>
        MINISTERIO DEL PODER POPULAR DE LAS AGUAS • VICEMINISTERIO DE
        ADMINISTRACIÓN DE CUENCAS HIDROGRÁFICAS
        <br />
        DIRECCIÓN GENERAL DE MITIGACIÓN Y CONTROL DE INUNDACIONES • {`ALCALDÍA DE ${INSTITUTION.municipio.toUpperCase()} (${INSTITUTION.organismoSigla})`}
      </div>
      <h2 className={CARD_TITLE}>
        Sistema de Inspección y Registro de Obras Hidráulicas (SIROH)
      </h2>
      <div className={CARD_SUB}>
        Formulario Técnico de Evaluación de Infraestructura Fluvial
      </div>

      <div className={TAB_CONTAINER}>
        {TABS.map((tab) => (
          <TabBtn
            key={tab.key}
            id={tab.id}
            active={activeTab === tab.key}
            onClick={() => goToTab(tab.key)}
          >
            {tab.label}
          </TabBtn>
        ))}
      </div>

      <form ref={formRef} id="form-siroh" className="siroh-form relative max-h-4/5 overflow-y-scroll" onSubmit={handleSubmit}>
        {/* ================= 1. CONTROL E INSPECTORES ================= */}
        <div id="view-s-id" ref={setViewRef} className="siroh-view">
          <SectionTitle>Control de la Inspección</SectionTitle>
          <FormRow>
            <Field label="Fecha de Inspección" htmlFor="header_fecha__fecha">
              <input
                type="date"
                name="header_fecha__fecha"
                id="header_fecha__fecha"
                required
                className={INPUT}
              />
            </Field>

            <Field label="Tiempo de Inspección (Hrs)" htmlFor="tiem_ins">
              <input
                type="text"
                name="tiem_ins"
                id="tiem_ins"
                placeholder="HH:MM"
                pattern="^\d{1,3}:\d{2}$"
                title="el patron es: 'Horas:Minutos'"
                maxLength={6}
                required
                className={INPUT}
              />
            </Field>

            <Field label="CODIGO Nº:" htmlFor="cod_n">
              <input
                type="text"
                name="cod_n"
                id="cod_n"
                ref={codRef}
                pattern="\d{6}"
                required
                readOnly
                className={INPUT}
              />
              <button
                type="button"
                onClick={handleCrearRegistro}
                disabled={creating || Boolean(inspeccionId)}
                className={`${BTN_SMALL} mt-1 disabled:opacity-50`}
              >
                {creating
                  ? "Creando…"
                  : inspeccionId
                    ? "Registro creado"
                    : "Nuevo registro"}
              </button>
              {saveMessage && (
                <p
                  className={`mt-1 text-[10px] ${
                    saveMessage.tipo === "error"
                      ? "text-red-600"
                      : "text-green-700"
                  }`}
                >
                  {saveMessage.texto}
                </p>
              )}
            </Field>
          </FormRow>


            <Field label="FICHA Nº:" htmlFor="ficha_n">

              <div className="flex">
                <select
                  id="filter-cuenca"
                  className={SELECT}
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

                <select
                  id="filter-sub-cuenca"
                  className={SELECT}
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

                <select
                  id="filter-parroquia"
                  className={SELECT}
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

              <input
                type="text"
                name="ficha_n"
                id="ficha_n"
                ref={fichaRef}
                onChange={handleFichaChange}
                readOnly={!fichaEditable}
                pattern="\d{2}-\d{2}-\d{2}-\w{3}-\d{2}"
                placeholder="00-00-00-ABC-00"
                title="Patron esperado: '00-00-00-ABC-00'"
                maxLength={15}
                autoComplete="off"
                list=""
                autoFocus
                required
                className={INPUT}
              />

              {fichaEditable && (
                <p className="text-[10px] text-slate-500">
                  Solo puede editar los últimos 2 dígitos.
                </p>
              )}
            </Field>

          <SectionTitle>Ubicación Espacial y Georreferenciación</SectionTitle>
          <FormRow>
            <Field label="Coordenadas UTM: Este (E)" htmlFor="coor_utm__e">
              <input
                type="text"
                name="coor_utm__e"
                id="coor_utm__e"
                ref={eastRef}
                pattern="^\d{6}.\d{1,2}$"
                placeholder="000006.12"
                title="Patron esperado: 123456.12"
                maxLength={9}
                required
                className={INPUT}
              />
            </Field>

            <Field label="Coordenadas UTM: Norte (N)" htmlFor="coor_utm__n">
              <input
                type="text"
                name="coor_utm__n"
                id="coor_utm__n"
                ref={northRef}
                pattern="^\d{7}.\d{1,2}$"
                placeholder="0000007.12"
                title="Patron esperado: 1234567.12"
                maxLength={10}
                required
                className={INPUT}
              />
            </Field>

            <div className={FORM_GROUP}>
              <label
                htmlFor="map-btn"
                id="label-map-btn"
                className="map-img-label"
                onClick={handleMapOpen}
              >
                <img
                  src={mapLocationIcon}
                  alt="abrir mapa"
                  id="label-map-img"
                  className="map-img"
                />
              </label>
              {/* El marcado original dispara #map-btn desde la etiqueta de imagen. */}
              <input
                type="button"
                value="abrir mapa"
                id="map-btn"
                className="hidden"
                onClick={handleMapOpen}
              />
            </div>

            <Field label="Huso SIG" htmlFor="header_codigo__huso">
              <input
                type="number"
                name="header_codigo__huso"
                id="header_codigo__huso"
                defaultValue={19}
                tabIndex={-1}
                required
                readOnly
                className={INPUT}
              />
            </Field>

            <Field label="Altura (M.S.N.M.)" htmlFor="header_codigo__altura">
              <input
                type="text"
                name="header_codigo__altura"
                id="header_codigo__altura"
                pattern="\d{1,4}(,\d{2})?"
                maxLength={7}
                required
                className={INPUT}
              />
            </Field>
          </FormRow>

          <SectionTitle>Datos del Personal Técnico Evaluador</SectionTitle>
          <FormRow>
            <Field label="Técnico Evaluador 1 (Nombre Completo)" htmlFor="id_tec__nom_ape_1">
              <input
                type="text"
                name="id_tec__nom_ape_1"
                id="id_tec__nom_ape_1"
                required
                className={INPUT}
              />
            </Field>

            <Field label="Teléfono Contacto" htmlFor="id_tec__tlf_1">
              <input
                type="tel"
                name="id_tec__tlf_1"
                id="id_tec__tlf_1"
                placeholder="0000-0000000"
                pattern="^\d{4}-\d{7}$"
                maxLength={12}
                required
                className={INPUT}
              />
            </Field>

            <Field label="Técnico Evaluador 2 (Nombre Completo)" htmlFor="id_tec__nom_ape_2">
              <input
                type="text"
                name="id_tec__nom_ape_2"
                id="id_tec__nom_ape_2"
                className={INPUT}
              />
            </Field>

            <Field label="Teléfono Contacto 2" htmlFor="id_tec__tlf_2">
              <input
                type="tel"
                name="id_tec__tlf_2"
                id="id_tec__tlf_2"
                placeholder="0000-0000000"
                pattern="^\d{4}-\d{7}$"
                maxLength={12}
                className={INPUT}
              />
            </Field>
          </FormRow>

          <SectionTitle>Datos Territoriales Base</SectionTitle>
          <FormRow>
            <Field label="Nombre de la Cuenca / Quebrada" htmlFor="datos_cuenta__nombre">
              <input
                type="text"
                name="datos_cuenta__nombre"
                id="datos_cuenta__nombre"
                required
                className={INPUT}
              />
            </Field>

            <Field label="Estado / Distrito" htmlFor="datos_cuenta__estado">
              <input
                type="text"
                name="datos_cuenta__estado"
                id="datos_cuenta__estado"
                defaultValue="Distrito Capital"
                required
                readOnly
                className={INPUT}
              />
            </Field>

            <Field label="Municipio" htmlFor="datos_cuenta__municipio">
              <input
                type="text"
                name="datos_cuenta__municipio"
                id="datos_cuenta__municipio"
                defaultValue={INSTITUTION.municipio}
                required
                readOnly
                className={INPUT}
              />
            </Field>
          </FormRow>

          <FormRow>
            <Field label="Parroquia" htmlFor="datos_cuenta__parroquia">
              <input
                type="text"
                name="datos_cuenta__parroquia"
                id="datos_cuenta__parroquia"
                list="parroquias"
                required
                className={INPUT}
              />
              <datalist id="parroquias">
                {PARROQUIAS.map((p) => (
                  <option key={p} value={p} />
                ))}
              </datalist>
            </Field>

            <Field label="Centro Poblado / Comunidad" htmlFor="datos_cuenta__cent_pobl">
              <input
                type="text"
                name="datos_cuenta__cent_pobl"
                id="datos_cuenta__cent_pobl"
                required
                className={INPUT}
              />
            </Field>
          </FormRow>
        </div>

        {/* ================= 2. ENTORNO ================= */}
        <div id="view-s-entorno" ref={setViewRef} className="siroh-view">
          <SectionTitle>Entorno Físico y Variación del Flujo</SectionTitle>

          <SubTitle>Covertura Vegetal</SubTitle>
          <CbGrid>
            {COBERTURA_VEGETAL.map((o) => (
              <CheckItem key={o.id} {...o} />
            ))}
            <Field label="ALTURA PROMEDIO" htmlFor="ent_fisi__alt_pro">
              <input
                type="text"
                name="ent_fisi__alt_pro"
                id="ent_fisi__alt_pro"
                maxLength={2}
                pattern="[0-9]{1,2}"
                inputMode="numeric"
                className={INPUT}
              />
            </Field>
          </CbGrid>

          <SubTitle>Factores Contaminantes</SubTitle>
          <CbGrid>
            {FACTORES_CONTAMINANTES.map((o) => (
              <CheckItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SubTitle>Usos del Suelo en Cercanías de la Obra</SubTitle>
          <CbGrid>
            {USOS_SUELO.map((o) => (
              <CheckItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SubTitle>Variacion</SubTitle>
          <CbGrid>
            {VARIACION.map((o) => (
              <RadioItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SubTitle>Retiro del Cuerpo de Agua</SubTitle>
          <CbGrid>
            {RETIRO_CUERPO_AGUA.map((o) => (
              <RadioItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SubTitle>Alteraciones en el Cause</SubTitle>
          <CbGrid>
            {ALTERACIONES_CAUSE.map((o) => (
              <CheckItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SubTitle>Presencia de Viviendas</SubTitle>
          <CbGrid>
            {VIVIENDAS.map((o) => (
              <CheckItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SubTitle>Observaciones</SubTitle>
          <FormRow>
            <Field>
              <textarea
                className={TEXTAREA}
                name="ent_fisi__obsevaciones"
                id="ent_fisi__obsevaciones"
                wrap="soft"
              />
            </Field>
          </FormRow>
        </div>

        {/* ================= 3. TIPO Y DETALLES DE OBRA ================= */}
        <div id="view-s-tipo" ref={setViewRef} className="siroh-view">
          <SectionTitle>Tipología Estructural de la Obra Hidráulica</SectionTitle>

          <SubTitle>Tipologia de la Obra</SubTitle>
          <FormRow>
            <Field label="NOMBRE:" htmlFor="tipo_obra__nombre">
              <input
                type="text"
                name="tipo_obra__nombre"
                id="tipo_obra__nombre"
                className={INPUT}
              />
            </Field>

            <Field label="TIEMPO DE CONTRUCCION:" htmlFor="tipo_obra__tiempo">
              <input
                type="text"
                name="tipo_obra__tiempo"
                id="tipo_obra__tiempo"
                maxLength={2}
                className={INPUT}
              />
            </Field>

            <Field label="Formato" htmlFor="tipo_obra__tiempo_formato">
              <select
                name="tipo_obra__tiempo_formato"
                id="tipo_obra__tiempo_formato"
                defaultValue="NULL"
                className={SELECT}
              >
                <option value="NULL"></option>
                <option value="Años">Años</option>
                <option value="Meses">Meses</option>
              </select>
            </Field>
          </FormRow>

          <SubTitle>Condicion Actual de la Obra</SubTitle>
          <CbGrid>
            {CONDICION_ACTUAL.map((o) => (
              <RadioItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SubTitle>Elementos de Contruccion</SubTitle>
          <CbGrid>
            {ELEMENTOS_CONSTRUCCION.map((o) => (
              <CheckItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SubTitle>Clasificacion</SubTitle>
          <CbGrid>
            {CLASIFICACION.map((o) => (
              <CheckItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SubTitle>Funcion</SubTitle>
          <CbGrid>
            {FUNCION.map((o) => (
              <CheckItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SubTitle>Dimenciones de Rocas de Prestamo</SubTitle>
          <Field label="DIMENCIONES DE ROCAS DE PRESTAMO" htmlFor="tipo_obra__drp">
            <input
              type="text"
              name="tipo_obra__drp"
              id="tipo_obra__drp"
              maxLength={5}
              placeholder="00,00"
              className={INPUT}
            />
          </Field>

          <SubTitle>Otros Materiales Constructivos</SubTitle>
          <Field label="OTROS MATERIALES CONTRUCTIVOS" htmlFor="tipo_obra__omc">
            <input
              type="text"
              name="tipo_obra__omc"
              id="tipo_obra__omc"
              className={INPUT}
            />
          </Field>

          <SubTitle>Observaciones</SubTitle>
          <Field>
            <textarea
              className={TEXTAREA}
              name="tipo_obra__observaciones"
              id="tipo_obra__observaciones"
              wrap="soft"
            />
          </Field>
        </div>

        {/* ================= 4. CARACTERISTICAS DE LA OBRA ================= */}
        <div id="view-s-Caracteristicas" ref={setViewRef} className="siroh-view">
          <SectionTitle>Caracteristicas de la Obra</SectionTitle>

          <SubTitle>Diseño de Dique</SubTitle>
          <CbGrid>
            {DISENO_DIQUE.map((o) => (
              <RadioItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SubTitle>Tipo de Dique</SubTitle>
          <CbGrid>
            {TIPO_DIQUE.map((o) => (
              <RadioItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SubTitle>Tipo de Muro</SubTitle>
          <CbGrid>
            {TIPO_MURO.map((o) => (
              <RadioItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SubTitle>Observaciones</SubTitle>
          <Field>
            <textarea
              className={TEXTAREA}
              name="carac_obra__observaciones"
              id="carac_obra__observaciones"
              wrap="soft"
            />
          </Field>

          <SubTitle>Tipo de Descanso</SubTitle>
          <CbGrid>
            {TIPO_DESCANSO.map((o) => (
              <RadioItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SubTitle>Vertederos</SubTitle>
          <CbGrid>
            {VERTEDEROS.map((o) => (
              <RadioItem key={o.id} {...o} labelFirst={o.id === "carac_obra__simple"} />
            ))}
          </CbGrid>

          <SubTitle>Estructuras Auxiliares</SubTitle>
          <CbGrid>
            {ESTRUCTURAS_AUXILIARES.map((o) => (
              <Field key={o.id} label={o.label} htmlFor={o.id}>
                <input
                  type="text"
                  name={o.name}
                  id={o.id}
                  maxLength={2}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  className={INPUT}
                />
              </Field>
            ))}
          </CbGrid>

          <SubTitle>Canales</SubTitle>
          <CbGrid>
            {CANALES.map((o) => (
              <ImgCheckItem key={o.id} {...o} src={IMG[o.img]} />
            ))}
          </CbGrid>

          <SubTitle>Otros diseños de canales:</SubTitle>
          <FormRow>
            <Field>
              <input
                type="text"
                name="carac_obra__otros_canales"
                id="carac_obra__otros_canales"
                className={INPUT}
              />
            </Field>
          </FormRow>

          <SubTitle>Diques Cerrados</SubTitle>
          <CbGrid>
            {DIQUES_CERRADOS.map((o) => (
              <ImgCheckItem key={o.id} {...o} src={IMG[o.img]} />
            ))}
          </CbGrid>

          <SubTitle>Diques Abiertos</SubTitle>
          <CbGrid>
            {DIQUES_ABIERTOS.map((o) => (
              <ImgCheckItem key={o.id} {...o} src={IMG[o.img]} />
            ))}
          </CbGrid>

          <SubTitle>Medidas</SubTitle>
          <FormRow>
            {MEDIDAS.map((o) => (
              <Field key={o.id} label={o.label} htmlFor={o.id}>
                <input
                  type="text"
                  name={o.name}
                  id={o.id}
                  inputMode="numeric"
                  pattern={o.pattern}
                  maxLength={o.maxLength}
                  placeholder={o.placeholder}
                  className={INPUT}
                />
              </Field>
            ))}
          </FormRow>
        </div>

        {/* ================= 5. DANOS ESTRUCTURALES ================= */}
        <div id="view-s-danos" ref={setViewRef} className="siroh-view">
          <SectionTitle>Daños Estructurares</SectionTitle>
          <CbGrid>
            {DANOS_ESTRUCTURALES.map((o) => (
              <CheckItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SectionTitle>Daños Visibles</SectionTitle>
          <CbGrid>
            {DANOS_VISIBLES.map((o) => (
              <CheckItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SectionTitle>Daños Funcionales</SectionTitle>
          <CbGrid>
            {DANOS_FUNCIONALES.map((o) => (
              <CheckItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SectionTitle>Daños en el Concreto</SectionTitle>
          <CbGrid>
            {DANOS_CONCRETO.map((o) => (
              <CheckItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SectionTitle>Daños en el Acero</SectionTitle>
          <CbGrid>
            {DANOS_ACERO.map((o) => (
              <CheckItem key={o.id} {...o} />
            ))}
          </CbGrid>
        </div>

        {/* ================= 6. METODOLOGIA APLICADA ================= */}
        <div id="view-s-metodologia" ref={setViewRef} className="siroh-view">
          <SectionTitle>Metodologias Aplicadas</SectionTitle>

          <SubTitle>Boceto de la Obra y Niveles de Colmatacion</SubTitle>

          <SubTitle>Prueba del Mortero</SubTitle>
          <CbGrid>
            {MORTEROS.map((o) => (
              <ImgRadioItem key={o.id} {...o} src={IMG[o.img]} />
            ))}
          </CbGrid>

          <SubTitle>Niveles de Colmatacion</SubTitle>
          <CbGrid>
            {NIVELES_COLMATAcion.map((o) => (
              <RadioItem key={o.id} {...o} />
            ))}
          </CbGrid>

          <SubTitle>Observaciones</SubTitle>
          <Field>
            <textarea
              className={TEXTAREA}
              name="meto_apli__observaciones"
              id="meto_apli__observaciones"
              wrap="soft"
            />
          </Field>
        </div>

        {/* ================= 7. ORGANIZACIONES PARTICIPANTES ================= */}
        <div id="view-s-organizaciones" ref={setViewRef} className="siroh-view">
          <SectionTitle>Organizaciones Participantes</SectionTitle>

          {ORGANIZACIONES.map(({ n, required }) => (
            <FormRow key={n}>
              <Field label="Nombre y Apellido" htmlFor={`org_parti__nom_ape_${n}`}>
                <input
                  type="text"
                  name={`org_parti__nom_ape_${n}`}
                  id={`org_parti__nom_ape_${n}`}
                  required={required}
                  className={INPUT}
                />
              </Field>

              <Field label="Institucion" htmlFor={`org_parti__insti_${n}`}>
                <input
                  type="text"
                  name={`org_parti__insti_${n}`}
                  id={`org_parti__insti_${n}`}
                  required={required}
                  className={INPUT}
                />
              </Field>

              <Field label="Telefono" htmlFor={`org_parti__tlf_${n}`}>
                <input
                  type="tel"
                  name={`org_parti__tlf_${n}`}
                  id={`org_parti__tlf_${n}`}
                  placeholder="0000-0000000"
                  maxLength={12}
                  required={required}
                  className={INPUT}
                />
              </Field>
            </FormRow>
          ))}

          <button
            type="submit"
            className={`${BTN_SUCCESS_BLOCK} disabled:opacity-60`}
            disabled={submitting || !inspeccionId}
          >
            {submitting
              ? "Guardando…"
              : "💾 Registrar Inspección Completa en Base de Datos SIROH"}
          </button>
          {saveMessage && (
            <p
              className={`mt-2 text-center text-xs ${
                saveMessage.tipo === "error"
                  ? "text-red-600"
                  : "text-green-700"
              }`}
            >
              {saveMessage.texto}
            </p>
          )}
        </div>
      </form>

      {mapOpen && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-2000 flex items-center justify-center bg-slate-950/70 text-sm text-white">
              Cargando mapa…
            </div>
          }
        >
          <CoordinateMapModal
            onClose={handleMapClose}
            onSelect={handleMapSelect}
            initialE={mapInitial.e}
            initialN={mapInitial.n}
          />
        </Suspense>
      )}
    </div>
  );
};

export default SirohForm;
