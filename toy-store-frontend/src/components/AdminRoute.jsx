import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  
  // Nếu không có token admin, chuyển về trang login của admin
  return adminToken ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;