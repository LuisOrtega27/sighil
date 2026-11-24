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
