const jwt = require('jsonwebtoken');
const pool = require('../config/db');


const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Chưa đăng nhập' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
};


const isAdmin = async (req, res, next) => {
  const [rows] = await pool.query(
    `SELECT r.name FROM user_roles ur
     JOIN roles r ON ur.role_id = r.id
     WHERE ur.user_id = ?`, [req.user.id]
  );
  const roles = rows.map(r => r.name);
  if (!roles.includes('admin'))
    return res.status(403).json({ message: 'Không có quyền truy cập' });
  next();
};

module.exports = { authenticate, isAdmin };