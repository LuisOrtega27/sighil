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
