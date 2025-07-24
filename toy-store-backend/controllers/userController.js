const User = require('../models/User.js');

// @desc    Lấy thông tin cá nhân của người dùng
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Cập nhật thông tin cá nhân của người dùng
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fullName = req.body.fullName || user.fullName;
    if (req.body.phone !== undefined) {
      user.phone = req.body.phone;
    }
    if (req.body.address !== undefined) {
      user.address = req.body.address;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// --- CÁC HÀM MỚI CHO ADMIN ---

// @desc    Lấy tất cả người dùng (Admin)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// @desc    Xóa người dùng (Admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // Thêm điều kiện không cho admin tự xóa chính mình
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Can not delete admin user');
    }
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};


module.exports = {
  getUserProfile,
  updateUserProfile,
  getUsers,     // <-- Thêm vào export
  deleteUser,   // <-- Thêm vào export
};