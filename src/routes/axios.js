import axios from 'axios'

const token = localStorage.getItem("token");
const accessToken = token ? token : null; // No need to parse as JSON

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': "application/json", 
  }, 
});

export default instance;
