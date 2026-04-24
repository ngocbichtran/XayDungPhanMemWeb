import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { authStyles as styles } from '../styles/authStyles';
import { inputStyles as iStyles } from '../styles/inputStyles';

export default function Login() {
  const { form, errors, error, loading, handleChange, handleSubmit } = useLogin();

  const fields = [
    { key: 'email',    label: 'Email',     type: 'email',    placeholder: 'example@email.com' },
    { key: 'password', label: 'Mật khẩu', type: 'password', placeholder: '••••••••' },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Đăng nhập</h2>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {fields.map(({ key, label, type, placeholder }) => (
            <div key={key} style={iStyles.field}>
              <label style={iStyles.label}>{label}</label>
              <input
                style={{
                  ...iStyles.input,
                  ...(errors[key] ? iStyles.inputError : {}),
                }}
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={handleChange(key)}
              />
              {errors[key] && <span style={iStyles.err}>{errors[key]}</span>}
            </div>
          ))}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p style={styles.footer}>
          Chưa có tài khoản?{' '}
          <Link to="/register" style={styles.link}>Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}