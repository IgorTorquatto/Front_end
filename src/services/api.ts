import axios from 'axios';
const headers = {
  'Access-Control-Allow-Origin': '*', 
};
export const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
});
