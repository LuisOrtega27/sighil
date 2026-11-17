import axios from "./axios";

// const API_URL = import.meta.env.VITE_API_URL;

export const  registerRequest = async (user) => await axios.post(`register`, user);

export const loginRequest = async (user) => await axios.post(`login`, user);