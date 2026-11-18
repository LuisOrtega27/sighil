import axios from "axios";

/* Cliente generico para el API (el de auth.js apunta solo a /api/auth). */
const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000/api",
    withCredentials: true,
});

export default client;
