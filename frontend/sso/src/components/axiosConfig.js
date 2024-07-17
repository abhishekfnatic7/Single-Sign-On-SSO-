// src/axiosConfig.js

import axios from 'axios';

// Set the base URL for all requests
axios.defaults.baseURL = 'http://127.0.0.1:8000/';

// Set the token in axios globally if it exists
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Token ${token}`;
}

export default axios;