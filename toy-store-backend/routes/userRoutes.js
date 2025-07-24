const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Route phải là 'router.get' và đường dẫn là '/profile'
router.get('/profile', protect, getUserProfile);
router.route('/profile')
  .get(protect, getUserProfile)      // Xử lý request GET
  .put(protect, updateUserProfile);

module.exports = router;