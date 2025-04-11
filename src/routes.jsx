import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import StoreListPage from './pages/StoreListPage';
import { getToken, getUserRole } from './utils/auth';

const AppRoutes = () => {
  const token = getToken();
  const role = getUserRole();

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {token && role === 'admin' && (
        <Route path="/admin" element={<AdminDashboard />} />
      )}
      {token && role === 'normal' && (
        <Route path="/user" element={<UserDashboard />} />
      )}
      {token && role === 'owner' && (
        <Route path="/owner" element={<OwnerDashboard />} />
      )}
      {token && (
        <Route path="/stores" element={<StoreListPage />} />
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
