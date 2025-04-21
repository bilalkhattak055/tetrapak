import axios from 'axios';
import { isTokenExpired } from '../_helper/helper'; 
const apiBaseUrl =
  // process.env.NODE_ENV === 'production'  
  //   ? 
       "https://betetrapak.disruptlabs.tech/"
    // :
    //  "http://localhost:8000/"; 
 
// Create an Axios instance with the base URL
const api = axios.create({
    baseURL: apiBaseUrl,
    // headers: { 
    //   "Content-Type": "application/json"
    // },
  // You can add more configuration options here, such as headers, interceptors, etc.
  
});
console.log('from apii')
if(typeof window !== 'undefined'){
  const getInfoLocal = JSON.parse(localStorage.getItem('userData'));
  
  if(getInfoLocal?.accessToken  && !isTokenExpired() ){ 
    api.defaults.headers.common['Authorization'] = getInfoLocal?.accessToken;
    api.defaults.headers.common['Token-Type'] = getInfoLocal?.accessToken ? "jwt": "none";
  }
}

export default api;

