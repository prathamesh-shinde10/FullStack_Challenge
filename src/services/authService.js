import axios from 'axios';

const API = 'http://localhost:5000/auth';

export const signup = (userData) => axios.post(`${API}/signup`, userData);

export const login = (credentials) => axios.post(`${API}/login`, credentials);
