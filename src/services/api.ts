import axios from 'axios';
const headers = {
  'Access-Control-Allow-Origin': '*', 
};
export const api = axios.create({
  baseURL: 'http://168.138.247.57:5000',
});
