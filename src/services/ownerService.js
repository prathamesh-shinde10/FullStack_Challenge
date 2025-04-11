import axios from 'axios';

const API = 'http://localhost:5000/owner';

const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getStoreRatings = (token) =>
  axios.get(`${API}/ratings`, getAuthHeaders(token));

export const getAverageRating = (token) =>
  axios.get(`${API}/average-rating`, getAuthHeaders(token));

export const updatePassword = (newPassword, token) =>
  axios.put(`${API}/password`, { password: newPassword }, getAuthHeaders(token));
