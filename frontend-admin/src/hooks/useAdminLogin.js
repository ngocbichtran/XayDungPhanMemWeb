import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export function useAdminLogin() {
  const { login } = useAuth();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);


  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);

      if (res.data.user.role !== 'admin') {
        setError('Tài khoản không có quyền admin');
        return;
      }

      login(res.data.token, res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return { form, error, loading, handleChange, handleSubmit };
}