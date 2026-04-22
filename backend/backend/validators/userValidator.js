const { body } = require('express-validator');

const updateMeValidator = [
  body('full_name')
    .notEmpty().withMessage('Họ tên không được trống'),
  body('phone')
    .optional({ checkFalsy: true })
    .isMobilePhone('vi-VN').withMessage('SĐT không hợp lệ'),
];

const updatePasswordValidator = [
  body('current_password')
    .notEmpty().withMessage('Nhập mật khẩu hiện tại'),
  body('new_password')
    .isLength({ min: 6 }).withMessage('Mật khẩu mới ít nhất 6 ký tự'),
];

module.exports = { updateMeValidator, updatePasswordValidator };