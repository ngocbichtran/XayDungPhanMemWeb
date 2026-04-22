import { useEffect, useState } from 'react';
import api from '../api/axios';

const INIT_FORM = {
  full_name: '', email: '', phone: '',
  password: '', role: 'user', status: 'active',
};

export function useAdminUsers() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg]         = useState({ type: '', text: '' });


  const [modalType, setModalType] = useState(null); 
  const [selected, setSelected]   = useState(null);
  const [form, setForm]           = useState(INIT_FORM);
  const [newPw, setNewPw]         = useState('');

  const fetchUsers = () =>
    api.get('/admin/users')
      .then(r => setUsers(r.data))
      .finally(() => setLoading(false));

  useEffect(() => { fetchUsers(); }, []);

  const notify = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: '', text: '' }), 2500);
  };


  const openCreate = () => {
    setForm(INIT_FORM);
    setModalType('create');
  };


  const openEdit = (user) => {
    setSelected(user);
    setForm({
      full_name: user.full_name,
      phone:     user.phone || '',
      role:      user.role,
      status:    user.status,
    });
    setModalType('edit');
  };


  const openReset = (user) => {
    setSelected(user);
    setNewPw('');
    setModalType('reset');
  };

  const closeModal = () => {
    setModalType(null);
    setSelected(null);
  };

  const handleFormChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };


  const handleCreate = async () => {
    try {
      await api.post('/admin/users', form);
      notify('success', ' Tạo tài khoản thành công');
      closeModal();
      fetchUsers();
    } catch (err) {
      notify('error', err.response?.data?.message || 'Lỗi tạo tài khoản');
    }
  };


  const handleUpdate = async () => {
    try {
      await api.put(`/admin/users/${selected.id}`, form);
      notify('success', ' Cập nhật thành công');
      closeModal();
      fetchUsers();
    } catch (err) {
      notify('error', err.response?.data?.message || 'Lỗi cập nhật');
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm('Xoá tài khoản này?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      notify('success', ' Đã xoá tài khoản');
      fetchUsers();
    } catch (err) {
      notify('error', err.response?.data?.message || 'Lỗi xoá');
    }
  };


  const handleResetPassword = async () => {
    if (!newPw || newPw.length < 6)
      return notify('error', 'Mật khẩu ít nhất 6 ký tự');
    try {
      await api.put(`/admin/users/${selected.id}/reset-password`, { new_password: newPw });
      notify('success', ' Reset mật khẩu thành công');
      closeModal();
    } catch (err) {
      notify('error', err.response?.data?.message || 'Lỗi reset');
    }
  };

  return {
    users, loading, msg,
    modalType, selected, form, newPw,
    setNewPw, handleFormChange,
    openCreate, openEdit, openReset, closeModal,
    handleCreate, handleUpdate, handleDelete, handleResetPassword,
  };
}