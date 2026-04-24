export const homeStyles = {
    // Hero
    hero: {
        background: 'linear-gradient(135deg, #dc2626, #991b1b)',
        color: '#fff',
        padding: '60px 16px',                           
        textAlign: 'center',
    },
    heroTitle: {
        fontSize: 'clamp(26px, 6vw, 42px)',            
        fontWeight: 800, marginBottom: 16,
    },
    heroSub: {
        fontSize: 'clamp(14px, 3vw, 18px)',             
        opacity: 0.9, marginBottom: 32,
        maxWidth: 560, margin: '0 auto 32px',
    },
    heroButtons: {
        display: 'flex', gap: 12,
        justifyContent: 'center', flexWrap: 'wrap',
    },
    btnPrimary: {
        padding: '12px 24px', background: '#fff', color: '#dc2626',
        border: 'none', borderRadius: 8, fontWeight: 700,
        fontSize: 15, cursor: 'pointer',
        width: 'auto', minWidth: 140,                  
    },
    btnOutline: {
        padding: '12px 24px', background: 'transparent', color: '#fff',
        border: '2px solid #fff', borderRadius: 8, fontWeight: 700,
        fontSize: 15, cursor: 'pointer',
        minWidth: 140,
    },

    // Features
    features: {
        padding: '48px 16px',                           
        background: '#f9fafb', textAlign: 'center',
    },
    featTitle: { fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 700, marginBottom: 8, color: '#111' },
    featSub: { color: '#6b7280', marginBottom: 40, fontSize: 15 },
    featGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: 16, maxWidth: 900, margin: '0 auto',
    },
    featCard: {
        background: '#fff', borderRadius: 10, padding: 24, 
        boxShadow: '0 1px 4px rgba(0,0,0,.08)', textAlign: 'center',
    },
    featIcon: { fontSize: 36, marginBottom: 12 },
    featName: { fontWeight: 700, fontSize: 15, marginBottom: 6, color: '#111' },
    featDesc: { fontSize: 13, color: '#6b7280', lineHeight: 1.6 },

    // Footer
    footer: {
        background: '#111', color: '#9ca3af',
        textAlign: 'center', padding: '24px 16px', fontSize: 13,
    },
};