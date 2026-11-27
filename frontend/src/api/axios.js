import axios from "axios";

import { trimDeep } from "./trim";

/* En desarrollo se usa la ruta relativa: Vite la proxya al backend y la
   cookie queda ligada al mismo origen que la pagina. En produccion se usa
   VITE_API_URL si esta definido. */
const baseURL = import.meta.env.DEV
    ? "/api"
    : (import.meta.env.VITE_API_URL ?? "/api");

const instance = axios.create({
    baseURL: `${baseURL}/auth/`,
    withCredentials: true
})

/* Mismo recorte que en `client`: el email llega limpio, la clave se respeta. */
instance.interceptors.request.use((config) => {
    if (config.data && typeof config.data === "object") {
        config.data = trimDeep(config.data);
    }
    if (config.params && typeof config.params === "object") {
        config.params = trimDeep(config.params);
    }
    return config;
});

instance.interceptors.response.use((response) => {
    if (response.data !== undefined) {
        response.data = trimDeep(response.data);
    }
    return response;
});

export default instance
