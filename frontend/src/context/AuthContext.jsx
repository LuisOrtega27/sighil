import { createContext, useContext, useEffect, useState } from 'react'
import { loginRequest, registerRequest } from '../api/auth';

import Cookies from "js-cookie"

export const AuthContext = createContext();

export const useAuth = ()=>{

    const context = useContext(AuthContext);

    if(!context) throw new Error("useAuth must be used within a an AuthProvider")
    else return context;
    
}

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(()=>{
        const cookies = Cookies.get()

        console.log(cookies.token)
        if(cookies.token) console.log(cookies.token)
    }, [])


    const signUp = async(user)=>{
        try {

            const {data} = await registerRequest(user)
            setUser(data)
            setIsAuthenticated(true)
            return(data)
            
        
        } catch (error) {
            console.log(error.response.data)
        }
    }
    
    const signIn = async (user)=>{
        try {

            const {data} = await loginRequest(user);
            setUser(data)
            setIsAuthenticated(true)
            return(data)

        } catch (error) {
            console.log(error.response.data)
        }
    }
    
    return(
        <AuthContext.Provider value={{
            signUp,
            signIn,
            isAuthenticated,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

