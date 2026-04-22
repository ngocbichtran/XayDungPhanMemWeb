export const orderStyles = {
    title: { fontSize: 20, fontWeight: 700, marginBottom: 20 },
    loading: { color: '#6b7280', padding: 20 },
    empty: {
        background: '#f9fafb', borderRadius: 8,
        padding: '32px 16px',
        textAlign: 'center', color: '#6b7280',
    },

    tableWrap: {
        background: '#fff', borderRadius: 8,
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        boxShadow: '0 1px 4px rgba(0,0,0,.08)',
    },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 560 },
    thead: { background: '#f9fafb' },
    th: {
        padding: '12px 16px', textAlign: 'left',
        fontWeight: 600, color: '#374151', whiteSpace: 'nowrap',
    },
    tr: { borderBottom: '1px solid #e5e7eb' },
    td: { padding: '12px 16px', whiteSpace: 'nowrap' },
    btnDetail: {
        background: '#2563eb', color: '#fff', border: 'none',
        borderRadius: 4, padding: '5px 12px', cursor: 'pointer', fontSize: 13,
    },

    overlay: {
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 50, padding: '16px',
    },
    modal: {
        background: '#fff', borderRadius: 10, padding: '24px 20px',
        width: '100%', maxWidth: 640,
        maxHeight: '90vh', overflowY: 'auto',
        boxSizing: 'border-box',
    },
    modalHeader: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 16,
    },
    btnX: { background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#6b7280' },


    infoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 12,
    },
    infoItem: { display: 'flex', flexDirection: 'column', gap: 3 },
    infoLabel: { fontSize: 12, color: '#6b7280', fontWeight: 600 },
    total: { textAlign: 'right', marginTop: 16, fontSize: 14 },
};