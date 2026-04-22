const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const pool = require('../config/db');


const register = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const { full_name, email, phone, password } = req.body;


  const [exist] = await pool.query(
    'SELECT id FROM users WHERE email=?', [email]
  );
  if (exist.length)
    return res.status(409).json({ message: 'Email đã tồn tại' });


  const hash = await bcrypt.hash(password, 10);


  const [result] = await pool.query(
    'INSERT INTO users (full_name, email, phone, password_hash) VALUES (?,?,?,?)',
    [full_name, email, phone, hash]
  );


  await pool.query(
    'INSERT INTO user_roles (user_id, role_id) VALUES (?,?)',
    [result.insertId, 2]
  );

  return res.status(201).json({ message: 'Đăng ký thành công' });
};


const login = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const { email, password } = req.body;


  const [users] = await pool.query(
    'SELECT * FROM users WHERE email=?', [email]
  );
  if (!users.length)
    return res.status(401).json({ message: 'Sai email hoặc mật khẩu' });

  const user = users[0];

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match)
    return res.status(401).json({ message: 'Sai email hoặc mật khẩu' });


  if (user.status !== 'active')
    return res.status(403).json({ message: 'Tài khoản bị khoá' });


  const [roles] = await pool.query(
    `SELECT r.name FROM user_roles ur
     JOIN roles r ON ur.role_id = r.id
     WHERE ur.user_id = ?`,
    [user.id]
  );


  const token = jwt.sign(
    { id: user.id, email: user.email, role: roles[0]?.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return res.json({
    token,
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: roles[0]?.name,
    },
  });
};

module.exports = { register, login };