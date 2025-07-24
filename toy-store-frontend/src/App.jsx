import React from 'react';
// Thêm 'useLocation' để kiểm tra URL hiện tại
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import CSS và các component
import './App.css';
import Header from './components/layout/Header';
import MainMenu from './components/layout/MainMenu';
import Sidebar from "./components/admin/Sidebar.jsx";

// Import các trang
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagementPage from './pages/admin/UserManagementPage';

// Import các component bảo vệ route
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Component AppContent sẽ chứa logic quyết định layout
const AppContent = () => {
  const location = useLocation();
  // Kiểm tra xem có phải trang admin hay không
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Logic hiển thị: Nếu là trang admin thì hiện Sidebar, ngược lại thì hiện Header và MainMenu */}
      {isAdminPage ? (
        // Không hiển thị Sidebar trên trang login của admin
        location.pathname !== '/admin/login' && <Sidebar />
      ) : (
        <>
          <Header />
          <MainMenu />
        </>
      )}

      {/* Phần nội dung chính không thay đổi */}
      <main className={isAdminPage ? 'admin-content' : 'main-content'}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<h2>Chào mừng đến với cửa hàng!</h2>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<h2>Trang Giỏ Hàng</h2>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><UserManagementPage /></AdminRoute>} />
        </Routes>
      </main>
    </>
  );
};

// Component App chính chỉ bọc Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;