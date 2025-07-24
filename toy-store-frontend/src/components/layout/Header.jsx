import React from 'react';
// Thêm Link và useNavigate để điều hướng
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  // Khởi tạo hook useNavigate
  const navigate = useNavigate();

  // Tạo hàm xử lý việc đăng xuất
  const logoutHandler = () => {
    // 1. Xóa token khỏi bộ nhớ trình duyệt
    localStorage.removeItem('token');
    // 2. Điều hướng người dùng về trang đăng nhập
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">Cửa Hàng Đồ Chơi</Link>
        </div>
        
        <div className="header-search">
          <input type="text" placeholder="Nhập từ khoá..." />
          <button>🔍</button>
        </div>

        <div className="header-actions">
          <Link to="/profile">Tài khoản</Link>
          <Link to="/cart">Giỏ hàng</Link>
          {/* Thêm nút Đăng xuất và gắn sự kiện onClick */}
          <button onClick={logoutHandler} className="logout-btn">Đăng xuất</button>
        </div>
      </div>
    </header>
  );
};

export default Header;