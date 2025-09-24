import axios from 'axios';

const baseURL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({ baseURL });

export default api;
