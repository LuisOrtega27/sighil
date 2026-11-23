import axios from "axios";

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

export default instance