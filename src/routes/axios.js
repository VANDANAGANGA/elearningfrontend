import axios from 'axios'

const token = localStorage.getItem("token");
const accessToken = token ? token : null; // No need to parse as JSON

const instance = axios.create({
  baseURL: 'http://backendskillsaga.online/api/',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': "application/json", 
  }, 
});

export default instance;
