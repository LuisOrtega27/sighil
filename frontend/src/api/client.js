import axios from "axios";

import { trimDeep } from "./trim";

/* El cliente `client` apunta a /api y envia la cookie de sesion. */
const client = axios.create({
    /* Mismo criterio que axios.js: /api en desarrollo (proxy de Vite). */
    baseURL: import.meta.env.DEV ? "/api" : (import.meta.env.VITE_API_URL ?? "/api"),
    withCredentials: true,
});

/* Recorte automatico de lo que se envia (body y query) y de lo que llega,
   para que los formularios muestren los valores tal como se guardaron. */
client.interceptors.request.use((config) => {
    if (config.data && typeof config.data === "object") {
        config.data = trimDeep(config.data);
    }
    if (config.params && typeof config.params === "object") {
        config.params = trimDeep(config.params);
    }
    return config;
});

client.interceptors.response.use((response) => {
    if (response.data !== undefined) {
        response.data = trimDeep(response.data);
    }
    return response;
});

export default client;
