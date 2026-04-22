import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { validateLoginForm } from '../utils/validators';
import api from '../api/axios';

export function useLogin() {
  const { login } = useAuth();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);


  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate
    const errs = validateLoginForm(form);
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);

      if (res.data.user.role === 'admin') {
        setError('Vui lòng dùng trang Admin để đăng nhập');
        return;
      }

      login(res.data.token, res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return { form, errors, error, loading, handleChange, handleSubmit };
}