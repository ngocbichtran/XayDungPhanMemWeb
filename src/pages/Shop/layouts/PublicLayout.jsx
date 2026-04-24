import { useRef, useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userLayoutStyles as styles } from '../styles/userLayoutStyles';

export default function PublicLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const initials = user?.full_name
    ?.split(' ').pop()?.charAt(0).toUpperCase() || '?';

  // Click ra ngoài đóng dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (path) => { navigate(path); setOpen(false); };
  const handleLogout   = () => { setOpen(false); logout(); };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>

     
        <div style={{ ...styles.logo, cursor: 'pointer' }}
          onClick={() => navigate('/')}>
          🛍 Minh Anh Shop
        </div>

        
        <nav style={styles.nav}>
          <NavLink to="/" style={navStyle}>🏠 Trang chủ</NavLink>
          {user && <NavLink to="/orders" style={navStyle}>📦 Đơn hàng</NavLink>}
        </nav>

        
        {user ? (
         
          <div style={styles.avatarWrap} ref={dropdownRef}>
            <div style={styles.avatar} onClick={() => setOpen(p => !p)}>
              {initials}
            </div>

            {open && (
              <div style={styles.dropdown}>
                <div style={styles.dropHeader}>
                  <div style={styles.dropName}>{user.full_name}</div>
                  <div style={styles.dropEmail}>{user.email}</div>
                </div>
                <button style={styles.dropItem}
                  onClick={() => handleNavigate('/orders')}
                  onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  📦 Đơn hàng của tôi
                </button>
                <button style={styles.dropItem}
                  onClick={() => handleNavigate('/profile')}
                  onMouseEnter={e => e.currentTarget.style.background = '#f3f4f6'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  ⚙️ Quản lý tài khoản
                </button>
                <div style={styles.dropDivider} />
                <button style={styles.dropLogout}
                  onClick={handleLogout}
                  onMouseEnter={e => e.currentTarget.style.background = '#fff1f2'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                  🚪 Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => navigate('/login')} style={styles.btnLogin}>
              Đăng nhập
            </button>
            <button onClick={() => navigate('/register')} style={styles.btnRegister}>
              Đăng ký
            </button>
          </div>
        )}
      </header>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const navStyle = ({ isActive }) => ({
  padding: '6px 14px', borderRadius: 6,
  textDecoration: 'none', fontWeight: 500, fontSize: 14,
  background: isActive ? '#fee2e2' : 'transparent',
  color: isActive ? '#dc2626' : '#374151',
});