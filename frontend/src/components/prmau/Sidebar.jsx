import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
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
} from "../siroh/styles";

const FORM_LINKS = [
  { key: "vulnerabilidad", label: "📋 Vulnerabilidad Física" },
  { key: "socioeconomico", label: "🏘️ Socioeconómico" },
];

const Sidebar = ({ form, setForm, onLogout }) => {
  const { role } = useAuth();
  void role;

  const linkCls = (key) =>
    `${NAV_LINK_BASE} ${NAV_LINK_HOVER} ${form === key ? NAV_LINK_ACTIVE : ""}`;

  return (
    <aside className={SIDEBAR}>
      <div className="text-center">
        <div className={BRAND_LOGO_BOX}>
          <img src={INSTITUTION.logo} alt={`Logo ${INSTITUTION.alcaldia}`} className={BRAND_LOGO} />
        </div>
        <h2 className={BRAND_TITLE}>PRMAU</h2>
        <p className={BRAND_SUB}>Programa de Microzonificación y Asentamientos Urbanos</p>

        <ul id="prmau-menu" className={NAV_MENU}>
          {FORM_LINKS.map(({ key, label }) => (
            <li key={key}>
              <a onClick={() => setForm(key)} className={linkCls(key)}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <Link to="/" className={`${NAV_LINK_BASE} ${NAV_LINK_HOVER}`}>
              ↩️ Volver al inicio
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={onLogout}
              className={`${NAV_LINK_BASE} ${NAV_LINK_HOVER} w-full text-left`}
            >
              ⎋ Cerrar sesión
            </button>
          </li>
        </ul>
      </div>

      <div className={SIDEBAR_FOOTER}>
        {INSTITUTION.alcaldiaMunicipio}
        <br />
        {INSTITUTION.gestion}
        <br />
        <b>{INSTITUTION.entorno}</b>
      </div>
    </aside>
  );
};

export default Sidebar;
