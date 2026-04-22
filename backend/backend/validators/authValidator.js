const { body } = require('express-validator');

const registerValidator = [
  body('full_name').notEmpty().withMessage('Họ tên không được trống'),
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('phone').isMobilePhone('vi-VN').withMessage('Số điện thoại không hợp lệ'),
  body('password').isLength({ min: 6 }).withMessage('Mật khẩu ít nhất 6 ký tự'),
];

const loginValidator = [
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('password').notEmpty().withMessage('Mật khẩu không được trống'),
];

module.exports = { registerValidator, loginValidator };