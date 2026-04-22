export const adminUserStyles = {
    // Header responsive — wrap xuống dòng trên mobile
    header: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 20,
        flexWrap: 'wrap', gap: 12
    },                            // ← wrap + gap

    title: { fontSize: 20, fontWeight: 700 },
    btnAdd: {
        background: '#2563eb', color: '#fff', border: 'none',
        borderRadius: 6, padding: '9px 18px', cursor: 'pointer',
        fontWeight: 600, fontSize: 14,
        whiteSpace: 'nowrap'
    },                                 // ← không xuống dòng

    success: {
        background: '#d1fae5', color: '#065f46', padding: '10px 16px',
        borderRadius: 6, marginBottom: 16, fontSize: 14
    },
    error: {
        background: '#fee2e2', color: '#991b1b', padding: '10px 16px',
        borderRadius: 6, marginBottom: 16, fontSize: 14
    },

    // Scroll ngang trên mobile
    tableWrap: {
        background: '#fff', borderRadius: 8,
        overflowX: 'auto',                                      // ← scroll ngang
        WebkitOverflowScrolling: 'touch',
        boxShadow: '0 1px 4px rgba(0,0,0,.08)'
    },

    table: {
        width: '100%', borderCollapse: 'collapse',
        fontSize: 14, minWidth: 720
    },                          // ← giữ layout bảng
    thead: { background: '#f1f5f9' },
    th: {
        padding: '12px 16px', textAlign: 'left',
        fontWeight: 600, color: '#374151',
        whiteSpace: 'nowrap'
    },
    tr: { borderBottom: '1px solid #e5e7eb' },
    td: { padding: '12px 16px', whiteSpace: 'nowrap' },

    badge: {
        padding: '3px 10px', borderRadius: 20,
        fontSize: 12, fontWeight: 600
    },
    actions: { display: 'flex', gap: 6, flexWrap: 'wrap' },           // ← wrap nút nhỏ
    btnEdit: {
        background: '#2563eb', color: '#fff', border: 'none',
        borderRadius: 4, padding: '4px 10px',
        cursor: 'pointer', fontSize: 12
    },
    btnReset: {
        background: '#d97706', color: '#fff', border: 'none',
        borderRadius: 4, padding: '4px 10px',
        cursor: 'pointer', fontSize: 12
    },
    btnDel: {
        background: '#dc2626', color: '#fff', border: 'none',
        borderRadius: 4, padding: '4px 10px',
        cursor: 'pointer', fontSize: 12
    },

    overlay: {
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 50,
        padding: '16px'
    },

    modal: {
        background: '#fff', borderRadius: 8, padding: 28,
        width: '100%', maxWidth: 420,
        display: 'flex', flexDirection: 'column', gap: 14,
        maxHeight: '90vh', overflowY: 'auto'
    },

    modalTitle: { fontSize: 16, fontWeight: 700, marginBottom: 4 },
    field: { display: 'flex', flexDirection: 'column', gap: 5 },
    label: { fontSize: 13, fontWeight: 600, color: '#374151' },

    input: {
        padding: '9px 12px', border: '1px solid #d1d5db',
        borderRadius: 6, fontSize: 14, outline: 'none',
        width: '100%', boxSizing: 'border-box'
    },

    select: {
        padding: '9px 12px', border: '1px solid #d1d5db',
        borderRadius: 6, fontSize: 14, outline: 'none',
        width: '100%', boxSizing: 'border-box'
    },

    btnRow: { display: 'flex', gap: 8, marginTop: 4 },
    btnSave: {
        flex: 1, background: '#2563eb', color: '#fff', border: 'none',
        borderRadius: 6, padding: '10px 0',
        cursor: 'pointer', fontWeight: 600
    },
    btnCancel: {
        flex: 1, background: '#6b7280', color: '#fff', border: 'none',
        borderRadius: 6, padding: '10px 0', cursor: 'pointer'
    },
};