import axios from 'axios'



const axiosinstance = axios.create({
  baseURL: 'https://elarning-backend-1-wkvk.onrender.com/api',
  headers: {
    'Content-Type': "application/json", 
  }, 
});

export default axiosinstance;
