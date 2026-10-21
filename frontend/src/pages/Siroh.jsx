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
import { useNavigate } from "react-router-dom";
import "./siroh/siroh.css";
import Sidebar from "./siroh/Sidebar";
import TopNavbar from "./siroh/TopNavbar";
import Territorial from "./siroh/Territorial";
import Geoportal from "./siroh/Geoportal";
import SirohForm from "./siroh/SirohForm";
import Meteorologia from "./siroh/Meteorologia";
import Hidrologia from "./siroh/Hidrologia";
import Morfometria from "./siroh/Morfometria";
import { MAIN } from "./siroh/styles";

export const Siroh = () => {
  const [page, setPage] = useState("territorial");
  const [metMenuOpen, setMetMenuOpen] = useState(false);
  const [metSub, setMetSub] = useState("estaciones");
  const navigate = useNavigate();

  /* Cambia la subvista de meteorologia y activa su pagina
     (switchMeteorologiaSubPage del original). */
  const handleMetSub = (key) => {
    setMetSub(key);
    setPage("meteorologia");
  };

  /* La pagina activa obtiene "page-active" (animacion fadeIn); el resto, hidden. */
  const sectionCls = (key) => (page === key ? "page-active" : "hidden");

  return (
    <div className="siroh-root flex min-h-screen bg-page text-ink">
      <Sidebar
        page={page}
        setPage={setPage}
        metMenuOpen={metMenuOpen}
        onToggleMetMenu={() => setMetMenuOpen((open) => !open)}
        metSub={metSub}
        onMetSub={handleMetSub}
      />

      <main className={MAIN}>
        <TopNavbar page={page} onLogout={() => navigate("/login")} />

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
