import React, { useState } from 'react';
import axios from 'axios';
// Bước 1: Import Link và useNavigate
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  // Bước 2: Khởi tạo hook useNavigate
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      // alert('Đăng nhập thành công!'); // Có thể bỏ thông báo này đi
      localStorage.setItem('token', res.data.token);

      // Bước 3: Điều hướng người dùng đến trang chủ
      navigate('/'); 

    } catch (error) {
      alert('Lỗi: ' + error.response.data.message);
      console.error(error.response.data);
    }
  };

  return (
    <div className="page-container">
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={handleChange} required />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input type="password" name="password" value={password} onChange={handleChange} required />
        </div>
        <button type="submit">Đăng Nhập</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </p>
    </div>
  );
};

export default LoginPage;