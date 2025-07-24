const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Hàm tạo token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Đăng ký
const registerUser = async (req, res) => {
  const { fullName, email, password, phone, address } = req.body;
  try {
    if (!fullName || !email || !password || !phone || !address) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ tất cả các trường.' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }
    const user = await User.create({
      fullName,
      email,
      password,
      phone,
      address,
    });
    if (user) {
        res.status(201).json({
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Dữ liệu người dùng không hợp lệ' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Đăng nhập
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        isAdmin: user.isAdmin, // <-- THÊM DÒNG NÀY
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

module.exports = { registerUser, loginUser };