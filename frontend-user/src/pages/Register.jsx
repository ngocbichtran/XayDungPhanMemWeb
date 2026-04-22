import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';
import { authStyles as styles } from '../styles/authStyles';
import { REGISTER_FIELDS } from '../constants/registerFields';
import { inputStyles as iStyles } from '../styles/inputStyles';

export default function Register() {
  const { form, errors, error, loading, handleChange, handleSubmit } = useRegister();

  return (
    <div style={styles.page}>
      <div style={{ ...styles.card, width: 420 }}>
        <h2 style={styles.title}>Đăng ký tài khoản</h2>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ ...styles.form, gap: 14 }}>
          {REGISTER_FIELDS.map(({ key, label, type, placeholder }) => (
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
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <p style={styles.footer}>
          Đã có tài khoản?{' '}
          <Link to="/login" style={styles.link}>Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}