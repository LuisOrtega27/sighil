import axios from "axios";

/* Cliente generico para el API (el de auth.js apunta solo a /api/auth). */
const client = axios.create({
    /* Mismo criterio que axios.js: /api en desarrollo (proxy de Vite). */
    baseURL: import.meta.env.DEV ? "/api" : (import.meta.env.VITE_API_URL ?? "/api"),
    withCredentials: true,
});

export default client;
