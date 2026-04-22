const { validationResult } = require('express-validator');
const pool = require('../config/db');


const getOrders = async (req, res) => {
  let rows;

  if (req.user.role === 'admin') {

    [rows] = await pool.query(`
      SELECT o.*, u.full_name, u.email
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);
  } else {

    [rows] = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
  }

  return res.json(rows);
};


const getOrderById = async (req, res) => {
  const { id } = req.params;


  const [order] = await pool.query(
    'SELECT * FROM orders WHERE id = ?', [id]
  );
  if (!order.length)
    return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });


  if (req.user.role !== 'admin' && order[0].user_id !== req.user.id)
    return res.status(403).json({ message: 'Không có quyền xem đơn hàng này' });


  const [items] = await pool.query(
    `SELECT oi.*, p.name AS product_name
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    [id]
  );

  return res.json({ ...order[0], items });
};


const createOrder = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const {
    shipping_name, shipping_phone,
    shipping_address, payment_method,
    note, items,
  } = req.body;


  const order_code = 'ORD' + Date.now();


  const total_amount = items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );


  const [result] = await pool.query(
    `INSERT INTO orders
      (user_id, order_code, total_amount, payment_method,
       shipping_name, shipping_phone, shipping_address, note)
     VALUES (?,?,?,?,?,?,?,?)`,
    [
      req.user.id, order_code, total_amount, payment_method,
      shipping_name, shipping_phone, shipping_address, note,
    ]
  );


  const orderItemsData = items.map(item => [
    result.insertId, item.product_id, item.quantity, item.price,
  ]);
  await pool.query(
    'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?',
    [orderItemsData]   
  );

  return res.status(201).json({ message: 'Tạo đơn hàng thành công', order_code });
};


const updateOrder = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });

  const { status, payment_status } = req.body;
  const { id } = req.params;


  const [order] = await pool.query(
    'SELECT id FROM orders WHERE id = ?', [id]
  );
  if (!order.length)
    return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });

  await pool.query(
    'UPDATE orders SET status = ?, payment_status = ? WHERE id = ?',
    [status, payment_status, id]
  );

  return res.json({ message: 'Cập nhật đơn hàng thành công' });
};


const deleteOrder = async (req, res) => {
  const { id } = req.params;


  const [order] = await pool.query(
    'SELECT id FROM orders WHERE id = ?', [id]
  );
  if (!order.length)
    return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });

  await pool.query('DELETE FROM orders WHERE id = ?', [id]);

  return res.json({ message: 'Đã xoá đơn hàng' });
};

module.exports = { getOrders, getOrderById, createOrder, updateOrder, deleteOrder };