export const adminLoginStyles = {
    page: {
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#0f172a',
        fontFamily: 'sans-serif', padding: '16px',          
    },
    card: {
        background: '#1e293b', borderRadius: 10, padding: '36px 28px',
        width: '100%', maxWidth: 400,                        
        boxShadow: '0 4px 24px rgba(0,0,0,.4)',
    },
    title: { color: '#f8fafc', textAlign: 'center', marginBottom: 24, fontSize: 20 },
    error: {
        background: '#450a0a', color: '#fca5a5', padding: '10px 14px',
        borderRadius: 6, fontSize: 13, marginBottom: 16
    },
    form: { display: 'flex', flexDirection: 'column', gap: 16 },
    field: { display: 'flex', flexDirection: 'column', gap: 6 },
    label: { color: '#94a3b8', fontSize: 13, fontWeight: 500 },
    input: {
        padding: '10px 14px', borderRadius: 6, border: '1px solid #334155',
        background: '#0f172a', color: '#f8fafc', fontSize: 14,
        outline: 'none', width: '100%', boxSizing: 'border-box'
    }, 
    btn: {
        padding: '11px 0', background: '#1d4ed8', color: '#fff', border: 'none',
        borderRadius: 6, fontWeight: 600, fontSize: 15,
        cursor: 'pointer', marginTop: 4, width: '100%'
    },          
};