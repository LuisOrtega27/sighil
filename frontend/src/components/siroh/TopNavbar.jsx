/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/TopNavbar.jsx
   Barra superior con titulo de pagina y cierre de sesion
   (antes: .top-navbar de siroh.html).
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Nota: el original dejaba el titulo en duro ("Geoportal Hídrico Municipal")
   aunque la pagina activa fuera "territorial". Aquí el titulo depende de la
   pagina activa; el texto del geoportal se conserva tal cual. */

import { INSTITUTION } from "../../config/institution";

const PAGE_META = {
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
};

const TopNavbar = ({ page, onLogout }) => {
  const meta = PAGE_META[page] ?? PAGE_META.territorial;

  return (
    <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
      <div>
        <h1 className="text-2xl font-bold">{meta.title}</h1>
        <p className="mt-0.5 text-[12.5px] text-[#64748b]">{meta.desc}</p>
      </div>

      <div className="login-nav">
        <button type="button" onClick={onLogout} className="rounded-[20px] border border-[#adadad] bg-[#f0f0f0] px-4 py-2.5 text-xs text-black transition-colors hover:bg-[#e4e4e4]">
          cerrar sesion
        </button>
        <div className="rounded bg-[#e2e8f0] px-3 py-1.5 text-[11px] font-bold text-primary">{INSTITUTION.sala}</div>
      </div>
    </div>
  );
};

export default TopNavbar;
