export const profileStyles = {
  title: { fontSize: 20, fontWeight: 700, marginBottom: 20 },

  tabs: {
    display: 'flex', gap: 8, marginBottom: 20,
    flexWrap: 'wrap',                               
  },
  tab: {
    padding: '9px 16px',                            
    border: '1px solid #d1d5db', borderRadius: 6,
    background: '#fff', cursor: 'pointer',
    fontWeight: 500, fontSize: 14,
    whiteSpace: 'nowrap',
  },
  tabActive: { background: '#dc2626', color: '#fff', border: '1px solid #dc2626' },

  alert: { padding: '10px 16px', borderRadius: 6, marginBottom: 16, fontSize: 14 },
  form:  { display: 'flex', flexDirection: 'column', gap: 16 },

  fieldWrap: { display: 'flex', flexDirection: 'column', gap: 5 },
  label: { fontSize: 13, fontWeight: 600, color: '#374151' },
  input: {
    padding: '10px 14px', border: '1px solid #d1d5db',
    borderRadius: 6, fontSize: 14, outline: 'none',
    width: '100%', boxSizing: 'border-box',         
  },
  inputErr: { borderColor: '#dc2626' },
  err: { fontSize: 12, color: '#dc2626' },

  btn: {
    padding: '11px 0', background: '#dc2626', color: '#fff',
    border: 'none', borderRadius: 6, fontWeight: 600,
    fontSize: 15, cursor: 'pointer', marginTop: 4,
    width: '100%',                                  
  },
};