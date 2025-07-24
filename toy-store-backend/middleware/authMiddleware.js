const jwt = require('jsonwebtoken');
const User = require('../models/User.js'); // Đảm bảo đường dẫn đúng

const protect = async (req, res, next) => {
  let token;

  // Kiểm tra xem header 'Authorization' có tồn tại và bắt đầu bằng 'Bearer' không
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 1. Lấy token từ header (loại bỏ chữ 'Bearer ')
      token = req.headers.authorization.split(' ')[1];

      // 2. Giải mã token để lấy id người dùng
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Lấy thông tin người dùng từ DB và gắn vào request
      // Dùng .select('-password') để không lấy mật khẩu
      req.user = await User.findById(decoded.id).select('-password');
      
      // 4. Đi tiếp tới route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };