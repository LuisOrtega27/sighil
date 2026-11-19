import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Siroh } from "./pages/Siroh"
import { SirohRawForm } from "./pages/SirohRawForm"
import { Prmau } from "./pages/Prmau"
import { AccessDenied } from "./pages/AccessDenied"
import { AuthProvider } from "./context/AuthContext"
import { useAuth } from "./context/auth"
import { ROUTE_ACCESS } from "./auth/permissions"
import { ProtectedRoute } from "./ProtectedRoute"

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
        <Route path="/siroh" element={<Siroh/>}></Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={ROUTE_ACCESS["/siroh-raw-Form"]}/>}>
        <Route path="/siroh-raw-Form" element={<SirohRawForm/>}></Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={ROUTE_ACCESS["/prmau"]}/>}>
        <Route path="/prmau" element={<Prmau/>}></Route>
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
