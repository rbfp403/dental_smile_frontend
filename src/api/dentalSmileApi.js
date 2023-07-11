import axios from "axios";

const dentalSmileApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL_API,
});

export default dentalSmileApi;
