/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   Siroh.jsx
   Pagina principal del entorno SIROH (antes: siroh.html).
   Orquestador: items del sidebar + rutas de secciones + layout.

   Notas de migracion:
   - La navegacion ya no usa useState: cada item del sidebar apunta a una
     ruta real (/siroh/...) y la seccion activa se renderiza con <Outlet/>.
   - switchMeteorologiaSubPage() del original se resuelve con el query "?sub=".
   - Los items (ids, textos, permisos y submenus) se declaran aqui, en la
     pagina que llama al Sidebar; el componente Sidebar solo los renderiza.
   - El JS original del HTML (js/base.js, js/components/*, js/services/*,
     js/helpers/*) NO existe en el repo: sus acciones estan
     re-implementadas o marcadas con TODO en cada componente.
   - siroh.html se conserva en esta carpeta como referencia. */

import { lazy, Suspense, useCallback, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/auth";
import { canAccess, SIROH_SECTION_ACCESS } from "../auth/permissions";
import { INSTITUTION } from "../config/institution";
import "../components/siroh/siroh.css";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import Territorial from "../components/siroh/Territorial";
import Geoportal from "../components/siroh/Geoportal";
import SirohForm from "../components/siroh/SirohForm";
import Meteorologia from "../components/siroh/Meteorologia";
import Hidrologia from "../components/siroh/Hidrologia";
import Morfometria from "../components/siroh/Morfometria";
import { MET_SUB_LINKS } from "../components/siroh/options";

const EditFichaModal = lazy(() => import("../components/siroh/EditFichaModal"));
const ViewFichasModal = lazy(() => import("../components/siroh/ViewFichasModal"));

const MET_CHILDREN = MET_SUB_LINKS.map(({ key, label }) => ({
  key,
  id: `sublink-${key}`,
  label: `▪️ ${label}`,
  to: `/siroh/meteorologia?sub=${key}`,
  sub: key,
}));

/* Fuente de verdad del menu de SIROH: la consume el Sidebar y las guardas
   de ruta definidas en App.jsx. Es configuracion estatica, no un componente. */
// eslint-disable-next-line react-refresh/only-export-components
export const SIROH_ITEMS = [
  {
    key: "territorial",
    id: "link-territorial",
    label: "× Gestion territorial",
    to: "/siroh/territorial",
    access: SIROH_SECTION_ACCESS.territorial,
  },
  {
    key: "geoportal",
    id: "link-geoportal",
    label: "🌐 Geoportal Hídrico",
    to: "/siroh/geoportal",
    access: SIROH_SECTION_ACCESS.geoportal,
  },
  {
    key: "siroh",
    id: "link-siroh",
    label: "📋 SIROH (Obras)",
    to: "/siroh/siroh",
    access: SIROH_SECTION_ACCESS.siroh,
    submenu: "ficha",
    submenuId: "sub-for-list",
    children: [
      { id: "sub-link-ver-fichas", label: "Ver fichas", type: "button" },
      { id: "sub-link-editar-ficha", label: "Editar ficha", type: "button" },
      { id: "sub-link-ficha-original", label: "Ficha original", to: "/siroh-raw-Form" },
    ],
  },
  {
    key: "meteorologia",
    id: "link-meteorologia",
    label: "🌧️ Meteorología Municipal",
    to: "/siroh/meteorologia",
    access: SIROH_SECTION_ACCESS.meteorologia,
    submenu: "met",
    submenuId: "sub-met-list",
    children: MET_CHILDREN,
  },
  {
    key: "hidrologia",
    id: "link-hidrologia",
    label: "💧 Hidrología Municipal",
    to: "/siroh/hidrologia",
    access: SIROH_SECTION_ACCESS.hidrologia,
  },
  {
    key: "morfometria",
    id: "link-morfometria",
    label: "📐 Morfometría Municipal",
    to: "/siroh/morfometria",
    access: SIROH_SECTION_ACCESS.morfometria,
  },
];

const SectionPage = ({ id, children }) => (
  <div id={id} className="page-active">
    {children}
  </div>
);

/* La subvista de meteorologia viaja en la URL (?sub=...). Si falta o no es
   valida, se normaliza para que el sidebar marque "Estaciones" como activa. */
const MeteorologiaRoute = () => {
  const [searchParams] = useSearchParams();
  const requested = searchParams.get("sub");

  if (!MET_SUB_LINKS.some(({ key }) => key === requested)) {
    return <Navigate to="?sub=estaciones" replace />;
  }

  return <Meteorologia sub={requested} />;
};

/* Cada entrada se monta como ruta hija; App.jsx decide que renderiza segun
   la URL y aplica la guarda de permisos con el "access" de cada item. */
// eslint-disable-next-line react-refresh/only-export-components
export const SIROH_SECTION_ROUTES = [
  {
    key: "territorial",
    path: "territorial",
    access: SIROH_SECTION_ACCESS.territorial,
    element: (
      <SectionPage id="page-territorial">
        <Territorial />
      </SectionPage>
    ),
  },
  {
    key: "geoportal",
    path: "geoportal",
    access: SIROH_SECTION_ACCESS.geoportal,
    element: (
      <SectionPage id="page-geoportal">
        <Geoportal />
      </SectionPage>
    ),
  },
  {
    key: "siroh",
    path: "siroh",
    access: SIROH_SECTION_ACCESS.siroh,
    element: (
      <SectionPage id="page-siroh">
        <SirohForm />
      </SectionPage>
    ),
  },
  {
    key: "meteorologia",
    path: "meteorologia",
    access: SIROH_SECTION_ACCESS.meteorologia,
    element: (
      <SectionPage id="page-meteorologia">
        <MeteorologiaRoute />
      </SectionPage>
    ),
  },
  {
    key: "hidrologia",
    path: "hidrologia",
    access: SIROH_SECTION_ACCESS.hidrologia,
    element: (
      <SectionPage id="page-hidrologia">
        <Hidrologia />
      </SectionPage>
    ),
  },
  {
    key: "morfometria",
    path: "morfometria",
    access: SIROH_SECTION_ACCESS.morfometria,
    element: (
      <SectionPage id="page-morfometria">
        <Morfometria />
      </SectionPage>
    ),
  },
];

export const Siroh = () => {
  const { signOut, role } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [editFichaOpen, setEditFichaOpen] = useState(false);
  const [viewFichasOpen, setViewFichasOpen] = useState(false);

  const handleEditFichaClose = useCallback(() => setEditFichaOpen(false), []);
  const handleViewFichasClose = useCallback(() => setViewFichasOpen(false), []);
  /* "Editar ficha" y "Abrir" de "Ver fichas" comparten el flujo de carga. */
  const handleOpenFicha = useCallback((ficha) => {
    setEditFichaOpen(false);
    setViewFichasOpen(false);
    navigate(`/siroh/siroh?edit=${ficha.cod_n}`, { state: { ficha } });
  }, [navigate]);

  /* El submenu "Editar ficha" solo existe para quien puede escribir en SIROH.
     Se deriva del array exportado sin mutarlo. */
  const puedeEditarFicha = canAccess(SIROH_SECTION_ACCESS.siroh, role);
  const sidebarItems = SIROH_ITEMS.map((item) =>
    item.key !== "siroh"
      ? item
      : {
          ...item,
          children: item.children
            .filter(
              (child) =>
                child.id !== "sub-link-editar-ficha" || puedeEditarFicha
            )
            .map((child) => {
              if (child.id === "sub-link-editar-ficha") {
                return { ...child, onClick: () => setEditFichaOpen(true) };
              }
              if (child.id === "sub-link-ver-fichas") {
                return { ...child, onClick: () => setViewFichasOpen(true) };
              }
              return child;
            }),
        }
  );

  /* Mientras el index redirige, el titulo usa la primera seccion permitida. */
  const activeKey =
    pathname.split("/")[2] ||
    SIROH_ITEMS.find(({ access }) => canAccess(access, role))?.key ||
    "geoportal";

  const handleLogout = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="siroh-root flex min-h-screen bg-page text-ink">
      <Sidebar
        title={INSTITUTION.sigla}
        subtitle={INSTITUTION.tagline}
        menuId="main-menu"
        items={sidebarItems}
        onLogout={handleLogout}
      />

      <main className="ml-72 w-[calc(100%-290px)] p-4">

        <TopNavbar section={activeKey} onLogout={handleLogout} />

        <Outlet />
      </main>

      {editFichaOpen && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-2000 flex items-center justify-center bg-slate-950/70 text-sm text-white">
              Cargando modal…
            </div>
          }
        >
          <EditFichaModal
            onClose={handleEditFichaClose}
            onLoaded={handleOpenFicha}
          />
        </Suspense>
      )}

      {viewFichasOpen && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-2000 flex items-center justify-center bg-slate-950/70 text-sm text-white">
              Cargando modal…
            </div>
          }
        >
          <ViewFichasModal
            onClose={handleViewFichasClose}
            onOpen={handleOpenFicha}
          />
        </Suspense>
      )}
    </div>
  );
};
