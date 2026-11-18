import { useEffect, useState } from 'react'
import { loginRequest, logoutRequest, meRequest, registerRequest } from '../api/auth';
import { canAccess } from '../auth/permissions';
import { AuthContext } from './auth';

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    /* Mientras se valida la cookie no se debe redirigir a /login: al recargar
       la pagina el estado en memoria siempre arranca en false. */
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        let active = true

        const restoreSession = async ()=>{
            try {
                const {data} = await meRequest()
                if(active){
                    setUser(data)
                    setIsAuthenticated(true)
                }
            } catch {
                // Sin cookie valida (o expirada): sesion limpia, sin ruido.
                if(active){
                    setUser(null)
                    setIsAuthenticated(false)
                }
            } finally {
                if(active) setLoading(false)
            }
        }

        restoreSession()
        return ()=>{ active = false }
    }, [])

    const signUp = async(user)=>{
        try {

            const {data} = await registerRequest(user)
            // El alta queda "pendiente": no se inicia sesion ni se guarda token.
            return data
        
        } catch (error) {
            console.log(error.response?.data ?? error)
            throw error
        }
    }
    
    const signIn = async (user)=>{
        try {

            const {data} = await loginRequest(user);
            setUser(data)
            setIsAuthenticated(true)
            return data

        } catch (error) {
            console.log(error.response?.data ?? error)
            throw error
        }
    }

    const signOut = async ()=>{
        try {
            await logoutRequest()
        } catch (error) {
            console.log(error.response?.data ?? error)
        }
        setUser(null)
        setIsAuthenticated(false)
    }

    const hasRole = (allowedRoles)=> canAccess(allowedRoles, user?.rol_id)

    return(
        <AuthContext.Provider value={{
            signUp,
            signIn,
            signOut,
            isAuthenticated,
            user,
            role: user?.rol_id ?? null,
            hasRole,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}
