import axios from 'axios';
const token = localStorage.getItem("@token")

const headersAuth = {
  Authorization: `${token}`
};

export const apiUnAuth = axios.create({
  baseURL: 'http://localhost:5000',
});

export const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: headersAuth
});

const handleAuthenticationError = (error:any) => {
  if (error.response?.status === 401) {

    window.location.href = '/login';
  }
  return Promise.reject(error);
};


api.interceptors.response.use((response) => response, handleAuthenticationError);
