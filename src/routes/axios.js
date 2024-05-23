import axios from 'axios'

const token = localStorage.getItem("token");
const accessToken = token ? token : null; // No need to parse as JSON

const instance = axios.create({
  baseURL: 'https://elarning-backend-1-wkvk.onrender.com/api',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': "application/json", 
  }, 
});

export default instance;
