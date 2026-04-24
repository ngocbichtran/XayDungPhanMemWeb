export const userLayoutStyles = {
    wrapper: {
        display: 'flex', flexDirection: 'column',
        minHeight: '100vh', fontFamily: 'sans-serif',
    },


    header: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        height: 60, background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky', top: 0, zIndex: 100,
        gap: 8,
    },
    logo: {
        fontWeight: 700, fontSize: 16,
        color: '#dc2626', whiteSpace: 'nowrap',
        cursor: 'pointer',
    },
    nav: {
        display: 'flex', gap: 4,
        flexWrap: 'wrap',
    },

    // Avatar
    avatarWrap: { position: 'relative', flexShrink: 0 },
    avatar: {
        width: 38, height: 38, borderRadius: '50%',
        background: '#dc2626', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 15, cursor: 'pointer',
        border: '2px solid #e5e7eb', userSelect: 'none',
        flexShrink: 0,
    },

    // Dropdown
    dropdown: {
        position: 'absolute', top: 48, right: 0,
        background: '#fff', borderRadius: 8,
        width: 220,
        maxWidth: 'calc(100vw - 32px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        border: '1px solid #e5e7eb', overflow: 'hidden', zIndex: 200,
    },
    dropHeader: {
        padding: '14px 16px', borderBottom: '1px solid #e5e7eb',
        background: '#f9fafb',
    },
    dropName: { fontWeight: 700, fontSize: 14, color: '#111' },
    dropEmail: {
        fontSize: 12, color: '#6b7280', marginTop: 2,
        wordBreak: 'break-all'
    },
    dropItem: {
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '11px 16px', fontSize: 14, color: '#374151',
        textDecoration: 'none', cursor: 'pointer',
        background: 'none', border: 'none',
        width: '100%', textAlign: 'left',
        boxSizing: 'border-box',
    },
    dropDivider: { height: 1, background: '#e5e7eb', margin: 0 },
    dropLogout: {
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '11px 16px', fontSize: 14, color: '#dc2626',
        background: 'none', border: 'none',
        width: '100%', textAlign: 'left', cursor: 'pointer',
        boxSizing: 'border-box',
    },

    btnLogin: {
        padding: '7px 12px',
        background: 'transparent',
        border: '1px solid #dc2626', color: '#dc2626',
        borderRadius: 6, fontWeight: 600,
        fontSize: 13, cursor: 'pointer',
        whiteSpace: 'nowrap',
    },
    btnRegister: {
        padding: '7px 12px',
        background: '#dc2626', border: 'none', color: '#fff',
        borderRadius: 6, fontWeight: 600,
        fontSize: 13, cursor: 'pointer',
        whiteSpace: 'nowrap',
    },

    // Main
    main: {
        flex: 1,
        padding: '24px 16px',
        background: '#f9fafb',
    },
};