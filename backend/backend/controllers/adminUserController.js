const bcrypt = require('bcryptjs');
const pool = require('../config/db');


const getAllUsers = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT u.id, u.full_name, u.email, u.phone, u.status,
            u.created_at, r.name as role
     FROM users u
     LEFT JOIN user_roles ur ON u.id = ur.user_id
     LEFT JOIN roles r ON ur.role_id = r.id
     ORDER BY u.created_at DESC`
  );
  return res.json(rows);
};


const getUserById = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT u.id, u.full_name, u.email, u.phone, u.status,
            u.created_at, r.name as role,
            p.gender, p.birth_date, p.address, p.bio
     FROM users u
     LEFT JOIN user_roles ur ON u.id = ur.user_id
     LEFT JOIN roles r ON ur.role_id = r.id
     LEFT JOIN user_profiles p ON u.id = p.user_id
     WHERE u.id = ?`,
    [req.params.id]
  );
  if (!rows.length)
    return res.status(404).json({ message: 'Không tìm thấy người dùng' });
  return res.json(rows[0]);
};


const createUser = async (req, res) => {
  const { full_name, email, phone, password, role } = req.body;


  const [exist] = await pool.query(
    'SELECT id FROM users WHERE email = ?', [email]
  );
  if (exist.length)
    return res.status(409).json({ message: 'Email đã tồn tại' });

  const hash = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    'INSERT INTO users (full_name, email, phone, password_hash) VALUES (?,?,?,?)',
    [full_name, email, phone, hash]
  );


  const roleId = role === 'admin' ? 1 : 2;
  await pool.query(
    'INSERT INTO user_roles (user_id, role_id) VALUES (?,?)',
    [result.insertId, roleId]
  );

  return res.status(201).json({ message: 'Tạo tài khoản thành công' });
};


const updateUser = async (req, res) => {
  const { full_name, phone, status, role } = req.body;
  const { id } = req.params;

  await pool.query(
    'UPDATE users SET full_name = ?, phone = ?, status = ? WHERE id = ?',
    [full_name, phone, status, id]
  );


  const roleId = role === 'admin' ? 1 : 2;
  await pool.query(
    'UPDATE user_roles SET role_id = ? WHERE user_id = ?',
    [roleId, id]
  );

  return res.json({ message: 'Cập nhật thành công' });
};


const deleteUser = async (req, res) => {
  const { id } = req.params;


  if (Number(id) === req.user.id)
    return res.status(400).json({ message: 'Không thể xoá tài khoản đang đăng nhập' });

  await pool.query('DELETE FROM users WHERE id = ?', [id]);
  return res.json({ message: 'Đã xoá tài khoản' });
};


const resetPassword = async (req, res) => {
  const { new_password } = req.body;
  const hash = await bcrypt.hash(new_password, 10);
  await pool.query(
    'UPDATE users SET password_hash = ? WHERE id = ?',
    [hash, req.params.id]
  );
  return res.json({ message: 'Reset mật khẩu thành công' });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, resetPassword };