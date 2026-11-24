import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/auth"
import { canAccess } from "./auth/permissions"

export const ProtectedRoute = ({ allowedRoles }) => {

    const {user, isAuthenticated, loading} = useAuth()

    if(loading) return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300 text-sm">Verificando sesión…</div>

    if(!isAuthenticated) return <Navigate to={"/login"} replace/>

    if(!canAccess(allowedRoles, user?.rol_id)) return <Navigate to={"/acceso-denegado"} replace/>

    return (
        <Outlet/>
    )
}

/* Guarda por seccion: la ruta raiz ya valido la sesion, aqui solo se
   comprueba el permiso del item del sidebar que declara cada pagina. */
export const SectionGuard = ({ access, children }) => {

    const {role} = useAuth()

    if(!canAccess(access, role)) return <Navigate to={"/acceso-denegado"} replace/>

    return children
}

/* Redireccion inicial de cada modulo a la primera seccion permitida. */
export const ModuleIndex = ({ items, fallback }) => {

    const {role} = useAuth()
    const first = items.find((item) => canAccess(item.access, role))

    return <Navigate to={first?.to ?? fallback} replace/>
}
