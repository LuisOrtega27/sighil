/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   Siroh.jsx
   Pagina principal del entorno SIROH (antes: siroh.html).
   Orquestador: estado de navegacion + layout sidebar / topbar / secciones.

   Notas de migracion:
   - switchPage() / toggleMeteorologiaMenu() / switchMeteorologiaSubPage()
     del original se resuelven con useState aqui en el orquestador.
   - Las secciones se mantienen SIEMPRE montadas y se alternan con
     "hidden" (display:none) para conservar el estado de los formularios,
     igual que el original; la activa recibe "page-active" (fadeIn).
   - El JS original del HTML (js/base.js, js/components/*, js/services/*,
     js/helpers/*) NO existe en el repo: sus acciones estan
     re-implementadas o marcadas con TODO en cada componente.
   - siroh.html se conserva en esta carpeta como referencia. */

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { canAccess, SIROH_SECTION_ACCESS } from "../auth/permissions";
import "../components/siroh/siroh.css";
import Sidebar from "../components/siroh/Sidebar";
import TopNavbar from "../components/siroh/TopNavbar";
import Territorial from "../components/siroh/Territorial";
import Geoportal from "../components/siroh/Geoportal";
import SirohForm from "../components/siroh/SirohForm";
import Meteorologia from "../components/siroh/Meteorologia";
import Hidrologia from "../components/siroh/Hidrologia";
import Morfometria from "../components/siroh/Morfometria";
import { MAIN } from "../components/siroh/styles";

export const Siroh = () => {
  const { signOut, role } = useAuth();
  /* El visitante arranca directamente en el unico modulo que puede ver. */
  const [page, setPage] = useState(() =>
    canAccess(SIROH_SECTION_ACCESS.territorial, role) ? "territorial" : "geoportal"
  );
  const [metMenuOpen, setMetMenuOpen] = useState(false);
  const [metSub, setMetSub] = useState("estaciones");
  const navigate = useNavigate();

  /* Cambia la subvista de meteorologia y activa su pagina
     (switchMeteorologiaSubPage del original). */
  const handleMetSub = (key) => {
    setMetSub(key);
    setPage("meteorologia");
  };

  /* La pagina activa obtiene "page-active" (animacion fadeIn); el resto, hidden.
     Las secciones no permitidas por el rol tambien quedan hidden (sin desmontar). */
  const sectionCls = (key) => {
    if(!canAccess(SIROH_SECTION_ACCESS[key], role)) return "hidden"
    return page === key ? "page-active" : "hidden"
  };

  const handleLogout = async () => {
    await signOut()
    navigate("/login", { replace: true })
  }

  return (
    <div className="siroh-root flex min-h-screen bg-page text-ink">
      <Sidebar
        page={page}
        setPage={setPage}
        metMenuOpen={metMenuOpen}
        onToggleMetMenu={() => setMetMenuOpen((open) => !open)}
        metSub={metSub}
        onMetSub={handleMetSub}
        onLogout={handleLogout}
      />

      <main className={MAIN}>
        <div className="flex justify-start px-5 pt-3">
          <Link
            to="/"
            id="siroh-back-home"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <FaArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        <TopNavbar page={page} onLogout={handleLogout} />

        <div id="page-territorial" className={sectionCls("territorial")}>
          <Territorial />
        </div>

        <div id="page-geoportal" className={sectionCls("geoportal")}>
          <Geoportal />
        </div>

        <div id="page-siroh" className={sectionCls("siroh")}>
          <SirohForm />
        </div>

        <div id="page-meteorologia" className={sectionCls("meteorologia")}>
          <Meteorologia sub={metSub} />
        </div>

        <div id="page-hidrologia" className={sectionCls("hidrologia")}>
          <Hidrologia />
        </div>

        <div id="page-morfometria" className={sectionCls("morfometria")}>
          <Morfometria />
        </div>
      </main>
    </div>
  );
};
