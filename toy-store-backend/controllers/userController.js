const User = require('../models/User.js'); // <-- THÊM DÒNG NÀY ĐỂ IMPORT USER MODEL

// @desc    Lấy thông tin cá nhân của người dùng
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // TRẢ VỀ ĐẦY ĐỦ CÁC TRƯỜNG
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,     // <-- THÊM DÒNG NÀY
      address: user.address, // <-- VÀ DÒNG NÀY
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fullName = req.body.fullName || user.fullName;

    if (req.body.phone !== undefined) {
      user.phone = req.body.phone;
    }
    // THÊM LOGIC CẬP NHẬT ĐỊA CHỈ
    if (req.body.address !== undefined) {
      user.address = req.body.address;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address, // Trả về cả địa chỉ
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
module.exports = { getUserProfile, updateUserProfile };