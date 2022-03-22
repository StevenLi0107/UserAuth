import axios from "axios";

const BASE_URL = "http://13.233.216.239:4400/api";
const api = axios.create({
  baseURL: BASE_URL,
});
export default api;
