import { LOGOUT_BTN, TOP_DESC, TOP_NAVBAR, TOP_TITLE, USER_BADGE } from "../siroh/styles";
import { INSTITUTION } from "../../config/institution";

const FORM_META = {
  vulnerabilidad: {
    title: "Vulnerabilidad Física",
    desc: "Registro de vulnerabilidad física (IMGRAD).",
  },
  socioeconomico: {
    title: "Registro Socioeconómico",
    desc: "Levantamiento socioeconómico de ocupantes e inmueble.",
  },
};

const TopNavbar = ({ form, onLogout }) => {
  const meta = FORM_META[form] ?? FORM_META.vulnerabilidad;

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
        <div className={USER_BADGE}>{INSTITUTION.sala}</div>
      </div>
    </div>
  );
};

export default TopNavbar;
