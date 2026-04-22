const bcrypt = require('bcryptjs');
const pool = require('../config/db');


const getMe = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT u.id, u.full_name, u.email, u.phone, u.status,
            p.gender, p.birth_date, p.address, p.bio
     FROM users u
     LEFT JOIN user_profiles p ON u.id = p.user_id
     WHERE u.id = ?`,
    [req.user.id]
  );

  if (!rows.length)
    return res.status(404).json({ message: 'Không tìm thấy người dùng' });

  return res.json(rows[0]);
};


const updateMe = async (req, res) => {
  const { full_name, phone, gender, birth_date, address, bio } = req.body;


  await pool.query(
    'UPDATE users SET full_name = ?, phone = ? WHERE id = ?',
    [full_name, phone, req.user.id]
  );


  await pool.query(
    `INSERT INTO user_profiles (user_id, gender, birth_date, address, bio)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       gender     = VALUES(gender),
       birth_date = VALUES(birth_date),
       address    = VALUES(address),
       bio        = VALUES(bio)`,
    [req.user.id, gender, birth_date, address, bio]
  );

  return res.json({ message: 'Cập nhật thông tin thành công' });
};


const updatePassword = async (req, res) => {
  const { current_password, new_password } = req.body;


  const [rows] = await pool.query(
    'SELECT password_hash FROM users WHERE id = ?',
    [req.user.id]
  );


  const match = await bcrypt.compare(current_password, rows[0].password_hash);
  if (!match)
    return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng' });


  const hash = await bcrypt.hash(new_password, 10);
  await pool.query(
    'UPDATE users SET password_hash = ? WHERE id = ?',
    [hash, req.user.id]
  );

  return res.json({ message: 'Đổi mật khẩu thành công' });
};

module.exports = { getMe, updateMe, updatePassword };