import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Toy Store Admin</h3>
      </div>
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/admin/dashboard">📊 Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/admin/products">📦 Quản lý Sản phẩm</NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories">📚 Quản lý Danh mục</NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders">🛒 Quản lý Đơn hàng</NavLink>
        </li>
        <li>
          <NavLink to="/admin/users">👥 Quản lý Người dùng</NavLink>
        </li>
      </ul>
    </aside>
  );
};

// Đảm bảo bạn có dòng này ở cuối file
export default Sidebar;