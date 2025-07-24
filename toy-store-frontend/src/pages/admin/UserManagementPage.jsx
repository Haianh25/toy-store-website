import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get('http://localhost:5000/api/users', config);
      setUsers(data);
    } catch (err) {
      setError('Không thể tải danh sách người dùng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(`http://localhost:5000/api/users/${userId}`, config);
        // Tải lại danh sách người dùng sau khi xóa thành công
        fetchUsers();
      } catch (err) {
        alert('Xóa người dùng thất bại.');
      }
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="page-container">
      <h2>Quản lý Người dùng</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? '✅' : '❌'}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;