export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  if (!email)
    errors.email = 'Email không được trống';
  else if (!/\S+@\S+\.\S+/.test(email))
    errors.email = 'Email không hợp lệ';

  if (!password)
    errors.password = 'Mật khẩu không được trống';

  return errors;
};
export const validateRegisterForm = ({ full_name, email, phone, password, confirm_password }) => {
  const errors = {};

  if (!full_name?.trim())
    errors.full_name = 'Họ tên không được trống';

  if (!email)
    errors.email = 'Email không được trống';
  else if (!/\S+@\S+\.\S+/.test(email))
    errors.email = 'Email không hợp lệ';

  if (!phone)
    errors.phone = 'Số điện thoại không được trống';
  else if (!/^0\d{9}$/.test(phone))
    errors.phone = 'SĐT không hợp lệ (VD: 0901234567)';

  if (!password)
    errors.password = 'Mật khẩu không được trống';
  else if (password.length < 6)
    errors.password = 'Mật khẩu ít nhất 6 ký tự';

  if (!confirm_password)
    errors.confirm_password = 'Vui lòng xác nhận mật khẩu';
  else if (password !== confirm_password)
    errors.confirm_password = 'Mật khẩu không khớp';

  return errors;
};
export const validateInfoForm = ({ full_name, phone }) => {
  const errors = {};
  if (!full_name?.trim())
    errors.full_name = 'Họ tên không được trống';
  if (phone && !/^0\d{9}$/.test(phone))
    errors.phone = 'SĐT không hợp lệ';
  return errors;
};


export const validatePasswordForm = ({ current_password, new_password, confirm_password }) => {
  const errors = {};
  if (!current_password)
    errors.current_password = 'Nhập mật khẩu hiện tại';
  if (!new_password)
    errors.new_password = 'Nhập mật khẩu mới';
  else if (new_password.length < 6)
    errors.new_password = 'Ít nhất 6 ký tự';
  if (!confirm_password)
    errors.confirm_password = 'Xác nhận mật khẩu mới';
  else if (new_password !== confirm_password)
    errors.confirm_password = 'Mật khẩu không khớp';
  return errors;
};