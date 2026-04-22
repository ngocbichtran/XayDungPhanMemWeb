import { useAdminOrders } from '../hooks/useAdminOrders';
import { adminOrderStyles as styles } from '../styles/adminOrderStyles';
import {
  STATUS_OPTIONS, PAY_OPTIONS,
  STATUS_LABEL,   PAY_LABEL,
} from '../constants/orderConstants';

export default function Orders() {
  const {
    orders, editing, form, msg,
    openEdit, closeEdit,
    handleFormChange,
    handleUpdate,
    handleDelete,
  } = useAdminOrders();

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h2 style={styles.title}>📦 Quản lý đơn hàng</h2>

      {msg && <div style={styles.success}>{msg}</div>}

      {/* Bảng danh sách đơn hàng */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>Mã đơn</th>
              <th style={styles.th}>Khách hàng</th>
              <th style={styles.th}>Tổng tiền</th>
              <th style={styles.th}>Trạng thái</th>
              <th style={styles.th}>Thanh toán</th>
              <th style={styles.th}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={styles.tr}>
                <td style={styles.td}>
                  <b>{o.order_code}</b>
                </td>
                <td style={styles.td}>
                  <div>{o.full_name}</div>
                  <div style={{ color: '#6b7280', fontSize: 12 }}>{o.email}</div>
                </td>
                <td style={styles.td}>
                  {Number(o.total_amount).toLocaleString('vi-VN')}đ
                </td>
                <td style={styles.td}>{STATUS_LABEL[o.status]}</td>
                <td style={styles.td}>{PAY_LABEL[o.payment_status]}</td>
                <td style={{ ...styles.td, display: 'flex', gap: 6 }}>
                  <button onClick={() => openEdit(o)} style={styles.btnEdit}>
                    ✏️ Sửa
                  </button>
                  <button onClick={() => handleDelete(o.id)} style={styles.btnDel}>
                    🗑 Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal cập nhật trạng thái */}
      {editing && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={{ marginBottom: 16 }}>✏️ Cập nhật: {editing.order_code}</h3>

            <label style={styles.label}>Trạng thái đơn hàng</label>
            <select style={styles.select} value={form.status}
              onChange={handleFormChange('status')}>
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <label style={styles.label}>Trạng thái thanh toán</label>
            <select style={styles.select} value={form.payment_status}
              onChange={handleFormChange('payment_status')}>
              {PAY_OPTIONS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button onClick={handleUpdate} style={styles.btnSave}>💾 Lưu</button>
              <button onClick={closeEdit} style={styles.btnCancel}>Huỷ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}