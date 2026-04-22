const express = require('express');
const router = express.Router();

const { authenticate, isAdmin } = require('../middleware/auth');
const { createOrderValidator, updateOrderValidator } = require('../validators/orderValidator');
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

router.get('/',     authenticate,           getOrders);
router.get('/:id',  authenticate,           getOrderById);
router.post('/',    authenticate,           createOrderValidator, createOrder);
router.put('/:id',  authenticate, isAdmin,  updateOrderValidator, updateOrder);
router.delete('/:id', authenticate, isAdmin, deleteOrder);

module.exports = router;