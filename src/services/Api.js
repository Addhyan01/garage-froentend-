import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add auth token here if needed
// API.interceptors.request.use(...)

export default API;
