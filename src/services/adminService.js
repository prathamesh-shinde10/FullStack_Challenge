import axios from 'axios';

const API = 'http://localhost:5000/admin';

const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getDashboardData = (token) =>
  axios.get(`${API}/dashboard`, getAuthHeaders(token));

export const addUser = (userData, token) =>
  axios.post(`${API}/users`, userData, getAuthHeaders(token));

export const addStore = (storeData, token) =>
  axios.post(`${API}/stores`, storeData, getAuthHeaders(token));

export const getUsers = (filters, token) =>
  axios.get(`${API}/users`, { params: filters, ...getAuthHeaders(token) });

export const getStores = (filters, token) =>
  axios.get(`${API}/stores`, { params: filters, ...getAuthHeaders(token) });

export const getAllRatings = (token) =>
  axios.get(`${API}/ratings`, getAuthHeaders(token));
