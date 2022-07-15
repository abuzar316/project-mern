import axios from "axios";

const baseURL = "http://localhost:8000/";

const apiConfig = axios.create({
    baseURL: baseURL,
});

export default apiConfig;
