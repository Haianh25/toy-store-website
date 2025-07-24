import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Lấy token từ localStorage
  const token = localStorage.getItem('token');

  // Nếu không có token, chuyển hướng người dùng về trang đăng nhập
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có token, cho phép hiển thị component con (children)
  return children;
};

// Dòng này rất quan trọng và có thể bạn đã thiếu nó
export default ProtectedRoute;