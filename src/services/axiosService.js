import axios from "axios";
import Constants from "@/Constants";
import GlobalFunction from "../GlobalFunction/GlobalFunction";

const axiosInstance = axios.create({
  baseURL:  Constants.BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = localStorage.token ? `Bearer ${localStorage.token}` : "";
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
    if (error.response && error.response.status === 401) {
      GlobalFunction.logout();
    }else if (error.response.status === 500){
      console.log('500');
      
    }
  }
);

export default axiosInstance;