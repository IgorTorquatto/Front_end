import axios from 'axios';
const token = localStorage.getItem("@token")
console.log("------------------")
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
    // Redirecionar para a página de login ou fazer outras ações de autenticação
    window.location.href = '/login';
  }
  return Promise.reject(error);
};

// Adicione um interceptor para tratar erros de resposta
api.interceptors.response.use((response) => response, handleAuthenticationError);
