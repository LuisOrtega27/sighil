/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   Prmau.jsx
   Pagina principal del modulo PRMAU
   (Programa de Microzonificacion y Asentamientos Urbanos).

   Orquestador: items del sidebar + rutas de formularios + layout.

   Notas:
   - La navegacion usa rutas reales (/prmau/...): el formulario activo se
     renderiza con <Outlet/>. A diferencia de Siroh.jsx, aqui se desmonta al
     cambiar de seccion (decision explicita: ya no se conserva el estado de
     los formularios con "hidden").
   - Los items del menu se declaran aqui, en la pagina que llama al Sidebar.
   - Sin backend disponible: los submits usan e.preventDefault() y quedan
     marcados con TODO(backend) en los componentes de formulario.
   - socio economico2.html se conserva en components/prmau como referencia. */

import { FaArrowLeft } from "react-icons/fa6";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import "../prmau.css";
import "../components/siroh/siroh.css";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/prmau/TopNavbar";
import { FormVulne } from "../components/prmau/FormVulne";
import { FormSocio } from "../components/prmau/FormSocio";

/* Configuracion estatica del menu (no un componente), consumida tambien
   por App.jsx para la redireccion inicial. */
// eslint-disable-next-line react-refresh/only-export-components
export const PRMAU_ITEMS = [
  { key: "vulnerabilidad", label: "📋 Vulnerabilidad Física", to: "/prmau/vulnerabilidad" },
  { key: "socioeconomico", label: "🏘️ Socioeconómico", to: "/prmau/socioeconomico" },
];

const SectionPage = ({ id, children }) => (
  <div id={id} className="page-active">
    {children}
  </div>
);

// eslint-disable-next-line react-refresh/only-export-components
export const PRMAU_SECTION_ROUTES = [
  {
    key: "vulnerabilidad",
    path: "vulnerabilidad",
    element: (
      <SectionPage id="form-vulnerabilidad">
        <FormVulne />
      </SectionPage>
    ),
  },
  {
    key: "socioeconomico",
    path: "socioeconomico",
    element: (
      <SectionPage id="form-socioeconomico">
        <FormSocio />
      </SectionPage>
    ),
  },
];

export const Prmau = () => {
  const { pathname } = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const activeKey = pathname.split("/")[2] || "vulnerabilidad";

  const handleLogout = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="siroh-root flex min-h-screen bg-page text-ink">
      <Sidebar
        title="PRMAU"
        subtitle="Programa de Microzonificación y Asentamientos Urbanos"
        menuId="prmau-menu"
        items={PRMAU_ITEMS}
        onLogout={handleLogout}
      />

      <main className="ml-[290px] w-[calc(100%-290px)] p-4">
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

        <TopNavbar form={activeKey} onLogout={handleLogout} />

        <Outlet />
      </main>
    </div>
  );
};
