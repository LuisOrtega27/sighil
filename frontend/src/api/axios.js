import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

const instance = axios.create({
    baseURL: `${baseURL}/auth/`,
    withCredentials: true
})

export default instance