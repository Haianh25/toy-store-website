import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Gọi API login của backend
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Kiểm tra xem tài khoản có phải là admin không
      if (data && data.isAdmin) {
        // Nếu đúng, lưu token THẬT của admin
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError('Tài khoản này không có quyền truy cập.');
      }
    } catch (err) {
      setError('Email hoặc mật khẩu không đúng.');
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