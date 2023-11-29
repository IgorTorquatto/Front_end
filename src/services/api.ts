import axios from 'axios';
const token = localStorage.getItem("@token")
const headersAuth = {
  Authorization: `${token}`
};

export const apiUnAuth = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});

export const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: headersAuth
});
