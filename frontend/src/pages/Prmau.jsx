/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   Prmau.jsx
   Pagina principal del modulo PRMAU
   (Programa de Microzonificacion y Asentamientos Urbanos).

   Orquestador: estado de navegacion + layout sidebar / topbar / formularios.

   Notas:
   - Los formularios se mantienen SIEMPRE montados y se alternan con
     "hidden" para conservar su estado (cascadas de catalogo, codigo
     catastral, etc.), igual que las secciones en Siroh.jsx.
   - Sin backend disponible: los submits usan e.preventDefault() y quedan
     marcados con TODO(backend) en los componentes de formulario.
   - socio economico2.html se conserva en components/prmau como referencia. */

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import "../prmau.css";
import "../components/siroh/siroh.css";
import Sidebar from "../components/prmau/Sidebar";
import TopNavbar from "../components/prmau/TopNavbar";
import { FormVulne } from "../components/prmau/FormVulne";
import { FormSocio } from "../components/prmau/FormSocio";
import { MAIN } from "../components/siroh/styles";

export const Prmau = () => {
  const [form, setForm] = useState("vulnerabilidad");
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const sectionCls = (key) => (form === key ? "page-active" : "hidden");

  const handleLogout = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="siroh-root flex min-h-screen bg-page text-ink">
      <Sidebar form={form} setForm={setForm} onLogout={handleLogout} />

      <main className={MAIN}>
        <div className="flex justify-start px-5 pt-3">
          <Link
            to="/"
            id="prmau-back-home"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <FaArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        <TopNavbar form={form} onLogout={handleLogout} />

        <div id="form-vulnerabilidad" className={sectionCls("vulnerabilidad")}>
          <FormVulne />
        </div>

        <div id="form-socioeconomico" className={sectionCls("socioeconomico")}>
          <FormSocio />
        </div>
      </main>
    </div>
  );
};
