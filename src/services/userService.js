import axios from 'axios';

const API = 'http://localhost:5000/user';

const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getStores = (token) =>
  axios.get(`${API}/stores`, getAuthHeaders(token));

export const submitRating = (storeId, rating, token) =>
  axios.post(`${API}/rate`, { storeId, rating }, getAuthHeaders(token));

export const updatePassword = (newPassword, token) =>
  axios.put(`${API}/password`, { password: newPassword }, getAuthHeaders(token));
