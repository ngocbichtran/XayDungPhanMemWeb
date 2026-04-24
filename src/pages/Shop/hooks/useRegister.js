import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { validateRegisterForm } from '../utils/validators';

export function useRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name:        '',
    email:            '',
    phone:            '',
    password:         '',
    confirm_password: '',
  });
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
    const errs = validateRegisterForm(form);
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    try {
      await api.post('/auth/register', {
        full_name: form.full_name,
        email:     form.email,
        phone:     form.phone,
        password:  form.password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return { form, errors, error, loading, handleChange, handleSubmit };
}