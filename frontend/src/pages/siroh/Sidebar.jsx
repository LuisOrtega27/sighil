/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   siroh/Sidebar.jsx
   Panel lateral de navegacion (antes: .sidebar de siroh.html).
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Notas de migracion:
   - El submenu de SIROH (#sub-for-list) se desplegaba via CSS puro cuando
     #link-siroh.active ("#link-siroh.active + #sub-for-list"), aqui se
     replica con la clase .is-open segun la pagina activa.
   - toggleMeteorologiaMenu() del original no existia su JS
     (js/components/mainNav.js no esta en el repo); aqui alterna el estado
     y ademas activa la pagina Meteorologia para que la navegacion sea util.
   - Los sub-links "Nuevo / Ver / Otro" del SIROH no tenian accion en el
     HTML original: quedan marcados con TODO. */

import logo from "../../assets/imgs/logos/LOGO ALCALDIA NUEVO.fw.png";
import {
  BRAND_LOGO,
  BRAND_LOGO_BOX,
  BRAND_SUB,
  BRAND_TITLE,
  NAV_LINK_ACTIVE,
  NAV_LINK_BASE,
  NAV_LINK_HOVER,
  NAV_MENU,
  SIDEBAR,
  SIDEBAR_FOOTER,
  SUBMENU_MET,
  SUBMENU_MET_HOVER,
  SUBMENU_MET_ITEM,
  SUBMENU_SIROH,
  SUBMENU_SIROH_ITEM,
} from "./styles";
import { MET_SUB_LINKS, SIROH_SUB_LINKS } from "./options";

const Sidebar = ({ page, setPage, metMenuOpen, onToggleMetMenu, metSub, onMetSub }) => {
  const linkCls = (key) =>
    `${NAV_LINK_BASE} ${NAV_LINK_HOVER} ${page === key ? NAV_LINK_ACTIVE : ""}`;

  const metItemCls = (key) =>
    `${SUBMENU_MET_ITEM} ${SUBMENU_MET_HOVER} ${
      metSub === key ? "border-l-secondary bg-white/10 text-white" : ""
    }`;

  return (
    <aside className={SIDEBAR}>
      <div className="text-center">
        {/* brand-area */}
        <div className={BRAND_LOGO_BOX}>
          <img src={logo} alt="Logo Alcaldía Municipio Libertador" className={BRAND_LOGO} />
        </div>
        <h2 className={BRAND_TITLE}>SIGHIL</h2>
        <p className={BRAND_SUB}>Infraestructura Geográfica e Hidrológica</p>

        <ul id="main-menu" className={NAV_MENU}>
          <li>
            <a onClick={() => setPage("territorial")} id="link-territorial" className={linkCls("territorial")}>
              &times; Gestion territorial
            </a>
          </li>
          <li>
            <a onClick={() => setPage("geoportal")} id="link-geoportal" className={linkCls("geoportal")}>
              🌐 Geoportal Hídrico
            </a>
          </li>
          <li>
            <a onClick={() => setPage("siroh")} id="link-siroh" className={linkCls("siroh")}>
              📋 SIROH (Obras)
            </a>
            <ul id="sub-for-list" className={`${SUBMENU_SIROH} ${page === "siroh" ? "is-open" : ""}`}>
              {SIROH_SUB_LINKS.map((label) => (
                <li key={label}>
                  {/* TODO(mainNav): sin accion en el HTML original
                      (js/components/mainNav.js no existe en el repo). */}
                  <a id={`sub-link-${label.toLowerCase()}`} className={SUBMENU_SIROH_ITEM}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <a onClick={onToggleMetMenu} id="link-meteorologia" className={linkCls("meteorologia")}>
              🌧️ Meteorología Municipal
            </a>
            <ul id="sub-met-list" className={`${SUBMENU_MET} ${metMenuOpen ? "" : "hidden"}`}>
              {MET_SUB_LINKS.map(({ key, label }) => (
                <li key={key}>
                  <a
                    onClick={() => onMetSub(key)}
                    id={`sublink-${key}`}
                    className={metItemCls(key)}
                  >
                    ▪️ {label}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <a onClick={() => setPage("hidrologia")} id="link-hidrologia" className={linkCls("hidrologia")}>
              💧 Hidrología Municipal
            </a>
          </li>
          <li>
            <a onClick={() => setPage("morfometria")} id="link-morfometria" className={linkCls("morfometria")}>
              📐 Morfometría Municipal
            </a>
          </li>
        </ul>
      </div>

      <div className={SIDEBAR_FOOTER}>
        Alcaldía del Municipio Libertador<br />
        IMGRAD • Gestión de Riesgos<br />
        <b>Entorno Operativo v2.6</b>
      </div>
    </aside>
  );
};

export default Sidebar;
