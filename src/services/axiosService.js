import axios from "axios";
import Constants from "@/Constants";
import store from "@/app/store.js";


// const auth = useSelector((state) => state.auth.value);

const axiosInstance = axios.create({
  baseURL:  Constants.BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {        
    const token = store.getState().auth.value.token;
    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    return config;
  },
  function (error) {
    return error;
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {    
    return error;      
  }
);

export default axiosInstance;