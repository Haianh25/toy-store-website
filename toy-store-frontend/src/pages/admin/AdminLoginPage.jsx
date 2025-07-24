import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // --- KIỂM TRA TÀI KHOẢN ADMIN CỐ ĐỊNH ---
    if (email === 'admin@gmail.com' && password === '1') {
      alert('Đăng nhập Admin thành công!');
      
      // Lưu một giá trị đơn giản để xác nhận đã đăng nhập admin
      localStorage.setItem('adminToken', 'true'); 
      
      // Xóa token của user thường nếu có để tránh xung đột
      localStorage.removeItem('token');

      navigate('/admin/dashboard');
    } else {
      setError('Email hoặc mật khẩu admin không đúng.');
    }
  };

  return (
    <div className="page-container">
      <h2>Đăng Nhập Admin</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Đăng Nhập</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;