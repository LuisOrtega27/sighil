import { createContext, useContext } from 'react'

/* El contexto y el hook viven aparte del provider para que el archivo .jsx
   solo exporte componentes (regla react-refresh/only-export-components). */
export const AuthContext = createContext(null)

export const useAuth = ()=>{

    const context = useContext(AuthContext);

    if(!context) throw new Error("useAuth must be used within a an AuthProvider")
    else return context;
    
}
