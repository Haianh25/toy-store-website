const express = require('express');
const router = express.Router();

// Require các hàm từ controller
const {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} = require('../controllers/userController');

// Require các middleware
const { protect, admin } = require('../middleware/authMiddleware');

// Route cho người dùng thường
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Routes cho admin
router.route('/')
  .get(protect, admin, getUsers);

router.route('/:id')
  .delete(protect, admin, deleteUser);

module.exports = router;