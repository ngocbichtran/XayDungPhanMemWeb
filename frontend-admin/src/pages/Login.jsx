import { useAdminLogin } from '../hooks/useAdminLogin';
import { adminLoginStyles as styles } from '../styles/adminLoginStyles';
import { LOGIN_FIELDS } from '../constants/loginFields';

export default function Login() {
  const { form, error, loading, handleChange, handleSubmit } = useAdminLogin();

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🛠 Admin Login</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {LOGIN_FIELDS.map(({ key, label, type, placeholder }) => (
            <div key={key} style={styles.field}>
              <label style={styles.label}>{label}</label>
              <input
                style={styles.input}
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={handleChange(key)}
              />
            </div>
          ))}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}