/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/TopNavbar.jsx
   Barra superior con titulo de pagina y cierre de sesion
   (antes: .top-navbar de siroh.html).
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Nota: el original dejaba el titulo en duro ("Geoportal Hídrico Municipal")
   aunque la pagina activa fuera "territorial". Aquí el titulo depende de la
   pagina activa; el texto del geoportal se conserva tal cual. */

import { LOGOUT_BTN, TOP_DESC, TOP_NAVBAR, TOP_TITLE, USER_BADGE } from "./styles";

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
    <div className={TOP_NAVBAR}>
      <div>
        <h1 className={TOP_TITLE}>{meta.title}</h1>
        <p className={TOP_DESC}>{meta.desc}</p>
      </div>

      <div className="login-nav">
        <button type="button" onClick={onLogout} className={LOGOUT_BTN}>
          cerrar sesion
        </button>
        <div className={USER_BADGE}>IMGRAD: Sala Técnica de Control</div>
      </div>
    </div>
  );
};

export default TopNavbar;
