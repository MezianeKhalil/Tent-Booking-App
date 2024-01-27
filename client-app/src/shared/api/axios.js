import axios from "axios";
import { BASE_URL } from "../constants";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.defaults.timeout = 5000;

export default axiosInstance;
