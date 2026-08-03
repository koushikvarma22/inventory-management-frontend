import axios from "axios";

const api = axios.create({
 baseURL: "https://inventory-management-backend-1zcs.onrender.com"
});

export default api;