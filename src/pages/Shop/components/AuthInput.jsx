import { inputStyles as styles } from '../styles/inputStyles';

export default function AuthInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <input
        style={{ ...styles.input, ...(error ? styles.inputError : {}) }}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span style={styles.err}>{error}</span>}
    </div>
  );
}