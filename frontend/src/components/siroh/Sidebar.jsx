import { Link } from "react-router-dom";

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
   - El submenu #sub-for-list se reemplazo por "Editar ficha" (boton sin
     accion por ahora) y "Ficha original" (Link a /siroh-raw-Form).
   - Los enlaces se ocultan segun el rol del usuario (matriz en auth/permissions). */

import { useAuth } from "../../context/auth";
import { canAccess, SIROH_SECTION_ACCESS } from "../../auth/permissions";
import { INSTITUTION } from "../../config/institution";
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
import { MET_SUB_LINKS } from "./options";

const Sidebar = ({ page, setPage, metMenuOpen, onToggleMetMenu, metSub, onMetSub }) => {
  const { role } = useAuth();
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
          <img src={INSTITUTION.logo} alt={`Logo ${INSTITUTION.alcaldia}`} className={BRAND_LOGO} />
        </div>
        <h2 className={BRAND_TITLE}>{INSTITUTION.sigla}</h2>
        <p className={BRAND_SUB}>{INSTITUTION.tagline}</p>

        <ul id="main-menu" className={NAV_MENU}>
          {canAccess(SIROH_SECTION_ACCESS.territorial, role) && (
            <li>
              <a onClick={() => setPage("territorial")} id="link-territorial" className={linkCls("territorial")}>
                &times; Gestion territorial
              </a>
            </li>
          )}
          {canAccess(SIROH_SECTION_ACCESS.geoportal, role) && (
            <li>
              <a onClick={() => setPage("geoportal")} id="link-geoportal" className={linkCls("geoportal")}>
                🌐 Geoportal Hídrico
              </a>
            </li>
          )}
          {canAccess(SIROH_SECTION_ACCESS.siroh, role) && (
            <li>
              <a onClick={() => setPage("siroh")} id="link-siroh" className={linkCls("siroh")}>
                📋 SIROH (Obras)
              </a>
              <ul id="sub-for-list" className={`${SUBMENU_SIROH} ${page === "siroh" ? "is-open" : ""}`}>
                <li>
                  {/* Sin accion por ahora, se dejara como boton de edicion. */}
                  <button
                    type="button"
                    id="sub-link-editar-ficha"
                    className={`${SUBMENU_SIROH_ITEM} w-full bg-transparent text-left`}
                  >
                    Editar ficha
                  </button>
                </li>
                <li>
                  <Link
                    to="/siroh-raw-Form"
                    id="sub-link-ficha-original"
                    className={SUBMENU_SIROH_ITEM}
                  >
                    Ficha original
                  </Link>
                </li>
              </ul>
            </li>
          )}

          {canAccess(SIROH_SECTION_ACCESS.meteorologia, role) && (
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
          )}

          {canAccess(SIROH_SECTION_ACCESS.hidrologia, role) && (
            <li>
              <a onClick={() => setPage("hidrologia")} id="link-hidrologia" className={linkCls("hidrologia")}>
                💧 Hidrología Municipal
              </a>
            </li>
          )}
          {canAccess(SIROH_SECTION_ACCESS.morfometria, role) && (
            <li>
              <a onClick={() => setPage("morfometria")} id="link-morfometria" className={linkCls("morfometria")}>
                📐 Morfometría Municipal
              </a>
            </li>
          )}
        </ul>
      </div>

      <div className={SIDEBAR_FOOTER}>
        {INSTITUTION.alcaldiaMunicipio}<br />
        {INSTITUTION.gestion}<br />
        <b>{INSTITUTION.entorno}</b>
      </div>
    </aside>
  );
};

export default Sidebar;
