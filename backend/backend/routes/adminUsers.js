const express = require('express');
const router = express.Router();

const { authenticate, isAdmin } = require('../middleware/auth');
const {
  getAllUsers, getUserById,
  createUser, updateUser,
  deleteUser, resetPassword,
} = require('../controllers/adminUserController');

router.get('/',                authenticate, isAdmin, getAllUsers);
router.get('/:id',             authenticate, isAdmin, getUserById);
router.post('/',               authenticate, isAdmin, createUser);
router.put('/:id',             authenticate, isAdmin, updateUser);
router.delete('/:id',          authenticate, isAdmin, deleteUser);
router.put('/:id/reset-password', authenticate, isAdmin, resetPassword);

module.exports = router;