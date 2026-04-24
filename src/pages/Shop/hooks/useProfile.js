import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { validateInfoForm, validatePasswordForm } from '../utils/validators';

export function useProfile() {
  const { updateUser } = useAuth();

  const [tab, setTab]         = useState('info');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState({ type: '', text: '' });

  const [info, setInfo] = useState({
    full_name: '', phone: '', gender: '',
    birth_date: '', address: '', bio: '',
  });
  const [pw, setPw] = useState({
    current_password: '', new_password: '', confirm_password: '',
  });
  const [infoErrors, setInfoErrors] = useState({});
  const [pwErrors,   setPwErrors]   = useState({});


  useEffect(() => {
    api.get('/users/me').then(r => {
      const u = r.data;
      setInfo({
        full_name:  u.full_name  || '',
        phone:      u.phone      || '',
        gender:     u.gender     || '',
        birth_date: u.birth_date ? u.birth_date.substring(0, 10) : '',
        address:    u.address    || '',
        bio:        u.bio        || '',
      });
    }).finally(() => setLoading(false));
  }, []);

  const notify = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: '', text: '' }), 3000);
  };


  const handleInfoChange = (field) => (value) => {
    setInfo(prev => ({ ...prev, [field]: value }));
    setInfoErrors(prev => ({ ...prev, [field]: '' }));
  };


  const handlePwChange = (field) => (value) => {
    setPw(prev => ({ ...prev, [field]: value }));
    setPwErrors(prev => ({ ...prev, [field]: '' }));
  };


  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    const errs = validateInfoForm(info);
    if (Object.keys(errs).length) return setInfoErrors(errs);
    setSaving(true);
    try {
      await api.put('/users/me', info);
      updateUser({ full_name: info.full_name });
      notify('success', '✅ Cập nhật thông tin thành công');
    } catch (err) {
      notify('error', err.response?.data?.message || 'Lỗi cập nhật');
    } finally {
      setSaving(false);
    }
  };


  const handleChangePw = async (e) => {
    e.preventDefault();
    const errs = validatePasswordForm(pw);
    if (Object.keys(errs).length) return setPwErrors(errs);
    setSaving(true);
    try {
      await api.put('/users/me/password', {
        current_password: pw.current_password,
        new_password:     pw.new_password,
      });
      notify('success', '✅ Đổi mật khẩu thành công');
      setPw({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      notify('error', err.response?.data?.message || 'Lỗi đổi mật khẩu');
    } finally {
      setSaving(false);
    }
  };

  return {
    tab, setTab,
    loading, saving, msg,
    info, pw,
    infoErrors, pwErrors,
    handleInfoChange, handlePwChange,
    handleUpdateInfo, handleChangePw,
  };
}