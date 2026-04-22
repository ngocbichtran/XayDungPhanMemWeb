const { body } = require('express-validator');

const createOrderValidator = [
  body('shipping_name')
    .notEmpty().withMessage('Tên người nhận không được trống'),

  body('shipping_phone')
    .notEmpty().withMessage('SĐT không được trống')
    .isMobilePhone('vi-VN').withMessage('SĐT không hợp lệ'),

  body('shipping_address')
    .notEmpty().withMessage('Địa chỉ không được trống'),

  body('payment_method')
    .notEmpty().withMessage('Phương thức thanh toán không được trống'),

  body('items')
    .isArray({ min: 1 }).withMessage('Giỏ hàng trống'),

  body('items.*.product_id')
    .isInt({ min: 1 }).withMessage('product_id không hợp lệ'),

  body('items.*.quantity')
    .isInt({ min: 1 }).withMessage('Số lượng phải lớn hơn 0'),

  body('items.*.price')
    .isFloat({ min: 0 }).withMessage('Giá không hợp lệ'),
];

const updateOrderValidator = [
  body('status')
    .optional()
    .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Trạng thái không hợp lệ'),

  body('payment_status')
    .optional()
    .isIn(['unpaid', 'paid', 'failed', 'refunded'])
    .withMessage('Trạng thái thanh toán không hợp lệ'),
];

module.exports = { createOrderValidator, updateOrderValidator };