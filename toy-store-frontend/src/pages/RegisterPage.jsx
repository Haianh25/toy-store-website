import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',    // <-- Thêm state cho phone
    address: '', // <-- Thêm state cho address
  });

  const navigate = useNavigate();

  // Lấy các giá trị từ formData
  const { fullName, email, password, phone, address } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // formData giờ đã chứa cả phone và address
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      localStorage.setItem('token', res.data.token);
      navigate('/');

    } catch (error) {
      alert('Lỗi: ' + error.response.data.message);
      console.error(error.response.data);
    }
  };

  return (
    <div className="page-container">
      <h2>Đăng Ký Tài Khoản</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Họ và Tên</label>
          <input type="text" name="fullName" value={fullName} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={handleChange} required />
        </div>
        {/* --- Thêm ô nhập liệu cho Số điện thoại --- */}
        <div>
          <label>Số điện thoại</label>
          <input type="text" name="phone" value={phone} onChange={handleChange} required />
        </div>
        {/* --- Thêm ô nhập liệu cho Địa chỉ --- */}
        <div>
          <label>Địa chỉ</label>
          <input type="text" name="address" value={address} onChange={handleChange} required />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input type="password" name="password" value={password} onChange={handleChange} required />
        </div>
        <button type="submit">Đăng Ký</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
};

export default RegisterPage;