/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   TopNavbar.jsx
   Barra superior compartida por SIROH y PRMAU: titulo/descripcion de la
   seccion activa, cierre de sesion y sala institucional.

   Unifica los antiguos componentes duplicados:
   - siroh/TopNavbar.jsx (prop "page")
   - prmau/TopNavbar.jsx  (prop "form")
   El texto del geoportal se conserva tal cual estaba en el original.
   "fallback" permite mantener el meta por defecto de cada modulo
   (SIROH -> territorial, PRMAU -> vulnerabilidad).
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

import { FaArrowLeft, FaUser } from "react-icons/fa6";

import { Link } from "react-router-dom";
// import { INSTITUTION } from "../config/institution";


const SECTION_META = {
  // SIROH
  territorial: {
    title: "Gestión Territorial",
    desc: "Inventario y gestión de cuerpos de agua del municipio.",
  },
  geoportal: {
    title: "Geoportal Hídrico Municipal",
    desc: "Visor de mapas interactivo y mapas base (Capas SIG).",
  },
  siroh: {
    title: "SIROH (Obras Hidráulicas)",
    desc: "Sistema de Inspección y Registro de Obras Hidráulicas.",
  },
  meteorologia: {
    title: "Meteorología Municipal",
    desc: "Red pluviométrica, ingesta de lecturas y tablero de alerta temprana.",
  },
  hidrologia: {
    title: "Hidrología Municipal",
    desc: "Inventario y caracterización macro de cuencas.",
  },
  morfometria: {
    title: "Morfometría Municipal",
    desc: "Estudios de parámetros de forma y relieve.",
  },
  // PRMAU
  vulnerabilidad: {
    title: "Vulnerabilidad Física",
    desc: "Registro de vulnerabilidad física (IMGRAD).",
  },
  socioeconomico: {
    title: "Registro Socioeconómico",
    desc: "Levantamiento socioeconómico de ocupantes e inmueble.",
  },
  // Perfil
  perfil: {
    title: "Mi Perfil",
    desc: "Consulta y actualiza tus datos personales e institucionales.",
  },
};

const TopNavbar = ({ section, fallback = "territorial" }) => {
  const meta = SECTION_META[section] ?? SECTION_META[fallback] ?? SECTION_META.territorial;

  return (
    <div className="mb-6 flex items-center justify-between border-b border-line pb-4">

      <div>
        <Link
          to="/"
          id="siroh-back-home"
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <FaArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
      
      <div>
        <h1 className="text-2xl font-bold">{meta.title}</h1>
        <p className="mt-0.5 text-[12.5px] text-[#64748b]">{meta.desc}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* <div className="rounded bg-[#e2e8f0] px-3 py-1.5 text-[11px] font-bold text-primary">{INSTITUTION.sala}</div> */}
        <Link
          to="/perfil"
          id="topnav-profile"
          className="rounded-full border border-secondary bg-secondary px-4 py-4 text-xs text-white transition-opacity hover:opacity-90"
        >
          <FaUser className={`text-sm`}/>

        </Link>
      </div>
    </div>
  );
};

export default TopNavbar;
