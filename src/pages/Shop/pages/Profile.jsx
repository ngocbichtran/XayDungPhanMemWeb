import { useProfile } from '../hooks/useProfile';
import { profileStyles as styles } from '../styles/profileStyles';
import { TABS, GENDER_OPTIONS, PW_FIELDS } from '../constants/profileConstants';

export default function Profile() {
  const {
    tab, setTab,
    loading, saving, msg,
    info, pw,
    infoErrors, pwErrors,
    handleInfoChange, handlePwChange,
    handleUpdateInfo, handleChangePw,
  } = useProfile();

  if (loading) return <p style={{ color: '#6b7280' }}>Đang tải...</p>;

  return (
    <div style={{ maxWidth: 560, fontFamily: 'sans-serif' }}>
      <h2 style={styles.title}>⚙️ Quản lý tài khoản</h2>


      <div style={styles.tabs}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ ...styles.tab, ...(tab === t.key ? styles.tabActive : {}) }}>
            {t.label}
          </button>
        ))}
      </div>


      {msg.text && (
        <div style={{
          ...styles.alert,
          background: msg.type === 'success' ? '#d1fae5' : '#fee2e2',
          color:      msg.type === 'success' ? '#065f46' : '#991b1b',
        }}>
          {msg.text}
        </div>
      )}

 
      {tab === 'info' && (
        <form onSubmit={handleUpdateInfo} style={styles.form}>


          <div style={styles.fieldWrap}>
            <label style={styles.label}>Họ và tên *</label>
            <input
              style={{ ...styles.input, ...(infoErrors.full_name ? styles.inputErr : {}) }}
              type="text" value={info.full_name}
              onChange={e => handleInfoChange('full_name')(e.target.value)} />
            {infoErrors.full_name && <span style={styles.err}>{infoErrors.full_name}</span>}
          </div>


          <div style={styles.fieldWrap}>
            <label style={styles.label}>Số điện thoại</label>
            <input
              style={{ ...styles.input, ...(infoErrors.phone ? styles.inputErr : {}) }}
              type="text" value={info.phone}
              onChange={e => handleInfoChange('phone')(e.target.value)} />
            {infoErrors.phone && <span style={styles.err}>{infoErrors.phone}</span>}
          </div>


          <div style={styles.fieldWrap}>
            <label style={styles.label}>Giới tính</label>
            <select style={styles.input} value={info.gender}
              onChange={e => handleInfoChange('gender')(e.target.value)}>
              {GENDER_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>


          <div style={styles.fieldWrap}>
            <label style={styles.label}>Ngày sinh</label>
            <input style={styles.input} type="date" value={info.birth_date}
              onChange={e => handleInfoChange('birth_date')(e.target.value)} />
          </div>


          <div style={styles.fieldWrap}>
            <label style={styles.label}>Địa chỉ</label>
            <input style={styles.input} type="text" value={info.address}
              onChange={e => handleInfoChange('address')(e.target.value)} />
          </div>


          <div style={styles.fieldWrap}>
            <label style={styles.label}>Giới thiệu bản thân</label>
            <textarea style={{ ...styles.input, resize: 'vertical' }}
              rows={3} value={info.bio}
              onChange={e => handleInfoChange('bio')(e.target.value)} />
          </div>

          <button type="submit" style={styles.btn} disabled={saving}>
            {saving ? 'Đang lưu...' : '💾 Lưu thay đổi'}
          </button>
        </form>
      )}


      {tab === 'password' && (
        <form onSubmit={handleChangePw} style={styles.form}>
          {PW_FIELDS.map(({ key, label }) => (
            <div key={key} style={styles.fieldWrap}>
              <label style={styles.label}>{label}</label>
              <input
                style={{ ...styles.input, ...(pwErrors[key] ? styles.inputErr : {}) }}
                type="password" value={pw[key]}
                onChange={e => handlePwChange(key)(e.target.value)} />
              {pwErrors[key] && <span style={styles.err}>{pwErrors[key]}</span>}
            </div>
          ))}

          <button type="submit" style={styles.btn} disabled={saving}>
            {saving ? 'Đang lưu...' : '🔒 Đổi mật khẩu'}
          </button>
        </form>
      )}
    </div>
  );
}