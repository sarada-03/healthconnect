import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // thanks to the proxy, this will go to http://localhost:5000/api
});

export default api; 