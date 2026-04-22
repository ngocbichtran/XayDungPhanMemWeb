export const adminOrderStyles = {
    title: { fontSize: 20, fontWeight: 700, marginBottom: 20 },
    success: {
        background: '#d1fae5', color: '#065f46', padding: '10px 16px',
        borderRadius: 6, marginBottom: 16, fontSize: 14
    },

    // Scroll ngang trên mobile
    tableWrap: {
        background: '#fff', borderRadius: 8,
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        boxShadow: '0 1px 4px rgba(0,0,0,.08)'
    },

    table: {
        width: '100%', borderCollapse: 'collapse',
        fontSize: 14, minWidth: 640
    },
    thead: { background: '#f1f5f9' },
    th: {
        padding: '12px 16px', textAlign: 'left',
        fontWeight: 600, color: '#374151',
        whiteSpace: 'nowrap'
    },
    tr: { borderBottom: '1px solid #e5e7eb' },
    td: { padding: '12px 16px', whiteSpace: 'nowrap' },

    btnEdit: {
        background: '#2563eb', color: '#fff', border: 'none',
        borderRadius: 4, padding: '5px 12px', cursor: 'pointer', fontSize: 13
    },
    btnDel: {
        background: '#dc2626', color: '#fff', border: 'none',
        borderRadius: 4, padding: '5px 12px', cursor: 'pointer', fontSize: 13
    },

    overlay: {
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 50,
        padding: '16px'
    },

    modal: {
        background: '#fff', borderRadius: 8, padding: 28,
        width: '100%', maxWidth: 380,
        display: 'flex', flexDirection: 'column', gap: 10,
        maxHeight: '90vh', overflowY: 'auto'
    },

    label: { fontSize: 13, fontWeight: 600, color: '#374151' },
    select: {
        padding: '9px 12px', border: '1px solid #d1d5db',
        borderRadius: 6, fontSize: 14, outline: 'none',
        width: '100%', boxSizing: 'border-box'
    },

    btnSave: {
        flex: 1, background: '#2563eb', color: '#fff', border: 'none',
        borderRadius: 6, padding: '10px 0', cursor: 'pointer', fontWeight: 600
    },
    btnCancel: {
        flex: 1, background: '#6b7280', color: '#fff', border: 'none',
        borderRadius: 6, padding: '10px 0', cursor: 'pointer'
    },
};