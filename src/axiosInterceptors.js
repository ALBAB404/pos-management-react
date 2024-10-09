import axios from "axios";
import Constants from "@/Constants";

const axiosInstance = axios.create({
  baseURL:  Constants.BASE_URL,
});

axiosInstance.interceptors.response.use(function (response) {
  console.log(localStorage.token);
  
  if (localStorage.token) {
    console.log(response);
    
    response.headers['Authorization'] = `Bearer ${localStorage.token}`;
  }
  
  
  return response;
}, function (error) {
  console.log(axiosInstance());
  // if (error.response.status == 401) {
  //   console.log('sdfsdaf');
    
  // }
  
  return Promise.reject(error);
});


export default axiosInstance;