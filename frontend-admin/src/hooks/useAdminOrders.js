import { useEffect, useState } from 'react';
import api from '../api/axios';

export function useAdminOrders() {
  const [orders, setOrders]   = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState({ status: '', payment_status: '' });
  const [msg, setMsg]         = useState('');


  const fetchOrders = () =>
    api.get('/orders').then(r => setOrders(r.data));

  useEffect(() => { fetchOrders(); }, []);


  const openEdit = (order) => {
    setEditing(order);
    setForm({ status: order.status, payment_status: order.payment_status });
  };


  const closeEdit = () => setEditing(null);


  const handleFormChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };


  const handleUpdate = async () => {
    await api.put(`/orders/${editing.id}`, form);
    closeEdit();
    fetchOrders();
    setMsg('✅ Cập nhật thành công');
    setTimeout(() => setMsg(''), 2500);
  };


  const handleDelete = async (id) => {
    if (!window.confirm('Xoá đơn hàng này?')) return;
    await api.delete(`/orders/${id}`);
    fetchOrders();
  };

  return {
    orders, editing, form, msg,
    openEdit, closeEdit,
    handleFormChange,
    handleUpdate,
    handleDelete,
  };
}