import React from 'react';
import { Link } from 'react-router-dom';


const MainMenu = () => {
  return (
    <nav className="main-menu">
      <div className="main-menu-container">
        <ul>
          <li><Link to="/specials/doc-quyen-online">ĐỘC QUYỀN ONLINE</Link></li>
          <li><Link to="/brand/lego">LEGO</Link></li>
          <li><Link to="/category/hang-moi">HÀNG MỚI</Link></li>
          <li><Link to="/products">SẢN PHẨM</Link></li>
          <li><Link to="/sale">KHUYẾN MÃI</Link></li>
          <li><Link to="/brands">THƯƠNG HIỆU</Link></li>
          <li><Link to="/handbook">CẨM NANG</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default MainMenu;