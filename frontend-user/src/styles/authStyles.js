export const authStyles = {
  page: {
    minHeight: '100vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    background: '#f3f4f6', fontFamily: 'sans-serif',
    padding: '16px',
  },
  card: {
    background: '#fff', borderRadius: 10,
    padding: '32px 24px',
    width: '100%', maxWidth: 400,
    boxShadow: '0 2px 16px rgba(0,0,0,.08)',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center', fontSize: 22,
    fontWeight: 700, marginBottom: 24, color: '#111',
  },
  errorBox: {
    background: '#fee2e2', color: '#991b1b',
    padding: '10px 14px', borderRadius: 6,
    fontSize: 13, marginBottom: 16,
  },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  btn: {
    padding: '11px 0', background: '#dc2626', color: '#fff',
    border: 'none', borderRadius: 6, fontWeight: 600,
    fontSize: 15, cursor: 'pointer', marginTop: 4,
    width: '100%',                                  // ← full width
  },
  footer: { textAlign: 'center', marginTop: 20, fontSize: 14, color: '#6b7280' },
  link: { color: '#dc2626', textDecoration: 'none', fontWeight: 600 },
};