import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { admin, logout } = useAuth();

  // Chưa đăng nhập hoặc không phải admin → về login
  if (!admin) return <Navigate to="/login" replace />;
  if (admin.role !== 'admin') return <Navigate to="/login" replace />;

  return (
    <div style={styles.wrapper}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>🛠 Admin Panel</div>

        <nav style={styles.nav}>
          <NavLink to="/orders" style={navStyle}>📦 Đơn hàng</NavLink>
          <NavLink to="/users"  style={navStyle}>👥 Quản lý Users</NavLink>
          {/* Mở rộng sau
          <NavLink to="/products" style={navStyle}>🛒 Sản phẩm</NavLink>
          */}
        </nav>

        <div style={styles.footer}>
          <p style={styles.adminEmail}>{admin.email}</p>
          <button onClick={logout} style={styles.btnLogout}>
            🚪 Đăng xuất
          </button>
        </div>
      </aside>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const navStyle = ({ isActive }) => ({
  display: 'block', padding: '10px 14px', marginBottom: 4,
  borderRadius: 6, textDecoration: 'none', fontWeight: 500,
  background: isActive ? '#1d4ed8' : 'transparent',
  color: isActive ? '#fff' : '#94a3b8',
});

const styles = {
  wrapper:    { display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' },
  sidebar:    { width: 220, background: '#0f172a', display: 'flex',
                flexDirection: 'column', padding: 16 },
  brand:      { color: '#f8fafc', fontWeight: 700, fontSize: 16,
                padding: '12px 4px 16px', borderBottom: '1px solid #1e293b', marginBottom: 12 },
  nav:        { flex: 1 },
  footer:     { borderTop: '1px solid #1e293b', paddingTop: 12 },
  adminEmail: { color: '#64748b', fontSize: 12, marginBottom: 8 },
  btnLogout:  { width: '100%', background: 'transparent', border: '1px solid #334155',
                color: '#94a3b8', borderRadius: 6, padding: '8px 0', cursor: 'pointer' },
  main:       { flex: 1, padding: 32, background: '#f8fafc' },
};