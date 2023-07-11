import axios from "axios";

const dentalSmileApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

export default dentalSmileApi;
