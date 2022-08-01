import axios from 'axios';

let urls = {
  test: process.env.MIX_BASE_URL_DEV,
  development: process.env.MIX_BASE_URL_DEV,
  production: process.env.MIX_BASE_URL_PRO
}

const BASE_URL = urls[process.env.NODE_ENV];
export const API_URL = `${BASE_URL}/api`;
export const API_KEY = process.env.MIX_API_KEY;
export const PATH_STORAGE = `${BASE_URL}/storage`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;