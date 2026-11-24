import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Siroh, SIROH_ITEMS, SIROH_SECTION_ROUTES } from "./pages/Siroh"
import { SirohRawForm } from "./pages/SirohRawForm"
import { Prmau, PRMAU_ITEMS, PRMAU_SECTION_ROUTES } from "./pages/Prmau"
import { AccessDenied } from "./pages/AccessDenied"
import { AuthProvider } from "./context/AuthContext"
import { useAuth } from "./context/auth"
import { ROUTE_ACCESS } from "./auth/permissions"
import { ModuleIndex, ProtectedRoute, SectionGuard } from "./ProtectedRoute"

function AppRoutes() {
  const {loading} = useAuth()

  if(loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300 text-sm">Verificando sesión…</div>

  return (
    <Routes>
      <Route path="/login" element={<Login/>}></Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<Home/>}></Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={ROUTE_ACCESS["/siroh"]}/>}>
        <Route path="/siroh" element={<Siroh/>}>
          <Route index element={<ModuleIndex items={SIROH_ITEMS} fallback="/siroh/geoportal"/>}/>
          {SIROH_SECTION_ROUTES.map(({ key, path, access, element }) => (
            <Route
              key={key}
              path={path}
              element={<SectionGuard access={access}>{element}</SectionGuard>}
            />
          ))}
          <Route path="*" element={<ModuleIndex items={SIROH_ITEMS} fallback="/siroh/geoportal"/>}/>
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={ROUTE_ACCESS["/siroh-raw-Form"]}/>}>
        <Route path="/siroh-raw-Form" element={<SirohRawForm/>}></Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={ROUTE_ACCESS["/prmau"]}/>}>
        <Route path="/prmau" element={<Prmau/>}>
          <Route index element={<ModuleIndex items={PRMAU_ITEMS} fallback="/prmau/vulnerabilidad"/>}/>
          {PRMAU_SECTION_ROUTES.map(({ key, path, element }) => (
            <Route key={key} path={path} element={element}/>
          ))}
          <Route path="*" element={<ModuleIndex items={PRMAU_ITEMS} fallback="/prmau/vulnerabilidad"/>}/>
        </Route>
      </Route>

      <Route element={<ProtectedRoute/>}>
        <Route path="/acceso-denegado" element={<AccessDenied/>}></Route>
      </Route>

    </Routes>
  )
}

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
