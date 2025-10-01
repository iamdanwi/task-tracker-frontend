import axios from "axios";

const api = axios.create({
    baseURL: process.env.BACKEND_URL, // set your Express backend URL
    withCredentials: true,            // include cookies (JWT)
});

export default api;
