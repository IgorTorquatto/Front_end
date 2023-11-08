import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localHost:3333',
});
