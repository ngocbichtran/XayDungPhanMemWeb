const bcrypt = require('bcryptjs');
const pool = require('../config/db');

async function createAdmin() {
  const full_name = 'Administrator';
  const email     = 'admin@gmail.com';
  const phone     = '0901234567';
  const password  = 'adminadmin';           

 
  const hash = await bcrypt.hash(password, 10);


  const [result] = await pool.query(
    'INSERT INTO users (full_name, email, phone, password_hash) VALUES (?,?,?,?)',
    [full_name, email, phone, hash]
  );

  await pool.query(
    'INSERT INTO user_roles (user_id, role_id) VALUES (?,?)',
    [result.insertId, 1]
  );

  console.log(' Tạo admin thành công!');
  console.log(`   Email   : ${email}`);
  console.log(`   Password: ${password}`);

  process.exit(0);
}

createAdmin().catch(err => {
  console.error('Lỗi:', err.message);
  process.exit(1);
});