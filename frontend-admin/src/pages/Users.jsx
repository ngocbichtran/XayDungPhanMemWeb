import { useAdminUsers } from '../hooks/useAdminUsers';
import { adminUserStyles as styles } from '../styles/adminUserStyles';
import { STATUS_OPTIONS, STATUS_LABEL, STATUS_COLOR, ROLE_OPTIONS } from '../constants/userConstants';

export default function Users() {
  const {
    users, loading, msg,
    modalType, selected, form, newPw,
    setNewPw, handleFormChange,
    openCreate, openEdit, openReset, closeModal,
    handleCreate, handleUpdate, handleDelete, handleResetPassword,
  } = useAdminUsers();

  if (loading) return <p style={{ color: '#6b7280' }}>Đang tải...</p>;

  return (
    <div style={{ fontFamily: 'sans-serif' }}>

    
      <div style={styles.header}>
        <h2 style={styles.title}>👥 Quản lý tài khoản</h2>
        <button onClick={openCreate} style={styles.btnAdd}>+ Tạo tài khoản</button>
      </div>

   
      {msg.text && (
        <div style={msg.type === 'success' ? styles.success : styles.error}>
          {msg.text}
        </div>
      )}

      {/* Bảng danh sách */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>Họ tên</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>SĐT</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Trạng thái</th>
              <th style={styles.th}>Ngày tạo</th>
              <th style={styles.th}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={styles.tr}>
                <td style={styles.td}><b>{u.full_name}</b></td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}>{u.phone || '—'}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.badge,
                    background: u.role === 'admin' ? '#dbeafe' : '#f3f4f6',
                    color:      u.role === 'admin' ? '#1d4ed8' : '#374151',
                  }}>
                    {u.role === 'admin' ? '🛠 Admin' : '👤 User'}
                  </span>
                </td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, ...STATUS_COLOR[u.status] }}>
                    {STATUS_LABEL[u.status]}
                  </span>
                </td>
                <td style={styles.td}>
                  {new Date(u.created_at).toLocaleDateString('vi-VN')}
                </td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button onClick={() => openEdit(u)} style={styles.btnEdit}>✏️ Sửa</button>
                    <button onClick={() => openReset(u)} style={styles.btnReset}>🔑 Reset PW</button>
                    <button onClick={() => handleDelete(u.id)} style={styles.btnDel}>🗑 Xoá</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Tạo mới */}
      {modalType === 'create' && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalTitle}>➕ Tạo tài khoản mới</div>

            {[
              { key: 'full_name', label: 'Họ và tên', type: 'text' },
              { key: 'email',     label: 'Email',      type: 'email' },
              { key: 'phone',     label: 'SĐT',        type: 'text' },
              { key: 'password',  label: 'Mật khẩu',   type: 'password' },
            ].map(({ key, label, type }) => (
              <div key={key} style={styles.field}>
                <label style={styles.label}>{label}</label>
                <input style={styles.input} type={type}
                  value={form[key]} onChange={handleFormChange(key)} />
              </div>
            ))}

            <div style={styles.field}>
              <label style={styles.label}>Role</label>
              <select style={styles.select} value={form.role} onChange={handleFormChange('role')}>
                {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div style={styles.btnRow}>
              <button onClick={handleCreate} style={styles.btnSave}>💾 Tạo</button>
              <button onClick={closeModal} style={styles.btnCancel}>Huỷ</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sửa */}
      {modalType === 'edit' && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalTitle}>✏️ Sửa: {selected.email}</div>

            {[
              { key: 'full_name', label: 'Họ và tên', type: 'text' },
              { key: 'phone',     label: 'SĐT',        type: 'text' },
            ].map(({ key, label, type }) => (
              <div key={key} style={styles.field}>
                <label style={styles.label}>{label}</label>
                <input style={styles.input} type={type}
                  value={form[key]} onChange={handleFormChange(key)} />
              </div>
            ))}

            <div style={styles.field}>
              <label style={styles.label}>Role</label>
              <select style={styles.select} value={form.role} onChange={handleFormChange('role')}>
                {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Trạng thái</label>
              <select style={styles.select} value={form.status} onChange={handleFormChange('status')}>
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div style={styles.btnRow}>
              <button onClick={handleUpdate} style={styles.btnSave}>💾 Lưu</button>
              <button onClick={closeModal} style={styles.btnCancel}>Huỷ</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Reset Password */}
      {modalType === 'reset' && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalTitle}>🔑 Reset mật khẩu: {selected.email}</div>
            <div style={styles.field}>
              <label style={styles.label}>Mật khẩu mới</label>
              <input style={styles.input} type="password"
                placeholder="Tối thiểu 6 ký tự"
                value={newPw} onChange={e => setNewPw(e.target.value)} />
            </div>
            <div style={styles.btnRow}>
              <button onClick={handleResetPassword} style={styles.btnSave}>🔑 Reset</button>
              <button onClick={closeModal} style={styles.btnCancel}>Huỷ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}