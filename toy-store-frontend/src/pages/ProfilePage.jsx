import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfile, setOriginalProfile] = useState({ fullName: '', phone: '', address: '' });
  const [formData, setFormData] = useState({ fullName: '', phone: '', address: '' });
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get('http://localhost:5000/api/users/profile', config);
        
        const profileData = {
          fullName: data.fullName,
          phone: data.phone || '',
          address: data.address || '' // Thêm địa chỉ
        };

        setEmail(data.email);
        setOriginalProfile(profileData);
        setFormData(profileData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // Gửi cả address đi
      await axios.put('http://localhost:5000/api/users/profile', formData, config);
      
      setOriginalProfile(formData);
      setIsEditing(false);
      setMessage('Cập nhật thành công!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Cập nhật thất bại.');
    }
  };

  const handleCancel = () => {
    setFormData(originalProfile);
    setIsEditing(false);
    setMessage('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      <h2>Thông Tin Tài Khoản</h2>
      
      <div className="info-row">
        <span className="info-label">Họ và tên</span>
        {isEditing ? (
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
        ) : (
          <span className="info-value">{originalProfile.fullName}</span>
        )}
      </div>

      <div className="info-row">
        <span className="info-label">Email</span>
        <span className="info-value">{email}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Số điện thoại</span>
        {isEditing ? (
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        ) : (
          <span className="info-value">{originalProfile.phone || 'Chưa cập nhật'}</span>
        )}
      </div>
      
      {/* Hàng Địa chỉ - hoạt động y hệt các hàng trên */}
      <div className="info-row">
        <span className="info-label">Địa chỉ</span>
        {isEditing ? (
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        ) : (
          <span className="info-value">{originalProfile.address || 'Chưa cập nhật'}</span>
        )}
      </div>
      
      <div className="info-row">
        <span className="info-label">Lịch sử đơn hàng</span>
        <span className="info-value action-link">Xem chi tiết</span>
      </div>

      <div className="actions-row">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave}>Lưu thay đổi</button>
            <button className="cancel-btn" onClick={handleCancel}>Hủy</button>
          </>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Sửa</button>
        )}
      </div>
      
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ProfilePage;